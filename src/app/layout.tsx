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
      <body className="overflow-hidden">
        <div className="relative h-screen w-full flex flex-col">
          {/* 배경 이미지 */}
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat -z-10"
            style={{ backgroundImage: "url('/book-background.jpg')" }}
          ></div>

          {/* 반투명 오버레이 */}
          <div className="absolute inset-0 bg-white/20 -z-10"></div>

          {/* 메인 콘텐츠 */}
          <div className={`relative z-10 flex flex-col h-full `}>
            <AuthProvider>
              <Header />
              <main className="flex-grow overflow-hidden">{children}</main>
            </AuthProvider>
          </div>
        </div>
      </body>
    </html>
  );
}
