import Image from "next/image";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="mx-auto py-20 relative">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
          {/* 서비스 소개 */}
          <div className="pl-3 md:w-4/5">
            <div className="mb-8">
              <Image
                src="/Piction_Logo1.png"
                alt="Logo"
                width={150} // 너비
                height={150} // 높이
                style={{ height: "auto" }} // 비율 유지
              />
            </div>
            <p className="text-gray-400 mb-4">
              AI 기술을 활용하여 누구나 쉽게 자신만의 이야기를 만들 수 있는
              서비스입니다. 당신의 상상력과 AI의 창의성이 만나 무한한 이야기의
              세계를 경험해보세요.
            </p>
          </div>

          <div className="flex space-x-4 mt-4"></div>
        </div>

        <div className="border-t border-gray-800 pt-8 text-sm text-gray-400 text-center">
          <p>© Piction. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
