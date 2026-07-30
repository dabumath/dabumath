import type { Metadata } from "next";
import "./globals.css";

const title = "DABU MATH";
const description =
  "수업 영상과 PDF 자료, 중요한 공지를 한곳에서 확인하는 DABU MATH 학생 사이트.";
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
const ogImage = `${process.env.PAGES_BASE_PATH ?? ""}/og.png`;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title,
  description,
  openGraph: {
    title,
    description,
    type: "website",
    images: [{ url: ogImage, width: 1600, height: 900, alt: "DABU MATH" }],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: [ogImage],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  );
}
