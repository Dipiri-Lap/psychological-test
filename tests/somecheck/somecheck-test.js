// ============================================
// 이거 썸이야, 아니야? 썸 판독기
// ============================================
// 구조: 15문항, 선택지 4개 (0~3점)
// 0점 = 아무 신호 없음
// 3점 = 강한 신호
// 채점: 점수 합산 → 로지스틱 곡선으로 '썸 확률 %' 환산 → 5단계
// 최대 점수: 45점
// 영역: 반응 / 관심 / 거리 / 시간 / 직접신호 (각 3문항)
// ============================================

const SOME_QUESTIONS = [
  {
    id: 1,
    area: "REACT",
    question: "내가 톡을 보내면 답장이 오는 속도는?",
    emoji: "💬",
    choices: [
      { text: "🧊 몇 시간, 길면 다음 날에나 와", score: 0 },
      { text: "🌱 생각났을 때 띄엄띄엄 와", score: 1 },
      { text: "🔥 대체로 빠른 편이야", score: 2 },
      { text: "💘 거의 항상 바로 와. 읽씹이 없어", score: 3 }
    ]
  },
  {
    id: 2,
    area: "NOTICE",
    question: "내가 지나가듯 한 말을 상대가 기억하고 있어?",
    emoji: "🧠",
    choices: [
      { text: "🧊 전혀. 같은 얘기를 또 해야 해", score: 0 },
      { text: "🌱 가끔 기억할 때도 있어", score: 1 },
      { text: "🔥 꽤 자주 기억하고 있어", score: 2 },
      { text: "💘 나도 잊은 걸 기억해서 놀랄 때가 있어", score: 3 }
    ]
  },
  {
    id: 3,
    area: "DISTANCE",
    question: "만났을 때 둘 사이의 물리적 거리는?",
    emoji: "📏",
    choices: [
      { text: "🧊 늘 한 사람 들어갈 만큼 떨어져 있어", score: 0 },
      { text: "🌱 딱 보통의 친구 사이 정도", score: 1 },
      { text: "🔥 은근히 가까이 앉는 편이야", score: 2 },
      { text: "💘 자연스럽게 붙어 앉게 돼", score: 3 }
    ]
  },
  {
    id: 4,
    area: "TIME",
    question: "둘이서만 만난 적이 있어?",
    emoji: "🚶",
    choices: [
      { text: "🧊 없어. 항상 여러 명이서 봐", score: 0 },
      { text: "🌱 어쩌다 한 번 그렇게 된 적 있어", score: 1 },
      { text: "🔥 몇 번 둘이서 만났어", score: 2 },
      { text: "💘 자주 만나고, 대체로 상대가 먼저 제안해", score: 3 }
    ]
  },
  {
    id: 5,
    area: "SIGNAL",
    question: "상대가 내 연애 상태를 물어본 적 있어?",
    emoji: "❓",
    choices: [
      { text: "🧊 한 번도 없어", score: 0 },
      { text: "🌱 지나가듯 한 번 물어본 정도", score: 1 },
      { text: "🔥 몇 번 물어봤어", score: 2 },
      { text: "💘 이상형까지 구체적으로 캐물어", score: 3 }
    ]
  },
  {
    id: 6,
    area: "REACT",
    question: "대화가 끊길 것 같을 때 상대는?",
    emoji: "🔄",
    choices: [
      { text: "🧊 그대로 대화가 끝나", score: 0 },
      { text: "🌱 가끔 다시 이어가기도 해", score: 1 },
      { text: "🔥 새로운 얘깃거리를 꺼내와", score: 2 },
      { text: "💘 어떻게든 대화를 안 끝내려고 해", score: 3 }
    ]
  },
  {
    id: 7,
    area: "NOTICE",
    question: "내 SNS나 프로필에 대한 상대의 반응은?",
    emoji: "📸",
    choices: [
      { text: "🧊 아무 반응 없어", score: 0 },
      { text: "🌱 가끔 좋아요 정도는 눌러", score: 1 },
      { text: "🔥 거의 다 보고 반응해", score: 2 },
      { text: "💘 올리자마자 확인한 티가 나", score: 3 }
    ]
  },
  {
    id: 8,
    area: "DISTANCE",
    question: "가벼운 스킨십(장난치기, 툭 치기 등)은?",
    emoji: "✋",
    choices: [
      { text: "🧊 전혀 없어", score: 0 },
      { text: "🌱 어쩌다 한 번 있을까 말까", score: 1 },
      { text: "🔥 종종 있는 편이야", score: 2 },
      { text: "💘 꽤 자연스럽고 자주 있어", score: 3 }
    ]
  },
  {
    id: 9,
    area: "TIME",
    question: "상대가 약속을 잡는 방식은?",
    emoji: "📅",
    choices: [
      { text: "🧊 먼저 잡은 적이 없어", score: 0 },
      { text: "🌱 여럿이 모일 때만 부르는 정도", score: 1 },
      { text: "🔥 가끔 둘이 보자고 해", score: 2 },
      { text: "💘 날짜랑 장소까지 정해서 먼저 제안해", score: 3 }
    ]
  },
  {
    id: 10,
    area: "SIGNAL",
    question: "내가 다른 이성 얘기를 꺼내면 상대는?",
    emoji: "🫢",
    choices: [
      { text: "🧊 별 관심 없어 보여", score: 0 },
      { text: "🌱 그냥 무난하게 들어줘", score: 1 },
      { text: "🔥 은근히 꼬치꼬치 물어봐", score: 2 },
      { text: "💘 표정이 변하거나 슬쩍 화제를 돌려", score: 3 }
    ]
  },
  {
    id: 11,
    area: "REACT",
    question: "먼저 연락하는 쪽은 주로 누구야?",
    emoji: "📲",
    choices: [
      { text: "🧊 거의 항상 나야", score: 0 },
      { text: "🌱 내가 좀 더 많이 하는 편", score: 1 },
      { text: "🔥 반반 정도로 비슷해", score: 2 },
      { text: "💘 상대가 먼저 하는 경우가 더 많아", score: 3 }
    ]
  },
  {
    id: 12,
    area: "NOTICE",
    question: "머리를 자르거나 옷 스타일이 바뀌었을 때 상대는?",
    emoji: "💇",
    choices: [
      { text: "🧊 전혀 모르더라", score: 0 },
      { text: "🌱 말해주면 그제서야 알아", score: 1 },
      { text: "🔥 가끔 알아채고 한마디 해", score: 2 },
      { text: "💘 바로 알아보고 먼저 얘기해줘", score: 3 }
    ]
  },
  {
    id: 13,
    area: "DISTANCE",
    question: "눈이 마주치는 빈도는?",
    emoji: "👀",
    choices: [
      { text: "🧊 거의 마주칠 일이 없어", score: 0 },
      { text: "🌱 대화할 때만 자연스럽게", score: 1 },
      { text: "🔥 대화 중이 아닐 때도 종종 마주쳐", score: 2 },
      { text: "💘 마주치면 서로 피하거나 괜히 웃게 돼", score: 3 }
    ]
  },
  {
    id: 14,
    area: "TIME",
    question: "만나면 헤어지는 시간은 어때?",
    emoji: "🕙",
    choices: [
      { text: "🧊 예정대로 딱 끝나", score: 0 },
      { text: "🌱 가끔 조금 늘어지긴 해", score: 1 },
      { text: "🔥 자주 예상보다 길어져", score: 2 },
      { text: "💘 늘 \"조금만 더\"가 반복돼", score: 3 }
    ]
  },
  {
    id: 15,
    area: "SIGNAL",
    question: "상대가 \"우리\", \"다음에 같이\" 같은 말을 쓰는 편이야?",
    emoji: "🫶",
    choices: [
      { text: "🧊 그런 말은 들어본 적 없어", score: 0 },
      { text: "🌱 아주 가끔 나오는 정도", score: 1 },
      { text: "🔥 꽤 자주 그렇게 말해", score: 2 },
      { text: "💘 이미 다음에 뭐 하자는 약속이 잡혀 있어", score: 3 }
    ]
  }
];

// ============================================
// 영역 정의 (각 3문항 / 만점 9점)
// ============================================

const SOME_AREAS = {
  REACT:    { name: "반응 속도", emoji: "💬", color: "#E85D75", desc: "연락에 얼마나 빠르고 적극적인가" },
  NOTICE:   { name: "관심도",   emoji: "🧠", color: "#E67E22", desc: "나를 얼마나 기억하고 살피는가" },
  DISTANCE: { name: "거리감",   emoji: "📏", color: "#9B59B6", desc: "물리적으로 얼마나 가까운가" },
  TIME:     { name: "시간 투자", emoji: "📅", color: "#3498DB", desc: "둘만의 시간을 만들려 하는가" },
  SIGNAL:   { name: "직접 신호", emoji: "🫶", color: "#16A085", desc: "대놓고 드러나는 호감의 단서" }
};

// ============================================
// 5단계 판정
// ============================================

const SOME_LEVELS = {
  NONE: {
    level: 1,
    range: "0~9점",
    emoji: "🧊",
    name: "그냥 아는 사람",
    tagline: "아쉽지만 아직 아무 일도 일어나지 않았습니다.",
    color: "#7F8C8D",
    light: "RED",
    action: "지금은 기다릴 때",
    advice: "고백은 아직 이릅니다. 지금 필요한 건 신호가 아니라 접점이에요. 자연스럽게 마주칠 일을 늘리는 것부터 시작하세요.",
    desc: "신호로 볼 만한 단서가 거의 없습니다. 상대의 행동은 호감이라기보다 기본적인 예의에 가까워요. 실망스러울 수 있지만 이 결과의 좋은 점은 분명합니다. 아직 아무것도 시작되지 않았다는 건, 아직 아무것도 망치지 않았다는 뜻이기도 하니까요.",
    badge: "🧊 신호 미검출"
  },
  MAYBE: {
    level: 2,
    range: "10~18점",
    emoji: "🌱",
    name: "아직은 친절함의 영역",
    tagline: "호감인지 성격인지 구분이 안 됩니다.",
    color: "#16A085",
    light: "YELLOW",
    action: "가볍게 떠볼 때",
    advice: "상대가 원래 다정한 사람인지부터 확인하세요. 다른 사람에게도 똑같이 대하는지 보면 답이 나옵니다. 그다음 가벼운 둘만의 약속을 한 번 던져보세요.",
    desc: "약한 신호가 잡히긴 하지만, 그게 나에게만 해당하는 건지 원래 성격인지 구분이 안 되는 단계입니다. 이 구간에서 가장 흔한 실수가 혼자 확신하고 속도를 올리는 것입니다. 지금은 확인이 먼저예요.",
    badge: "🌱 판별 불가 구간"
  },
  LIKELY: {
    level: 3,
    range: "19~27점",
    emoji: "🔥",
    name: "썸 초입",
    tagline: "혼자만의 착각은 아닙니다.",
    color: "#F39C12",
    light: "YELLOW",
    action: "한 발 다가갈 때",
    advice: "신호는 충분히 나왔습니다. 이제 둘만의 약속을 먼저 제안해보세요. 상대가 어떻게 반응하는지가 다음 단계의 답이 됩니다.",
    desc: "우연으로 보기엔 겹치는 신호가 꽤 많습니다. 최소한 상대도 당신을 특별하게 인식하고 있다는 뜻이에요. 다만 이 구간은 오래 머물면 애매해집니다. 썸의 유통기한은 생각보다 짧아서, 누군가 한 명은 움직여야 다음으로 갑니다.",
    badge: "🔥 상호 인식 확인"
  },
  STRONG: {
    level: 4,
    range: "28~36점",
    emoji: "💘",
    name: "거의 확실한 썸",
    tagline: "둘 다 알면서 말을 안 하고 있습니다.",
    color: "#E85D75",
    light: "GREEN",
    action: "이제 말할 때",
    advice: "더 기다린다고 신호가 더 강해지진 않습니다. 이 단계에서 필요한 건 확신이 아니라 타이밍이에요. 다음 만남에서 분위기가 좋을 때 말해보세요.",
    desc: "객관적으로 봐도 명백한 호감 신호입니다. 사실 당신도 이미 알고 있었을 거예요. 이 테스트를 한 이유는 몰라서가 아니라 확인받고 싶어서였겠죠. 이 구간에서 관계가 틀어지는 가장 흔한 이유는 거절이 아니라 망설임입니다.",
    badge: "💘 쌍방 신호 확인"
  },
  ALMOST: {
    level: 5,
    range: "37~45점",
    emoji: "💍",
    name: "고백만 남았다",
    tagline: "사실상 사귀는 것만 빼고 다 하고 있습니다.",
    color: "#C0392B",
    light: "GREEN",
    action: "지금 바로",
    advice: "더 볼 것도 없습니다. 말만 하면 됩니다. 늦어질수록 상대도 지치거나 다른 사람이 먼저 말할 수 있어요.",
    desc: "연락, 만남, 거리, 신호까지 거의 모든 항목이 최대치입니다. 이 정도면 주변에서도 이미 사귀는 줄 알고 있을 가능성이 높아요. 지금 두 사람 사이에 없는 건 마음이 아니라 문장 하나뿐입니다.",
    badge: "💍 고백 대기 상태"
  }
};

const SOME_LIGHTS = {
  RED:    { emoji: "🔴", label: "STOP",   text: "기다려" },
  YELLOW: { emoji: "🟡", label: "READY",  text: "떠봐" },
  GREEN:  { emoji: "🟢", label: "GO",     text: "고백해" }
};

// ============================================
// 채점 함수
// ============================================

// 총점 비율 → 썸 확률 (로지스틱 곡선)
// 0% → 약 3%, 50% → 50%, 100% → 약 97%
function toProbability(percentage) {
  const p = 100 / (1 + Math.exp(-(percentage - 50) / 14));
  return Math.max(1, Math.min(99, Math.round(p)));
}

function calcSome(answers) {
  const totalScore = answers.reduce((sum, score) => sum + score, 0);
  const maxScore = SOME_QUESTIONS.length * 3;
  const percentage = Math.round((totalScore / maxScore) * 100);
  const probability = toProbability(percentage);

  // 영역별 집계
  const areaScores = {};
  Object.keys(SOME_AREAS).forEach(k => { areaScores[k] = { score: 0, max: 0, percentage: 0 }; });
  SOME_QUESTIONS.forEach((q, i) => {
    const a = areaScores[q.area];
    if (!a) return;
    a.score += (answers[i] ?? 0);
    a.max   += 3;
  });
  Object.values(areaScores).forEach(a => {
    a.percentage = a.max ? Math.round((a.score / a.max) * 100) : 0;
  });

  // 가장 약한 신호 / 가장 강한 신호
  const ordered = Object.entries(areaScores).sort((a, b) => a[1].percentage - b[1].percentage);
  const weakestArea  = ordered[0][0];
  const strongestArea = ordered[ordered.length - 1][0];

  let levelKey;
  if (totalScore <= 9) levelKey = 'NONE';
  else if (totalScore <= 18) levelKey = 'MAYBE';
  else if (totalScore <= 27) levelKey = 'LIKELY';
  else if (totalScore <= 36) levelKey = 'STRONG';
  else levelKey = 'ALMOST';

  const info = SOME_LEVELS[levelKey];

  return {
    totalScore,
    maxScore,
    percentage,
    probability,
    levelKey,
    levelInfo: info,
    light: SOME_LIGHTS[info.light],
    action: info.action,
    advice: info.advice,
    areaScores,
    weakestArea,
    strongestArea
  };
}

if (typeof module !== 'undefined') {
  module.exports = { SOME_QUESTIONS, SOME_AREAS, SOME_LEVELS, SOME_LIGHTS, calcSome, toProbability };
}
