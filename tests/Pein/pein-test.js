// ============================================
// 나의 폐인력 테스트
// ============================================
// 구조: 10문항, 선택지 3~4개 (0~3점)
// 채점: 점수 합산 → 5단계 레벨
// 최대 점수: 30점
// ============================================

const PEIN_QUESTIONS = [
  {
    id: 1,
    question: "오늘 몇 시에 일어났어?",
    emoji: "⏰",
    choices: [
      { text: "🌅 7시 이전. 나는 아침형 인간", score: 0 },
      { text: "☀️ 8~10시. 평범한 기상 시간", score: 1 },
      { text: "🌤️ 11시~오후 1시. 좀 늦긴 했지", score: 2 },
      { text: "🌙 오후 2시 이후. 아니면 아직 안 잠", score: 3 }
    ]
  },
  {
    id: 2,
    question: "오늘 밖에 나갔어?",
    emoji: "🚪",
    choices: [
      { text: "🏃 당연하지. 할 일이 많았어", score: 0 },
      { text: "🛒 잠깐 편의점이나 마트 정도", score: 1 },
      { text: "📦 배달 받으러 문 앞까지만", score: 2 },
      { text: "🏠 나간 게 언제였더라... 기억 안 남", score: 3 }
    ]
  },
  {
    id: 3,
    question: "오늘 밥은 어떻게 먹었어?",
    emoji: "🍽️",
    choices: [
      { text: "🍳 직접 해먹었어. 영양도 챙겼지", score: 0 },
      { text: "🥡 배달시켜 먹었어", score: 1 },
      { text: "🍜 라면이나 편의점 음식으로 때웠어", score: 2 },
      { text: "🍪 뭔가 집어먹긴 했는데... 식사라고 하긴 애매해", score: 3 }
    ]
  },
  {
    id: 4,
    question: "오늘 씻었어?",
    emoji: "🚿",
    choices: [
      { text: "🧼 당연하지. 아침마다 씻어", score: 0 },
      { text: "🛁 씻긴 했는데 좀 늦게", score: 1 },
      { text: "💧 대충 세수만 했어", score: 2 },
      { text: "🤔 오늘이 며칠이더라... 기억 안 남", score: 3 }
    ]
  },
  {
    id: 5,
    question: "지금 핸드폰 스크린 타임이 어떻게 돼?",
    emoji: "📱",
    choices: [
      { text: "⏱️ 3시간 이하. 나름 절제함", score: 0 },
      { text: "📊 4~6시간. 보통은 이 정도지", score: 1 },
      { text: "😅 7~10시간. 좀 많긴 한데...", score: 2 },
      { text: "💀 10시간 이상. 또는 확인하기 무서워서 안 봄", score: 3 }
    ]
  },
  {
    id: 6,
    question: "오늘 뭔가 '해야 할 일'이 있었는데 미뤘어?",
    emoji: "📋",
    choices: [
      { text: "✅ 아니. 다 처리했어", score: 0 },
      { text: "🔜 한두 개 미뤘는데 곧 할 거야", score: 1 },
      { text: "😬 꽤 많이 미뤘어. 내일의 나한테 넘겼어", score: 2 },
      { text: "🗑️ 미룬 게 쌓여서 이제 뭘 미뤘는지도 몰라", score: 3 }
    ]
  },
  {
    id: 7,
    question: "요즘 취미 또는 즐기는 활동이 뭐야?",
    emoji: "🎮",
    choices: [
      { text: "🏊 운동이나 야외 활동", score: 0 },
      { text: "🎨 독서, 그림, 요리 등 생산적인 활동", score: 1 },
      { text: "📺 유튜브, 넷플릭스 정주행", score: 2 },
      { text: "🛏️ 누워있기. 그게 취미야", score: 3 }
    ]
  },
  {
    id: 8,
    question: "마지막으로 '나 오늘 알차게 살았다' 싶었던 게 언제야?",
    emoji: "✨",
    choices: [
      { text: "😊 오늘. 매일 그런 편이야", score: 0 },
      { text: "📅 이번 주 안에는 있었어", score: 1 },
      { text: "🤔 이번 달... 있었나? 있긴 했을 거야", score: 2 },
      { text: "🌫️ 기억이 안 남. 아니 없었던 것 같기도", score: 3 }
    ]
  },
  {
    id: 9,
    question: "지금 주변 정리 상태는?",
    emoji: "🏠",
    choices: [
      { text: "✨ 깔끔해. 정기적으로 정리해", score: 0 },
      { text: "😌 좀 어지럽긴 한데 나는 어딨는지 알아", score: 1 },
      { text: "😅 카오스 상태. 언젠간 치울 거야", score: 2 },
      { text: "💀 방이 나를 집어삼켰어. 나도 그 일부가 됐어", score: 3 }
    ]
  },
  {
    id: 10,
    question: "지금 이 테스트를 하고 있는 시간대가?",
    emoji: "🕐",
    choices: [
      { text: "🌞 낮 시간대. 멀쩡하게 활동 중", score: 0 },
      { text: "🌆 저녁. 하루 마무리하면서", score: 1 },
      { text: "🌃 밤 12시 이후. 잠이 안 와서", score: 2 },
      { text: "🌑 새벽 3시 이후. 이게 일상이야", score: 3 }
    ]
  }
];

// ============================================
// 5단계 폐인 레벨 결과
// ============================================

const PEIN_LEVELS = {
  NORMAL: {
    level: 1,
    range: "0~8점",
    emoji: "😇",
    name: "정상인",
    tagline: "당신... 혹시 사람이 맞아요?",
    color: "#2ECC71",
    desc: "기상 시간, 식사, 위생, 할 일까지 — 당신의 하루는 교과서적으로 정상이야. 이 테스트를 하는 사람 중 제일 희귀한 케이스야. 폐인들의 세계에서 당신은 전설로 불려. '정상인이 실존했다'고.",
    badge: "🏆 전설의 정상인"
  },
  BEGINNER: {
    level: 2,
    range: "9~14점",
    emoji: "😌",
    name: "폐인 입문자",
    tagline: "아직은 괜찮아. 돌아올 수 있어.",
    color: "#F39C12",
    desc: "폐인의 길에 발을 살짝 걸친 상태야. 가끔 늦게 일어나고, 할 일 좀 미루고, 배달 한두 번 시키는 정도. 완전한 폐인은 아니지만 방심하면 안 돼. 그 길은 생각보다 빠르게 깊어지거든.",
    badge: "🌱 폐인 새싹"
  },
  INTERMEDIATE: {
    level: 3,
    range: "15~20점",
    emoji: "😮‍💨",
    name: "중급 폐인",
    tagline: "일상이 무너지는 소리가 들려.",
    color: "#E67E22",
    desc: "루틴이 뭔지 이론적으로는 알지만 실천은 다른 얘기인 타입. 해야 할 일은 내일의 나한테 넘기고, 씻는 것도 귀찮고, 밥은 뭔가 집어먹는 것으로 대충 때워. 폐인의 문을 꽤 깊이 열어젖힌 상태야.",
    badge: "🌿 검증된 폐인"
  },
  ADVANCED: {
    level: 4,
    range: "21~26점",
    emoji: "💀",
    name: "고급 폐인",
    tagline: "이미 폐인이지만 인정은 안 해.",
    color: "#E74C3C",
    desc: "오늘이 며칠인지, 마지막으로 씻은 게 언제인지, 밖에 나간 게 언제인지 — 이런 것들이 흐릿해진 상태야. 방은 카오스고, 스크린 타임은 폭발했고, 그래도 나름 살아가고 있어. 폐인이라는 말이 이제 귀에 익어.",
    badge: "💀 공인 폐인"
  },
  MASTER: {
    level: 5,
    range: "27~30점",
    emoji: "🌑",
    name: "폐인 그 자체",
    tagline: "당신이 곧 폐인의 기준입니다.",
    color: "#8E44AD",
    desc: "축하해. 당신은 폐인의 경지에 올랐어. 낮과 밤의 경계가 없고, 식사와 간식의 경계도 없고, 방과 쓰레기장의 경계도 애매해. 이 테스트를 새벽 4시에 누워서 하고 있다면 — 당신이 바로 이 테스트의 모델이야. 그래도 살아있는 거 칭찬해.",
    badge: "👑 폐인계의 왕"
  }
};

// ============================================
// 채점 함수
// ============================================

function calcPeinLevel(answers) {
  // answers = [0, 2, 1, 3, ...] 10개 (각 선택지 점수)
  const totalScore = answers.reduce((sum, score) => sum + score, 0);

  let levelKey;
  if (totalScore <= 8) levelKey = 'NORMAL';
  else if (totalScore <= 14) levelKey = 'BEGINNER';
  else if (totalScore <= 20) levelKey = 'INTERMEDIATE';
  else if (totalScore <= 26) levelKey = 'ADVANCED';
  else levelKey = 'MASTER';

  const levelInfo = PEIN_LEVELS[levelKey];
  const percentage = Math.round((totalScore / 30) * 100);

  return {
    levelKey,
    totalScore,
    maxScore: 30,
    percentage,
    levelInfo
  };
}

if (typeof module !== 'undefined') {
  module.exports = { PEIN_QUESTIONS, PEIN_LEVELS, calcPeinLevel };
}

// ============================================
// 러너 설정 등록
// ============================================

const _PEIN_IMG_IDX = { NORMAL: 0, BEGINNER: 1, INTERMEDIATE: 2, ADVANCED: 3, MASTER: 4 };

window.TEST_CONFIGS = window.TEST_CONFIGS || {};

window.TEST_CONFIGS['pein'] = {
  data: {
    title: "나의 폐인력 테스트",
    emoji: "🛋️",
    thumb: "images/Pein/thumb.webp",
    subtitle: "오늘 하루로 측정하는 나의 폐인 지수 (10문항)",
    questions: PEIN_QUESTIONS.map(q => ({
      q: q.question,
      choices: q.choices.map(c => ({ text: c.text, score: c.score }))
    })),
    results: PEIN_LEVELS
  },
  onAnswer(choice, state) {
    state.answersRaw.push(choice.score);
  },
  calcResult(state) {
    const result = calcPeinLevel(state.answersRaw);
    const winner = result.levelKey;
    const t      = result.levelInfo;
    return {
      winner,
      type:       t.name,
      emoji:      t.emoji,
      desc:       t.desc,
      tagline:    t.tagline,
      totalScore: result.totalScore,
      percentage: result.percentage,
      badge:      t.badge,
      color:      t.color
    };
  },
  getShareImage(winner) {
    return `images/Pein/${_PEIN_IMG_IDX[winner]}.webp`;
  },
  getSaveFilename(winner) {
    return `PEIN_${winner}.webp`;
  },
  shareImageStyle: { width: '75%', margin: '0 auto' },
  afterResult(result) {
    const titleEl = document.querySelector('.finger-traits-title');
    if (titleEl) titleEl.textContent = '나의 폐인력 분석';
    renderFingerTraits([
      {
        title: result.badge,
        desc:  `총 ${result.totalScore}점 / 30점 · 폐인 지수 ${result.percentage}%`
      }
    ], result.color);
  }
};
