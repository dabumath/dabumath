import { notFound } from "next/navigation";
import ClassSite from "../class-site";
import {
  classRoutes,
  getClassPageContent,
  getClassRoute,
} from "../site-content";

export const dynamicParams = false;

export function generateStaticParams() {
  return classRoutes.map((item) => ({
    classPath: [...item.path],
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ classPath: string[] }>;
}) {
  const { classPath } = await params;
  const classInfo = getClassRoute(classPath);

  return {
    title: classInfo
      ? `${classInfo.displayName} | DABU MATH`
      : "DABU MATH",
  };
}

export default async function ClassPage({
  params,
}: {
  params: Promise<{ classPath: string[] }>;
}) {
  const { classPath } = await params;
  const classInfo = getClassRoute(classPath);

  if (!classInfo) {
    notFound();
  }

  return (
    <ClassSite
      classInfo={classInfo}
      content={getClassPageContent(classInfo.id)}
    />
  );
}
