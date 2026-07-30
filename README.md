# DABU MATH 심플 학생 사이트

공지, YouTube 수업 영상, PDF 자료만 제공하는 모바일 중심의 정적 사이트입니다.

## 콘텐츠 바꾸기

`app/site-content.ts` 파일의 세 목록만 수정하면 됩니다.

- `announcements`: 공지사항
- `videos`: 수업 영상
- `documents`: PDF 자료

현재 각 항목의 `url`은 빈 값이라 시제품 안내 메시지를 보여줍니다. 실제
운영 전 영상에는 YouTube URL, PDF에는 Google Drive URL을 붙여 넣으면 새
창으로 연결됩니다.

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
