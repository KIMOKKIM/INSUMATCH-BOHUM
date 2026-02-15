import Link from "next/link";
import { User, Building2, Check } from "lucide-react";

export default function SignupPage() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-3xl">
      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold text-gray-900">회원가입</h1>
        <p className="mt-2 text-gray-600">
          Insumatch의 회원이 되어 다양한 혜택을 누려보세요.
        </p>
      </div>

      {/* Step Indicator (Mock) */}
      <div className="flex justify-center mb-12">
        <div className="flex items-center">
          <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-sm">1</div>
          <span className="ml-2 text-blue-600 font-bold">약관동의</span>
          <div className="w-12 h-1 bg-gray-200 mx-4"></div>
          <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center text-gray-500 font-bold text-sm">2</div>
          <span className="ml-2 text-gray-500">정보입력</span>
          <div className="w-12 h-1 bg-gray-200 mx-4"></div>
          <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center text-gray-500 font-bold text-sm">3</div>
          <span className="ml-2 text-gray-500">가입완료</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Individual Member Card */}
        <Link href="/signup/individual" className="block h-full">
          <div className="bg-white border border-gray-200 rounded-xl p-8 hover:border-blue-500 transition-colors cursor-pointer group shadow-sm hover:shadow-md h-full flex flex-col">
            <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center text-blue-600 mb-6 group-hover:bg-blue-600 group-hover:text-white transition-colors">
              <User className="w-8 h-8" />
            </div>
            <h2 className="text-xl font-bold text-gray-900 mb-2">개인회원</h2>
            <p className="text-gray-500 text-sm mb-6 h-10">
              취업을 희망하시는 개인 구직자 분들을 위한 회원가입입니다.
            </p>
            <ul className="space-y-2 mb-8 text-sm text-gray-600 flex-grow">
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-blue-500" /> 이력서 등록 및 관리
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-blue-500" /> 관심 기업 스크랩
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-blue-500" /> 입사 지원 현황 확인
              </li>
            </ul>
            <div className="w-full bg-blue-600 text-white font-bold py-3 rounded-lg hover:bg-blue-700 transition-colors text-center">
              개인회원 가입하기
            </div>
          </div>
        </Link>

        {/* Corporate Member Card */}
        <Link href="/signup/company" className="block h-full">
          <div className="bg-white border border-gray-200 rounded-xl p-8 hover:border-blue-500 transition-colors cursor-pointer group shadow-sm hover:shadow-md h-full flex flex-col">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center text-gray-600 mb-6 group-hover:bg-blue-600 group-hover:text-white transition-colors">
              <Building2 className="w-8 h-8" />
            </div>
            <h2 className="text-xl font-bold text-gray-900 mb-2">기업회원</h2>
            <p className="text-gray-500 text-sm mb-6 h-10">
              인재 채용을 희망하시는 기업/지점 담당자 분들을 위한 회원가입입니다.
            </p>
            <ul className="space-y-2 mb-8 text-sm text-gray-600 flex-grow">
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-blue-500" /> 채용 공고 등록 및 관리
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-blue-500" /> 인재 정보 열람
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-blue-500" /> 지원자 관리 시스템
              </li>
            </ul>
            <div className="w-full bg-gray-800 text-white font-bold py-3 rounded-lg hover:bg-gray-700 transition-colors text-center">
              기업회원 가입하기
            </div>
          </div>
        </Link>
      </div>

      <div className="mt-12 text-center text-sm text-gray-500">
        이미 아이디가 있으신가요? <Link href="/login" className="text-blue-600 font-bold hover:underline">로그인하기</Link>
      </div>
    </div>
  );
}
