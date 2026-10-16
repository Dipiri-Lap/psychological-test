// ============================================
// 내 정신연령은 몇 살? 정신연령 테스트
// ============================================
// 구조: 12문항 4지선다. 선택지마다 0~3점(0=아이 같음 … 3=어른·노년 같음).
// 총점(0~36)을 구간 변환표(MENTALAGE_CURVE)로 6~70세 나이로 환산한다.
//   - 선택지 나이를 단순 평균하면 25~35세로 몰려 극단 결과가 안 나오므로 총점→나이 변환표를 쓴다.
// 영역: 취향(🎧) · 생활(💸) · 소통(💬) · 멘탈(🧘) 4영역 × 3문항. 영역별 나이도 같은 변환표(점수×4)로 계산.
// 결과 구간(8개): 나이에 따라 B1~B8, 구간마다 이름·설명·이미지.
// 재미로 보는 테스트이며 실제 심리학적 "정신연령(IQ 환산)"과는 다르다.
// ============================================

const MENTALAGE_AREAS = {
  taste: { emoji: "🎧", name: "취향 나이", desc: "음악·취미·웃음 코드" },
  life:  { emoji: "💸", name: "생활 나이", desc: "소비·주말·밤 습관" },
  talk:  { emoji: "💬", name: "소통 나이", desc: "말투·연락·고민 상담" },
  mind:  { emoji: "🧘", name: "멘탈 나이", desc: "감정·책임감·여유" }
};

const MENTALAGE_QUESTIONS = [
  {
    id: 1, area: "taste", emoji: "🎵",
    question: "요즘 가장 자주 듣는 음악은?",
    choices: [
      { text: "🧸 동요, 애니 OST, 캐릭터 노래", pts: 0 },
      { text: "🔥 아이돌 최신곡, 유행하는 숏폼 챌린지 곡", pts: 1 },
      { text: "☕ 감성 발라드, 직접 정리한 인디 플레이리스트", pts: 2 },
      { text: "📻 옛날 가요, 클래식, 재즈, 라디오 사연 곡", pts: 3 }
    ]
  },
  {
    id: 2, area: "life", emoji: "💰",
    question: "월급날(또는 용돈 받는 날) 가장 먼저 하는 일은?",
    choices: [
      { text: "🍭 바로 간식과 장난감부터 사러 간다", pts: 0 },
      { text: "🛍️ 갖고 싶던 걸 질러서 인증샷을 남긴다", pts: 1 },
      { text: "🏦 고정 지출과 적금부터 챙긴다", pts: 2 },
      { text: "📒 가계부 정리하고 보험·연금까지 점검한다", pts: 3 }
    ]
  },
  {
    id: 3, area: "talk", emoji: "💬",
    question: "카톡을 보낼 때 나의 말투는?",
    choices: [
      { text: "ㅋㅋㅋㅋ 이모티콘 폭주, 맞춤법은 신경 안 쓴다", pts: 0 },
      { text: "줄임말과 신조어를 자연스럽게 섞어 쓴다", pts: 1 },
      { text: "깔끔한 문장에 존댓말을 정확하게 쓴다", pts: 2 },
      { text: "안부 인사부터 시작하고 문장부호까지 정확히 쓴다", pts: 3 }
    ]
  },
  {
    id: 4, area: "mind", emoji: "🙇",
    question: "누군가 내 실수를 지적하면?",
    choices: [
      { text: "😤 울컥하거나 삐쳐서 말이 줄어든다", pts: 0 },
      { text: "🙂 겉으론 웃고 속으론 오래 곱씹는다", pts: 1 },
      { text: "📝 인정하고 바로 고칠 방법을 찾는다", pts: 2 },
      { text: "😌 \"그럴 수 있지\" 하고 가볍게 넘긴다", pts: 3 }
    ]
  },
  {
    id: 5, area: "life", emoji: "🌤️",
    question: "주말 아침, 눈을 뜨면 나는?",
    choices: [
      { text: "📺 일어나자마자 만화나 유튜브부터 튼다", pts: 0 },
      { text: "📱 이불 속에서 폰을 보다 점심때쯤 일어난다", pts: 1 },
      { text: "🧹 평소처럼 일찍 일어나 집안일부터 한다", pts: 2 },
      { text: "🥾 새벽같이 일어나 산책이나 운동을 나간다", pts: 3 }
    ]
  },
  {
    id: 6, area: "mind", emoji: "😠",
    question: "짜증 나는 일이 생겼을 때 나는?",
    choices: [
      { text: "😭 바로 짜증이 나서 티가 난다", pts: 0 },
      { text: "💬 친구에게 하소연하거나 SNS에 푼다", pts: 1 },
      { text: "🧠 일단 참고 해결책부터 찾는다", pts: 2 },
      { text: "🍵 \"다 지나간다\" 하며 차 한 잔 마시고 넘긴다", pts: 3 }
    ]
  },
  {
    id: 7, area: "taste", emoji: "🎮",
    question: "시간이 나면 가장 하고 싶은 일은?",
    choices: [
      { text: "🧸 장난감·캐릭터 굿즈 구경하고 모으기", pts: 0 },
      { text: "🎮 게임이나 숏폼, 친구들과 신나게 놀기", pts: 1 },
      { text: "🏋️ 운동, 카페, 전시, 여행 계획 짜기", pts: 2 },
      { text: "🌱 텃밭, 낚시, 바둑, 뉴스 보며 쉬기", pts: 3 }
    ]
  },
  {
    id: 8, area: "talk", emoji: "📞",
    question: "모르는 번호로 전화가 오면?",
    choices: [
      { text: "😨 무서워서 못 받고 누군가에게 대신 받아 달라 한다", pts: 0 },
      { text: "🙅 안 받고 문자로 오면 그때 확인한다", pts: 1 },
      { text: "📞 받아서 용건을 확인한다", pts: 2 },
      { text: "😊 반갑게 받고 한참 이야기까지 나눈다", pts: 3 }
    ]
  },
  {
    id: 9, area: "talk", emoji: "🧭",
    question: "고민이 생기면 가장 먼저 상의하는 곳은?",
    choices: [
      { text: "🤗 가족에게 응석 부리며 털어놓는다", pts: 0 },
      { text: "👯 친구들 단톡방에 바로 올린다", pts: 1 },
      { text: "🔍 검색하고 혼자 정리해 본다", pts: 2 },
      { text: "👴 인생 선배의 경험담을 듣는다", pts: 3 }
    ]
  },
  {
    id: 10, area: "mind", emoji: "⏰",
    question: "약속 시간에 대한 나의 태도는?",
    choices: [
      { text: "🎈 노는 게 먼저, 시간 개념은 별로 없다", pts: 0 },
      { text: "🙂 5~10분 늦는 건 괜찮다고 생각한다", pts: 1 },
      { text: "⏱️ 10분 전에는 도착한다", pts: 2 },
      { text: "🚶 30분 일찍 가서 기다린다", pts: 3 }
    ]
  },
  {
    id: 11, area: "taste", emoji: "😂",
    question: "가장 웃긴 코드는?",
    choices: [
      { text: "💨 방귀, 말장난, 유치한 개그", pts: 0 },
      { text: "📲 밈, 드립, 유행어", pts: 1 },
      { text: "🎭 상황극과 블랙코미디", pts: 2 },
      { text: "👨 아재 개그, 옛날 개그", pts: 3 }
    ]
  },
  {
    id: 12, area: "life", emoji: "🌙",
    question: "이상적인 금요일 밤은?",
    choices: [
      { text: "🌟 밤새 놀아도 졸리지 않을 것 같다", pts: 0 },
      { text: "🍻 친구들과 신나게 불금을 즐긴다", pts: 1 },
      { text: "🍿 집에서 영화 보고 치맥을 즐긴다", pts: 2 },
      { text: "🛌 일찍 씻고 푹 자고 내일을 준비한다", pts: 3 }
    ]
  }
];

// ============================================
// 총점 → 나이 변환표 (구간별 선형 보간)
// 평균 총점(18점 근처)이 20대 후반이 되도록 하고, 양 끝은 완만하게 열어 6세~70세까지 나오게 한다.
// ============================================

const MENTALAGE_CURVE = [
  [0, 6], [6, 10], [10, 14], [14, 20], [18, 27], [22, 37], [26, 49], [30, 58], [36, 70]
];

// 영역별 나이는 문항이 3개뿐이라 값이 크게 흔들린다. 전체 나이 쪽으로 일부 끌어당겨 극단 값을 완화한다.
const MENTALAGE_AREA_SHRINK = 0.75;

function mentalAgeFromScore(score, scale) {
  // scale: 영역별 계산 시 점수 비율을 맞추기 위한 배율 (12문항=1, 3문항=4)
  const s = Math.max(0, Math.min(36, score * (scale || 1)));
  for (let i = 1; i < MENTALAGE_CURVE.length; i++) {
    const [x0, y0] = MENTALAGE_CURVE[i - 1], [x1, y1] = MENTALAGE_CURVE[i];
    if (s <= x1) return Math.round(y0 + ((s - x0) / (x1 - x0)) * (y1 - y0));
  }
  return MENTALAGE_CURVE[MENTALAGE_CURVE.length - 1][1];
}

// ============================================
// 8개 결과 구간
// ============================================

const MENTALAGE_BANDS = {
  B1: {
    min: 6, max: 9, emoji: "🧸", name: "꿈나라 유치원생", range: "6~9세", color: "#F28DB2",
    tagline: "마음만은 영원한 어린이",
    desc: "현실의 복잡함보다 지금 이 순간의 즐거움이 먼저인 천진난만한 정신연령입니다. 감정을 숨기지 않고 좋으면 좋다, 싫으면 싫다 솔직하게 표현해서 주변을 웃게 만들어요. 순수함이 매력이지만 책임져야 할 일 앞에서는 도망가고 싶을 때도 있어요.",
    keywords: ["순수함", "솔직함", "천진난만"],
    clues: ["간식과 캐릭터 앞에서 눈이 반짝여요", "하기 싫은 일은 미루고 싶어서 몸이 먼저 반응해요", "감정이 표정에 그대로 드러나요"],
    friends: "친구들은 \"쟤는 진짜 순수해\", \"같이 있으면 마음이 편해\"라고 말해요.",
    tip: "책임져야 하는 일은 작은 단위로 쪼개서 체크리스트로 만들어 보세요. 순수함은 지키면서 일은 해낼 수 있어요."
  },
  B2: {
    min: 10, max: 15, emoji: "🎒", name: "사춘기 중학생", range: "10~15세", color: "#F2994A",
    tagline: "감정 파도에 올라탄 중2의 마음",
    desc: "감정 기복이 크고 반응이 즉각적인 사춘기 감성의 정신연령입니다. 좋아하는 것에는 폭발적으로 빠지고, 서운한 건 오래 기억해요. 솔직하고 에너지가 넘치는 만큼 마음이 쉽게 출렁이니 감정 정리하는 시간이 필요해요.",
    keywords: ["감정 파도", "열정", "예민함"],
    clues: ["좋아하는 것에 한 번 빠지면 밤새도록 파고들어요", "친구의 한마디가 하루 종일 머릿속에 맴돌아요", "혼자 있고 싶으면서도 외로운 날이 많아요"],
    friends: "친구들은 \"감정 표현이 진짜 솔직하다\", \"좋아하는 거 이야기할 때 제일 신나 보여\"라고 말해요.",
    tip: "감정이 격할 땐 바로 반응하기 전에 10분만 기다려 보세요. 일기나 메모로 감정을 적으면 훨씬 가벼워져요."
  },
  B3: {
    min: 16, max: 21, emoji: "⚡", name: "하이틴 에너자이저", range: "16~21세", color: "#F2C94C",
    tagline: "새로운 것에 먼저 뛰어드는 청춘",
    desc: "유행에 민감하고 에너지가 넘치는 청춘의 정신연령입니다. 새로운 경험과 친구들과의 시간이 최우선이고, 즉흥적으로 움직이는 일이 많아요. 활력이 장점이지만 계획과 관리는 조금 서툴 수 있어요.",
    keywords: ["유행 민감", "에너지", "즉흥적"],
    clues: ["새로운 앱과 유행에 제일 먼저 올라타요", "친구들과의 약속이 일정의 중심이에요", "계획보다 그때그때 기분을 따라 움직여요"],
    friends: "친구들은 \"너랑 있으면 심심할 틈이 없어\", \"항상 에너지가 넘쳐\"라고 말해요.",
    tip: "에너지는 장점이니 그대로 두되, 한 달에 한 번은 지출과 일정을 정리하는 날을 만들어 보세요."
  },
  B4: {
    min: 22, max: 28, emoji: "🌆", name: "청춘 사회초년생", range: "22~28세", color: "#6BBF8E",
    tagline: "열정과 현실 사이에서 균형 잡는 중",
    desc: "열정과 현실감각이 함께 있는 가장 균형 잡힌 정신연령입니다. 하고 싶은 일과 해야 할 일을 구분할 줄 알고, 새로운 도전에도 열려 있어요. 실제 나이와 가장 비슷하게 느끼는 사람이 많은 구간입니다.",
    keywords: ["균형", "도전", "적응력"],
    clues: ["신나게 놀 때와 일할 때의 스위치가 잘 켜져요", "새로운 환경에도 금방 적응해요", "미래 계획과 현재의 즐거움을 모두 챙기려 해요"],
    friends: "친구들은 \"너는 균형이 잘 잡혀 있어\", \"뭘 맡겨도 믿음직해\"라고 말해요.",
    tip: "지금처럼 균형을 유지하되, 쉬는 시간도 일정처럼 먼저 넣어 두세요. 번아웃을 예방하는 가장 쉬운 방법이에요."
  },
  B5: {
    min: 29, max: 36, emoji: "💼", name: "현실파 직장인", range: "29~36세", color: "#4A9DD0",
    tagline: "계획과 책임감이 몸에 밴 어른",
    desc: "계획적이고 현실적인 판단을 하는 어른스러운 정신연령입니다. 책임감이 강하고 준비를 철저히 하는 편이라 주변의 신뢰를 받아요. 다만 한번쯤은 즉흥적으로 놀아도 괜찮다는 여유가 필요할 때가 있어요.",
    keywords: ["책임감", "계획적", "신뢰"],
    clues: ["약속 시간에 늘 여유 있게 도착해요", "큰 지출 전에 꼭 비교하고 계산해 봐요", "친구들의 고민 상담 단골이에요"],
    friends: "친구들은 \"믿고 맡길 수 있다\", \"고민 있을 때 제일 먼저 생각나\"라고 말해요.",
    tip: "계획에서 벗어나는 날을 한 번쯤 허락해 보세요. 즉흥적인 하루가 의외로 최고의 기억이 되기도 해요."
  },
  B6: {
    min: 37, max: 47, emoji: "☕", name: "노련한 어른", range: "37~47세", color: "#8E6BB8",
    tagline: "여유와 판단력이 있는 안정형",
    desc: "감정에 쉽게 흔들리지 않고 상황을 넓게 보는 노련한 정신연령입니다. 경험에서 나오는 여유가 있고, 후배나 친구들에게 든든한 조언을 해줘요. 안정적인 만큼 새로운 유행에는 한 박자 느릴 수 있어요.",
    keywords: ["여유", "안정감", "조언자"],
    clues: ["화나는 일이 생겨도 일단 숨부터 고르고 판단해요", "유행보다 나에게 맞는 방식을 선택해요", "주변에서 인생 상담을 자주 요청해요"],
    friends: "친구들은 \"너는 말하는 게 어른스러워\", \"옆에 있으면 안심돼\"라고 말해요.",
    tip: "새로운 유행도 가끔은 가볍게 체험해 보세요. 어른의 여유와 청춘의 호기심이 만나면 최고예요."
  },
  B7: {
    min: 48, max: 58, emoji: "🏛️", name: "관록의 베테랑", range: "48~58세", color: "#A67C52",
    tagline: "산전수전을 겪은 듯한 깊이",
    desc: "웬만한 일에는 놀라지 않는 관록 있는 정신연령입니다. 삶을 길게 보고 일희일비하지 않아서 주변에 안정감을 줘요. 다만 가끔은 너무 일찍 어른이 된 듯해서, 스스로를 위한 놀이 시간이 필요해요.",
    keywords: ["관록", "차분함", "깊이"],
    clues: ["급한 상황에서도 목소리가 낮아지고 침착해져요", "일찍 자고 일찍 일어나는 루틴이 몸에 맞아요", "친구들보다 한 발 앞서 걱정하고 챙겨 줘요"],
    friends: "친구들은 \"너 몇 살이야?\", \"우리 중에 제일 어른 같아\"라고 말해요.",
    tip: "일부러라도 '쓸데없는 놀이' 시간을 만들어 보세요. 마음의 나이를 조금 낮추면 훨씬 가벼워져요."
  },
  B8: {
    min: 59, max: 70, emoji: "🧙", name: "인생 도사", range: "59~70세", color: "#5F7A70",
    tagline: "세상을 달관한 듯한 초연함",
    desc: "모든 걸 한 번쯤 겪어 본 듯 초연하고 느긋한 정신연령입니다. 세상사에 휘둘리지 않고 자기 페이스를 지켜서 주변에 평온함을 줘요. 달관한 만큼 가끔은 도전이나 설렘이 줄어들 수 있으니 작은 즐거움을 일부러 찾아보세요.",
    keywords: ["달관", "평온", "초연함"],
    clues: ["큰일에도 \"뭐, 그럴 수 있지\" 하고 넘겨요", "일찍 자고 새벽에 일어나는 생활이 편해요", "젊은 친구들의 새로운 유행이 신기하게 느껴져요"],
    friends: "친구들은 \"넌 인생을 두 번 산 것 같아\", \"너랑 있으면 마음이 차분해져\"라고 말해요.",
    tip: "새로운 취미나 처음 가 보는 장소를 한 달에 하나씩 시도해 보세요. 설렘이 되돌아와요."
  }
};

// 나이 → 구간 코드
function mentalAgeBand(age) {
  for (const [code, b] of Object.entries(MENTALAGE_BANDS)) if (age >= b.min && age <= b.max) return code;
  return age < 6 ? "B1" : "B8";
}

// 실제 나이대 선택지 (결과 화면의 비교 버튼용)
const MENTALAGE_REAL_AGES = [
  { label: "10대", age: 16 }, { label: "20대", age: 25 }, { label: "30대", age: 35 },
  { label: "40대", age: 45 }, { label: "50대 이상", age: 57 }
];

function mentalAgeGapText(mental, real) {
  const diff = real - mental;
  if (Math.abs(diff) <= 2) return `실제 나이와 거의 같아요! 마음과 나이가 딱 맞는 사람이에요.`;
  if (diff > 0) return `대략 ${diff}살 더 어린 마음으로 살고 있어요. ${diff >= 15 ? "마음은 청춘 그 자체!" : "젊은 마음이 장점이에요."}`;
  return `대략 ${-diff}살 더 어른스러워요. ${-diff >= 15 ? "인생 두 번 사는 중?" : "차분함이 장점이에요."}`;
}

// ============================================
// 채점 함수
// ============================================

function calcMentalAge(answers) {
  // answers = [{ area: "taste", pts: 2 }, ...] 12개
  const total = answers.reduce((s, a) => s + (a ? a.pts : 0), 0);
  const age = mentalAgeFromScore(total, 1);

  const areas = {};
  Object.keys(MENTALAGE_AREAS).forEach(k => areas[k] = { score: 0, count: 0 });
  answers.forEach(a => { if (a && areas[a.area]) { areas[a.area].score += a.pts; areas[a.area].count += 1; } });
  Object.entries(areas).forEach(([k, v]) => {
    // 영역은 3문항(0~9점)이라 12문항 기준(0~36점)으로 4배 환산
    const raw = mentalAgeFromScore(v.score, v.count ? 12 / v.count : 1);
    v.rawAge = raw;
    v.age = Math.round(age + (raw - age) * MENTALAGE_AREA_SHRINK);
  });
  const ages = Object.values(areas).map(v => v.age);
  const spread = Math.max(...ages) - Math.min(...ages);
  const hi = Object.entries(areas).sort((a, b) => b[1].age - a[1].age)[0][0];
  const lo = Object.entries(areas).sort((a, b) => a[1].age - b[1].age)[0][0];

  const band = mentalAgeBand(age);
  return { total, age, band, bandInfo: MENTALAGE_BANDS[band], areas, spread, oldest: hi, youngest: lo };
}

if (typeof module !== 'undefined') {
  module.exports = {
    MENTALAGE_AREAS, MENTALAGE_QUESTIONS, MENTALAGE_CURVE, MENTALAGE_BANDS, MENTALAGE_REAL_AGES,
    MENTALAGE_AREA_SHRINK, mentalAgeFromScore, mentalAgeBand, mentalAgeGapText, calcMentalAge
  };
}
