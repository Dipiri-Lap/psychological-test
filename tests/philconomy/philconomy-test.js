// ============================================
// 필코노미 지수 테스트
// ============================================
// 구조: 10문항, 선택지 4개 (0~3점)
// 채점: 점수 합산 → 5단계 레벨
// 최대 점수: 30점
// ============================================

const PHILCONOMY_QUESTIONS = [
  {
    id: 1,
    question: "기분이 너무 안 좋은 날, 나는?",
    emoji: "😔",
    choices: [
      { text: "😌 기분이 소비랑 무슨 상관이야. 그냥 참아", score: 0 },
      { text: "🛒 가끔 편의점 들러서 좋아하는 거 하나 사긴 해", score: 1 },
      { text: "🛍️ 쇼핑몰 앱 켜서 구경하다 보면 뭔가 사게 돼", score: 2 },
      { text: "💳 쇼핑이 최고의 치료야. 일단 지르고 봐", score: 3 }
    ]
  },
  {
    id: 2,
    question: "기분이 너무 좋은 날, 나는?",
    emoji: "😊",
    choices: [
      { text: "😌 기분 좋다고 딱히 뭘 사진 않아", score: 0 },
      { text: "☕ 평소보다 좀 비싼 커피 한 잔 정도는 마셔", score: 1 },
      { text: "🎁 기분 좋으니까 나한테 선물 하나 사도 되지", score: 2 },
      { text: "🛍️ 이런 날 안 사면 언제 사. 기분 좋을 때 지르는 게 제맛", score: 3 }
    ]
  },
  {
    id: 3,
    question: "스트레스 받으면 나는?",
    emoji: "😤",
    choices: [
      { text: "🏃 운동하거나 산책으로 풀어", score: 0 },
      { text: "🍫 맛있는 거 먹는 걸로 달래는 편이야", score: 1 },
      { text: "📱 쇼핑몰 구경하면서 스트레스 풀어. 안 사도 돼", score: 2 },
      { text: "💸 지르면 후련해. 스트레스엔 역시 쇼핑이야", score: 3 }
    ]
  },
  {
    id: 4,
    question: "쇼핑몰 앱을 여는 타이밍은?",
    emoji: "📱",
    choices: [
      { text: "🎯 필요한 게 생겼을 때만 열어", score: 0 },
      { text: "🌙 심심할 때 가끔 구경해", score: 1 },
      { text: "😔 뭔가 허전하거나 기분 안 좋을 때 자동으로 켜져", score: 2 },
      { text: "🔄 기분 좋아도 나쁘아도 켜. 그냥 항상 켜", score: 3 }
    ]
  },
  {
    id: 5,
    question: "충동구매 후 나는?",
    emoji: "🛍️",
    choices: [
      { text: "😌 충동구매를 거의 안 해서 모르겠어", score: 0 },
      { text: "🤔 가끔 후회하지만 살 때는 행복했어", score: 1 },
      { text: "😅 후회하면서도 또 해. 어쩔 수 없어", score: 2 },
      { text: "😊 후회 없어. 그 순간 행복했으면 된 거지", score: 3 }
    ]
  },
  {
    id: 6,
    question: "슬픈 영화나 드라마를 보고 나면?",
    emoji: "🎬",
    choices: [
      { text: "😌 감정이 소비로 이어지진 않아", score: 0 },
      { text: "🍦 뭔가 달달한 게 당기긴 해", score: 1 },
      { text: "🛒 왠지 뭔가 사고 싶어져. 위로가 필요한가봐", score: 2 },
      { text: "💳 바로 쇼핑 앱 켜. 이런 날엔 나한테 뭔가 해줘야 해", score: 3 }
    ]
  },
  {
    id: 7,
    question: "월급날 나는?",
    emoji: "💰",
    choices: [
      { text: "📊 저축 먼저, 나머지로 계획적으로 써", score: 0 },
      { text: "🍽️ 맛있는 거 한 끼 먹는 정도로 자축해", score: 1 },
      { text: "🛍️ 그동안 참았던 거 하나씩 질러. 내가 번 거잖아", score: 2 },
      { text: "💸 들어오는 족족 나가. 월급날이 가장 행복하고 가장 빠른 날", score: 3 }
    ]
  },
  {
    id: 8,
    question: "누군가와 다퉜을 때 나는?",
    emoji: "😡",
    choices: [
      { text: "😌 화가 소비로 이어지진 않아", score: 0 },
      { text: "🍕 맛있는 거 시켜 먹으면서 달래", score: 1 },
      { text: "🛍️ 쇼핑하면 좀 잊혀. 기분 전환용으로 사", score: 2 },
      { text: "💳 화날 때 제일 많이 써. 어차피 나만 손해지 뭐", score: 3 }
    ]
  },
  {
    id: 9,
    question: "지금 가지고 있는 물건들 중 감정적으로 산 것의 비율은?",
    emoji: "📦",
    choices: [
      { text: "📋 거의 없어. 다 필요해서 산 것들이야", score: 0 },
      { text: "🤔 10~20% 정도? 가끔 충동으로 사긴 해", score: 1 },
      { text: "😅 절반 정도는 '그때 왜 샀지' 싶어", score: 2 },
      { text: "💀 생각하기 싫어. 대부분 감정으로 산 것 같아", score: 3 }
    ]
  },
  {
    id: 10,
    question: "'이건 살 때만 행복하다'는 말이 나한테 해당되는 정도는?",
    emoji: "💭",
    choices: [
      { text: "😌 전혀. 나는 살 때도 신중해", score: 0 },
      { text: "🤔 가끔 그럴 때 있어. 사고 나서 시들해지는 경우", score: 1 },
      { text: "😅 꽤 해당돼. 살 때 도파민이 최고야", score: 2 },
      { text: "💯 완전 나 얘기야. 사는 그 순간이 제일 행복해", score: 3 }
    ]
  }
];

// ============================================
// 5단계 필코노미 레벨
// ============================================

const PHILCONOMY_LEVELS = {
  RATIONAL: {
    level: 1,
    range: "0~20%",
    emoji: "🧠",
    name: "이성적 소비자",
    tagline: "감정이 지갑을 열지 않아. 진짜야?",
    color: "#2ECC71",
    desc: "감정과 소비를 철저하게 분리하는 희귀종이야. 기분이 좋아도 나빠도 지갑은 조용해. 충동구매가 뭔지 이론으로만 알고 있는 타입. 재테크 유튜버들이 가장 좋아할 타입이야.",
    badge: "🏆 이성 소비 인증서"
  },
  BEGINNER: {
    level: 2,
    range: "21~40%",
    emoji: "🌱",
    name: "지갑이 가끔 흔들림",
    tagline: "가끔 감정이 지갑을 건드려. 아직 초보야.",
    color: "#F39C12",
    desc: "감정 소비를 완전히 안 하는 건 아닌데, 그렇다고 심각하지도 않아. 기분 나쁠 때 편의점 정도는 들르고, 월급날 작은 사치 정도는 허용하는 건강한 수준이야. 이 정도면 충분히 정상이야.",
    badge: "🌿 감성 소비 새싹"
  },
  MODERATE: {
    level: 3,
    range: "41~60%",
    emoji: "🛍️",
    name: "감성 소비 중독 직전",
    tagline: "감정이 지갑을 여는 빈도가 꽤 높아.",
    color: "#E67E22",
    desc: "기분에 따라 소비가 달라지는 패턴이 뚜렷해. 스트레스받으면 쇼핑 앱 열고, 기분 좋으면 평소보다 더 써. 감정이 소비의 트리거가 된 상태야. 나쁘진 않지만 통장이 좀 출렁이는 이유가 여기 있어.",
    badge: "🛒 감성 소비 중급"
  },
  HIGH: {
    level: 4,
    range: "61~80%",
    emoji: "💳",
    name: "지름신이 상주 중",
    tagline: "감정이 지갑의 주인이야. 이성은 조수석.",
    color: "#E74C3C",
    desc: "우울할 때도 사고, 기분 좋을 때도 사. 감정이 올라올 때마다 소비 욕구가 자동으로 따라와. 쇼핑이 감정 처리 방식이 된 상태야. 살 때는 행복하지만 카드 명세서 볼 때가 문제야.",
    badge: "💸 감성 소비 고급"
  },
  MASTER: {
    level: 5,
    range: "81~100%",
    emoji: "🌊",
    name: "카드가 심장을 대신함",
    tagline: "우울할 때도 사고, 기분 좋을 때도 사고. 이유는 항상 있어.",
    color: "#8E44AD",
    desc: "감정과 소비가 완전히 연결된 타입이야. 기쁨, 슬픔, 분노, 설렘 — 어떤 감정이든 결국 소비로 이어져. 쇼핑이 감정 처리의 1순위 수단이 된 상태. 카드 명세서가 감정일기나 다름없어. 지갑보다 마음을 먼저 챙겨봐.",
    badge: "👑 필코노미의 왕"
  }
};

// ============================================
// 채점 함수
// ============================================

function calcPhilconomy(answers) {
  // answers = [0, 2, 1, 3, ...] 10개
  const totalScore = answers.reduce((sum, score) => sum + score, 0);
  const percentage = Math.round((totalScore / 30) * 100);

  let levelKey;
  if (percentage <= 20) levelKey = 'RATIONAL';
  else if (percentage <= 40) levelKey = 'BEGINNER';
  else if (percentage <= 60) levelKey = 'MODERATE';
  else if (percentage <= 80) levelKey = 'HIGH';
  else levelKey = 'MASTER';

  return {
    totalScore,
    maxScore: 30,
    percentage,
    levelKey,
    levelInfo: PHILCONOMY_LEVELS[levelKey]
  };
}

if (typeof module !== 'undefined') {
  module.exports = { PHILCONOMY_QUESTIONS, PHILCONOMY_LEVELS, calcPhilconomy };
}

// ============================================
// 러너 설정 등록
// ============================================

window.TEST_CONFIGS = window.TEST_CONFIGS || {};

window.TEST_CONFIGS['philconomy'] = {
  data: {
    title: "필코노미 지수 테스트",
    emoji: "💳",
    thumb: "images/philconomy/thumb.webp",
    subtitle: "나는 감정으로 얼마나 소비할까? (10문항)",
    questions: PHILCONOMY_QUESTIONS.map(q => ({
      q: q.question,
      choices: q.choices.map(c => ({
        text: c.text,
        score: { SCORE: c.score }
      }))
    })),
    results: PHILCONOMY_LEVELS
  },
  onAnswer(choice, state) {
    state.answersRaw.push(choice.score?.SCORE ?? choice.score ?? 0);
  },
  calcResult(state) {
    const result = calcPhilconomy(state.answersRaw);
    const t = result.levelInfo;
    const levelMap = { RATIONAL: "0", BEGINNER: "1", MODERATE: "2", HIGH: "3", MASTER: "4" };
    return {
      winner: result.levelKey,
      type: t.name,
      emoji: t.emoji,
      desc: `<b>${t.badge}</b><br><br>${t.desc}<br><br><b>📊 필코노미 지수: ${result.percentage}%</b> (${result.totalScore}/${result.maxScore}점)`,
      tagline: t.tagline
    };
  },
  getShareImage(winner) {
    const map = { RATIONAL: "0", BEGINNER: "1", MODERATE: "2", HIGH: "3", MASTER: "4" };
    return `images/philconomy/${map[winner]}.webp`;
  },
  getSaveFilename(winner) {
    const map = { RATIONAL: "0", BEGINNER: "1", MODERATE: "2", HIGH: "3", MASTER: "4" };
    return `PHILCONOMY_${map[winner]}.webp`;
  }
};
