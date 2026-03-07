import { MapPin, Building2, Calendar, Phone, Briefcase, DollarSign, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getJobs } from "@/lib/jobsStore";
import { JobViewTracker } from "@/components/common/JobViewTracker";

interface JobDetailPageProps {
  params: {
    id: string;
  };
}

export default function JobDetailPage({ params }: JobDetailPageProps) {
  // Load current jobs from the project's JSON/DB storage
  const allJobs = getJobs();
  const job = allJobs.find((j: any) => j.id === params.id);

  if (!job) {
    notFound();
  }

  // Map storage fields to the UI shape used by the page
  const title = job.title;
  const companyName = job.company ?? "";
  const jobType = job.type ?? "GENERAL";
  const postedAt = job.postedAt ?? "";
  const location = job.location ?? "";
  const salary = job.salary ?? "";
  const description = job.description ?? "";
  const contact = job.contact ?? "";

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <JobViewTracker id={params.id} />
      {/* Back Button */}
      <Link
        href="/"
        className="inline-flex items-center text-gray-500 hover:text-blue-600 mb-6 transition-colors"
      >
        <ArrowLeft className="w-4 h-4 mr-2" />
        목록으로 돌아가기
      </Link>

      <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">
        {/* Header Section */}
        <div className="p-6 md:p-8 border-b border-gray-100">
          <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-3">
                <span className="bg-blue-50 text-blue-600 text-xs font-bold px-2.5 py-1 rounded border border-blue-100">
                  {jobType}
                </span>
                <span className="text-gray-500 text-sm flex items-center gap-1">
                  <Calendar className="w-3 h-3" />
                  {postedAt} 등록
                </span>
              </div>
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2 leading-tight">
                {title}
              </h1>
              <div className="flex items-center gap-2 text-gray-600 font-medium">
                <Building2 className="w-4 h-4" />
                {companyName}
              </div>
            </div>

            {/* Apply Button (Desktop) */}
            <div className="hidden md:block">
              <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-lg transition-colors shadow-sm">
                지원하기
              </button>
            </div>
          </div>
        </div>

        {/* Info Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 border-b border-gray-100">
          <div className="p-6 border-b md:border-b-0 md:border-r border-gray-100 flex flex-col items-center text-center gap-2">
            <div className="w-10 h-10 bg-blue-50 rounded-full flex items-center justify-center text-blue-600 mb-1">
              <MapPin className="w-5 h-5" />
            </div>
            <span className="text-sm text-gray-500">근무지역</span>
            <span className="font-bold text-gray-900">{location}</span>
          </div>
          <div className="p-6 border-b md:border-b-0 md:border-r border-gray-100 flex flex-col items-center text-center gap-2">
            <div className="w-10 h-10 bg-green-50 rounded-full flex items-center justify-center text-green-600 mb-1">
              <DollarSign className="w-5 h-5" />
            </div>
            <span className="text-sm text-gray-500">급여조건</span>
            <span className="font-bold text-gray-900">{salary || "회사 내규에 따름"}</span>
          </div>
          <div className="p-6 flex flex-col items-center text-center gap-2">
            <div className="w-10 h-10 bg-purple-50 rounded-full flex items-center justify-center text-purple-600 mb-1">
              <Briefcase className="w-5 h-5" />
            </div>
            <span className="text-sm text-gray-500">고용형태</span>
            <span className="font-bold text-gray-900">{jobType} (위촉직/정규직)</span>
          </div>
        </div>

        {/* Description Section */}
        <div className="p-6 md:p-8">
          <h3 className="text-lg font-bold text-gray-900 mb-4">상세 모집 요강</h3>
          <div className="prose max-w-none text-gray-600 whitespace-pre-line">
            {description || "상세 모집 내용이 없습니다."}
          </div>
        </div>

        {/* Contact Section */}
        <div className="bg-gray-50 p-6 md:p-8 border-t border-gray-200">
          <h3 className="text-lg font-bold text-gray-900 mb-4">채용 담당자</h3>
          <div className="flex flex-col md:flex-row gap-4 md:items-center">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white border border-gray-200 rounded-full flex items-center justify-center text-gray-600">
                <Phone className="w-5 h-5" />
              </div>
              <div>
                <div className="text-sm text-gray-500">연락처</div>
                <div className="font-bold text-gray-900">{contact || "010-3091-0703 (고객센터)"}</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Sticky Apply Button (Mobile) */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t border-gray-200 md:hidden shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)]">
        <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-lg transition-colors">
          지원하기
        </button>
      </div>
    </div>
  );
}
