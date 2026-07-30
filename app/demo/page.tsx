import ClassSite from "../class-site";
import { classRoutes, getClassPageContent } from "../site-content";

export const metadata = {
  title: "공개 데모 | DABU MATH",
  description:
    "학생과 선생님의 피드백을 위한 DABU MATH 공개 체험 페이지입니다.",
};

const demoClass = classRoutes.find((item) => item.id === "common2a");
const demoVideoUrl =
  "https://youtu.be/WnRVWf0gHmY?si=NiTJo6_Duw0Pdy37";

export default function DemoPage() {
  if (!demoClass) {
    return null;
  }

  const baseContent = getClassPageContent(demoClass.id);
  const demoContent = {
    ...baseContent,
    videos: baseContent.videos.map((video, index) =>
      index === 0 ? { ...video, url: demoVideoUrl } : video,
    ),
  };

  return (
    <ClassSite
      classInfo={demoClass}
      content={demoContent}
      publicPreview
    />
  );
}
