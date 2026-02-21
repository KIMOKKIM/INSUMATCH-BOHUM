export interface AdItem {
  id: string;
  type: 'PREMIUM' | 'SPECIAL' | 'GENERAL';
  companyName: string;
  title: string;
  description: string;
  link: string;
  imageUrl?: string; // Premium only
}

export const premiumAds: AdItem[] = [
  {
    id: "p-ad-1",
    type: "PREMIUM",
    companyName: "(주)Insumatch",
    title: "귀사의 성공적인 채용을 위한\n프리미엄 광고 배너 영역입니다.",
    description: "최상단 노출로 최고의 주목도를 경험하세요. 기업 브랜딩과 인재 채용 효과를 동시에 누릴 수 있습니다.",
    link: "/ads",
    imageUrl: "" // Placeholder logic handles empty image
  },
  {
    id: "p-ad-2",
    type: "PREMIUM",
    companyName: "삼성화재 금융서비스",
    title: "업계 최고 대우 보장\n신입/경력 FC 대규모 모집",
    description: "정착지원금 최대 500만원 지원, 체계적인 교육 시스템으로 당신의 성장을 지원합니다.",
    link: "/ads",
    imageUrl: "https://images.unsplash.com/photo-1560179707-f14e90ef3623?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
  }
];

export const specialAds: AdItem[] = [
  {
    id: "s-ad-1",
    type: "SPECIAL",
    companyName: "스페셜 광고",
    title: "효과적인 인재 채용을 위한\n스페셜 광고 배너입니다.",
    description: "합리적인 비용으로 높은 노출 효과를 기대할 수 있습니다. 지금 바로 문의하세요.",
    link: "/ads"
  },
  {
    id: "s-ad-2",
    type: "SPECIAL",
    companyName: "메리츠화재",
    title: "부산/경남 지역\n지점장 후보생 모집",
    description: "관리자 비전을 가진 열정적인 인재를 모십니다. 초기 정착금 지원.",
    link: "/ads"
  }
];

export const generalAds: AdItem[] = [
  {
    id: "g-ad-1",
    type: "GENERAL",
    companyName: "일반 광고",
    title: "다양한 위치에 노출되는\n일반 광고 배너입니다.",
    description: "광고 문의 환영",
    link: "/ads"
  },
  {
    id: "g-ad-2",
    type: "GENERAL",
    companyName: "한화손해보험",
    title: "총무 및 일반 사무직\n경력사원 채용",
    description: "보험사 경력 1년 이상 우대",
    link: "/ads"
  }
];
