import { TalentCard } from "@/components/talents/TalentCard";
import { mockTalents } from "@/data/mock-talents";
import { Briefcase, Search } from "lucide-react";

export default function TalentsPage() {
  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-gray-200 pb-6">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center text-blue-600">
            <Briefcase className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">인재정보</h1>
            <p className="text-gray-500 text-sm mt-1">
              검증된 보험 전문 인재를 만나보세요.
            </p>
          </div>
        </div>
        
        <button className="bg-blue-600 text-white font-bold px-6 py-2.5 rounded-lg hover:bg-blue-700 transition-colors shadow-sm">
          이력서 등록하기
        </button>
      </div>

      {/* Search Filter (Simple Mock) */}
      <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 flex flex-col md:flex-row gap-3">
        <input 
          type="text" 
          placeholder="지역 또는 키워드로 인재를 검색해보세요." 
          className="flex-1 px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
        />
        <button className="bg-slate-800 text-white px-6 py-2 rounded font-bold hover:bg-slate-700 flex items-center justify-center gap-2">
          <Search className="w-4 h-4" />
          검색
        </button>
      </div>

      {/* Talents Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mockTalents.map((talent) => (
          <TalentCard key={talent.id} talent={talent} />
        ))}
      </div>

      {/* Pagination (Mock) */}
      <div className="flex justify-center pt-8">
        <div className="flex gap-2">
          <button className="w-8 h-8 flex items-center justify-center border border-gray-300 rounded hover:bg-gray-50 text-gray-500">&lt;</button>
          <button className="w-8 h-8 flex items-center justify-center bg-blue-600 text-white rounded font-bold">1</button>
          <button className="w-8 h-8 flex items-center justify-center border border-gray-300 rounded hover:bg-gray-50 text-gray-600">2</button>
          <button className="w-8 h-8 flex items-center justify-center border border-gray-300 rounded hover:bg-gray-50 text-gray-600">3</button>
          <button className="w-8 h-8 flex items-center justify-center border border-gray-300 rounded hover:bg-gray-50 text-gray-500">&gt;</button>
        </div>
      </div>
    </div>
  );
}
