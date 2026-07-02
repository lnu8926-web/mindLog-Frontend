import type { EmotionCardData } from '@/entities/emotion';
import type { FinalizeCompleteEvent } from '@/entities/session/model';
import { finalizeToEmotionCardData } from '@/entities/session/utils';

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

type FinalizeData = Omit<FinalizeCompleteEvent, 'summary_id' | 'card_image_url'>;

// 세션 목록의 30개 세션에 대한 finalize 데이터
// session 001~010은 session.ts의 FINALIZE_DATA와 동일하게 유지
const SESSION_ENTRIES: Array<{ sessionId: string; startedAt: string; data: FinalizeData }> = [
  {
    sessionId: 'session-001',
    startedAt: '2026-05-22T14:30:00Z',
    data: {
      emotions: [
        { intensity: 7, source_keyword: '아무도 알아주지 않는다는 느낌', emotion_type: 'sadness' },
        { intensity: 6, source_keyword: '막상 아무 말도 못했어', emotion_type: 'anger' },
        { intensity: 4, source_keyword: '혹시 내가 과민반응인가', emotion_type: 'fear' },
      ],
      summary: {
        fact: '팀장이 회의에서 내 아이디어를 이름 언급 없이 발표했고, 그 자리에서 아무 말도 하지 못했다.',
        emotion: '억울함과 허탈감이 컸고, 동시에 스스로를 의심하며 감정을 눌렀다.',
        insight: '인정받고 싶은 욕구는 자연스러운 것이다. 자기 검열이 감정 표현을 막고 있는 패턴을 인식하게 되었다.',
      },
    },
  },
  {
    sessionId: 'session-002',
    startedAt: '2026-05-20T10:00:00Z',
    data: {
      emotions: [
        { intensity: 6, source_keyword: '서로 감정이 격해졌어', emotion_type: 'anger' },
        { intensity: 5, source_keyword: '어떻게 해야 할지 모르겠어', emotion_type: 'fear' },
        { intensity: 4, source_keyword: '내 입장은 잘 설명을 못했어', emotion_type: 'sadness' },
      ],
      summary: {
        fact: '오랜 친구와 크게 다퉜고, 이전에 약속을 두 번 취소한 것이 갈등의 배경이 되었다.',
        emotion: '억울함과 미안함이 뒤섞여 있었고, 상대의 입장도 이해가 됐다.',
        insight: '갈등의 책임을 일방적으로 돌리지 않고, 양쪽의 맥락을 함께 볼 수 있게 되었다.',
      },
    },
  },
  {
    sessionId: 'session-003',
    startedAt: '2026-05-18T09:00:00Z',
    data: {
      emotions: [
        { intensity: 8, source_keyword: '아무것도 하기 싫은데 쉬는 느낌도 안 나', emotion_type: 'disgust' },
        { intensity: 6, source_keyword: '아침에 일어나는 게 너무 힘들어', emotion_type: 'sadness' },
        { intensity: 5, source_keyword: '다 때려치우고 싶어', emotion_type: 'anger' },
      ],
      summary: {
        fact: '3개월째 무기력과 만성 피로가 지속되고 있으며, 쉬어도 회복이 되지 않는 상태다.',
        emotion: '지쳐있지만 멈출 수 없다는 압박감과 무력감이 동시에 존재한다.',
        insight: '번아웃은 게으름이 아니라 오랜 소진의 결과다. 쉬는 것에 대한 죄책감을 내려놓는 연습이 필요하다.',
      },
    },
  },
  {
    sessionId: 'session-004',
    startedAt: '2026-05-15T21:00:00Z',
    data: {
      emotions: [
        { intensity: 7, source_keyword: '이해받지 못한다는 느낌', emotion_type: 'sadness' },
        { intensity: 5, source_keyword: '화가 나면서도 눈물이 났어', emotion_type: 'anger' },
      ],
      summary: {
        fact: '가족과의 저녁 식사 중 직장 선택에 대한 비판을 들었고, 내 말은 흘려듣는다고 느꼈다.',
        emotion: '소외감과 슬픔이 동시에 밀려왔고, 화와 눈물이 함께 나왔다.',
        insight: '가족에게 받는 상처가 유독 깊은 것은, 그만큼 인정받고 싶은 마음이 크기 때문이다.',
      },
    },
  },
  {
    sessionId: 'session-005',
    startedAt: '2026-05-13T20:30:00Z',
    data: {
      emotions: [
        { intensity: 7, source_keyword: '아 지금 행복하다 싶었어', emotion_type: 'joy' },
        { intensity: 5, source_keyword: '가볍고 홀가분한 느낌', emotion_type: 'trust' },
      ],
      summary: {
        fact: '창가에서 햇살을 받으며 커피를 마시다가, 일상의 작은 순간에서 행복을 느꼈다.',
        emotion: '설명하기 어려운 가벼움과 홀가분함이 하루 내내 이어졌다.',
        insight: '행복은 특별한 사건이 아니라 지금 이 순간에 존재할 수 있다는 것을 몸으로 느꼈다.',
      },
    },
  },
  {
    sessionId: 'session-006',
    startedAt: '2026-05-10T22:00:00Z',
    data: {
      emotions: [
        { intensity: 8, source_keyword: '다 실패하는 시나리오만 떠올라', emotion_type: 'fear' },
        { intensity: 5, source_keyword: '발표가 있는데 생각만 해도 불안해', emotion_type: 'anticipation' },
      ],
      summary: {
        fact: '이틀 뒤 단독 발표를 앞두고, 밤마다 실패 시나리오를 반복 상상하며 잠을 못 자고 있다.',
        emotion: '불안과 긴장이 크지만, 잘 하고 싶다는 기대감도 함께 있다.',
        insight: '완벽하게 하려는 마음이 오히려 불안을 키운다. 충분히 준비했다는 사실을 스스로 인정하는 것이 중요하다.',
      },
    },
  },
  {
    sessionId: 'session-007',
    startedAt: '2026-05-08T19:00:00Z',
    data: {
      emotions: [
        { intensity: 6, source_keyword: '어딘가에 연결되어 있다는 느낌이 없었어', emotion_type: 'sadness' },
        { intensity: 5, source_keyword: '저녁쯤 되니까 이상하게 공허해', emotion_type: 'fear' },
      ],
      summary: {
        fact: '주말 내내 혼자 지냈고, 저녁쯤 이유 모를 공허함과 외로움이 밀려왔다.',
        emotion: '혼자인 게 싫다기보다, 세상과 연결이 끊긴 느낌이 낯설고 불편했다.',
        insight: '외로움을 느끼는 것 자체가 관계를 소중히 여기는 마음의 반증이다.',
      },
    },
  },
  {
    sessionId: 'session-008',
    startedAt: '2026-05-06T21:30:00Z',
    data: {
      emotions: [
        { intensity: 7, source_keyword: '자려고 누우면 온갖 생각이 다 나', emotion_type: 'fear' },
        { intensity: 5, source_keyword: '아침에 일어나면 더 피곤한 것 같아', emotion_type: 'sadness' },
      ],
      summary: {
        fact: '일주일째 잠들지 못하고 뒤척이며, 미래 걱정과 자기 평가가 밤마다 반복된다.',
        emotion: '수면 부족으로 낮에도 집중이 안 되고, 피로가 쌓여 심리적으로도 지쳐있다.',
        insight: '잠자리에서의 과도한 생각은 낮에 해소되지 못한 불안이 표출되는 것일 수 있다.',
      },
    },
  },
  {
    sessionId: 'session-009',
    startedAt: '2026-05-03T20:00:00Z',
    data: {
      emotions: [
        { intensity: 7, source_keyword: '해야 할 일은 있는데 손이 안 가', emotion_type: 'disgust' },
        { intensity: 5, source_keyword: '쉬는 것도 아니에요', emotion_type: 'sadness' },
      ],
      summary: {
        fact: '2주째 이유를 알 수 없는 무기력감이 지속되고 있으며, 해야 할 일도 하고 싶은 것도 없다.',
        emotion: '의욕 없음과 공허함이 뒤섞인 상태로, 자신을 탓하고 싶은 마음도 있다.',
        insight: '무기력함은 원인이 불분명할수록 더 무섭게 느껴진다.',
      },
    },
  },
  {
    sessionId: 'session-010',
    startedAt: '2026-05-01T18:30:00Z',
    data: {
      emotions: [
        { intensity: 7, source_keyword: '아 지금 행복하다 싶었어', emotion_type: 'joy' },
        { intensity: 5, source_keyword: '따뜻했어', emotion_type: 'trust' },
        { intensity: 4, source_keyword: '기분이 가벼운 날', emotion_type: 'anticipation' },
      ],
      summary: {
        fact: '친구가 내 이야기를 진지하게 들어줬고, 퇴근길 하늘이 예뻐서 사진을 찍었다.',
        emotion: '연결감과 따뜻함이 하루를 가볍게 만들었다.',
        insight: '좋은 날을 그냥 흘려보내지 않고 기록하는 것이, 스스로를 돌보는 하나의 방법이다.',
      },
    },
  },
  {
    sessionId: 'session-011',
    startedAt: '2026-04-28T21:00:00Z',
    data: {
      emotions: [
        { intensity: 6, source_keyword: '4월 내내 너무 달렸어', emotion_type: 'disgust' },
        { intensity: 5, source_keyword: '잘 버텼다는 생각도 들어', emotion_type: 'trust' },
      ],
      summary: {
        fact: '4월 한 달을 되돌아보니, 열심히 했지만 여유가 전혀 없었다는 것을 느꼈다.',
        emotion: '지침과 동시에 한 달을 잘 보낸 것에 대한 작은 안도감이 있었다.',
        insight: '열심히 사는 것만큼 쉬는 것도 중요하다는 것을 다시 깨달았다.',
      },
    },
  },
  {
    sessionId: 'session-012',
    startedAt: '2026-04-24T20:00:00Z',
    data: {
      emotions: [
        { intensity: 7, source_keyword: '칭찬받고 싶었는데 아무 말도 없었어', emotion_type: 'sadness' },
        { intensity: 5, source_keyword: '내가 뭘 하든 티가 안 나는 것 같아', emotion_type: 'anger' },
      ],
      summary: {
        fact: '프로젝트를 성공적으로 마쳤지만, 상사로부터 어떤 피드백도 받지 못했다.',
        emotion: '인정받지 못했다는 서운함과 함께, 보이지 않는 사람이 된 것 같은 슬픔을 느꼈다.',
        insight: '외부의 인정보다 내가 스스로를 인정하는 힘을 키우는 것이 중요하다.',
      },
    },
  },
  {
    sessionId: 'session-013',
    startedAt: '2026-04-20T21:30:00Z',
    data: {
      emotions: [
        { intensity: 7, source_keyword: '갑자기 계획이 바뀌어서 당황했어', emotion_type: 'surprise' },
        { intensity: 6, source_keyword: '어떻게 해야 할지 몰라서 불안했어', emotion_type: 'fear' },
      ],
      summary: {
        fact: '주말 여행 계획이 하루 전에 갑자기 취소되었고, 혼자 남겨진 시간을 어떻게 써야 할지 몰랐다.',
        emotion: '당혹감과 불안이 컸지만, 결국 혼자만의 시간도 나쁘지 않았다.',
        insight: '계획이 틀어졌을 때의 불안은 통제에 대한 욕구에서 온다. 유연성을 키워나갈 수 있다.',
      },
    },
  },
  {
    sessionId: 'session-014',
    startedAt: '2026-04-16T22:00:00Z',
    data: {
      emotions: [
        { intensity: 7, source_keyword: '퇴근해도 일 생각이 계속 나', emotion_type: 'fear' },
        { intensity: 6, source_keyword: '쉬는 시간이 없는 것 같아', emotion_type: 'disgust' },
      ],
      summary: {
        fact: '재택근무 이후 일과 쉬는 경계가 무너졌고, 저녁에도 메시지를 계속 확인하게 된다.',
        emotion: '끊임없이 연결되어 있는 느낌이 불편하고 지쳐있다.',
        insight: '경계를 만드는 것은 나를 지키는 일이다. 퇴근 의식을 만드는 것이 도움이 될 수 있다.',
      },
    },
  },
  {
    sessionId: 'session-015',
    startedAt: '2026-04-12T19:00:00Z',
    data: {
      emotions: [
        { intensity: 7, source_keyword: '드디어 해냈다는 느낌이었어', emotion_type: 'joy' },
        { intensity: 5, source_keyword: '스스로가 대견했어', emotion_type: 'trust' },
      ],
      summary: {
        fact: '오랫동안 미루던 자격증 시험을 드디어 신청하고, 첫 모의고사를 통과했다.',
        emotion: '성취감과 뿌듯함이 밀려왔고, 나 자신을 믿게 되는 느낌이 들었다.',
        insight: '작은 성공이 쌓여 자기 효능감을 만든다. 오늘의 나는 충분히 잘 하고 있다.',
      },
    },
  },
  {
    sessionId: 'session-016',
    startedAt: '2026-04-08T20:30:00Z',
    data: {
      emotions: [
        { intensity: 7, source_keyword: '운동하고 나니 기분이 확 달라졌어', emotion_type: 'joy' },
        { intensity: 5, source_keyword: '뭔가 할 수 있을 것 같은 느낌', emotion_type: 'anticipation' },
      ],
      summary: {
        fact: '3주 전에 헬스장에 등록하고, 오늘 처음으로 빠짐없이 일주일을 채웠다.',
        emotion: '몸이 가벼워진 느낌과 함께 무언가를 해냈다는 기분이 들었다.',
        insight: '몸과 마음은 연결되어 있다. 작은 습관이 자기 인식을 바꾸는 시작이 될 수 있다.',
      },
    },
  },
  {
    sessionId: 'session-017',
    startedAt: '2026-04-04T21:00:00Z',
    data: {
      emotions: [
        { intensity: 7, source_keyword: '말을 잘랐을 때 기분이 나빴어', emotion_type: 'anger' },
        { intensity: 5, source_keyword: '앞으로도 이럴까 봐 걱정돼', emotion_type: 'fear' },
        { intensity: 4, source_keyword: '그냥 불편한 느낌이 있어', emotion_type: 'disgust' },
      ],
      summary: {
        fact: '팀 회의에서 상사가 내 발언을 두 번이나 끊었고, 그 이후 대화에 참여하기 어려웠다.',
        emotion: '무시당한 것 같은 분노와 함께 앞으로의 관계에 대한 걱정이 생겼다.',
        insight: '불쾌한 상황을 바로 표현하기 어렵지만, 내가 느끼는 감정은 유효하다.',
      },
    },
  },
  {
    sessionId: 'session-018',
    startedAt: '2026-04-01T18:00:00Z',
    data: {
      emotions: [
        { intensity: 7, source_keyword: '새 달이 시작됐다는 게 설레', emotion_type: 'anticipation' },
        { intensity: 5, source_keyword: '이번엔 잘 해볼 수 있을 것 같아', emotion_type: 'joy' },
      ],
      summary: {
        fact: '4월 첫날, 새롭게 시작하는 기분으로 목표와 루틴을 정리해봤다.',
        emotion: '새 출발에 대한 기대감과 할 수 있다는 자신감이 가득했다.',
        insight: '의욕이 있을 때 작은 것부터 시작하는 것이 중요하다. 설렘을 오래 유지하려면 현실적인 계획이 필요하다.',
      },
    },
  },
  {
    sessionId: 'session-019',
    startedAt: '2026-03-30T21:30:00Z',
    data: {
      emotions: [
        { intensity: 6, source_keyword: '3월이 너무 빨리 지나간 것 같아', emotion_type: 'sadness' },
        { intensity: 5, source_keyword: '그래도 많이 성장한 것 같아', emotion_type: 'trust' },
      ],
      summary: {
        fact: '3월 마지막 날, 한 달을 돌아보며 일지를 정리했다.',
        emotion: '시간이 너무 빨리 가는 것 같은 아쉬움과, 그래도 잘 버텼다는 안도감이 공존했다.',
        insight: '성장은 눈에 잘 보이지 않지만, 돌아보면 분명히 존재한다.',
      },
    },
  },
  {
    sessionId: 'session-020',
    startedAt: '2026-03-26T20:00:00Z',
    data: {
      emotions: [
        { intensity: 7, source_keyword: '사소한 것에도 짜증이 나', emotion_type: 'anger' },
        { intensity: 5, source_keyword: '왜 이러는지 나도 몰라', emotion_type: 'fear' },
      ],
      summary: {
        fact: '이번 주 내내 작은 일에도 쉽게 짜증이 나고, 사람들과의 대화가 힘들었다.',
        emotion: '예민함의 원인을 모르니 더 답답하고, 주변에 미안한 마음도 있었다.',
        insight: '예민함은 지쳐있다는 신호일 수 있다. 원인보다 회복에 먼저 집중하는 것이 좋다.',
      },
    },
  },
  {
    sessionId: 'session-021',
    startedAt: '2026-03-22T19:00:00Z',
    data: {
      emotions: [
        { intensity: 7, source_keyword: '오랜만에 만나서 너무 좋았어', emotion_type: 'joy' },
        { intensity: 6, source_keyword: '역시 이 친구가 있어서 든든해', emotion_type: 'trust' },
      ],
      summary: {
        fact: '1년 만에 오랜 친구를 만나 밥을 먹고 오래 이야기를 나눴다.',
        emotion: '오랜만에 진심으로 웃고, 연결되어 있다는 따뜻한 감각을 느꼈다.',
        insight: '좋은 관계는 시간이 흘러도 곁에 있어준다. 나는 좋은 사람들과 연결되어 있다.',
      },
    },
  },
  {
    sessionId: 'session-022',
    startedAt: '2026-03-18T22:00:00Z',
    data: {
      emotions: [
        { intensity: 8, source_keyword: '마감이 이틀 남았는데 너무 불안해', emotion_type: 'fear' },
        { intensity: 5, source_keyword: '잘 끝내고 싶어', emotion_type: 'anticipation' },
      ],
      summary: {
        fact: '중요한 보고서 마감이 이틀 앞으로 다가왔고, 완성도가 걱정되어 잠을 못 이루고 있다.',
        emotion: '마감 불안이 크지만, 잘 마무리하고 싶다는 의지도 함께 있다.',
        insight: '불안은 중요하게 여기기 때문에 생긴다. 지금 할 수 있는 것 하나에 집중하는 것이 도움이 된다.',
      },
    },
  },
  {
    sessionId: 'session-023',
    startedAt: '2026-03-14T21:00:00Z',
    data: {
      emotions: [
        { intensity: 7, source_keyword: '밤에 잠을 못 자고 있어', emotion_type: 'fear' },
        { intensity: 6, source_keyword: '낮에도 멍해', emotion_type: 'sadness' },
      ],
      summary: {
        fact: '2주째 수면 패턴이 완전히 망가져 새벽 3~4시에야 잠들고, 낮에 일상이 힘들어졌다.',
        emotion: '지쳐있고 무기력하지만, 이대로는 안 된다는 초조함도 있다.',
        insight: '수면 문제는 몸이 보내는 신호다. 환경과 루틴부터 작게 바꾸는 것을 시작해볼 수 있다.',
      },
    },
  },
  {
    sessionId: 'session-024',
    startedAt: '2026-03-10T20:30:00Z',
    data: {
      emotions: [
        { intensity: 7, source_keyword: '별것도 아닌데 화가 나', emotion_type: 'anger' },
        { intensity: 5, source_keyword: '나도 왜 이러는지 모르겠어', emotion_type: 'disgust' },
        { intensity: 4, source_keyword: '이러면 안 되는데 싶어', emotion_type: 'fear' },
      ],
      summary: {
        fact: '작은 실수에도 심하게 자책하고, 가까운 사람에게 필요 이상으로 예민하게 반응했다.',
        emotion: '스스로에게도 타인에게도 화가 나고, 그런 자신이 못마땅했다.',
        insight: '예민함은 내면의 무언가가 해소되지 못했다는 신호다. 자기 비판보다 자기 이해가 먼저다.',
      },
    },
  },
  {
    sessionId: 'session-025',
    startedAt: '2026-03-06T21:00:00Z',
    data: {
      emotions: [
        { intensity: 6, source_keyword: '혼자 있는 게 이제 자연스러워', emotion_type: 'trust' },
        { intensity: 5, source_keyword: '그래도 가끔 외롭긴 해', emotion_type: 'sadness' },
      ],
      summary: {
        fact: '이사 후 첫 달, 혼자 사는 생활에 조금씩 익숙해지고 있다.',
        emotion: '혼자임이 편해지고 있지만, 가끔 외로움이 밀려오는 것도 사실이다.',
        insight: '외로움을 느끼는 것과 혼자 있는 것을 즐기는 것은 공존할 수 있다.',
      },
    },
  },
  {
    sessionId: 'session-026',
    startedAt: '2026-03-02T18:30:00Z',
    data: {
      emotions: [
        { intensity: 7, source_keyword: '새로운 시작이 기대돼', emotion_type: 'anticipation' },
        { intensity: 5, source_keyword: '잘 될 것 같은 느낌', emotion_type: 'joy' },
        { intensity: 4, source_keyword: '믿어보고 싶어', emotion_type: 'trust' },
      ],
      summary: {
        fact: '3월 첫날, 새 프로젝트가 시작되었고 팀 분위기도 좋았다.',
        emotion: '신선한 시작에 대한 기대감과 긍정적인 에너지가 가득했다.',
        insight: '새로운 시작의 에너지를 오래 유지하려면, 작은 성공을 의식적으로 기록하는 것이 좋다.',
      },
    },
  },
  {
    sessionId: 'session-027',
    startedAt: '2026-02-26T20:00:00Z',
    data: {
      emotions: [
        { intensity: 6, source_keyword: '2월이 빨리 지나갔어', emotion_type: 'sadness' },
        { intensity: 5, source_keyword: '그래도 몇 가지는 잘 한 것 같아', emotion_type: 'trust' },
      ],
      summary: {
        fact: '2월 마지막 주, 한 달을 돌아보며 잘한 것과 아쉬운 것을 정리했다.',
        emotion: '아쉬움과 뿌듯함이 반반이었고, 3월에 대한 기대도 조금 생겼다.',
        insight: '완벽하지 않아도 성장하고 있다. 아쉬움은 다음으로 가는 연료가 된다.',
      },
    },
  },
  {
    sessionId: 'session-028',
    startedAt: '2026-02-20T21:30:00Z',
    data: {
      emotions: [
        { intensity: 7, source_keyword: '몸도 마음도 무거웠어', emotion_type: 'disgust' },
        { intensity: 6, source_keyword: '아무것도 하고 싶지 않았어', emotion_type: 'sadness' },
      ],
      summary: {
        fact: '며칠째 컨디션이 좋지 않고, 업무에도 집중이 안 되는 날들이 이어지고 있다.',
        emotion: '몸의 피로가 마음까지 짓누르는 느낌이었고, 모든 것이 귀찮았다.',
        insight: '몸이 쉬고 싶다는 신호를 무시하면 더 오래 걸린다. 쉬는 것을 허락하는 것도 회복의 일부다.',
      },
    },
  },
  {
    sessionId: 'session-029',
    startedAt: '2026-02-14T20:00:00Z',
    data: {
      emotions: [
        { intensity: 7, source_keyword: '오랜만에 가족들 봤는데 좋았어', emotion_type: 'joy' },
        { intensity: 5, source_keyword: '역시 이 사람들이 있어서 든든해', emotion_type: 'trust' },
        { intensity: 4, source_keyword: '설 연휴가 너무 빨리 지나갔어', emotion_type: 'anticipation' },
      ],
      summary: {
        fact: '설 연휴에 오랜만에 가족들을 만나고, 명절 음식을 함께 먹으며 이야기를 나눴다.',
        emotion: '오랜만의 만남이 따뜻했고, 가족이라는 안전망이 느껴졌다.',
        insight: '일상에서 멀어지면 소중한 것들을 잊기 쉽다. 연결을 유지하는 것이 중요하다.',
      },
    },
  },
  {
    sessionId: 'session-030',
    startedAt: '2026-02-03T21:00:00Z',
    data: {
      emotions: [
        { intensity: 7, source_keyword: '2월이 벌써 시작됐는데 힘들어', emotion_type: 'sadness' },
        { intensity: 6, source_keyword: '올해 목표가 무너지는 것 같아', emotion_type: 'fear' },
      ],
      summary: {
        fact: '1월에 세운 연간 목표들이 벌써 흔들리고 있고, 의욕이 생각보다 빨리 떨어졌다.',
        emotion: '기대와 달리 초반부터 지치는 것 같아 속상하고 두려웠다.',
        insight: '의욕은 감정이라 오르내린다. 목표를 잘게 쪼개서 작게라도 계속 가는 것이 중요하다.',
      },
    },
  },
];

/** 세션 finalize 데이터 → EmotionCardData 변환 (채팅 finalize와 동일한 로직) */
function buildMockCards(): EmotionCardData[] {
  return SESSION_ENTRIES.map(({ sessionId, startedAt, data }) => {
    const event: FinalizeCompleteEvent = {
      summary_id: `mock-summary-${sessionId}`,
      card_image_url: '',
      ...data,
    };
    const card = finalizeToEmotionCardData(event, sessionId);
    return { ...card, createdAt: new Date(startedAt) };
  });
}

export const MOCK_SUMMARY_CARDS: EmotionCardData[] = buildMockCards();

export async function mockGetSummaryCards(): Promise<EmotionCardData[]> {
  await delay(400);
  return MOCK_SUMMARY_CARDS;
}
