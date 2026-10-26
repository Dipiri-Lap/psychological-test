// ============================================
// 내 연애의 유통기한은? 연애 지속력 테스트
// ============================================
// 구조: 12문항 4지선다, 선택지마다 0~3점(0=금방 식는 쪽 … 3=오래 가는 쪽). 총점 0~36.
// 4영역 × 3문항: 설렘 유지(spark) · 갈등 회복(repair) · 일상 신뢰(daily) · 미래 설계(future)
// 결과: 총점으로 6단계 "연애 지속력"(폭죽형 약 3개월 … 등대형 평생) + 영역별 점수 + 가장 약한 영역 처방
// "유통기한"은 연애 습관을 가볍게 돌아보기 위한 재미용 표현이며, 실제 관계의 기간을 예측하지 않는다.
// ============================================

const LOVESHELF_AREAS = {
  spark:  { emoji: "💫", name: "설렘 유지", desc: "처음의 마음을 이어 가는 힘" },
  repair: { emoji: "🩹", name: "갈등 회복", desc: "싸운 뒤 다시 가까워지는 힘" },
  daily:  { emoji: "🏡", name: "일상 신뢰", desc: "평범한 하루를 함께하는 힘" },
  future: { emoji: "🧭", name: "미래 설계", desc: "같은 방향을 바라보는 힘" }
};

const LOVESHELF_QUESTIONS = [
  {
    id: 1, area: "spark", emoji: "💫", question: "연애 3개월 차, 처음보다 설렘이 줄었다고 느낄 때 나는?",
    choices: [
      { text: "설렘이 줄면 사랑이 식은 것 같아서 관계를 정리할까 고민한다", pts: 0 },
      { text: "아쉽지만 원래 그런 거라며 그냥 지낸다", pts: 1 },
      { text: "새로운 데이트나 도전으로 분위기를 바꿔 본다", pts: 2 },
      { text: "설렘이 편안함으로 바뀌는 과정이라 보고 새로운 설렘을 함께 만든다", pts: 3 }
    ]
  },
  {
    id: 2, area: "repair", emoji: "⛈️", question: "큰 싸움을 하고 난 뒤 나는?",
    choices: [
      { text: "며칠이고 말 없이 지내다 흐지부지 넘어간다", pts: 0 },
      { text: "먼저 사과하기 싫어서 상대가 풀어 주길 기다린다", pts: 1 },
      { text: "감정이 가라앉으면 먼저 대화를 시도한다", pts: 2 },
      { text: "그날 안에 서로의 입장을 듣고 해결 방법까지 정한다", pts: 3 }
    ]
  },
  {
    id: 3, area: "daily", emoji: "📱", question: "하루 일과를 상대와 공유하는 습관은?",
    choices: [
      { text: "연락이 부담스러워서 굳이 말하지 않는다", pts: 0 },
      { text: "꼭 필요한 말만 간단히 한다", pts: 1 },
      { text: "일상을 자주 나누고 서로 궁금해한다", pts: 2 },
      { text: "작은 일까지 나누며 서로의 하루를 잘 안다", pts: 3 }
    ]
  },
  {
    id: 4, area: "future", emoji: "🗓️", question: "미래 이야기를 상대와 얼마나 나눠?",
    choices: [
      { text: "미래 얘기는 부담스러워서 피한다", pts: 0 },
      { text: "가끔 막연하게만 이야기한다", pts: 1 },
      { text: "1~2년 뒤 계획을 구체적으로 이야기한다", pts: 2 },
      { text: "5년 뒤 모습까지 자주 이야기하고 함께 준비한다", pts: 3 }
    ]
  },
  {
    id: 5, area: "spark", emoji: "✨", question: "상대에게 처음 반했던 순간을 떠올리면?",
    choices: [
      { text: "지금은 그 느낌이 거의 기억나지 않는다", pts: 0 },
      { text: "기억은 나지만 지금과는 다른 사람 같다", pts: 1 },
      { text: "가끔 떠올리며 웃음이 난다", pts: 2 },
      { text: "지금도 비슷한 설렘을 자주 느낀다", pts: 3 }
    ]
  },
  {
    id: 6, area: "repair", emoji: "🙇", question: "내가 잘못했을 때 사과하는 방식은?",
    choices: [
      { text: "자존심 때문에 사과가 잘 안 나온다", pts: 0 },
      { text: "\"미안\" 정도로 짧게 넘어간다", pts: 1 },
      { text: "무엇이 잘못이었는지 인정하고 사과한다", pts: 2 },
      { text: "사과와 함께 다음에는 어떻게 할지까지 말한다", pts: 3 }
    ]
  },
  {
    id: 7, area: "daily", emoji: "🕰️", question: "상대가 친구·취미로 혼자 시간을 보낼 때 나는?",
    choices: [
      { text: "서운하고 불안해서 자꾸 신경이 쓰인다", pts: 0 },
      { text: "이해하려 하지만 속으로는 서운하다", pts: 1 },
      { text: "서로의 시간을 존중하고 응원한다", pts: 2 },
      { text: "각자의 시간이 있어야 함께하는 시간이 더 소중해진다고 믿는다", pts: 3 }
    ]
  },
  {
    id: 8, area: "future", emoji: "💰", question: "돈·결혼·가치관 같은 현실적인 이야기는?",
    choices: [
      { text: "분위기가 깨질 것 같아서 꺼내지 않는다", pts: 0 },
      { text: "필요할 때만 마지못해 말한다", pts: 1 },
      { text: "솔직하게 이야기하며 서로를 알아 간다", pts: 2 },
      { text: "정기적으로 대화하며 우리만의 기준을 만들어 간다", pts: 3 }
    ]
  },
  {
    id: 9, area: "spark", emoji: "🎁", question: "깜짝 이벤트나 작은 선물 같은 표현은?",
    choices: [
      { text: "귀찮고 유치하다고 느껴서 거의 안 한다", pts: 0 },
      { text: "기념일에만 의무적으로 한다", pts: 1 },
      { text: "생각날 때 가끔 챙긴다", pts: 2 },
      { text: "일상에서 소소한 서프라이즈를 꾸준히 만든다", pts: 3 }
    ]
  },
  {
    id: 10, area: "repair", emoji: "🔁", question: "같은 문제로 자꾸 싸우게 된다면?",
    choices: [
      { text: "어차피 안 바뀐다고 생각하고 포기한다", pts: 0 },
      { text: "싸울 때마다 같은 말을 반복한다", pts: 1 },
      { text: "서로 한 가지씩 바꿔 보기로 한다", pts: 2 },
      { text: "원인을 함께 찾아서 규칙이나 습관을 같이 바꾼다", pts: 3 }
    ]
  },
  {
    id: 11, area: "daily", emoji: "🧺", question: "생활 습관이 다를 때(정리·시간 약속 등) 나는?",
    choices: [
      { text: "계속 지적하게 되고 짜증이 쌓인다", pts: 0 },
      { text: "참다가 한 번씩 폭발한다", pts: 1 },
      { text: "서로 조율해서 중간 지점을 찾는다", pts: 2 },
      { text: "다름을 재미있는 차이로 받아들이고 규칙을 함께 만든다", pts: 3 }
    ]
  },
  {
    id: 12, area: "future", emoji: "🔭", question: "5년 뒤 우리의 모습을 떠올리면?",
    choices: [
      { text: "잘 상상이 안 된다", pts: 0 },
      { text: "그럴 수도 있겠지만 확신은 없다", pts: 1 },
      { text: "함께 있을 것 같다", pts: 2 },
      { text: "구체적인 그림이 그려지고 기대된다", pts: 3 }
    ]
  }
];

// ============================================
// 6단계 연애 지속력 (총점 0~36)
// ============================================

const LOVESHELF_TIERS = [
  { id: "T1", min: 0,  emoji: "🎆", name: "폭죽형", span: "약 3개월", color: "#E8683A",
    tagline: "화려하게 터지고 빠르게 사라지는 불꽃",
    desc: "시작의 설렘과 열기가 가장 큰 유형입니다. 처음엔 누구보다 뜨겁게 사랑하지만, 설렘이 줄어들면 마음도 함께 식었다고 느끼기 쉬워요. 새로운 자극과 감정의 크기에 이끌리는 만큼, 일상이 되는 순간을 어떻게 넘기느냐가 가장 큰 숙제입니다.",
    keywords: ["뜨거운 시작", "설렘 중심", "빠른 열기"],
    habit: "설렘이 줄면 끝났다고 여기는 생각, 싸움 뒤 침묵하는 습관",
    boost: "설렘이 줄어든 시기를 '고장'이 아니라 '다음 단계'로 이름 붙여 보세요. 새로운 경험을 한 달에 하나만 함께 해도 불씨가 오래 갑니다." },
  { id: "T2", min: 11, emoji: "🎇", name: "불꽃놀이형", span: "약 1년", color: "#E8607F",
    tagline: "한 해를 환하게 밝히는 큰 한 방",
    desc: "처음 1년 동안은 에너지와 열정이 가득한 유형입니다. 기념일과 이벤트를 챙기고 함께하는 시간이 즐겁지만, 일상의 갈등과 현실 이야기가 쌓이면 흔들릴 수 있어요. 열정에 더해 '조율하는 힘'이 더해지면 훨씬 오래 갑니다.",
    keywords: ["열정", "이벤트", "조율이 숙제"],
    habit: "현실적인 이야기를 미루는 습관, 같은 문제로 반복되는 갈등",
    boost: "좋을 때 미리 '싸웠을 때 우리의 규칙'을 정해 두세요. 24시간 안에 대화하기 같은 작은 약속이 큰 도움이 됩니다." },
  { id: "T3", min: 15, emoji: "🔥", name: "모닥불형", span: "약 3년", color: "#E8833A",
    tagline: "곁에 둘수록 따뜻해지는 사랑",
    desc: "열정과 편안함이 균형을 이루는 유형입니다. 설렘이 줄어도 서로의 곁에 있는 시간이 즐겁고, 갈등이 생겨도 대화로 풀어 가려는 마음이 있어요. 땔감(관심과 노력)을 꾸준히 넣어 주면 오래 타오르는 사랑입니다.",
    keywords: ["균형", "따뜻함", "꾸준한 노력"],
    habit: "바쁜 시기에 대화가 줄어드는 습관, 미래 이야기를 막연하게 두는 습관",
    boost: "한 달에 한 번 '우리 이야기 시간'을 가져 보세요. 서로의 근황과 앞으로의 계획을 짧게 나누는 것만으로도 불이 꺼지지 않아요." },
  { id: "T4", min: 20, emoji: "🪵", name: "벽난로형", span: "약 7년", color: "#B0804A",
    tagline: "집 안 가득 퍼지는 안정감",
    desc: "안정감과 신뢰가 큰 유형입니다. 큰 이벤트가 없어도 일상을 함께하는 시간이 편안하고, 갈등이 와도 서로를 믿고 이야기합니다. 변화가 적은 만큼 가끔 새로운 불씨를 더해 주면 더 오래 따뜻해집니다.",
    keywords: ["안정", "신뢰", "일상의 힘"],
    habit: "익숙함에 표현이 줄어드는 습관",
    boost: "익숙할수록 고맙다는 말, 사랑한다는 말을 소리 내어 해 보세요. 사소한 서프라이즈가 벽난로의 장작이 돼요." },
  { id: "T5", min: 25, emoji: "🏮", name: "화로형", span: "10년 이상", color: "#C25B3F",
    tagline: "오래 은근하게 타오르는 깊은 불",
    desc: "서로를 깊이 이해하고 함께 미래를 설계하는 유형입니다. 설렘은 줄어도 서로를 존중하는 습관과 문제를 함께 푸는 힘이 강해요. 관계를 '만들어 간다'는 태도가 있어서 시간이 갈수록 깊이가 더해집니다.",
    keywords: ["깊은 이해", "함께 설계", "존중"],
    habit: "각자의 일과 책임에 지쳐 서로를 돌보는 시간을 미루는 습관",
    boost: "함께 쉬는 시간을 일정으로 먼저 잡으세요. 일을 잘하는 것만큼 서로를 돌보는 시간이 오래가는 비결이에요." },
  { id: "T6", min: 30, emoji: "🗼", name: "등대형", span: "평생", color: "#5F7A70",
    tagline: "어두운 날에도 방향을 비춰 주는 사랑",
    desc: "서로의 방향을 비춰 주는 단단한 관계를 만드는 유형입니다. 설렘, 회복, 일상, 미래의 네 가지 힘이 고르게 강해서 어려운 시기에도 흔들리지 않아요. 지금의 습관을 유지하되 스스로에게 지나치게 엄격해지지 않는 것이 중요합니다.",
    keywords: ["균형 잡힌 사랑", "단단함", "방향"],
    habit: "완벽을 기대하며 스스로를 몰아붙이는 습관",
    boost: "잘하고 있다는 사실을 서로에게 자주 말해 주세요. 쉬어 가는 날도 관계를 지키는 일의 일부예요." }
];
function loveShelfTier(total) {
  let t = LOVESHELF_TIERS[0];
  LOVESHELF_TIERS.forEach(x => { if (total >= x.min) t = x; });
  return t;
}

// 영역별 처방 (가장 약한 영역 / 가장 강한 영역)
const LOVESHELF_AREA_ADVICE = {
  spark: {
    cause: "설렘이 줄면 곧 끝났다고 느끼는 마음",
    tip: "한 달에 한 번 둘이 처음 해 보는 것(새로운 장소, 새로운 음식, 새로운 취미)을 정해 보세요. 설렘은 '새로움'에서 다시 자라요.",
    strength: "설렘을 이어 가는 센스 덕분에 관계에 늘 새로운 불씨가 있어요."
  },
  repair: {
    cause: "싸운 뒤 침묵하거나 같은 문제가 반복되는 패턴",
    tip: "싸운 뒤 24시간 안에 '내가 느낀 것'을 한 문장으로 말하는 규칙을 만들어 보세요. 해결보다 감정을 먼저 말하는 것이 시작이에요.",
    strength: "갈등 뒤에 다시 가까워지는 힘이 있어서 관계가 더 단단해져요."
  },
  daily: {
    cause: "일상 공유와 서로의 시간에 대한 존중이 부족한 것",
    tip: "하루 한 번, 짧게라도 '오늘 어땠어?'를 묻는 시간을 만들어 보세요. 평범한 대화가 가장 큰 신뢰가 돼요.",
    strength: "평범한 하루를 함께 보내는 힘이 커서 편안한 관계를 만들어요."
  },
  future: {
    cause: "미래와 현실 이야기를 피하는 습관",
    tip: "'1년 뒤에 우리가 함께하고 싶은 일 세 가지'를 서로 적어 비교해 보세요. 같은 방향을 확인하는 것만으로도 불안이 줄어요.",
    strength: "같은 방향을 바라보는 힘이 있어서 오래가는 관계의 기반이 돼요."
  }
};

// ============================================
// 채점
// ============================================

function loveShelfHash(str) {
  let h = 2166136261;
  for (let i = 0; i < str.length; i++) { h ^= str.charCodeAt(i); h = Math.imul(h, 16777619); }
  return h >>> 0;
}

function calcLoveShelf(answers) {
  // answers = [{ area: "spark", pts: 2 }, ...] 12개
  const total = answers.reduce((s, a) => s + (a ? a.pts : 0), 0);
  const areas = {};
  Object.keys(LOVESHELF_AREAS).forEach(k => areas[k] = { score: 0, count: 0, max: 0 });
  answers.forEach(a => { if (a && areas[a.area]) { areas[a.area].score += a.pts; areas[a.area].count += 1; } });
  Object.values(areas).forEach(v => { v.max = v.count * 3; v.pct = v.max ? Math.round((v.score / v.max) * 100) : 0; });

  const order = ["spark", "repair", "daily", "future"];
  // 동점이면 응답 기반 고정 해시로 정해 특정 영역이 항상 약점으로 잡히는 편향을 없앤다
  const seed = answers.map(x => x ? x.pts : 0).join("");
  const sorted = order.slice().sort((a, b) => areas[a].pct - areas[b].pct || loveShelfHash(a + seed) - loveShelfHash(b + seed));
  const weakest = sorted[0];
  const strongest = sorted[sorted.length - 1];

  const tier = loveShelfTier(total);
  const power = Math.round((total / 36) * 100);
  return {
    total, power, tier, areas, weakest, strongest,
    weakInfo: LOVESHELF_AREA_ADVICE[weakest], strongInfo: LOVESHELF_AREA_ADVICE[strongest],
    balanced: areas[strongest].pct - areas[weakest].pct <= 22
  };
}

if (typeof module !== 'undefined') {
  module.exports = { LOVESHELF_AREAS, LOVESHELF_QUESTIONS, LOVESHELF_TIERS, LOVESHELF_AREA_ADVICE, loveShelfTier, calcLoveShelf, loveShelfHash };
}
