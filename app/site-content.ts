export const classRoutes = [
  {
    id: "common1",
    path: ["common1"],
    subject: "공통수학1",
    section: "",
    displayName: "공통수학1",
    sheetTargets: ["전체", "공수1", "공통수학1"],
    codeHash:
      "9abdbfcef8fad3305a6548cd86ca3b3dc432c20babb29aaaca0b4844349b3966",
    accessVersion: "2026-01",
  },
  {
    id: "common2a",
    path: ["common2", "a"],
    subject: "공통수학2",
    section: "정규1반",
    displayName: "공통수학2 정규1반",
    sheetTargets: [
      "전체",
      "공수2 전체",
      "공통수학2 전체",
      "B",
      "고1B",
      "공수2 B",
      "공수2 B반",
      "공통수학2 B",
      "공통수학2 B반",
      "공통수학2 정규1반",
    ],
    codeHash:
      "d7feffe5f58e899b562b8b2ad26d95fcdad2f95bc13fd7ae422aa64140a83f90",
    accessVersion: "2026-01",
  },
  {
    id: "common2b",
    path: ["common2", "b"],
    subject: "공통수학2",
    section: "정규2반",
    displayName: "공통수학2 정규2반",
    sheetTargets: [
      "전체",
      "공수2 전체",
      "공통수학2 전체",
      "Q",
      "고1Q",
      "공수2 Q",
      "공수2 Q반",
      "공통수학2 Q",
      "공통수학2 Q반",
      "공통수학2 정규2반",
    ],
    codeHash:
      "52d78241129c81a4af2807f70728f8247b4a34bc464bbe862500da8fc6ff6c71",
    accessVersion: "2026-01",
  },
  {
    id: "algebra",
    path: ["algebra"],
    subject: "대수",
    section: "",
    displayName: "대수",
    sheetTargets: ["전체", "대수"],
    codeHash:
      "ca615b2a64307e6715978ea6402f75a940715e379d8f52a3b7d559abc38c26ad",
    accessVersion: "2026-01",
  },
  {
    id: "calculus1a",
    path: ["calculus1", "a"],
    subject: "미적분Ⅰ",
    section: "정규1반",
    displayName: "미적분Ⅰ 정규1반",
    sheetTargets: [
      "전체",
      "미적분Ⅰ 전체",
      "미적분1 전체",
      "Z",
      "고2Z",
      "미적분Ⅰ Z",
      "미적분Ⅰ Z반",
      "미적분1 Z",
      "미적분1 Z반",
      "미적분Ⅰ 정규1반",
    ],
    codeHash:
      "34ea66fef6be46af34b8cf4b910163e58b9e70c1362a2080d96314f0b0bcc474",
    accessVersion: "2026-01",
  },
  {
    id: "calculus1b",
    path: ["calculus1", "b"],
    subject: "미적분Ⅰ",
    section: "정규2반",
    displayName: "미적분Ⅰ 정규2반",
    sheetTargets: [
      "전체",
      "미적분Ⅰ 전체",
      "미적분1 전체",
      "M",
      "고2M",
      "미적분Ⅰ M",
      "미적분Ⅰ M반",
      "미적분1 M",
      "미적분1 M반",
      "미적분Ⅰ 정규2반",
    ],
    codeHash:
      "62c68d906be90be41252b3638e5efa648b8b9fbd7034dc30181e92a7b317097a",
    accessVersion: "2026-01",
  },
  {
    id: "calculus2",
    path: ["calculus2"],
    subject: "미적분Ⅱ",
    section: "",
    displayName: "미적분Ⅱ",
    sheetTargets: ["전체", "미적분Ⅱ", "미적분2"],
    codeHash:
      "c53bc2c199fd6cbf3353b8b2a8c189d3ff4ef5d79cc7b59279fe627fe9eda5e3",
    accessVersion: "2026-01",
  },
  {
    id: "probability",
    path: ["probability"],
    subject: "확률과 통계",
    section: "",
    displayName: "확률과 통계",
    sheetTargets: ["전체", "확률과 통계", "확통"],
    codeHash:
      "d45cef7052c9c3da898ff00aa17cf56b4a2a739963195c799c8572f9e6a17d6a",
    accessVersion: "2026-01",
  },
  {
    id: "geometry",
    path: ["geometry"],
    subject: "기하",
    section: "",
    displayName: "기하",
    sheetTargets: ["전체", "기하"],
    codeHash:
      "61f3bd444374fc3cd67e11820469d2b5994b10db1dbd43fd5e3dd9f771e0ce4c",
    accessVersion: "2026-01",
  },
  {
    id: "summer",
    path: ["summer"],
    subject: "여름 방학 특강",
    section: "",
    displayName: "여름 방학 특강",
    sheetTargets: ["전체", "여름 방학 특강", "여름특강"],
    codeHash:
      "108edceb8910db9cc79f46d86b2e383f5f21ad92b9fdad425b2c3839ddf7fd9d",
    accessVersion: "2026-01",
  },
] as const;

export type ClassRoute = (typeof classRoutes)[number];
export type ClassId = ClassRoute["id"];

export type Announcement = {
  id: string;
  scope: string;
  title: string;
  summary: string;
  date: string;
  pinned?: boolean;
  content: string[];
  url?: string;
  buttonLabel?: string;
};

export type Video = {
  id: string;
  subject: string;
  lesson: string;
  title: string;
  duration: string;
  date: string;
  isNew: boolean;
  url: string;
};

export type Document = {
  id: string;
  title: string;
  kind: string;
  size: string;
  date: string;
  isNew: boolean;
  url: string;
  mark?: string;
};

export type ClassContent = {
  announcements: Announcement[];
  videos: Video[];
  documents: Document[];
};

export const globalAnnouncements: Announcement[] = [
  {
    id: "global-summer",
    scope: "전체 공지",
    title: "여름방학 수업 및 학원 휴무 안내",
    summary: "8월 첫째 주 수업 시간과 학원 휴무일을 확인해 주세요.",
    date: "2026-07-30",
    pinned: true,
    content: [
      "8월 첫째 주에는 일부 수업 시간이 조정됩니다. 각 반별 변경 시간은 수업 시간에 다시 안내하겠습니다.",
      "학원 휴무일에는 질문 확인이 늦어질 수 있으니 급한 질문은 휴무일 전에 전달해 주세요.",
    ],
  },
];

export const contentByClass: Record<ClassId, ClassContent> = {
  common1: {
    announcements: [
      {
        id: "common1-start",
        scope: "공통수학1",
        title: "공통수학1 수업 안내",
        summary: "수업 영상과 PDF 자료는 이 페이지에 순서대로 올라옵니다.",
        date: "2026-07-30",
        content: [
          "수업 영상과 과제 PDF는 준비되는 대로 이 페이지에 등록합니다.",
          "영상과 PDF를 눌렀을 때 새 창이 열리지 않으면 담당 선생님에게 알려 주세요.",
        ],
      },
    ],
    videos: [],
    documents: [],
  },
  common2a: {
    announcements: [
      {
        id: "common2a-start",
        scope: "공통수학2 정규1반",
        title: "공통수학2 정규1반 페이지 안내",
        summary: "정규1반 전용 수업 영상과 자료를 확인하세요.",
        date: "2026-07-30",
        content: [
          "이 페이지에는 공통수학2 정규1반 자료만 표시됩니다.",
          "입장 코드는 다른 반 학생에게 공유하지 마세요.",
        ],
      },
    ],
    videos: [
      {
        id: "common2a-video-01",
        subject: "공통수학2 · 도형의 방정식",
        lesson: "01",
        title: "평면좌표와 직선의 방정식",
        duration: "52분",
        date: "2026-07-30",
        isNew: true,
        url: "",
      },
    ],
    documents: [
      {
        id: "common2a-document-01",
        title: "도형의 방정식 중단원 과제장",
        kind: "과제장",
        size: "2.4MB",
        date: "2026-07-30",
        isNew: true,
        url: "",
      },
    ],
  },
  common2b: {
    announcements: [
      {
        id: "common2b-start",
        scope: "공통수학2 정규2반",
        title: "공통수학2 정규2반 페이지 안내",
        summary: "정규2반 전용 수업 영상과 자료를 확인하세요.",
        date: "2026-07-30",
        content: [
          "이 페이지에는 공통수학2 정규2반 자료만 표시됩니다.",
          "입장 코드는 다른 반 학생에게 공유하지 마세요.",
        ],
      },
    ],
    videos: [],
    documents: [],
  },
  algebra: {
    announcements: [
      {
        id: "algebra-start",
        scope: "대수",
        title: "대수 수업 페이지 안내",
        summary: "대수 수업 영상과 PDF 자료를 확인하세요.",
        date: "2026-07-30",
        content: [
          "수업 영상과 과제 PDF는 준비되는 대로 이 페이지에 등록합니다.",
        ],
      },
    ],
    videos: [],
    documents: [],
  },
  calculus1a: {
    announcements: [
      {
        id: "calculus1a-homework",
        scope: "미적분Ⅰ 정규1반",
        title: "함수의 극한 중단원 과제 업로드",
        summary: "과제장과 해설지를 PDF 자료에서 확인할 수 있습니다.",
        date: "2026-07-29",
        content: [
          "함수의 극한 중단원 과제장을 업로드했습니다.",
          "문제를 먼저 충분히 고민한 뒤 해설지를 확인해 주세요. 다음 수업에서 질문을 받겠습니다.",
        ],
      },
    ],
    videos: [
      {
        id: "calculus1a-video-03",
        subject: "미적분Ⅰ · 함수의 극한",
        lesson: "03",
        title: "함수의 극한 활용",
        duration: "52분",
        date: "2026-07-30",
        isNew: true,
        url: "",
      },
      {
        id: "calculus1a-video-02",
        subject: "미적분Ⅰ · 함수의 극한",
        lesson: "02",
        title: "미정계수의 결정",
        duration: "44분",
        date: "2026-07-23",
        isNew: false,
        url: "",
      },
    ],
    documents: [
      {
        id: "calculus1a-document-01",
        title: "함수의 극한 중단원 과제장",
        kind: "과제장",
        size: "2.4MB",
        date: "2026-07-29",
        isNew: true,
        url: "",
      },
      {
        id: "calculus1a-document-02",
        title: "함수의 극한 중단원 해설지",
        kind: "해설지",
        size: "3.1MB",
        date: "2026-07-29",
        isNew: true,
        url: "",
      },
    ],
  },
  calculus1b: {
    announcements: [
      {
        id: "calculus1b-start",
        scope: "미적분Ⅰ 정규2반",
        title: "미적분Ⅰ 정규2반 페이지 안내",
        summary: "정규2반 전용 수업 영상과 자료를 확인하세요.",
        date: "2026-07-30",
        content: [
          "이 페이지에는 미적분Ⅰ 정규2반 자료만 표시됩니다.",
          "입장 코드는 다른 반 학생에게 공유하지 마세요.",
        ],
      },
    ],
    videos: [],
    documents: [],
  },
  calculus2: {
    announcements: [
      {
        id: "calculus2-start",
        scope: "미적분Ⅱ",
        title: "미적분Ⅱ 수업 페이지 안내",
        summary: "미적분Ⅱ 수업 영상과 PDF 자료를 확인하세요.",
        date: "2026-07-30",
        content: [
          "수업 영상과 과제 PDF는 준비되는 대로 이 페이지에 등록합니다.",
        ],
      },
    ],
    videos: [],
    documents: [],
  },
  probability: {
    announcements: [
      {
        id: "probability-test",
        scope: "확률과 통계",
        title: "복습 테스트 범위 안내",
        summary: "조건부확률 단원까지 복습해 오세요.",
        date: "2026-07-25",
        content: [
          "다음 수업 시작 후 10분 동안 복습 테스트를 진행합니다.",
          "조건부확률 단원까지 교재 예제와 지난 과제를 다시 확인해 주세요.",
        ],
      },
    ],
    videos: [
      {
        id: "probability-video-04",
        subject: "확률과 통계 · 조건부확률",
        lesson: "04",
        title: "조건부확률의 계산",
        duration: "48분",
        date: "2026-07-29",
        isNew: true,
        url: "",
      },
    ],
    documents: [
      {
        id: "probability-document-01",
        title: "조건부확률 복습 문제",
        kind: "과제장",
        size: "1.8MB",
        date: "2026-07-28",
        isNew: false,
        url: "",
      },
    ],
  },
  geometry: {
    announcements: [
      {
        id: "geometry-start",
        scope: "기하",
        title: "기하 수업 페이지 안내",
        summary: "기하 수업 영상과 PDF 자료를 확인하세요.",
        date: "2026-07-30",
        content: [
          "수업 영상과 과제 PDF는 준비되는 대로 이 페이지에 등록합니다.",
        ],
      },
    ],
    videos: [],
    documents: [],
  },
  summer: {
    announcements: [
      {
        id: "summer-materials",
        scope: "여름 방학 특강",
        title: "여름 특강 2회차 준비물",
        summary: "배부한 교재와 지난 시간 필기 자료를 지참해 주세요.",
        date: "2026-07-28",
        content: [
          "여름 특강 2회차에는 지난 시간에 배부한 교재를 이어서 사용합니다.",
          "필기 자료와 오답 노트를 함께 지참해 주세요.",
        ],
      },
    ],
    videos: [
      {
        id: "summer-video-01",
        subject: "여름 특강 · 수열",
        lesson: "01",
        title: "수열의 구조를 보는 방법",
        duration: "68분",
        date: "2026-07-26",
        isNew: false,
        url: "",
      },
    ],
    documents: [
      {
        id: "summer-document-01",
        title: "수열 구조화 필기 자료",
        kind: "수업 자료",
        size: "4.2MB",
        date: "2026-07-26",
        isNew: false,
        url: "",
      },
    ],
  },
};

export function getClassRoute(path: string[]) {
  const route = path.join("/");
  return classRoutes.find((item) => item.path.join("/") === route);
}

export function getClassPageContent(classId: ClassId): ClassContent {
  const classContent = contentByClass[classId];

  return {
    ...classContent,
    announcements: [...globalAnnouncements, ...classContent.announcements],
  };
}
