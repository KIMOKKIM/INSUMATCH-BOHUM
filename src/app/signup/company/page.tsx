import Link from "next/link";
import { Building2, ArrowLeft } from "lucide-react";

export default function CompanySignupPage() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-2xl">
      <Link href="/signup" className="inline-flex items-center text-gray-500 hover:text-blue-600 mb-8 transition-colors">
        <ArrowLeft className="w-4 h-4 mr-2" />
        회원유형 선택으로 돌아가기
      </Link>

      <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-200">
        <div className="flex items-center gap-4 mb-8 pb-6 border-b border-gray-100">
          <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center text-gray-600">
            <Building2 className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">기업회원 가입</h1>
            <p className="text-gray-500 text-sm">기업 정보를 입력해주세요.</p>
          </div>
        </div>

        <form className="space-y-6">
          {/* Account Info */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-gray-800">계정 정보</h3>
            <div className="grid grid-cols-1 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">아이디 <span className="text-red-500">*</span></label>
                <div className="flex gap-2">
                  <input type="text" className="flex-1 px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500" placeholder="영문, 숫자 포함 6~12자" />
                  <button type="button" className="px-4 py-2 bg-gray-100 text-gray-600 text-sm font-medium rounded hover:bg-gray-200">중복확인</button>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">비밀번호 <span className="text-red-500">*</span></label>
                <input type="password" className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500" placeholder="영문, 숫자, 특수문자 포함 8자 이상" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">비밀번호 확인 <span className="text-red-500">*</span></label>
                <input type="password" className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500" placeholder="비밀번호 재입력" />
              </div>
            </div>
          </div>

          <hr className="border-gray-100" />

          {/* Company Info */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-gray-800">기업 정보</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">회사명 <span className="text-red-500">*</span></label>
                <input type="text" className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500" placeholder="(주)리치골든파트너" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">대표자명 <span className="text-red-500">*</span></label>
                <input type="text" className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500" placeholder="대표자 성함" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">사업자등록번호 <span className="text-red-500">*</span></label>
                <div className="flex gap-2">
                  <input type="text" className="flex-1 px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500" placeholder="'-' 없이 입력" />
                  <button type="button" className="px-4 py-2 bg-gray-100 text-gray-600 text-sm font-medium rounded hover:bg-gray-200">인증</button>
                </div>
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">회사 주소 <span className="text-red-500">*</span></label>
                <div className="flex gap-2 mb-2">
                  <input type="text" className="w-32 px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500" placeholder="우편번호" readOnly />
                  <button type="button" className="px-4 py-2 bg-gray-100 text-gray-600 text-sm font-medium rounded hover:bg-gray-200">주소검색</button>
                </div>
                <input type="text" className="w-full px-3 py-2 border border-gray-300 rounded mb-2 focus:outline-none focus:border-blue-500" placeholder="기본주소" readOnly />
                <input type="text" className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500" placeholder="상세주소 입력" />
              </div>
            </div>
          </div>

          <hr className="border-gray-100" />

          {/* Manager Info */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-gray-800">담당자 정보</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">담당자명 <span className="text-red-500">*</span></label>
                <input type="text" className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500" placeholder="담당자 성함" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">연락처 <span className="text-red-500">*</span></label>
                <input type="tel" className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500" placeholder="'-' 없이 입력" />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">이메일 <span className="text-red-500">*</span></label>
                <input type="email" className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500" placeholder="example@company.com" />
              </div>
            </div>
          </div>

          <div className="pt-6">
            <button type="submit" className="w-full bg-gray-800 text-white font-bold py-3 rounded-lg hover:bg-gray-700 transition-colors">
              기업회원 가입완료
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
