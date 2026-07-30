export const courses = [
  "전체",
  "고3 미적분 A",
  "고3 확률과 통계",
  "고2 수학 II",
  "여름 특강",
] as const;

export type Course = (typeof courses)[number];
export type ContentCourse = Exclude<Course, "전체"> | "전체";

export type Announcement = {
  id: number;
  course: ContentCourse;
  title: string;
  summary: string;
  date: string;
  pinned?: boolean;
  content: string[];
};

export const announcements: Announcement[] = [
  {
    id: 1,
    course: "전체",
    title: "여름방학 수업 및 학원 휴무 안내",
    summary: "8월 첫째 주 수업 시간과 학원 휴무일을 확인해 주세요.",
    date: "2026-07-30",
    pinned: true,
    content: [
      "8월 첫째 주에는 일부 수업 시간이 조정됩니다. 각 반별 변경 시간은 수업 시간에 다시 안내하겠습니다.",
      "학원 휴무일에는 질문 확인이 늦어질 수 있으니 급한 질문은 휴무일 전에 전달해 주세요.",
    ],
  },
  {
    id: 2,
    course: "고3 미적분 A",
    title: "함수의 극한 중단원 과제 업로드",
    summary: "과제장과 해설지를 PDF 자료에서 확인할 수 있습니다.",
    date: "2026-07-29",
    content: [
      "함수의 극한 중단원 과제장을 업로드했습니다.",
      "문제를 먼저 충분히 고민한 뒤 해설지를 확인해 주세요. 다음 수업에서 질문을 받겠습니다.",
    ],
  },
  {
    id: 3,
    course: "여름 특강",
    title: "여름 특강 2회차 준비물",
    summary: "배부한 교재와 지난 시간 필기 자료를 지참해 주세요.",
    date: "2026-07-28",
    content: [
      "여름 특강 2회차에는 지난 시간에 배부한 교재를 이어서 사용합니다.",
      "필기 자료와 오답 노트를 함께 지참해 주세요.",
    ],
  },
  {
    id: 4,
    course: "고3 확률과 통계",
    title: "복습 테스트 범위 안내",
    summary: "조건부확률 단원까지 복습해 오세요.",
    date: "2026-07-25",
    content: [
      "다음 수업 시작 후 10분 동안 복습 테스트를 진행합니다.",
      "조건부확률 단원까지 교재 예제와 지난 과제를 다시 확인해 주세요.",
    ],
  },
];

export const videos = [
  {
    id: 1,
    course: "고3 미적분 A" as const,
    subject: "미적분 · 함수의 극한",
    lesson: "03",
    title: "함수의 극한 활용",
    duration: "52분",
    date: "2026-07-30",
    isNew: true,
    url: "",
  },
  {
    id: 2,
    course: "고3 확률과 통계" as const,
    subject: "확률과 통계 · 조건부확률",
    lesson: "04",
    title: "조건부확률의 계산",
    duration: "48분",
    date: "2026-07-29",
    isNew: true,
    url: "",
  },
  {
    id: 3,
    course: "고2 수학 II" as const,
    subject: "수학 II · 미분",
    lesson: "02",
    title: "미분계수와 도함수",
    duration: "56분",
    date: "2026-07-27",
    isNew: false,
    url: "",
  },
  {
    id: 4,
    course: "여름 특강" as const,
    subject: "여름 특강 · 수열",
    lesson: "01",
    title: "수열의 구조를 보는 방법",
    duration: "68분",
    date: "2026-07-26",
    isNew: false,
    url: "",
  },
  {
    id: 5,
    course: "고3 미적분 A" as const,
    subject: "미적분 · 함수의 극한",
    lesson: "02",
    title: "미정계수의 결정",
    duration: "44분",
    date: "2026-07-23",
    isNew: false,
    url: "",
  },
  {
    id: 6,
    course: "고3 확률과 통계" as const,
    subject: "확률과 통계 · 확률",
    lesson: "03",
    title: "독립사건과 종속사건",
    duration: "51분",
    date: "2026-07-22",
    isNew: false,
    url: "",
  },
];

export const documents = [
  {
    id: 1,
    course: "고3 미적분 A" as const,
    title: "함수의 극한 중단원 과제장",
    kind: "과제장",
    size: "2.4MB",
    date: "2026-07-29",
    isNew: true,
    url: "",
  },
  {
    id: 2,
    course: "고3 미적분 A" as const,
    title: "함수의 극한 중단원 해설지",
    kind: "해설지",
    size: "3.1MB",
    date: "2026-07-29",
    isNew: true,
    url: "",
  },
  {
    id: 3,
    course: "고3 확률과 통계" as const,
    title: "조건부확률 복습 문제",
    kind: "과제장",
    size: "1.8MB",
    date: "2026-07-28",
    isNew: false,
    url: "",
  },
  {
    id: 4,
    course: "여름 특강" as const,
    title: "수열 구조화 필기 자료",
    kind: "수업 자료",
    size: "4.2MB",
    date: "2026-07-26",
    isNew: false,
    url: "",
  },
  {
    id: 5,
    course: "전체" as const,
    title: "8월 학원 수업 일정표",
    kind: "안내문",
    size: "620KB",
    date: "2026-07-25",
    isNew: false,
    url: "",
  },
];
