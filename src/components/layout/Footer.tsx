import Link from "next/link";
import { Phone, Mail } from "lucide-react";

export function Footer() {
  return (
    <footer className="w-full bg-gray-50 border-t border-gray-200">
      {/* Top Info Section */}
      <div className="container mx-auto px-4 py-8 grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Notice */}
        <div className="flex flex-col gap-4">
          <h3 className="text-lg font-bold text-gray-800">공지사항</h3>
          <div className="text-sm text-gray-500">
            등록정보가 없습니다.
          </div>
        </div>

        {/* Customer Center */}
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-2">
            <h3 className="text-lg font-bold text-gray-800">고객센터</h3>
            <span className="text-sm text-gray-600">고객문의</span>
            <span className="text-xl font-bold text-blue-600">010-3091-0703</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <span className="font-medium">이메일</span>
            <a href="mailto:teomok1@gmail.com" className="hover:text-blue-600">teomok1@gmail.com</a>
          </div>
        </div>
      </div>

      {/* Bottom Info Section */}
      <div className="border-t border-gray-200 bg-white py-6">
        <div className="container mx-auto px-4">
          <div className="flex gap-4 text-sm text-gray-600 mb-4">
            <Link href="/terms" className="hover:text-gray-900">이용약관</Link>
            <Link href="/privacy" className="hover:text-gray-900 font-bold">개인정보처리방침</Link>
            <Link href="/ads" className="hover:text-gray-900">배너광고/이용문의</Link>
          </div>
          
          <div className="text-xs text-gray-500 space-y-1">
            <p>Insumatch에서 운영되는 사이트 내 판매되는 모든 상품은 Insumatch에서 책임지고 있습니다.</p>
            <p className="mt-2">
              TEL: 010-3091-0703 | 이메일: teomok1@gmail.com
            </p>
            <p className="mt-2 text-gray-400">
              Copyright©2026 Insumatch All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
