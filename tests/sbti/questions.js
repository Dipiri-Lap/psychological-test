// ============================================
// KBTI 테스트 - 30문항 데이터
// ============================================
// 구조: 5모델 × 6문항 = 30문항
// 채점: 각 문항 L=1 / M=2 / H=3
// 차원: 2문항 합산(2~6점) → L(2~3) / M(4) / H(5~6)
// 15차원 LMH 패턴 → 22개 유형 매칭
// ============================================

const KBTI_QUESTIONS = [

  // ==========================================
  // 🧠 자아 모델 (Q1~Q6)
  // 차원: S1=자존감(Q1,Q2) / S2=자의식(Q3,Q4) / S3=자기표현(Q5,Q6)
  // ==========================================
  {
    id: 1,
    model: "자아",
    dimension: "S1",
    question: "거울을 볼 때 나는?",
    choices: [
      { label: "L", text: "😐 어… 그냥 지나감. 별생각 없음", score: 1 },
      { label: "M", text: "🙂 괜찮네 정도는 생각함", score: 2 },
      { label: "H", text: "😎 솔직히 내가 봐도 좀 괜찮다", score: 3 }
    ]
  },
  {
    id: 2,
    model: "자아",
    dimension: "S1",
    question: "칭찬을 받았을 때 내 반응은?",
    choices: [
      { label: "L", text: "😶 아니에요… 하면서 진짜로 부정함", score: 1 },
      { label: "M", text: "😊 감사합니다 하고 어색하게 웃음", score: 2 },
      { label: "H", text: "😏 알고 있었지만 들으니까 또 좋네", score: 3 }
    ]
  },
  {
    id: 3,
    model: "자아",
    dimension: "S2",
    question: "사진 찍을 때 나는?",
    choices: [
      { label: "L", text: "🙈 구석에 서서 최대한 안 보이게", score: 1 },
      { label: "M", text: "📷 남들 하는 대로 그냥 평범하게", score: 2 },
      { label: "H", text: "💅 내 각도 내가 제일 잘 앎. 지시함", score: 3 }
    ]
  },
  {
    id: 4,
    model: "자아",
    dimension: "S2",
    question: "SNS 프로필 사진은?",
    choices: [
      { label: "L", text: "🌿 몇 년째 그대로. 또는 풍경사진", score: 1 },
      { label: "M", text: "🔄 가끔 바꿈. 무난한 사진으로", score: 2 },
      { label: "H", text: "✨ 자주 업데이트. 신경 많이 씀", score: 3 }
    ]
  },
  {
    id: 5,
    model: "자아",
    dimension: "S3",
    question: "내 의견이 다수와 다를 때?",
    choices: [
      { label: "L", text: "🤫 조용히 있음. 굳이 말 안 함", score: 1 },
      { label: "M", text: "🤔 분위기 봐서 살짝 언급", score: 2 },
      { label: "H", text: "✊ 소신껏 말함. 틀렸다고 생각 안 함", score: 3 }
    ]
  },
  {
    id: 6,
    model: "자아",
    dimension: "S3",
    question: "내 스타일을 한 마디로 하면?",
    choices: [
      { label: "L", text: "👕 스타일? 그냥 입는 거지", score: 1 },
      { label: "M", text: "🧥 튀지 않는 선에서 신경 씀", score: 2 },
      { label: "H", text: "🌟 확실한 내 색깔이 있음", score: 3 }
    ]
  },

  // ==========================================
  // 💓 감정 모델 (Q7~Q12)
  // 차원: E1=공감(Q7,Q8) / E2=감정표현(Q9,Q10) / E3=감정조절(Q11,Q12)
  // ==========================================
  {
    id: 7,
    model: "감정",
    dimension: "E1",
    question: "친구가 울면서 힘든 얘기를 할 때?",
    choices: [
      { label: "L", text: "😰 뭐라 해야 할지 모르겠어서 당황", score: 1 },
      { label: "M", text: "🤗 조용히 들어주고 위로해줌", score: 2 },
      { label: "H", text: "😢 나까지 울컥해서 같이 운 적 있음", score: 3 }
    ]
  },
  {
    id: 8,
    model: "감정",
    dimension: "E1",
    question: "영화나 드라마 보면서 운 적?",
    choices: [
      { label: "L", text: "🗿 거의 없음. 어떻게 울지?", score: 1 },
      { label: "M", text: "😥 진짜 슬픈 장면에서 살짝", score: 2 },
      { label: "H", text: "😭 자주. 심지어 광고 보고도 움", score: 3 }
    ]
  },
  {
    id: 9,
    model: "감정",
    dimension: "E2",
    question: "기분이 좋을 때 나는?",
    choices: [
      { label: "L", text: "🔇 혼자 속으로 좋아함", score: 1 },
      { label: "M", text: "😄 친한 사람한테만 얘기함", score: 2 },
      { label: "H", text: "📣 온 세상에 알리고 싶음. 표정에 다 나옴", score: 3 }
    ]
  },
  {
    id: 10,
    model: "감정",
    dimension: "E2",
    question: "화가 났을 때 나는?",
    choices: [
      { label: "L", text: "🫠 참다가 혼자 삭임", score: 1 },
      { label: "M", text: "💬 시간 두고 대화로 풀어냄", score: 2 },
      { label: "H", text: "💥 바로 터짐. 티 다 남", score: 3 }
    ]
  },
  {
    id: 11,
    model: "감정",
    dimension: "E3",
    question: "스트레스 받으면 나는?",
    choices: [
      { label: "L", text: "😔 며칠 동안 끙끙 앓음", score: 1 },
      { label: "M", text: "🏃 운동이나 취미로 전환", score: 2 },
      { label: "H", text: "😤 금방 털어내고 잊어버림", score: 3 }
    ]
  },
  {
    id: 12,
    model: "감정",
    dimension: "E3",
    question: "울고 싶을 때 나는?",
    choices: [
      { label: "L", text: "🚫 꾹 참음. 남 앞에선 절대 안 움", score: 1 },
      { label: "M", text: "🌙 혼자 있을 때 살짝", score: 2 },
      { label: "H", text: "💧 그냥 움. 참을 이유가 없음", score: 3 }
    ]
  },

  // ==========================================
  // 🌐 태도 모델 (Q13~Q18)
  // 차원: A1=세계관·신뢰(Q13,Q14) / A2=규칙·유연성(Q15,Q16) / A3=인생 의미감(Q17,Q18)
  // ==========================================
  {
    id: 13,
    model: "태도",
    dimension: "A1",
    question: "처음 만난 사람을 대할 때 나는?",
    choices: [
      { label: "L", text: "🛡️ 일단 경계부터. 증명되기 전까진 조심", score: 1 },
      { label: "M", text: "😐 중립. 좋은 것도 나쁜 것도 아님", score: 2 },
      { label: "H", text: "😊 일단 좋게 봄. 사람은 기본적으로 괜찮아", score: 3 }
    ]
  },
  {
    id: 14,
    model: "태도",
    dimension: "A1",
    question: "세상을 살면서 느끼는 내 기본 감각은?",
    choices: [
      { label: "L", text: "😒 조심해야 함. 호구 되기 싫음", score: 1 },
      { label: "M", text: "🤔 좋은 것도 나쁜 것도 있지", score: 2 },
      { label: "H", text: "🌱 생각보다 살 만해. 기회가 있어", score: 3 }
    ]
  },
  {
    id: 15,
    model: "태도",
    dimension: "A2",
    question: "약속이나 계획이 갑자기 바뀌면?",
    choices: [
      { label: "L", text: "😤 왜 미리 말 안 해? 불편함", score: 1 },
      { label: "M", text: "😮 살짝 당황하지만 금방 적응", score: 2 },
      { label: "H", text: "😎 괜찮아. 오히려 즉흥이 재밌음", score: 3 }
    ]
  },
  {
    id: 16,
    model: "태도",
    dimension: "A2",
    question: "규칙이나 절차를 지키는 것에 대해?",
    choices: [
      { label: "L", text: "📋 지켜야 함. 그게 맞는 거잖아", score: 1 },
      { label: "M", text: "⚖️ 상황에 따라 다름. 유연하게", score: 2 },
      { label: "H", text: "🌀 규칙보다 결과가 중요함", score: 3 }
    ]
  },
  {
    id: 17,
    model: "태도",
    dimension: "A3",
    question: "지금 하고 있는 일에서 의미를 느끼는지?",
    choices: [
      { label: "L", text: "😶 솔직히 잘 모르겠음. 그냥 하는 거지", score: 1 },
      { label: "M", text: "🙂 가끔은 느껴. 항상은 아님", score: 2 },
      { label: "H", text: "✨ 내가 왜 이걸 하는지 알고 있음", score: 3 }
    ]
  },
  {
    id: 18,
    model: "태도",
    dimension: "A3",
    question: "앞으로의 삶에 대한 내 태도는?",
    choices: [
      { label: "L", text: "😔 그냥 살다 보면 어떻게 되겠지", score: 1 },
      { label: "M", text: "🤷 기대도 포기도 없이 적당히", score: 2 },
      { label: "H", text: "🎯 내가 원하는 방향이 있고 그쪽으로 감", score: 3 }
    ]
  },

  // ==========================================
  // ⚡ 행동 모델 (Q19~Q24)
  // 차원: A1=결단력(Q19,Q20) / A2=실행력(Q21,Q22) / A3=끈기(Q23,Q24)
  // ==========================================
  {
    id: 19,
    model: "행동",
    dimension: "Ac1",
    question: "메뉴 고를 때 나는?",
    choices: [
      { label: "L", text: "🤯 아무거나. 정말 아무거나임", score: 1 },
      { label: "M", text: "🤔 두세 개 놓고 고민하다 결정", score: 2 },
      { label: "H", text: "⚡ 딱 보고 바로 결정", score: 3 }
    ]
  },
  {
    id: 20,
    model: "행동",
    dimension: "Ac1",
    question: "새로운 일을 시작할 때?",
    choices: [
      { label: "L", text: "📋 계획 오래 세움. 시작이 느림", score: 1 },
      { label: "M", text: "🔧 준비 좀 하다가 시작", score: 2 },
      { label: "H", text: "🚀 일단 시작하고 생각함", score: 3 }
    ]
  },
  {
    id: 21,
    model: "행동",
    dimension: "Ac2",
    question: "하고 싶은 게 생겼을 때?",
    choices: [
      { label: "L", text: "💭 생각만 하고 끝남", score: 1 },
      { label: "M", text: "🔍 시간 날 때 조금씩 알아봄", score: 2 },
      { label: "H", text: "🔥 오늘 당장 행동 개시", score: 3 }
    ]
  },
  {
    id: 22,
    model: "행동",
    dimension: "Ac2",
    question: "목표를 세우면 나는?",
    choices: [
      { label: "L", text: "😅 며칠 만에 까먹음", score: 1 },
      { label: "M", text: "💪 절반 정도는 해냄", score: 2 },
      { label: "H", text: "🏆 끝까지 밀어붙여서 완수", score: 3 }
    ]
  },
  {
    id: 23,
    model: "행동",
    dimension: "Ac3",
    question: "실패했을 때 나는?",
    choices: [
      { label: "L", text: "😞 의욕 떨어짐. 한동안 못 일어남", score: 1 },
      { label: "M", text: "⏳ 시간 지나면 다시 시도", score: 2 },
      { label: "H", text: "💡 바로 다음 방법 찾아 나섬", score: 3 }
    ]
  },
  {
    id: 24,
    model: "행동",
    dimension: "Ac3",
    question: "지루한 반복 작업을 할 때?",
    choices: [
      { label: "L", text: "🥱 못 버팀. 금방 그만둠", score: 1 },
      { label: "M", text: "😤 할 건 하지만 스트레스 받음", score: 2 },
      { label: "H", text: "🤖 묵묵히 끝까지 해냄", score: 3 }
    ]
  },

  // ==========================================
  // 🎭 사회 모델 (Q25~Q30)
  // 차원: So1=눈치(Q25,Q26) / So2=인정욕구(Q27,Q28) / So3=리더십(Q29,Q30)
  // ==========================================
  {
    id: 25,
    model: "사회",
    dimension: "So1",
    question: "단톡방 분위기가 이상할 때?",
    choices: [
      { label: "L", text: "😵 느끼긴 하는데 어쩌지 싶음", score: 1 },
      { label: "M", text: "👀 내 선에서 조심하게 됨", score: 2 },
      { label: "H", text: "🎯 바로 감지하고 분위기 전환 시도", score: 3 }
    ]
  },
  {
    id: 26,
    model: "사회",
    dimension: "So1",
    question: "내 노력을 알아주지 않을 때?",
    choices: [
      { label: "L", text: "🤷 어쩔 수 없지. 혼자 만족하면 됨", score: 1 },
      { label: "M", text: "😔 서운하지만 티는 안 냄", score: 2 },
      { label: "H", text: "😤 진지하게 서운함. 말해야 풀림", score: 3 }
    ]
  },
  {
    id: 27,
    model: "사회",
    dimension: "So2",
    question: "칭찬받고 싶은 마음은?",
    choices: [
      { label: "L", text: "😶 크게 없음. 부담스럽기도 함", score: 1 },
      { label: "M", text: "🙂 가끔은 듣고 싶음", score: 2 },
      { label: "H", text: "🌟 솔직히 자주 듣고 싶음", score: 3 }
    ]
  },
  {
    id: 28,
    model: "사회",
    dimension: "So2",
    question: "조별 과제나 모임에서 나는?",
    choices: [
      { label: "L", text: "🐢 시키는 것만 함. 뒤에 있음", score: 1 },
      { label: "M", text: "✅ 맡은 일 열심히. 나서진 않음", score: 2 },
      { label: "H", text: "📌 누가 말 안 해도 내가 정리함", score: 3 }
    ]
  },
  {
    id: 29,
    model: "사회",
    dimension: "So3",
    question: "누군가 내 의견을 무시하면?",
    choices: [
      { label: "L", text: "😶 그냥 넘어감. 혼자 삭임", score: 1 },
      { label: "M", text: "🤐 불편하지만 상황 봐서 대응", score: 2 },
      { label: "H", text: "💬 확실히 다시 말함. 인정받아야 함", score: 3 }
    ]
  },
  {
    id: 30,
    model: "사회",
    dimension: "So3",
    question: "리더 역할 맡게 되면?",
    choices: [
      { label: "L", text: "😨 부담스러워서 피하고 싶음", score: 1 },
      { label: "M", text: "😅 굳이면 할 수는 있음", score: 2 },
      { label: "H", text: "👑 좋음. 내가 제일 잘할 수 있음", score: 3 }
    ]
  }

];

// ============================================
// 채점 유틸리티 함수
// ============================================

// 답변 배열(30개) → 15개 차원 LMH 패턴 계산
function calcDimensions(answers) {
  // answers = [1,3,2,1,3,2, ...] (30개, 각 1~3)
  const dims = {};
  KBTI_QUESTIONS.forEach((q, i) => {
    if (!dims[q.dimension]) dims[q.dimension] = 0;
    dims[q.dimension] += answers[i];
  });

  // 각 차원 점수(2~6) → L/M/H
  const pattern = {};
  Object.keys(dims).forEach(dim => {
    const score = dims[dim];
    if (score <= 3) pattern[dim] = 'L';
    else if (score === 4) pattern[dim] = 'M';
    else pattern[dim] = 'H';
  });

  return pattern;
  // 반환 예: { S1:'H', S2:'M', S3:'H', E1:'L', E2:'M', ... }
}

// 패턴 → 유형 매칭 (Manhattan 거리)
function matchType(pattern, typePatterns) {
  const dimOrder = ['S1','S2','S3','E1','E2','E3','R1','R2','R3','A1','A2','A3','So1','So2','So3'];
  const toNum = v => v === 'L' ? 1 : v === 'M' ? 2 : 3;

  let bestType = null;
  let minDist = Infinity;

  Object.entries(typePatterns).forEach(([type, stdPattern]) => {
    let dist = 0;
    dimOrder.forEach(dim => {
      dist += Math.abs(toNum(pattern[dim]) - toNum(stdPattern[dim]));
    });
    if (dist < minDist) {
      minDist = dist;
      bestType = type;
    }
  });

  const matchScore = Math.max(0, Math.round((1 - minDist / 30) * 100));
  return { type: bestType, score: matchScore };
}

// 모듈 export (Node.js 환경용, 브라우저에선 무시됨)
if (typeof module !== 'undefined') {
  module.exports = { KBTI_QUESTIONS, calcDimensions, matchType };
}
