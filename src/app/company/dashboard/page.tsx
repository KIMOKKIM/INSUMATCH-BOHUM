import Link from "next/link";
import { premiumJobs, specialJobs, generalJobs } from "@/data/mock-jobs";
import { getJobViewCount } from "@/lib/analytics";

type Props = {
  searchParams?: { company?: string };
};

export default function CompanyDashboard({ searchParams }: Props) {
  const companyName = (searchParams && searchParams.company) || "삼성생명";

  const allJobs = [...premiumJobs, ...specialJobs, ...generalJobs];
  const myJobs = allJobs.filter((j) => j.companyName === companyName);

  const totalJobs = myJobs.length;
  const totalViews = myJobs.reduce((acc, j) => acc + getJobViewCount(j.id), 0);

  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold">{companyName} 대시보드</h1>
          <p className="text-sm text-gray-500">기업 회원으로 로그인한 회사의 현황을 확인하고 공고를 등록/관리합니다.</p>
        </div>
        <div className="flex items-center gap-3">
          <Link
            href={`/company/jobs/new?company=${encodeURIComponent(companyName)}`}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg font-bold"
          >
            새 공고 등록
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
          <h3 className="text-sm text-gray-500">등록 공고 수</h3>
          <p className="text-2xl font-bold mt-2">{totalJobs}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
          <h3 className="text-sm text-gray-500">전체 조회수</h3>
          <p className="text-2xl font-bold mt-2">{totalViews.toLocaleString()}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
          <h3 className="text-sm text-gray-500">활성 공고</h3>
          <p className="text-2xl font-bold mt-2">{totalJobs} 개</p>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
        <h2 className="text-lg font-bold mb-4">공고 목록</h2>
        {myJobs.length === 0 ? (
          <div className="text-gray-500">{'등록된 공고가 없습니다. 오른쪽 상단의 "새 공고 등록"을 눌러 공고를 등록하세요.'}</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="px-4 py-3 text-sm text-gray-500">공고명</th>
                  <th className="px-4 py-3 text-sm text-gray-500">지역</th>
                  <th className="px-4 py-3 text-sm text-gray-500">등급</th>
                  <th className="px-4 py-3 text-sm text-gray-500">등록일</th>
                  <th className="px-4 py-3 text-sm text-gray-500">조회수</th>
                  <th className="px-4 py-3 text-sm text-gray-500">액션</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {myJobs.map((job) => (
                  <tr key={job.id}>
                    <td className="px-4 py-3">
                      <Link href={`/jobs/${job.id}`} className="font-medium text-blue-600">
                        {job.title}
                      </Link>
                    </td>
                    <td className="px-4 py-3 text-gray-600">{job.location || "-"}</td>
                    <td className="px-4 py-3 text-gray-600">{job.level}</td>
                    <td className="px-4 py-3 text-gray-600">{job.postedAt || "-"}</td>
                    <td className="px-4 py-3 text-gray-600">{getJobViewCount(job.id).toLocaleString()}</td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <Link
                          href={`/company/jobs/edit/${job.id}`}
                          className="text-sm text-blue-600 hover:underline"
                        >
                          수정
                        </Link>
                        <button
                          type="button"
                          onClick={() => alert("모의 삭제: 실제 삭제 로직은 서버 연동 필요")}
                          className="text-sm text-red-500 hover:underline"
                        >
                          삭제
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

