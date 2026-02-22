"use client";

import Link from "next/link";
import { User, ArrowLeft, ChevronRight, RefreshCw, Volume2 } from "lucide-react";
import { useState, useEffect } from "react";
import AddressSearchModal from "@/components/common/AddressSearchModal";
import { TERMS_OF_SERVICE, PRIVACY_POLICY } from "@/data/legal";


export default function IndividualSignupPage() {
  const [step, setStep] = useState(1);
  const [agreements, setAgreements] = useState({
    terms: false,
    privacy: false,
  });
  
  // Address State
  const [isAddressModalOpen, setIsAddressModalOpen] = useState(false);
  const [addressData, setAddressData] = useState({
    zonecode: '',
    address: '',
    detailAddress: ''
  });

  // Captcha State
  const [captchaValue, setCaptchaValue] = useState("");
  const [captchaInput, setCaptchaInput] = useState("");

  const generateCaptcha = () => {
    // Simple mock captcha generation
    const chars = "0123456789";
    let result = "";
    for (let i = 0; i < 6; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setCaptchaValue(result);
  };

  useEffect(() => {
    generateCaptcha();
  }, []);

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

  const handleAddressComplete = (data: { zonecode: string; address: string }) => {
    setAddressData(prev => ({
      ...prev,
      zonecode: data.zonecode,
      address: data.address
    }));
    setIsAddressModalOpen(false);
  };

  const [id, setId] = useState("");
  const [phone, setPhone] = useState("");
  const [resumeFile, setResumeFile] = useState<File | null>(null);

  const formatPhoneNumber = (value: string) => {
    const numbers = value.replace(/[^0-9]/g, "");
    if (numbers.length <= 3) return numbers;
    if (numbers.length <= 7) return `${numbers.slice(0, 3)}-${numbers.slice(3)}`;
    return `${numbers.slice(0, 3)}-${numbers.slice(3, 7)}-${numbers.slice(7, 11)}`;
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPhone(formatPhoneNumber(e.target.value));
  };

  const handleDuplicateCheck = () => {
    if (!id) {
      alert("아이디를 입력해주세요.");
      return;
    }
    
    // Mock duplicate check logic
    const takenIds = ["admin", "test", "user", "teomok1"];
    if (takenIds.includes(id)) {
      alert("이미 사용 중인 아이디입니다.");
    } else {
      alert("사용 가능한 아이디입니다.");
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (captchaInput !== captchaValue) {
      alert("자동등록방지 문자가 일치하지 않습니다.");
      return;
    }
    const resumeMessage = resumeFile ? "이력서가 첨부되었습니다." : "이력서 미첨부 — 기업으로부터 인터뷰 요청 시 이력서를 별도로 준비해 주세요.";
    alert(`개인회원 가입이 완료되었습니다. (테스트)\n\n${resumeMessage}`);
    // Here you would typically send data to your backend
  };

  // Date selectors - available for future use in date picker UI
  const _years = Array.from({ length: 60 }, (_, i) => 2026 - i);
  const _months = Array.from({ length: 12 }, (_, i) => i + 1);
  const _days = Array.from({ length: 31 }, (_, i) => i + 1);
  void _years; void _months; void _days;

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
                <div className="h-48 overflow-y-scroll text-xs text-gray-500 bg-gray-50 p-3 rounded border border-gray-100 whitespace-pre-wrap leading-relaxed">
                  {TERMS_OF_SERVICE}
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
                <div className="h-48 overflow-y-scroll text-xs text-gray-500 bg-gray-50 p-3 rounded border border-gray-100 whitespace-pre-wrap leading-relaxed">
                  {PRIVACY_POLICY}
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
          <form className="space-y-6" onSubmit={handleSubmit}>
            {/* Account Info */}
            <div className="space-y-4">
              <h3 className="text-lg font-bold text-gray-800">계정 정보</h3>
              <div className="grid grid-cols-1 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">아이디 <span className="text-red-500">*</span></label>
                  <div className="flex gap-2">
                    <input 
                      type="text" 
                      className="flex-1 px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500" 
                      placeholder="영문, 숫자 포함 6~12자" 
                      value={id}
                      onChange={(e) => setId(e.target.value)}
                    />
                    <button 
                      type="button" 
                      onClick={handleDuplicateCheck}
                      className="px-4 py-2 bg-gray-100 text-gray-600 text-sm font-medium rounded hover:bg-gray-200"
                    >
                      중복확인
                    </button>
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
                  <input 
                    type="tel" 
                    className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500" 
                    placeholder="'-' 없이 입력" 
                    value={phone}
                    onChange={handlePhoneChange}
                    maxLength={13}
                  />
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
                  <input 
                    type="text" 
                    className="w-32 px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500 bg-gray-50" 
                    placeholder="우편번호" 
                    readOnly 
                    value={addressData.zonecode}
                  />
                  <button 
                    type="button" 
                    onClick={() => setIsAddressModalOpen(true)}
                    className="px-4 py-2 bg-gray-100 text-gray-600 text-sm font-medium rounded hover:bg-gray-200"
                  >
                    주소검색
                  </button>
                </div>
                <input 
                  type="text" 
                  className="w-full px-3 py-2 border border-gray-300 rounded mb-2 focus:outline-none focus:border-blue-500 bg-gray-50" 
                  placeholder="기본주소" 
                  readOnly 
                  value={addressData.address}
                />
                <input 
                  type="text" 
                  className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500" 
                  placeholder="상세주소 입력" 
                  value={addressData.detailAddress}
                  onChange={(e) => setAddressData(prev => ({ ...prev, detailAddress: e.target.value }))}
                />
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

            {/* 이력서 첨부 (선택) */}
            <div className="space-y-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">이력서 첨부 (선택)</label>
              <div className="flex items-center gap-3">
                <input
                  type="file"
                  accept=".pdf,.doc,.docx"
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    const file = e.target.files && e.target.files[0];
                    setResumeFile(file || null);
                  }}
                  className="text-sm text-gray-600"
                />
                {resumeFile && (
                  <div className="flex items-center gap-2 bg-gray-50 px-3 py-2 rounded border border-gray-200">
                    <span className="text-sm text-gray-700 truncate max-w-xs">{resumeFile.name}</span>
                    <button
                      type="button"
                      onClick={() => setResumeFile(null)}
                      className="text-sm text-red-500 hover:underline"
                    >
                      삭제
                    </button>
                  </div>
                )}
              </div>
              <p className="text-xs text-gray-500 mt-1">
                선택사항: 이력서를 첨부하지 않으면 기업으로부터 인터뷰 요청 시 이력서를 별도로 준비해야 합니다.
              </p>
            </div>

            {/* Captcha */}
            <div className="space-y-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">자동등록방지 <span className="text-red-500">*</span></label>
              <div className="flex items-center gap-2">
                <div className="w-32 h-10 bg-gray-100 border border-gray-300 flex items-center justify-center text-2xl font-bold font-mono tracking-widest text-slate-600 select-none relative overflow-hidden" style={{ backgroundImage: 'url("data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI1IiBoZWlnaHQ9IjUiPgo8cmVjdCB3aWR0aD0iNSIgaGVpZ2h0PSI1IiBmaWxsPSIjZmZmIi8+CjxyZWN0IHdpZHRoPSIxIiBoZWlnaHQ9IjEiIGZpbGw9IiNjY2MiLz4KPC9zdmc+")' }}>
                  <div className="absolute inset-0 opacity-20 pointer-events-none" style={{ background: 'linear-gradient(45deg, transparent 45%, #000 50%, transparent 55%)' }}></div>
                  {captchaValue}
                </div>
                <input 
                  type="text" 
                  className="w-32 px-3 py-2 border border-gray-300 rounded-sm focus:outline-none focus:border-blue-500 text-sm" 
                  value={captchaInput}
                  onChange={(e) => setCaptchaInput(e.target.value)}
                />
                <button type="button" onClick={() => alert("음성 듣기 기능은 준비중입니다.")} className="p-2 bg-gray-200 rounded hover:bg-gray-300 text-gray-600">
                  <Volume2 className="w-5 h-5" />
                </button>
                <button type="button" onClick={generateCaptcha} className="p-2 bg-gray-200 rounded hover:bg-gray-300 text-gray-600">
                  <RefreshCw className="w-5 h-5" />
                </button>
              </div>
              <p className="text-xs text-gray-500 mt-1">자동등록방지 숫자를 순서대로 입력하세요.</p>
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

      {/* Address Search Modal */}
      {isAddressModalOpen && (
        <AddressSearchModal 
          onComplete={handleAddressComplete}
          onClose={() => setIsAddressModalOpen(false)}
        />
      )}
    </div>
  );
}
