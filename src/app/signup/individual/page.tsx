"use client";

import Link from "next/link";
import { User, ArrowLeft, Check, ChevronRight } from "lucide-react";
import { useState } from "react";

export default function IndividualSignupPage() {
  const [step, setStep] = useState(1);
  const [agreements, setAgreements] = useState({
    terms: false,
    privacy: false,
  });

  const allAgreed = agreements.terms && agreements.privacy;

  const handleNext = () => {
    if (allAgreed) {
      setStep(2);
      window.scrollTo(0, 0);
    } else {
      alert("필수 약관에 모두 동의해주세요.");
    }
  };

  const toggleAgreement = (key: 'terms' | 'privacy') => {
    setAgreements(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const toggleAll = () => {
    const newState = !allAgreed;
    setAgreements({ terms: newState, privacy: newState });
  };

  return (
    <div className="container mx-auto px-4 py-12 max-w-2xl">
      <Link href="/signup" className="inline-flex items-center text-gray-500 hover:text-blue-600 mb-8 transition-colors">
        <ArrowLeft className="w-4 h-4 mr-2" />
        회원유형 선택으로 돌아가기
      </Link>

      {/* Step Indicator */}
      <div className="flex items-center justify-center mb-8 gap-4">
        <div className={`flex items-center gap-2 ${step === 1 ? 'text-blue-600 font-bold' : 'text-gray-400'}`}>
          <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs ${step === 1 ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-500'}`}>1</div>
          약관동의
        </div>
        <ChevronRight className="w-4 h-4 text-gray-300" />
        <div className={`flex items-center gap-2 ${step === 2 ? 'text-blue-600 font-bold' : 'text-gray-400'}`}>
          <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs ${step === 2 ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-500'}`}>2</div>
          정보입력
        </div>
      </div>

      <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-200">
        <div className="flex items-center gap-4 mb-8 pb-6 border-b border-gray-100">
          <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center text-blue-600">
            <User className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">개인회원 가입</h1>
            <p className="text-gray-500 text-sm">
              {step === 1 ? "서비스 이용을 위한 약관에 동의해주세요." : "필수 정보를 입력해주세요."}
            </p>
          </div>
        </div>

        {step === 1 ? (
          <div className="space-y-6">
            <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
              <label className="flex items-center gap-3 cursor-pointer">
                <input 
                  type="checkbox" 
                  className="w-5 h-5 text-blue-600 rounded focus:ring-blue-500"
                  checked={allAgreed}
                  onChange={toggleAll}
                />
                <span className="font-bold text-gray-900">전체 약관에 동의합니다.</span>
              </label>
            </div>

            <div className="space-y-4">
              <div className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input 
                      type="checkbox" 
                      className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                      checked={agreements.terms}
                      onChange={() => toggleAgreement('terms')}
                    />
                    <span className="font-medium text-gray-700">이용약관 동의 (필수)</span>
                  </label>
                  <Link href="/terms" target="_blank" className="text-xs text-gray-500 underline">내용보기</Link>
                </div>
                <div className="h-24 overflow-y-auto text-xs text-gray-500 bg-gray-50 p-3 rounded border border-gray-100">
                  제1조 (목적) 본 약관은 (주)리치골든파트너(이하 "회사")가 운영하는 Insumatch 사이트(이하 "사이트")에서 제공하는 인터넷 관련 서비스(이하 "서비스")를 이용함에 있어 사이트와 이용자의 권리, 의무 및 책임사항을 규정함을 목적으로 합니다.<br/><br/>
                  제2조 (정의) 1. "사이트"란 회사가 재화 또는 용역을 이용자에게 제공하기 위하여 컴퓨터 등 정보통신설비를 이용하여 재화 또는 용역을 거래할 수 있도록 설정한 가상의 영업장을 말합니다.
                </div>
              </div>

              <div className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input 
                      type="checkbox" 
                      className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                      checked={agreements.privacy}
                      onChange={() => toggleAgreement('privacy')}
                    />
                    <span className="font-medium text-gray-700">개인정보 수집 및 이용 동의 (필수)</span>
                  </label>
                  <Link href="/privacy" target="_blank" className="text-xs text-gray-500 underline">내용보기</Link>
                </div>
                <div className="h-24 overflow-y-auto text-xs text-gray-500 bg-gray-50 p-3 rounded border border-gray-100">
                  1. 개인정보의 처리 목적<br/>
                  Insumatch은 다음의 목적을 위하여 개인정보를 처리합니다. 처리하고 있는 개인정보는 다음의 목적 이외의 용도로는 이용되지 않으며 이용 목적이 변경되는 경우에는 개인정보 보호법 제18조에 따라 별도의 동의를 받는 등 필요한 조치를 이행할 예정입니다.<br/>
                  - 회원 가입 및 관리<br/>
                  - 재화 또는 서비스 제공 (채용 공고 등록, 입사 지원 등)
                </div>
              </div>
            </div>

            <button 
              onClick={handleNext}
              className={`w-full py-3 rounded-lg font-bold transition-colors ${allAgreed ? 'bg-blue-600 text-white hover:bg-blue-700' : 'bg-gray-200 text-gray-400 cursor-not-allowed'}`}
              disabled={!allAgreed}
            >
              다음 단계로
            </button>
          </div>
        ) : (
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

            <div className="pt-6 flex gap-3">
              <button 
                type="button" 
                onClick={() => setStep(1)}
                className="w-1/3 bg-gray-100 text-gray-700 font-bold py-3 rounded-lg hover:bg-gray-200 transition-colors"
              >
                이전
              </button>
              <button type="submit" className="w-2/3 bg-blue-600 text-white font-bold py-3 rounded-lg hover:bg-blue-700 transition-colors">
                회원가입 완료
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
