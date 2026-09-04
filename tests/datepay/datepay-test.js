// ============================================
// 데이트 비용, 누가 더 내야 해? 연애 지갑 테스트
// ============================================
// 구조: 15문항, 선택지 4개 (0~3점)
// 0점 = 철저히 각자 부담 (계산기형)
// 3점 = 내가 거의 다 낸다 (지갑형)
// 채점: 점수 합산 → 5단계 지갑 유형
// 최대 점수: 45점
// 영역: 초반·썸 / 일상 데이트 / 기념일·선물 / 여행·큰 지출 / 돈 대화 (각 3문항)
// ============================================

const DATEPAY_QUESTIONS = [
  {
    id: 1,
    area: "FIRST",
    question: "첫 데이트 밥값 계산서가 나왔다. 어떻게 해?",
    emoji: "🧾",
    choices: [
      { text: "🧮 처음부터 정확히 반반. 그게 깔끔해", score: 0 },
      { text: "⚖️ 밥은 각자 내고 커피 정도만 내가 살게", score: 1 },
      { text: "🔄 이번엔 내가 낼게. 다음은 네가 사줘", score: 2 },
      { text: "💳 첫 데이트인데 당연히 내가 다 내야지", score: 3 }
    ]
  },
  {
    id: 2,
    area: "DAILY",
    question: "평소 밥 먹고 계산대 앞에 섰을 때 나는?",
    emoji: "🍽️",
    choices: [
      { text: "🧮 각자 자기 먹은 만큼 따로 결제해", score: 0 },
      { text: "⚖️ 한 명이 내고 그 자리에서 바로 송금 정산해", score: 1 },
      { text: "🔄 이번엔 나, 다음엔 너. 번갈아 내는 편이야", score: 2 },
      { text: "💳 그냥 거의 내가 먼저 카드를 꺼내", score: 3 }
    ]
  },
  {
    id: 3,
    area: "EVENT",
    question: "기념일 선물 예산은 어떻게 정해?",
    emoji: "🎁",
    choices: [
      { text: "🧮 서로 금액 상한선을 정해두고 똑같이 맞춰", score: 0 },
      { text: "⚖️ 대략 비슷한 가격대면 된다고 생각해", score: 1 },
      { text: "🔄 그때 여유 있는 쪽이 조금 더 쓰면 되지", score: 2 },
      { text: "💳 내가 훨씬 더 쓰게 되더라도 신경 안 써", score: 3 }
    ]
  },
  {
    id: 4,
    area: "TRIP",
    question: "둘이 여행을 갔다. 경비 정산은?",
    emoji: "🧳",
    choices: [
      { text: "🧮 가계부 앱에 다 적어서 1원 단위까지 나눠", score: 0 },
      { text: "⚖️ 숙소는 너, 교통은 나. 항목별로 갈라", score: 1 },
      { text: "🔄 큰 건 내가 결제하고 소소한 건 상대가 내", score: 2 },
      { text: "💳 그냥 거의 다 내가 결제하고 넘어가", score: 3 }
    ]
  },
  {
    id: 5,
    area: "TALK",
    question: "데이트 비용 얘기를 꺼내야 할 상황이라면?",
    emoji: "💬",
    choices: [
      { text: "🧮 사귀기 전에 아예 규칙부터 정하고 시작해", score: 0 },
      { text: "⚖️ 애매해지는 순간 바로 솔직하게 말해", score: 1 },
      { text: "🔄 웬만하면 안 꺼내. 분위기 깨지잖아", score: 2 },
      { text: "💳 그 얘기를 왜 해? 내가 더 내면 되는 거지", score: 3 }
    ]
  },
  {
    id: 6,
    area: "FIRST",
    question: "아직 썸 단계일 때 카페 값은 누가 내?",
    emoji: "☕",
    choices: [
      { text: "🧮 사귀는 것도 아닌데 당연히 각자 내야지", score: 0 },
      { text: "⚖️ 한 번씩 번갈아 내면 딱 좋아", score: 1 },
      { text: "🔄 대체로 내가 내는 편이야", score: 2 },
      { text: "💳 마음 있는 쪽이 사는 거지. 무조건 내가 내", score: 3 }
    ]
  },
  {
    id: 7,
    area: "DAILY",
    question: "택시비, 편의점, 주차비 같은 소액 지출은?",
    emoji: "🚕",
    choices: [
      { text: "🧮 금액이 작아도 정산해. 쌓이면 큰돈이야", score: 0 },
      { text: "⚖️ 대충 기억해뒀다가 나중에 맞춰", score: 1 },
      { text: "🔄 그 정도는 서로 신경 안 쓰는 편이야", score: 2 },
      { text: "💳 자잘한 건 늘 내가 내고 있어", score: 3 }
    ]
  },
  {
    id: 8,
    area: "EVENT",
    question: "상대 생일이 다가온다. 나는?",
    emoji: "🎂",
    choices: [
      { text: "🧮 내가 받은 만큼만 딱 맞춰서 준비해", score: 0 },
      { text: "⚖️ 부담 없는 선에서 적당히 준비해", score: 1 },
      { text: "🔄 예산보다 조금 더 쓰게 되더라도 괜찮아", score: 2 },
      { text: "💳 카드값이 나중에 울어도 크게 해주고 싶어", score: 3 }
    ]
  },
  {
    id: 9,
    area: "TRIP",
    question: "여행 숙소를 더 좋은 곳으로 올리고 싶다면?",
    emoji: "🏨",
    choices: [
      { text: "🧮 차액도 반반 아니면 그냥 원래 숙소로 가", score: 0 },
      { text: "⚖️ 상의해서 둘 다 동의하면 반반으로 올려", score: 1 },
      { text: "🔄 차액 정도는 내가 부담할 수 있어", score: 2 },
      { text: "💳 그냥 내가 다 낼 테니까 좋은 데로 가자", score: 3 }
    ]
  },
  {
    id: 10,
    area: "TALK",
    question: "상대가 계산할 때 내 마음은?",
    emoji: "😌",
    choices: [
      { text: "🧮 당연한 거지. 원래 각자 낼 차례였잖아", score: 0 },
      { text: "⚖️ 고맙네. 다음엔 내가 사야겠다", score: 1 },
      { text: "🔄 살짝 미안해서 뭐라도 하나 더 챙겨줘", score: 2 },
      { text: "💳 너무 불편해서 결국 내가 다시 내겠다고 해", score: 3 }
    ]
  },
  {
    id: 11,
    area: "FIRST",
    question: "연애 초반의 비용 원칙을 정한다면?",
    emoji: "📋",
    choices: [
      { text: "🧮 처음부터 무조건 각자. 예외 없어", score: 0 },
      { text: "⚖️ 초반부터 번갈아 내는 걸로 맞춰가", score: 1 },
      { text: "🔄 초반엔 내가 좀 더 쓰는 게 자연스럽지", score: 2 },
      { text: "💳 관계가 확실해질 때까진 내가 다 낼 생각이야", score: 3 }
    ]
  },
  {
    id: 12,
    area: "DAILY",
    question: "한 달 데이트 비용을 비율로 따지면 나는 몇 %?",
    emoji: "📊",
    choices: [
      { text: "🧮 딱 50대 50. 어긋나면 신경 쓰여", score: 0 },
      { text: "⚖️ 55대 45 정도. 크게 안 따져", score: 1 },
      { text: "🔄 70대 30 정도로 내가 더 내는 편이야", score: 2 },
      { text: "💳 90% 이상 내가 내고 있어", score: 3 }
    ]
  },
  {
    id: 13,
    area: "EVENT",
    question: "기념일에 비싼 코스 요리를 예약하려는데?",
    emoji: "🍷",
    choices: [
      { text: "🧮 반반 낼 게 아니면 그냥 안 가", score: 0 },
      { text: "⚖️ 반반 내기로 합의되면 예약할게", score: 1 },
      { text: "🔄 내가 좀 더 내는 조건으로 가자고 해", score: 2 },
      { text: "💳 기념일인데 당연히 내가 다 내야지", score: 3 }
    ]
  },
  {
    id: 14,
    area: "TRIP",
    question: "상대가 여윳돈이 없어서 여행을 못 갈 상황이라면?",
    emoji: "💸",
    choices: [
      { text: "🧮 그럼 여유 생길 때 가면 되지. 무리할 필요 없어", score: 0 },
      { text: "⚖️ 둘 다 부담 없는 저렴한 코스로 바꿔", score: 1 },
      { text: "🔄 내가 좀 보태서라도 다녀오고 싶어", score: 2 },
      { text: "💳 내가 다 낼 테니까 몸만 오라고 해", score: 3 }
    ]
  },
  {
    id: 15,
    area: "TALK",
    question: "헤어지고 나면 그동안 쓴 돈이 어떻게 느껴져?",
    emoji: "🕰️",
    choices: [
      { text: "🧮 큰 지출은 정산해서 돌려받고 싶어", score: 0 },
      { text: "⚖️ 아깝긴 해도 따지진 않을 거야", score: 1 },
      { text: "🔄 돈보다는 시간이 아깝지", score: 2 },
      { text: "💳 쓴 돈은 전혀 생각도 안 나", score: 3 }
    ]
  }
];

// ============================================
// 영역 정의 (각 3문항 / 만점 9점)
// ============================================

const DATEPAY_AREAS = {
  FIRST: { name: "초반·썸",     emoji: "☕", color: "#E85D75", desc: "관계 초반에 지갑을 여는 정도" },
  DAILY: { name: "일상 데이트", emoji: "🍽️", color: "#E67E22", desc: "밥·카페·교통 등 평소 지출 분담" },
  EVENT: { name: "기념일·선물", emoji: "🎁", color: "#9B59B6", desc: "특별한 날에 쓰는 돈의 크기" },
  TRIP:  { name: "여행·큰 지출", emoji: "🧳", color: "#3498DB", desc: "목돈이 나갈 때의 부담 방식" },
  TALK:  { name: "돈 대화",     emoji: "💬", color: "#16A085", desc: "비용 얘기를 꺼내는 태도" }
};

// ============================================
// 5단계 지갑 유형
// ============================================

const DATEPAY_LEVELS = {
  CALC: {
    level: 1,
    range: "0~9점",
    emoji: "🧮",
    name: "1원까지 N빵",
    tagline: "사랑과 계산은 별개입니다.",
    color: "#2E86C1",
    desc: "당신에게 데이트 비용은 감정의 영역이 아니라 정산의 영역입니다. 금액이 작아도 정확히 나누고, 애매하게 넘어가는 걸 가장 싫어하죠. 덕분에 서운함이 쌓일 일이 거의 없고 관계가 오래가도 돈 문제로 크게 다투지 않습니다. 다만 상대가 '이 정도는 그냥 넘어가도 되는데'라고 느끼는 순간이 반복되면 정 없다는 오해를 살 수 있어요. 계산은 그대로 하되, 가끔은 아무 말 없이 한 번 사보세요.",
    badge: "📱 정산 앱 헤비유저"
  },
  FAIR: {
    level: 2,
    range: "10~18점",
    emoji: "⚖️",
    name: "정확한 반반형",
    tagline: "공평한 게 제일 편합니다.",
    color: "#16A085",
    desc: "기본은 반반, 다만 1원 단위까지 따지지는 않는 유형입니다. 항목을 나누거나 번갈아 내는 방식으로 균형을 맞추고, 어느 한쪽이 손해 보는 상황을 만들지 않으려 합니다. 요즘 연애에서 가장 무난하고 갈등이 적은 방식이죠. 상대도 부담 없이 만날 수 있는 사람입니다. 다만 균형이 깨지는 시기(한쪽이 취준생이거나 이직 중일 때)에는 규칙을 잠깐 느슨하게 풀어줄 여유도 필요합니다.",
    badge: "⚖️ 공정 거래 인증"
  },
  FLOW: {
    level: 3,
    range: "19~27점",
    emoji: "🔄",
    name: "번갈아 내기형",
    tagline: "이번엔 내가, 다음엔 네가.",
    color: "#F39C12",
    desc: "금액을 정확히 맞추기보다 흐름으로 균형을 잡는 유형입니다. 오늘 밥을 샀으면 다음엔 상대가 커피를 사고, 큰 지출은 여유 있는 쪽이 부담하는 식이죠. 계산기를 두드리지 않아서 편하고 자연스럽지만, 그 균형은 어디까지나 당신의 체감입니다. 상대는 다르게 느끼고 있을 수 있어요. 반년쯤 지났을 때 한 번은 서로 어떻게 느끼는지 확인해보는 게 좋습니다.",
    badge: "🔄 순환 결제 시스템"
  },
  GIVER: {
    level: 4,
    range: "28~36점",
    emoji: "💳",
    name: "먼저 카드 꺼내는 사람",
    tagline: "계산대 앞에서 항상 한 발 빠릅니다.",
    color: "#E67E22",
    desc: "상대가 지갑을 꺼내기 전에 이미 결제가 끝나 있는 유형입니다. 좋아하는 사람에게 쓰는 돈이 아깝지 않고, 오히려 계산하는 순간에 뿌듯함을 느끼죠. 상대 입장에서는 고맙고 든든한 연인입니다. 다만 이 방식은 한 가지 조건에서만 오래갑니다. 당신이 정말 부담을 느끼지 않을 때요. 무리해서 쓰고 나중에 서운해지는 패턴이 반복된다면, 그건 배려가 아니라 빚입니다.",
    badge: "💳 결제 속도 1위"
  },
  ALLIN: {
    level: 5,
    range: "37~45점",
    emoji: "🏦",
    name: "지갑 전담형",
    tagline: "데이트 비용이라는 개념 자체가 없습니다.",
    color: "#C0392B",
    desc: "사실상 모든 비용을 혼자 감당하는 유형입니다. 상대가 내겠다고 하면 오히려 불편해서 말리고, 돈 얘기를 꺼내는 것 자체를 관계에 대한 흠집처럼 느끼죠. 아낌없이 주는 마음은 분명 큰 장점입니다. 하지만 한쪽만 계속 내는 관계는 대개 둘 중 하나로 끝납니다. 당신이 지치거나, 상대가 당연하게 여기거나. 오래 가고 싶다면 상대에게도 낼 기회를 주세요. 받는 사람도 계속 받기만 하면 마음이 무거워집니다.",
    badge: "🏦 연애 전용 스폰서"
  }
};

// ============================================
// 채점 함수
// ============================================

function calcDatePay(answers) {
  const totalScore = answers.reduce((sum, score) => sum + score, 0);
  const maxScore = DATEPAY_QUESTIONS.length * 3;
  const percentage = Math.round((totalScore / maxScore) * 100);

  // 영역별 집계
  const areaScores = {};
  Object.keys(DATEPAY_AREAS).forEach(k => { areaScores[k] = { score: 0, max: 0, percentage: 0 }; });
  DATEPAY_QUESTIONS.forEach((q, i) => {
    const a = areaScores[q.area];
    if (!a) return;
    a.score += (answers[i] ?? 0);
    a.max   += 3;
  });
  Object.values(areaScores).forEach(a => {
    a.percentage = a.max ? Math.round((a.score / a.max) * 100) : 0;
  });

  // 가장 계산적인 영역 / 가장 후한 영역
  const ordered = Object.entries(areaScores).sort((a, b) => a[1].percentage - b[1].percentage);
  const strictestArea = ordered[0][0];
  const loosestArea   = ordered[ordered.length - 1][0];

  // 체감 부담 비율 (내가 내는 비중)
  const myShare = 50 + Math.round((percentage - 50) * 0.9);

  let levelKey;
  if (totalScore <= 9) levelKey = 'CALC';
  else if (totalScore <= 18) levelKey = 'FAIR';
  else if (totalScore <= 27) levelKey = 'FLOW';
  else if (totalScore <= 36) levelKey = 'GIVER';
  else levelKey = 'ALLIN';

  return {
    totalScore,
    maxScore,
    percentage,
    myShare,
    levelKey,
    levelInfo: DATEPAY_LEVELS[levelKey],
    areaScores,
    strictestArea,
    loosestArea
  };
}

if (typeof module !== 'undefined') {
  module.exports = { DATEPAY_QUESTIONS, DATEPAY_AREAS, DATEPAY_LEVELS, calcDatePay };
}
