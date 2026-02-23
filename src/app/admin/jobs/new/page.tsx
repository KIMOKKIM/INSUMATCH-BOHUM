 "use client";

import Link from "next/link";
import { ArrowLeft, Save } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { addJobAction } from "@/app/actions/jobs";

export default function NewJobPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    title: "",
    companyName: "",
    jobType: "FC",
    level: "GENERAL",
    location: "",
    salary: "",
    description: "",
    contact: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const id = Date.now().toString();
    const newJob = {
      id,
      title: formData.title,
      company: formData.companyName,
      type: formData.jobType,
      level: formData.level,
      location: formData.location,
      salary: formData.salary,
      description: formData.description,
      contact: formData.contact,
      postedAt: new Date().toISOString().slice(0,10),
      status: "진행중",
    };
    await addJobAction(newJob);
    alert("채용공고가 등록되었습니다. (서버 저장 완료) — 메인에 반영됩니다.");
    // reload to ensure admin list reflects server state
    router.push("/admin/jobs");
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex items-center gap-4 mb-8">
        <Link href="/admin/jobs" className="p-2 hover:bg-gray-100 rounded-full transition-colors">
          <ArrowLeft className="w-5 h-5 text-gray-600" />
        </Link>
        <h1 className="text-2xl font-bold text-gray-900">새 채용공고 등록</h1>
      </div>

      <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 space-y-8">
        {/* Basic Info */}
        <div className="space-y-6">
          <h3 className="text-lg font-bold text-gray-800 border-b border-gray-100 pb-2">기본 정보</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">공고 제목 <span className="text-red-500">*</span></label>
              <input 
                type="text" 
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                placeholder="예: 삼성화재 강남지점 신입 FC 모집"
                value={formData.title}
                onChange={(e) => setFormData({...formData, title: e.target.value})}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">회사명 <span className="text-red-500">*</span></label>
              <input 
                type="text" 
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                placeholder="회사명 입력"
                value={formData.companyName}
                onChange={(e) => setFormData({...formData, companyName: e.target.value})}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">근무지 <span className="text-red-500">*</span></label>
              <input 
                type="text" 
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                placeholder="예: 서울 강남구"
                value={formData.location}
                onChange={(e) => setFormData({...formData, location: e.target.value})}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">직종 <span className="text-red-500">*</span></label>
              <select 
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                value={formData.jobType}
                onChange={(e) => setFormData({...formData, jobType: e.target.value})}
              >
                <option value="FC">FC (설계사)</option>
                <option value="TMR">TMR (상담원)</option>
                <option value="GENERAL">총무/일반직</option>
                <option value="MANAGER">지점장/관리자</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">노출 등급 <span className="text-red-500">*</span></label>
              <select 
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                value={formData.level}
                onChange={(e) => setFormData({...formData, level: e.target.value})}
              >
                <option value="PREMIUM">PREMIUM (메인 상단)</option>
                <option value="SPECIAL">SPECIAL (메인 중단)</option>
                <option value="GENERAL">GENERAL (일반)</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">급여 조건</label>
              <input 
                type="text" 
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                placeholder="예: 연봉 4,000만원 + 인센티브"
                value={formData.salary}
                onChange={(e) => setFormData({...formData, salary: e.target.value})}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">담당자 연락처</label>
              <input 
                type="text" 
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                placeholder="예: 010-1234-5678"
                value={formData.contact}
                onChange={(e) => setFormData({...formData, contact: e.target.value})}
              />
            </div>
          </div>
        </div>

        {/* Detail Info */}
        <div className="space-y-6">
          <h3 className="text-lg font-bold text-gray-800 border-b border-gray-100 pb-2">상세 내용</h3>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">상세 설명</label>
            <textarea 
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 min-h-[300px]"
              placeholder="채용 상세 내용을 입력하세요..."
              value={formData.description}
              onChange={(e) => setFormData({...formData, description: e.target.value})}
            ></textarea>
          </div>
        </div>

        <div className="flex justify-end gap-3 pt-4 border-t border-gray-100">
          <Link 
            href="/admin/jobs"
            className="px-6 py-3 bg-gray-100 text-gray-700 font-bold rounded-lg hover:bg-gray-200 transition-colors"
          >
            취소
          </Link>
          <button 
            type="submit" 
            className="px-6 py-3 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
          >
            <Save className="w-4 h-4" />
            공고 등록하기
          </button>
        </div>
      </form>
    </div>
  );
}
