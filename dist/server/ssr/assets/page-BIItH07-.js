import { a as require_react, o as __toESM, t as require_jsx_runtime } from "../index.js";
//#region app/site-content.ts
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
var courses = [
	"전체",
	"고3 미적분 A",
	"고3 확률과 통계",
	"고2 수학 II",
	"여름 특강"
];
var announcements = [
	{
		id: 1,
		course: "전체",
		title: "여름방학 수업 및 학원 휴무 안내",
		summary: "8월 첫째 주 수업 시간과 학원 휴무일을 확인해 주세요.",
		date: "2026-07-30",
		pinned: true,
		content: ["8월 첫째 주에는 일부 수업 시간이 조정됩니다. 각 반별 변경 시간은 수업 시간에 다시 안내하겠습니다.", "학원 휴무일에는 질문 확인이 늦어질 수 있으니 급한 질문은 휴무일 전에 전달해 주세요."]
	},
	{
		id: 2,
		course: "고3 미적분 A",
		title: "함수의 극한 중단원 과제 업로드",
		summary: "과제장과 해설지를 PDF 자료에서 확인할 수 있습니다.",
		date: "2026-07-29",
		content: ["함수의 극한 중단원 과제장을 업로드했습니다.", "문제를 먼저 충분히 고민한 뒤 해설지를 확인해 주세요. 다음 수업에서 질문을 받겠습니다."]
	},
	{
		id: 3,
		course: "여름 특강",
		title: "여름 특강 2회차 준비물",
		summary: "배부한 교재와 지난 시간 필기 자료를 지참해 주세요.",
		date: "2026-07-28",
		content: ["여름 특강 2회차에는 지난 시간에 배부한 교재를 이어서 사용합니다.", "필기 자료와 오답 노트를 함께 지참해 주세요."]
	},
	{
		id: 4,
		course: "고3 확률과 통계",
		title: "복습 테스트 범위 안내",
		summary: "조건부확률 단원까지 복습해 오세요.",
		date: "2026-07-25",
		content: ["다음 수업 시작 후 10분 동안 복습 테스트를 진행합니다.", "조건부확률 단원까지 교재 예제와 지난 과제를 다시 확인해 주세요."]
	}
];
var videos = [
	{
		id: 1,
		course: "고3 미적분 A",
		subject: "미적분 · 함수의 극한",
		lesson: "03",
		title: "함수의 극한 활용",
		duration: "52분",
		date: "2026-07-30",
		isNew: true,
		url: ""
	},
	{
		id: 2,
		course: "고3 확률과 통계",
		subject: "확률과 통계 · 조건부확률",
		lesson: "04",
		title: "조건부확률의 계산",
		duration: "48분",
		date: "2026-07-29",
		isNew: true,
		url: ""
	},
	{
		id: 3,
		course: "고2 수학 II",
		subject: "수학 II · 미분",
		lesson: "02",
		title: "미분계수와 도함수",
		duration: "56분",
		date: "2026-07-27",
		isNew: false,
		url: ""
	},
	{
		id: 4,
		course: "여름 특강",
		subject: "여름 특강 · 수열",
		lesson: "01",
		title: "수열의 구조를 보는 방법",
		duration: "68분",
		date: "2026-07-26",
		isNew: false,
		url: ""
	},
	{
		id: 5,
		course: "고3 미적분 A",
		subject: "미적분 · 함수의 극한",
		lesson: "02",
		title: "미정계수의 결정",
		duration: "44분",
		date: "2026-07-23",
		isNew: false,
		url: ""
	},
	{
		id: 6,
		course: "고3 확률과 통계",
		subject: "확률과 통계 · 확률",
		lesson: "03",
		title: "독립사건과 종속사건",
		duration: "51분",
		date: "2026-07-22",
		isNew: false,
		url: ""
	}
];
var documents = [
	{
		id: 1,
		course: "고3 미적분 A",
		title: "함수의 극한 중단원 과제장",
		kind: "과제장",
		size: "2.4MB",
		date: "2026-07-29",
		isNew: true,
		url: ""
	},
	{
		id: 2,
		course: "고3 미적분 A",
		title: "함수의 극한 중단원 해설지",
		kind: "해설지",
		size: "3.1MB",
		date: "2026-07-29",
		isNew: true,
		url: ""
	},
	{
		id: 3,
		course: "고3 확률과 통계",
		title: "조건부확률 복습 문제",
		kind: "과제장",
		size: "1.8MB",
		date: "2026-07-28",
		isNew: false,
		url: ""
	},
	{
		id: 4,
		course: "여름 특강",
		title: "수열 구조화 필기 자료",
		kind: "수업 자료",
		size: "4.2MB",
		date: "2026-07-26",
		isNew: false,
		url: ""
	},
	{
		id: 5,
		course: "전체",
		title: "8월 학원 수업 일정표",
		kind: "안내문",
		size: "620KB",
		date: "2026-07-25",
		isNew: false,
		url: ""
	}
];
//#endregion
//#region app/page.tsx
var import_jsx_runtime = require_jsx_runtime();
var navigation = [
	{
		id: "home",
		label: "홈",
		shortLabel: "홈",
		icon: "⌂"
	},
	{
		id: "videos",
		label: "수업 영상",
		shortLabel: "영상",
		icon: "▶"
	},
	{
		id: "documents",
		label: "PDF 자료",
		shortLabel: "자료",
		icon: "↓"
	},
	{
		id: "notices",
		label: "공지사항",
		shortLabel: "공지",
		icon: "●"
	}
];
function formatDate(date) {
	return new Intl.DateTimeFormat("ko-KR", {
		month: "long",
		day: "numeric"
	}).format(/* @__PURE__ */ new Date(`${date}T00:00:00`));
}
function Home() {
	const [view, setView] = (0, import_react.useState)("home");
	const [course, setCourse] = (0, import_react.useState)("전체");
	const [selectedNotice, setSelectedNotice] = (0, import_react.useState)(null);
	const [toast, setToast] = (0, import_react.useState)("");
	const filteredVideos = (0, import_react.useMemo)(() => videos.filter((item) => course === "전체" || item.course === course), [course]);
	const filteredDocuments = (0, import_react.useMemo)(() => documents.filter((item) => course === "전체" || item.course === course || item.course === "전체"), [course]);
	const filteredNotices = (0, import_react.useMemo)(() => announcements.filter((item) => course === "전체" || item.course === course || item.course === "전체"), [course]);
	function changeView(next) {
		setView(next);
		window.scrollTo({
			top: 0,
			behavior: "smooth"
		});
	}
	function showDemoMessage(message) {
		setToast(message);
		window.setTimeout(() => setToast(""), 2800);
	}
	function openResource(url, fallbackMessage) {
		if (url) {
			window.open(url, "_blank", "noopener,noreferrer");
			return;
		}
		showDemoMessage(fallbackMessage);
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "site-shell",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("header", {
				className: "site-header",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "header-inner",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							className: "wordmark",
							type: "button",
							onClick: () => changeView("home"),
							"aria-label": "DABU MATH 홈",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "wordmark-dot",
								"aria-hidden": "true"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "DABU MATH" })]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
							className: "desktop-nav",
							"aria-label": "주요 메뉴",
							children: navigation.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								className: view === item.id ? "active" : "",
								onClick: () => changeView(item.id),
								children: item.label
							}, item.id))
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "update-label",
							children: "7월 30일 업데이트"
						})
					]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", { children: [view === "home" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					className: "hero",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "hero-copy",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "eyebrow",
								children: "DABU MATH STUDENT"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", { children: [
								"필요한 수업과 자료를,",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
								"찾는 시간 없이."
							] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "hero-description",
								children: [
									"영상 보강과 과제 PDF, 중요한 공지를 한곳에서 확인하세요.",
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
									"너희들의 어떤 노력도 헛되지 않도록."
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "hero-actions",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									className: "primary-button",
									type: "button",
									onClick: () => changeView("videos"),
									children: ["최근 수업 보기 ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										"aria-hidden": "true",
										children: "→"
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									className: "text-button",
									type: "button",
									onClick: () => changeView("documents"),
									children: "과제 PDF 찾기"
								})]
							})
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						className: "today-notice",
						type: "button",
						onClick: () => setSelectedNotice(announcements[0]),
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "notice-kicker",
								children: "오늘의 안내"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: announcements[0].title }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: announcements[0].summary }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: "내용 확인하기 →" })
						]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CourseFilter, {
					selected: course,
					onChange: setCourse
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					className: "content-section",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionHeading, {
							eyebrow: "CLASS VIDEO",
							title: "최근 수업",
							action: "전체 영상",
							onAction: () => changeView("videos")
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "video-grid compact-grid",
							children: filteredVideos.slice(0, 3).map((video) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(VideoItem, {
								video,
								onOpen: () => openResource(video.url, "실제 운영 시 연결된 YouTube 영상이 열립니다.")
							}, video.id))
						}),
						filteredVideos.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, { label: "수업 영상" })
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					className: "content-section divided-section",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionHeading, {
						eyebrow: "NOTICE",
						title: "새로운 소식",
						action: "공지 전체",
						onAction: () => changeView("notices")
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "notice-list",
						children: filteredNotices.slice(0, 3).map((notice) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NoticeItem, {
							notice,
							onOpen: () => setSelectedNotice(notice)
						}, notice.id))
					})]
				})
			] }), view !== "home" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "page",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
						className: "page-heading",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "eyebrow",
								children: view === "videos" ? "CLASS VIDEO" : view === "documents" ? "PDF LIBRARY" : "NOTICE"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", { children: view === "videos" ? "수업 영상" : view === "documents" ? "PDF 자료" : "공지사항" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: view === "videos" ? "결석했거나 다시 보고 싶은 수업을 선택하세요." : view === "documents" ? "과제장과 수업 자료를 PDF로 확인할 수 있습니다." : "수업과 학원 운영에 관한 중요한 안내를 확인하세요." })
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CourseFilter, {
						selected: course,
						onChange: setCourse
					}),
					view === "videos" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
						className: "page-content",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "video-grid",
							children: filteredVideos.map((video) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(VideoItem, {
								video,
								onOpen: () => openResource(video.url, "실제 운영 시 연결된 YouTube 영상이 열립니다.")
							}, video.id))
						}), filteredVideos.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, { label: "수업 영상" })]
					}),
					view === "documents" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
						className: "page-content document-list",
						children: [filteredDocuments.map((document) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							className: "document-row",
							type: "button",
							onClick: () => openResource(document.url, "실제 운영 시 연결된 PDF가 새 창에서 열립니다."),
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "pdf-mark",
									children: "PDF"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "document-copy",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: "row-meta",
											children: [
												document.course,
												" · ",
												formatDate(document.date)
											]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: document.title }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("small", { children: [
											document.kind,
											" · ",
											document.size
										] })
									]
								}),
								document.isNew && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "new-badge",
									children: "NEW"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "row-arrow",
									"aria-hidden": "true",
									children: "↓"
								})
							]
						}, document.id)), filteredDocuments.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, { label: "PDF 자료" })]
					}),
					view === "notices" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
						className: "page-content notice-list full-notice-list",
						children: [filteredNotices.map((notice) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NoticeItem, {
							notice,
							onOpen: () => setSelectedNotice(notice)
						}, notice.id)), filteredNotices.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, { label: "공지" })]
					})
				]
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("footer", {
				className: "site-footer",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "DABU MATH" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "생각을 가르치는 수학" })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "footer-note",
					children: "본 화면은 운영 방식 확인을 위한 시제품입니다."
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
				className: "mobile-nav",
				"aria-label": "모바일 메뉴",
				children: navigation.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					type: "button",
					className: view === item.id ? "active" : "",
					onClick: () => changeView(item.id),
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						"aria-hidden": "true",
						children: item.icon
					}), item.shortLabel]
				}, item.id))
			}),
			selectedNotice && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "modal-backdrop",
				role: "presentation",
				onMouseDown: () => setSelectedNotice(null),
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
					className: "notice-modal",
					role: "dialog",
					"aria-modal": "true",
					"aria-labelledby": "notice-title",
					onMouseDown: (event) => event.stopPropagation(),
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							className: "modal-close",
							type: "button",
							onClick: () => setSelectedNotice(null),
							"aria-label": "공지 닫기",
							children: "×"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "notice-course",
							children: selectedNotice.course
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							id: "notice-title",
							children: selectedNotice.title
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("time", { children: formatDate(selectedNotice.date) }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "modal-rule" }),
						selectedNotice.content.map((paragraph) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: paragraph }, paragraph))
					]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: `toast ${toast ? "visible" : ""}`,
				role: "status",
				children: toast
			})
		]
	});
}
function CourseFilter({ selected, onChange }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "course-filter-wrap",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "course-filter",
			"aria-label": "수업 선택",
			children: courses.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				className: selected === item ? "active" : "",
				onClick: () => onChange(item),
				children: item
			}, item))
		})
	});
}
function SectionHeading({ eyebrow, title, action, onAction }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "section-heading",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "eyebrow",
			children: eyebrow
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: title })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
			type: "button",
			onClick: onAction,
			children: [
				action,
				" ",
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					"aria-hidden": "true",
					children: "→"
				})
			]
		})]
	});
}
function VideoItem({ video, onOpen }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
		className: "video-item",
		type: "button",
		onClick: onOpen,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
				className: "video-visual",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "video-subject",
						children: video.subject
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "play-button",
						"aria-hidden": "true",
						children: "▶"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "video-number",
						children: video.lesson
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
				className: "video-copy",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "row-meta",
						children: [
							video.course,
							" · ",
							formatDate(video.date)
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: video.title }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: video.duration })
				]
			}),
			video.isNew && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "new-badge",
				children: "NEW"
			})
		]
	});
}
function NoticeItem({ notice, onOpen }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
		className: "notice-row",
		type: "button",
		onClick: onOpen,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: `notice-kind ${notice.pinned ? "pinned" : ""}`,
				children: notice.pinned ? "중요" : notice.course
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
				className: "notice-copy",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: notice.title }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: notice.summary })]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("time", { children: formatDate(notice.date) }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "row-arrow",
				"aria-hidden": "true",
				children: "→"
			})
		]
	});
}
function EmptyState({ label }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "empty-state",
		children: [
			"선택한 수업에 등록된 ",
			label,
			"이 없습니다."
		]
	});
}
//#endregion
export { Home as default };
