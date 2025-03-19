import type { Metadata } from "next";
import "./globals.css";
import AuthProvider from "@/components/AuthProvider";
import Header from "@/components/Header";

export const metadata: Metadata = {
  title: "Piction - 선택이 만드는 무한한 이야기",
  description: "당신만의 스토리를 만들어보세요",
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
          <div
            className={`relative z-10 flex flex-col h-full bg-gradient-to-br from-white via-beige-100 to-stone-200`}
          >
            <AuthProvider>
              <Header />
              <main>{children}</main>
            </AuthProvider>
          </div>
        </div>
      </body>
    </html>
  );
}
