// ============================================
// 잠자는 자세로 알아보는 연애 스타일 테스트
// ============================================
// 구조: 질문 1개 → 선택지 4개 → 즉시 결과
// ============================================

const SLEEP_QUESTION = {
  id: 1,
  question: "오늘 밤 잠들기 전,\n당신은 주로 어떤 자세로 자나요?",
  subtitle: "가장 자주 취하는 자세를 골라주세요 🌙",
  choices: [
    {
      id: "FETAL",
      emoji: "🌙",
      label: "옆으로 웅크려서",
      sub: "무릎을 살짝 당겨 몸을 둥글게 말아서 자요"
    },
    {
      id: "SOLDIER",
      emoji: "⭐",
      label: "똑바로 누워서",
      sub: "팔을 몸 옆에 붙이고 반듯하게 누워서 자요"
    },
    {
      id: "FREEFALL",
      emoji: "🌊",
      label: "엎드려서",
      sub: "배를 바닥에 대고 팔을 뻗어서 자요"
    },
    {
      id: "STARFISH",
      emoji: "✨",
      label: "대자로 펼쳐서",
      sub: "팔다리를 쭉 뻗고 넓게 퍼져서 자요"
    }
  ]
};

// ============================================
// 4가지 연애 스타일 결과
// ============================================

const SLEEP_TYPES = {
  FETAL: {
    emoji: "🌙",
    pose: "태아 자세",
    name: "조용히 깊게 사랑하는 사람",
    tagline: "겉은 조용해도, 속은 누구보다 뜨거워.",
    color: "#9B59B6",
    traits: [
      {
        title: "한 번 마음 열면 전부 주는 타입",
        desc: "처음엔 쉽게 마음을 열지 않아. 경계가 있고 신중해서 상대방이 답답하게 느낄 수도 있어. 근데 한 번 믿음이 생기면 그 누구보다 깊고 진하게 사랑해. 마음의 문을 여는 데 시간이 걸리는 거지, 사랑하지 않는 게 아니야."
      },
      {
        title: "감정 표현보다 행동으로 증명",
        desc: "달달한 말보다 상대방이 지나가듯 한 말을 기억했다가 챙겨주거나, 힘들 때 조용히 옆에 있어주는 방식으로 사랑을 표현해. '사랑해'보다 행동이 먼저인 타입이야."
      },
      {
        title: "상처받는 걸 두려워해",
        desc: "몸을 웅크리는 자세처럼, 연애에서도 나를 보호하려는 본능이 있어. 상처받은 경험이 있을수록 더 단단하게 스스로를 지키려 해. 그 안에 있는 따뜻함을 꺼내줄 사람이 필요한 타입이야."
      },
      {
        title: "한 사람에게 집중하는 스타일",
        desc: "넓게 여러 사람을 만나는 것보다 한 사람과 깊게 연결되는 걸 선호해. 연애할 때 상대방이 세상의 전부가 되는 타입. 그만큼 이별 후 회복하는 데 시간이 좀 걸리기도 해."
      }
    ]
  },
  SOLDIER: {
    emoji: "⭐",
    pose: "차렷 자세",
    name: "원칙 있고 신뢰할 수 있는 연인",
    tagline: "한 번 한 약속은 반드시 지켜.",
    color: "#4A90D9",
    traits: [
      {
        title: "일관성 있고 믿음직한 파트너",
        desc: "감정 기복이 크지 않고 안정적이야. 기분에 따라 태도가 달라지는 타입이 아니라서, 연인 입장에서는 옆에 있으면 편안하고 안심이 돼. 당신이 있으면 뭔가 든든한 느낌."
      },
      {
        title: "약속과 원칙을 중요하게 여겨",
        desc: "한 번 한 약속은 어지간해서 어기지 않아. 연애에서도 '우리 사이의 룰'을 중요하게 생각하고, 상대방도 그걸 지켜주길 기대해. 신뢰가 무너지는 순간 회복이 쉽지 않은 타입이야."
      },
      {
        title: "감정 표현이 서툰 편",
        desc: "사랑하는 감정이 없는 게 아니야. 표현하는 방식이 조용하고 절제된 것뿐이야. 오글거리는 멘트나 과한 스킨십보다 함께 있는 시간 자체로 사랑을 전달하는 타입이야."
      },
      {
        title: "완벽주의가 연애에도 적용돼",
        desc: "관계도 '제대로' 해야 직성이 풀리는 편이야. 가끔 상대방에게 너무 높은 기준을 요구하거나, 본인도 그 기준에 맞추려다 지칠 때가 있어. 가끔은 좀 흐트러져도 괜찮아."
      }
    ]
  },
  FREEFALL: {
    emoji: "🌊",
    pose: "엎드린 자세",
    name: "열정적이고 자유로운 연인",
    tagline: "사랑도 인생도 일단 뛰어들고 봐.",
    color: "#E67E22",
    traits: [
      {
        title: "감정에 솔직하고 표현이 풍부해",
        desc: "좋으면 좋다고, 설레면 설렌다고 바로 표현해. 속마음을 숨기거나 밀당하는 게 오히려 더 힘들어. 감정에 솔직한 게 때로는 상대방을 압도하기도 하지만, 그 진심이 매력이야."
      },
      {
        title: "열정적이지만 구속은 싫어",
        desc: "사랑할 때는 폭발적으로 사랑하지만, 그렇다고 연인이 나를 통제하거나 구속하는 건 못 견뎌. 내가 선택해서 함께하는 거지, 묶여 있는 게 아니라는 걸 항상 느끼고 싶어해."
      },
      {
        title: "즉흥적인 로맨스를 좋아해",
        desc: "계획된 데이트보다 갑자기 '오늘 드라이브 갈래?'처럼 즉흥적인 순간에 더 설레는 타입이야. 루틴한 연애가 오래되면 지루함을 느끼고, 새로운 자극을 찾게 돼."
      },
      {
        title: "상처를 빠르게 극복하는 편",
        desc: "이별이나 갈등 후에 오래 끙끙 앓지 않아. 감정을 충분히 쏟아내고 나면 비교적 빠르게 털고 일어나는 편이야. 그게 상대방에겐 때로 '벌써 잊었나?' 싶게 보이기도 해."
      }
    ]
  },
  STARFISH: {
    emoji: "✨",
    pose: "불가사리 자세",
    name: "에너지 넘치고 주도적인 연인",
    tagline: "내가 있는 곳에 중심이 생겨.",
    color: "#E74C3C",
    traits: [
      {
        title: "연애에서도 자연스럽게 리드해",
        desc: "어디 갈지, 뭐 먹을지, 어떻게 시간을 보낼지 — 결정하는 걸 불편해하지 않아. 오히려 상대방이 '아무거나'라고 하면 답답할 때가 있어. 리드하는 게 자연스럽고 그게 편해."
      },
      {
        title: "애정 표현이 크고 넘쳐",
        desc: "사랑하는 감정을 숨기는 게 더 어려운 타입이야. 스킨십도 많고, 연락도 자주 하고, 상대방이 내 세계에서 얼마나 중요한지 표현하는 걸 좋아해. 연인 입장에서는 사랑받는 느낌이 확실해."
      },
      {
        title: "공간을 채우는 에너지가 있어",
        desc: "당신이 있는 자리는 왠지 활기차고 재밌어. 연애할 때도 그 에너지가 그대로 전달돼서, 같이 있으면 심심할 틈이 없어. 근데 가끔 상대방이 그 에너지에 지칠 수도 있다는 걸 알아야 해."
      },
      {
        title: "질투심이 있고 독점욕도 강해",
        desc: "사랑하는 만큼 상대방을 온전히 갖고 싶은 마음이 있어. 연인이 다른 사람과 친하게 지내는 걸 보면 신경이 쓰이고, 그게 표현으로 나오기도 해. 그 감정이 집착으로 보이지 않게 조절하는 연습이 필요해."
      }
    ]
  }
};

// ============================================
// 결과 반환 함수
// ============================================

function getSleepResult(poseId) {
  return SLEEP_TYPES[poseId] || null;
}

if (typeof module !== 'undefined') {
  module.exports = { SLEEP_QUESTION, SLEEP_TYPES, getSleepResult };
}

// ============================================
// 러너 설정 등록
// ============================================

const _SLEEP_IMG_IDX = { FETAL: 1, SOLDIER: 2, FREEFALL: 3, STARFISH: 4 };

window.TEST_CONFIGS = window.TEST_CONFIGS || {};

window.TEST_CONFIGS['sleeplove'] = {
  data: {
    title: "잠자는 자세 연애 스타일",
    emoji: "😴",
    thumb: "images/sleeplove/thumb.png",
    subtitle: "잠드는 자세로 알아보는 나의 연애 스타일",
    questions: [{
      q: SLEEP_QUESTION.question,
      img: "images/sleeplove/0.png",
      choices: SLEEP_QUESTION.choices.map(c => ({
        id: c.id,
        text: `${c.label}`,
        sub: c.sub,
        emoji: c.emoji
      }))
    }],
    results: SLEEP_TYPES
  },
  onAnswer(choice, state) {
    state.answersRaw.push(choice.id);
  },
  calcResult(state) {
    const winner = state.answersRaw[0];
    const t      = SLEEP_TYPES[winner];
    return { winner, type: t.name, emoji: t.emoji, desc: t.tagline, tagline: t.tagline };
  },
  getShareImage(winner) {
    return `images/sleeplove/${_SLEEP_IMG_IDX[winner]}.png`;
  },
  getSaveFilename(winner) {
    return `SLEEPLOVE_${winner}.webp`;
  },
  shareImageStyle: { width: '75%', margin: '0 auto' },
  afterResult(result) {
    const t = SLEEP_TYPES[result.winner];
    renderFingerTraits(t.traits, t.color);
  }
};
