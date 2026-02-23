import { Users, Briefcase, Eye, TrendingUp } from "lucide-react";
import Link from "next/link";
import { getVisitorCount } from "@/lib/analytics";
import { getJobs } from "@/lib/jobsStore";
import ApproveButton from "@/components/admin/ApproveButton";

export default function AdminDashboard() {
  const visitorCount = getVisitorCount();

  return (
    <div className="space-y-8">
      <div className="flex items-start justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">대시보드</h2>
          <p className="text-gray-500">사이트 현황을 한눈에 확인하세요.</p>
        </div>
        <div className="flex items-center gap-3">
          <Link
            href="/admin/jobs/new"
            className="px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700"
          >
            공고 등록
          </Link>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-blue-50 text-blue-600 rounded-lg">
              <Users className="w-6 h-6" />
            </div>
            <span className="text-sm font-medium text-green-500 flex items-center gap-1">
              <TrendingUp className="w-3 h-3" /> +12%
            </span>
          </div>
          <h3 className="text-gray-500 text-sm font-medium">총 회원수</h3>
          <p className="text-2xl font-bold text-gray-900 mt-1">1,234명</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-purple-50 text-purple-600 rounded-lg">
              <Briefcase className="w-6 h-6" />
            </div>
            <span className="text-sm font-medium text-green-500 flex items-center gap-1">
              <TrendingUp className="w-3 h-3" /> +5%
            </span>
          </div>
          <h3 className="text-gray-500 text-sm font-medium">진행중인 공고</h3>
          <p className="text-2xl font-bold text-gray-900 mt-1">85건</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-orange-50 text-orange-600 rounded-lg">
              <Eye className="w-6 h-6" />
            </div>
            <span className="text-sm font-medium text-green-500 flex items-center gap-1">
              <TrendingUp className="w-3 h-3" /> +18%
            </span>
          </div>
          <h3 className="text-gray-500 text-sm font-medium">오늘 방문자</h3>
          <p className="text-2xl font-bold text-gray-900 mt-1">{visitorCount.toLocaleString()}명</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-green-50 text-green-600 rounded-lg">
              <Users className="w-6 h-6" />
            </div>
            <span className="text-sm font-medium text-green-500 flex items-center gap-1">
              <TrendingUp className="w-3 h-3" /> +8%
            </span>
          </div>
          <h3 className="text-gray-500 text-sm font-medium">신규 가입 (오늘)</h3>
          <p className="text-2xl font-bold text-gray-900 mt-1">24명</p>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h3 className="text-lg font-bold text-gray-800 mb-4">최근 가입 회원</h3>
          <div className="space-y-4">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="flex items-center justify-between py-2 border-b border-gray-50 last:border-0">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center text-xs font-bold text-gray-500">
                    U{i}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">홍길동{i}</p>
                    <p className="text-xs text-gray-500">개인회원</p>
                  </div>
                </div>
                <span className="text-xs text-gray-400">10분 전</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h3 className="text-lg font-bold text-gray-800 mb-4">최근 등록 공고</h3>
          <div className="space-y-4">
            {getJobs().slice(0, 5).map((job) => (
              <div key={job.id} className="flex items-center justify-between py-2 border-b border-gray-50 last:border-0">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-blue-50 rounded-lg flex items-center justify-center text-blue-600">
                    <Briefcase className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">{job.title}</p>
                    <p className="text-xs text-gray-500">{job.company}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-xs text-blue-600 font-medium bg-blue-50 px-2 py-1 rounded">
                    {job.status || "승인대기"}
                  </span>
                  {job.status === "승인대기" && <ApproveButton id={job.id} />}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
