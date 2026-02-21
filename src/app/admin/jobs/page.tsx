import Link from "next/link";
import { Search, MoreHorizontal, Plus, Filter } from "lucide-react";
import { getJobViewCount } from "@/lib/analytics";

export default function AdminJobsPage() {
  const jobs = [
    { id: 1, title: "삼성화재 강남지점 FC 모집", company: "삼성화재금융서비스", type: "FC", level: "PREMIUM", postedAt: "2024-02-15", status: "진행중" },
    { id: 2, title: "한화라이프랩 TMR 신입/경력 채용", company: "한화라이프랩", type: "TMR", level: "PREMIUM", postedAt: "2024-02-14", status: "진행중" },
    { id: 3, title: "DB손해보험 총무직 채용", company: "DB손해보험", type: "GENERAL", level: "SPECIAL", postedAt: "2024-02-13", status: "마감" },
    { id: 4, title: "메리츠화재 부산지점 설계사 모집", company: "메리츠화재", type: "FC", level: "GENERAL", postedAt: "2024-02-12", status: "진행중" },
    { id: 5, title: "현대해상 보상팀 경력직", company: "현대해상", type: "GENERAL", level: "GENERAL", postedAt: "2024-02-10", status: "심사중" },
  ].map(job => ({
    ...job,
    views: getJobViewCount(job.id.toString())
  }));

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-800">채용공고 관리</h2>
        <div className="flex gap-2">
          <button className="px-4 py-2 bg-white border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 flex items-center gap-2">
            <Filter className="w-4 h-4" />
            필터
          </button>
          <Link href="/admin/jobs/new" className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 flex items-center gap-2">
            <Plus className="w-4 h-4" />
            공고 등록
          </Link>
        </div>
      </div>

      {/* Search Bar */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
        <input 
          type="text" 
          placeholder="공고명, 회사명으로 검색..." 
          className="w-full pl-10 pr-4 py-3 bg-white border border-gray-200 rounded-lg focus:outline-none focus:border-blue-500"
        />
      </div>

      {/* Jobs Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase">공고명</th>
              <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase">회사명</th>
              <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase">직종</th>
              <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase">등급</th>
              <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase">등록일</th>
              <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase">조회수</th>
              <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase">상태</th>
              <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase text-right">관리</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {jobs.map((job) => (
              <tr key={job.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 text-sm font-medium text-gray-900">{job.title}</td>
                <td className="px-6 py-4 text-sm text-gray-500">{job.company}</td>
                <td className="px-6 py-4 text-sm text-gray-500">
                  <span className="px-2 py-1 bg-gray-100 rounded text-xs font-medium text-gray-600">
                    {job.type}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm text-gray-500">
                  <span className={`px-2 py-1 rounded text-xs font-medium ${
                    job.level === 'PREMIUM' ? 'bg-yellow-100 text-yellow-700' : 
                    job.level === 'SPECIAL' ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-600'
                  }`}>
                    {job.level}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm text-gray-500">{job.postedAt}</td>
                <td className="px-6 py-4 text-sm text-gray-500">{job.views.toLocaleString()}</td>
                <td className="px-6 py-4 text-sm">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    job.status === '진행중' ? 'bg-green-100 text-green-700' : 
                    job.status === '마감' ? 'bg-gray-100 text-gray-500' : 'bg-orange-100 text-orange-700'
                  }`}>
                    {job.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-right">
                  <button className="text-gray-400 hover:text-gray-600">
                    <MoreHorizontal className="w-5 h-5" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
