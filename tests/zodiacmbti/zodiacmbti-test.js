// ============================================
// 별자리 × MBTI 궁합
// ============================================
// 두 사람의 (별자리, MBTI)를 입력받아 궁합 %를 계산한다. 재미용 점괘이며 과학적 근거는 없다.
// - 별자리 점수(Z): 두 별자리의 각도 관계(어스펙트)로 계산 (같은 별자리/세미섹스타일/섹스타일/스퀘어/트라인/퀸컹스/오포지션)
// - MBTI 점수(M): 네 글자 관계(S/N 일치, E/I·T/F 보완, J/P 일치 등) + 자주 언급되는 "찰떡 조합" 가산점
// - 최종 %: (Z+M)/2 를 평균 75%로 옮기고 퍼짐을 넓혀(상단은 완만하게 압축) 분포를 만듦
// - 입력 순서와 무관하게 같은 결과가 나온다(대칭), 입력값은 서버에 저장하지 않는다.
// 하위 점수(소통·감정·열정·안정)는 요소(불·흙·공기·물)와 글자 관계에서 파생한 가벼운 휴리스틱이다.
// ============================================

const ZM_SIGNS = [
  { name: "양자리",     symbol: "♈", range: "3/21~4/19",  element: "fire",  mode: "cardinal", key: "솔직하고 추진력 강한 불꽃" },
  { name: "황소자리",   symbol: "♉", range: "4/20~5/20",  element: "earth", mode: "fixed",    key: "느긋하고 믿음직한 안정파" },
  { name: "쌍둥이자리", symbol: "♊", range: "5/21~6/21",  element: "air",   mode: "mutable",  key: "호기심 많고 말 잘하는 재간둥이" },
  { name: "게자리",     symbol: "♋", range: "6/22~7/22",  element: "water", mode: "cardinal", key: "다정하고 보호본능 강한 감성파" },
  { name: "사자자리",   symbol: "♌", range: "7/23~8/22",  element: "fire",  mode: "fixed",    key: "당당하고 따뜻한 무대의 중심" },
  { name: "처녀자리",   symbol: "♍", range: "8/23~9/22",  element: "earth", mode: "mutable",  key: "꼼꼼하고 분석적인 완벽파" },
  { name: "천칭자리",   symbol: "♎", range: "9/23~10/23", element: "air",   mode: "cardinal", key: "균형과 조화를 사랑하는 매너파" },
  { name: "전갈자리",   symbol: "♏", range: "10/24~11/22",element: "water", mode: "fixed",    key: "깊고 강렬한 집중력의 소유자" },
  { name: "사수자리",   symbol: "♐", range: "11/23~12/21",element: "fire",  mode: "mutable",  key: "자유롭고 낙천적인 탐험가" },
  { name: "염소자리",   symbol: "♑", range: "12/22~1/19", element: "earth", mode: "cardinal", key: "성실하고 책임감 있는 노력파" },
  { name: "물병자리",   symbol: "♒", range: "1/20~2/18",  element: "air",   mode: "fixed",    key: "독특하고 독립적인 아이디어꾼" },
  { name: "물고기자리", symbol: "♓", range: "2/19~3/20",  element: "water", mode: "mutable",  key: "감수성 풍부한 몽상가" }
];

const ZM_ELEMENTS = {
  fire:  { name: "불", emoji: "🔥", color: "#E8683A" },
  earth: { name: "흙", emoji: "🌿", color: "#7A9B57" },
  air:   { name: "공기", emoji: "💨", color: "#5BA8D8" },
  water: { name: "물", emoji: "💧", color: "#4A7FC8" }
};

const ZM_MBTI = {
  ISTJ: { nick: "원칙주의 현실가",   line: "약속은 꼭 지키는 든든한 믿음직 타입" },
  ISFJ: { nick: "다정한 수호자",     line: "말없이 챙겨 주는 세심한 케어러" },
  INFJ: { nick: "통찰력 있는 조언자", line: "조용하지만 마음을 꿰뚫어 보는 타입" },
  INTJ: { nick: "냉철한 전략가",     line: "계획과 목표가 분명한 설계자" },
  ISTP: { nick: "쿨한 해결사",       line: "말수는 적어도 손은 빠른 실행가" },
  ISFP: { nick: "감성 자유영혼",     line: "자기만의 감성을 가진 부드러운 예술가" },
  INFP: { nick: "이상주의 몽상가",   line: "마음속 이야기가 풍부한 따뜻한 이상가" },
  INTP: { nick: "호기심 탐구자",     line: "생각이 꼬리에 꼬리를 무는 아이디어 뱅크" },
  ESTP: { nick: "승부사 행동파",     line: "일단 부딪히고 보는 모험가" },
  ESFP: { nick: "분위기 메이커",     line: "어디서나 파티를 만드는 인싸" },
  ENFP: { nick: "열정 스파크",       line: "사람과 가능성에 반짝이는 에너자이저" },
  ENTP: { nick: "재치 있는 토론가",  line: "판을 흔들며 노는 아이디어 장난꾸러기" },
  ESTJ: { nick: "책임감 있는 관리자", line: "질서와 책임으로 이끄는 리더" },
  ESFJ: { nick: "사교적인 챙김이",   line: "모두를 챙기는 따뜻한 분위기 리더" },
  ENFJ: { nick: "다정한 카리스마",   line: "사람을 성장시키는 지도자" },
  ENTJ: { nick: "추진력 대장",       line: "목표를 향해 돌진하는 통솔자" }
};

// ---- 날짜 → 별자리 (월/일만 사용) ----
function zmSignIndexFromDate(month, day) {
  const cut = [[1, 20], [2, 19], [3, 21], [4, 20], [5, 21], [6, 22], [7, 23], [8, 23], [9, 23], [10, 24], [11, 23], [12, 22]];
  // cut[m-1] = 해당 월에서 다음 별자리로 넘어가는 날. 월별 (이전 별자리, 다음 별자리)
  const table = [[9, 10], [10, 11], [11, 0], [0, 1], [1, 2], [2, 3], [3, 4], [4, 5], [5, 6], [6, 7], [7, 8], [8, 9]];
  const [before, after] = table[month - 1];
  return day >= cut[month - 1][1] ? after : before;
}

// ---- 별자리 점수 ----
const ZM_ASPECTS = [
  { name: "같은 별자리",   score: 72, text: "같은 별자리라 서로를 거울처럼 이해해요. 좋은 점도 단점도 닮아서 공감도 부딪힘도 두 배예요." },
  { name: "이웃 별자리",   score: 58, text: "바로 옆 별자리라 비슷한 듯 다른 결을 가졌어요. 서로에게 배울 점이 많은 사이예요." },
  { name: "자극을 주는 사이", score: 84, text: "서로 좋은 자극을 주는 궁합이에요. 노력하면 시너지가 확실히 나는 관계예요." },
  { name: "긴장감 있는 사이", score: 52, text: "긴장감이 있는 관계예요. 부딪히는 만큼 서로를 성장시키는 자극제가 돼요." },
  { name: "같은 원소의 사이", score: 94, text: "같은 원소를 나누는 최고의 궁합이에요. 말하지 않아도 통하는 순간이 많아요." },
  { name: "조율이 필요한 사이", score: 56, text: "서로 낯선 부분이 있어 조율이 필요해요. 대화로 맞춰 가면 새로운 면을 발견해요." },
  { name: "정반대로 끌리는 사이", score: 80, text: "정반대라서 강하게 끌리는 관계예요. 서로의 빈자리를 채워 주는 보완형이에요." }
];

function zmAspectIndex(i, j) {
  const d = Math.abs(i - j);
  return Math.min(d, 12 - d);
}

// ---- MBTI 점수 ----
// 자주 언급되는 "찰떡 조합"(대칭으로 사용)
const ZM_GOLDEN = [
  ["ENFP", "INFJ"], ["ENFP", "INTJ"], ["ENTP", "INFJ"], ["ENTP", "INTJ"], ["ENFJ", "INFP"], ["ENFJ", "ISFP"],
  ["ENTJ", "INFP"], ["ENTJ", "INTP"], ["ESTJ", "INTP"], ["ESTJ", "ISTP"], ["ESTJ", "ISFP"], ["ESFJ", "ISFP"],
  ["ESFJ", "ISTP"], ["ISFJ", "ESFP"], ["ISFJ", "ESTP"], ["ISTJ", "ESFP"], ["ISTJ", "ESTP"]
];
const ZM_GOLDEN_SET = new Set(ZM_GOLDEN.map(p => p.slice().sort().join("-")));

function zmMbtiParts(a, b) {
  return {
    sn: a[1] === b[1],        // 같은 S/N
    ei: a[0] === b[0],        // 같은 E/I
    tf: a[2] === b[2],        // 같은 T/F
    jp: a[3] === b[3],        // 같은 J/P
    golden: ZM_GOLDEN_SET.has([a, b].sort().join("-"))
  };
}

function zmMbtiScore(a, b) {
  const p = zmMbtiParts(a, b);
  let s = 44;
  s += p.sn ? 16 : -6;
  s += p.ei ? 4 : 6;
  s += p.tf ? 5 : 8;
  s += p.jp ? 6 : 3;
  if (p.golden) s += 18;
  return Math.max(0, Math.min(100, s));
}

// ---- 최종 점수 ----
// raw(별자리·MBTI 평균)의 전체 조합 평균은 약 68.7이다. 이를 평균 75%로 옮기고(ZM_PERCENT_TARGET),
// 퍼짐을 1.3배로 넓힌 뒤, 88을 넘는 구간은 0.55배로 눌러 99%에 몰리지 않게 한다. 하한은 45%.
const ZM_RAW_MEAN = 68.7;
const ZM_PERCENT_TARGET = 75;
const ZM_PERCENT_STRETCH = 1.3;
const ZM_PERCENT_KNEE = 88;
const ZM_PERCENT_KNEE_SLOPE = 0.55;
const ZM_PERCENT_FLOOR = 45;
function zmFinalPercent(raw) {
  let v = ZM_PERCENT_TARGET + (raw - ZM_RAW_MEAN) * ZM_PERCENT_STRETCH;
  if (v > ZM_PERCENT_KNEE) v = ZM_PERCENT_KNEE + (v - ZM_PERCENT_KNEE) * ZM_PERCENT_KNEE_SLOPE;
  return Math.max(ZM_PERCENT_FLOOR, Math.min(99, Math.round(v)));
}

// ---- 문구 ----
const ZM_TIERS = [
  { img: "images/zodiacmbti/t0.webp", min: 92, emoji: "✨", name: "천생연분", tagline: "별도 MBTI도 둘의 편이에요", desc: "운명 같은 조합이에요. 서로를 이해하는 속도가 빠르고, 함께 있을수록 편안해져요.", color: "#E8683A" },
  { img: "images/zodiacmbti/t1.webp", min: 82, emoji: "💞", name: "찰떡 케미", tagline: "같이 있으면 자연스럽게 맞아요", desc: "잘 맞는 부분이 많은 케미예요. 큰 노력 없이도 대화가 이어지고 서로에게 힘이 돼요.", color: "#E8607F" },
  { img: "images/zodiacmbti/t2.webp", min: 72, emoji: "🙂", name: "잘 맞는 짝꿍", tagline: "맞는 곳은 맞고, 다른 곳은 재밌어요", desc: "기본 궁합이 좋은 사이예요. 다른 점은 서로의 새로운 면을 알려 주는 포인트가 돼요.", color: "#7A9B57" },
  { img: "images/zodiacmbti/t3.webp", min: 62, emoji: "🌱", name: "알아갈수록 좋은 사이", tagline: "천천히 서로를 알아 가면 깊어져요", desc: "처음엔 낯선 부분도 있지만 알아갈수록 깊어지는 조합이에요. 서로의 방식을 배우는 시간이 필요해요.", color: "#4A9DD0" },
  { img: "images/zodiacmbti/t4.webp", min: 0,  emoji: "🎭", name: "반전 매력 케미", tagline: "다름이 오히려 새로운 매력이에요", desc: "다른 점이 많아서 오히려 배울 점이 많은 조합이에요. 서로의 다름을 인정하면 오래 가는 사이가 될 수 있어요.", color: "#8E6BB8" }
];
function zmTier(percent) { return ZM_TIERS.find(t => percent >= t.min); }

const ZM_ELEMENT_PAIRS = {
  air_air:     { text: "생각과 대화가 쉼 없이 오가는 조합이에요. 재미있는 얘기는 끝이 없지만 행동으로 옮기는 건 가끔 미뤄져요.", acts: ["밤새 수다 떠는 카페 데이트", "전시·강연 같이 보기", "즉흥 당일치기 여행"] },
  air_earth:   { text: "아이디어와 현실감이 만나는 조합이에요. 한쪽은 띄우고 한쪽은 잡아 줘서 균형이 좋아요.", acts: ["같이 계획 세워 여행 가기", "새로운 맛집 탐방", "취미 클래스 함께 듣기"] },
  air_fire:    { text: "불에 바람이 닿는 조합이에요. 서로를 부추겨 더 신나게 만드는 시너지가 있어요.", acts: ["페스티벌·공연 보러 가기", "새로운 액티비티 도전", "즉흥 드라이브"] },
  air_water:   { text: "머리와 마음이 만나는 조합이에요. 이성과 감성이 섞여 서로를 새롭게 이해하게 돼요.", acts: ["영화 보고 깊은 대화 나누기", "서점 데이트", "조용한 바다 산책"] },
  earth_earth: { text: "안정감과 신뢰가 쌓이는 조합이에요. 느리지만 단단하게 깊어지는 사이예요.", acts: ["맛있는 집밥 같이 해 먹기", "정원·식물 가꾸기", "계획적인 국내 여행"] },
  earth_fire:  { text: "열정과 현실감이 만나는 조합이에요. 추진력과 끈기가 합쳐지면 무엇이든 해내요.", acts: ["등산·러닝 같이 하기", "목표 함께 세우기", "요리 대결"] },
  earth_water: { text: "땅이 물을 품는 조합이에요. 서로에게 편안한 안식처가 되어 주는 따뜻한 사이예요.", acts: ["집에서 영화 정주행", "베이킹·쿠킹 데이트", "온천·휴양 여행"] },
  fire_fire:   { text: "열정이 두 배인 조합이에요. 함께 있으면 불꽃이 튀지만 식는 속도도 빠를 수 있어요.", acts: ["클라이밍·서핑 같은 액티비티", "즉흥 여행", "새로운 취미 동시 도전"] },
  fire_water:  { text: "불과 물이 만나는 조합이에요. 서로 정반대지만 균형을 맞추면 깊고 뜨거운 관계가 돼요.", acts: ["야경 보며 대화하기", "바다 캠핑", "함께 운동 후 따뜻한 국물"] },
  water_water: { text: "감정이 깊게 통하는 조합이에요. 마음을 잘 알아주는 대신 서로 감정에 휩쓸리기 쉬워요.", acts: ["잔잔한 음악 듣기", "손편지 주고받기", "바닷가·호수 산책"] }
};
function zmElementPairKey(e1, e2) { return [e1, e2].sort().join("_"); }

const ZM_DIM_TEXT = {
  sn: {
    same: { good: "같은 방식으로 세상을 봐서 말이 잘 통해요", care: null },
    diff: { good: "서로 다른 관점이 시야를 넓혀 줘요", care: "한쪽은 구체적, 한쪽은 큰 그림을 말해서 오해가 생기기 쉬워요" }
  },
  ei: {
    sameE: { good: "함께 있으면 에너지가 폭발해요", care: "둘 다 말하느라 조용히 쉬는 시간이 부족할 수 있어요" },
    sameI: { good: "조용한 시간을 서로 존중해 줘요", care: "둘 다 먼저 연락하지 않아서 소원해질 수 있어요" },
    diff:  { good: "한쪽이 이끌고 한쪽이 받아 주는 균형이 좋아요", care: "에너지를 충전하는 방식이 달라서 이해가 필요해요" }
  },
  tf: {
    sameT: { good: "합리적으로 문제를 풀어 가는 대화가 편해요", care: "감정 표현이 부족해 차갑게 느껴질 수 있어요" },
    sameF: { good: "서로의 마음을 잘 알아주고 공감해 줘요", care: "감정이 커지면 둘 다 상처받기 쉬워요" },
    diff:  { good: "논리와 공감이 서로를 보완해요", care: "말투를 해석하는 방식이 달라서 서운해질 수 있어요" }
  },
  jp: {
    sameJ: { good: "계획과 약속이 잘 맞아요", care: "둘 다 고집이 세면 부딪힐 수 있어요" },
    sameP: { good: "즉흥 여행과 놀이가 정말 잘 맞아요", care: "약속과 마무리가 흐지부지될 수 있어요" },
    diff:  { good: "한쪽은 계획, 한쪽은 유연해서 서로 보완돼요", care: "계획 vs 즉흥에서 충돌이 생길 수 있어요" }
  }
};

const ZM_SUB_META = {
  comm:      { name: "소통", emoji: "💬", tip: "서운한 일은 바로 말로 꺼내 보세요. 짧아도 직접 말하는 게 오해를 줄여 줘요." },
  emotion:   { name: "감정", emoji: "💗", tip: "하루 한 번 서로의 기분을 물어보세요. 감정을 확인하는 것만으로도 거리가 줄어들어요." },
  passion:   { name: "열정", emoji: "🔥", tip: "새로운 활동을 같이 해 보세요. 함께하는 경험이 설렘을 키워 줘요." },
  stability: { name: "안정", emoji: "🌳", tip: "작은 약속부터 꾸준히 지켜 보세요. 예측 가능한 습관이 신뢰를 쌓아 줘요." }
};

// ---- 메인 계산 ----
function calcZodiacMbti(A, B) {
  // A, B = { mbti: "ENFP", sign: 0~11 }
  const sa = ZM_SIGNS[A.sign], sb = ZM_SIGNS[B.sign];
  const d = zmAspectIndex(A.sign, B.sign);
  const aspect = ZM_ASPECTS[d];
  const Z = aspect.score;
  const parts = zmMbtiParts(A.mbti, B.mbti);
  const M = zmMbtiScore(A.mbti, B.mbti);
  const raw = (Z + M) / 2;
  const percent = zmFinalPercent(raw);
  const tier = zmTier(percent);

  const eKey = zmElementPairKey(sa.element, sb.element);
  const ep = ZM_ELEMENT_PAIRS[eKey];
  const els = [sa.element, sb.element];
  const count = el => els.filter(e => e === el).length;

  const clamp = v => Math.max(35, Math.min(99, Math.round(v)));
  const subs = {
    comm:      clamp(percent + (parts.sn ? 8 : -6) + (d === 2 || d === 4 ? 4 : d === 3 ? -4 : 0)),
    emotion:   clamp(percent + (parts.tf ? 3 : -2) + count("water") * 4 + (d === 0 || d === 6 ? 2 : 0)),
    passion:   clamp(percent + count("fire") * 6 + (els.includes("fire") && els.includes("air") ? 4 : 0) - (count("earth") === 2 ? 6 : 0)),
    stability: clamp(percent + (parts.jp ? 8 : -4) + count("earth") * 5 - (d === 3 ? 6 : 0))
  };
  const subOrder = Object.keys(subs).sort((x, y) => subs[y] - subs[x]);
  const best = subOrder[0], worst = subOrder[subOrder.length - 1];

  // 강점/주의 문구 (글자 관계에서 모음)
  const goods = [], cares = [];
  const push = (dim, key) => { const t = ZM_DIM_TEXT[dim][key]; if (t.good) goods.push(t.good); if (t.care) cares.push(t.care); };
  push("sn", parts.sn ? "same" : "diff");
  push("ei", parts.ei ? (A.mbti[0] === "E" ? "sameE" : "sameI") : "diff");
  push("tf", parts.tf ? (A.mbti[2] === "T" ? "sameT" : "sameF") : "diff");
  push("jp", parts.jp ? (A.mbti[3] === "J" ? "sameJ" : "sameP") : "diff");
  if (parts.golden) goods.unshift("흔히 '찰떡'으로 꼽히는 MBTI 조합이에요");

  return {
    percent, tier, mbtiScore: M, zodiacScore: Z, raw,
    aspect: { index: d, name: aspect.name, text: aspect.text },
    elementPair: { key: eKey, text: ep.text, acts: ep.acts, e1: ZM_ELEMENTS[sa.element], e2: ZM_ELEMENTS[sb.element] },
    subs, bestSub: best, worstSub: worst, tip: ZM_SUB_META[worst].tip,
    strengths: goods.slice(0, 3), cautions: cares.slice(0, 3),
    people: [
      { sign: sa, mbti: A.mbti, mbtiInfo: ZM_MBTI[A.mbti] },
      { sign: sb, mbti: B.mbti, mbtiInfo: ZM_MBTI[B.mbti] }
    ],
    golden: parts.golden
  };
}

if (typeof module !== 'undefined') {
  module.exports = {
    ZM_SIGNS, ZM_ELEMENTS, ZM_MBTI, ZM_ASPECTS, ZM_GOLDEN, ZM_TIERS, ZM_ELEMENT_PAIRS, ZM_DIM_TEXT, ZM_SUB_META,
    ZM_RAW_MEAN, ZM_PERCENT_TARGET, ZM_PERCENT_STRETCH, ZM_PERCENT_KNEE, ZM_PERCENT_KNEE_SLOPE, ZM_PERCENT_FLOOR,
    zmSignIndexFromDate, zmAspectIndex, zmMbtiParts, zmMbtiScore, zmFinalPercent, zmTier, zmElementPairKey, calcZodiacMbti
  };
}
