import type {
  Announcement,
  ClassContent,
  ClassRoute,
  Document,
  Video,
} from "./site-content";

const SHEET_QUERY_URL =
  "https://docs.google.com/spreadsheets/d/1Gtv7HomDZWJt_DUlfOH4mncTpgGGdqQqU5p5TALEhtM/gviz/tq?gid=1424196614&headers=1";

const expectedHeaders = [
  "게시 상태",
  "반",
  "구분",
  "중요도",
  "게시 시작일",
  "제목",
  "설명",
  "URL",
  "버튼명",
  "게시 종료일",
  "관리자 메모",
] as const;

type GvizCell = {
  v?: string | number | boolean | null;
  f?: string | null;
};

type GvizResponse = {
  status?: string;
  errors?: Array<{ message?: string }>;
  table?: {
    cols?: Array<{ label?: string }>;
    rows?: Array<{ c?: Array<GvizCell | null> }>;
  };
};

type SheetRow = Record<(typeof expectedHeaders)[number], string> & {
  rowNumber: number;
};

function normalize(value: string) {
  return value.normalize("NFKC").replace(/\s+/g, "").toLowerCase();
}

function cellText(cell: GvizCell | null | undefined) {
  if (!cell) return "";
  if (typeof cell.f === "string") return cell.f.trim();
  if (cell.v === null || cell.v === undefined) return "";
  return String(cell.v).trim();
}

function normalizeDate(value: string) {
  const trimmed = value.trim();
  if (!trimmed) return "";

  const gvizDate = trimmed.match(/^Date\((\d{4}),(\d{1,2}),(\d{1,2})\)$/);
  if (gvizDate) {
    return [
      gvizDate[1],
      String(Number(gvizDate[2]) + 1).padStart(2, "0"),
      gvizDate[3].padStart(2, "0"),
    ].join("-");
  }

  const dateParts = trimmed.match(/(\d{4})\D+(\d{1,2})\D+(\d{1,2})/);
  if (!dateParts) return "";

  return [
    dateParts[1],
    dateParts[2].padStart(2, "0"),
    dateParts[3].padStart(2, "0"),
  ].join("-");
}

function todayInSeoul() {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: "Asia/Seoul",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).formatToParts(new Date());
  const values = Object.fromEntries(parts.map((part) => [part.type, part.value]));
  return `${values.year}-${values.month}-${values.day}`;
}

function isNewContent(date: string, today: string) {
  if (!date) return false;
  const oneDay = 24 * 60 * 60 * 1000;
  const difference =
    (Date.parse(`${today}T00:00:00Z`) - Date.parse(`${date}T00:00:00Z`)) /
    oneDay;
  return difference >= 0 && difference <= 7;
}

function isPublished(row: SheetRow, today: string) {
  if (normalize(row["게시 상태"]) !== normalize("게시")) return false;

  const startDate = normalizeDate(row["게시 시작일"]);
  const endDate = normalizeDate(row["게시 종료일"]);

  if (startDate && startDate > today) return false;
  if (endDate && endDate < today) return false;
  return true;
}

function matchesClass(row: SheetRow, classInfo: ClassRoute) {
  const target = normalize(row["반"]);
  if (!target) return false;
  return classInfo.sheetTargets.some((item) => normalize(item) === target);
}

function toSheetRows(response: GvizResponse): SheetRow[] {
  if (response.status !== "ok" || !response.table?.rows) {
    throw new Error(
      response.errors?.[0]?.message ?? "구글 시트 응답을 확인하지 못했습니다.",
    );
  }

  const labels = response.table.cols?.map((column) => column.label?.trim() ?? "") ?? [];
  const headerIndexes = new Map<string, number>();

  expectedHeaders.forEach((header, fallbackIndex) => {
    const liveIndex = labels.findIndex((label) => normalize(label) === normalize(header));
    headerIndexes.set(header, liveIndex >= 0 ? liveIndex : fallbackIndex);
  });

  return response.table.rows.map((row, index) => {
    const values = row.c ?? [];
    const result = { rowNumber: index + 2 } as SheetRow;

    expectedHeaders.forEach((header) => {
      result[header] = cellText(values[headerIndexes.get(header) ?? 0]);
    });

    return result;
  });
}

function loadGvizResponse() {
  return new Promise<GvizResponse>((resolve, reject) => {
    const callbackName = `__dabuMathSheet_${Date.now()}_${Math.random()
      .toString(36)
      .slice(2)}`;
    const callbackOwner = window as unknown as Record<string, unknown>;
    const script = document.createElement("script");
    const url = new URL(SHEET_QUERY_URL);
    let settled = false;

    const cleanup = () => {
      delete callbackOwner[callbackName];
      script.remove();
      window.clearTimeout(timeoutId);
    };

    callbackOwner[callbackName] = (response: GvizResponse) => {
      if (settled) return;
      settled = true;
      cleanup();
      resolve(response);
    };

    url.searchParams.set(
      "tqx",
      `out:json;responseHandler:${callbackName}`,
    );
    url.searchParams.set("_", String(Date.now()));
    script.src = url.toString();
    script.async = true;
    script.onerror = () => {
      if (settled) return;
      settled = true;
      cleanup();
      reject(new Error("구글 시트에 연결하지 못했습니다."));
    };

    const timeoutId = window.setTimeout(() => {
      if (settled) return;
      settled = true;
      cleanup();
      reject(new Error("구글 시트 응답 시간이 초과되었습니다."));
    }, 12_000);

    document.head.append(script);
  });
}

export async function loadClassContentFromSheet(
  classInfo: ClassRoute,
): Promise<ClassContent> {
  const response = await loadGvizResponse();
  const today = todayInSeoul();
  const rows = toSheetRows(response)
    .filter((row) => row["제목"].trim())
    .filter((row) => isPublished(row, today))
    .filter((row) => matchesClass(row, classInfo))
    .sort((left, right) => {
      const leftImportant = normalize(left["중요도"]) === normalize("중요");
      const rightImportant = normalize(right["중요도"]) === normalize("중요");
      if (leftImportant !== rightImportant) return leftImportant ? -1 : 1;
      return normalizeDate(right["게시 시작일"]).localeCompare(
        normalizeDate(left["게시 시작일"]),
      );
    });

  const announcements: Announcement[] = [];
  const videos: Video[] = [];
  const documents: Document[] = [];

  rows.forEach((row) => {
    const category = normalize(row["구분"]);
    const date = normalizeDate(row["게시 시작일"]) || today;
    const description = row["설명"].trim();
    const buttonLabel = row["버튼명"].trim();
    const url = row.URL.trim();
    const baseId = `sheet-${row.rowNumber}`;

    if (category === normalize("공지") || category === normalize("일정")) {
      announcements.push({
        id: baseId,
        scope: row["반"] === "전체" ? "전체 공지" : row["반"],
        title: row["제목"],
        summary: description || "내용을 확인해 주세요.",
        date,
        pinned: normalize(row["중요도"]) === normalize("중요"),
        content: description
          ? description.split(/\r?\n+/).filter(Boolean)
          : ["등록된 상세 안내가 없습니다."],
        url: url || undefined,
        buttonLabel: buttonLabel || undefined,
      });
      return;
    }

    if (category === normalize("영상보강") || category === normalize("영상")) {
      videos.push({
        id: baseId,
        subject: `${classInfo.subject} · 영상 보강`,
        lesson: String(videos.length + 1).padStart(2, "0"),
        title: row["제목"],
        duration: buttonLabel || "영상 보기",
        date,
        isNew: isNewContent(date, today),
        url,
      });
      return;
    }

    if (
      category === normalize("과제") ||
      category === normalize("자료") ||
      category === normalize("링크")
    ) {
      documents.push({
        id: baseId,
        title: row["제목"],
        kind: row["구분"],
        size: buttonLabel || (category === normalize("링크") ? "링크 열기" : "자료 열기"),
        date,
        isNew: isNewContent(date, today),
        url,
        mark: category === normalize("링크") ? "LINK" : "PDF",
      });
    }
  });

  return { announcements, videos, documents };
}
