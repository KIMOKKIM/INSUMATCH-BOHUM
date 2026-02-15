import { PremiumJobCard } from "@/components/jobs/PremiumJobCard";
import { SpecialJobCard } from "@/components/jobs/SpecialJobCard";
import { GeneralJobCard } from "@/components/jobs/GeneralJobCard";
import { premiumJobs, specialJobs, generalJobs } from "@/data/mock-jobs";
import { User } from "lucide-react";

export default function FCPage() {
  // Filter jobs for FC type
  const fcPremiumJobs = premiumJobs.filter(job => job.jobType === 'FC');
  const fcSpecialJobs = specialJobs.filter(job => job.jobType === 'FC');
  const fcGeneralJobs = generalJobs.filter(job => job.jobType === 'FC');

  return (
    <div className="container mx-auto px-4 py-8 space-y-12">
      {/* Page Header */}
      <div className="flex items-center gap-3 border-b border-gray-200 pb-6">
        <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center text-blue-600">
          <User className="w-6 h-6" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">FC 모집</h1>
          <p className="text-gray-500 text-sm mt-1">
            전문적인 재무설계사(FC) 채용 정보를 확인하세요.
          </p>
        </div>
      </div>

      {/* Premium Section */}
      {fcPremiumJobs.length > 0 && (
        <section>
          <div className="flex items-center gap-2 mb-4">
            <h2 className="text-xl font-bold text-blue-600">PREMIUM</h2>
            <span className="text-xl font-bold text-gray-800">채용정보</span>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {fcPremiumJobs.map((job) => (
              <PremiumJobCard key={job.id} job={job} />
            ))}
          </div>
        </section>
      )}

      {/* Special Section */}
      {fcSpecialJobs.length > 0 && (
        <section>
          <div className="flex items-center gap-2 mb-4">
            <h2 className="text-xl font-bold text-blue-600">SPECIAL</h2>
            <span className="text-xl font-bold text-gray-800">우대 채용정보</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {fcSpecialJobs.map((job) => (
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
        
        {fcGeneralJobs.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {fcGeneralJobs.map((job) => (
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
