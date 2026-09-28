// ============================================
// 우리 다시 만날 수 있을까? 재회 가능성 테스트
// ============================================
// 구조: 15문항, 선택지 4개 (0~3점)
// 0점 = 재회 가능성 낮은 신호
// 3점 = 재회 가능성 높은 신호
// 채점: 점수 합산 → 로지스틱 곡선으로 '재회 확률 %' 환산 → 5단계
// 최대 점수: 45점
// 영역: 이별 사유 / 연락 패턴 / 미련 / 감정 정리 / 주변 상황 (각 3문항)
// ============================================

const REUNION_QUESTIONS = [
  {
    id: 1,
    area: "CAUSE",
    question: "헤어진 결정적인 이유는 뭐였어?",
    emoji: "💔",
    choices: [
      { text: "🧊 거짓말, 바람, 신뢰가 완전히 깨진 일", score: 0 },
      { text: "🌫️ 성격 차이나 반복된 다툼", score: 1 },
      { text: "🌤️ 거리, 타이밍 같은 외부 상황 때문", score: 2 },
      { text: "💘 사소한 오해나 감정적인 다툼 끝에 홧김에", score: 3 }
    ]
  },
  {
    id: 2,
    area: "CONTACT",
    question: "헤어진 뒤 연락은 어떻게 하고 있어?",
    emoji: "📱",
    choices: [
      { text: "🧊 서로 차단했거나 완전히 끊겼어", score: 0 },
      { text: "🌫️ SNS만 가끔 몰래 보는 정도", score: 1 },
      { text: "🌤️ 가끔 안부 연락은 주고받아", score: 2 },
      { text: "💘 여전히 거의 매일 연락하고 있어", score: 3 }
    ]
  },
  {
    id: 3,
    area: "LONGING",
    question: "상대도 나를 그리워하는 것 같아?",
    emoji: "🥺",
    choices: [
      { text: "🧊 전혀. 이미 정리한 것 같아", score: 0 },
      { text: "🌫️ 잘 모르겠어. 티가 안 나", score: 1 },
      { text: "🌤️ 은근히 신경 쓰는 티가 나", score: 2 },
      { text: "💘 상대도 미련이 남았다는 걸 느껴", score: 3 }
    ]
  },
  {
    id: 4,
    area: "CLOSURE",
    question: "나는 지금 이 이별을 얼마나 받아들였어?",
    emoji: "🌧️",
    choices: [
      { text: "🧊 이미 다 정리했어. 그냥 지난 일이야", score: 0 },
      { text: "🌫️ 받아들이려 노력은 하고 있어", score: 1 },
      { text: "🌤️ 아직 마음 정리가 잘 안 돼", score: 2 },
      { text: "💘 헤어졌다는 게 실감이 안 나", score: 3 }
    ]
  },
  {
    id: 5,
    area: "EXTERNAL",
    question: "상대 주변에 새로운 사람이 생겼어?",
    emoji: "👀",
    choices: [
      { text: "🧊 이미 새로운 사람을 만나고 있어", score: 0 },
      { text: "🌫️ 그런 낌새가 좀 보여", score: 1 },
      { text: "🌤️ 딱히 그런 건 없어 보여", score: 2 },
      { text: "💘 오히려 혼자 지내면서 나를 신경 쓰는 것 같아", score: 3 }
    ]
  },
  {
    id: 6,
    area: "CAUSE",
    question: "헤어질 때 상대의 태도는 어땠어?",
    emoji: "🚪",
    choices: [
      { text: "🧊 \"다시는 연락하지 마\"라고 확실히 선을 그었어", score: 0 },
      { text: "🌫️ 지쳐서 그냥 조용히 끝냈어", score: 1 },
      { text: "🌤️ 서로 울면서 아쉬워하며 헤어졌어", score: 2 },
      { text: "💘 \"시간을 좀 갖자\"는 식으로 여지를 남겼어", score: 3 }
    ]
  },
  {
    id: 7,
    area: "CONTACT",
    question: "먼저 연락했을 때 상대의 반응은?",
    emoji: "💬",
    choices: [
      { text: "🧊 아예 답이 없거나 차갑게 끊어", score: 0 },
      { text: "🌫️ 형식적으로 짧게만 답해", score: 1 },
      { text: "🌤️ 예전처럼 편하게 대화가 이어져", score: 2 },
      { text: "💘 먼저 연락이 오기도 해", score: 3 }
    ]
  },
  {
    id: 8,
    area: "LONGING",
    question: "상대가 내 SNS나 소식을 챙겨보는 것 같아?",
    emoji: "📸",
    choices: [
      { text: "🧊 완전히 무관심해 보여", score: 0 },
      { text: "🌫️ 가끔 좋아요 정도는 눌러", score: 1 },
      { text: "🌤️ 올릴 때마다 바로 반응해줘", score: 2 },
      { text: "💘 주변 사람 통해 내 소식을 묻고 다녀", score: 3 }
    ]
  },
  {
    id: 9,
    area: "CLOSURE",
    question: "다른 사람을 만날 마음의 준비가 됐어?",
    emoji: "🚫",
    choices: [
      { text: "🧊 이미 새로운 사람에게 관심이 가", score: 0 },
      { text: "🌫️ 언젠가는 가능할 것 같아", score: 1 },
      { text: "🌤️ 아직은 다른 사람이 눈에 안 들어와", score: 2 },
      { text: "💘 그 사람 아니면 안 될 것 같아", score: 3 }
    ]
  },
  {
    id: 10,
    area: "EXTERNAL",
    question: "주변 친구들은 재회를 어떻게 봐?",
    emoji: "🗣️",
    choices: [
      { text: "🧊 절대 다시 만나지 말라고 뜯어말려", score: 0 },
      { text: "🌫️ 신중하게 생각해보라고 해", score: 1 },
      { text: "🌤️ 딱히 반대하지 않아", score: 2 },
      { text: "💘 둘이 다시 만나면 좋겠다고 해", score: 3 }
    ]
  },
  {
    id: 11,
    area: "CAUSE",
    question: "헤어진 문제가 지금은 해결될 수 있는 문제야?",
    emoji: "🔧",
    choices: [
      { text: "🧊 절대 바뀌지 않을 가치관 문제였어", score: 0 },
      { text: "🌫️ 둘 다 많이 노력해야 하는 문제였어", score: 1 },
      { text: "🌤️ 대화로 충분히 풀 수 있는 문제였어", score: 2 },
      { text: "💘 사실 별거 아닌 일로 헤어졌어", score: 3 }
    ]
  },
  {
    id: 12,
    area: "CONTACT",
    question: "우연히 마주친다면 어떤 분위기일 것 같아?",
    emoji: "🚶",
    choices: [
      { text: "🧊 서로 피하거나 어색하게 지나칠 것 같아", score: 0 },
      { text: "🌫️ 간단히 인사만 하고 끝날 것 같아", score: 1 },
      { text: "🌤️ 자연스럽게 안부를 묻게 될 것 같아", score: 2 },
      { text: "💘 예전처럼 편하게 얘기하게 될 것 같아", score: 3 }
    ]
  },
  {
    id: 13,
    area: "LONGING",
    question: "상대가 우리 추억이 담긴 걸 아직 갖고 있을까?",
    emoji: "📷",
    choices: [
      { text: "🧊 사진도 선물도 다 지웠을 것 같아", score: 0 },
      { text: "🌫️ 잘 모르겠어", score: 1 },
      { text: "🌤️ 아직 간직하고 있을 것 같아", score: 2 },
      { text: "💘 SNS에 우리 추억을 아직 남겨뒀어", score: 3 }
    ]
  },
  {
    id: 14,
    area: "CLOSURE",
    question: "그 사람 생각이 나는 빈도는?",
    emoji: "🌙",
    choices: [
      { text: "🧊 이제 거의 생각 안 나", score: 0 },
      { text: "🌫️ 가끔 문득 떠오르는 정도", score: 1 },
      { text: "🌤️ 하루에도 몇 번씩 생각나", score: 2 },
      { text: "💘 잠들기 전마다 그 사람 생각을 해", score: 3 }
    ]
  },
  {
    id: 15,
    area: "EXTERNAL",
    question: "지금 재회를 시도한다면 성공 가능성은 스스로 어떻게 봐?",
    emoji: "🎯",
    choices: [
      { text: "🧊 시도해봤자 소용없을 것 같아", score: 0 },
      { text: "🌫️ 반반이라고 생각해", score: 1 },
      { text: "🌤️ 시도해볼 만한 것 같아", score: 2 },
      { text: "💘 지금이 딱 적기라고 느껴져", score: 3 }
    ]
  }
];

// ============================================
// 영역 정의 (각 3문항 / 만점 9점)
// ============================================

const REUNION_AREAS = {
  CAUSE:    { name: "이별 사유",  emoji: "💔", color: "#E85D75", desc: "헤어진 이유가 얼마나 되돌릴 수 있는 문제인가" },
  CONTACT:  { name: "연락 패턴",  emoji: "📱", color: "#E67E22", desc: "지금 서로 어떻게 연결되어 있는가" },
  LONGING:  { name: "미련",      emoji: "🥺", color: "#9B59B6", desc: "상대도 나를 그리워하고 있는가" },
  CLOSURE:  { name: "감정 정리",  emoji: "🌧️", color: "#3498DB", desc: "내 마음이 아직 그 사람에게 있는가" },
  EXTERNAL: { name: "주변 상황",  emoji: "🎯", color: "#16A085", desc: "재회를 가로막거나 도와주는 외부 요인" }
};

// ============================================
// 5단계 판정
// ============================================

const REUNION_LEVELS = {
  NONE: {
    level: 1,
    range: "0~9점",
    emoji: "🧊",
    name: "완전히 끝났다",
    tagline: "이건 재회가 아니라 미련의 문제입니다.",
    color: "#7F8C8D",
    light: "RED",
    action: "연락하지 말 것",
    advice: "지금 연락하면 상대에게도, 나에게도 상처만 남습니다. 재회를 바라기 전에 먼저 이 이별을 받아들이는 시간이 필요해요. 그게 결국 당신을 더 빨리 회복시킵니다.",
    desc: "신호로 볼 만한 건 거의 없습니다. 이별의 이유도, 상대의 태도도, 지금의 거리도 전부 '끝'을 가리키고 있어요. 받아들이기 힘들겠지만, 이 결과가 알려주는 건 하나입니다. 지금 당신에게 필요한 건 재회 방법이 아니라 이별을 완성하는 시간입니다.",
    badge: "🧊 재회 신호 미검출"
  },
  MAYBE: {
    level: 2,
    range: "10~18점",
    emoji: "🌫️",
    name: "가능성은 낮지만",
    tagline: "완전히 닫힌 문은 아니지만, 열려 있지도 않습니다.",
    color: "#7F8C8D",
    light: "RED",
    action: "지금은 거리를 둘 것",
    advice: "섣부른 연락은 오히려 남은 가능성마저 닫아버릴 수 있습니다. 지금은 아무것도 하지 않는 게 최선의 전략이에요. 시간이 상대의 감정을 정리해줄 때까지 기다리세요.",
    desc: "약한 신호가 있긴 하지만, 그것만으로 재회를 준비하기엔 이릅니다. 이 구간에서 가장 흔한 실수는 조급함입니다. 아직 상대의 감정이 정리되지 않았을 가능성이 높고, 지금 다가가면 부담만 줄 수 있어요. 조용히 각자의 시간을 갖는 것이 오히려 가능성을 지키는 방법입니다.",
    badge: "🌫️ 판별 불가 구간"
  },
  LIKELY: {
    level: 3,
    range: "19~27점",
    emoji: "🌤️",
    name: "반반이다",
    tagline: "당신의 태도에 따라 결과가 갈립니다.",
    color: "#F39C12",
    light: "YELLOW",
    action: "가볍게 연락을 시도해볼 때",
    advice: "무겁게 다가가지 말고, 부담 없는 안부 연락부터 시작해보세요. 상대의 반응 온도를 보고 다음을 정하면 됩니다. 지금은 확신보다 확인이 필요한 시기예요.",
    desc: "우연으로 보기엔 긍정적인 신호가 꽤 있습니다. 다만 이별의 이유가 완전히 해소된 건 아니라서, 같은 문제로 다시 부딪힐 위험도 함께 갖고 있어요. 이 구간은 감정보다 방식이 중요합니다. 어떻게 다가가느냐에 따라 결과가 크게 달라질 수 있습니다.",
    badge: "🌤️ 절반의 가능성"
  },
  STRONG: {
    level: 4,
    range: "28~36점",
    emoji: "💘",
    name: "가능성 꽤 높다",
    tagline: "상대도 이미 마음의 문을 열어두고 있습니다.",
    color: "#E85D75",
    light: "GREEN",
    action: "진심을 전할 때",
    advice: "이제 눈치를 보기보다 솔직하게 마음을 전하는 게 맞습니다. 다만 예전과 똑같은 방식으로 다가가면 같은 이유로 다시 어긋날 수 있어요. 무엇이 달라졌는지도 함께 이야기하세요.",
    desc: "객관적으로 봐도 명백한 재회 신호입니다. 여전히 연락이 이어지고, 상대도 그리움을 숨기지 못하고 있어요. 문제는 타이밍과 방식입니다. 헤어진 이유를 짚지 않고 그냥 되돌아가려 하면 똑같은 자리에서 또 헤어질 수 있어요. 이번엔 대화로 그 지점부터 풀어야 합니다.",
    badge: "💘 쌍방 신호 확인"
  },
  ALMOST: {
    level: 5,
    range: "37~45점",
    emoji: "🕊️",
    name: "시간문제다",
    tagline: "사실상 둘 다 다시 시작할 준비가 되어 있습니다.",
    color: "#C0392B",
    light: "GREEN",
    action: "지금 바로 마음을 전할 것",
    advice: "더 미룰 이유가 없습니다. 서로 미련이 있다는 걸 알면서도 가만히 있는 게 가장 손해예요. 다만 재회 후에는 예전과 같은 문제를 반복하지 않도록, 헤어졌던 이유에 대한 솔직한 대화가 먼저입니다.",
    desc: "연락, 미련, 주변 반응까지 거의 모든 항목이 재회를 가리키고 있습니다. 이 정도면 두 사람 다 서로를 완전히 놓지 못했다는 뜻이에요. 지금 필요한 건 확인이 아니라 용기입니다. 미루는 시간이 길어질수록 서로 다른 사람을 만나게 될 확률만 높아질 뿐이에요.",
    badge: "🕊️ 재회 임박 상태"
  }
};

const REUNION_LIGHTS = {
  RED:    { emoji: "🔴", label: "STOP",   text: "기다려" },
  YELLOW: { emoji: "🟡", label: "READY",  text: "떠봐" },
  GREEN:  { emoji: "🟢", label: "GO",     text: "다가가" }
};

// ============================================
// 채점 함수
// ============================================

// 총점 비율 → 재회 확률 (로지스틱 곡선)
// 0% → 약 3%, 50% → 50%, 100% → 약 97%
function toProbability(percentage) {
  const p = 100 / (1 + Math.exp(-(percentage - 50) / 14));
  return Math.max(1, Math.min(99, Math.round(p)));
}

function calcReunion(answers) {
  const totalScore = answers.reduce((sum, score) => sum + score, 0);
  const maxScore = REUNION_QUESTIONS.length * 3;
  const percentage = Math.round((totalScore / maxScore) * 100);
  const probability = toProbability(percentage);

  // 영역별 집계
  const areaScores = {};
  Object.keys(REUNION_AREAS).forEach(k => { areaScores[k] = { score: 0, max: 0, percentage: 0 }; });
  REUNION_QUESTIONS.forEach((q, i) => {
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
  const weakestArea   = ordered[0][0];
  const strongestArea = ordered[ordered.length - 1][0];

  let levelKey;
  if (totalScore <= 9) levelKey = 'NONE';
  else if (totalScore <= 18) levelKey = 'MAYBE';
  else if (totalScore <= 27) levelKey = 'LIKELY';
  else if (totalScore <= 36) levelKey = 'STRONG';
  else levelKey = 'ALMOST';

  const info = REUNION_LEVELS[levelKey];

  return {
    totalScore,
    maxScore,
    percentage,
    probability,
    levelKey,
    levelInfo: info,
    light: REUNION_LIGHTS[info.light],
    action: info.action,
    advice: info.advice,
    areaScores,
    weakestArea,
    strongestArea
  };
}

if (typeof module !== 'undefined') {
  module.exports = { REUNION_QUESTIONS, REUNION_AREAS, REUNION_LEVELS, REUNION_LIGHTS, calcReunion, toProbability };
}
