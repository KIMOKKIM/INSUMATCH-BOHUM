"use client";

import Link from "next/link";
import { Building2, ArrowLeft, ChevronRight, Check, RefreshCw, Volume2 } from "lucide-react";
import { useState, useEffect } from "react";
import AddressSearchModal from "@/components/common/AddressSearchModal";
import { TERMS_OF_SERVICE, PRIVACY_POLICY } from "@/data/legal";
import DaumPostcode from "react-daum-postcode";

export default function CompanySignupPage() {
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

  const handleAddressComplete = (data: any) => {
    setAddressData(prev => ({
      ...prev,
      zonecode: data.zonecode,
      address: data.address
    }));
    setIsAddressModalOpen(false);
  };

  const [id, setId] = useState("");
  const [phone, setPhone] = useState("");

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
    alert("기업회원 가입이 완료되었습니다. (테스트)");
    // Here you would typically send data to your backend
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
          <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center text-gray-600">
            <Building2 className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">기업 회원가입을 선택하셨습니다.</h1>
            <p className="text-gray-500 text-sm">
              {step === 1 ? "서비스 이용을 위한 약관에 동의해주세요." : "회원가입을 위하여 아래의 입력정보를 입력해주시길 바랍니다."}
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
          <form className="border-t border-gray-200" onSubmit={handleSubmit}>
            <div className="divide-y divide-gray-200">
              {/* Industry */}
              <div className="grid grid-cols-1 md:grid-cols-[180px_1fr] items-center py-4">
                <label className="font-bold text-gray-800 pl-4">업종</label>
                <div className="px-4 md:px-0">
                  <select className="w-full md:w-64 px-3 py-2 border border-gray-300 rounded-sm focus:outline-none focus:border-blue-500 text-sm">
                    <option value="">선택하세요</option>
                    <option value="ga">법인대리점 (GA)</option>
                    <option value="insurance">원수사 (생보/손보)</option>
                    <option value="tm_center">TM 센터</option>
                    <option value="other">기타</option>
                  </select>
                </div>
              </div>

              {/* ID */}
              <div className="grid grid-cols-1 md:grid-cols-[180px_1fr] items-center py-4">
                <label className="font-bold text-gray-800 pl-4">아이디</label>
                <div className="px-4 md:px-0">
                  <div className="flex gap-2">
                    <input 
                      type="text" 
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-sm focus:outline-none focus:border-blue-500 text-sm" 
                      placeholder="아이디" 
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
              </div>

              {/* Password */}
              <div className="grid grid-cols-1 md:grid-cols-[180px_1fr] items-center py-4">
                <label className="font-bold text-gray-800 pl-4">비밀번호</label>
                <div className="px-4 md:px-0">
                  <input type="password" className="w-full md:w-64 px-3 py-2 border border-gray-300 rounded-sm focus:outline-none focus:border-blue-500 text-sm" placeholder="비밀번호" />
                </div>
              </div>

              {/* Password Confirm */}
              <div className="grid grid-cols-1 md:grid-cols-[180px_1fr] items-center py-4">
                <label className="font-bold text-gray-800 pl-4">비밀번호 확인</label>
                <div className="px-4 md:px-0">
                  <input type="password" className="w-full md:w-64 px-3 py-2 border border-gray-300 rounded-sm focus:outline-none focus:border-blue-500 text-sm" placeholder="비밀번호 확인" />
                </div>
              </div>

              {/* Manager Name */}
              <div className="grid grid-cols-1 md:grid-cols-[180px_1fr] items-center py-4">
                <label className="font-bold text-gray-800 pl-4">담당자</label>
                <div className="px-4 md:px-0">
                  <input type="text" className="w-full md:w-64 px-3 py-2 border border-gray-300 rounded-sm focus:outline-none focus:border-blue-500 text-sm" placeholder="이름" />
                </div>
              </div>

              {/* Position */}
              <div className="grid grid-cols-1 md:grid-cols-[180px_1fr] items-center py-4">
                <label className="font-bold text-gray-800 pl-4">직책</label>
                <div className="px-4 md:px-0">
                  <input type="text" className="w-full md:w-64 px-3 py-2 border border-gray-300 rounded-sm focus:outline-none focus:border-blue-500 text-sm" placeholder="직책" />
                </div>
              </div>

              {/* Team Size */}
              <div className="grid grid-cols-1 md:grid-cols-[180px_1fr] items-center py-4">
                <label className="font-bold text-gray-800 pl-4">팀원수</label>
                <div className="px-4 md:px-0">
                  <input type="text" className="w-full md:w-64 px-3 py-2 border border-gray-300 rounded-sm focus:outline-none focus:border-blue-500 text-sm" placeholder="팀원수" />
                </div>
              </div>

              {/* Email */}
              <div className="grid grid-cols-1 md:grid-cols-[180px_1fr] items-center py-4">
                <label className="font-bold text-gray-800 pl-4">이메일</label>
                <div className="px-4 md:px-0">
                  <input type="email" className="w-full md:w-80 px-3 py-2 border border-gray-300 rounded-sm focus:outline-none focus:border-blue-500 text-sm" placeholder="E-mail" />
                </div>
              </div>

              {/* Contact (Landline) */}
              <div className="grid grid-cols-1 md:grid-cols-[180px_1fr] items-center py-4">
                <label className="font-bold text-gray-800 pl-4">연락처</label>
                <div className="px-4 md:px-0">
                  <input type="tel" className="w-full md:w-64 px-3 py-2 border border-gray-300 rounded-sm focus:outline-none focus:border-blue-500 text-sm" placeholder="연락처" />
                </div>
              </div>

              {/* Mobile */}
              <div className="grid grid-cols-1 md:grid-cols-[180px_1fr] items-center py-4">
                <label className="font-bold text-gray-800 pl-4">핸드폰</label>
                <div className="px-4 md:px-0">
                  <input 
                    type="tel" 
                    className="w-full md:w-64 px-3 py-2 border border-gray-300 rounded-sm focus:outline-none focus:border-blue-500 text-sm" 
                    placeholder="휴대폰번호" 
                    value={phone}
                    onChange={handlePhoneChange}
                    maxLength={13}
                  />
                </div>
              </div>

              {/* Company Name */}
              <div className="grid grid-cols-1 md:grid-cols-[180px_1fr] items-center py-4">
                <label className="font-bold text-gray-800 pl-4">회사명</label>
                <div className="px-4 md:px-0">
                  <input type="text" className="w-full md:w-64 px-3 py-2 border border-gray-300 rounded-sm focus:outline-none focus:border-blue-500 text-sm" placeholder="회사명" />
                </div>
              </div>

              {/* Business Registration Number */}
              <div className="grid grid-cols-1 md:grid-cols-[180px_1fr] items-center py-4">
                <label className="font-bold text-gray-800 pl-4">사업자번호</label>
                <div className="px-4 md:px-0">
                  <input type="text" className="w-full md:w-64 px-3 py-2 border border-gray-300 rounded-sm focus:outline-none focus:border-blue-500 text-sm" placeholder="사업자번호" />
                </div>
              </div>

              {/* Company Logo */}
              <div className="grid grid-cols-1 md:grid-cols-[180px_1fr] items-start py-4">
                <label className="font-bold text-gray-800 pl-4 pt-2">기업로고등록</label>
                <div className="px-4 md:px-0">
                  <div className="flex items-center gap-2 mb-2">
                    <label className="px-3 py-1.5 border border-gray-300 bg-gray-50 text-xs text-gray-600 rounded-sm cursor-pointer hover:bg-gray-100">
                      파일 선택
                      <input type="file" className="hidden" accept="image/*" />
                    </label>
                    <span className="text-xs text-gray-500">선택된 파일 없음</span>
                  </div>
                  <p className="text-xs text-gray-500 flex items-center gap-1">
                    <span className="w-3 h-3 bg-black text-white rounded-full flex items-center justify-center text-[8px]">!</span>
                    로고이미지 사이즈는(150 * 40)으로 업로드 해주시길 바랍니다.
                  </p>
                </div>
              </div>

              {/* Address */}
              <div className="grid grid-cols-1 md:grid-cols-[180px_1fr] items-start py-4">
                <label className="font-bold text-gray-800 pl-4 pt-2">주소</label>
                <div className="px-4 md:px-0 space-y-2">
                  <div className="flex gap-2">
                    <input 
                      type="text" 
                      className="w-32 px-3 py-2 border border-gray-300 rounded-sm bg-gray-50 text-sm" 
                      placeholder="우편번호" 
                      readOnly 
                      value={addressData.zonecode}
                    />
                    <button 
                      type="button" 
                      onClick={() => setIsAddressModalOpen(true)}
                      className="px-4 py-2 bg-slate-700 text-white text-sm font-medium rounded-sm hover:bg-slate-800"
                    >
                      주소 검색
                    </button>
                  </div>
                  <input 
                    type="text" 
                    className="w-full md:w-[500px] px-3 py-2 border border-gray-300 rounded-sm bg-gray-50 text-sm" 
                    placeholder="기본주소" 
                    readOnly 
                    value={addressData.address}
                  />
                  <input 
                    type="text" 
                    className="w-full md:w-[500px] px-3 py-2 border border-gray-300 rounded-sm focus:outline-none focus:border-blue-500 text-sm" 
                    placeholder="상세주소" 
                    value={addressData.detailAddress}
                    onChange={(e) => setAddressData(prev => ({ ...prev, detailAddress: e.target.value }))}
                  />
                  <input 
                    type="text" 
                    className="w-full md:w-[500px] px-3 py-2 border border-gray-300 rounded-sm focus:outline-none focus:border-blue-500 text-sm" 
                    placeholder="참고항목" 
                  />
                </div>
              </div>

              {/* CEO Name & Founded Year */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-4">
                <div className="grid grid-cols-[180px_1fr] items-center">
                  <label className="font-bold text-gray-800 pl-4">대표자명</label>
                  <div className="px-4 md:px-0">
                    <input type="text" className="w-full px-3 py-2 border border-gray-300 rounded-sm focus:outline-none focus:border-blue-500 text-sm" placeholder="대표자명" />
                  </div>
                </div>
                <div className="grid grid-cols-[100px_1fr] items-center">
                  <label className="font-bold text-gray-800 pl-4">설립연도</label>
                  <div className="px-4 md:px-0">
                    <input type="text" className="w-full px-3 py-2 border border-gray-300 rounded-sm focus:outline-none focus:border-blue-500 text-sm" placeholder="설립연도" />
                  </div>
                </div>
              </div>

              {/* Employee Count & Revenue */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-4 border-t border-gray-200">
                <div className="grid grid-cols-[180px_1fr] items-center">
                  <label className="font-bold text-gray-800 pl-4">직원수</label>
                  <div className="px-4 md:px-0">
                    <input type="text" className="w-full px-3 py-2 border border-gray-300 rounded-sm focus:outline-none focus:border-blue-500 text-sm" placeholder="직원수" />
                  </div>
                </div>
                <div className="grid grid-cols-[100px_1fr] items-center">
                  <label className="font-bold text-gray-800 pl-4">매출액</label>
                  <div className="px-4 md:px-0">
                    <input type="text" className="w-full px-3 py-2 border border-gray-300 rounded-sm focus:outline-none focus:border-blue-500 text-sm" placeholder="매출액" />
                  </div>
                </div>
              </div>

              {/* Business Type & Category */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-4 border-t border-gray-200">
                <div className="grid grid-cols-[180px_1fr] items-center">
                  <label className="font-bold text-gray-800 pl-4">업태</label>
                  <div className="px-4 md:px-0">
                    <input type="text" className="w-full px-3 py-2 border border-gray-300 rounded-sm focus:outline-none focus:border-blue-500 text-sm" placeholder="업태" />
                  </div>
                </div>
                <div className="grid grid-cols-[100px_1fr] items-center">
                  <label className="font-bold text-gray-800 pl-4">업종</label>
                  <div className="px-4 md:px-0">
                    <input type="text" className="w-full px-3 py-2 border border-gray-300 rounded-sm focus:outline-none focus:border-blue-500 text-sm" placeholder="업종" />
                  </div>
                </div>
              </div>

              {/* Business Description */}
              <div className="grid grid-cols-1 md:grid-cols-[180px_1fr] items-start py-4 border-t border-gray-200">
                <label className="font-bold text-gray-800 pl-4 pt-2">사업내용</label>
                <div className="px-4 md:px-0">
                  <textarea className="w-full h-32 px-3 py-2 border border-gray-300 rounded-sm focus:outline-none focus:border-blue-500 text-sm resize-none"></textarea>
                </div>
              </div>

              {/* Consents */}
              <div className="grid grid-cols-1 md:grid-cols-[180px_1fr] items-center py-4 border-t border-gray-200">
                <label className="font-bold text-gray-800 pl-4">이메일수신동의</label>
                <div className="px-4 md:px-0">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500" defaultChecked />
                    <span className="text-sm text-gray-700">이메일 수신을 동의합니다.</span>
                  </label>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-[180px_1fr] items-center py-4 border-t border-gray-200">
                <label className="font-bold text-gray-800 pl-4">SMS수신동의</label>
                <div className="px-4 md:px-0">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500" defaultChecked />
                    <span className="text-sm text-gray-700">SMS수신을 동의합니다.</span>
                  </label>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-[180px_1fr] items-center py-4 border-t border-gray-200">
                <label className="font-bold text-gray-800 pl-4">정보공개여부</label>
                <div className="px-4 md:px-0">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500" defaultChecked />
                    <span className="text-sm text-gray-700">정보를 공개합니다.</span>
                  </label>
                </div>
              </div>

              {/* Captcha */}
              <div className="grid grid-cols-1 md:grid-cols-[180px_1fr] items-center py-4 border-t border-gray-200">
                <label className="font-bold text-gray-800 pl-4">자동등록방지</label>
                <div className="px-4 md:px-0">
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
              </div>
            </div>

            {/* Buttons */}
            <div className="flex gap-2 justify-center pt-8 pb-4">
              <button 
                type="button" 
                onClick={() => setStep(1)}
                className="w-48 py-3 bg-white border border-gray-300 text-gray-800 font-bold hover:bg-gray-50 transition-colors"
              >
                취소
              </button>
              <button 
                type="submit" 
                className="w-48 py-3 bg-blue-500 text-white font-bold hover:bg-blue-600 transition-colors"
              >
                회원가입
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
