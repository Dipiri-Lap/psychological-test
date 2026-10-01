// ============================================
// 우리 권태기일까? 권태기 진단 테스트
// ============================================
// 구조: 15문항, 선택지 4개 (0~3점)
// 0점 = 식어버린 신호 (차가움)
// 3점 = 여전히 뜨거운 신호 (따뜻함)
// 채점: 점수 합산 → 관계 온도(°C)로 환산 → 5단계
// 최대 점수: 45점
// 영역: 설렘 / 연락·관심 / 스킨십·애정표현 / 대화·공유 / 미래·계획 (각 3문항)
// ============================================

const BOREDOM_QUESTIONS = [
  {
    id: 1,
    area: "EXCITE",
    question: "애인 연락이 올 때 마음은 어때?",
    emoji: "📲",
    choices: [
      { text: "🧊 그냥 당연한 일상처럼 느껴져", score: 0 },
      { text: "😌 특별한 감흥은 없지만 반가워", score: 1 },
      { text: "🙂 볼 때마다 기분이 좋아져", score: 2 },
      { text: "🔥 지금도 이름만 봐도 설레", score: 3 }
    ]
  },
  {
    id: 2,
    area: "CONTACT",
    question: "하루 동안 서로 연락하는 빈도는 예전과 비교하면?",
    emoji: "💬",
    choices: [
      { text: "🧊 많이 줄었어. 용건 있을 때만 해", score: 0 },
      { text: "😌 조금 줄긴 했어", score: 1 },
      { text: "🙂 예전이랑 비슷해", score: 2 },
      { text: "🔥 오히려 더 자주 하는 것 같아", score: 3 }
    ]
  },
  {
    id: 3,
    area: "TOUCH",
    question: "손을 잡거나 안는 것 같은 스킨십은 어때?",
    emoji: "🤝",
    choices: [
      { text: "🧊 거의 안 하게 됐어", score: 0 },
      { text: "😌 예전보다는 줄었어", score: 1 },
      { text: "🙂 자연스럽게 여전히 해", score: 2 },
      { text: "🔥 아직도 먼저 다가가게 돼", score: 3 }
    ]
  },
  {
    id: 4,
    area: "TALK",
    question: "둘이 만나면 무슨 얘기를 해?",
    emoji: "💭",
    choices: [
      { text: "🧊 딱히 할 말이 없어서 조용할 때가 많아", score: 0 },
      { text: "😌 일상적인 용건 얘기가 대부분이야", score: 1 },
      { text: "🙂 시시콜콜한 얘기도 편하게 나눠", score: 2 },
      { text: "🔥 밤새도록 얘기해도 할 말이 넘쳐", score: 3 }
    ]
  },
  {
    id: 5,
    area: "FUTURE",
    question: "앞으로의 계획(여행, 미래 등)을 같이 얘기해?",
    emoji: "🗺️",
    choices: [
      { text: "🧊 요즘은 거의 안 해", score: 0 },
      { text: "😌 가끔 생각날 때만", score: 1 },
      { text: "🙂 종종 자연스럽게 얘기해", score: 2 },
      { text: "🔥 둘이 모이면 늘 미래 얘기부터 해", score: 3 }
    ]
  },
  {
    id: 6,
    area: "EXCITE",
    question: "데이트 전날, 설레는 마음이 아직 있어?",
    emoji: "🌙",
    choices: [
      { text: "🧊 그냥 일정 중 하나처럼 느껴져", score: 0 },
      { text: "😌 특별한 느낌은 없어", score: 1 },
      { text: "🙂 기대되는 마음이 있어", score: 2 },
      { text: "🔥 잠도 설칠 만큼 기대돼", score: 3 }
    ]
  },
  {
    id: 7,
    area: "CONTACT",
    question: "애인에게 \"오늘 뭐 했어?\"가 먼저 궁금해?",
    emoji: "🤔",
    choices: [
      { text: "🧊 딱히 궁금하지 않아", score: 0 },
      { text: "😌 물어봐야 하니까 묻는 편이야", score: 1 },
      { text: "🙂 자연스럽게 궁금해서 물어봐", score: 2 },
      { text: "🔥 하루 종일 제일 궁금한 게 그거야", score: 3 }
    ]
  },
  {
    id: 8,
    area: "TOUCH",
    question: "가벼운 장난이나 애교 섞인 행동은?",
    emoji: "😜",
    choices: [
      { text: "🧊 이제 그런 거 거의 안 해", score: 0 },
      { text: "😌 예전만큼은 아니야", score: 1 },
      { text: "🙂 가끔 자연스럽게 나와", score: 2 },
      { text: "🔥 만날 때마다 장난치느라 바빠", score: 3 }
    ]
  },
  {
    id: 9,
    area: "TALK",
    question: "요즘 고민이나 속마음을 애인에게 먼저 얘기해?",
    emoji: "🫶",
    choices: [
      { text: "🧊 굳이 말 안 하게 돼", score: 0 },
      { text: "😌 물어보면 그제서야 얘기해", score: 1 },
      { text: "🙂 자연스럽게 먼저 얘기하는 편이야", score: 2 },
      { text: "🔥 제일 먼저 생각나는 사람이 애인이야", score: 3 }
    ]
  },
  {
    id: 10,
    area: "FUTURE",
    question: "1년 뒤 우리 모습을 상상해본 적 있어?",
    emoji: "🔮",
    choices: [
      { text: "🧊 요즘은 잘 안 그려져", score: 0 },
      { text: "😌 가끔 막연하게만", score: 1 },
      { text: "🙂 꽤 구체적으로 그려져", score: 2 },
      { text: "🔥 자주 둘이서 미래를 그려봐", score: 3 }
    ]
  },
  {
    id: 11,
    area: "EXCITE",
    question: "애인이 멋있어 보이거나 예뻐 보이는 순간이 아직 있어?",
    emoji: "✨",
    choices: [
      { text: "🧊 이제 그런 느낌은 잘 없어", score: 0 },
      { text: "😌 가끔 문득 그럴 때가 있어", score: 1 },
      { text: "🙂 꽤 자주 그렇게 느껴", score: 2 },
      { text: "🔥 볼 때마다 여전히 설레", score: 3 }
    ]
  },
  {
    id: 12,
    area: "CONTACT",
    question: "애인 연락이 평소보다 늦으면 어떤 생각이 들어?",
    emoji: "⏳",
    choices: [
      { text: "🧊 별생각 안 들고 신경도 안 쓰여", score: 0 },
      { text: "😌 그런가 보다 하고 넘어가", score: 1 },
      { text: "🙂 무슨 일 있나 살짝 신경 쓰여", score: 2 },
      { text: "🔥 괜히 자꾸 폰을 확인하게 돼", score: 3 }
    ]
  },
  {
    id: 13,
    area: "TOUCH",
    question: "오랜만에 만났을 때 반가움의 정도는?",
    emoji: "🏃",
    choices: [
      { text: "🧊 그냥 무덤덤하게 인사해", score: 0 },
      { text: "😌 반갑긴 한데 덤덤한 편이야", score: 1 },
      { text: "🙂 자연스럽게 웃음이 나와", score: 2 },
      { text: "🔥 보자마자 와락 안기게 돼", score: 3 }
    ]
  },
  {
    id: 14,
    area: "TALK",
    question: "둘만의 농담이나 추억 얘기를 아직 자주 꺼내?",
    emoji: "😄",
    choices: [
      { text: "🧊 이제 그런 얘기는 잘 안 해", score: 0 },
      { text: "😌 가끔 생각나면 하는 정도", score: 1 },
      { text: "🙂 종종 꺼내면서 웃어", score: 2 },
      { text: "🔥 만날 때마다 그 얘기로 웃음이 끊이지 않아", score: 3 }
    ]
  },
  {
    id: 15,
    area: "FUTURE",
    question: "지금 이 관계에 대한 확신은 어느 정도야?",
    emoji: "💗",
    choices: [
      { text: "🧊 솔직히 요즘 잘 모르겠어", score: 0 },
      { text: "😌 큰 문제는 없지만 설렘은 없어", score: 1 },
      { text: "🙂 편안하고 안정적이라고 느껴", score: 2 },
      { text: "🔥 지금도 이 사람이 맞다는 확신이 있어", score: 3 }
    ]
  }
];

// ============================================
// 영역 정의 (각 3문항 / 만점 9점)
// ============================================

const BOREDOM_AREAS = {
  EXCITE:  { name: "설렘",         emoji: "✨", color: "#E85D75", desc: "아직 두근거리는 마음이 남아 있는가" },
  CONTACT: { name: "연락·관심",    emoji: "💬", color: "#E67E22", desc: "서로에 대한 관심이 연락에 드러나는가" },
  TOUCH:   { name: "스킨십·애정표현", emoji: "🤝", color: "#9B59B6", desc: "몸으로 전해지는 애정 표현이 남아 있는가" },
  TALK:    { name: "대화·공유",    emoji: "💭", color: "#3498DB", desc: "속마음과 일상을 얼마나 나누고 있는가" },
  FUTURE:  { name: "미래·계획",    emoji: "🔮", color: "#16A085", desc: "함께할 다음을 그리고 있는가" }
};

// ============================================
// 5단계 관계 온도
// ============================================

const BOREDOM_LEVELS = {
  FROZEN: {
    level: 1,
    range: "0~9점",
    emoji: "🧊",
    name: "영하권 권태기",
    tagline: "지금은 완전히 식어 있는 상태입니다.",
    color: "#5B8DB8",
    temp: { min: -10, max: 1 },
    desc: "설렘도 관심도 거의 느껴지지 않는 상태입니다. 연락은 의무처럼 되어 있고, 만나도 특별한 감정이 잘 올라오지 않죠. 이건 두 사람 중 누군가의 잘못이 아니라, 관계가 보내는 분명한 신호입니다. 그냥 넘기면 자연스럽게 끝으로 이어질 가능성이 높아요. 지금 필요한 건 작은 이벤트가 아니라, 왜 식었는지에 대한 솔직한 대화입니다.",
    badge: "🧊 완전 냉각 상태"
  },
  COOL: {
    level: 2,
    range: "10~18점",
    emoji: "🌫️",
    name: "미지근한 권태기",
    tagline: "익숙함이 설렘을 밀어내고 있습니다.",
    color: "#7FA8C9",
    temp: { min: 2, max: 12 },
    desc: "아직 관계가 끝난 건 아니지만, 확실히 온도가 낮아져 있습니다. 편안해진 만큼 긴장감도 설렘도 함께 사라진 상태죠. 이 구간이 가장 위험한 이유는 당장 큰 문제가 없어 보여서 방치하기 쉽다는 겁니다. 작은 변화 하나(새로운 데이트, 평소 안 하던 말 한마디)만으로도 온도가 다시 올라갈 여지가 충분히 남아 있어요.",
    badge: "🌫️ 서서히 식는 중"
  },
  MILD: {
    level: 3,
    range: "19~27점",
    emoji: "🌤️",
    name: "적정 온도, 안정기",
    tagline: "설렘은 줄었지만 편안함이 그 자리를 채웠습니다.",
    color: "#F39C12",
    temp: { min: 13, max: 23 },
    desc: "초반의 뜨거운 설렘은 아니지만, 안정적인 온도를 유지하고 있습니다. 이건 자연스러운 변화예요. 오래된 관계일수록 설렘보다 편안함이 커지는 건 당연한 일입니다. 다만 이 안정감이 무관심으로 흘러가지 않도록, 가끔은 의식적으로 서로에게 다시 집중하는 시간이 필요합니다.",
    badge: "🌤️ 안정적인 평온 구간"
  },
  WARM: {
    level: 4,
    range: "28~36점",
    emoji: "🔥",
    name: "따뜻함을 유지 중",
    tagline: "권태기와는 거리가 있는 편입니다.",
    color: "#E67E22",
    temp: { min: 24, max: 34 },
    desc: "서로에 대한 관심과 애정이 여전히 잘 유지되고 있습니다. 연락도, 스킨십도, 대화도 자연스럽게 이어지고 있죠. 가끔 권태를 걱정할 수는 있지만, 지금 상태만 보면 크게 염려할 단계는 아닙니다. 지금처럼 서로에게 꾸준히 관심을 표현하는 습관만 유지하면 좋은 온도를 오래 지킬 수 있어요.",
    badge: "🔥 건강한 온기 유지"
  },
  BLAZING: {
    level: 5,
    range: "37~45점",
    emoji: "☀️",
    name: "펄펄 끓는 중",
    tagline: "지금 이 관계, 권태기는 먼 얘기입니다.",
    color: "#C0392B",
    temp: { min: 35, max: 45 },
    desc: "설렘, 관심, 스킨십, 대화, 미래까지 모든 영역에서 뜨거운 온도가 유지되고 있습니다. 오래된 커플이라면 이 정도의 온도를 유지하는 것 자체가 흔치 않은 일이에요. 지금 이 관계가 왜 잘 되고 있는지 가끔 돌아보면, 권태기가 오더라도 금방 다시 데울 수 있는 힘이 됩니다.",
    badge: "☀️ 최고 온도 유지 중"
  }
};

// ============================================
// 채점 함수
// ============================================

// 점수 비율(%) → 관계 온도(°C) 환산
// 0% → -10℃, 100% → 45℃ (선형 매핑)
function toTemperature(percentage) {
  const temp = -10 + percentage * 0.55;
  return Math.round(temp);
}

function calcBoredom(answers) {
  const totalScore = answers.reduce((sum, score) => sum + score, 0);
  const maxScore = BOREDOM_QUESTIONS.length * 3;
  const percentage = Math.round((totalScore / maxScore) * 100);
  const temperature = toTemperature(percentage);

  // 영역별 집계
  const areaScores = {};
  Object.keys(BOREDOM_AREAS).forEach(k => { areaScores[k] = { score: 0, max: 0, percentage: 0 }; });
  BOREDOM_QUESTIONS.forEach((q, i) => {
    const a = areaScores[q.area];
    if (!a) return;
    a.score += (answers[i] ?? 0);
    a.max   += 3;
  });
  Object.values(areaScores).forEach(a => {
    a.percentage = a.max ? Math.round((a.score / a.max) * 100) : 0;
  });

  // 가장 뜨거운 영역 / 가장 식은 영역
  const ordered = Object.entries(areaScores).sort((a, b) => a[1].percentage - b[1].percentage);
  const coldestArea  = ordered[0][0];
  const warmestArea  = ordered[ordered.length - 1][0];

  let levelKey;
  if (totalScore <= 9) levelKey = 'FROZEN';
  else if (totalScore <= 18) levelKey = 'COOL';
  else if (totalScore <= 27) levelKey = 'MILD';
  else if (totalScore <= 36) levelKey = 'WARM';
  else levelKey = 'BLAZING';

  return {
    totalScore,
    maxScore,
    percentage,
    temperature,
    levelKey,
    levelInfo: BOREDOM_LEVELS[levelKey],
    areaScores,
    coldestArea,
    warmestArea
  };
}

if (typeof module !== 'undefined') {
  module.exports = { BOREDOM_QUESTIONS, BOREDOM_AREAS, BOREDOM_LEVELS, calcBoredom, toTemperature };
}
