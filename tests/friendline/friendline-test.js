// ============================================
// 남사친 여사친, 어디까지 친구야?
// ============================================
// 구조: 15문항, 선택지 4개 (0~3점)
// 0점 = 선을 확실히 지킴 (안전)
// 3점 = 애인이 보면 문제가 될 사이 (위험)
// 채점: 점수 합산 → 5단계 관계 등급
// 최대 점수: 45점
// 영역: 연락 / 단둘이 만남 / 거리감 / 숨김 / 감정 (각 3문항)
// ============================================

const FRIENDLINE_QUESTIONS = [
  {
    id: 1,
    area: "CONTACT",
    question: "그 이성 친구와 연락하는 빈도는?",
    emoji: "📱",
    choices: [
      { text: "🟢 용건 있을 때만. 몇 달에 한 번도 있어", score: 0 },
      { text: "🙂 며칠에 한 번 정도 안부 주고받아", score: 1 },
      { text: "🌗 거의 매일 뭐라도 얘기하는 편이야", score: 2 },
      { text: "🔴 하루 종일 톡이 끊긴 적이 없어", score: 3 }
    ]
  },
  {
    id: 2,
    area: "MEET",
    question: "그 친구와 단둘이 만나는 일이 있어?",
    emoji: "🚶",
    choices: [
      { text: "🟢 단둘로는 만나지 않아", score: 0 },
      { text: "🙂 여러 명 모이는 자리에서만 봐", score: 1 },
      { text: "🌗 가끔 둘이서만 밥 먹거나 커피 마셔", score: 2 },
      { text: "🔴 둘이 만나는 게 더 익숙해", score: 3 }
    ]
  },
  {
    id: 3,
    area: "TOUCH",
    question: "그 친구와의 신체 접촉은 어느 정도야?",
    emoji: "🤝",
    choices: [
      { text: "🟢 전혀 없어. 악수도 어색해", score: 0 },
      { text: "🙂 하이파이브나 가벼운 장난 정도", score: 1 },
      { text: "🌗 팔짱이나 어깨동무 정도는 자연스러워", score: 2 },
      { text: "🔴 스킨십에 별로 거리낌이 없어", score: 3 }
    ]
  },
  {
    id: 4,
    area: "SECRET",
    question: "애인은 그 친구의 존재를 알고 있어?",
    emoji: "🗣️",
    choices: [
      { text: "🟢 처음부터 다 말했어. 셋이 본 적도 있어", score: 0 },
      { text: "🙂 물어보길래 있는 그대로 말했어", score: 1 },
      { text: "🌗 굳이 먼저 얘기하진 않았어", score: 2 },
      { text: "🔴 일부러 말 안 하고 있어", score: 3 }
    ]
  },
  {
    id: 5,
    area: "HEART",
    question: "그 친구에게 설렌 적이 있어?",
    emoji: "💗",
    choices: [
      { text: "🟢 단 한 번도 없어. 진짜 친구야", score: 0 },
      { text: "🙂 아주 잠깐 스친 적은 있어", score: 1 },
      { text: "🌗 솔직히 몇 번 있었어", score: 2 },
      { text: "🔴 지금도 가끔 그런 순간이 있어", score: 3 }
    ]
  },
  {
    id: 6,
    area: "CONTACT",
    question: "새벽에 그 친구한테 연락이 온다면?",
    emoji: "🌙",
    choices: [
      { text: "🟢 그럴 일이 없어. 와도 아침에 답해", score: 0 },
      { text: "🙂 급한 일 같으면 받긴 해", score: 1 },
      { text: "🌗 종종 새벽에도 얘기하곤 해", score: 2 },
      { text: "🔴 오히려 새벽 대화가 제일 편해", score: 3 }
    ]
  },
  {
    id: 7,
    area: "MEET",
    question: "그 친구와 단둘이 술을 마신 적은?",
    emoji: "🍺",
    choices: [
      { text: "🟢 없어. 둘이 마실 일은 안 만들어", score: 0 },
      { text: "🙂 여럿이 있는 자리에서만 마셔", score: 1 },
      { text: "🌗 가끔 둘이 한잔한 적 있어", score: 2 },
      { text: "🔴 둘이 새벽까지 마신 적도 있어", score: 3 }
    ]
  },
  {
    id: 8,
    area: "TOUCH",
    question: "그 친구 차나 집에 단둘이 있어본 적은?",
    emoji: "🚗",
    choices: [
      { text: "🟢 그런 상황 자체가 없었어", score: 0 },
      { text: "🙂 다른 사람들이 같이 있을 때만", score: 1 },
      { text: "🌗 단둘이 있어본 적 있어", score: 2 },
      { text: "🔴 꽤 자주 있는 일이야", score: 3 }
    ]
  },
  {
    id: 9,
    area: "SECRET",
    question: "그 친구를 만나러 갈 때 애인에게 어떻게 말해?",
    emoji: "📍",
    choices: [
      { text: "🟢 누구랑 어디서 만나는지 다 말해", score: 0 },
      { text: "🙂 친구 만난다고 대충은 말해", score: 1 },
      { text: "🌗 다른 약속인 것처럼 얼버무려", score: 2 },
      { text: "🔴 아예 말하지 않아", score: 3 }
    ]
  },
  {
    id: 10,
    area: "HEART",
    question: "그 친구에게 애인이 생겼다는 소식을 들으면?",
    emoji: "💌",
    choices: [
      { text: "🟢 진심으로 축하해줘. 궁금하지도 않아", score: 0 },
      { text: "🙂 축하하는데 살짝 허전하긴 해", score: 1 },
      { text: "🌗 생각보다 꽤 서운할 것 같아", score: 2 },
      { text: "🔴 기분이 확 나빠질 것 같아", score: 3 }
    ]
  },
  {
    id: 11,
    area: "CONTACT",
    question: "애인이 그 친구와의 대화방을 그대로 본다면?",
    emoji: "👀",
    choices: [
      { text: "🟢 지금 당장 보여줘도 아무 문제 없어", score: 0 },
      { text: "🙂 대체로 괜찮은데 설명이 좀 필요해", score: 1 },
      { text: "🌗 몇 개는 미리 지우고 싶어", score: 2 },
      { text: "🔴 절대 못 보여줘", score: 3 }
    ]
  },
  {
    id: 12,
    area: "MEET",
    question: "그 친구와 여행이나 1박 일정을 간다면?",
    emoji: "🧳",
    choices: [
      { text: "🟢 상상도 안 해봤어", score: 0 },
      { text: "🙂 여러 명이 함께라면 갈 수도 있어", score: 1 },
      { text: "🌗 둘이라도 갈 수 있다고 생각해", score: 2 },
      { text: "🔴 이미 둘이 다녀온 적 있어", score: 3 }
    ]
  },
  {
    id: 13,
    area: "TOUCH",
    question: "술자리에서 그 친구가 많이 취했다면?",
    emoji: "🌃",
    choices: [
      { text: "🟢 다른 친구한테 부탁하고 나는 빠져", score: 0 },
      { text: "🙂 택시 잡아 태워 보내고 끝", score: 1 },
      { text: "🌗 데려다주다 보면 늦게까지 같이 있게 돼", score: 2 },
      { text: "🔴 취하면 그 친구가 제일 먼저 나를 찾아", score: 3 }
    ]
  },
  {
    id: 14,
    area: "SECRET",
    question: "애인이 그 친구와 연락을 줄여달라고 한다면?",
    emoji: "⚖️",
    choices: [
      { text: "🟢 애인이 불편하다면 당연히 줄여", score: 0 },
      { text: "🙂 왜 그런지 얘기해보고 조율할래", score: 1 },
      { text: "🌗 알겠다고 해놓고 계속 연락할 것 같아", score: 2 },
      { text: "🔴 그건 내 인간관계야. 간섭이라고 생각해", score: 3 }
    ]
  },
  {
    id: 15,
    area: "HEART",
    question: "만약 지금 애인이 없다면, 그 친구와는?",
    emoji: "🕯️",
    choices: [
      { text: "🟢 그래도 그냥 친구야. 확실해", score: 0 },
      { text: "🙂 잘 모르겠어. 생각해본 적 없어", score: 1 },
      { text: "🌗 어쩌면 사귀게 될 수도 있을 것 같아", score: 2 },
      { text: "🔴 아마 진작에 사귀었을 거야", score: 3 }
    ]
  }
];

// ============================================
// 영역 정의 (각 3문항 / 만점 9점)
// ============================================

const FRIENDLINE_AREAS = {
  CONTACT: { name: "연락",       emoji: "📱", color: "#E85D75", desc: "얼마나 자주, 어떤 시간에 붙어 있는지" },
  MEET:    { name: "단둘이 만남", emoji: "🚶", color: "#E67E22", desc: "둘만 있는 자리를 만드는 정도" },
  TOUCH:   { name: "거리감",     emoji: "🤝", color: "#9B59B6", desc: "물리적 거리와 상황의 사적인 정도" },
  SECRET:  { name: "숨김",       emoji: "🗣️", color: "#3498DB", desc: "애인에게 공개하는 투명도" },
  HEART:   { name: "감정",       emoji: "💗", color: "#16A085", desc: "친구 이상의 마음이 있는지" }
};

// ============================================
// 5단계 관계 등급
// ============================================

const FRIENDLINE_LEVELS = {
  CLEAR: {
    level: 1,
    range: "0~9점",
    emoji: "🤝",
    name: "진짜 그냥 친구",
    tagline: "애인이 봐도 아무 문제 없습니다.",
    color: "#2ECC71",
    verdict: "무죄",
    desc: "누가 봐도 깔끔한 이성 친구 관계입니다. 연락도 만남도 적당한 선에서 유지되고, 애인에게 숨길 것도 없죠. 이 정도면 '이성 친구'라는 단어를 붙이는 것 자체가 어색할 만큼 담백한 사이입니다. 애인이 대화방을 통째로 봐도 설명할 게 없는 관계, 사실 이게 가장 오래가는 친구 관계이기도 합니다.",
    badge: "✅ 애인 검증 통과"
  },
  SAFE: {
    level: 2,
    range: "10~18점",
    emoji: "🙂",
    name: "선은 지키는 사이",
    tagline: "가깝지만 넘지는 않습니다.",
    color: "#16A085",
    verdict: "무죄",
    desc: "꽤 친하긴 하지만 넘으면 안 되는 지점은 확실히 알고 있는 관계입니다. 가끔 연락하고 여럿이 모여 놀지만, 둘만의 상황은 만들지 않죠. 애인이 조금 신경 쓸 수는 있어도 설명하면 납득할 수 있는 수준입니다. 지금처럼만 유지하면 문제 될 일은 거의 없습니다. 다만 지금의 균형은 당신이 의식하고 지켜서 유지되는 겁니다. 방심하는 순간 한 칸씩 밀립니다.",
    badge: "🙂 안전 거리 유지 중"
  },
  GRAY: {
    level: 3,
    range: "19~27점",
    emoji: "🌗",
    name: "회색지대",
    tagline: "친구라기엔 조금, 썸이라기엔 애매한.",
    color: "#F39C12",
    verdict: "의심",
    desc: "가장 애매한 구간에 있습니다. 당신은 친구라고 생각하지만 객관적으로 보면 설명이 필요한 장면이 몇 개 있죠. 단둘이 만나거나, 새벽에 연락하거나, 애인에게 굳이 말하지 않은 부분이 쌓여 있습니다. 이런 관계는 대개 그대로 멈추지 않습니다. 시간이 지나면 정리되거나, 아니면 선을 넘거나 둘 중 하나로 흘러가요. 지금 어느 쪽으로 가고 있는지는 당신이 제일 잘 알고 있을 겁니다.",
    badge: "🌗 판정 보류 구역"
  },
  RISK: {
    level: 4,
    range: "28~36점",
    emoji: "⚠️",
    name: "애인이 보면 화날 사이",
    tagline: "이건 설명으로 넘어가기 어렵습니다.",
    color: "#E67E22",
    verdict: "유죄",
    desc: "당신은 친구라고 주장하겠지만, 애인 입장에서 이 관계를 그대로 보면 대화가 길어질 수밖에 없습니다. 연락의 밀도, 둘만의 자리, 숨긴 것들이 이미 친구의 범위를 넘어서 있어요. 문제는 상대(그 친구)도 같은 온도인지 모른다는 겁니다. 지금 상태를 유지하려면 최소한 애인에게 공개할 수 있는 수준으로는 정리해야 합니다. 숨기고 있다는 사실 자체가 이미 답이거든요.",
    badge: "⚠️ 관계 재점검 필요"
  },
  ALMOST: {
    level: 5,
    range: "37~45점",
    emoji: "💥",
    name: "친구라고 부르기 어려운 사이",
    tagline: "그 관계, 이름을 바꿔야 할 것 같습니다.",
    color: "#C0392B",
    verdict: "유죄",
    desc: "솔직해질 시간입니다. 연락도 만남도 감정도 전부 친구의 선을 넘어 있고, 애인에게는 대부분을 숨기고 있죠. 이건 이성 친구 문제가 아니라 관계 정리의 문제입니다. 지금의 애인에게 미안하지 않으려면, 그리고 그 친구에게 애매하게 굴지 않으려면, 어느 쪽이든 명확하게 정해야 합니다. 가장 나쁜 건 지금처럼 둘 다 쥐고 있는 상태예요.",
    badge: "💥 관계 정의 재설정 요망"
  }
};

// ============================================
// 채점 함수
// ============================================

function calcFriendLine(answers) {
  const totalScore = answers.reduce((sum, score) => sum + score, 0);
  const maxScore = FRIENDLINE_QUESTIONS.length * 3;
  const percentage = Math.round((totalScore / maxScore) * 100);

  // 영역별 집계
  const areaScores = {};
  Object.keys(FRIENDLINE_AREAS).forEach(k => { areaScores[k] = { score: 0, max: 0, percentage: 0 }; });
  FRIENDLINE_QUESTIONS.forEach((q, i) => {
    const a = areaScores[q.area];
    if (!a) return;
    a.score += (answers[i] ?? 0);
    a.max   += 3;
  });
  Object.values(areaScores).forEach(a => {
    a.percentage = a.max ? Math.round((a.score / a.max) * 100) : 0;
  });

  // 가장 안전한 영역 / 가장 위험한 영역
  const ordered = Object.entries(areaScores).sort((a, b) => a[1].percentage - b[1].percentage);
  const safestArea  = ordered[0][0];
  const riskiestArea = ordered[ordered.length - 1][0];

  let levelKey;
  if (totalScore <= 9) levelKey = 'CLEAR';
  else if (totalScore <= 18) levelKey = 'SAFE';
  else if (totalScore <= 27) levelKey = 'GRAY';
  else if (totalScore <= 36) levelKey = 'RISK';
  else levelKey = 'ALMOST';

  return {
    totalScore,
    maxScore,
    percentage,
    levelKey,
    levelInfo: FRIENDLINE_LEVELS[levelKey],
    verdict: FRIENDLINE_LEVELS[levelKey].verdict,
    areaScores,
    safestArea,
    riskiestArea
  };
}

if (typeof module !== 'undefined') {
  module.exports = { FRIENDLINE_QUESTIONS, FRIENDLINE_AREAS, FRIENDLINE_LEVELS, calcFriendLine };
}
