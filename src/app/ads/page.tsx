import { Mail, Phone } from "lucide-react";

export default function AdsPage() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <h1 className="text-3xl font-bold text-gray-900 mb-8 pb-4 border-b border-gray-200">배너광고 및 이용문의</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white p-8 rounded-xl border border-gray-200 shadow-sm">
          <h2 className="text-2xl font-bold text-blue-900 mb-4">광고 문의</h2>
          <p className="text-gray-600 mb-6">
            Insumatch의 프리미엄 배너 광고를 통해<br/>
            더 빠르고 효과적인 채용을 경험하세요.
          </p>
          
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-50 rounded-full flex items-center justify-center text-blue-600">
                <Phone className="w-5 h-5" />
              </div>
              <div>
                <div className="text-sm text-gray-500">광고 문의 전화</div>
                <div className="font-bold text-lg text-gray-900">02-1877-3407</div>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-50 rounded-full flex items-center justify-center text-blue-600">
                <Mail className="w-5 h-5" />
              </div>
              <div>
                <div className="text-sm text-gray-500">이메일 문의</div>
                <div className="font-bold text-lg text-gray-900">good78man@naver.com</div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-gray-50 p-8 rounded-xl border border-gray-200">
          <h2 className="text-xl font-bold text-gray-900 mb-4">광고 상품 안내</h2>
          <ul className="space-y-4 text-gray-600">
            <li className="flex items-start gap-2">
              <span className="bg-blue-600 text-white text-xs font-bold px-2 py-0.5 rounded mt-0.5">PREMIUM</span>
              <div>
                <strong className="block text-gray-900">메인 상단 배너</strong>
                <span className="text-sm">가장 높은 주목도의 최상단 대형 배너 영역</span>
              </div>
            </li>
            <li className="flex items-start gap-2">
              <span className="bg-yellow-500 text-white text-xs font-bold px-2 py-0.5 rounded mt-0.5">SPECIAL</span>
              <div>
                <strong className="block text-gray-900">우대 채용 강조</strong>
                <span className="text-sm">리스트 상단 고정 및 강조 효과 적용</span>
              </div>
            </li>
            <li className="flex items-start gap-2">
              <span className="bg-gray-500 text-white text-xs font-bold px-2 py-0.5 rounded mt-0.5">BASIC</span>
              <div>
                <strong className="block text-gray-900">일반 줄광고</strong>
                <span className="text-sm">저렴한 비용으로 효율적인 노출 가능</span>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
