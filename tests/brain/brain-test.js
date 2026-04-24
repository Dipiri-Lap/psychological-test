// ============================================
// 좌뇌 우뇌 테스트 데이터
// ============================================
// 구조: 20문항, 각 선택지 left/right 점수
// 채점: left/right 합산 후 퍼센트 계산
// 타입: 5가지 (비율 기준)
// ============================================

const BRAIN_QUESTIONS = [
  {
    id: 1,
    question: "여행 계획을 세울 때 나는?",
    choices: [
      { text: "📋 숙소, 이동 시간, 예산까지 스프레드시트로 정리", side: "left", score: 1 },
      { text: "🗺️ 대충 방향만 정하고 현지에서 즉흥으로 움직여", side: "right", score: 1 }
    ]
  },
  {
    id: 2,
    question: "문제가 생겼을 때 나는?",
    choices: [
      { text: "🔍 원인을 분석하고 단계적으로 해결책을 찾아", side: "left", score: 1 },
      { text: "💡 직감적으로 답이 떠오르고 일단 해봐", side: "right", score: 1 }
    ]
  },
  {
    id: 3,
    question: "새로운 것을 배울 때 나는?",
    choices: [
      { text: "📚 순서대로 기초부터 차근차근 쌓아야 해", side: "left", score: 1 },
      { text: "🎯 전체 그림을 먼저 보고 필요한 부분만 찾아봐", side: "right", score: 1 }
    ]
  },
  {
    id: 4,
    question: "대화할 때 나는?",
    choices: [
      { text: "🗣️ 정확한 단어와 논리적인 흐름으로 말해", side: "left", score: 1 },
      { text: "🎨 비유나 이미지로 설명하는 게 더 편해", side: "right", score: 1 }
    ]
  },
  {
    id: 5,
    question: "책상이나 방 정리는?",
    choices: [
      { text: "📁 카테고리별로 정리돼 있어야 마음이 편해", side: "left", score: 1 },
      { text: "🌀 겉보기엔 복잡해도 나만 아는 체계가 있어", side: "right", score: 1 }
    ]
  },
  {
    id: 6,
    question: "영화나 책을 고를 때 나는?",
    choices: [
      { text: "⭐ 평점, 리뷰, 장르 먼저 확인하고 결정해", side: "left", score: 1 },
      { text: "🎬 포스터나 분위기 보고 끌리면 바로 봐", side: "right", score: 1 }
    ]
  },
  {
    id: 7,
    question: "수학 문제를 풀 때 나는?",
    choices: [
      { text: "✏️ 공식 적용하고 풀이 과정을 정확하게 써", side: "left", score: 1 },
      { text: "🧠 답이 먼저 보이고 나중에 과정을 맞춰", side: "right", score: 1 }
    ]
  },
  {
    id: 8,
    question: "음악을 들을 때 주로?",
    choices: [
      { text: "🎵 가사 내용이나 코드 진행이 먼저 들려", side: "left", score: 1 },
      { text: "🎶 멜로디나 분위기에 먼저 빠져들어", side: "right", score: 1 }
    ]
  },
  {
    id: 9,
    question: "결정을 내릴 때 나는?",
    choices: [
      { text: "📊 장단점 목록 만들고 비교해서 결정해", side: "left", score: 1 },
      { text: "❤️ 일단 느낌이 좋은 쪽으로 가고 이유는 나중에 찾아", side: "right", score: 1 }
    ]
  },
  {
    id: 10,
    question: "길을 찾을 때 나는?",
    choices: [
      { text: "📍 지도 앱 켜고 거리, 시간, 경로 확인해", side: "left", score: 1 },
      { text: "🧭 방향 감각으로 대충 어딘지 알고 찾아가", side: "right", score: 1 }
    ]
  },
  {
    id: 11,
    question: "글을 쓸 때 나는?",
    choices: [
      { text: "📝 개요 먼저 잡고 논리적으로 전개해", side: "left", score: 1 },
      { text: "✍️ 일단 쓰기 시작하고 흐름대로 가", side: "right", score: 1 }
    ]
  },
  {
    id: 12,
    question: "그림이나 디자인을 볼 때 나는?",
    choices: [
      { text: "🔎 구도, 색 배합, 기법 같은 요소를 분석해", side: "left", score: 1 },
      { text: "😌 전체적인 느낌과 감정이 먼저 들어와", side: "right", score: 1 }
    ]
  },
  {
    id: 13,
    question: "시간 관리는?",
    choices: [
      { text: "⏰ 할 일 목록 만들고 시간대별로 계획 세워", side: "left", score: 1 },
      { text: "🌊 그때그때 중요한 것부터 처리해", side: "right", score: 1 }
    ]
  },
  {
    id: 14,
    question: "대화 중 상대방이 감정적일 때 나는?",
    choices: [
      { text: "💬 왜 그런 감정이 생겼는지 원인부터 파악해", side: "left", score: 1 },
      { text: "🤗 일단 감정에 공감하고 같이 느껴줘", side: "right", score: 1 }
    ]
  },
  {
    id: 15,
    question: "새로운 아이디어가 떠오를 때?",
    choices: [
      { text: "📈 실현 가능성과 논리적 근거부터 따져봐", side: "left", score: 1 },
      { text: "🚀 일단 흥미롭고 재밌으면 해보고 싶어", side: "right", score: 1 }
    ]
  },
  {
    id: 16,
    question: "요리할 때 나는?",
    choices: [
      { text: "🍳 레시피대로 정확한 양과 순서를 지켜", side: "left", score: 1 },
      { text: "🧑‍🍳 눈대중으로 넣고 맛 보면서 조절해", side: "right", score: 1 }
    ]
  },
  {
    id: 17,
    question: "프레젠테이션을 준비할 때?",
    choices: [
      { text: "📊 데이터, 수치, 근거 자료를 빈틈없이 채워", side: "left", score: 1 },
      { text: "🎨 시각적으로 임팩트 있게 만드는 게 우선이야", side: "right", score: 1 }
    ]
  },
  {
    id: 18,
    question: "기억을 떠올릴 때 나는?",
    choices: [
      { text: "🗂️ 날짜, 장소, 순서 같은 사실 중심으로 기억해", side: "left", score: 1 },
      { text: "🎞️ 그때의 분위기, 감정, 장면이 먼저 떠올라", side: "right", score: 1 }
    ]
  },
  {
    id: 19,
    question: "쉬는 날 나는?",
    choices: [
      { text: "📅 뭘 할지 미리 정해두고 효율적으로 움직여", side: "left", score: 1 },
      { text: "😴 기분 내키는 대로 흘러가는 하루가 좋아", side: "right", score: 1 }
    ]
  },
  {
    id: 20,
    question: "나를 한 마디로 표현하면?",
    choices: [
      { text: "⚙️ 논리적이고 체계적인 사람", side: "left", score: 1 },
      { text: "🌈 감성적이고 창의적인 사람", side: "right", score: 1 }
    ]
  }
];

// ============================================
// 5가지 뇌 타입 결과 데이터
// ============================================

const BRAIN_TYPES = {
  LEFT_DOMINANT: {
    emoji: "🔢",
    name: "완전 좌뇌형",
    range: "좌뇌 80% 이상",
    tagline: "인생은 논리로 풀리는 방정식이야.",
    color: "#4A90D9",
    desc: "데이터가 없으면 불안하고, 계획이 없으면 출발을 못 해. 세상 모든 걸 분석하고 분류하는 게 숨쉬기보다 자연스러운 타입. 감정보다 근거, 느낌보다 수치가 먼저야. 주변에서 '왜 그렇게 복잡하게 생각해'라는 말을 들어봤다면 — 복잡한 게 아니라 정확한 거야."
  },
  LEFT_LEANING: {
    emoji: "📊",
    name: "좌뇌 우세형",
    range: "좌뇌 60~79%",
    tagline: "일단 논리부터, 감성은 그 다음.",
    color: "#2980B9",
    desc: "기본적으로 논리적이고 체계적이지만, 감성이 완전히 없는 건 아니야. 계획을 세우되 약간의 즉흥은 허용하고, 데이터를 보되 직관도 참고해. 좌뇌가 운전석에 앉아 있고, 우뇌는 조수석에서 가끔 끼어드는 구조야."
  },
  BALANCED: {
    emoji: "⚖️",
    name: "균형형",
    range: "좌뇌 45~55%",
    tagline: "논리도 되고 감성도 되는 사람.",
    color: "#27AE60",
    desc: "좌뇌와 우뇌가 상황에 따라 번갈아 가며 활성화되는 타입. 분석이 필요할 때는 논리적으로, 창의가 필요할 때는 감성적으로 접근해. 어떤 상황에서도 유연하게 적응하는 게 최고 강점. 근데 가끔 '나 지금 어떻게 생각하고 있는 거지?' 헷갈릴 때도 있어."
  },
  RIGHT_LEANING: {
    emoji: "🎨",
    name: "우뇌 우세형",
    range: "우뇌 60~79%",
    tagline: "느낌이 먼저 오고, 이유는 나중에 찾아.",
    color: "#E67E22",
    desc: "직관과 감성으로 세상을 읽는 타입. 설명하기 어렵지만 왠지 이게 맞는 것 같은 느낌 — 그게 대부분 맞아. 창의적이고 공감 능력이 높아서 예술이나 사람을 다루는 일에서 빛을 발해. 논리적으로 설명하라고 하면 좀 답답할 때가 있어."
  },
  RIGHT_DOMINANT: {
    emoji: "🌈",
    name: "완전 우뇌형",
    range: "우뇌 80% 이상",
    tagline: "세상은 느끼는 것이지 분석하는 게 아니야.",
    color: "#E74C3C",
    desc: "감성, 직관, 창의력이 폭발하는 타입. 규칙보다 흐름, 계획보다 영감으로 움직여. 아이디어가 넘쳐서 시작은 많은데 마무리가 좀 약할 수 있어. 스프레드시트보다 스케치북이 편하고, 회의보다 브레인스토밍이 즐거워. 당신의 감성이 세상을 더 풍요롭게 만들어."
  }
};

// ============================================
// 채점 함수
// ============================================

function calcBrainType(answers) {
  // answers = [{side: 'left'}, {side: 'right'}, ...] 20개
  let leftScore = 0;
  let rightScore = 0;

  answers.forEach(a => {
    if (a.side === 'left') leftScore++;
    else rightScore++;
  });

  const total = leftScore + rightScore;
  const leftPct = Math.round((leftScore / total) * 100);
  const rightPct = 100 - leftPct;

  // 타입 결정
  let type;
  if (leftPct >= 80) type = 'LEFT_DOMINANT';
  else if (leftPct >= 60) type = 'LEFT_LEANING';
  else if (rightPct >= 80) type = 'RIGHT_DOMINANT';
  else if (rightPct >= 60) type = 'RIGHT_LEANING';
  else type = 'BALANCED';

  return {
    type,
    leftScore,
    rightScore,
    leftPct,
    rightPct,
    typeInfo: BRAIN_TYPES[type]
  };
}

if (typeof module !== 'undefined') {
  module.exports = { BRAIN_QUESTIONS, BRAIN_TYPES, calcBrainType };
}

// ============================================
// 러너 설정 등록
// ============================================

window.TEST_CONFIGS = window.TEST_CONFIGS || {};

window.TEST_CONFIGS['brain'] = {
  data: {
    title: "좌뇌 우뇌 테스트",
    emoji: "🧠",
    thumb: "images/brain/thumb.webp",
    subtitle: "나는 논리파? 감성파? (20문항)",
    questions: BRAIN_QUESTIONS.map(q => ({ q: q.question, choices: q.choices })),
    results: BRAIN_TYPES
  },
  onAnswer(choice, state) {
    state.answersRaw.push({ side: choice.side });
  },
  calcResult(state) {
    const result = calcBrainType(state.answersRaw);
    const winner = result.type;
    const t      = result.typeInfo;
    return { winner, type: t.name, emoji: t.emoji, desc: t.desc, tagline: t.tagline };
  },
  getShareImage(winner) {
    return `images/brain/${winner}.webp`;
  },
  getSaveFilename(winner) {
    return `BRAIN_${winner}.webp`;
  }
};
