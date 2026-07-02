export const SITE = {
  name: '굿데일리',
  legalName: '(주)굿데일리',
  brandEn: 'Good Daily',
  url: 'https://gooddaily.co.kr',
  slogan: '함께하는 모든 날을, 좋은 날로.',
  description:
    '굿데일리는 결제, 상품권 자동매입, 검색 마케팅, 업무 솔루션 개발을 함께 다루는 실무형 비즈니스 파트너입니다.',
  ogImage: '/og-default.png',
  ogImageWidth: 1200,
  ogImageHeight: 630,
  themeColor: '#1f2a44',
};

export const CONTACT = {
  phoneDisplay: '010-8570-7714',
  phoneHref: 'tel:010-85707714',
  kakaoChannel: 'https://pf.kakao.com/_rgxinX',
};

export const SOCIAL: { label: string; url: string }[] = [];

export const BUSINESS = {
  company: '(주)굿데일리',
  ceo: '김관우',
  bizNo: '229-81-43860',
  address: '부산광역시 남구 용소로40번길 16 (48498)',
  email: 'gooddaily26@naver.com',
};

export interface SubService { name: string; desc: string; }
export interface Stat { value: string; label: string; }
export interface ProcessStep { title: string; desc: string; }
export interface Service {
  slug: string;
  name: string;
  tagline: string;
  keyword: string;
  headline: string;
  intro: string;
  subServices: SubService[];
  stats: Stat[];
  process: ProcessStep[];
  related: string;
  sourceSite?: string;
}

export const SERVICES: Service[] = [
  {
    slug: 'marketing',
    name: '마리나 마케팅',
    tagline: '네이버와 구글 등 주요 채널에 맞춰 검색 마케팅과 광고 운영을 설계합니다.',
    keyword: '맞춤 마케팅',
    headline: '사업에 맞는 마케팅을 운영합니다',
    intro:
      '마리나 마케팅은 단순 광고 집행보다 실제 문의와 전환으로 이어지는 운영 흐름을 중요하게 봅니다. 기획, 세팅, 운영, 리포트까지 필요한 과정을 함께 정리합니다.',
    subServices: [
      { name: '네이버 마케팅', desc: '검색과 디스플레이 광고를 목적에 맞게 운영합니다.' },
      { name: '구글 마케팅', desc: '검색, 디스플레이, 리마케팅 캠페인을 구성합니다.' },
      { name: '유튜브 마케팅', desc: '영상 콘텐츠와 광고 운영을 함께 설계합니다.' },
      { name: '성과 분석', desc: '광고 데이터와 전환 흐름을 기준으로 운영 방향을 조정합니다.' },
      { name: '마케팅 컨설팅', desc: '업종과 예산에 맞는 현실적인 운영 방안을 제안합니다.' },
      { name: '백링크 및 SEO', desc: '검색 노출 기반을 다지는 콘텐츠와 구조 개선을 지원합니다.' },
    ],
    stats: [
      { value: '상담 후', label: '채널 구성' },
      { value: '맞춤형', label: '광고 운영' },
      { value: '정기', label: '성과 점검' },
      { value: '업종별', label: '전략 제안' },
    ],
    process: [
      { title: '상담 및 목표 정리', desc: '현재 상황과 필요한 목표를 먼저 확인합니다.' },
      { title: '채널 및 예산 설계', desc: '업종과 예산에 맞는 광고 채널을 구성합니다.' },
      { title: '캠페인 운영', desc: '소재, 키워드, 타깃을 관리하며 광고를 운영합니다.' },
      { title: '성과 확인', desc: '결과를 바탕으로 개선 방향을 조정합니다.' },
    ],
    related: 'terminal',
  },
  {
    slug: 'terminal',
    name: '마리나 단말기',
    tagline: 'PG와 카드 단말기, 매장 결제 환경을 사업장에 맞게 연결합니다.',
    keyword: '결제 단말기',
    headline: '사업장 결제를 처음부터 안정적으로 준비합니다',
    intro:
      '마리나 단말기는 매장과 사업장에 필요한 결제 수단을 확인하고, 업종과 운영 방식에 맞춰 단말기와 결제 연동을 안내합니다.',
    subServices: [
      { name: 'PG 결제 연동', desc: '사업장 환경에 맞는 온라인 결제 연동을 안내합니다.' },
      { name: '카드 단말기 공급', desc: '매장 운영에 필요한 단말기 구성을 돕습니다.' },
      { name: '간편결제 및 QR', desc: '간편결제와 QR 결제 흐름을 함께 검토합니다.' },
      { name: '매출 관리', desc: '결제 이후 매출 확인과 정산 흐름을 정리합니다.' },
      { name: '무인매장 결제', desc: '무인 운영 환경에 필요한 결제 구성을 지원합니다.' },
      { name: '업종별 컨설팅', desc: '업종 특성에 맞춘 결제 방식을 제안합니다.' },
    ],
    stats: [
      { value: '상담 후', label: '설치 안내' },
      { value: '업종별', label: '결제 구성' },
      { value: '맞춤형', label: '단말기 제안' },
      { value: '운영형', label: '사후 안내' },
    ],
    process: [
      { title: '문의 및 상담', desc: '사업장 형태와 필요한 결제 수단을 확인합니다.' },
      { title: '결제 구성 설계', desc: '업종에 맞는 단말기와 결제 방식을 정리합니다.' },
      { title: '연동 및 설치', desc: '필요한 결제 연동과 설치 과정을 안내합니다.' },
      { title: '운영 안내', desc: '매출 확인과 정산 흐름을 함께 점검합니다.' },
    ],
    related: 'marketing',
  },
  {
    slug: 'voucher',
    name: '마리나 상품권',
    tagline: '상품권 자동매입과 안전한 거래 절차를 실무에 맞게 제공합니다.',
    keyword: '상품권 자동매입',
    headline: '상품권 매입을 빠르고 안정적으로 진행합니다',
    intro:
      '마리나 상품권은 상품권 매입 업무에 필요한 절차를 간결하게 정리하고, 빠르고 안전한 거래 경험을 제공하는 데 집중합니다.',
    subServices: [
      { name: '상품권 자동매입', desc: '번거로운 절차를 줄이고 빠른 매입을 지원합니다.' },
      { name: '실시간 시세 안내', desc: '상품권 종류별 매입 기준을 확인할 수 있도록 안내합니다.' },
      { name: '안전 거래 절차', desc: '거래 과정에서 필요한 확인 절차를 제공합니다.' },
      { name: '대량 매입 상담', desc: '대량 상품권 매입이 필요한 경우 별도 상담을 지원합니다.' },
      { name: '다양한 상품권 처리', desc: '여러 종류의 상품권 처리 가능 여부를 안내합니다.' },
    ],
    stats: [
      { value: '상담 후', label: '매입 가능 여부' },
      { value: '빠른', label: '처리 안내' },
      { value: '다양한', label: '상품권 종류' },
      { value: '안전한', label: '거래 절차' },
    ],
    process: [
      { title: '시세 확인', desc: '보유 상품권의 매입 가능 여부와 기준을 확인합니다.' },
      { title: '매입 신청', desc: '필요 정보를 확인하고 매입 절차를 안내합니다.' },
      { title: '거래 확인', desc: '안전한 거래를 위한 확인 절차를 진행합니다.' },
      { title: '정산 안내', desc: '확인 후 정산 흐름을 안내합니다.' },
    ],
    related: 'solution',
  },
  {
    slug: 'solution',
    name: '마리나 솔루션',
    tagline: '각 사업 분야의 이해를 바탕으로 필요한 솔루션을 직접 설계합니다.',
    keyword: '업무 솔루션 개발',
    headline: '현장 업무에 맞는 솔루션을 개발합니다',
    intro:
      '마리나 솔루션은 현장 운영에서 반복되는 업무를 줄이고, 관리와 정산 흐름을 더 쉽게 다룰 수 있도록 필요한 시스템을 만듭니다.',
    subServices: [
      { name: '자동화 설계', desc: '업무의 반복 과정을 줄이는 기능을 설계합니다.' },
      { name: '자동 정산', desc: '거래와 정산 흐름을 관리하기 쉽게 정리합니다.' },
      { name: '관리자 대시보드', desc: '운영 현황을 한눈에 확인할 수 있는 화면을 구성합니다.' },
      { name: 'API 연동', desc: '결제와 외부 시스템 연동을 지원합니다.' },
      { name: '커스터마이징', desc: '업체별 운영 방식에 맞춘 기능 개발을 검토합니다.' },
    ],
    stats: [
      { value: '업무형', label: '기능 설계' },
      { value: '자동화', label: '운영 지원' },
      { value: '맞춤형', label: '시스템 구성' },
      { value: '연동형', label: 'API 지원' },
    ],
    process: [
      { title: '도입 상담', desc: '운영 환경과 필요 기능을 확인합니다.' },
      { title: '기능 설계', desc: '요구사항에 맞춰 화면과 기능 흐름을 정리합니다.' },
      { title: '개발 및 연동', desc: '필요한 시스템을 구현하고 연동을 진행합니다.' },
      { title: '운영 지원', desc: '도입 이후 운영과 개선 방향을 함께 점검합니다.' },
    ],
    related: 'voucher',
  },
];

export function getService(slug: string): Service | undefined {
  return SERVICES.find((s) => s.slug === slug);
}

const NAV_ORDER = ['terminal', 'voucher', 'marketing', 'solution'];
export const SERVICES_ORDERED = NAV_ORDER.map((s) => getService(s)!).filter(Boolean);

export const MAIN_NAV = [
  { label: '회사소개', href: '/about/' },
  ...SERVICES_ORDERED.map((s) => ({ label: s.name, href: `/${s.slug}/` })),
];

export const UTIL_NAV = [
  { label: '공지사항', href: '/notice/' },
  { label: '채용', href: '/careers/' },
];
