// ============================================
// 숏폼 없이 몇 시간 버텨? 도파민 중독 테스트
// ============================================
// 구조: 15문항, 선택지 4개 (0~3점)
// 0점 = 도파민 회로가 멀쩡함
// 3점 = 짧은 자극 없이는 못 버팀
// 채점: 점수 합산 → 5단계 중독 등급
// 최대 점수: 45점
// 영역: 숏폼 / 집중력 / 확인강박 / 밤·수면 / 통제력 (각 3문항)
// ============================================

const DOPAMINE_QUESTIONS = [
  {
    id: 1,
    area: "SHORTS",
    question: "하루에 숏폼(릴스·쇼츠·틱톡)을 보는 시간은?",
    emoji: "📱",
    choices: [
      { text: "🌱 거의 안 봐. 알고리즘도 나를 포기했어", score: 0 },
      { text: "🙂 하루 30분 안쪽이야", score: 1 },
      { text: "🌀 한두 시간은 훌쩍 넘겨", score: 2 },
      { text: "🔥 정확히 몇 시간인지 세본 적이 없어", score: 3 }
    ]
  },
  {
    id: 2,
    area: "FOCUS",
    question: "영화나 드라마를 볼 때 나는?",
    emoji: "🎬",
    choices: [
      { text: "🌱 처음부터 끝까지 화면만 봐", score: 0 },
      { text: "🙂 지루한 구간에만 잠깐 폰을 봐", score: 1 },
      { text: "🌀 폰 보면서 틀어놓는 게 기본이야", score: 2 },
      { text: "🔥 그냥 요약 영상으로 대체해", score: 3 }
    ]
  },
  {
    id: 3,
    area: "CHECK",
    question: "알림이 안 왔는데도 폰을 확인하는 빈도는?",
    emoji: "👆",
    choices: [
      { text: "🌱 볼 일이 있을 때만 켜", score: 0 },
      { text: "🙂 한 시간에 한 번쯤은 보게 돼", score: 1 },
      { text: "🌀 10분에 한 번은 켜보는 것 같아", score: 2 },
      { text: "🔥 애초에 손에서 내려놓질 않아", score: 3 }
    ]
  },
  {
    id: 4,
    area: "NIGHT",
    question: "자기 전 침대에서 폰을 보는 시간은?",
    emoji: "🌙",
    choices: [
      { text: "🌱 침대에서는 폰을 안 봐", score: 0 },
      { text: "🙂 잠깐 확인하고 바로 놓아", score: 1 },
      { text: "🌀 30분에서 한 시간은 보게 돼", score: 2 },
      { text: "🔥 '5분만'이 두 시간이 되는 게 매일이야", score: 3 }
    ]
  },
  {
    id: 5,
    area: "CONTROL",
    question: "앱을 지우거나 사용 시간 제한을 걸어본 적 있어?",
    emoji: "🚫",
    choices: [
      { text: "🌱 그럴 필요를 느낀 적이 없어", score: 0 },
      { text: "🙂 해본 적은 없지만 알아서 조절돼", score: 1 },
      { text: "🌀 제한을 걸었다가 결국 풀어버렸어", score: 2 },
      { text: "🔥 지웠다 깔았다를 몇 번이나 반복했어", score: 3 }
    ]
  },
  {
    id: 6,
    area: "SHORTS",
    question: "\"딱 하나만 보고 끄자\" 하고 숏폼을 열었을 때 결말은?",
    emoji: "⏱️",
    choices: [
      { text: "🌱 진짜 하나만 보고 꺼", score: 0 },
      { text: "🙂 몇 개 더 보다가 끄게 돼", score: 1 },
      { text: "🌀 정신 차려보면 30분이 지나 있어", score: 2 },
      { text: "🔥 정신 차려보면 새벽이야", score: 3 }
    ]
  },
  {
    id: 7,
    area: "FOCUS",
    question: "긴 글이나 책을 읽을 때 나는?",
    emoji: "📖",
    choices: [
      { text: "🌱 몰입해서 잘 읽는 편이야", score: 0 },
      { text: "🙂 마음먹으면 읽을 수 있어", score: 1 },
      { text: "🌀 몇 줄 넘어가면 눈이 자꾸 미끄러져", score: 2 },
      { text: "🔥 요약본이 없으면 아예 안 읽어", score: 3 }
    ]
  },
  {
    id: 8,
    area: "CHECK",
    question: "폰이 눈앞에 안 보이면 어떤 기분이야?",
    emoji: "😰",
    choices: [
      { text: "🌱 별생각 없어. 있는 줄도 몰라", score: 0 },
      { text: "🙂 조금 신경은 쓰여", score: 1 },
      { text: "🌀 불안해서 바로 찾으러 가", score: 2 },
      { text: "🔥 찾을 때까지 아무것도 손에 안 잡혀", score: 3 }
    ]
  },
  {
    id: 9,
    area: "NIGHT",
    question: "아침에 눈을 떴을 때 첫 행동은?",
    emoji: "☀️",
    choices: [
      { text: "🌱 그냥 일어나서 하루를 시작해", score: 0 },
      { text: "🙂 시간만 확인하고 일어나", score: 1 },
      { text: "🌀 누운 채로 피드를 한참 내려", score: 2 },
      { text: "🔥 일어나기 전에 이미 30분이 사라져 있어", score: 3 }
    ]
  },
  {
    id: 10,
    area: "CONTROL",
    question: "아무것도 안 하고 10분간 가만히 있으라고 하면?",
    emoji: "🪑",
    choices: [
      { text: "🌱 오히려 편하고 좋아", score: 0 },
      { text: "🙂 조금 지루하지만 견딜 만해", score: 1 },
      { text: "🌀 못 참고 폰부터 집어들 것 같아", score: 2 },
      { text: "🔥 시도조차 안 할 것 같아", score: 3 }
    ]
  },
  {
    id: 11,
    area: "SHORTS",
    question: "영상을 볼 때 재생 속도는?",
    emoji: "⏩",
    choices: [
      { text: "🌱 1배속으로 처음부터 끝까지 봐", score: 0 },
      { text: "🙂 가끔 1.25배 정도는 올려", score: 1 },
      { text: "🌀 1.5배 이상이 기본이야", score: 2 },
      { text: "🔥 배속에 건너뛰기까지 해도 답답해", score: 3 }
    ]
  },
  {
    id: 12,
    area: "FOCUS",
    question: "엘리베이터나 신호를 기다리는 30초 동안 나는?",
    emoji: "🚦",
    choices: [
      { text: "🌱 그냥 기다려. 30초잖아", score: 0 },
      { text: "🙂 가끔 폰을 꺼내기도 해", score: 1 },
      { text: "🌀 거의 항상 폰부터 꺼내", score: 2 },
      { text: "🔥 이 문장 읽는 지금도 다른 탭이 열려 있어", score: 3 }
    ]
  },
  {
    id: 13,
    area: "CHECK",
    question: "혼자 밥 먹을 때 화면 없이 먹을 수 있어?",
    emoji: "🍚",
    choices: [
      { text: "🌱 당연하지. 밥에 집중해", score: 0 },
      { text: "🙂 가끔 뭔가 틀어놓기도 해", score: 1 },
      { text: "🌀 영상이 없으면 허전해서 못 먹겠어", score: 2 },
      { text: "🔥 볼 게 없으면 밥맛까지 떨어져", score: 3 }
    ]
  },
  {
    id: 14,
    area: "NIGHT",
    question: "숏폼 때문에 잠을 못 잔 적이 있어?",
    emoji: "🥱",
    choices: [
      { text: "🌱 그런 적 없어", score: 0 },
      { text: "🙂 한두 번쯤은 있었어", score: 1 },
      { text: "🌀 꽤 자주 그래", score: 2 },
      { text: "🔥 거의 매일 그러고 다음 날 후회해", score: 3 }
    ]
  },
  {
    id: 15,
    area: "CONTROL",
    question: "한참 숏폼을 보고 난 뒤의 기분은?",
    emoji: "🫥",
    choices: [
      { text: "🌱 재밌었네, 하고 끝나", score: 0 },
      { text: "🙂 그럭저럭 시간 잘 썼다 싶어", score: 1 },
      { text: "🌀 시간 아깝다는 생각이 들어", score: 2 },
      { text: "🔥 허무하고 자괴감이 드는데도 또 열어", score: 3 }
    ]
  }
];

// ============================================
// 영역 정의 (각 3문항 / 만점 9점)
// ============================================

const DOPAMINE_AREAS = {
  SHORTS:  { name: "숏폼 소비",  emoji: "📱", color: "#E85D75", desc: "짧은 영상에 쓰는 시간과 속도" },
  FOCUS:   { name: "집중력",    emoji: "🎬", color: "#E67E22", desc: "긴 콘텐츠와 지루함을 견디는 힘" },
  CHECK:   { name: "확인 강박",  emoji: "👆", color: "#9B59B6", desc: "화면 없이 있을 때의 불안" },
  NIGHT:   { name: "밤·아침",   emoji: "🌙", color: "#3498DB", desc: "잠들기 전과 눈뜬 직후의 습관" },
  CONTROL: { name: "통제력",    emoji: "🚫", color: "#16A085", desc: "스스로 멈출 수 있는 정도" }
};

// ============================================
// 5단계 중독 등급
// ============================================

const DOPAMINE_LEVELS = {
  CLEAN: {
    level: 1,
    range: "0~9점",
    emoji: "🌱",
    name: "도파민 청정 구역",
    tagline: "당신의 뇌는 아직 인간의 것입니다.",
    color: "#2ECC71",
    desc: "짧은 자극에 거의 길들지 않은 상태입니다. 지루한 시간을 견딜 수 있고, 긴 영상이나 글도 끝까지 따라갈 수 있죠. 요즘 기준으로는 희귀한 편입니다. 이 상태가 주는 가장 큰 이득은 집중력이 아니라 '심심할 수 있는 능력'입니다. 좋은 생각은 대부분 심심한 시간에 나오거든요.",
    badge: "🌿 알고리즘 미개척지"
  },
  MILD: {
    level: 2,
    range: "10~18점",
    emoji: "🙂",
    name: "아직은 내가 폰을 쓴다",
    tagline: "쓰긴 쓰는데, 끌려다니진 않습니다.",
    color: "#16A085",
    desc: "숏폼을 보긴 하지만 스스로 끊을 수 있는 상태입니다. 가끔 시간을 흘려보내도 다음 날 똑같이 반복하지는 않죠. 지금은 당신이 폰을 쓰는 쪽입니다. 다만 이 균형은 습관 하나로 쉽게 무너집니다. 자기 전 침대에 폰을 들고 들어가는 습관만 생겨도 두 단계는 순식간에 밀려요.",
    badge: "🙂 아직은 주도권 보유"
  },
  HOOKED: {
    level: 3,
    range: "19~27점",
    emoji: "🌀",
    name: "스크롤에 끌려다니는 중",
    tagline: "끄려고 했는데 손가락이 안 멈춥니다.",
    color: "#F39C12",
    desc: "이미 알고리즘이 당신의 하루 일부를 가져간 상태입니다. 하나만 보려고 열었다가 30분이 사라지고, 긴 콘텐츠는 점점 버겁게 느껴지죠. 아직 심각한 단계는 아니지만 방향은 분명합니다. 지금 가장 효과적인 처방은 앱 삭제가 아니라, 침대에 폰을 안 들고 들어가는 것 하나입니다. 밤 시간만 끊어도 점수의 상당 부분이 내려갑니다.",
    badge: "🌀 무한 스크롤 탑승 중"
  },
  HEAVY: {
    level: 4,
    range: "28~36점",
    emoji: "🔥",
    name: "도파민 과부하",
    tagline: "이제 웬만한 자극으로는 재미가 없습니다.",
    color: "#E67E22",
    desc: "짧고 강한 자극에 기준선이 맞춰져서, 그보다 느린 것들이 전부 지루하게 느껴지는 상태입니다. 영화는 늘어지고 책은 안 읽히고 대화도 답답하죠. 문제는 재미가 없어진 게 아니라 기준이 올라간 겁니다. 다행히 이 기준선은 되돌릴 수 있습니다. 다만 며칠은 확실히 지루할 각오를 해야 해요. 그 지루함이 회복의 증상입니다.",
    badge: "🔥 자극 역치 초과"
  },
  FRIED: {
    level: 5,
    range: "37~45점",
    emoji: "💀",
    name: "도파민에 절여진 뇌",
    tagline: "지금 이 문장도 끝까지 못 읽고 있죠.",
    color: "#C0392B",
    desc: "깨어 있는 시간의 상당 부분이 화면에 묶여 있는 상태입니다. 재미있어서 보는 게 아니라, 안 보면 불안해서 보는 단계에 가깝죠. 여기서 중요한 건 자책이 아닙니다. 이건 의지가 약해서가 아니라, 애초에 멈추기 어렵게 설계된 것을 상대로 버티고 있는 거니까요. 가장 현실적인 시작은 '줄이기'가 아니라 '시간과 장소를 정하기'입니다. 침대와 식탁에서만 빼도 체감이 달라집니다.",
    badge: "💀 알고리즘 완전 정착민"
  }
};

// ============================================
// 채점 함수
// ============================================

// 점수 → "숏폼 없이 버틸 수 있는 시간" 환산 (재미 요소)
function estimateEndurance(percentage) {
  // 0% → 약 3일, 100% → 약 5분 (지수 감소)
  const minutes = Math.round(4320 * Math.exp(-0.06762 * percentage));
  if (minutes >= 1440) {
    const d = Math.round(minutes / 1440);
    return { value: d, unit: '일', text: d + '일' };
  }
  if (minutes >= 60) {
    const h = Math.round(minutes / 60);
    return { value: h, unit: '시간', text: h + '시간' };
  }
  return { value: minutes, unit: '분', text: minutes + '분' };
}

function calcDopamine(answers) {
  const totalScore = answers.reduce((sum, score) => sum + score, 0);
  const maxScore = DOPAMINE_QUESTIONS.length * 3;
  const percentage = Math.round((totalScore / maxScore) * 100);

  // 영역별 집계
  const areaScores = {};
  Object.keys(DOPAMINE_AREAS).forEach(k => { areaScores[k] = { score: 0, max: 0, percentage: 0 }; });
  DOPAMINE_QUESTIONS.forEach((q, i) => {
    const a = areaScores[q.area];
    if (!a) return;
    a.score += (answers[i] ?? 0);
    a.max   += 3;
  });
  Object.values(areaScores).forEach(a => {
    a.percentage = a.max ? Math.round((a.score / a.max) * 100) : 0;
  });

  // 가장 멀쩡한 영역 / 가장 망가진 영역
  const ordered = Object.entries(areaScores).sort((a, b) => a[1].percentage - b[1].percentage);
  const bestArea  = ordered[0][0];
  const worstArea = ordered[ordered.length - 1][0];

  let levelKey;
  if (totalScore <= 9) levelKey = 'CLEAN';
  else if (totalScore <= 18) levelKey = 'MILD';
  else if (totalScore <= 27) levelKey = 'HOOKED';
  else if (totalScore <= 36) levelKey = 'HEAVY';
  else levelKey = 'FRIED';

  return {
    totalScore,
    maxScore,
    percentage,
    levelKey,
    levelInfo: DOPAMINE_LEVELS[levelKey],
    endurance: estimateEndurance(percentage),
    areaScores,
    bestArea,
    worstArea
  };
}

if (typeof module !== 'undefined') {
  module.exports = { DOPAMINE_QUESTIONS, DOPAMINE_AREAS, DOPAMINE_LEVELS, calcDopamine, estimateEndurance };
}
