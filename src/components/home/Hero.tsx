import { Search, ChevronDown } from "lucide-react";
import Image from "next/image";

export function Hero() {
  return (
    <div className="relative w-full h-[400px] bg-slate-900 overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        <Image
          src="/hero-bg.png"
          alt="Insurance Recruitment Background"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-blue-900/40 mix-blend-multiply" />
      </div>

      {/* Content Container */}
      <div className="relative container mx-auto px-4 h-full flex flex-col justify-center items-center text-center">
        {/* Main Heading */}
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-12 drop-shadow-md">
          AI 기술로 완성하는 최적의 매칭, <span className="text-yellow-400">Insumatch</span>가 보험 채용의 새로운 미래를 엽니다.
        </h1>

        {/* Search Filter Box */}
        <div className="bg-white/10 backdrop-blur-sm p-4 rounded-lg w-full max-w-4xl">
          <div className="flex flex-col md:flex-row gap-2">
            {/* Region Select */}
            <div className="relative flex-1">
              <select 
                className="w-full h-12 pl-4 pr-10 bg-white text-gray-700 text-sm border border-gray-200 rounded focus:outline-none focus:border-blue-500 appearance-none cursor-pointer"
                defaultValue=""
              >
                <option value="" disabled>시/도 선택</option>
                <option value="seoul">서울</option>
                <option value="gyeonggi">경기</option>
                <option value="incheon">인천</option>
                <option value="busan">부산</option>
                <option value="daegu">대구</option>
                <option value="gwangju">광주</option>
                <option value="daejeon">대전</option>
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
            </div>

            {/* Job Type Select */}
            <div className="relative flex-1">
              <select 
                className="w-full h-12 pl-4 pr-10 bg-white text-gray-700 text-sm border border-gray-200 rounded focus:outline-none focus:border-blue-500 appearance-none cursor-pointer"
                defaultValue=""
              >
                <option value="" disabled>직종선택</option>
                <option value="fc">FC (설계사)</option>
                <option value="tmr">TMR (상담원)</option>
                <option value="general">총무/일반직</option>
                <option value="manager">지점장/관리자</option>
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
            </div>

            {/* Search Button */}
            <button className="h-12 px-8 bg-slate-800 hover:bg-slate-700 text-white text-sm font-bold rounded flex items-center justify-center gap-2 transition-colors min-w-[120px]">
              <span>검색</span>
              <Search className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
