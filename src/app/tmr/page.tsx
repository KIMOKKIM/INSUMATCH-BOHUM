import { PremiumJobCard } from "@/components/jobs/PremiumJobCard";
import { SpecialJobCard } from "@/components/jobs/SpecialJobCard";
import { GeneralJobCard } from "@/components/jobs/GeneralJobCard";
import { premiumJobs, specialJobs, generalJobs } from "@/data/mock-jobs";
import { Phone } from "lucide-react";

export default function TMRPage() {
  // Filter jobs for TMR type
  const tmrPremiumJobs = premiumJobs.filter(job => job.jobType === 'TMR');
  const tmrSpecialJobs = specialJobs.filter(job => job.jobType === 'TMR');
  const tmrGeneralJobs = generalJobs.filter(job => job.jobType === 'TMR');

  return (
    <div className="container mx-auto px-4 py-8 space-y-12">
      {/* Page Header */}
      <div className="flex items-center gap-3 border-b border-gray-200 pb-6">
        <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center text-blue-600">
          <Phone className="w-6 h-6" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">TMR 모집</h1>
          <p className="text-gray-500 text-sm mt-1">
            인바운드/아웃바운드 텔레마케팅(TM) 채용 정보를 확인하세요.
          </p>
        </div>
      </div>

      {/* Premium Section */}
      {tmrPremiumJobs.length > 0 && (
        <section>
          <div className="flex items-center gap-2 mb-4">
            <h2 className="text-xl font-bold text-blue-600">PREMIUM</h2>
            <span className="text-xl font-bold text-gray-800">채용정보</span>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {tmrPremiumJobs.map((job) => (
              <PremiumJobCard key={job.id} job={job} />
            ))}
          </div>
        </section>
      )}

      {/* Special Section */}
      {tmrSpecialJobs.length > 0 && (
        <section>
          <div className="flex items-center gap-2 mb-4">
            <h2 className="text-xl font-bold text-blue-600">SPECIAL</h2>
            <span className="text-xl font-bold text-gray-800">우대 채용정보</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {tmrSpecialJobs.map((job) => (
              <SpecialJobCard key={job.id} job={job} />
            ))}
          </div>
        </section>
      )}

      {/* General Section */}
      <section>
        <div className="flex items-center gap-2 mb-4">
          <h2 className="text-xl font-bold text-blue-600">GENERAL</h2>
          <span className="text-xl font-bold text-gray-800">일반 채용정보</span>
        </div>
        
        {tmrGeneralJobs.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {tmrGeneralJobs.map((job) => (
              <GeneralJobCard key={job.id} job={job} />
            ))}
          </div>
        ) : (
          <div className="w-full h-40 bg-gray-50 border border-gray-200 rounded flex items-center justify-center text-gray-400 text-sm">
            등록된 일반 채용정보가 없습니다.
          </div>
        )}
      </section>
    </div>
  );
}
