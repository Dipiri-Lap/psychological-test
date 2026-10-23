// ============================================
// 그림으로 보는 내 마음 — 마음의 풍경 테스트
// ============================================
// 구조: 6개 장면, 장면마다 일러스트 4장 중 가장 끌리는 1장을 고른다. 글자 설명 없이 "그림에 끌리는 직감"으로 고르는 투사형 재미 테스트.
// 6유형(마음의 풍경): F 고요한 숲 / S 깊은 바다 / C 모닥불 / M 높은 산 / G 봄 정원 / N 밤하늘
// 장면마다 6유형 중 4유형만 등장하고, 6장면 전체에서 유형별로 정확히 4번씩 등장해 특정 유형이 유리하지 않다.
// (장면별 제외 쌍: 1={F,S} 2={C,M} 3={G,N} 4={F,C} 5={S,G} 6={M,N})
// 결과: 가장 많이 고른 유형(주) + 두 번째(보조). 동점이면 응답 내용에서 만든 고정 해시 순서로 정한다.
//   ("먼저 고른 유형"을 우선하면 1번 장면에 안 나오는 유형이 불리해져서, 같은 응답이면 항상 같은 결과가 나오되 유형 간에는 공평하게 한다.)
// 심리학적 투사검사가 아니라 재미로 보는 테스트이다.
// ============================================

const MINDSCAPE_QUESTIONS = [
  {
    id: 1, emoji: "🛋️",
    question: "마음이 쉬고 싶을 때, 지금 가장 끌리는 곳은?",
    choices: [
      { img: "images/mindscape/q1_C.webp", cap: "모닥불 앞", type: "C" },
      { img: "images/mindscape/q1_M.webp", cap: "산 정상 전망대", type: "M" },
      { img: "images/mindscape/q1_G.webp", cap: "꽃 핀 정원 벤치", type: "G" },
      { img: "images/mindscape/q1_N.webp", cap: "별이 쏟아지는 언덕", type: "N" }
    ]
  },
  {
    id: 2, emoji: "🚶",
    question: "혼자 걷는다면, 가장 걷고 싶은 길은?",
    choices: [
      { img: "images/mindscape/q2_F.webp", cap: "안개 낀 숲길", type: "F" },
      { img: "images/mindscape/q2_S.webp", cap: "파도치는 해안길", type: "S" },
      { img: "images/mindscape/q2_G.webp", cap: "꽃이 핀 오솔길", type: "G" },
      { img: "images/mindscape/q2_N.webp", cap: "달빛 아래 들판길", type: "N" }
    ]
  },
  {
    id: 3, emoji: "🏠",
    question: "나를 위한 집을 짓는다면, 어떤 집?",
    choices: [
      { img: "images/mindscape/q3_F.webp", cap: "숲속 오두막", type: "F" },
      { img: "images/mindscape/q3_S.webp", cap: "바닷가 등대 집", type: "S" },
      { img: "images/mindscape/q3_C.webp", cap: "벽난로가 있는 집", type: "C" },
      { img: "images/mindscape/q3_M.webp", cap: "절벽 위 산장", type: "M" }
    ]
  },
  {
    id: 4, emoji: "🌇",
    question: "지친 하루 끝, 눈앞에 펼쳐지면 좋을 풍경은?",
    choices: [
      { img: "images/mindscape/q4_S.webp", cap: "잔잔한 호수", type: "S" },
      { img: "images/mindscape/q4_M.webp", cap: "눈 덮인 봉우리", type: "M" },
      { img: "images/mindscape/q4_G.webp", cap: "유리 온실 정원", type: "G" },
      { img: "images/mindscape/q4_N.webp", cap: "은하수가 흐르는 하늘", type: "N" }
    ]
  },
  {
    id: 5, emoji: "🖼️",
    question: "벽에 걸어 둔다면, 마음이 가는 그림은?",
    choices: [
      { img: "images/mindscape/q5_F.webp", cap: "이끼 낀 오래된 숲", type: "F" },
      { img: "images/mindscape/q5_C.webp", cap: "불 켜진 마을의 저녁", type: "C" },
      { img: "images/mindscape/q5_M.webp", cap: "구름 위 산 능선", type: "M" },
      { img: "images/mindscape/q5_N.webp", cap: "하늘에 번지는 오로라", type: "N" }
    ]
  },
  {
    id: 6, emoji: "🧺",
    question: "소중한 사람과 함께라면, 가고 싶은 곳은?",
    choices: [
      { img: "images/mindscape/q6_F.webp", cap: "숲속 피크닉", type: "F" },
      { img: "images/mindscape/q6_S.webp", cap: "바다 위 작은 배", type: "S" },
      { img: "images/mindscape/q6_C.webp", cap: "캠프파이어 둘레", type: "C" },
      { img: "images/mindscape/q6_G.webp", cap: "꽃밭 소풍", type: "G" }
    ]
  }
];

// ============================================
// 6가지 마음의 풍경
// ============================================
// match: 서로 마음이 잘 통하는 풍경 / needs: 이 풍경의 마음이 지칠 때 필요한 것

const MINDSCAPE_TYPES = {
  F: {
    emoji: "🌲", name: "고요한 숲", color: "#4F8A6B", match: "G",
    tagline: "조용한 곳에서 마음이 단단해지는 사람",
    desc: "시끄러운 곳보다 조용히 숨 쉴 수 있는 곳에서 마음이 가장 편안한 풍경입니다. 말수는 적어도 생각이 깊고, 한 번 마음을 연 사람에게는 오래도록 변함없이 곁을 내줘요. 혼자만의 시간이 곧 충전이라, 사람 사이에서 지치면 숲처럼 조용한 시간이 꼭 필요합니다.",
    keywords: ["차분함", "깊은 생각", "혼자만의 시간"],
    traits: ["말하기 전에 한 번 더 생각해요", "혼자 있는 시간에서 에너지를 얻어요", "소수의 사람과 깊게 지내는 편이에요"],
    shadows: ["속마음을 말하지 않아 오해받기 쉬워요", "도움이 필요한 순간에도 혼자 견디려 해요", "새로운 사람 앞에서 마음 여는 데 시간이 걸려요"],
    needs: "아무에게도 방해받지 않는 하루 한 시간. 사람 약속 사이에 '빈 시간'을 미리 넣어 두세요.",
    saying: "\"괜찮아, 조금만 혼자 있다가 올게.\"",
    together: "함께 걷고 말없이 있어도 편한 사람이 가장 잘 맞아요."
  },
  S: {
    emoji: "🌊", name: "깊은 바다", color: "#3E78B2", match: "N",
    tagline: "겉은 잔잔해도 속에 깊이가 있는 사람",
    desc: "감정의 폭이 넓고 깊은 풍경입니다. 평소에는 잔잔해 보여도 마음속에는 파도와 심연이 함께 있어서, 영화 한 장면이나 노래 한 소절에도 크게 흔들리곤 해요. 공감 능력이 뛰어나 주변 사람들의 기분을 잘 알아채지만, 그만큼 감정이 쉽게 휩쓸리기도 합니다.",
    keywords: ["깊은 감수성", "공감", "몰입"],
    traits: ["분위기와 사람의 감정을 빨리 읽어요", "좋아하는 것에는 깊이 몰입해요", "감정을 글이나 음악으로 풀 때가 많아요"],
    shadows: ["남의 감정까지 가져와서 지칠 수 있어요", "감정이 크게 일 때 생각이 꼬리를 물어요", "겉으로는 괜찮은 척하다가 한꺼번에 무너져요"],
    needs: "감정을 밖으로 꺼낼 통로. 일기, 산책, 음악처럼 나만의 '파도 빼기' 방법을 하나 정해 두세요.",
    saying: "\"지금 마음이 좀 일렁이는데, 잠깐 들어 줄래?\"",
    together: "감정을 서두르지 않고 기다려 주는 사람이 가장 잘 맞아요."
  },
  C: {
    emoji: "🔥", name: "모닥불", color: "#E8683A", match: "M",
    tagline: "곁에 있으면 따뜻해지는 사람",
    desc: "사람들을 자연스럽게 모으고 따뜻하게 만드는 풍경입니다. 함께 웃고 이야기 나누는 시간에서 에너지를 얻고, 분위기가 가라앉으면 먼저 불씨를 살리는 사람이에요. 열정이 넘치는 만큼 쉬지 않고 타오르다 갑자기 꺼져 버릴 때가 있어서 불씨를 아끼는 연습이 필요합니다.",
    keywords: ["따뜻함", "열정", "사람을 모으는 힘"],
    traits: ["사람들과 함께 있을 때 에너지가 올라가요", "분위기를 밝게 만드는 말을 잘해요", "좋아하는 일에는 바로 불이 붙어요"],
    shadows: ["다른 사람을 챙기다 나를 못 챙겨요", "열정이 식으면 한동안 무기력해져요", "사람이 없는 시간이 길면 허전해져요"],
    needs: "불을 꺼도 되는 시간. '오늘은 아무도 안 챙기는 날'을 일주일에 한 번 정해 두세요.",
    saying: "\"오늘은 나도 좀 쉬어 가도 될까?\"",
    together: "목표가 있고 꾸준히 걸어가는 사람과 함께하면 불꽃이 더 멀리 가요."
  },
  M: {
    emoji: "🏔️", name: "높은 산", color: "#6B7FA8", match: "C",
    tagline: "오르는 만큼 단단해지는 사람",
    desc: "목표를 정하면 묵묵히 올라가는 끈기의 풍경입니다. 흔들려 보여도 중심은 쉽게 무너지지 않고, 어려움이 닥치면 오히려 차분해져요. 책임감이 강해 주변에서 기댈 수 있는 사람으로 여겨지지만, 정작 본인이 기댈 곳은 잘 찾지 못할 때가 있어요.",
    keywords: ["끈기", "책임감", "목표 지향"],
    traits: ["한번 정한 목표는 끝까지 가요", "위기 상황에서 오히려 침착해져요", "약속과 책임을 무겁게 생각해요"],
    shadows: ["힘들어도 힘들다고 말하지 못해요", "스스로에게 기준이 높아 자주 지쳐요", "쉬는 것에 죄책감을 느껴요"],
    needs: "정상 말고 쉼터. 목표와 상관없는 휴식 시간을 일정표에 먼저 적어 두세요.",
    saying: "\"오늘은 목표 없이 쉬는 날로 할게.\"",
    together: "따뜻하게 말을 걸어 주고 쉬어 가도 된다고 말해 주는 사람이 필요해요."
  },
  G: {
    emoji: "🌸", name: "봄 정원", color: "#E07BA0", match: "F",
    tagline: "돌보고 가꾸며 피어나는 사람",
    desc: "사람과 관계를 정성스럽게 가꾸는 풍경입니다. 작은 변화도 알아채고, 필요한 순간에 물 한 컵 건네는 섬세함이 있어요. 주변이 편안해지도록 조율하는 데 능하지만, 갈등을 피하려고 내 마음을 눌러 둘 때가 많습니다.",
    keywords: ["돌봄", "조화", "섬세함"],
    traits: ["다른 사람의 변화를 빨리 알아채요", "모두가 편안한 분위기를 좋아해요", "관계를 오래 정성스럽게 이어 가요"],
    shadows: ["갈등이 싫어서 내 의견을 삼켜요", "거절을 못해서 일을 떠안아요", "내가 시들어 가는 줄 모르고 계속 가꿔요"],
    needs: "나에게 주는 물과 햇볕. 하루에 하나, 오직 나를 위한 작은 일을 먼저 하세요.",
    saying: "\"이번엔 내가 원하는 쪽으로 해도 될까?\"",
    together: "내 마음을 먼저 물어봐 주는 사람이 가장 좋은 정원사예요."
  },
  N: {
    emoji: "🌌", name: "밤하늘", color: "#7B6BC8", match: "S",
    tagline: "상상과 호기심이 별처럼 반짝이는 사람",
    desc: "머릿속에 늘 새로운 생각과 이야기가 떠다니는 풍경입니다. 호기심이 많아 아이디어가 샘솟고, 틀에 갇히는 걸 싫어해서 자유로운 분위기에서 가장 빛나요. 이상이 높은 만큼 현실과의 간극에서 지칠 수 있어서 상상을 현실로 옮기는 작은 습관이 도움이 됩니다.",
    keywords: ["호기심", "상상력", "자유로움"],
    traits: ["새로운 것에 호기심이 크고 아이디어가 많아요", "정해진 틀보다 자유로운 방식을 좋아해요", "의미와 이유를 중요하게 생각해요"],
    shadows: ["시작은 많은데 마무리가 어려워요", "생각이 많아 밤에 잠 못 드는 날이 있어요", "현실적인 일에서 쉽게 지쳐요"],
    needs: "별을 땅으로 옮기는 작은 단계. 아이디어마다 '오늘 할 한 가지'만 적어 두세요.",
    saying: "\"일단 이 아이디어, 한 가지만 해 볼게.\"",
    together: "상상을 비웃지 않고 같이 현실로 옮겨 주는 사람이 최고의 동행이에요."
  }
};

// ============================================
// 두 풍경이 합쳐질 때의 한 줄 (주 유형 + 보조 유형, 알파벳순 키)
// ============================================

const MINDSCAPE_COMBOS = {
  C_F: "고요한 숲 속에 모닥불이 켜진 풍경이에요. 사람 곁에서 따뜻하다가도 혼자만의 시간이 꼭 필요한 균형형이에요.",
  F_G: "숲 속에 봄 정원이 있는 풍경이에요. 조용하게 사람을 돌보는 다정한 사람이에요.",
  F_M: "산자락 숲 같은 풍경이에요. 말수는 적어도 묵묵히 해내는 믿음직한 사람이에요.",
  F_N: "숲 위로 별이 뜬 밤 풍경이에요. 조용한 곳에서 상상이 가장 잘 자라는 사람이에요.",
  F_S: "숲 속 깊은 호수 같은 풍경이에요. 깊이 생각하고 깊이 느끼는 사색가예요.",
  C_G: "모닥불 옆 봄 정원 같은 풍경이에요. 사람들을 따뜻하게 모으고 정성스럽게 챙기는 사람이에요.",
  C_M: "산 위에서 타오르는 불 같은 풍경이에요. 열정과 끈기를 함께 가진 추진력 있는 사람이에요.",
  C_N: "별 아래 캠프파이어 같은 풍경이에요. 함께 웃고 상상을 나누는 분위기 메이커예요.",
  C_S: "바닷가 모닥불 같은 풍경이에요. 따뜻하게 모으면서도 깊이 공감하는 사람이에요.",
  G_M: "산 아래 정원 같은 풍경이에요. 단단한 책임감으로 관계를 가꾸는 믿음직한 사람이에요.",
  G_N: "별빛 아래 정원 같은 풍경이에요. 섬세하게 돌보면서 자유로운 상상도 놓지 않는 사람이에요.",
  G_S: "물가에 핀 꽃밭 같은 풍경이에요. 사람의 감정을 깊이 헤아리는 다정한 사람이에요.",
  M_N: "산 위에서 올려다본 밤하늘 같은 풍경이에요. 큰 꿈을 세우고 그걸 향해 걸어가는 사람이에요.",
  M_S: "산 아래 깊은 호수 같은 풍경이에요. 겉은 단단하고 속은 깊은 사람이에요.",
  N_S: "별이 비친 밤바다 같은 풍경이에요. 상상과 감성이 풍부하게 흐르는 예술가형이에요."
};
function getMindscapeCombo(a, b) { return a === b ? null : (MINDSCAPE_COMBOS[[a, b].sort().join("_")] || null); }

// ============================================
// 채점
// ============================================

// 간단한 문자열 해시(결정적). 동점 처리에만 쓴다.
function mindscapeHash(str) {
  let h = 2166136261;
  for (let i = 0; i < str.length; i++) { h ^= str.charCodeAt(i); h = Math.imul(h, 16777619); }
  return h >>> 0;
}

function calcMindscape(answers) {
  // answers = ["C", "F", ...] 6개 (고른 이미지의 type, 응답 순서대로)
  const keys = Object.keys(MINDSCAPE_TYPES);
  const totals = {};
  keys.forEach(k => totals[k] = 0);
  answers.forEach(t => { if (totals[t] !== undefined) totals[t] += 1; });
  const n = answers.length || 1;
  const percentages = {};
  keys.forEach(k => percentages[k] = Math.round((totals[k] / n) * 100));
  const seed = answers.join("");
  const sorted = keys.slice().sort((a, b) => totals[b] !== totals[a] ? totals[b] - totals[a] : mindscapeHash(a + seed) - mindscapeHash(b + seed));
  const primary = sorted[0], secondary = sorted[1];
  return {
    totals, percentages, sorted, primary, secondary,
    primaryInfo: MINDSCAPE_TYPES[primary], secondaryInfo: MINDSCAPE_TYPES[secondary],
    gap: totals[primary] - totals[secondary],
    comboNote: getMindscapeCombo(primary, secondary),
    matchInfo: MINDSCAPE_TYPES[MINDSCAPE_TYPES[primary].match]
  };
}

if (typeof module !== 'undefined') {
  module.exports = { MINDSCAPE_QUESTIONS, MINDSCAPE_TYPES, MINDSCAPE_COMBOS, getMindscapeCombo, calcMindscape, mindscapeHash };
}
