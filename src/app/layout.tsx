import type { Metadata } from "next";
import "./globals.css";
import AuthProvider from "@/components/AuthProvider";
import HeaderSelector from "@/components/Header/HeaderSelector";

export const metadata: Metadata = {
  title: "Piction - 선택이 만드는 무한한 이야기",
  description: "당신만의 스토리를 만들어보세요",
  icons: {
    icon: "/favicon-32x32.png",
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
