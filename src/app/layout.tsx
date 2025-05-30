import type { Metadata } from "next";
import "./globals.css";
import AuthProvider from "@/components/AuthProvider";
import HeaderSelector from "@/components/Header/HeaderSelector";

export const metadata: Metadata = {
  title: "Piction",
  description: "AI를 통해 당신만의 스토리를 만들어보세요",
  icons: {
    icon: "/favicon-32x32.png",
  },
  keywords: [
    "스토리 생성",
    "AI 스토리",
    "창작",
    "인터랙티브 이야기",
    "Piction",
    "AI소설",
  ],
  metadataBase: new URL("https://www.piction.site"),
  openGraph: {
    title: "Piction",
    description: "당신만의 스토리를 만들어보세요",
    url: "https://www.piction.site",
    siteName: "Piction",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Piction 대표 이미지",
      },
    ],
    locale: "ko_KR",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body>
        <div className="relative h-screen w-full flex flex-col">
          {/* 메인 콘텐츠 */}
          <div className={`relative z-10 flex flex-col h-full`}>
            <AuthProvider>
              <HeaderSelector />
              <main>{children}</main>
            </AuthProvider>
          </div>
        </div>
      </body>
    </html>
  );
}
