// ============================================
// 나의 집착 레벨 테스트
// ============================================
// 구조: 12문항, 선택지 4개 (0~3점)
// 채점: 점수 합산 → 5단계 레벨
// 최대 점수: 36점
// ============================================

const OBSESSION_QUESTIONS = [
  {
    id: 1,
    question: "연인한테 카톡 보낸 후 답장이 30분째 없어. 나는?",
    emoji: "📱",
    choices: [
      { text: "😌 바쁜가 보다. 신경 안 써", score: 0 },
      { text: "🤔 좀 신경 쓰이긴 하는데 기다려", score: 1 },
      { text: "😟 혹시 뭔가 잘못됐나 카톡 내용 다시 읽어봐", score: 2 },
      { text: "😤 추가 카톡 보내거나 전화해버려", score: 3 }
    ]
  },
  {
    id: 2,
    question: "연인 SNS에 모르는 이성이 댓글 달았어. 나는?",
    emoji: "👀",
    choices: [
      { text: "😌 그럴 수 있지. 전혀 신경 안 써", score: 0 },
      { text: "🤔 살짝 눈에 걸리긴 하는데 넘어가", score: 1 },
      { text: "🔍 그 사람 프로필 슬쩍 들어가봐", score: 2 },
      { text: "😤 연인한테 누구냐고 바로 물어봐", score: 3 }
    ]
  },
  {
    id: 3,
    question: "연인이 친구들이랑 놀러 갔어. 연락은 뜸해. 나는?",
    emoji: "🎉",
    choices: [
      { text: "😊 잘 놀다 와. 나도 내 시간 즐겨", score: 0 },
      { text: "🙂 재밌게 놀라고 하고 연락 기다려", score: 1 },
      { text: "😟 얼마나 뜸한지 체크하면서 먼저 연락해", score: 2 },
      { text: "😤 왜 연락을 안 하냐고 서운함 표현해", score: 3 }
    ]
  },
  {
    id: 4,
    question: "연인의 전 애인 얘기가 나왔어. 나는?",
    emoji: "💔",
    choices: [
      { text: "😌 과거는 과거지. 별로 신경 안 써", score: 0 },
      { text: "🤔 살짝 신경 쓰이지만 표현은 안 해", score: 1 },
      { text: "😟 전 애인이 어떤 사람인지 조금 더 알고 싶어", score: 2 },
      { text: "😤 연인 SNS에서 전 애인 찾아봐", score: 3 }
    ]
  },
  {
    id: 5,
    question: "연인이 '오늘 피곤해서 먼저 잘게'라고 했어. 나는?",
    emoji: "😴",
    choices: [
      { text: "😊 푹 자라고 하고 나도 잠들어", score: 0 },
      { text: "🙂 알겠다고 하고 잘 자라고 해", score: 1 },
      { text: "😟 좀 더 얘기하자고 붙잡고 싶어", score: 2 },
      { text: "😤 섭섭해서 '왜 벌써 자?' 한마디 해", score: 3 }
    ]
  },
  {
    id: 6,
    question: "하루 동안 연인이랑 연락을 얼마나 해야 만족해?",
    emoji: "💬",
    choices: [
      { text: "📅 자주 안 해도 돼. 보고 싶을 때 하면 되지", score: 0 },
      { text: "☀️ 아침저녁으로 안부 정도면 충분해", score: 1 },
      { text: "🔄 하루 종일 틈틈이 주고받아야 안심돼", score: 2 },
      { text: "📡 항상 연결되어 있어야 해. 연락 끊기면 불안해", score: 3 }
    ]
  },
  {
    id: 7,
    question: "연인이 내 연락을 씹고 다른 SNS는 활동하고 있어. 나는?",
    emoji: "😶",
    choices: [
      { text: "😌 할 말 있으면 연락 오겠지. 기다려", score: 0 },
      { text: "🤔 나중에 왜 답장 못 했냐고 살짝 물어봐", score: 1 },
      { text: "😟 SNS에 접속 중이면서 왜 답장을 안 하는 건지 의심해", score: 2 },
      { text: "😤 지금 당장 따져봐. 이건 좀 아니잖아", score: 3 }
    ]
  },
  {
    id: 8,
    question: "연인이 이성 친구랑 단둘이 밥을 먹는다고 해. 나는?",
    emoji: "🍽️",
    choices: [
      { text: "😌 믿으니까 신경 안 써. 재밌게 먹고 와", score: 0 },
      { text: "🤔 살짝 신경 쓰이지만 말은 안 해", score: 1 },
      { text: "😟 어떤 사이냐고 물어보고 싶어", score: 2 },
      { text: "😤 불편하다고 솔직하게 말하고 못 가게 해", score: 3 }
    ]
  },
  {
    id: 9,
    question: "연인이 갑자기 혼자만의 시간이 필요하다고 했어. 나는?",
    emoji: "🏝️",
    choices: [
      { text: "😊 당연하지. 나도 내 시간 즐길게", score: 0 },
      { text: "🙂 알겠다고 하되 가끔 연락은 해달라고 해", score: 1 },
      { text: "😟 나한테 뭔가 불만이 있는 건 아닌지 걱정돼", score: 2 },
      { text: "😰 사실 이별 신호 아닌지 패닉 옴", score: 3 }
    ]
  },
  {
    id: 10,
    question: "연인과 싸운 후 화해가 안 되고 있어. 나는?",
    emoji: "💢",
    choices: [
      { text: "⏳ 서로 감정 가라앉히고 천천히 풀면 돼", score: 0 },
      { text: "💬 먼저 연락해서 대화로 풀어보려 해", score: 1 },
      { text: "😟 계속 신경 쓰여서 연락을 여러 번 시도해", score: 2 },
      { text: "😤 화해될 때까지 계속 연락해. 이대로 끝낼 수 없어", score: 3 }
    ]
  },
  {
    id: 11,
    question: "연인이 내가 모르는 약속이 생겼다고 했어. 나는?",
    emoji: "📅",
    choices: [
      { text: "😌 그래? 재밌게 다녀와", score: 0 },
      { text: "🙂 어디서 누구랑인지 가볍게 물어봐", score: 1 },
      { text: "🔍 자세히 물어보고 싶지만 눈치 보여서 참아", score: 2 },
      { text: "😤 누구랑 어디서 뭐 하는지 다 알아야 안심돼", score: 3 }
    ]
  },
  {
    id: 12,
    question: "연인의 스마트폰을 볼 수 있는 상황이야. 나는?",
    emoji: "📲",
    choices: [
      { text: "😌 볼 생각 자체가 없어. 신뢰가 기본이지", score: 0 },
      { text: "🤔 보고 싶은 마음이 없진 않지만 절대 안 봐", score: 1 },
      { text: "😟 보고 싶은 마음이 들어. 근데 참아", score: 2 },
      { text: "👀 솔직히 몰래 확인해본 적 있어", score: 3 }
    ]
  }
];

// ============================================
// 5단계 집착 레벨 결과
// ============================================

const OBSESSION_LEVELS = {
  FREE: {
    level: 1,
    range: "0~8점",
    emoji: "😇",
    name: "집착 제로",
    tagline: "당신 혹시 성인군자?",
    color: "#2ECC71",
    desc: "연인을 완전히 믿고 각자의 공간을 존중하는 타입이야. 집착과는 거리가 멀고, 연애에서도 독립적인 관계를 유지해. 상대방 입장에선 편안하지만 가끔 '나한테 관심 없나?' 싶을 수도 있어. 당신의 여유로움이 최고 강점이야.",
    badge: "🕊️ 자유로운 영혼"
  },
  MILD: {
    level: 2,
    range: "9~17점",
    emoji: "😊",
    name: "건강한 관심러",
    tagline: "사랑하니까 신경 쓰이는 거잖아.",
    color: "#F39C12",
    desc: "신경은 쓰이지만 표현은 조절하는 타입이야. 완전히 무관심하지도, 과하게 집착하지도 않는 건강한 연애 스타일이야. 가끔 불안함이 올라오지만 스스로 조절할 줄 알아. 이 정도면 충분히 정상이야.",
    badge: "💚 건강한 연애러"
  },
  MODERATE: {
    level: 3,
    range: "18~24점",
    emoji: "😟",
    name: "집착 주의보",
    tagline: "나도 알아. 좀 심한 거. 근데 어떻게.",
    color: "#E67E22",
    desc: "사랑하는 마음이 크다 보니 집착으로 이어지는 경우가 있어. 상대방의 행동 하나하나가 신경 쓰이고, 불안함이 자주 올라와. 이 감정이 연인을 피곤하게 만들 수 있다는 걸 알지만 컨트롤이 쉽지 않아. 스스로를 믿는 연습이 필요해.",
    badge: "🌡️ 집착 주의단계"
  },
  HIGH: {
    level: 4,
    range: "25~30점",
    emoji: "😰",
    name: "집착 경보 발령",
    tagline: "이건... 좀 줄여야 할 것 같아.",
    color: "#E74C3C",
    desc: "연인에 대한 집착이 꽤 강한 편이야. 상대방의 일거수일투족이 신경 쓰이고, 불안감이 자주 행동으로 표출돼. 이 패턴이 반복되면 관계가 지치게 될 수 있어. 집착의 뿌리는 불안감이야. 그 불안이 어디서 오는지 들여다볼 필요가 있어.",
    badge: "🚨 집착 경보단계"
  },
  EXTREME: {
    level: 5,
    range: "31~36점",
    emoji: "💀",
    name: "집착의 화신",
    tagline: "연인도 알고 있어. 당신도 알고 있잖아.",
    color: "#8E44AD",
    desc: "집착이 연애의 중심이 된 상태야. 상대방을 통제하려는 욕구가 강하고, 혼자 있는 시간을 견디기 힘들어. 이 정도면 상대방도 상당히 지쳐있을 가능성이 높아. 집착은 사랑이 아니야. 나를 믿고 상대방을 믿는 연습, 그리고 필요하다면 전문가의 도움도 고려해봐.",
    badge: "🌑 집착의 화신"
  }
};

// ============================================
// 채점 함수
// ============================================

function calcObsessionLevel(answers) {
  // answers = [0, 2, 1, 3, ...] 12개 (각 선택지 점수)
  const totalScore = answers.reduce((sum, score) => sum + score, 0);

  let levelKey;
  if (totalScore <= 8) levelKey = 'FREE';
  else if (totalScore <= 17) levelKey = 'MILD';
  else if (totalScore <= 24) levelKey = 'MODERATE';
  else if (totalScore <= 30) levelKey = 'HIGH';
  else levelKey = 'EXTREME';

  const percentage = Math.round((totalScore / 36) * 100);

  return {
    levelKey,
    totalScore,
    maxScore: 36,
    percentage,
    levelInfo: OBSESSION_LEVELS[levelKey]
  };
}

if (typeof module !== 'undefined') {
  module.exports = { OBSESSION_QUESTIONS, OBSESSION_LEVELS, calcObsessionLevel };
}
