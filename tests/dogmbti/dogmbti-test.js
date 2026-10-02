// ============================================
// 우리 강아지 MBTI 검사
// ============================================
// 구조: 28문항(축당 7문항), 2지선다 강제선택, 4축 → 16유형
// 축: E/I(사교성) · S/N(호기심) · T/F(교감 방식) · J/P(생활 방식)
// 채점: 각 문항에서 고른 글자에 +1, 축마다 7문항이라 동점 없음
// 결과: 4글자 유형 + 축별 성향 강도(%) + 궁합 유형
// 보호자가 "우리 애라면 어떨까?"를 떠올리며 답하는 방식
// ============================================

const DOGMBTI_QUESTIONS = [
  // ── E/I : 사교성 ───────────────────────────
  {
    id: 1, axis: "EI", emoji: "🚶",
    question: "산책 중 낯선 사람이 다가오면 우리 강아지는?",
    choices: [
      { text: "🐕 꼬리를 흔들며 먼저 달려가 인사한다", type: "E" },
      { text: "🫣 보호자 뒤로 슬쩍 숨거나 거리를 두고 관찰한다", type: "I" }
    ]
  },
  {
    id: 2, axis: "EI", emoji: "🏞️",
    question: "애견 운동장이나 애견 카페에 도착하면?",
    choices: [
      { text: "🏃 문 열리자마자 친구를 찾아 돌진한다", type: "E" },
      { text: "👀 한쪽에서 분위기를 살핀 뒤 천천히 합류하거나 보호자 곁에 머문다", type: "I" }
    ]
  },
  {
    id: 3, axis: "EI", emoji: "🔔",
    question: "집에 손님이 찾아오면?",
    choices: [
      { text: "🎉 현관까지 뛰어나가 온몸으로 환영한다", type: "E" },
      { text: "🛋️ 멀찍이서 지켜보다가 한참 뒤에야 다가간다", type: "I" }
    ]
  },
  {
    id: 4, axis: "EI", emoji: "🐾",
    question: "산책길에서 다른 강아지를 만났을 때 우리 강아지는?",
    choices: [
      { text: "🤝 눈에 보이는 강아지마다 인사하고 싶어 한다", type: "E" },
      { text: "🎯 마음에 드는 몇 마리에게만 관심을 보이고 나머지는 지나친다", type: "I" }
    ]
  },
  {
    id: 5, axis: "EI", emoji: "🔋",
    question: "신나게 외출하고 돌아온 뒤 우리 강아지는?",
    choices: [
      { text: "⚡ 만난 사람, 친구가 많을수록 오히려 에너지가 더 넘친다", type: "E" },
      { text: "😴 집에 오자마자 자기 자리에서 조용히 쉬며 충전한다", type: "I" }
    ]
  },
  {
    id: 6, axis: "EI", emoji: "👨‍👩‍👧‍👦",
    question: "가족 모임이나 캠핑처럼 사람이 많이 모인 자리에서는?",
    choices: [
      { text: "🙋 이 손 저 손 돌아다니며 관심을 즐긴다", type: "E" },
      { text: "🪑 한두 명 곁에 조용히 있거나 구석을 찾아간다", type: "I" }
    ]
  },
  {
    id: 7, axis: "EI", emoji: "🏠",
    question: "보호자가 없는 시간, 혼자 있을 때 우리 강아지는?",
    choices: [
      { text: "🥱 심심해서 힘들어한다. 에너지가 쌓이면 사고를 치기도 한다", type: "E" },
      { text: "🧸 자기 자리에서 알아서 잘 쉬거나 혼자 놀이를 찾는다", type: "I" }
    ]
  },

  // ── S/N : 호기심 ───────────────────────────
  {
    id: 8, axis: "SN", emoji: "🧸",
    question: "새 장난감을 사줬을 때 우리 강아지는?",
    choices: [
      { text: "🔄 결국 익숙한 최애 장난감으로 돌아간다", type: "S" },
      { text: "🤩 새 장난감에 흥미가 폭발하고 분해까지 시도한다", type: "N" }
    ]
  },
  {
    id: 9, axis: "SN", emoji: "🗺️",
    question: "평소와 다른 산책 코스로 가면 우리 강아지는?",
    choices: [
      { text: "🧭 늘 가던 길이 제일 편한지 멈칫하거나 원래 길로 가려 한다", type: "S" },
      { text: "🚀 새 길이 반가운지 오히려 앞장서서 탐험한다", type: "N" }
    ]
  },
  {
    id: 10, axis: "SN", emoji: "📦",
    question: "처음 보는 물건(택배 상자, 청소기, 우산)을 만나면?",
    choices: [
      { text: "🙅 경계하며 거리를 두거나 못 본 척한다", type: "S" },
      { text: "👃 일단 킁킁거리고 올라타 보며 탐구한다", type: "N" }
    ]
  },
  {
    id: 11, axis: "SN", emoji: "🦴",
    question: "처음 보는 간식을 내밀면?",
    choices: [
      { text: "🤨 냄새를 오래 맡고 의심한다. 먹던 간식이 제일 좋다", type: "S" },
      { text: "😋 일단 덥석 맛본다. 새로운 맛은 언제나 환영이다", type: "N" }
    ]
  },
  {
    id: 12, axis: "SN", emoji: "🎾",
    question: "우리 강아지가 가장 좋아하는 놀이 방식은?",
    choices: [
      { text: "🥎 공 던지기처럼 규칙이 분명하고 익숙한 놀이", type: "S" },
      { text: "🎭 이불 속 숨기, 보자기 놀이처럼 변형이 많고 자기가 놀이를 만들어내는 놀이", type: "N" }
    ]
  },
  {
    id: 13, axis: "SN", emoji: "🎓",
    question: "새로운 훈련이나 개인기를 가르칠 때 우리 강아지는?",
    choices: [
      { text: "📚 한번 익히면 같은 방식으로 꾸준히, 정확하게 해낸다", type: "S" },
      { text: "💡 응용을 금방 시도하지만 반복하면 금세 지루해한다", type: "N" }
    ]
  },
  {
    id: 14, axis: "SN", emoji: "🪟",
    question: "창밖을 바라볼 때 우리 강아지의 모습은?",
    choices: [
      { text: "👮 눈앞에 보이는 것(이웃, 택배 기사, 지나가는 개)에 즉각 반응한다", type: "S" },
      { text: "🌌 한참 멍하니 쳐다보다가 갑자기 뭔가에 꽂혀 달려간다", type: "N" }
    ]
  },

  // ── T/F : 교감 방식 ─────────────────────────
  {
    id: 15, axis: "TF", emoji: "😢",
    question: "보호자가 울적하거나 힘들어 보일 때 우리 강아지는?",
    choices: [
      { text: "🥺 곁에 와서 기대고 핥으며 위로하려 한다", type: "F" },
      { text: "😐 크게 반응 없이 자기 할 일을 하다가 가끔 상태만 확인한다", type: "T" }
    ]
  },
  {
    id: 16, axis: "TF", emoji: "🙇",
    question: "혼이 났을 때 우리 강아지는?",
    choices: [
      { text: "😞 눈치를 보며 한동안 시무룩하게 기가 죽는다", type: "F" },
      { text: "😎 잠깐 쳐다보다가 금방 잊고 다시 해맑아진다", type: "T" }
    ]
  },
  {
    id: 17, axis: "TF", emoji: "🍖",
    question: "우리 강아지에게 가장 강력한 보상은?",
    choices: [
      { text: "🥰 칭찬하는 목소리와 쓰다듬는 손길", type: "F" },
      { text: "🍗 확실한 간식. 보상이 확실해야 움직인다", type: "T" }
    ]
  },
  {
    id: 18, axis: "TF", emoji: "🧩",
    question: "간식이 소파 밑에 굴러 들어가 꺼내기 어려울 때 우리 강아지는?",
    choices: [
      { text: "🦾 혼자서 끙끙대며 끝까지 해결해 보려 한다", type: "T" },
      { text: "🥹 포기하고 보호자를 쳐다보며 도와달라는 눈빛을 보낸다", type: "F" }
    ]
  },
  {
    id: 19, axis: "TF", emoji: "🤗",
    question: "보호자가 안아주려고 하면?",
    choices: [
      { text: "💞 안겨 있는 걸 좋아하고 계속 붙어 있고 싶어 한다", type: "F" },
      { text: "🙄 잠깐은 괜찮지만 곧 내려달라고 하고 적당한 거리를 선호한다", type: "T" }
    ]
  },
  {
    id: 20, axis: "TF", emoji: "🚪",
    question: "보호자가 퇴근해 현관문을 열었을 때 우리 강아지는?",
    choices: [
      { text: "😭 눈물 날 정도의 열렬한 환영과 한동안 졸졸 따라다니기", type: "F" },
      { text: "😌 반갑게 인사는 하지만 짧게 끝내고 쿨하게 제 할 일을 한다", type: "T" }
    ]
  },
  {
    id: 21, axis: "TF", emoji: "🗣️",
    question: "보호자가 말을 걸 때 우리 강아지가 더 잘 반응하는 건?",
    choices: [
      { text: "🎵 말투와 목소리 톤. 기분이 달라지면 바로 알아챈다", type: "F" },
      { text: "🦮 목소리 톤보다 행동 신호(리드줄, 밥그릇 소리, 손짓)", type: "T" }
    ]
  },

  // ── J/P : 생활 방식 ─────────────────────────
  {
    id: 22, axis: "JP", emoji: "⏰",
    question: "밥시간과 산책시간이 되면 우리 강아지는?",
    choices: [
      { text: "⏱️ 알람처럼 정확히 알고 와서 재촉한다", type: "J" },
      { text: "🌤️ 시간은 별로 신경 쓰지 않고 그때그때 기분대로 움직인다", type: "P" }
    ]
  },
  {
    id: 23, axis: "JP", emoji: "🛏️",
    question: "우리 강아지의 잠자리와 장난감 정리 상태는?",
    choices: [
      { text: "📐 자기 자리, 담요, 장난감 위치가 정해져 있고 거기서만 잔다", type: "J" },
      { text: "🌀 아무 데서나 자고 장난감은 온 집 안에 흩어져 있다", type: "P" }
    ]
  },
  {
    id: 24, axis: "JP", emoji: "🌸",
    question: "산책할 때 우리 강아지의 걷는 스타일은?",
    choices: [
      { text: "🎯 정해진 코스를 따라 목적지로 곧장 걸으려 한다", type: "J" },
      { text: "🌿 냄새 따라 멈췄다 가다, 방향도 수시로 바뀐다", type: "P" }
    ]
  },
  {
    id: 25, axis: "JP", emoji: "🛋️",
    question: "'소파 금지' 같은 집안 규칙을 알려줬다면?",
    choices: [
      { text: "📏 한번 배운 규칙은 보호자가 없어도 꽤 잘 지킨다", type: "J" },
      { text: "😏 보호자가 안 볼 땐 슬쩍 어기며 규칙을 협상하려 한다", type: "P" }
    ]
  },
  {
    id: 26, axis: "JP", emoji: "💤",
    question: "낮잠이나 취침 패턴은?",
    choices: [
      { text: "🌙 자는 시간과 장소가 거의 일정하다", type: "J" },
      { text: "🛌 졸리면 그 자리에서 바로 뻗는다", type: "P" }
    ]
  },
  {
    id: 27, axis: "JP", emoji: "👟",
    question: "외출 준비 신호(옷 갈아입기, 가방 들기)가 보이면?",
    choices: [
      { text: "🔮 흐름을 읽고 미리 현관에 가서 대기한다", type: "J" },
      { text: "🦋 딴짓을 하다가 직전에야 뒤늦게 눈치채고 달려온다", type: "P" }
    ]
  },
  {
    id: 28, axis: "JP", emoji: "🎓",
    question: "훈련 중 우리 강아지의 집중력은?",
    choices: [
      { text: "🧘 한 가지를 끝까지 마무리하고 지시를 차분히 수행한다", type: "J" },
      { text: "🦘 하다가 흥미 가는 쪽으로 이탈하는 일이 잦다", type: "P" }
    ]
  }
];

// ============================================
// 4개 축 정의
// ============================================

const DOGMBTI_AXES = {
  EI: {
    title: "사교성",
    pair: ["E", "I"],
    E: {
      name: "사교형", emoji: "🎉", color: "#F2994A",
      desc: "사람과 강아지 친구를 만날수록 에너지를 얻는 타입. 낯선 존재도 친구 후보로 봅니다."
    },
    I: {
      name: "신중형", emoji: "🌙", color: "#6C7BD9",
      desc: "믿는 대상 몇 명과 있을 때 가장 편한 타입. 새로운 상대는 시간을 두고 천천히 받아들입니다."
    }
  },
  SN: {
    title: "호기심",
    pair: ["S", "N"],
    S: {
      name: "안정형", emoji: "🏡", color: "#4FA37A",
      desc: "익숙한 길, 익숙한 장난감, 익숙한 간식을 선호합니다. 예측 가능한 환경에서 마음이 편해요."
    },
    N: {
      name: "탐험형", emoji: "🔭", color: "#B07CE0",
      desc: "새로운 냄새, 새로운 물건, 새로운 길에 끌립니다. 지루함을 못 참고 늘 자극을 찾아요."
    }
  },
  TF: {
    title: "교감 방식",
    pair: ["T", "F"],
    T: {
      name: "독립형", emoji: "🧊", color: "#4A9DD0",
      desc: "혼자서도 잘 해내고 적당한 거리를 좋아합니다. 애정은 있지만 쿨하게 표현하는 편이에요."
    },
    F: {
      name: "교감형", emoji: "💗", color: "#E8607F",
      desc: "보호자의 감정에 민감하게 반응하고 스킨십과 눈 맞춤으로 마음을 나누려는 타입입니다."
    }
  },
  JP: {
    title: "생활 방식",
    pair: ["J", "P"],
    J: {
      name: "규칙형", emoji: "📆", color: "#2E9CAE",
      desc: "정해진 루틴과 규칙 속에서 안정감을 느낍니다. 시간 개념이 정확하고 차분히 수행해요."
    },
    P: {
      name: "자유형", emoji: "🪁", color: "#E2B13C",
      desc: "그때그때 기분과 흥미를 따라 움직입니다. 즉흥적이고 유연하지만 집중은 쉽게 흩어져요."
    }
  }
};

// ============================================
// 16가지 강아지 유형 정의
// ============================================
// match: 서로 잘 맞는 유형 / clash: 서로 부딪히기 쉬운 유형

const DOGMBTI_TYPES = {
  ISTJ: {
    emoji: "🛡️", name: "원칙주의 경비대장", tagline: "매일 같은 시간, 같은 자리, 같은 순찰",
    desc: "루틴과 규칙을 중시하는 든든한 파수꾼입니다. 정해진 시간에 밥을 먹고, 정해진 코스로 산책하고, 정해진 자리에서 잡니다. 낯선 사람에게는 신중하지만 한번 마음을 연 가족에게는 변함없이 충직해요. 말없이 곁을 지키는 믿음직한 타입입니다.",
    keywords: ["루틴", "충직", "신중"],
    loves: "정해진 일과, 익숙한 산책 코스, 제자리에서 쉬는 시간",
    caution: "갑작스러운 환경 변화나 이사, 가구 재배치에 스트레스를 받기 쉬워요. 변화는 조금씩 예고하며 주세요.",
    tip: "일과표를 일정하게 지켜주는 것이 가장 큰 사랑 표현입니다. 새 환경은 익숙한 담요, 장난감과 함께 소개해 주세요.",
    match: "ISFJ", clash: "ENTP"
  },
  ISFJ: {
    emoji: "🧸", name: "껌딱지 수호천사", tagline: "내 보호자가 안전한지가 제일 중요해요",
    desc: "조용하고 다정하게 보호자 곁을 지키는 타입입니다. 큰 소리를 내지 않아도 눈빛과 체온으로 마음을 전하고, 보호자의 기분 변화를 누구보다 먼저 알아채요. 익숙한 가족 안에서 가장 행복하며, 낯선 환경에서는 보호자 곁에서 떨어지지 않으려 합니다.",
    keywords: ["다정함", "눈치", "껌딱지"],
    loves: "무릎 위 자리, 보호자와 함께하는 조용한 시간, 익숙한 담요",
    caution: "분리불안이 올 수 있어요. 혼자 있는 연습을 아주 짧게부터 단계적으로 해주세요.",
    tip: "외출과 귀가를 담담하게 하고, 혼자 있는 시간에 노즈워크 같은 안정 놀이를 마련해 주세요.",
    match: "ISTJ", clash: "ESTP"
  },
  INFJ: {
    emoji: "🔮", name: "영혼을 읽는 통역사", tagline: "말 안 해도 다 알고 있다는 눈빛",
    desc: "조용하지만 보호자의 마음을 꿰뚫어 보는 깊은 타입입니다. 많은 친구보다 한 사람과의 깊은 유대를 원하고, 집안 분위기나 가족의 감정 변화에 아주 예민해요. 호기심도 있지만 신중해서 천천히, 하지만 깊게 다가갑니다.",
    keywords: ["통찰", "공감", "깊은유대"],
    loves: "조용한 교감, 보호자와의 눈 맞춤, 안정적인 분위기",
    caution: "가족 간 다툼이나 긴장된 분위기를 크게 느껴 스트레스를 받습니다. 집안 분위기를 차분하게 유지해 주세요.",
    tip: "하루 10분이라도 오롯이 집중하는 교감 시간을 가져주세요. 말 걸기, 마사지, 눈 맞춤이 효과적입니다.",
    match: "ENFP", clash: "ESTJ"
  },
  INTJ: {
    emoji: "♟️", name: "조용한 전략가", tagline: "다 계획이 있어서 가만히 있는 거예요",
    desc: "혼자서도 잘 놀고, 상황을 관찰하며 자기만의 방식으로 문제를 해결하는 타입입니다. 아무에게나 꼬리를 흔들지 않지만 인정한 상대에게는 확실하게 마음을 줍니다. 퍼즐 장난감이나 노즈워크로 머리를 쓸 때 가장 빛나요.",
    keywords: ["독립", "분석", "목표지향"],
    loves: "퍼즐 장난감, 노즈워크, 혼자만의 조용한 공간",
    caution: "고집이 세서 납득이 안 되면 따르지 않아요. 강압적인 훈련은 오히려 관계를 멀어지게 합니다.",
    tip: "'왜 해야 하는지' 보상으로 납득시켜 주세요. 두뇌 활동을 충분히 시켜주면 문제 행동이 줄어듭니다.",
    match: "ENFP", clash: "ESFJ"
  },
  ISTP: {
    emoji: "🧭", name: "쿨한 독립 탐험가", tagline: "알아서 할게요, 필요하면 부를게요",
    desc: "적당한 거리를 두며 자기 페이스로 움직이는 쿨한 타입입니다. 애정 표현은 담백하지만 위기 상황에서는 침착하게 대처해요. 몸을 쓰는 놀이와 냄새 탐색을 좋아하고, 간섭받는 것은 싫어합니다.",
    keywords: ["쿨함", "침착", "독립심"],
    loves: "혼자만의 냄새 탐색, 몸으로 하는 놀이, 간섭 없는 휴식",
    caution: "너무 오래 방치하면 애착이 약해질 수 있어요. 독립적이어도 교감 시간은 꼭 필요합니다.",
    tip: "과한 스킨십보다 함께 활동(산책, 트레킹)하는 방식으로 유대를 쌓아주세요.",
    match: "ESTP", clash: "ENFJ"
  },
  ISFP: {
    emoji: "🌷", name: "감성 낮잠러", tagline: "햇살 한 줌, 쓰다듬 한 번이면 충분해요",
    desc: "평화롭고 부드러운 분위기를 사랑하는 감성파입니다. 다툼을 싫어하고 순한 성격으로, 보호자의 손길 하나에도 쉽게 행복해져요. 새로운 것에도 열려 있지만 자극이 과하면 쉽게 지칩니다. 햇볕 드는 창가가 최고의 자리예요.",
    keywords: ["순함", "감성", "평화"],
    loves: "햇살 드는 창가, 부드러운 쓰다듬, 잔잔한 산책",
    caution: "거절하거나 싫다는 표현을 잘 못 해서 스트레스를 쌓아둘 수 있어요. 몸짓 신호를 잘 살펴봐 주세요.",
    tip: "강한 자극 대신 천천히 걷는 산책과 부드러운 교감이 어울립니다. 낯선 곳은 여유 있게 적응시켜 주세요.",
    match: "ESFJ", clash: "ENTJ"
  },
  INFP: {
    emoji: "🌙", name: "꿈꾸는 몽상가", tagline: "창밖을 보며 어딘가 다른 세계를 여행 중",
    desc: "자기만의 세계가 뚜렷한 상상력 풍부한 타입입니다. 멍하니 허공을 바라보다 갑자기 뭔가에 꽂혀 놀기도 해요. 마음을 연 사람에게는 깊고 섬세한 애정을 보이며, 혼나면 오래 상처를 받는 여린 면도 있습니다.",
    keywords: ["몽상", "섬세함", "예민"],
    loves: "창밖 구경, 혼자만의 놀이, 마음 통하는 한 사람",
    caution: "큰 소리나 혼내는 말에 마음의 상처를 오래 받아요. 긍정 강화 위주로 훈련해 주세요.",
    tip: "다정한 목소리와 충분한 안정 공간을 주세요. 혼자 몰입할 수 있는 놀이 시간도 존중해 주세요.",
    match: "ENFJ", clash: "ESTJ"
  },
  INTP: {
    emoji: "🔬", name: "호기심 연구원", tagline: "이게 뭐지? 일단 뜯어보면 알겠지",
    desc: "새로운 물건과 원리에 호기심이 많은 탐구형입니다. 장난감 속 소리 나는 부분을 찾아 해체하고, 문제를 혼자 곰곰이 풀어보는 걸 좋아해요. 감정 표현은 담백한 편이지만 흥미로운 일에는 놀라운 집중력을 발휘합니다.",
    keywords: ["탐구", "호기심", "독립"],
    loves: "퍼즐 장난감, 새로운 냄새, 혼자 탐구하는 시간",
    caution: "파괴 행동이 호기심에서 나오는 경우가 많아요. 안전한 탐구 거리를 제공하세요.",
    tip: "다양한 퍼즐 급식기와 새 장난감을 돌려가며 주고, 위험 물건은 치워 주세요.",
    match: "ENTJ", clash: "ESFJ"
  },
  ESTP: {
    emoji: "🏎️", name: "에너자이저 모험가", tagline: "생각은 나중에, 일단 뛰고 봅니다",
    desc: "행동이 먼저인 에너지 폭발 타입입니다. 공이든 물이든 낯선 길이든 일단 뛰어들고 보며, 몸으로 하는 놀이라면 지치지 않아요. 눈치는 없는 편이지만 해맑아서 미워할 수 없는 매력이 있습니다.",
    keywords: ["에너지", "행동파", "모험"],
    loves: "공 던지기, 달리기, 수영, 새로운 장소",
    caution: "흥분하면 통제가 어려워 사고 위험이 있어요. 흥분 조절 훈련이 필요합니다.",
    tip: "하루 충분한 활동량이 필수입니다. '기다려'와 '앉아' 같은 충동 조절 훈련을 놀이처럼 해주세요.",
    match: "ISTP", clash: "ISFJ"
  },
  ESFP: {
    emoji: "🎈", name: "분위기 메이커", tagline: "내가 있는 곳이 곧 파티예요",
    desc: "어디서든 분위기를 띄우는 타고난 연예인입니다. 사람도 강아지도 모두 친구이고, 관심받는 걸 좋아해서 애교와 재롱이 풍부해요. 지금 이 순간을 즐기는 타입이라 훈련 집중력은 약하지만 사랑스러움으로 모든 걸 용서받습니다.",
    keywords: ["애교", "인기", "즉흥"],
    loves: "관심, 친구들, 신나는 놀이, 칭찬",
    caution: "혼자 있는 시간을 힘들어하고 관심이 부족하면 문제 행동을 할 수 있어요.",
    tip: "사회화 기회를 충분히 주되, 짧고 재미있는 훈련으로 칭찬을 듬뿍 주세요.",
    match: "ISFP", clash: "INTJ"
  },
  ENFP: {
    emoji: "🌈", name: "인싸 방방이", tagline: "세상 모든 게 신기하고 모든 이가 친구!",
    desc: "호기심과 사교성이 모두 폭발하는 열정 가득한 타입입니다. 처음 보는 사람도, 처음 가는 길도 신나고, 감정 표현도 솔직해서 기쁨을 온몸으로 드러내요. 하지만 관심사가 금방 옮겨 다니고 집중이 흩어지기 쉽습니다.",
    keywords: ["열정", "호기심", "다정"],
    loves: "새로운 친구, 새로운 장소, 보호자와의 신나는 놀이",
    caution: "산만하고 흥분을 잘해서 줄 당김, 점프, 짖음이 문제가 될 수 있어요.",
    tip: "다양한 자극과 놀이를 번갈아 주되, 흥분을 가라앉히는 차분한 훈련 시간도 함께 넣어 주세요.",
    match: "INFJ", clash: "ISTJ"
  },
  ENTP: {
    emoji: "🎭", name: "장난꾸러기 협상가", tagline: "규칙은 깨라고 있는 거 아닌가요?",
    desc: "머리 좋고 재치 있는 말썽꾼입니다. 보호자의 반응을 살피며 규칙의 빈틈을 찾고, 간식을 얻기 위해 협상(?)까지 시도해요. 새로운 도전을 즐기고 친구도 잘 사귀지만 반복 훈련은 금방 지루해합니다.",
    keywords: ["재치", "도전", "말썽"],
    loves: "새로운 트릭, 보호자 놀리기, 두뇌 게임",
    caution: "영리해서 나쁜 습관도 빨리 배워요. 일관된 규칙이 중요합니다.",
    tip: "훈련에 변화를 주고 어려운 개인기에 도전시키세요. 규칙은 가족 모두가 똑같이 적용해야 합니다.",
    match: "INFJ", clash: "ISTJ"
  },
  ESTJ: {
    emoji: "📣", name: "동네 반장", tagline: "질서를 지키세요, 제가 감독합니다",
    desc: "규칙과 질서에 진심인 리더형입니다. 정해진 일과대로 움직이고, 가족이 규칙을 어기면 짖어서 알릴 정도로 확실해요. 훈련도 빨리 배우고 책임감이 강하며, 동네 소식에도 빠삭한 경비 반장입니다.",
    keywords: ["리더십", "규칙", "책임감"],
    loves: "일과표, 임무 부여, 확실한 훈련, 산책 순찰",
    caution: "다른 강아지에게 규칙을 강요하다 충돌할 수 있고, 경계 짖음이 많을 수 있어요.",
    tip: "'지키기', '가져오기' 같은 임무를 주면 만족도가 높아요. 경계 짖음은 일관된 신호로 조절해 주세요.",
    match: "ISTJ", clash: "INFP"
  },
  ESFJ: {
    emoji: "🤱", name: "오지랖 집사", tagline: "다들 괜찮아요? 제가 살펴볼게요",
    desc: "가족도 손님도 다 챙기는 다정한 타입입니다. 사람 곁에서 눈치껏 도와주고 싶어 하고, 보호자의 감정에도 민감해요. 칭찬받는 걸 매우 좋아하고 가족이 모여 있을 때 가장 행복합니다.",
    keywords: ["다정함", "눈치", "챙김"],
    loves: "가족 모임, 칭찬, 함께하는 일과, 쓰다듬",
    caution: "보호자 감정에 지나치게 영향을 받고, 혼자 있으면 불안해할 수 있어요.",
    tip: "칭찬 위주의 훈련이 잘 맞습니다. 혼자서도 편안히 지내는 연습도 병행해 주세요.",
    match: "ISFP", clash: "INTJ"
  },
  ENFJ: {
    emoji: "👑", name: "인기 많은 리더", tagline: "내가 다 이끌 테니 따라와요",
    desc: "사교적이면서 보호자와의 교감도 깊은 따뜻한 리더형입니다. 다른 강아지들이 자연스럽게 따르고, 보호자의 말을 잘 알아들어 훈련도 잘 해내요. 분위기를 읽고 중재하려는 모습에 '사람 같다'는 말을 자주 듣습니다.",
    keywords: ["리더십", "교감", "인기"],
    loves: "칭찬, 친구 사귀기, 보호자와의 협동 놀이",
    caution: "모두를 챙기다 스스로 지칠 수 있어요. 충분한 휴식이 필요합니다.",
    tip: "함께 하는 훈련과 놀이가 최고입니다. 어려움을 겪는 친구 곁에서 도움이 되는 역할도 좋아해요.",
    match: "INFP", clash: "ISTP"
  },
  ENTJ: {
    emoji: "🦁", name: "카리스마 대장견", tagline: "산책 코스는 제가 정하겠습니다",
    desc: "목표가 분명하고 추진력 있는 카리스마형입니다. 산책 방향도 자기가 정하려 하고, 놀이든 훈련이든 주도권을 쥐고 싶어해요. 영리하고 자신감이 넘쳐 리더 역할을 잘하지만 고집이 세서 보호자의 리더십이 필요합니다.",
    keywords: ["카리스마", "추진력", "자신감"],
    loves: "임무, 도전 과제, 산책 주도권, 인정받는 것",
    caution: "주도권 다툼으로 줄 당김, 다른 개와의 서열 다툼이 생길 수 있어요.",
    tip: "일관되고 차분한 리더십으로 규칙을 알려주세요. 달리기나 어질리티 같은 목표형 활동이 잘 맞습니다.",
    match: "INTP", clash: "ISFP"
  }
};

// ============================================
// 채점 함수
// ============================================

function calcDogMbti(answers) {
  // answers = ["E","S","F","J", ...] 28개 (각 문항에서 고른 글자)
  const totals = { E: 0, I: 0, S: 0, N: 0, T: 0, F: 0, J: 0, P: 0 };
  answers.forEach(letter => {
    if (totals[letter] !== undefined) totals[letter] += 1;
  });

  const axes = {};
  let code = "";
  Object.entries(DOGMBTI_AXES).forEach(([axisKey, axis]) => {
    const [a, b] = axis.pair;
    const total = totals[a] + totals[b];
    const winnerLetter = totals[a] > totals[b] ? a : b;
    const winnerScore = totals[winnerLetter];
    const loserLetter = winnerLetter === a ? b : a;
    const winnerPct = total ? Math.round((winnerScore / total) * 100) : 50;
    code += winnerLetter;
    axes[axisKey] = {
      key: axisKey,
      title: axis.title,
      winner: winnerLetter,
      loser: loserLetter,
      winnerScore,
      loserScore: totals[loserLetter],
      winnerPct,
      loserPct: 100 - winnerPct,
      pctByLetter: { [a]: Math.round((totals[a] / (total || 1)) * 100), [b]: Math.round((totals[b] / (total || 1)) * 100) },
      strength: dogMbtiStrength(winnerScore, total),
      info: axis[winnerLetter]
    };
  });

  const typeInfo = DOGMBTI_TYPES[code];
  return {
    code,
    typeInfo,
    totals,
    axes,
    secondary: calcDogMbtiSecondary(code, axes),
    matchInfo: DOGMBTI_TYPES[typeInfo.match],
    clashInfo: DOGMBTI_TYPES[typeInfo.clash]
  };
}

// 보조 유형: 점수 차이가 가장 작은 축 하나를 뒤집은 유형
// 차이(승-패)가 DOGMBTI_SECONDARY_MAX_MARGIN 이하일 때만 "경계 성향"으로 인정한다.
// 7문항 기준 승패가 4:3(차 1), 5:2(차 3)이면 보조 유형 표시, 6:1(차 5) 이상이면 없음.
const DOGMBTI_SECONDARY_MAX_MARGIN = 3;

function calcDogMbtiSecondary(code, axes) {
  const order = ["EI", "SN", "TF", "JP"];
  let target = null;
  order.forEach((key, idx) => {
    const margin = axes[key].winnerScore - axes[key].loserScore;
    if (!target || margin < target.margin) target = { key, idx, margin };
  });
  if (!target || target.margin > DOGMBTI_SECONDARY_MAX_MARGIN) return null;

  const axis = axes[target.key];
  const letters = code.split("");
  letters[target.idx] = axis.loser;
  const secondaryCode = letters.join("");
  return {
    code: secondaryCode,
    info: DOGMBTI_TYPES[secondaryCode],
    axisKey: target.key,
    axisTitle: axis.title,
    margin: target.margin,
    winner: axis.winner,
    loser: axis.loser,
    winnerPct: axis.pctByLetter[axis.winner],
    loserPct: axis.pctByLetter[axis.loser],
    winnerInfo: axis.info,
    loserInfo: DOGMBTI_AXES[target.key][axis.loser]
  };
}

// 우세 글자가 전체 문항에서 차지한 비율로 성향 강도 라벨 결정
function dogMbtiStrength(score, total) {
  const ratio = total ? score / total : 0.5;
  if (ratio >= 6 / 7) return "아주 뚜렷";
  if (ratio >= 5 / 7) return "꽤 뚜렷";
  return "살짝 기운";
}

if (typeof module !== 'undefined') {
  module.exports = { DOGMBTI_QUESTIONS, DOGMBTI_AXES, DOGMBTI_TYPES, calcDogMbti, calcDogMbtiSecondary, dogMbtiStrength };
}
