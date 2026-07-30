"use client";

import { useMemo, useState } from "react";
import {
  announcements,
  courses,
  documents,
  videos,
  type Announcement,
  type Course,
} from "./site-content";

type View = "home" | "videos" | "documents" | "notices";

const navigation: { id: View; label: string; shortLabel: string; icon: string }[] =
  [
    { id: "home", label: "홈", shortLabel: "홈", icon: "⌂" },
    { id: "videos", label: "수업 영상", shortLabel: "영상", icon: "▶" },
    { id: "documents", label: "PDF 자료", shortLabel: "자료", icon: "↓" },
    { id: "notices", label: "공지사항", shortLabel: "공지", icon: "●" },
  ];

function formatDate(date: string) {
  return new Intl.DateTimeFormat("ko-KR", {
    month: "long",
    day: "numeric",
  }).format(new Date(`${date}T00:00:00`));
}

export default function Home() {
  const [view, setView] = useState<View>("home");
  const [course, setCourse] = useState<Course>("전체");
  const [selectedNotice, setSelectedNotice] = useState<Announcement | null>(
    null,
  );
  const [toast, setToast] = useState("");

  const filteredVideos = useMemo(
    () =>
      videos.filter((item) => course === "전체" || item.course === course),
    [course],
  );
  const filteredDocuments = useMemo(
    () =>
      documents.filter(
        (item) =>
          course === "전체" ||
          item.course === course ||
          item.course === "전체",
      ),
    [course],
  );
  const filteredNotices = useMemo(
    () =>
      announcements.filter(
        (item) =>
          course === "전체" ||
          item.course === course ||
          item.course === "전체",
      ),
    [course],
  );

  function changeView(next: View) {
    setView(next);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function showDemoMessage(message: string) {
    setToast(message);
    window.setTimeout(() => setToast(""), 2800);
  }

  function openResource(url: string, fallbackMessage: string) {
    if (url) {
      window.open(url, "_blank", "noopener,noreferrer");
      return;
    }
    showDemoMessage(fallbackMessage);
  }

  return (
    <div className="site-shell">
      <header className="site-header">
        <div className="header-inner">
          <button
            className="wordmark"
            type="button"
            onClick={() => changeView("home")}
            aria-label="DABU MATH 홈"
          >
            <span className="wordmark-dot" aria-hidden="true" />
            <span>DABU MATH</span>
          </button>

          <nav className="desktop-nav" aria-label="주요 메뉴">
            {navigation.map((item) => (
              <button
                type="button"
                key={item.id}
                className={view === item.id ? "active" : ""}
                onClick={() => changeView(item.id)}
              >
                {item.label}
              </button>
            ))}
          </nav>

          <span className="update-label">7월 30일 업데이트</span>
        </div>
      </header>

      <main>
        {view === "home" && (
          <>
            <section className="hero">
              <div className="hero-copy">
                <p className="eyebrow">DABU MATH STUDENT</p>
                <h1>
                  필요한 수업과 자료를,
                  <br />
                  찾는 시간 없이.
                </h1>
                <p className="hero-description">
                  영상 보강과 과제 PDF, 중요한 공지를 한곳에서 확인하세요.
                  <br />
                  너희들의 어떤 노력도 헛되지 않도록.
                </p>
                <div className="hero-actions">
                  <button
                    className="primary-button"
                    type="button"
                    onClick={() => changeView("videos")}
                  >
                    최근 수업 보기 <span aria-hidden="true">→</span>
                  </button>
                  <button
                    className="text-button"
                    type="button"
                    onClick={() => changeView("documents")}
                  >
                    과제 PDF 찾기
                  </button>
                </div>
              </div>

              <button
                className="today-notice"
                type="button"
                onClick={() => setSelectedNotice(announcements[0])}
              >
                <span className="notice-kicker">오늘의 안내</span>
                <strong>{announcements[0].title}</strong>
                <span>{announcements[0].summary}</span>
                <small>내용 확인하기 →</small>
              </button>
            </section>

            <CourseFilter selected={course} onChange={setCourse} />

            <section className="content-section">
              <SectionHeading
                eyebrow="CLASS VIDEO"
                title="최근 수업"
                action="전체 영상"
                onAction={() => changeView("videos")}
              />
              <div className="video-grid compact-grid">
                {filteredVideos.slice(0, 3).map((video) => (
                  <VideoItem
                    key={video.id}
                    video={video}
                    onOpen={() =>
                      openResource(
                        video.url,
                        "실제 운영 시 연결된 YouTube 영상이 열립니다.",
                      )
                    }
                  />
                ))}
              </div>
              {filteredVideos.length === 0 && <EmptyState label="수업 영상" />}
            </section>

            <section className="content-section divided-section">
              <SectionHeading
                eyebrow="NOTICE"
                title="새로운 소식"
                action="공지 전체"
                onAction={() => changeView("notices")}
              />
              <div className="notice-list">
                {filteredNotices.slice(0, 3).map((notice) => (
                  <NoticeItem
                    key={notice.id}
                    notice={notice}
                    onOpen={() => setSelectedNotice(notice)}
                  />
                ))}
              </div>
            </section>
          </>
        )}

        {view !== "home" && (
          <div className="page">
            <section className="page-heading">
              <p className="eyebrow">
                {view === "videos"
                  ? "CLASS VIDEO"
                  : view === "documents"
                    ? "PDF LIBRARY"
                    : "NOTICE"}
              </p>
              <h1>
                {view === "videos"
                  ? "수업 영상"
                  : view === "documents"
                    ? "PDF 자료"
                    : "공지사항"}
              </h1>
              <p>
                {view === "videos"
                  ? "결석했거나 다시 보고 싶은 수업을 선택하세요."
                  : view === "documents"
                    ? "과제장과 수업 자료를 PDF로 확인할 수 있습니다."
                    : "수업과 학원 운영에 관한 중요한 안내를 확인하세요."}
              </p>
            </section>

            <CourseFilter selected={course} onChange={setCourse} />

            {view === "videos" && (
              <section className="page-content">
                <div className="video-grid">
                  {filteredVideos.map((video) => (
                    <VideoItem
                      key={video.id}
                      video={video}
                      onOpen={() =>
                        openResource(
                          video.url,
                          "실제 운영 시 연결된 YouTube 영상이 열립니다.",
                        )
                      }
                    />
                  ))}
                </div>
                {filteredVideos.length === 0 && <EmptyState label="수업 영상" />}
              </section>
            )}

            {view === "documents" && (
              <section className="page-content document-list">
                {filteredDocuments.map((document) => (
                  <button
                    className="document-row"
                    type="button"
                    key={document.id}
                    onClick={() =>
                      openResource(
                        document.url,
                        "실제 운영 시 연결된 PDF가 새 창에서 열립니다.",
                      )
                    }
                  >
                    <span className="pdf-mark">PDF</span>
                    <span className="document-copy">
                      <span className="row-meta">
                        {document.course} · {formatDate(document.date)}
                      </span>
                      <strong>{document.title}</strong>
                      <small>
                        {document.kind} · {document.size}
                      </small>
                    </span>
                    {document.isNew && <span className="new-badge">NEW</span>}
                    <span className="row-arrow" aria-hidden="true">
                      ↓
                    </span>
                  </button>
                ))}
                {filteredDocuments.length === 0 && (
                  <EmptyState label="PDF 자료" />
                )}
              </section>
            )}

            {view === "notices" && (
              <section className="page-content notice-list full-notice-list">
                {filteredNotices.map((notice) => (
                  <NoticeItem
                    key={notice.id}
                    notice={notice}
                    onOpen={() => setSelectedNotice(notice)}
                  />
                ))}
                {filteredNotices.length === 0 && <EmptyState label="공지" />}
              </section>
            )}
          </div>
        )}
      </main>

      <footer className="site-footer">
        <div>
          <strong>DABU MATH</strong>
          <p>생각을 가르치는 수학</p>
        </div>
        <p className="footer-note">
          본 화면은 운영 방식 확인을 위한 시제품입니다.
        </p>
      </footer>

      <nav className="mobile-nav" aria-label="모바일 메뉴">
        {navigation.map((item) => (
          <button
            key={item.id}
            type="button"
            className={view === item.id ? "active" : ""}
            onClick={() => changeView(item.id)}
          >
            <span aria-hidden="true">{item.icon}</span>
            {item.shortLabel}
          </button>
        ))}
      </nav>

      {selectedNotice && (
        <div
          className="modal-backdrop"
          role="presentation"
          onMouseDown={() => setSelectedNotice(null)}
        >
          <article
            className="notice-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="notice-title"
            onMouseDown={(event) => event.stopPropagation()}
          >
            <button
              className="modal-close"
              type="button"
              onClick={() => setSelectedNotice(null)}
              aria-label="공지 닫기"
            >
              ×
            </button>
            <span className="notice-course">{selectedNotice.course}</span>
            <h2 id="notice-title">{selectedNotice.title}</h2>
            <time>{formatDate(selectedNotice.date)}</time>
            <div className="modal-rule" />
            {selectedNotice.content.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </article>
        </div>
      )}

      <div className={`toast ${toast ? "visible" : ""}`} role="status">
        {toast}
      </div>
    </div>
  );
}

function CourseFilter({
  selected,
  onChange,
}: {
  selected: Course;
  onChange: (course: Course) => void;
}) {
  return (
    <div className="course-filter-wrap">
      <div className="course-filter" aria-label="수업 선택">
        {courses.map((item) => (
          <button
            type="button"
            key={item}
            className={selected === item ? "active" : ""}
            onClick={() => onChange(item)}
          >
            {item}
          </button>
        ))}
      </div>
    </div>
  );
}

function SectionHeading({
  eyebrow,
  title,
  action,
  onAction,
}: {
  eyebrow: string;
  title: string;
  action: string;
  onAction: () => void;
}) {
  return (
    <div className="section-heading">
      <div>
        <p className="eyebrow">{eyebrow}</p>
        <h2>{title}</h2>
      </div>
      <button type="button" onClick={onAction}>
        {action} <span aria-hidden="true">→</span>
      </button>
    </div>
  );
}

function VideoItem({
  video,
  onOpen,
}: {
  video: (typeof videos)[number];
  onOpen: () => void;
}) {
  return (
    <button className="video-item" type="button" onClick={onOpen}>
      <span className="video-visual">
        <span className="video-subject">{video.subject}</span>
        <span className="play-button" aria-hidden="true">
          ▶
        </span>
        <span className="video-number">{video.lesson}</span>
      </span>
      <span className="video-copy">
        <span className="row-meta">
          {video.course} · {formatDate(video.date)}
        </span>
        <strong>{video.title}</strong>
        <small>{video.duration}</small>
      </span>
      {video.isNew && <span className="new-badge">NEW</span>}
    </button>
  );
}

function NoticeItem({
  notice,
  onOpen,
}: {
  notice: Announcement;
  onOpen: () => void;
}) {
  return (
    <button className="notice-row" type="button" onClick={onOpen}>
      <span className={`notice-kind ${notice.pinned ? "pinned" : ""}`}>
        {notice.pinned ? "중요" : notice.course}
      </span>
      <span className="notice-copy">
        <strong>{notice.title}</strong>
        <small>{notice.summary}</small>
      </span>
      <time>{formatDate(notice.date)}</time>
      <span className="row-arrow" aria-hidden="true">
        →
      </span>
    </button>
  );
}

function EmptyState({ label }: { label: string }) {
  return (
    <div className="empty-state">
      선택한 수업에 등록된 {label}이 없습니다.
    </div>
  );
}
