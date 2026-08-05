# DABU MATH 심플 학생 사이트

공지, YouTube 수업 영상, PDF 자료만 제공하는 모바일 중심의 정적 사이트입니다.

## 콘텐츠와 링크 바꾸기

학생 사이트는 아래 통합 Google Sheet를 실행할 때마다 읽습니다.

```text
https://docs.google.com/spreadsheets/d/1Gtv7HomDZWJt_DUlfOH4mncTpgGGdqQqU5p5TALEhtM/edit
```

- `게시 상태`가 `게시`인 행만 표시됩니다.
- `게시 시작일` 이전이거나 `게시 종료일`이 지난 행은 표시되지 않습니다.
- `공지`, `일정`은 공지사항에 표시됩니다.
- `영상보강`은 수업 영상에 표시됩니다.
- `과제`, `자료`, `링크`는 PDF 자료 화면에 표시됩니다.
- `반`이 `전체`인 행은 모든 수업 페이지에 표시됩니다.
- A/B반 공용 콘텐츠는 `공수2 전체` 또는 `미적분Ⅰ 전체`로 입력합니다.

GitHub Pages에서 로그인 없이 읽을 수 있도록 Google Sheet의 공유 범위는
`링크가 있는 모든 사용자 · 뷰어`여야 합니다.

## 로컬 실행

```bash
npm run dev
```

## GitHub Pages

`.github/workflows/deploy-pages.yml`이 포함되어 있습니다. 저장소의 Pages
설정을 `GitHub Actions`로 선택하고 `main` 브랜치에 올리면 정적 사이트가
자동으로 생성됩니다.

## 검증

```bash
npm test
npm run build:pages
```
