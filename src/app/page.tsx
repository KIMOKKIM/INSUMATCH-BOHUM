import { Hero } from "@/components/home/Hero";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Hero />
      
      {/* Main Content Area Placeholder */}
      <div className="container mx-auto px-4 py-12 space-y-12">
        <section>
          <div className="flex items-center gap-2 mb-4">
            <h2 className="text-xl font-bold text-blue-600">프리미엄</h2>
            <span className="text-xl font-bold text-gray-800">채용정보</span>
          </div>
          <div className="w-full h-40 bg-gray-50 border border-gray-200 rounded flex items-center justify-center text-gray-400 text-sm">
            등록정보가 없습니다.
          </div>
        </section>

        <section>
          <div className="flex items-center gap-2 mb-4">
            <h2 className="text-xl font-bold text-blue-600">우대</h2>
            <span className="text-xl font-bold text-gray-800">채용정보</span>
          </div>
          <div className="w-full h-32 bg-gray-50 border border-gray-200 rounded flex items-center justify-center text-gray-400 text-sm">
            등록정보가 없습니다.
          </div>
        </section>

        <section>
          <div className="flex items-center gap-2 mb-4">
            <h2 className="text-xl font-bold text-blue-600">일반</h2>
            <span className="text-xl font-bold text-gray-800">채용정보</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Placeholder Cards */}
            {[1, 2, 3, 4, 5, 6, 7, 8].map((item) => (
              <div key={item} className="bg-white border border-gray-200 rounded p-4 hover:border-blue-500 transition-colors cursor-pointer">
                <div className="h-4 w-20 bg-gray-200 rounded mb-3"></div>
                <div className="h-5 w-3/4 bg-gray-200 rounded mb-2"></div>
                <div className="h-4 w-1/2 bg-gray-100 rounded"></div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
