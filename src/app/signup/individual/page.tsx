import Link from "next/link";
import { User, ArrowLeft } from "lucide-react";

export default function IndividualSignupPage() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-2xl">
      <Link href="/signup" className="inline-flex items-center text-gray-500 hover:text-blue-600 mb-8 transition-colors">
        <ArrowLeft className="w-4 h-4 mr-2" />
        회원유형 선택으로 돌아가기
      </Link>

      <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-200">
        <div className="flex items-center gap-4 mb-8 pb-6 border-b border-gray-100">
          <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center text-blue-600">
            <User className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">개인회원 가입</h1>
            <p className="text-gray-500 text-sm">필수 정보를 입력해주세요.</p>
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

          {/* Personal Info */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-gray-800">개인 정보</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">이름 <span className="text-red-500">*</span></label>
                <input type="text" className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500" placeholder="실명 입력" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">생년월일 <span className="text-red-500">*</span></label>
                <input type="text" className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500" placeholder="예: 19900101" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">휴대폰 번호 <span className="text-red-500">*</span></label>
                <div className="flex gap-2">
                  <input type="tel" className="flex-1 px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500" placeholder="'-' 없이 입력" />
                  <button type="button" className="px-4 py-2 bg-gray-100 text-gray-600 text-sm font-medium rounded hover:bg-gray-200">인증요청</button>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">성별 <span className="text-red-500">*</span></label>
                <div className="flex gap-4 pt-2">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="radio" name="gender" className="text-blue-600 focus:ring-blue-500" />
                    <span className="text-sm text-gray-700">남자</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="radio" name="gender" className="text-blue-600 focus:ring-blue-500" />
                    <span className="text-sm text-gray-700">여자</span>
                  </label>
                </div>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">이메일 <span className="text-red-500">*</span></label>
              <input type="email" className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500" placeholder="example@email.com" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">주소 <span className="text-red-500">*</span></label>
              <div className="flex gap-2 mb-2">
                <input type="text" className="w-32 px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500" placeholder="우편번호" readOnly />
                <button type="button" className="px-4 py-2 bg-gray-100 text-gray-600 text-sm font-medium rounded hover:bg-gray-200">주소검색</button>
              </div>
              <input type="text" className="w-full px-3 py-2 border border-gray-300 rounded mb-2 focus:outline-none focus:border-blue-500" placeholder="기본주소" readOnly />
              <input type="text" className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500" placeholder="상세주소 입력" />
            </div>
          </div>

          <hr className="border-gray-100" />

          {/* Additional Info */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-gray-800">추가 정보</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">희망 직종 <span className="text-red-500">*</span></label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500">
                  <option value="">선택해주세요</option>
                  <option value="fc">FC (설계사)</option>
                  <option value="tmr">TMR (상담원)</option>
                  <option value="general">총무/일반직</option>
                  <option value="manager">지점장/관리자</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">경력 사항 <span className="text-red-500">*</span></label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500">
                  <option value="">선택해주세요</option>
                  <option value="new">신입</option>
                  <option value="1">1년 미만</option>
                  <option value="3">1년 ~ 3년</option>
                  <option value="5">3년 ~ 5년</option>
                  <option value="over5">5년 이상</option>
                </select>
              </div>
            </div>
          </div>

          <div className="pt-6">
            <button type="submit" className="w-full bg-blue-600 text-white font-bold py-3 rounded-lg hover:bg-blue-700 transition-colors">
              회원가입 완료
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
