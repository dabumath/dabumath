"use client";

import { FormEvent, useEffect, useState } from "react";
import type {
  Announcement,
  ClassContent,
  ClassRoute,
  Video,
} from "./site-content";
import { loadClassContentFromSheet } from "./sheet-content";

type View = "home" | "videos" | "documents" | "notices";

const navigation: { id: View; label: string; shortLabel: string; icon: string }[] =
  [
    { id: "home", label: "홈", shortLabel: "홈", icon: "⌂" },
    { id: "videos", label: "수업 영상", shortLabel: "영상", icon: "▶" },
    { id: "documents", label: "PDF 자료", shortLabel: "자료", icon: "↓" },
    { id: "notices", label: "공지사항", shortLabel: "공지", icon: "●" },
  ];

const ACCESS_DURATION_MS = 30 * 24 * 60 * 60 * 1000;
const EMPTY_CONTENT: ClassContent = {
  announcements: [],
  videos: [],
  documents: [],
};

function formatDate(date: string) {
  return new Intl.DateTimeFormat("ko-KR", {
    month: "long",
    day: "numeric",
  }).format(new Date(`${date}T00:00:00`));
}

async function hashAccessCode(value: string) {
  const bytes = new TextEncoder().encode(value.trim().toLowerCase());
  const digest = await window.crypto.subtle.digest("SHA-256", bytes);

  return Array.from(new Uint8Array(digest))
    .map((byte) => byte.toString(16).padStart(2, "0"))
    .join("");
}

export default function ClassSite({
  classInfo,
  content,
  publicPreview = false,
}: {
  classInfo: ClassRoute;
  content: ClassContent;
  publicPreview?: boolean;
}) {
  const storageKey = `dabu-access:${classInfo.id}:${classInfo.accessVersion}`;
  const [unlocked, setUnlocked] = useState(false);
  const [accessCode, setAccessCode] = useState("");
  const [accessError, setAccessError] = useState("");
  const [checkingCode, setCheckingCode] = useState(false);
  const [sheetContent, setSheetContent] = useState<ClassContent | null>(null);
  const [sheetStatus, setSheetStatus] = useState<
    "idle" | "loading" | "live" | "error"
  >(publicPreview ? "idle" : "loading");

  useEffect(() => {
    const expiresAt = Number(window.localStorage.getItem(storageKey) ?? "0");
    setUnlocked(expiresAt > Date.now());
  }, [storageKey]);

  useEffect(() => {
    if (publicPreview) return;

    let cancelled = false;
    setSheetStatus("loading");
    setSheetContent(null);

    loadClassContentFromSheet(classInfo)
      .then((nextContent) => {
        if (cancelled) return;
        setSheetContent(nextContent);
        setSheetStatus("live");
      })
      .catch(() => {
        if (cancelled) return;
        setSheetStatus("error");
      });

    return () => {
      cancelled = true;
    };
  }, [classInfo, publicPreview]);

  async function submitAccessCode(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setCheckingCode(true);
    setAccessError("");

    try {
      const submittedHash = await hashAccessCode(accessCode);

      if (submittedHash !== classInfo.codeHash) {
        setAccessError("입장 코드를 다시 확인해 주세요.");
        return;
      }

      window.localStorage.setItem(
        storageKey,
        String(Date.now() + ACCESS_DURATION_MS),
      );
      setUnlocked(true);
      setAccessCode("");
    } catch {
      setAccessError("코드를 확인하지 못했습니다. 잠시 후 다시 시도해 주세요.");
    } finally {
      setCheckingCode(false);
    }
  }

  function forgetAccess() {
    window.localStorage.removeItem(storageKey);
    setUnlocked(false);
    setAccessError("");
  }

  if (publicPreview) {
    return (
      <LearningHub
        classInfo={classInfo}
        content={content}
        publicPreview
        sheetStatus="idle"
      />
    );
  }

  if (!unlocked) {
    return (
      <main className="access-page">
        <section className="access-panel" aria-labelledby="access-title">
          <div className="access-brand">
            <span className="wordmark-dot" aria-hidden="true" />
            <strong>DABU MATH</strong>
          </div>
          <span className="access-class">{classInfo.displayName}</span>
          <h1 id="access-title">수업 입장 코드를 입력해 주세요.</h1>
          <p>
            선생님께 전달받은 코드를 입력하면 이 기기에서 30일 동안 바로
            이용할 수 있습니다.
          </p>
          <form className="access-form" onSubmit={submitAccessCode}>
            <label htmlFor="class-access-code">수업 입장 코드</label>
            <div className="access-input-row">
              <input
                id="class-access-code"
                type="password"
                value={accessCode}
                onChange={(event) => setAccessCode(event.target.value)}
                placeholder="입장 코드"
                autoComplete="current-password"
                autoCapitalize="none"
                spellCheck={false}
                autoFocus
              />
              <button
                type="submit"
                disabled={!accessCode.trim() || checkingCode}
              >
                {checkingCode ? "확인 중" : "입장하기"}
              </button>
            </div>
            <p className="access-error" aria-live="polite">
              {accessError}
            </p>
          </form>
          <small>
            코드를 잊었다면 담당 선생님 또는 조교 선생님에게 문의해 주세요.
          </small>
        </section>
      </main>
    );
  }

  return (
    <LearningHub
      classInfo={classInfo}
      content={sheetContent ?? EMPTY_CONTENT}
      onForgetAccess={forgetAccess}
      sheetStatus={sheetStatus}
    />
  );
}

function LearningHub({
  classInfo,
  content,
  onForgetAccess,
  publicPreview = false,
  sheetStatus,
}: {
  classInfo: ClassRoute;
  content: ClassContent;
  onForgetAccess?: () => void;
  publicPreview?: boolean;
  sheetStatus: "idle" | "loading" | "live" | "error";
}) {
  const { announcements, videos, documents } = content;
  const displayName = publicPreview ? "공개 데모" : classInfo.displayName;
  const [view, setView] = useState<View>("home");
  const [selectedNotice, setSelectedNotice] = useState<Announcement | null>(
    null,
  );
  const [toast, setToast] = useState("");
  const todayNotice = announcements[0];

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

          <div className="class-context">
            <span>{displayName}</span>
            {publicPreview ? (
              <span className="preview-pill">코드 없이 체험 중</span>
            ) : (
              <button type="button" onClick={onForgetAccess}>
                입장 정보 삭제
              </button>
            )}
          </div>
        </div>
      </header>

      {sheetStatus === "error" && (
        <div className="sync-banner" role="status">
          최신 수업 자료를 불러오지 못했습니다. 잠시 후 다시 확인해 주세요.
        </div>
      )}

      <main>
        {view === "home" && (
          <>
            <section className="hero">
              <div className="hero-copy">
                <p className="eyebrow">DABU MATH · {displayName}</p>
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

              {todayNotice && (
                <button
                  className="today-notice"
                  type="button"
                  onClick={() => setSelectedNotice(todayNotice)}
                >
                  <span className="notice-kicker">오늘의 안내</span>
                  <strong>{todayNotice.title}</strong>
                  <span>{todayNotice.summary}</span>
                  <small>내용 확인하기 →</small>
                </button>
              )}
            </section>

            <section className="content-section">
              <SectionHeading
                eyebrow="CLASS VIDEO"
                title="최근 수업"
                action="전체 영상"
                onAction={() => changeView("videos")}
              />
              <div className="video-grid compact-grid">
                {videos.slice(0, 3).map((video) => (
                  <VideoItem
                    key={video.id}
                    video={video}
                    className={displayName}
                    onOpen={() =>
                      openResource(
                        video.url,
                        "아직 연결된 YouTube 영상이 없습니다.",
                      )
                    }
                  />
                ))}
              </div>
              {videos.length === 0 && <EmptyState label="수업 영상" />}
            </section>

            <section className="content-section divided-section">
              <SectionHeading
                eyebrow="NOTICE"
                title="새로운 소식"
                action="공지 전체"
                onAction={() => changeView("notices")}
              />
              <div className="notice-list">
                {announcements.slice(0, 3).map((notice) => (
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
                  ? `${displayName}의 수업 영상을 확인하세요.`
                  : view === "documents"
                    ? "과제장과 수업 자료를 PDF로 확인할 수 있습니다."
                    : "수업과 학원 운영에 관한 중요한 안내를 확인하세요."}
              </p>
            </section>

            {view === "videos" && (
              <section className="page-content">
                <div className="video-grid">
                  {videos.map((video) => (
                    <VideoItem
                      key={video.id}
                      video={video}
                      className={displayName}
                      onOpen={() =>
                        openResource(
                          video.url,
                          "아직 연결된 YouTube 영상이 없습니다.",
                        )
                      }
                    />
                  ))}
                </div>
                {videos.length === 0 && <EmptyState label="수업 영상" />}
              </section>
            )}

            {view === "documents" && (
              <section className="page-content document-list">
                {documents.map((document) => (
                  <button
                    className="document-row"
                    type="button"
                    key={document.id}
                    onClick={() =>
                      openResource(
                        document.url,
                        "아직 연결된 PDF가 없습니다.",
                      )
                    }
                  >
                    <span className="pdf-mark">{document.mark ?? "PDF"}</span>
                    <span className="document-copy">
                      <span className="row-meta">
                        {displayName} · {formatDate(document.date)}
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
                {documents.length === 0 && <EmptyState label="PDF 자료" />}
              </section>
            )}

            {view === "notices" && (
              <section className="page-content notice-list full-notice-list">
                {announcements.map((notice) => (
                  <NoticeItem
                    key={notice.id}
                    notice={notice}
                    onOpen={() => setSelectedNotice(notice)}
                  />
                ))}
                {announcements.length === 0 && <EmptyState label="공지" />}
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
          {publicPreview
            ? "피드백을 위한 공개 체험 페이지"
            : `${displayName} 학생 페이지`}
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
            <span className="notice-course">{selectedNotice.scope}</span>
            <h2 id="notice-title">{selectedNotice.title}</h2>
            <time>{formatDate(selectedNotice.date)}</time>
            <div className="modal-rule" />
            {selectedNotice.content.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
            {selectedNotice.url && (
              <button
                className="notice-link-button"
                type="button"
                onClick={() =>
                  openResource(
                    selectedNotice.url ?? "",
                    "연결된 링크가 없습니다.",
                  )
                }
              >
                {selectedNotice.buttonLabel || "링크 열기"} →
              </button>
            )}
          </article>
        </div>
      )}

      <div className={`toast ${toast ? "visible" : ""}`} role="status">
        {toast}
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
  className,
  onOpen,
}: {
  video: Video;
  className: string;
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
          {className} · {formatDate(video.date)}
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
        {notice.pinned ? "중요" : notice.scope}
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
  return <div className="empty-state">등록된 {label}이 없습니다.</div>;
}
