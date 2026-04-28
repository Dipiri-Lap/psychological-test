// ============================================
// 카톡 답장 스타일로 보는 연애 유형
// ============================================
// 구조: 12문항, 선택지 4개 (각 유형에 점수)
// 유형: 6가지
// 채점: 가장 높은 점수 유형 = 결과
// ============================================

const KAKAO_QUESTIONS = [
  {
    id: 1,
    question: "연인한테 카톡이 왔는데 지금 바쁠 때, 나는?",
    emoji: "📱",
    choices: [
      { text: "⚡ 바쁜 와중에도 바로 답장. 기다리게 하기 싫어", type: "FAST" },
      { text: "📋 지금 바쁘다고 짧게 알리고 나중에 자세히 답해", type: "STEADY" },
      { text: "👀 읽긴 했는데 일 끝나고 답장해도 되겠지", type: "CHILL" },
      { text: "😰 읽고 신경 쓰이지만 일 마무리하고 바로 답장", type: "ANXIOUS" }
    ]
  },
  {
    id: 2,
    question: "연인이 '뭐해?'라고 보냈어. 내 답장은?",
    emoji: "💬",
    choices: [
      { text: "📝 지금 하고 있는 것 상세하게 + 너는? 되물어봐", type: "FAST" },
      { text: "😊 간단하게 상황 설명하고 나중에 통화하자고 해", type: "STEADY" },
      { text: "🤷 '그냥 있어' 또는 '폰함' 한 마디로 끝", type: "CHILL" },
      { text: "💕 하고 있는 것 말하면서 '왜? 보고 싶어?'로 마무리", type: "ROMANTIC" }
    ]
  },
  {
    id: 3,
    question: "연인한테 보낸 카톡이 읽씹 당했어. 나는?",
    emoji: "😶",
    choices: [
      { text: "😤 '읽었으면 답장은 해줘야지' 바로 추가 카톡", type: "FAST" },
      { text: "🤔 바쁜가 보다 하고 기다려. 이유가 있겠지", type: "STEADY" },
      { text: "😌 나도 가끔 그러니까 별로 신경 안 써", type: "CHILL" },
      { text: "😰 혹시 화난 건 아닌지 뭔가 잘못한 게 있나 되짚어봐", type: "ANXIOUS" }
    ]
  },
  {
    id: 4,
    question: "카톡할 때 이모티콘이나 이모지를 얼마나 써?",
    emoji: "😂",
    choices: [
      { text: "🎭 엄청 많이 써. 감정 표현은 이모티콘으로", type: "ROMANTIC" },
      { text: "😊 적당히. 분위기 맞춰서 가끔", type: "STEADY" },
      { text: "😐 거의 안 써. 텍스트로 충분해", type: "CHILL" },
      { text: "💕 연인한테는 특히 더 많이 씀. 귀엽게 보이고 싶어", type: "FAST" }
    ]
  },
  {
    id: 5,
    question: "연인이 기분 나쁜 것 같은 문자를 보냈어. 나는?",
    emoji: "😟",
    choices: [
      { text: "📞 카톡 말고 바로 전화해. 텍스트론 한계가 있어", type: "FAST" },
      { text: "💬 무슨 일 있냐고 조심스럽게 물어봐", type: "STEADY" },
      { text: "⏳ 일단 놔둬. 스스로 풀릴 때 말하겠지", type: "CHILL" },
      { text: "😰 내가 뭔가 잘못한 건지 먼저 사과 문자 보내", type: "ANXIOUS" }
    ]
  },
  {
    id: 6,
    question: "연인과 카톡할 때 주로 어떤 스타일이야?",
    emoji: "✍️",
    choices: [
      { text: "📜 하고 싶은 말 다 담아서 긴 문자 자주 보내", type: "ROMANTIC" },
      { text: "🔄 주거니 받거니 대화하듯 짧게 주고받아", type: "FAST" },
      { text: "📌 핵심만 간단하게. 용건 위주로", type: "CHILL" },
      { text: "🌡️ 상대방 톤에 맞춰서 바뀌는 편", type: "STEADY" }
    ]
  },
  {
    id: 7,
    question: "밤에 연인한테 '자?'라고 카톡이 왔어. 나는?",
    emoji: "🌙",
    choices: [
      { text: "💕 '안 자~ 왜?' 하고 새벽까지 카톡 이어가", type: "ROMANTIC" },
      { text: "😊 '안 자' 하고 잠깐 얘기하다가 자자고 해", type: "STEADY" },
      { text: "😴 '자려고' 하고 빠르게 마무리", type: "CHILL" },
      { text: "🥰 '기다렸어~' 하고 적극적으로 반응해", type: "FAST" }
    ]
  },
  {
    id: 8,
    question: "연인이 갑자기 답장이 뜸해졌어. 나는?",
    emoji: "📵",
    choices: [
      { text: "📞 카톡 말고 전화해버려. 직접 확인하는 게 빨라", type: "FAST" },
      { text: "🤔 바쁜가 보다 하고 기다려봐. 이유가 있겠지", type: "STEADY" },
      { text: "😌 나도 바쁠 때 있으니까. 별로 신경 안 써", type: "CHILL" },
      { text: "😰 혹시 나한테 관심이 식은 건 아닌지 걱정돼", type: "ANXIOUS" }
    ]
  },
  {
    id: 9,
    question: "연인한테 고민을 털어놓는 카톡을 보낼 때 나는?",
    emoji: "💭",
    choices: [
      { text: "📝 생각나는 대로 길게 다 쏟아내", type: "ROMANTIC" },
      { text: "🎯 핵심만 정리해서 보내고 반응 봐", type: "STEADY" },
      { text: "🤐 카톡으로 고민 얘기는 잘 안 해. 만나서 하거나 혼자 해결", type: "CHILL" },
      { text: "😰 보내기 전에 여러 번 고쳐 씀. 어떻게 받아들일지 신경 쓰여", type: "ANXIOUS" }
    ]
  },
  {
    id: 10,
    question: "연인이 '오늘 힘들었어'라고 보냈을 때 나는?",
    emoji: "🫂",
    choices: [
      { text: "📞 바로 전화해. 목소리 듣는 게 낫잖아", type: "FAST" },
      { text: "💬 무슨 일이었는지 물어보고 공감해줘", type: "STEADY" },
      { text: "😔 '많이 힘들었겠다' 짧게 위로하고 기다려줘", type: "CHILL" },
      { text: "💕 위로 문자 엄청 길게 써서 보내. 힘내라고", type: "ROMANTIC" }
    ]
  },
  {
    id: 11,
    question: "연인이랑 카톡하다가 갑자기 내가 할 말이 없어졌어. 나는?",
    emoji: "🤫",
    choices: [
      { text: "🎲 갑자기 재밌는 거 공유하거나 질문 던져서 이어가", type: "FAST" },
      { text: "😊 '나중에 얘기해~' 하고 자연스럽게 마무리", type: "STEADY" },
      { text: "✌️ 그냥 안 보내. 할 말 없으면 안 해도 되지", type: "CHILL" },
      { text: "💕 '그냥 보고 싶어서' 하고 솔직하게 표현해", type: "ROMANTIC" }
    ]
  },
  {
    id: 12,
    question: "연인이 카톡에서 평소보다 짧게 답장할 때 나는?",
    emoji: "📏",
    choices: [
      { text: "❓ '무슨 일 있어?' 바로 물어봐", type: "FAST" },
      { text: "🔍 분위기 보면서 괜찮은지 슬쩍 물어봐", type: "STEADY" },
      { text: "😌 원래 그럴 때 있지. 별로 신경 안 써", type: "CHILL" },
      { text: "😰 내가 뭔가 잘못한 건지 대화 내용 다시 읽어봐", type: "ANXIOUS" }
    ]
  }
];

// ============================================
// 6가지 연애 유형 결과
// ============================================

const KAKAO_TYPES = {
  FAST: {
    emoji: "⚡",
    name: "즉답러",
    tagline: "읽으면 바로 답장. 그게 예의라고 생각해.",
    color: "#F39C12",
    desc: "카톡 오면 바로 답장하는 게 몸에 배어 있어. 상대방을 기다리게 하는 게 불편하고, 빠른 답장이 관심의 표현이라고 생각해. 연애할 때도 적극적으로 먼저 연락하고, 상대방의 반응을 바로바로 확인하고 싶어하는 편이야. 답장이 늦으면 은근히 신경 쓰여.",
    strength: "적극적이고 관심 표현이 확실해서 상대방이 사랑받는 느낌을 받아",
    weakness: "답장 속도로 감정을 판단하는 경향이 있어. 상대방이 바쁠 수도 있다는 걸 기억해"
  },
  STEADY: {
    emoji: "⚖️",
    name: "균형잡힌 소통러",
    tagline: "적당히, 하지만 확실하게.",
    color: "#2ECC71",
    desc: "빠르지도 느리지도 않게 적절한 타이밍에 답장하는 타입이야. 상황에 따라 유연하게 대처하고, 카톡 스타일로 상대방을 판단하지 않아. 연애할 때도 감정 기복 없이 안정적으로 소통하는 편이라, 상대방이 옆에 있으면 편안함을 느껴.",
    strength: "안정적이고 신뢰감 있는 소통 스타일. 상대방이 부담 없이 연락할 수 있어",
    weakness: "너무 무난해서 가끔 열정이 없어 보일 수 있어. 가끔은 적극적인 표현도 필요해"
  },
  CHILL: {
    emoji: "😎",
    name: "쿨내나는 자유인",
    tagline: "연락은 하고 싶을 때 하는 거야. 서로 믿으면 되잖아.",
    color: "#4A90D9",
    desc: "답장 속도로 관계를 판단하지 않는 타입이야. 연락이 뜸해도 크게 불안하지 않고, 상대방도 그러길 바라. 각자의 생활이 있고, 그걸 존중하는 게 성숙한 연애라고 생각해. 근데 가끔 상대방 입장에서는 '관심이 없나?' 오해받을 수 있어.",
    strength: "독립적이고 서로의 공간을 존중해서 질식하지 않는 건강한 연애 가능",
    weakness: "무심해 보일 수 있어. 상대방이 확인받고 싶을 때 적극적인 표현이 필요해"
  },
  ANXIOUS: {
    emoji: "😰",
    name: "불안한 감정이입러",
    tagline: "읽씹 하나에 시나리오 열 개 씀.",
    color: "#E74C3C",
    desc: "카톡 하나하나에 감정을 많이 싣는 타입이야. 상대방 답장이 늦거나 짧으면 뭔가 잘못된 건 아닌지 자동으로 시나리오를 돌려. 그만큼 관계를 소중히 여기는 거지만, 그 불안이 나를 지치게 만들기도 해. 상대방이 먼저 안심시켜주는 표현을 해주면 훨씬 편안해져.",
    strength: "관계를 소중히 여기고 상대방의 감정 변화에 예민하게 반응해",
    weakness: "과도한 해석으로 혼자 지치는 경우가 많아. 상대방을 좀 더 믿는 연습이 필요해"
  },
  ROMANTIC: {
    emoji: "💕",
    name: "감성 넘치는 로맨티스트",
    tagline: "카톡도 연애의 일부야. 설레야 제맛이지.",
    color: "#9B59B6",
    desc: "카톡 자체를 연애의 연장선으로 생각하는 타입이야. 이모티콘도 많이 쓰고, 긴 문자도 자주 보내고, 새벽 카톡도 즐겨. 상대방이 내 카톡 보고 기분 좋아지길 바라고, 나도 그런 카톡 받는 게 좋아. 텍스트 하나에도 감정을 담는 타입이야.",
    strength: "카톡만으로도 충분히 설레게 만드는 능력이 있어. 상대방이 사랑받는 느낌을 강하게 받아",
    weakness: "카톡 감성이 안 맞는 상대방과는 온도 차이가 날 수 있어"
  },
  MIXED: {
    emoji: "🌀",
    name: "상황따라 다른 카멜레온",
    tagline: "나도 내 카톡 스타일을 모르겠어.",
    color: "#E67E22",
    desc: "기분에 따라, 상대방에 따라, 상황에 따라 카톡 스타일이 달라지는 타입이야. 어떤 날은 즉답러가 되고, 어떤 날은 쿨내나는 자유인이 돼. 일관성은 좀 없지만 그만큼 유연하고 적응력이 높아. 상대방이 내 패턴을 파악하기 어려울 수 있어.",
    strength: "상황에 따라 유연하게 대처하는 적응력이 높아",
    weakness: "일관성이 없어서 상대방이 내 감정을 파악하기 어려울 수 있어"
  }
};

// ============================================
// 채점 함수
// ============================================

function calcKakaoType(answers) {
  // answers = ['FAST', 'STEADY', 'CHILL', ...] 12개
  const scores = { FAST:0, STEADY:0, CHILL:0, ANXIOUS:0, ROMANTIC:0 };
  answers.forEach(type => { if (scores[type] !== undefined) scores[type]++; });

  const sorted = Object.entries(scores).sort((a, b) => b[1] - a[1]);
  const topType = sorted[0][0];
  const topScore = sorted[0][1];
  const secondScore = sorted[1][1];

  // 점수가 너무 골고루 퍼지면 MIXED
  const isMixed = topScore <= 3;

  return {
    type: isMixed ? 'MIXED' : topType,
    scores,
    topScore,
    typeInfo: isMixed ? KAKAO_TYPES['MIXED'] : KAKAO_TYPES[topType]
  };
}

if (typeof module !== 'undefined') {
  module.exports = { KAKAO_QUESTIONS, KAKAO_TYPES, calcKakaoType };
}
