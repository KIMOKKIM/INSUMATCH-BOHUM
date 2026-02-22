 "use client";

import Link from "next/link";
import { ArrowLeft, Save } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function CompanyNewJob({ searchParams }: { searchParams?: { company?: string } }) {
  const router = useRouter();
  const companyFromParams = (searchParams && searchParams.company) || "";

  const [formData, setFormData] = useState({
    title: "",
    companyName: companyFromParams,
    jobType: "FC",
    level: "GENERAL",
    location: "",
    salary: "",
    description: "",
    contact: "",
    applyMethod: "email",
    applyTarget: "",
    tags: "",
    benefits: "",
    deadline: "",
    isVisible: true,
  });

  const [bannerFile, setBannerFile] = useState<File | null>(null);
  const [saving, setSaving] = useState(false);
  const [showPreview, setShowPreview] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files && e.target.files[0];
    setBannerFile(f || null);
  };

  const handleSaveDraft = () => {
    setSaving(true);
    // Mock save
    setTimeout(() => {
      setSaving(false);
      alert("공고가 임시저장되었습니다. (모의 동작)");
    }, 700);
  };

  const handlePublish = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    // Basic validation
    if (!formData.title || !formData.companyName) {
      alert("공고 제목과 회사명을 입력해주세요.");
      return;
    }
    setSaving(true);
    // Mock publish
    setTimeout(() => {
      setSaving(false);
      alert("공고가 공개되었습니다. (모의 동작)");
      router.push(`/company/dashboard?company=${encodeURIComponent(formData.companyName)}`);
    }, 900);
  };

  const handlePreview = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setShowPreview(true);
  };

  return (
    <div className="max-w-5xl mx-auto">
      <div className="flex items-center gap-4 mb-6">
        <Link href={`/company/dashboard?company=${encodeURIComponent(companyFromParams)}`} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
          <ArrowLeft className="w-5 h-5 text-gray-600" />
        </Link>
        <h1 className="text-2xl font-bold text-gray-900">공고 등록 / 수정 (기업 계정)</h1>
      </div>

      <form onSubmit={handlePublish} className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 space-y-6">
        <section className="space-y-4">
          <h3 className="text-lg font-bold text-gray-800">기본 정보</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">공고 제목 <span className="text-red-500">*</span></label>
              <input
                type="text"
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                placeholder="예: 서울 강남 지역 신입 FC 모집"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">회사명</label>
              <input
                type="text"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                value={formData.companyName}
                onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">근무지</label>
              <input
                type="text"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">직종</label>
              <select
                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                value={formData.jobType}
                onChange={(e) => setFormData({ ...formData, jobType: e.target.value })}
              >
                <option value="FC">FC</option>
                <option value="TMR">TMR</option>
                <option value="GENERAL">GENERAL</option>
                <option value="MANAGER">MANAGER</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">노출 등급</label>
              <select
                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                value={formData.level}
                onChange={(e) => setFormData({ ...formData, level: e.target.value })}
              >
                <option value="PREMIUM">PREMIUM</option>
                <option value="SPECIAL">SPECIAL</option>
                <option value="GENERAL">GENERAL</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">급여</label>
              <input
                type="text"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                value={formData.salary}
                onChange={(e) => setFormData({ ...formData, salary: e.target.value })}
              />
            </div>
          </div>
        </section>

        <section className="space-y-4">
          <h3 className="text-lg font-bold text-gray-800">상세 내용</h3>
          <label className="block text-sm font-medium text-gray-700 mb-1">상세 설명</label>
          <textarea
            className="w-full px-3 py-2 border border-gray-300 rounded-lg min-h-[220px]"
            placeholder="채용 상세 정보를 입력하세요. 업무 내용, 자격 요건, 근무 조건 등을 자세히 적어주세요."
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">채용 마감일</label>
              <input
                type="date"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                value={formData.deadline}
                onChange={(e) => setFormData({ ...formData, deadline: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">지원 방법</label>
              <select
                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                value={formData.applyMethod}
                onChange={(e) => setFormData({ ...formData, applyMethod: e.target.value })}
              >
                <option value="email">이메일 접수</option>
                <option value="url">외부 지원 URL</option>
                <option value="phone">전화 접수</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">지원 대상 (이메일 / URL / 전화)</label>
              <input
                type="text"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                value={formData.applyTarget}
                onChange={(e) => setFormData({ ...formData, applyTarget: e.target.value })}
              />
            </div>
          </div>
        </section>

        <section className="space-y-4">
          <h3 className="text-lg font-bold text-gray-800">추가 정보</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">태그 (쉼표로 구분)</label>
              <input
                type="text"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                placeholder="#정착지원금,#DB제공"
                value={formData.tags}
                onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">복리후생 / 혜택</label>
              <input
                type="text"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                placeholder="예: 교육비 지원, 인센티브"
                value={formData.benefits}
                onChange={(e) => setFormData({ ...formData, benefits: e.target.value })}
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">공고 배너 이미지 (선택)</label>
            <input type="file" accept="image/*" onChange={handleFileChange} className="text-sm text-gray-600" />
            {bannerFile && (
              <div className="mt-2 flex items-center gap-3">
                <span className="text-sm text-gray-700 truncate max-w-xs">{bannerFile.name}</span>
                <button type="button" onClick={() => setBannerFile(null)} className="text-sm text-red-500 hover:underline">
                  삭제
                </button>
              </div>
            )}
          </div>

          <div className="flex items-center gap-4">
            <label className="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                checked={formData.isVisible}
                onChange={(e) => setFormData({ ...formData, isVisible: e.target.checked })}
                className="w-4 h-4"
              />
              <span className="text-gray-700">공개 상태 (노출 여부)</span>
            </label>
            <span className="text-xs text-gray-500">비공개로 저장하면 기업 내부에서만 확인 가능합니다.</span>
          </div>
        </section>

        <div className="flex items-center justify-between gap-3 pt-4 border-t border-gray-100">
          <div className="flex items-center gap-2">
            <button type="button" onClick={handleSaveDraft} className="px-4 py-2 bg-gray-100 rounded-lg">
              임시저장
            </button>
            <button type="button" onClick={handlePreview} className="px-4 py-2 bg-white border rounded-lg">
              미리보기
            </button>
          </div>

          <div className="flex items-center gap-2">
            <Link
              href={`/company/dashboard?company=${encodeURIComponent(formData.companyName)}`}
              className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg"
            >
              취소
            </Link>
            <button
              type="submit"
              disabled={saving}
              className="px-5 py-2 bg-blue-600 text-white rounded-lg font-bold hover:bg-blue-700 disabled:opacity-60"
            >
              {saving ? "처리중..." : "공고 등록하기"}
            </button>
          </div>
        </div>
      </form>

      {/* Preview Modal */}
      {showPreview && (
        <div className="fixed inset-0 z-50 flex items-start justify-center p-6">
          <div className="absolute inset-0 bg-black/40" onClick={() => setShowPreview(false)} />
          <div className="relative max-w-3xl w-full bg-white rounded-lg shadow-xl p-6 z-10">
            <div className="flex items-start justify-between mb-4">
              <h2 className="text-xl font-bold">공고 미리보기</h2>
              <button className="text-sm text-gray-500" onClick={() => setShowPreview(false)}>닫기</button>
            </div>
            <div>
              {bannerFile && <div className="mb-4 text-sm text-gray-600">첨부 이미지: {bannerFile.name}</div>}
              <h3 className="text-lg font-bold mb-2">{formData.title}</h3>
              <div className="text-sm text-gray-600 mb-2">{formData.companyName} • {formData.location}</div>
              <div className="mb-4 whitespace-pre-wrap text-gray-700">{formData.description || "설명 없음"}</div>
              <div className="text-sm text-gray-600">
                <strong>마감일:</strong> {formData.deadline || "-"} • <strong>지원:</strong> {formData.applyMethod} {formData.applyTarget ? `• ${formData.applyTarget}` : ""}
              </div>
              <div className="mt-4 text-sm text-gray-600"><strong>태그:</strong> {formData.tags || "-"}</div>
              <div className="mt-2 text-sm text-gray-600"><strong>혜택:</strong> {formData.benefits || "-"}</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

