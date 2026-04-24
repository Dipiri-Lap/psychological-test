// ============================================
// 애착 유형 테스트 데이터
// ============================================
// 구조: 18문항, 선택지 6개 (각 유형에 1점)
// 채점: 가장 높은 점수 유형 = 결과
// 동점: 두 번째 높은 유형 = 혼합 유형 표시
// ============================================

const ATTACHMENT_QUESTIONS = [
  {
    id: 1,
    question: "연인에게 연락이 안 될 때 나는?",
    choices: [
      { text: "😌 별로 안 불안해. 바쁘겠지", type: "STABLE" },
      { text: "😰 혹시 화난 건 아닐까 계속 생각해", type: "ANXIOUS" },
      { text: "😑 오히려 혼자 시간이 생겨서 나쁘지 않아", type: "AVOIDANT" },
      { text: "😵 불안한데 먼저 연락하기도 싫어", type: "CHAOTIC" },
      { text: "📱 참다가 결국 먼저 연락함", type: "DEPENDENT" },
      { text: "🤷 나도 내 일 하면 되지", type: "INDEPENDENT" }
    ]
  },
  {
    id: 2,
    question: "새로운 연애를 시작할 때 드는 감정은?",
    choices: [
      { text: "🙂 설레고 자연스러워", type: "STABLE" },
      { text: "💓 좋은데 '이 사람도 날 떠나면 어떡하지' 싶어", type: "ANXIOUS" },
      { text: "😬 좋긴 한데 왠지 불편하고 어색해", type: "AVOIDANT" },
      { text: "🌀 원하는데 동시에 도망치고 싶어", type: "CHAOTIC" },
      { text: "🥰 드디어 내 전부를 쏟을 사람이 생겼어", type: "DEPENDENT" },
      { text: "😐 굳이 연애를 해야 하나 싶기도 해", type: "INDEPENDENT" }
    ]
  },
  {
    id: 3,
    question: "친한 친구가 갑자기 연락을 끊으면?",
    choices: [
      { text: "🤔 무슨 일 있나 걱정되지만 기다려봐", type: "STABLE" },
      { text: "😟 내가 뭘 잘못한 건지 계속 되짚어봐", type: "ANXIOUS" },
      { text: "😶 그럴 수 있지. 나도 그럴 때 있잖아", type: "AVOIDANT" },
      { text: "😤 화도 나고 걱정도 되고 뭔지 모를 감정", type: "CHAOTIC" },
      { text: "😢 너무 불안해서 공통 친구한테 물어봐", type: "DEPENDENT" },
      { text: "🏃 연락 오면 받지 뭐. 굳이 내가 먼저", type: "INDEPENDENT" }
    ]
  },
  {
    id: 4,
    question: "연인이 '우리 좀 거리 두자'고 하면?",
    choices: [
      { text: "💬 왜 그런지 대화로 풀어보자고 해", type: "STABLE" },
      { text: "😱 버림받는 건가 싶어서 엄청 불안해", type: "ANXIOUS" },
      { text: "😮‍💨 솔직히 나도 좀 쉬고 싶었어", type: "AVOIDANT" },
      { text: "🌀 거리 두자는 말이 이별 예고처럼 들려서 패닉", type: "CHAOTIC" },
      { text: "🥺 어떻게 하면 다시 가까워질 수 있는지 물어봐", type: "DEPENDENT" },
      { text: "👍 오케이. 나도 내 시간 쓸게", type: "INDEPENDENT" }
    ]
  },
  {
    id: 5,
    question: "상대방이 나를 많이 좋아한다고 느껴질 때?",
    choices: [
      { text: "😊 고맙고 나도 더 잘해주고 싶어", type: "STABLE" },
      { text: "😌 드디어 안심이 돼. 이 사람은 안 떠나겠구나", type: "ANXIOUS" },
      { text: "😰 왠지 부담스럽고 거리를 두고 싶어져", type: "AVOIDANT" },
      { text: "😵 좋은데 이게 언제까지 계속될지 불안해", type: "CHAOTIC" },
      { text: "💕 나도 더 많이 좋아하게 돼", type: "DEPENDENT" },
      { text: "🤔 고맙긴 한데 딱히 뭘 해줘야 할지 모르겠어", type: "INDEPENDENT" }
    ]
  },
  {
    id: 6,
    question: "혼자 있는 시간이 길어지면?",
    choices: [
      { text: "😌 충전되는 느낌. 적당히 필요해", type: "STABLE" },
      { text: "😔 외롭고 누군가 생각나", type: "ANXIOUS" },
      { text: "😎 이게 제일 편해. 더 오래 있어도 좋아", type: "AVOIDANT" },
      { text: "🌀 처음엔 좋다가 갑자기 공허해져", type: "CHAOTIC" },
      { text: "📞 못 버텨서 결국 누군가한테 연락해", type: "DEPENDENT" },
      { text: "🏡 혼자가 기본값이라 딱히 이상하지 않아", type: "INDEPENDENT" }
    ]
  },
  {
    id: 7,
    question: "연인과 싸운 후 나는?",
    choices: [
      { text: "🗣️ 풀릴 때까지 대화하려고 해", type: "STABLE" },
      { text: "😰 화해 못 하면 어떡하지 불안해서 먼저 사과해", type: "ANXIOUS" },
      { text: "🚪 일단 혼자 있고 싶어. 건드리지 마", type: "AVOIDANT" },
      { text: "😤 화해하고 싶은데 먼저 연락하기 자존심 상해", type: "CHAOTIC" },
      { text: "🥺 상대방 기분이 풀렸는지 계속 확인해", type: "DEPENDENT" },
      { text: "😐 냉각기 가지면 되지. 시간이 해결해줘", type: "INDEPENDENT" }
    ]
  },
  {
    id: 8,
    question: "상대방이 다른 이성과 친하게 지내면?",
    choices: [
      { text: "🙂 신뢰하니까 크게 신경 안 써", type: "STABLE" },
      { text: "😟 자꾸 신경 쓰이고 비교하게 돼", type: "ANXIOUS" },
      { text: "😑 나도 내 친구들 있으니까 상관없어", type: "AVOIDANT" },
      { text: "🌀 괜찮다고 했지만 속으로는 계속 걸려", type: "CHAOTIC" },
      { text: "😢 나보다 그 사람이 더 좋아지면 어떡하지", type: "DEPENDENT" },
      { text: "🤷 각자 관계가 있는 거지. 간섭 안 해", type: "INDEPENDENT" }
    ]
  },
  {
    id: 9,
    question: "누군가 나한테 의지하려고 하면?",
    choices: [
      { text: "😊 도와줄 수 있는 만큼 도와줘", type: "STABLE" },
      { text: "💕 나를 필요로 해준다는 게 좋아", type: "ANXIOUS" },
      { text: "😬 부담스럽고 어떻게 반응해야 할지 모르겠어", type: "AVOIDANT" },
      { text: "🌀 도와주고 싶은데 너무 가까워지면 어떡하나 싶어", type: "CHAOTIC" },
      { text: "🤗 내가 다 들어줄게. 나한테 기대", type: "DEPENDENT" },
      { text: "😐 나도 내 일이 있어서 딱 내 선에서만 도와줘", type: "INDEPENDENT" }
    ]
  },
  {
    id: 10,
    question: "관계에서 가장 무서운 건?",
    choices: [
      { text: "😕 오해가 쌓이는 것", type: "STABLE" },
      { text: "😱 버림받는 것", type: "ANXIOUS" },
      { text: "🔒 너무 얽히고 의존하게 되는 것", type: "AVOIDANT" },
      { text: "🌀 가까워졌다가 상처받는 것", type: "CHAOTIC" },
      { text: "😢 혼자 남겨지는 것", type: "DEPENDENT" },
      { text: "⛓️ 누군가한테 필요한 존재가 되는 것", type: "INDEPENDENT" }
    ]
  },
  {
    id: 11,
    question: "첫 만남에서 나는?",
    choices: [
      { text: "😊 자연스럽게 나를 열어. 경계가 많지 않아", type: "STABLE" },
      { text: "👀 상대방이 나를 어떻게 보는지 계속 신경 써", type: "ANXIOUS" },
      { text: "🧱 처음엔 좀 거리를 둬. 친해지는 데 시간 필요해", type: "AVOIDANT" },
      { text: "😵 알고 싶은데 들키기는 싫어", type: "CHAOTIC" },
      { text: "🙋 먼저 다가가고 관심을 보여줘", type: "DEPENDENT" },
      { text: "😌 필요하면 열리겠지. 굳이 먼저 나서진 않아", type: "INDEPENDENT" }
    ]
  },
  {
    id: 12,
    question: "연애 중 가장 힘든 순간은?",
    choices: [
      { text: "💬 소통이 안 될 때", type: "STABLE" },
      { text: "⏳ 답장이 늦거나 연락이 뜸할 때", type: "ANXIOUS" },
      { text: "🏠 내 공간과 시간이 침범당할 때", type: "AVOIDANT" },
      { text: "🎭 감정이 왔다 갔다 해서 나 자신을 모를 때", type: "CHAOTIC" },
      { text: "💔 상대방이 나보다 다른 걸 더 중요하게 여길 때", type: "DEPENDENT" },
      { text: "🔗 너무 많은 걸 공유해야 할 때", type: "INDEPENDENT" }
    ]
  },
  {
    id: 13,
    question: "이별 후 나는?",
    choices: [
      { text: "😔 슬프지만 시간이 지나면 괜찮아져", type: "STABLE" },
      { text: "😭 왜 헤어졌는지 계속 되짚고 연락하고 싶어", type: "ANXIOUS" },
      { text: "😶 생각보다 금방 일상으로 돌아와", type: "AVOIDANT" },
      { text: "🌀 잊으려고 하는데 잊히지 않고, 연락하려다 참고", type: "CHAOTIC" },
      { text: "📵 이별 자체를 못 받아들이고 매달려", type: "DEPENDENT" },
      { text: "🏃 바로 내 루틴으로 복귀. 시간 낭비 안 해", type: "INDEPENDENT" }
    ]
  },
  {
    id: 14,
    question: "상대방이 나의 과거를 알게 되면?",
    choices: [
      { text: "😊 있는 그대로 알아줬으면 해", type: "STABLE" },
      { text: "😰 판단받을까봐 두려워", type: "ANXIOUS" },
      { text: "🔒 굳이 다 알 필요 없다고 생각해", type: "AVOIDANT" },
      { text: "😵 알려주고 싶은데 상처받을까봐 못 꺼내", type: "CHAOTIC" },
      { text: "🥺 알고도 떠나지 않으면 더 의지하게 될 것 같아", type: "DEPENDENT" },
      { text: "😐 내 과거가 관계를 정의해야 한다고 생각 안 해", type: "INDEPENDENT" }
    ]
  },
  {
    id: 15,
    question: "상대방이 힘들다고 할 때 나는?",
    choices: [
      { text: "🤗 같이 있어주거나 들어줘", type: "STABLE" },
      { text: "💕 내가 해결해줘야 한다는 압박감을 느껴", type: "ANXIOUS" },
      { text: "😬 뭐라고 해야 할지 몰라서 어색해", type: "AVOIDANT" },
      { text: "🌀 걱정되지만 너무 깊이 들어가면 나도 힘들어질 것 같아", type: "CHAOTIC" },
      { text: "🙋 무조건 옆에 있어줘. 내 일은 나중에", type: "DEPENDENT" },
      { text: "💬 조언해주고 해결책 찾아줘", type: "INDEPENDENT" }
    ]
  },
  {
    id: 16,
    question: "관계에서 나의 패턴은?",
    choices: [
      { text: "😊 큰 기복 없이 꾸준히 잘 유지해", type: "STABLE" },
      { text: "🎢 처음엔 올인하다가 불안해지면 확인하고 집착해", type: "ANXIOUS" },
      { text: "🌊 처음엔 좋다가 어느 순간 벽을 세워", type: "AVOIDANT" },
      { text: "🌀 가까워지면 도망가고 멀어지면 다가가", type: "CHAOTIC" },
      { text: "💞 상대방 중심으로 내 일상이 맞춰져", type: "DEPENDENT" },
      { text: "🏝️ 적당한 거리를 유지하고 혼자 시간이 반드시 필요해", type: "INDEPENDENT" }
    ]
  },
  {
    id: 17,
    question: "진심으로 누군가를 믿는 게?",
    choices: [
      { text: "😊 어렵지 않아. 믿는 게 기본이야", type: "STABLE" },
      { text: "😔 믿고 싶은데 배신당할까봐 무서워", type: "ANXIOUS" },
      { text: "🔒 쉽지 않아. 믿었다가 다친 적 있어", type: "AVOIDANT" },
      { text: "🌀 믿고 싶은 마음이랑 의심하는 마음이 동시에 있어", type: "CHAOTIC" },
      { text: "🥺 한번 믿으면 끝까지 믿어. 그래서 더 상처받아", type: "DEPENDENT" },
      { text: "😐 굳이 완전히 믿을 필요가 있나 싶어", type: "INDEPENDENT" }
    ]
  },
  {
    id: 18,
    question: "이상적인 관계는?",
    choices: [
      { text: "🤝 서로 독립적이면서 든든하게 연결된 관계", type: "STABLE" },
      { text: "💞 항상 함께하고 서로가 서로의 1순위인 관계", type: "ANXIOUS" },
      { text: "🏡 각자 생활이 확실하고 간섭 없는 관계", type: "AVOIDANT" },
      { text: "😔 상처 없이 가까워질 수 있는 관계 (그게 가능하다면)", type: "CHAOTIC" },
      { text: "💕 내가 필요할 때 항상 거기 있어주는 관계", type: "DEPENDENT" },
      { text: "🙌 서로 성장하면서 자극 주는 관계", type: "INDEPENDENT" }
    ]
  }
];

// ============================================
// 6가지 애착 유형 결과 데이터
// ============================================

const ATTACHMENT_TYPES = {
  STABLE: {
    emoji: "🌿",
    name: "안정형",
    tagline: "관계가 원래 이렇게 편한 거야?",
    color: "#2ECC71",
    desc: "신뢰가 기본값으로 설정된 사람. 연락이 늦어도 크게 불안하지 않고, 싸워도 대화로 풀 수 있다고 믿어. 상대방을 있는 그대로 받아들이고, 나 자신도 있는 그대로 보여줄 수 있어. 관계에서 에너지를 쏟되 소진되지 않는 타입. 주변 사람들이 당신 옆에 있으면 이상하게 안정되는 이유야."
  },
  ANXIOUS: {
    emoji: "💓",
    name: "불안형",
    tagline: "괜찮다고 했는데 왜 아직도 불안하지?",
    color: "#E74C3C",
    desc: "사랑받고 싶은 마음이 누구보다 강한 타입. 답장이 늦으면 뭔가 잘못된 건지 되짚어보고, 상대방 표정 변화 하나에 촉각이 곤두서. 불안한 게 아니라 그만큼 소중히 여기는 거야. 근데 그 불안이 때로는 상대방도, 나 자신도 지치게 만들어. 확인받고 싶은 마음 뒤에는 '나는 사랑받을 자격이 있어'라는 확신이 아직 자리 잡지 못한 거야."
  },
  AVOIDANT: {
    emoji: "🧊",
    name: "회피형",
    tagline: "가까워지면 왜 불편해지는 걸까.",
    color: "#4A90D9",
    desc: "혼자가 편하고 누군가 너무 가까워지면 본능적으로 거리를 두는 타입. 차갑거나 냉정한 게 아니야. 너무 가까워졌다가 상처받는 게 두려운 거야. 독립적이고 자기 세계가 확실한 게 강점이지만, 가끔은 그 벽이 진짜 원하는 연결을 막고 있는 건 아닌지 생각해볼 필요가 있어."
  },
  CHAOTIC: {
    emoji: "🌀",
    name: "혼란형",
    tagline: "원하는데 왜 도망치고 싶은 거야.",
    color: "#9B59B6",
    desc: "가까워지고 싶은데 가까워지면 무서운 타입. 밀고 당기기가 전략이 아니라 진짜 감정이야. 관계가 좋아질수록 오히려 불안해지고, 멀어지면 또 그리워져. 과거의 상처가 현재 관계에 자꾸 끼어드는 거야. 혼란스러운 게 당신 잘못이 아니야. 그 감정의 출처를 이해하는 게 시작이야."
  },
  DEPENDENT: {
    emoji: "💞",
    name: "의존형",
    tagline: "네가 있어야 내가 완전해지는 것 같아.",
    color: "#FF69B4",
    desc: "관계가 삶의 중심인 타입. 상대방이 기쁘면 나도 기쁘고, 상대방이 힘들면 나도 힘들어. 헌신적이고 따뜻한 게 진짜 강점이지만, 나를 잃어가면서 관계를 유지하는 건 오래 못 가. 상대방을 사랑하는 만큼, 나 자신도 사랑받을 존재라는 걸 기억해줬으면 해."
  },
  INDEPENDENT: {
    emoji: "🏝️",
    name: "독립형",
    tagline: "혼자도 충분한데, 굳이 누가 필요해?",
    color: "#E67E22",
    desc: "자급자족이 몸에 밴 타입. 감정적으로도 누구한테 기대는 게 낯설어. 누군가 필요하다는 느낌 자체가 약점처럼 느껴질 때가 있어. 독립적인 게 강점이지만, 가끔은 도움을 받는 것도 관계의 일부라는 걸 잊지 마. 연결이 의존이 아니라 선택이 될 수 있어."
  }
};

// ============================================
// 채점 함수
// ============================================

function calcAttachmentType(answers) {
  // answers = ['STABLE', 'ANXIOUS', ...] 18개
  const scores = { STABLE:0, ANXIOUS:0, AVOIDANT:0, CHAOTIC:0, DEPENDENT:0, INDEPENDENT:0 };
  answers.forEach(type => { if (scores[type] !== undefined) scores[type]++; });

  // 점수 내림차순 정렬
  const sorted = Object.entries(scores).sort((a, b) => b[1] - a[1]);
  const topType = sorted[0][0];
  const secondType = sorted[1][0];
  const topScore = sorted[0][1];
  const secondScore = sorted[1][1];

  // 동점이면 혼합 유형 표시
  const isBlended = topScore === secondScore;

  return {
    primary: topType,
    secondary: secondType,
    scores,
    isBlended,
    primaryInfo: ATTACHMENT_TYPES[topType],
    secondaryInfo: ATTACHMENT_TYPES[secondType]
  };
}

if (typeof module !== 'undefined') {
  module.exports = { ATTACHMENT_QUESTIONS, ATTACHMENT_TYPES, calcAttachmentType };
}

// ============================================
// 러너 설정 등록
// ============================================

window.TEST_CONFIGS = window.TEST_CONFIGS || {};

window.TEST_CONFIGS['attachment'] = {
  data: {
    title: "애착 유형 테스트",
    emoji: "💞",
    thumb: "images/attachment/thumb.webp",
    subtitle: "나의 애착 유형은? (18문항)",
    questions: ATTACHMENT_QUESTIONS.map(q => ({ q: q.question, choices: q.choices })),
    results: ATTACHMENT_TYPES
  },
  onAnswer(choice, state) {
    state.answersRaw.push(choice.type);
  },
  calcResult(state) {
    const result = calcAttachmentType(state.answersRaw);
    const winner = result.primary;
    const t      = result.primaryInfo;
    return { winner, type: t.name, emoji: t.emoji, desc: t.desc, tagline: t.tagline };
  },
  getShareImage(winner) {
    return `images/attachment/${winner}.webp`;
  },
  getSaveFilename(winner) {
    return `ATTACHMENT_${winner}.webp`;
  }
};
