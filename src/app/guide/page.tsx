import { pricingPlans, legalNotice, invoiceInfo } from "@/data/guide-data";
import { Check, Shield, Info, Crown, Star, Megaphone } from "lucide-react";
import Link from "next/link";

export default function GuidePage() {
  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Hero Section */}
      <div className="bg-slate-900 text-white py-16 md:py-24">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-3xl md:text-5xl font-bold mb-6">
            Insumatch <span className="text-blue-400">이용안내</span>
          </h1>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto leading-relaxed">
            보험 광고의 새로운 기준, 인슈매치의 서비스와 혜택을 확인하세요.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 -mt-10">
        {/* Section 1: Legal Safeguard */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-12 border border-gray-100">
          <div className="flex flex-col md:flex-row items-center gap-6">
            <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center flex-shrink-0">
              <Shield className="w-8 h-8 text-blue-600" />
            </div>
            <div className="text-center md:text-left">
              <h2 className="text-xl font-bold text-gray-900 mb-2">서비스 정체성 안내</h2>
              <p className="text-gray-600 leading-relaxed font-medium">
                {legalNotice}
              </p>
            </div>
          </div>
        </div>

        {/* Section 1: Legal Safeguard */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">기업 광고 요금 안내</h2>
            <p className="text-gray-600">
              Insumatch는 공고 등록을 무료이며 기업 광고 수익으로 운영됩니다.<br/>
              합리적인 가격으로 최고의 광고 효과를 경험하세요.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {pricingPlans.map((plan) => (
              <div 
                key={plan.id} 
                className={`relative bg-white rounded-2xl shadow-xl border overflow-hidden flex flex-col ${
                  plan.id === 'platinum' ? 'border-yellow-200 ring-4 ring-yellow-100/50' : 
                  plan.id === 'gold' ? 'border-blue-100' : 'border-gray-200'
                }`}
              >
                {plan.isPopular && (
                  <div className="absolute top-0 right-0 bg-blue-600 text-white text-xs font-bold px-3 py-1 rounded-bl-lg z-10">
                    POPULAR
                  </div>
                )}
                
                <div className={`p-8 ${plan.id === 'platinum' ? 'bg-gradient-to-b from-slate-900 to-slate-800 text-white' : ''}`}>
                  <div className="flex items-center gap-2 mb-4">
                    {plan.id === 'platinum' && <Crown className="w-6 h-6 text-yellow-400" />}
                    {plan.id === 'gold' && <Star className="w-6 h-6 text-blue-600" />}
                    {plan.id === 'standard' && <Megaphone className="w-6 h-6 text-gray-400" />}
                    <h3 className={`text-xl font-bold ${plan.id === 'platinum' ? 'text-white' : 'text-gray-900'}`}>
                      {plan.name}
                    </h3>
                  </div>
                  <div className="flex items-baseline gap-1 mb-2">
                    <span className={`text-4xl font-bold ${plan.id === 'platinum' ? 'text-white' : 'text-gray-900'}`}>
                      {plan.price}
                    </span>
                    {plan.period && (
                      <span className={`text-sm ${plan.id === 'platinum' ? 'text-gray-400' : 'text-gray-500'}`}>
                        {plan.period}
                      </span>
                    )}
                  </div>
                  <p className={`text-sm ${plan.id === 'platinum' ? 'text-gray-400' : 'text-gray-500'}`}>
                    {plan.description}
                  </p>
                </div>

                <div className="p-8 flex-1 flex flex-col">
                  <ul className="space-y-4 mb-8 flex-1">
                    {plan.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-3 text-sm text-gray-600">
                        <Check className={`w-5 h-5 flex-shrink-0 ${
                          plan.id === 'platinum' ? 'text-yellow-500' : 
                          plan.id === 'gold' ? 'text-blue-500' : 'text-gray-400'
                        }`} />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <Link 
                    href={plan.id === 'standard' ? '/admin/jobs/new' : '/ads'}
                    className={`w-full py-4 rounded-xl font-bold text-center transition-all hover:opacity-90 shadow-md ${plan.buttonColor}`}
                  >
                    {plan.buttonText}
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Section 4: Invoice Info */}
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-gray-100 px-4 py-2 rounded-full text-xs text-gray-500">
            <Info className="w-3 h-3" />
            <span>{invoiceInfo}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
