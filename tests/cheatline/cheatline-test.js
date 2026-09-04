// ============================================
// 어디까지 바람일까? 바람 기준선 테스트
// ============================================
// 구조: 15문항, 선택지 4개 (0~3점)
// 0점 = 이건 명백한 바람 (기준 엄격)
// 3점 = 전혀 문제 없음 (기준 관대)
// 채점: 점수 합산 → 5단계 기준선 레벨
// 최대 점수: 45점
// 영역: 연락 / 신체접촉 / 감정 / 과거 / 온라인 (각 3문항)
// ============================================

const CHEATLINE_QUESTIONS = [
  {
    id: 1,
    area: "CONTACT",
    question: "애인이 이성인 동료와 매일 밤 카톡으로 수다를 떤다면?",
    emoji: "💬",
    choices: [
      { text: "🚨 매일 밤은 선 넘었어. 이건 바람이야", score: 0 },
      { text: "😠 바람까진 아니어도 당장 얘기해야 할 문제야", score: 1 },
      { text: "🤔 내용에 따라 다르지. 업무 얘기면 괜찮아", score: 2 },
      { text: "😌 친한 동료면 그럴 수 있지. 아무 문제 없어", score: 3 }
    ]
  },
  {
    id: 2,
    area: "PHYSICAL",
    question: "애인이 이성인 친구와 단둘이 술을 마셨다면?",
    emoji: "🍻",
    choices: [
      { text: "🚨 단둘이 술은 무조건 아웃이야", score: 0 },
      { text: "😠 미리 말도 안 했다면 크게 화날 것 같아", score: 1 },
      { text: "🤔 미리 말해줬고 자리가 건전했으면 넘어가", score: 2 },
      { text: "😌 친구랑 술 한잔이 뭐가 문제야", score: 3 }
    ]
  },
  {
    id: 3,
    area: "EMOTION",
    question: "애인이 나한테는 안 하는 고민 상담을 다른 이성한테 한다면?",
    emoji: "🫧",
    choices: [
      { text: "🚨 마음이 이미 그쪽으로 간 거야. 감정적 바람이야", score: 0 },
      { text: "😠 몸보다 마음이 더 아파. 심각한 문제야", score: 1 },
      { text: "🤔 나한테 말하기 어려운 주제도 있으니까", score: 2 },
      { text: "😌 상담 상대는 여러 명일수록 좋지", score: 3 }
    ]
  },
  {
    id: 4,
    area: "PAST",
    question: "애인 폰에 전 애인 연락처가 아직 저장되어 있다면?",
    emoji: "📇",
    choices: [
      { text: "🚨 지금 당장 지워. 남겨둘 이유가 없어", score: 0 },
      { text: "😠 지우는 게 예의지. 기분 나빠", score: 1 },
      { text: "🤔 연락만 안 하면 번호쯤은 상관없어", score: 2 },
      { text: "😌 그걸 왜 신경 써? 그냥 데이터야", score: 3 }
    ]
  },
  {
    id: 5,
    area: "ONLINE",
    question: "애인이 이성 인플루언서 사진마다 좋아요를 누른다면?",
    emoji: "❤️",
    choices: [
      { text: "🚨 매번 누르는 건 관심이 있다는 거야", score: 0 },
      { text: "😠 보기 좋진 않아. 좀 자제했으면 해", score: 1 },
      { text: "🤔 알고리즘이 띄워주니까 그럴 수도 있지", score: 2 },
      { text: "😌 좋아요 하나로 뭘 그래", score: 3 }
    ]
  },
  {
    id: 6,
    area: "CONTACT",
    question: "애인이 내가 모르는 이성과 하루 종일 톡하면서 나한테는 말 안 했다면?",
    emoji: "🤐",
    choices: [
      { text: "🚨 숨겼다는 것 자체가 바람의 증거야", score: 0 },
      { text: "😠 숨긴 이유부터 따져 물어야 해", score: 1 },
      { text: "🤔 일일이 보고할 의무는 없잖아", score: 2 },
      { text: "😌 나도 다 말 안 하는데 뭐", score: 3 }
    ]
  },
  {
    id: 7,
    area: "PHYSICAL",
    question: "회식 자리에서 이성 동료와 어깨동무하고 찍은 사진이 올라왔다면?",
    emoji: "📸",
    choices: [
      { text: "🚨 몸이 닿는 순간 선을 넘은 거야", score: 0 },
      { text: "😠 사진까지 올린 건 배려가 없어", score: 1 },
      { text: "🤔 회식 분위기면 그럴 수 있어", score: 2 },
      { text: "😌 단체 사진에 그런 게 뭐 대수야", score: 3 }
    ]
  },
  {
    id: 8,
    area: "EMOTION",
    question: "애인이 \"쟤는 그냥 편한 이성 친구야\"라면서 유독 그 사람 얘기만 자주 한다면?",
    emoji: "🗣️",
    choices: [
      { text: "🚨 자주 언급한다는 건 이미 마음에 있다는 뜻이야", score: 0 },
      { text: "😠 듣기 불편해. 티 내지 말라고 하고 싶어", score: 1 },
      { text: "🤔 숨기지 않고 말하는 게 오히려 건강한 거지", score: 2 },
      { text: "😌 친구 얘기 좀 할 수도 있지", score: 3 }
    ]
  },
  {
    id: 9,
    area: "PAST",
    question: "애인이 전 애인의 SNS를 가끔 들여다본다면?",
    emoji: "👁️",
    choices: [
      { text: "🚨 아직 미련이 남아 있다는 증거야", score: 0 },
      { text: "😠 알면 굉장히 서운할 것 같아", score: 1 },
      { text: "🤔 궁금해서 볼 수도 있지. 행동이 중요해", score: 2 },
      { text: "😌 나도 가끔 봐. 그게 무슨 문제야", score: 3 }
    ]
  },
  {
    id: 10,
    area: "ONLINE",
    question: "애인이 랜덤 채팅이나 익명 앱에서 이성과 대화한다면?",
    emoji: "🎭",
    choices: [
      { text: "🚨 익명으로 이성과 대화하는 순간 바람이야", score: 0 },
      { text: "😠 심심풀이라도 절대 하면 안 되는 짓이야", score: 1 },
      { text: "🤔 그냥 심심해서 떠드는 정도면 넘어가", score: 2 },
      { text: "😌 얼굴도 모르는 사람인데 뭐 어때", score: 3 }
    ]
  },
  {
    id: 11,
    area: "CONTACT",
    question: "애인이 이성한테 \"보고 싶다\", \"자기\" 같은 표현을 장난으로 쓴다면?",
    emoji: "🫦",
    choices: [
      { text: "🚨 장난이라도 그 단어는 절대 안 돼", score: 0 },
      { text: "😠 아무리 장난이어도 기분이 확 상해", score: 1 },
      { text: "🤔 원래 그렇게 말하는 성격이면 이해해", score: 2 },
      { text: "😌 요즘 다들 그렇게 장난치잖아", score: 3 }
    ]
  },
  {
    id: 12,
    area: "PHYSICAL",
    question: "애인이 이성과 단둘이 영화를 보거나 드라이브를 다녀왔다면?",
    emoji: "🚗",
    choices: [
      { text: "🚨 단둘이 데이트 코스면 그건 바람이야", score: 0 },
      { text: "😠 다녀왔다는 사실만으로 크게 싸울 일이야", score: 1 },
      { text: "🤔 미리 말했고 사정이 있었다면 이해해", score: 2 },
      { text: "😌 친구랑 영화 볼 수도 있는 거지", score: 3 }
    ]
  },
  {
    id: 13,
    area: "EMOTION",
    question: "애인이 다른 이성에게 설렜다고 솔직하게 고백했다면?",
    emoji: "💓",
    choices: [
      { text: "🚨 설렌 순간 이미 바람이야. 고백은 별개야", score: 0 },
      { text: "😠 솔직한 건 고맙지만 상처는 그대로야", score: 1 },
      { text: "🤔 감정은 어쩔 수 없어. 말해준 게 중요해", score: 2 },
      { text: "😌 사람이니까 설렐 수 있지. 행동만 안 하면 돼", score: 3 }
    ]
  },
  {
    id: 14,
    area: "PAST",
    question: "애인이 전 애인과 \"잘 지내?\" 정도의 안부 연락을 주고받았다면?",
    emoji: "📞",
    choices: [
      { text: "🚨 전 애인과의 연락은 그 자체로 바람이야", score: 0 },
      { text: "😠 안부라도 왜 연락해? 납득 못 해", score: 1 },
      { text: "🤔 딱 그 정도면 굳이 문제 삼지 않을래", score: 2 },
      { text: "😌 헤어진 사이도 사람인데 안부는 물을 수 있지", score: 3 }
    ]
  },
  {
    id: 15,
    area: "ONLINE",
    question: "애인이 이성의 DM에 나 몰래 답장을 계속 하고 있었다면?",
    emoji: "📩",
    choices: [
      { text: "🚨 몰래 주고받은 DM은 명백한 바람이야", score: 0 },
      { text: "😠 내용을 떠나서 숨긴 게 가장 큰 문제야", score: 1 },
      { text: "🤔 내용이 깨끗했다면 오해였다고 볼래", score: 2 },
      { text: "😌 DM 답장까지 허락받아야 해?", score: 3 }
    ]
  }
];

// ============================================
// 영역 정의 (각 3문항 / 만점 9점)
// ============================================

const CHEATLINE_AREAS = {
  CONTACT:  { name: "연락·대화",    emoji: "💬", color: "#E85D75", desc: "톡·전화·말투에서 허용하는 범위" },
  PHYSICAL: { name: "만남·자리",    emoji: "🍻", color: "#E67E22", desc: "단둘이 만나는 자리에 대한 기준" },
  EMOTION:  { name: "감정 교류",    emoji: "💓", color: "#9B59B6", desc: "마음이 오가는 것을 보는 시선" },
  PAST:     { name: "과거·전 애인", emoji: "📇", color: "#3498DB", desc: "지나간 사람에 대한 관용도" },
  ONLINE:   { name: "온라인·SNS",   emoji: "❤️", color: "#16A085", desc: "화면 너머의 관계를 대하는 태도" }
};

// ============================================
// 5단계 기준선 레벨
// ============================================

const CHEATLINE_LEVELS = {
  BORDER: {
    level: 1,
    range: "0~9점",
    emoji: "🚨",
    name: "국경 수비대",
    tagline: "당신의 기준선은 선이 아니라 철조망입니다.",
    color: "#C0392B",
    desc: "당신에게 바람의 기준선은 아주 앞쪽에 그어져 있습니다. 연락 하나, 좋아요 하나도 그냥 넘어가지 않죠. 관계에 대한 기준이 분명하고 스스로도 그 선을 철저히 지키는 사람입니다. 다만 상대가 당신만큼 엄격하지 않다면 같은 상황을 전혀 다른 온도로 받아들일 수 있어요. 기준을 낮추라는 게 아니라, 그 기준을 말로 설명해두는 것이 필요합니다.",
    badge: "🚧 무단 침입 전면 금지"
  },
  FIRM: {
    level: 2,
    range: "10~18점",
    emoji: "📏",
    name: "선 긋기 확실한 사람",
    tagline: "여기까지는 되고, 여기부터는 안 됩니다.",
    color: "#E74C3C",
    desc: "허용선이 또렷하게 그어져 있는 편입니다. 융통성이 아예 없는 건 아니지만 넘으면 안 되는 지점만큼은 확실하죠. 이런 기준은 연애에서 큰 장점입니다. 상대가 예측할 수 있으니까요. 다만 '이 정도는 당연히 알겠지'라고 넘기지 말고, 무엇이 왜 싫은지 한 번은 말해두는 편이 서로 편합니다.",
    badge: "📐 기준선 명확 인증"
  },
  BALANCE: {
    level: 3,
    range: "19~27점",
    emoji: "⚖️",
    name: "상황 판단형",
    tagline: "행동보다 맥락을 봅니다.",
    color: "#F39C12",
    desc: "같은 행동이라도 상황과 의도에 따라 다르게 판단합니다. 미리 말했는지, 숨겼는지, 어떤 사이인지를 종합해서 결론을 내리죠. 가장 균형 잡힌 유형이지만 그만큼 기준이 겉으로 잘 드러나지 않습니다. 상대는 당신이 어디서 화낼지 몰라 헷갈릴 수 있어요. 판단 기준을 한 번쯤 말로 정리해주면 관계가 훨씬 편해집니다.",
    badge: "🧭 맥락 우선 판정관"
  },
  WIDE: {
    level: 4,
    range: "28~36점",
    emoji: "🌊",
    name: "허용선이 넓은 사람",
    tagline: "웬만한 건 그럴 수 있다고 생각합니다.",
    color: "#2E86C1",
    desc: "상대의 사생활과 인간관계를 폭넓게 인정하는 편입니다. 사소한 일로 다투는 걸 싫어하고 웬만한 상황은 믿음으로 넘깁니다. 상대 입장에서는 무척 편한 연인이죠. 다만 참는 것과 괜찮은 것은 다릅니다. 지금 넘긴 일이 정말 괜찮은 건지, 아니면 갈등이 싫어서 넘긴 건지는 가끔 스스로 확인해볼 필요가 있어요.",
    badge: "🌊 넓은 바다형 기준선"
  },
  OPEN: {
    level: 5,
    range: "37~45점",
    emoji: "🕊️",
    name: "선이 보이지 않는 사람",
    tagline: "당신의 기준선은 거의 수평선입니다.",
    color: "#8E44AD",
    desc: "거의 모든 상황을 '그럴 수도 있지'로 받아들입니다. 상대를 강하게 신뢰하거나, 연애에서 소유보다 자유를 훨씬 중요하게 여기는 사람이죠. 문제는 대부분의 사람이 당신만큼 관대하지 않다는 겁니다. 당신에게는 아무것도 아닌 행동이 상대에게는 결정적인 상처가 될 수 있어요. 내 기준이 아니라 상대의 기준선이 어디인지 물어보는 것이 이 유형에게 가장 중요한 일입니다.",
    badge: "🕊️ 국경 없는 연애관"
  }
};

// ============================================
// 채점 함수
// ============================================

function calcCheatLine(answers) {
  const totalScore = answers.reduce((sum, score) => sum + score, 0);
  const maxScore = CHEATLINE_QUESTIONS.length * 3;
  const percentage = Math.round((totalScore / maxScore) * 100);

  // 영역별 집계
  const areaScores = {};
  Object.keys(CHEATLINE_AREAS).forEach(k => { areaScores[k] = { score: 0, max: 0, percentage: 0 }; });
  CHEATLINE_QUESTIONS.forEach((q, i) => {
    const a = areaScores[q.area];
    if (!a) return;
    a.score += (answers[i] ?? 0);
    a.max   += 3;
  });
  Object.values(areaScores).forEach(a => {
    a.percentage = a.max ? Math.round((a.score / a.max) * 100) : 0;
  });

  // 가장 엄격한 영역 / 가장 관대한 영역
  const ordered = Object.entries(areaScores).sort((a, b) => a[1].percentage - b[1].percentage);
  const strictestArea = ordered[0][0];
  const loosestArea   = ordered[ordered.length - 1][0];

  let levelKey;
  if (totalScore <= 9) levelKey = 'BORDER';
  else if (totalScore <= 18) levelKey = 'FIRM';
  else if (totalScore <= 27) levelKey = 'BALANCE';
  else if (totalScore <= 36) levelKey = 'WIDE';
  else levelKey = 'OPEN';

  return {
    totalScore,
    maxScore,
    percentage,
    levelKey,
    levelInfo: CHEATLINE_LEVELS[levelKey],
    areaScores,
    strictestArea,
    loosestArea
  };
}

if (typeof module !== 'undefined') {
  module.exports = { CHEATLINE_QUESTIONS, CHEATLINE_AREAS, CHEATLINE_LEVELS, calcCheatLine };
}
