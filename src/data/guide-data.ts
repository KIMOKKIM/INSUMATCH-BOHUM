export interface PricingPlan {
  id: string;
  name: string;
  price: string;
  period?: string;
  description: string;
  features: string[];
  isPopular?: boolean;
  buttonText: string;
  buttonColor: string;
}

export const pricingPlans: PricingPlan[] = [
  {
    id: "standard",
    name: "일반 (Standard)",
    price: "55,000원",
    period: "/월",
    description: "직접 등록하여 부담 없이 시작하세요.",
    features: [
      "광고 직접 등록",
      "기본 리스트 노출"
    ],
    buttonText: "상품 문의",
    buttonColor: "bg-gray-800 text-white"
  },
  {
    id: "gold",
    name: "우대 (Gold)",
    price: "220,000원",
    period: "/월",
    description: "더 눈에 띄는 디자인으로 지원율을 높이세요.",
    features: [
      "공고 카드 디자인 기업 제공",
      "리스트 상단 'HOT' 아이콘 부착",
      "테두리 및 배경 강조 색상 적용",
      "우대 리스트 상위 노출"
    ],
    isPopular: true,
    buttonText: "상품 문의",
    buttonColor: "bg-blue-600 text-white"
  },
  {
    id: "platinum",
    name: "프리미엄 (Platinum)",
    price: "550,000원",
    period: "/월",
    description: "최고의 노출 효과와 전용 브랜딩을 경험하세요.",
    features: [
      "메인 최상단 슬라이드 배너 광고",
      "전용 랜딩페이지 제작 지원",
      "주 1회 '끌어올리기' 대행",
      "프리미엄 리스트 최상위 노출"
    ],
    buttonText: "상품 문의",
    buttonColor: "bg-gradient-to-r from-yellow-500 to-amber-600 text-black"
  }
];

export const legalNotice = "인슈매치는 구인·구직을 직접 알선하거나 중개하지 않으며, 보험 지점의 홍보 콘텐츠를 대행 제작하고 광고 지면을 제공하는 보험 광고 플랫폼입니다.";

export const invoiceInfo = "결제 및 세금계산서 발행 시 항목명은 '온라인 광고 게재료' 또는 '콘텐츠 제작 대행료'로 처리됩니다.";
