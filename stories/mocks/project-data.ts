import type { ChatBubbleProps } from '@/widgets/chat-main-area/ChatBubble';
import type { ChatSessionGroup } from '@/widgets/chat-sidebar/ChatSessionList';
import type { CreditProduct } from '@/types/credit';
import type { EmotionDataPoint } from '@/components/report/EmotionAreaChart';
import { MOCK_BACK_CARD_DATA, MOCK_COLLECTION_CARDS } from '@/mocks/emotion';

export const emotionCardMock = MOCK_BACK_CARD_DATA;
export const collectionCardMocks = MOCK_COLLECTION_CARDS.slice(0, 6);

export const weeklyEmotionTrend: EmotionDataPoint[] = [
  { label: '월', score: -18, emotion: '걱정' },
  { label: '화', score: 12, emotion: '안도' },
  { label: '수', score: 34, emotion: '기대' },
  { label: '목', score: 18, emotion: '평온' },
  { label: '금', score: 56, emotion: '기쁨' },
  { label: '토', score: 28, emotion: '신뢰' },
  { label: '일', score: 44, emotion: '만족' },
];

export const monthlyEmotionTrend: EmotionDataPoint[] = [
  { label: '1주', score: -24, emotion: '불안' },
  { label: '2주', score: 6, emotion: '중립' },
  { label: '3주', score: 32, emotion: '기대' },
  { label: '4주', score: 48, emotion: '회복' },
];

export const chatMessages: ChatBubbleProps[] = [
  {
    variant: 'ai',
    senderName: '나봄이',
    content: '오늘 마음에 가장 크게 남아 있는 장면부터 천천히 들려주세요.',
    avatarSrc: '/images/personas/nabomi-44.png',
  },
  {
    variant: 'user',
    senderName: '민지',
    content: '회의에서 준비한 제안이 바로 넘어가서 조금 무력했어요.',
  },
  {
    variant: 'ai',
    senderName: '나봄이',
    content: '그 순간에는 인정받고 싶었던 마음과 아쉬움이 함께 있었겠네요.',
    avatarSrc: '/images/personas/nabomi-44.png',
  },
];

export const chatSessionGroups: ChatSessionGroup[] = [
  {
    date: '오늘',
    sessions: [
      {
        id: 'session-1',
        title: '회의 후 마음 정리',
        avatarSrc: '/images/personas/nabomi-44.png',
        status: 'ACTIVE',
      },
      {
        id: 'session-2',
        title: '새 프로젝트 시작 전 긴장',
        avatarSrc: '/images/personas/coffee-chat.png',
        status: 'COMPLETED',
      },
    ],
  },
  {
    date: '어제',
    sessions: [
      {
        id: 'session-3',
        title: '친구와의 대화 복기',
        avatarSrc: '/images/personas/mental.png',
        status: 'COMPLETED',
      },
      {
        id: 'session-4',
        title: '퇴근길에 떠오른 생각',
        avatarSrc: '/images/personas/career.png',
        status: 'SAVED',
      },
    ],
  },
];

export const creditProducts: CreditProduct[] = [
  {
    id: 'small',
    name: '소형',
    credits: 150,
    price: 3000,
    priceFormatted: '3,000',
    paymentType: '건당 결제',
    benefits: ['추가 상담권 2번 구매 가능(140크레딧)', '주간 리포트 1번 발행(150크레딧)'],
  },
  {
    id: 'medium',
    name: '중형',
    credits: 500,
    price: 9000,
    priceFormatted: '9,000',
    paymentType: '건당 결제',
    discount: '10% 혜택',
    benefits: [
      '추가 상담 7회 이용 가능(490크레딧)',
      '주간 리포트 3회 생성(450크레딧)',
      '월간 리포트 1번 발행(500크레딧)',
    ],
  },
  {
    id: 'large',
    name: '대형',
    credits: 1200,
    price: 19000,
    priceFormatted: '19,000',
    paymentType: '건당 결제',
    discount: '20% 혜택',
    benefits: [
      '추가 상담 17회 이용 가능(1,190크레딧)',
      '주간 리포트 8번 발행(1,200크레딧)',
      '월간 리포트 2번 발행(1,000크레딧)',
    ],
  },
];
