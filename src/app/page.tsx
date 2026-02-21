import { Hero } from "@/components/home/Hero";
import { PremiumJobCard } from "@/components/jobs/PremiumJobCard";
import { SpecialJobCard } from "@/components/jobs/SpecialJobCard";
import { GeneralJobCard } from "@/components/jobs/GeneralJobCard";
import { PremiumAdCard } from "@/components/ads/PremiumAdCard";
import { SpecialAdCard } from "@/components/ads/SpecialAdCard";
import { GeneralAdCard } from "@/components/ads/GeneralAdCard";
import { JobBoard } from "@/components/jobs/JobBoard";
import { premiumJobs, specialJobs, generalJobs } from "@/data/mock-jobs";
import { premiumAds, specialAds, generalAds } from "@/data/mock-ads";

export default function Home() {
  // 모든 채용공고 합치기
  const allJobs = [...premiumJobs, ...specialJobs, ...generalJobs];

  return (
    <div className="flex flex-col min-h-screen pb-20">
      <Hero />
      
      <div className="container mx-auto px-4 py-12 space-y-16">
        {/* Premium Section */}
        <section>
          <div className="flex items-center gap-3 mb-6 border-b border-gray-200 pb-4">
            <h2 className="text-2xl font-bold text-blue-600">PREMIUM</h2>
            <span className="text-2xl font-bold text-gray-800">채용정보</span>
            <span className="text-sm text-gray-500 ml-auto hidden sm:block">
              업계 최고의 대우를 보장하는 프리미엄 채용공고입니다.
            </span>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {premiumJobs.map((job) => (
              <PremiumJobCard key={job.id} job={job} />
            ))}
            {/* Premium Ad Card with Animation */}
            <PremiumAdCard ads={premiumAds} />
          </div>
        </section>

        {/* Special Section */}
        <section>
          <div className="flex items-center gap-3 mb-6 border-b border-gray-200 pb-4">
            <h2 className="text-2xl font-bold text-blue-600">SPECIAL</h2>
            <span className="text-2xl font-bold text-gray-800">우대 채용정보</span>
            <span className="text-sm text-gray-500 ml-auto hidden sm:block">
              엄선된 우대 채용공고를 확인하세요.
            </span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {specialJobs.map((job) => (
              <SpecialJobCard key={job.id} job={job} />
            ))}
            {/* Special Ad Card with Animation */}
            <SpecialAdCard ads={specialAds} />
          </div>
        </section>

        {/* General Section */}
        <section>
          <div className="flex items-center gap-3 mb-6 border-b border-gray-200 pb-4">
            <h2 className="text-2xl font-bold text-blue-600">GENERAL</h2>
            <span className="text-2xl font-bold text-gray-800">일반 채용정보</span>
            <span className="text-sm text-gray-500 ml-auto hidden sm:block">
              다양한 직무의 채용공고를 만나보세요.
            </span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {generalJobs.map((job) => (
              <GeneralJobCard key={job.id} job={job} />
            ))}
            {/* General Ad Card with Animation */}
            <GeneralAdCard ads={generalAds} />
          </div>
        </section>

        {/* All Jobs Board Section */}
        <section>
          <JobBoard jobs={allJobs} />
        </section>
      </div>
    </div>
  );
}
