// ============================================
// 흑역사 보유량 정밀 측정 테스트
// ============================================
// 구조: 10문항, 선택지 4개 (0~3점)
// 채점: 점수 합산 → 5단계 레벨
// 최대 점수: 30점
// ============================================

const BLACKHISTORY_QUESTIONS = [
  {
    id: 1,
    question: "중학교 시절 SNS에 올린 글을 지금 다시 본다면?",
    emoji: "📱",
    choices: [
      { text: "😌 별로 문제없을 것 같아. 평범했어", score: 0 },
      { text: "😅 좀 오글거리긴 하겠지만 봐줄 만해", score: 1 },
      { text: "😨 절대 안 돼. 흑역사 저장소야", score: 2 },
      { text: "💀 그 계정 비번을 잊어버린 게 신의 한 수야", score: 3 }
    ]
  },
  {
    id: 2,
    question: "짝사랑하던 사람한테 고백하거나 들이댔던 기억이?",
    emoji: "💘",
    choices: [
      { text: "😌 없거나 깔끔하게 고백했어", score: 0 },
      { text: "😅 좀 어설펐지만 그럭저럭", score: 1 },
      { text: "😨 생각하면 지금도 이불 걷어찰 것 같아", score: 2 },
      { text: "💀 그 사람 아직도 기억하고 있을 것 같아서 무서워", score: 3 }
    ]
  },
  {
    id: 3,
    question: "내가 보낸 카톡/문자 중 지금 다시 보면 삭제하고 싶은 게?",
    emoji: "💬",
    choices: [
      { text: "😌 딱히 없어. 나름 신중하게 보내는 편", score: 0 },
      { text: "😅 한두 개 정도는 있어", score: 1 },
      { text: "😨 꽤 있어. 새벽에 보낸 것들이 특히", score: 2 },
      { text: "💀 카톡 대화방 자체를 통째로 지우고 싶어", score: 3 }
    ]
  },
  {
    id: 4,
    question: "술 마시고 한 행동 중 다음 날 기억이 끊긴 적?",
    emoji: "🍺",
    choices: [
      { text: "😌 없어. 나는 필름 안 끊겨", score: 0 },
      { text: "😅 한 번 정도는 있어", score: 1 },
      { text: "😨 몇 번 있어. 다음 날 폰 확인이 제일 무서워", score: 2 },
      { text: "💀 그날 만난 사람들이 지금도 그 얘기를 꺼내", score: 3 }
    ]
  },
  {
    id: 5,
    question: "과거에 내가 쓴 일기나 편지를 지금 발견한다면?",
    emoji: "📔",
    choices: [
      { text: "😌 읽어볼 수 있어. 추억이지", score: 0 },
      { text: "😅 살짝 부끄럽겠지만 웃으면서 읽을 것 같아", score: 1 },
      { text: "😨 절대 읽지 않고 바로 파쇄기행", score: 2 },
      { text: "💀 발견 즉시 소각 처리해야 해", score: 3 }
    ]
  },
  {
    id: 6,
    question: "학창 시절 유행 따라 했던 패션이나 헤어스타일?",
    emoji: "💇",
    choices: [
      { text: "😌 지금 봐도 나쁘지 않아", score: 0 },
      { text: "😅 그때는 다 그랬으니까", score: 1 },
      { text: "😨 사진 보면 손발이 오그라들어", score: 2 },
      { text: "💀 그 시절 사진 전부 폐기했어", score: 3 }
    ]
  },
  {
    id: 7,
    question: "자신 있게 했다가 망했던 기억 — 발표, 노래, 춤 등?",
    emoji: "🎤",
    choices: [
      { text: "😌 딱히 없어. 준비를 잘 했거든", score: 0 },
      { text: "😅 한 번 정도 있는데 그냥 웃고 넘어가", score: 1 },
      { text: "😨 있어. 그 자리에 있던 사람들이 기억할 것 같아", score: 2 },
      { text: "💀 그날 이후 그 장소 근처도 안 가", score: 3 }
    ]
  },
  {
    id: 8,
    question: "좋아하는 사람한테 티 내려다 역효과 났던 경험?",
    emoji: "😳",
    choices: [
      { text: "😌 없어. 나름 자연스러웠어", score: 0 },
      { text: "😅 약간 어설프긴 했지만 귀여운 수준", score: 1 },
      { text: "😨 있어. 생각하면 지금도 얼굴이 빨개져", score: 2 },
      { text: "💀 그 사람이 나를 피했던 것 같아", score: 3 }
    ]
  },
  {
    id: 9,
    question: "커뮤니티나 SNS에 올렸다가 반응이 싸늘했던 게시글?",
    emoji: "🥶",
    choices: [
      { text: "😌 없어. 올리기 전에 신중하게 생각해", score: 0 },
      { text: "😅 한 번 정도 반응이 없었던 적 있어", score: 1 },
      { text: "😨 있어. 조용히 삭제한 적 있어", score: 2 },
      { text: "💀 지금도 그 글 생각하면 식은땀 나", score: 3 }
    ]
  },
  {
    id: 10,
    question: "지금 이 테스트 하면서 떠오른 흑역사가 몇 개야?",
    emoji: "🌑",
    choices: [
      { text: "😌 없어. 나는 깨끗해", score: 0 },
      { text: "😅 한두 개 스쳐지나갔어", score: 1 },
      { text: "😨 문항마다 하나씩 소환됐어", score: 2 },
      { text: "💀 문항 읽기도 전에 이미 여러 개 떠올랐어", score: 3 }
    ]
  },
  {
    id: 11,
    question: "단톡방에 잘못 보낸 메시지나 캡처 실수가 있어?",
    emoji: "📲",
    choices: [
      { text: "😌 그런 적 없어. 보내기 전에 항상 확인해", score: 0 },
      { text: "😅 한 번 있었는데 다행히 크게 문제는 안 됐어", score: 1 },
      { text: "😨 있어. 그때 식은땀 엄청 흘렸어", score: 2 },
      { text: "💀 그 사건 이후로 카톡 보내기 전에 세 번씩 확인해", score: 3 }
    ]
  },
  {
    id: 12,
    question: "지금도 연락하는 사람 앞에서 저질렀던 흑역사가 있어?",
    emoji: "😬",
    choices: [
      { text: "😌 딱히 없어. 민망한 기억이 없어", score: 0 },
      { text: "😅 있긴 한데 그 사람도 잊었겠지", score: 1 },
      { text: "😨 있어. 그 사람 볼 때마다 그 기억이 스쳐", score: 2 },
      { text: "💀 그 사람이 먼저 꺼내는 바람에 공식 흑역사가 됐어", score: 3 }
    ]
  },
  {
    id: 13,
    question: "돈 관련 흑역사가 있어? 충동구매, 사기, 이상한 데 투자 등",
    emoji: "💸",
    choices: [
      { text: "😌 없어. 나름 신중하게 써", score: 0 },
      { text: "😅 충동구매 몇 번 정도. 후회는 했어", score: 1 },
      { text: "😨 꽤 있어. 생각하면 지금도 아까워", score: 2 },
      { text: "💀 그 돈만 있었어도... 하는 생각이 가끔 나", score: 3 }
    ]
  },
  {
    id: 14,
    question: "직장이나 학교에서 완전히 망했던 발표나 실수 기억이?",
    emoji: "🎤",
    choices: [
      { text: "😌 없어. 나름 잘 해왔어", score: 0 },
      { text: "😅 한 번 정도 삐끗했지만 금방 수습됐어", score: 1 },
      { text: "😨 있어. 그 자리에 있던 사람들이 아직도 기억할 것 같아", score: 2 },
      { text: "💀 그날 이후 관련 자료 전부 삭제하고 기억도 봉인했어", score: 3 }
    ]
  },
  {
    id: 15,
    question: "과거의 나한테 한 마디 할 수 있다면?",
    emoji: "⏰",
    choices: [
      { text: "😌 잘하고 있어. 딱히 바꿀 게 없어", score: 0 },
      { text: "😅 조금만 더 생각하고 행동해", score: 1 },
      { text: "😨 제발 그것만은 하지 마. 알잖아 뭔지", score: 2 },
      { text: "💀 말해봤자 안 들을 거 알아. 그냥 행운을 빌게", score: 3 }
    ]
  }
];

// ============================================
// 5단계 흑역사 레벨
// ============================================

const BLACKHISTORY_LEVELS = {
  CLEAN: {
    level: 1,
    range: "0~6점",
    emoji: "😇",
    name: "과거가 투명한 사람",
    tagline: "당신의 과거는 검열 통과입니다.",
    color: "#2ECC71",
    desc: "흑역사 보유량이 거의 검출되지 않았습니다. 과거가 깨끗하거나, 기억을 아주 잘 지우는 능력자거나, 아니면 아직 인생 경험이 부족하거나. 셋 중 하나입니다. 어쨌든 부럽습니다.",
    badge: "🏆 과거 청정 구역"
  },
  MILD: {
    level: 2,
    range: "7~12점",
    emoji: "😅",
    name: "흑역사 소량 보유자",
    tagline: "있긴 있어. 근데 그 정도는 다 있잖아.",
    color: "#F39C12",
    desc: "소량의 흑역사가 검출됐습니다. 가끔 혼자 이불 속에서 생각나는 정도. 이 정도면 지극히 정상이고 오히려 인간미가 있습니다. 그 기억들이 지금의 당신을 만든 거예요.",
    badge: "📁 흑역사 수집중"
  },
  MODERATE: {
    level: 3,
    range: "13~18점",
    emoji: "😨",
    name: "흑역사 중간 보유자",
    tagline: "생각하지 말았어야 했는데. 이미 소환됐어.",
    color: "#E67E22",
    desc: "상당량의 흑역사가 보유되어 있습니다. 가끔 자려고 누우면 갑자기 소환되는 그 기억들. 이불킥을 유발하는 추억들이 꽤 축적된 상태입니다. 그래도 웃으면서 얘기할 수 있는 수준이에요.",
    badge: "🛏️ 전문 이불킥커"
  },
  HIGH: {
    level: 4,
    range: "19~24점",
    emoji: "💀",
    name: "흑역사 고농도 보유자",
    tagline: "과거의 나와 현재의 나는 별개의 인물입니다.",
    color: "#E74C3C",
    desc: "고농도 흑역사가 다량 검출됐습니다. 특정 노래를 들으면 소환되고, 특정 장소를 지나면 떠오르고, 자다가 벌떡 일어나게 만드는 기억들이 여럿 존재합니다. 그 경험들이 쌓여서 지금의 어른이 된 겁니다.",
    badge: "🗄️ 흑역사 서버 과부하"
  },
  MASTER: {
    level: 5,
    range: "25~30점",
    emoji: "🌑",
    name: "흑역사 박물관",
    tagline: "당신의 과거는 기밀 문서 처리가 필요합니다.",
    color: "#8E44AD",
    desc: "축하합니다. 당신은 살면서 정말 다양한 경험을 하셨군요. 흑역사 보유량이 박물관 수준입니다. 자서전을 쓰면 베스트셀러가 될 수도 있어요. 그 모든 기억이 당신을 이 자리까지 데려온 거니까, 부끄러워하지 않아도 됩니다. 조금은.",
    badge: "👑 흑역사 박물관장"
  }
};

// ============================================
// 채점 함수
// ============================================

function calcBlackHistory(answers) {
  const totalScore = answers.reduce((sum, score) => sum + score, 0);
  const percentage = Math.round((totalScore / 45) * 100);

  let levelKey;
  if (totalScore <= 9) levelKey = 'CLEAN';
  else if (totalScore <= 18) levelKey = 'MILD';
  else if (totalScore <= 27) levelKey = 'MODERATE';
  else if (totalScore <= 36) levelKey = 'HIGH';
  else levelKey = 'MASTER';

  return {
    totalScore,
    maxScore: 45,
    percentage,
    levelKey,
    levelInfo: BLACKHISTORY_LEVELS[levelKey]
  };
}

if (typeof module !== 'undefined') {
  module.exports = { BLACKHISTORY_QUESTIONS, BLACKHISTORY_LEVELS, calcBlackHistory };
}
