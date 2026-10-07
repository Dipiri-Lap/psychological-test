// ============================================
// 우리 고양이 MBTI 검사
// ============================================
// 구조: 28문항(축당 7문항), 2지선다 강제선택, 4축 → 16유형
// 축: E/I(사교성) · S/N(호기심) · T/F(교감 방식) · J/P(생활 방식)
// 채점: 각 문항에서 고른 글자에 +1, 축마다 7문항이라 동점 없음
// 결과: 4글자 유형 + 축별 성향 강도(%) + 보조 유형(경계 성향) + 궁합 유형
// 집사가 "우리 냥이라면 어떨까?"를 떠올리며 답하는 방식
// ============================================

const CATMBTI_QUESTIONS = [
  // ── E/I : 사교성 ───────────────────────────
  {
    id: 1, axis: "EI", emoji: "🔔",
    question: "집에 손님이 찾아오면 우리 고양이는?",
    choices: [
      { text: "😺 현관까지 나와 냄새를 맡고 다리에 비비적거린다", type: "E" },
      { text: "🙀 침대 밑이나 옷장 속으로 순식간에 사라진다", type: "I" }
    ]
  },
  {
    id: 2, axis: "EI", emoji: "🖐️",
    question: "낯선 사람이 쓰다듬으려 손을 내밀면?",
    choices: [
      { text: "😻 순순히 몸을 맡기고 골골송을 부른다", type: "E" },
      { text: "😾 슬쩍 피하거나 거리를 두고 멀어진다", type: "I" }
    ]
  },
  {
    id: 3, axis: "EI", emoji: "🚪",
    question: "집사가 외출했다 돌아왔을 때 우리 고양이는?",
    choices: [
      { text: "📣 현관으로 달려 나와 냥냥거리며 졸졸 따라다닌다", type: "E" },
      { text: "🫥 한참 뒤에 방에서 조용히 나와 멀리서 쳐다본다", type: "I" }
    ]
  },
  {
    id: 4, axis: "EI", emoji: "🐾",
    question: "새로운 가족(다른 반려동물이나 사람)이 생기면?",
    choices: [
      { text: "👋 호기심이 앞서 먼저 다가가 인사를 건넨다", type: "E" },
      { text: "🔍 거리를 두고 며칠이고 조용히 관찰한다", type: "I" }
    ]
  },
  {
    id: 5, axis: "EI", emoji: "🏠",
    question: "하루 대부분을 어떻게 보내는 편일까요?",
    choices: [
      { text: "🛋️ 집사가 있는 곳을 따라다니며 가까이 있으려 한다", type: "E" },
      { text: "📦 혼자만의 아지트에서 보내는 시간이 훨씬 길다", type: "I" }
    ]
  },
  {
    id: 6, axis: "EI", emoji: "🎉",
    question: "집들이나 모임처럼 시끌벅적한 날에는?",
    choices: [
      { text: "👀 사람들 사이를 오가며 구경하고 관심을 즐긴다", type: "E" },
      { text: "🤫 조용한 방에 숨어 모임이 끝나기만 기다린다", type: "I" }
    ]
  },
  {
    id: 7, axis: "EI", emoji: "🏥",
    question: "동물병원 대기실처럼 낯선 사람과 동물이 많은 곳에서는?",
    choices: [
      { text: "🔭 이동장 밖을 두리번거리며 구경하고 소리도 낸다", type: "E" },
      { text: "🫣 담요 속에 몸을 웅크리고 숨죽이고 있는다", type: "I" }
    ]
  },

  // ── S/N : 호기심 ───────────────────────────
  {
    id: 8, axis: "SN", emoji: "🧶",
    question: "새 캣타워나 장난감을 들여놓으면 우리 고양이는?",
    choices: [
      { text: "🔄 늘 쓰던 자리와 장난감만 계속 찾는다", type: "S" },
      { text: "🤩 새것 위로 가장 먼저 올라가 구석구석 탐색한다", type: "N" }
    ]
  },
  {
    id: 9, axis: "SN", emoji: "📦",
    question: "택배 상자처럼 처음 보는 물건이 집에 등장하면?",
    choices: [
      { text: "🙅 경계하며 한참 거리를 두고 지켜본다", type: "S" },
      { text: "🐈 보자마자 들어가 보고 올라가 보고 긁어 본다", type: "N" }
    ]
  },
  {
    id: 10, axis: "SN", emoji: "🛋️",
    question: "가구 배치가 바뀌었을 때 우리 고양이는?",
    choices: [
      { text: "😟 낯설어하며 한참 냄새를 맡고 적응하는 데 시간이 걸린다", type: "S" },
      { text: "🗺️ 새로 생긴 틈과 길을 신나게 탐험한다", type: "N" }
    ]
  },
  {
    id: 11, axis: "SN", emoji: "🍽️",
    question: "새로운 사료나 간식을 내밀면?",
    choices: [
      { text: "🤨 냄새만 맡고 외면한다. 먹던 게 제일 좋다", type: "S" },
      { text: "😋 일단 맛부터 본다. 새로운 맛도 잘 먹는 편이다", type: "N" }
    ]
  },
  {
    id: 12, axis: "SN", emoji: "🎣",
    question: "우리 고양이가 노는 방식에 더 가까운 건?",
    choices: [
      { text: "🪶 늘 하던 낚싯대 놀이를 같은 패턴으로 즐긴다", type: "S" },
      { text: "🌟 비닐, 빛 그림자, 머리끈까지 별걸 다 놀이로 만들어낸다", type: "N" }
    ]
  },
  {
    id: 13, axis: "SN", emoji: "🚧",
    question: "현관문이나 베란다 문이 살짝 열려 있다면?",
    choices: [
      { text: "🧍 문턱 앞까지만 와서 안전하게 구경한다", type: "S" },
      { text: "🚀 틈 사이로 나가 복도와 베란다까지 탐험하려 한다", type: "N" }
    ]
  },
  {
    id: 14, axis: "SN", emoji: "🏔️",
    question: "높은 곳을 오르는 모습은?",
    choices: [
      { text: "🪜 늘 올라가는 안전한 자리 몇 군데만 애용한다", type: "S" },
      { text: "🧗 냉장고 위, 선반 꼭대기 등 새로운 높은 곳을 계속 개척한다", type: "N" }
    ]
  },

  // ── T/F : 교감 방식 ─────────────────────────
  {
    id: 15, axis: "TF", emoji: "😢",
    question: "집사가 울적하거나 힘들어 보일 때 우리 고양이는?",
    choices: [
      { text: "🥺 곁에 와서 부비고 골골거리며 위로해 준다", type: "F" },
      { text: "😐 별 반응 없이 자기 할 일을 하다 가끔 상태만 확인한다", type: "T" }
    ]
  },
  {
    id: 16, axis: "TF", emoji: "🙇",
    question: "집사에게 혼이 났을 때 우리 고양이는?",
    choices: [
      { text: "😿 눈치를 보며 숨거나 한동안 기가 죽는다", type: "F" },
      { text: "😼 쳐다보다 못 들은 척 곧 원래대로 돌아온다", type: "T" }
    ]
  },
  {
    id: 17, axis: "TF", emoji: "📣",
    question: "이름을 불렀을 때 우리 고양이의 반응은?",
    choices: [
      { text: "🐱 '냐앙' 대답하며 가까이 다가온다", type: "F" },
      { text: "👂 귀만 움찔한다. 갈지 말지는 자기 마음이다", type: "T" }
    ]
  },
  {
    id: 18, axis: "TF", emoji: "🧎",
    question: "집사의 무릎이나 품에 대한 태도는?",
    choices: [
      { text: "💞 시도 때도 없이 올라와 안기고 싶어 한다", type: "F" },
      { text: "🙄 필요할 때만 올라오고 안으려 하면 빠져나간다", type: "T" }
    ]
  },
  {
    id: 19, axis: "TF", emoji: "🍖",
    question: "우리 고양이에게 가장 강력한 보상은?",
    choices: [
      { text: "🥰 다정한 목소리와 쓰다듬는 손길", type: "F" },
      { text: "🐟 확실한 간식이나 츄르. 보상이 있어야 움직인다", type: "T" }
    ]
  },
  {
    id: 20, axis: "TF", emoji: "🌙",
    question: "집사가 잠자리에 들었을 때 우리 고양이는?",
    choices: [
      { text: "🛏️ 침대로 올라와 몸을 붙이고 함께 잔다", type: "F" },
      { text: "🏞️ 근처 자기 자리에서 따로 잔다", type: "T" }
    ]
  },
  {
    id: 21, axis: "TF", emoji: "🗝️",
    question: "원하는 게 있을 때 우리 고양이가 쓰는 방법은?",
    choices: [
      { text: "🥹 집사 다리에 부비고 얼굴을 쳐다보며 애교를 부린다", type: "F" },
      { text: "🦾 문이나 서랍을 스스로 열어 보는 등 직접 해결하려 한다", type: "T" }
    ]
  },

  // ── J/P : 생활 방식 ─────────────────────────
  {
    id: 22, axis: "JP", emoji: "⏰",
    question: "밥시간이 되면 우리 고양이는?",
    choices: [
      { text: "⏱️ 시계처럼 정확히 알고 와서 재촉한다", type: "J" },
      { text: "🌤️ 시간은 신경 쓰지 않고 기분 내킬 때 먹으러 온다", type: "P" }
    ]
  },
  {
    id: 23, axis: "JP", emoji: "🛏️",
    question: "잠자리와 화장실, 물그릇 위치에 대한 태도는?",
    choices: [
      { text: "📐 늘 정해진 자리만 고집한다", type: "J" },
      { text: "🌀 그날그날 자는 곳과 쉬는 곳이 바뀐다", type: "P" }
    ]
  },
  {
    id: 24, axis: "JP", emoji: "🌅",
    question: "아침(또는 새벽)의 모습은?",
    choices: [
      { text: "🔔 매일 비슷한 시각에 집사를 깨운다", type: "J" },
      { text: "⚡ 새벽에 갑자기 우다다하는 등 시간이 제각각이다", type: "P" }
    ]
  },
  {
    id: 25, axis: "JP", emoji: "🚫",
    question: "'싱크대 위 금지' 같은 집안 규칙을 알려줬다면?",
    choices: [
      { text: "📏 한번 혼난 뒤로는 꽤 잘 지킨다", type: "J" },
      { text: "😏 집사가 안 볼 때 슬쩍 올라가 본다", type: "P" }
    ]
  },
  {
    id: 26, axis: "JP", emoji: "🎾",
    question: "놀이 시간은 어떻게 정해질까요?",
    choices: [
      { text: "🗓️ 정해진 시간대마다 놀아 달라고 요구한다", type: "J" },
      { text: "💨 갑자기 우다다하다 갑자기 시들해진다", type: "P" }
    ]
  },
  {
    id: 27, axis: "JP", emoji: "👟",
    question: "집사가 외출 준비를 할 때(옷 갈아입기, 가방 들기)?",
    choices: [
      { text: "🔮 눈치채고 현관이나 침대 위에서 미리 대기한다", type: "J" },
      { text: "🦋 눈치 없이 딴짓하다 문이 닫힐 때야 쳐다본다", type: "P" }
    ]
  },
  {
    id: 28, axis: "JP", emoji: "🎣",
    question: "낚싯대 놀이를 할 때 집중하는 모습은?",
    choices: [
      { text: "🎯 한번 시작하면 사냥 완주까지 끝까지 집중한다", type: "J" },
      { text: "🦘 하다가 갑자기 그루밍하거나 딴 곳으로 가 버린다", type: "P" }
    ]
  }
];

// ============================================
// 4개 축 정의
// ============================================

const CATMBTI_AXES = {
  EI: {
    title: "사교성",
    pair: ["E", "I"],
    E: {
      name: "사교형", emoji: "😸", color: "#F2994A",
      desc: "사람 곁에 있는 걸 좋아하고 새로운 존재에도 먼저 다가가는 타입. 집사와 손님 모두 반가운 친구입니다."
    },
    I: {
      name: "신중형", emoji: "🌙", color: "#6C7BD9",
      desc: "믿는 집사 곁이 아니면 마음을 놓지 않는 타입. 낯선 상대는 시간을 들여 관찰한 뒤에야 받아들입니다."
    }
  },
  SN: {
    title: "호기심",
    pair: ["S", "N"],
    S: {
      name: "안정형", emoji: "🏡", color: "#4FA37A",
      desc: "익숙한 자리, 익숙한 장난감, 익숙한 일과를 선호합니다. 환경이 바뀌면 적응에 시간이 필요해요."
    },
    N: {
      name: "탐험형", emoji: "🔭", color: "#B07CE0",
      desc: "새 상자, 새 틈, 새 높이에 끌립니다. 집 안의 모든 곳을 탐험하고 놀이를 스스로 만들어내요."
    }
  },
  TF: {
    title: "교감 방식",
    pair: ["T", "F"],
    T: {
      name: "독립형", emoji: "🧊", color: "#4A9DD0",
      desc: "애정은 있지만 쿨하게 표현하고 자기 마음이 내킬 때 다가오는 타입입니다. 문제도 스스로 해결하려 해요."
    },
    F: {
      name: "교감형", emoji: "💗", color: "#E8607F",
      desc: "집사의 기분에 민감하게 반응하고 부비기, 골골송, 눈 맞춤으로 마음을 나누려는 타입입니다."
    }
  },
  JP: {
    title: "생활 방식",
    pair: ["J", "P"],
    J: {
      name: "규칙형", emoji: "📆", color: "#2E9CAE",
      desc: "정해진 일과와 자리 속에서 안정감을 느낍니다. 밥시간과 놀이 시간을 정확히 챙겨요."
    },
    P: {
      name: "자유형", emoji: "🪁", color: "#E2B13C",
      desc: "그때그때 기분과 흥미를 따라 움직입니다. 즉흥적이고 변화무쌍하며 새벽 우다다의 주인공이에요."
    }
  }
};

// ============================================
// 16가지 고양이 유형 정의
// ============================================
// match: 서로 잘 맞는 유형 / clash: 서로 부딪히기 쉬운 유형

const CATMBTI_TYPES = {
  ISTJ: {
    emoji: "⏱️", name: "칼같은 루틴 관리자", tagline: "밥시간 5분 지연은 용납 못 해요",
    desc: "정해진 시간, 정해진 자리, 정해진 순서를 지키는 원칙주의 고양이입니다. 밥은 늘 같은 시각에 요구하고, 화장실과 물그릇 위치가 바뀌면 불편함을 확실히 표현해요. 표현은 담백하지만 집사의 일과를 정확히 파악하고 있는 믿음직한 동거인입니다.",
    keywords: ["루틴", "원칙", "신중"],
    loves: "일정한 밥시간, 늘 같은 자리, 변함없는 하루",
    caution: "이사, 가구 재배치, 사료 교체 같은 변화에 스트레스를 크게 받습니다. 바꿔야 할 땐 조금씩 섞어 적응시켜 주세요.",
    tip: "하루 일과를 최대한 일정하게 유지해 주세요. 새 물건은 익숙한 물건 옆에 두고 천천히 소개하세요.",
    match: "ISFJ", clash: "ESTP"
  },
  ISFJ: {
    emoji: "🌿", name: "조용한 그림자 호위냥", tagline: "말은 안 해도 늘 한 걸음 뒤에 있어요",
    desc: "큰 소리 없이 집사 곁을 따라다니며 지켜보는 다정한 타입입니다. 먼저 다가오진 않아도 집사가 힘든 날엔 어느새 곁에 앉아 있어요. 가족 안에서는 부드럽지만 낯선 환경과 낯선 사람 앞에서는 집사 뒤로 숨는 편입니다.",
    keywords: ["다정함", "눈치", "그림자"],
    loves: "집사 곁 조용한 자리, 익숙한 담요, 안정적인 집 안 분위기",
    caution: "집사가 오래 집을 비우면 불안이 커질 수 있어요. 외출 전후를 담담하게 하고 혼자 지내는 시간을 짧게부터 늘려 주세요.",
    tip: "집사의 냄새가 밴 옷이나 담요를 곁에 두면 혼자 있을 때 큰 위안이 됩니다. 놀랄 만한 큰 소리는 피해 주세요.",
    match: "ISTJ", clash: "ENTP"
  },
  INFJ: {
    emoji: "🔮", name: "마음을 꿰뚫는 눈빛 점술가", tagline: "집사 기분은 이미 다 알고 있어요",
    desc: "조용히 앉아 집사를 가만히 바라보는 깊은 눈빛의 고양이입니다. 집사의 기분 변화, 집안 분위기를 놀랍도록 빨리 알아채요. 많은 사람보다 단 한 사람과의 깊은 유대를 원하며, 낯선 사람에게는 쉽게 마음을 주지 않습니다.",
    keywords: ["통찰", "공감", "깊은유대"],
    loves: "집사와의 조용한 눈 맞춤, 잔잔한 분위기, 무릎 위 낮잠",
    caution: "가족 간 다툼이나 긴장된 분위기를 크게 느껴 스트레스로 이어질 수 있어요. 집안 분위기를 차분하게 유지해 주세요.",
    tip: "느린 눈 깜빡임으로 인사해 보세요. 하루 10분 조용한 교감 시간이 신뢰를 크게 키워줍니다.",
    match: "ENFP", clash: "ESTJ"
  },
  INTJ: {
    emoji: "♟️", name: "도도한 설계자", tagline: "당신이 나를 키우는 게 아니라, 제가 당신을 관리 중입니다",
    desc: "모든 걸 관찰하고 자기만의 계획대로 움직이는 도도한 전략가입니다. 아무에게나 부비지 않지만 인정한 집사에게는 확실하게 마음을 줍니다. 퍼즐 급식기나 사냥 놀이처럼 머리를 쓰는 활동에서 가장 빛나요.",
    keywords: ["독립", "분석", "도도함"],
    loves: "높은 곳에서 집 안 내려다보기, 퍼즐 급식기, 혼자만의 조용한 공간",
    caution: "강압적인 방식이나 억지 스킨십은 관계를 멀어지게 합니다. 고양이가 먼저 다가올 때까지 기다려 주세요.",
    tip: "'선택권'을 주는 게 핵심입니다. 안아 올리기보다 곁에 앉아 기다리고, 두뇌 활동 놀이를 충분히 마련해 주세요.",
    match: "ENFP", clash: "ESFJ"
  },
  ISTP: {
    emoji: "🌃", name: "쿨한 독립 사냥꾼", tagline: "필요하면 부를게요. 아마도요",
    desc: "적당한 거리를 두고 자기 페이스대로 움직이는 쿨한 고양이입니다. 애정 표현은 담백하지만 사냥 놀이에서는 눈빛이 달라져요. 간섭받는 것을 싫어하고, 혼자서도 집 안의 모든 걸 능숙하게 다룹니다.",
    keywords: ["쿨함", "독립심", "사냥꾼"],
    loves: "혼자만의 사냥 놀이, 간섭 없는 휴식, 창가 관찰",
    caution: "너무 방치하면 애착이 약해질 수 있어요. 독립적이어도 짧은 교감 시간은 꼭 필요합니다.",
    tip: "과한 스킨십보다 낚싯대 놀이처럼 함께 움직이는 활동으로 유대를 쌓아 주세요.",
    match: "ESTP", clash: "ENFJ"
  },
  ISFP: {
    emoji: "☀️", name: "햇살 수집가", tagline: "따뜻한 자리 하나면 세상이 평화로워요",
    desc: "평화롭고 포근한 분위기를 사랑하는 순한 고양이입니다. 햇볕 드는 창가, 보들보들한 담요, 부드러운 쓰다듬이면 하루가 충분해요. 다툼을 싫어하고 큰 소리에 쉽게 놀라지만 마음 연 집사에게는 한없이 부드럽습니다.",
    keywords: ["순함", "평화", "포근함"],
    loves: "햇살 드는 창가, 보들보들한 담요, 부드러운 쓰다듬",
    caution: "싫은 표현을 겉으로 잘 드러내지 않아 스트레스를 쌓아둘 수 있어요. 귀와 꼬리 신호를 잘 살펴봐 주세요.",
    tip: "시끄럽고 급한 자극은 줄이고, 햇볕과 담요가 있는 안정된 휴식 공간을 충분히 마련해 주세요.",
    match: "ESFJ", clash: "ENTJ"
  },
  INFP: {
    emoji: "🪟", name: "꿈꾸는 창가의 몽상가", tagline: "새 한 마리에 오늘 하루를 다 쓸 수 있어요",
    desc: "창밖을 바라보며 자기만의 세계에 빠지는 상상력 풍부한 고양이입니다. 새 한 마리, 나뭇잎 하나에도 하루를 보낼 수 있어요. 마음을 연 사람에게는 섬세하고 깊은 애정을 보이지만 혼나면 오래 마음을 닫습니다.",
    keywords: ["몽상", "섬세함", "예민"],
    loves: "창가 관찰, 혼자만의 놀이, 마음 통하는 한 사람",
    caution: "큰 소리나 혼내는 말에 오래 상처받습니다. 훈육은 부드럽게, 긍정적인 방식으로 해 주세요.",
    tip: "창가에 편한 자리와 새 구경 환경을 만들어 주세요. 혼자 몰입하는 시간도 존중해 주세요.",
    match: "ENFJ", clash: "ESTJ"
  },
  INTP: {
    emoji: "🔬", name: "서랍 여는 연구원", tagline: "이거 떨어뜨리면 어떻게 될까? 실험해봐야지",
    desc: "집 안 모든 것이 연구 대상인 호기심 많은 탐구형입니다. 서랍과 문을 직접 열어 보고, 물건을 떨어뜨리며 중력을 검증해요. 감정 표현은 담백하지만 흥미로운 대상 앞에서는 놀라운 집중력을 보입니다.",
    keywords: ["탐구", "호기심", "실험"],
    loves: "퍼즐 급식기, 새로운 상자와 틈, 혼자 하는 탐구",
    caution: "물건을 떨어뜨리고 서랍을 여는 행동이 호기심에서 나오는 경우가 많아요. 위험한 물건은 미리 치워 주세요.",
    tip: "퍼즐 장난감과 새로운 놀잇감을 돌려가며 주고, 안전한 탐구 거리를 마련해 주세요.",
    match: "ENTJ", clash: "ESFJ"
  },
  ESTP: {
    emoji: "🌠", name: "새벽 우다다 챔피언", tagline: "새벽 3시, 지금이 제 전성기예요",
    desc: "행동이 먼저인 에너지 폭발 타입입니다. 새벽에 집 안을 질주하고, 높은 곳에서 점프하고, 낚싯대만 보면 눈이 반짝여요. 눈치는 없지만 해맑아서 미워할 수 없는 매력이 있습니다.",
    keywords: ["에너지", "행동파", "우다다"],
    loves: "낚싯대 사냥 놀이, 점프, 높은 곳, 새로운 장난감",
    caution: "에너지가 남으면 새벽 우다다와 물건 파괴로 이어질 수 있어요. 충분한 놀이가 필수입니다.",
    tip: "잠들기 전 20분 격한 사냥 놀이와 식사 루틴으로 새벽 우다다를 줄여 보세요.",
    match: "ISTP", clash: "ISTJ"
  },
  ESFP: {
    emoji: "🎀", name: "애교 폭발 인싸냥", tagline: "다들 나만 봐! 나 지금 제일 귀엽지?",
    desc: "어디서든 분위기를 띄우는 타고난 애교쟁이입니다. 손님도 가족도 모두 팬이고, 관심받는 걸 즐겨 배를 보이고 뒹굴어요. 지금 이 순간을 즐기는 타입이라 규칙은 쉽게 잊지만 사랑스러움으로 모든 걸 용서받습니다.",
    keywords: ["애교", "인기", "즉흥"],
    loves: "관심, 손님, 놀이, 칭찬, 쓰다듬",
    caution: "혼자 있는 시간이 길면 지루해서 문제 행동이 늘 수 있어요. 관심이 부족하지 않게 챙겨 주세요.",
    tip: "짧고 재미있는 놀이 시간을 하루 여러 번 만들어 주세요. 혼자 있을 땐 창가와 장난감을 준비해 주세요.",
    match: "ISFP", clash: "INTJ"
  },
  ENFP: {
    emoji: "🌈", name: "호기심 천국 방랑자", tagline: "문 열렸다! 어디까지 가볼까?",
    desc: "호기심과 사교성이 모두 폭발하는 열정 가득한 고양이입니다. 낯선 사람도, 새로운 상자도, 열린 문틈도 모두 모험의 시작이에요. 표현이 솔직해서 기분 좋을 땐 골골송이 집 안을 가득 채우지만 관심사가 금방 옮겨 다닙니다.",
    keywords: ["열정", "호기심", "방랑"],
    loves: "새로운 장소, 새 장난감, 사람, 열린 문 너머 세상",
    caution: "열린 문과 창문으로 탈출하려는 경우가 많아요. 방묘창, 방묘문 같은 안전장치를 꼭 해 주세요.",
    tip: "다양한 놀이와 새로운 자극을 번갈아 주고, 안전한 탐험 공간(캣타워, 베란다 방묘망)을 마련해 주세요.",
    match: "INFJ", clash: "ISTJ"
  },
  ENTP: {
    emoji: "🥛", name: "물건 떨어뜨리는 장난꾼", tagline: "컵이 떨어지면 당신 반응이 재밌거든요",
    desc: "머리 좋고 재치 있는 말썽꾸러기입니다. 집사의 반응을 관찰하며 컵을 슬쩍 밀고, 금지 구역의 빈틈을 찾아 점프해요. 새로운 도전은 좋아하지만 반복 놀이는 금방 지루해합니다.",
    keywords: ["재치", "장난", "도전"],
    loves: "새로운 놀이, 집사 놀리기, 두뇌 게임, 높은 곳",
    caution: "영리해서 나쁜 습관도 빠르게 배워요. 일관된 규칙이 중요합니다.",
    tip: "놀이에 변화를 주고 퍼즐 급식기로 두뇌를 쓰게 해 주세요. 규칙은 가족 모두가 똑같이 적용해야 해요.",
    match: "INFJ", clash: "ISFJ"
  },
  ESTJ: {
    emoji: "📣", name: "집안 질서 반장냥", tagline: "밥그릇은 비었고, 집사는 늦었습니다",
    desc: "집안의 질서를 지키는 확고한 반장입니다. 정해진 시간에 밥을 요구하고, 정해진 자리를 점검하며, 집사가 규칙을 어기면 큰 소리로 알려요. 책임감이 강하고 영역을 순찰하는 걸 좋아합니다.",
    keywords: ["규칙", "리더십", "책임감"],
    loves: "정해진 일과, 영역 순찰, 확실한 밥시간",
    caution: "다른 반려동물과 영역 다툼이 생길 수 있고, 일과가 어긋나면 큰 소리로 항의할 수 있어요.",
    tip: "규칙적인 급식 시간과 순찰할 수 있는 높은 공간을 마련해 주세요. 영역 분리도 중요합니다.",
    match: "ISTJ", clash: "INFP"
  },
  ESFJ: {
    emoji: "🧺", name: "집사 케어 매니저", tagline: "오늘 컨디션은 어때? 내가 살펴볼게",
    desc: "집사의 하루를 챙기는 다정한 매니저 고양이입니다. 퇴근하면 현관에서 맞이하고, 집사가 아프면 곁을 떠나지 않아요. 가족이 모두 모여 있을 때 가장 행복하고, 칭찬받는 걸 매우 좋아합니다.",
    keywords: ["다정함", "챙김", "가족"],
    loves: "가족이 모여 있는 시간, 칭찬, 함께하는 일과",
    caution: "집사 감정에 지나치게 영향을 받고, 혼자 있으면 불안해할 수 있어요.",
    tip: "칭찬 위주로 교감하고, 혼자서도 편안히 지내는 연습을 조금씩 병행해 주세요.",
    match: "ISFP", clash: "INTJ"
  },
  ENFJ: {
    emoji: "🌟", name: "집안의 인기 마스코트", tagline: "내가 있으면 온 가족이 모여요",
    desc: "사교적이면서 집사와의 교감도 깊은 따뜻한 중심 고양이입니다. 가족 누구에게나 다가가 분위기를 부드럽게 만들고, 집사 말투와 표정을 잘 읽어요. 다른 반려동물과도 잘 어울리는 중재자입니다.",
    keywords: ["리더십", "교감", "인기"],
    loves: "가족 모두의 관심, 쓰다듬, 협동 놀이",
    caution: "모두를 챙기다 스스로 지칠 수 있어요. 혼자 쉴 수 있는 조용한 공간이 꼭 필요합니다.",
    tip: "집사와 함께하는 놀이 시간을 충분히 갖고, 쉬고 싶을 땐 방해받지 않는 공간을 지켜 주세요.",
    match: "INFP", clash: "ISTP"
  },
  ENTJ: {
    emoji: "👑", name: "카리스마 집안 대장냥", tagline: "이 집의 주인은 접니다",
    desc: "목표가 분명하고 추진력 있는 카리스마 고양이입니다. 집 안의 가장 좋은 자리를 차지하고, 집사의 일정까지 주도하려 해요. 영리하고 자신감이 넘쳐 리더 역할을 잘하지만 고집도 만만치 않습니다.",
    keywords: ["카리스마", "추진력", "자신감"],
    loves: "가장 좋은 자리, 영역 순찰, 도전 과제, 인정받기",
    caution: "다른 반려동물과 서열 다툼이 생기기 쉽고, 마음에 안 들면 강하게 표현합니다.",
    tip: "일관되고 차분한 태도로 규칙을 알려주고, 높은 곳과 도전적인 놀이로 지배욕을 충족해 주세요.",
    match: "INTP", clash: "ISFP"
  }
};

// ============================================
// 채점 함수
// ============================================

function calcCatMbti(answers) {
  // answers = ["E","S","F","J", ...] 28개 (각 문항에서 고른 글자)
  const totals = { E: 0, I: 0, S: 0, N: 0, T: 0, F: 0, J: 0, P: 0 };
  answers.forEach(letter => {
    if (totals[letter] !== undefined) totals[letter] += 1;
  });

  const axes = {};
  let code = "";
  Object.entries(CATMBTI_AXES).forEach(([axisKey, axis]) => {
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
      strength: catMbtiStrength(winnerScore, total),
      info: axis[winnerLetter]
    };
  });

  const typeInfo = CATMBTI_TYPES[code];
  return {
    code,
    typeInfo,
    totals,
    axes,
    secondary: calcCatMbtiSecondary(code, axes),
    matchInfo: CATMBTI_TYPES[typeInfo.match],
    clashInfo: CATMBTI_TYPES[typeInfo.clash]
  };
}

// 보조 유형: 점수 차이가 가장 작은 축 하나를 뒤집은 유형
// 차이(승-패)가 CATMBTI_SECONDARY_MAX_MARGIN 이하일 때만 "경계 성향"으로 인정한다.
// 7문항 기준 승패가 4:3(차 1), 5:2(차 3)이면 보조 유형 표시, 6:1(차 5) 이상이면 없음.
const CATMBTI_SECONDARY_MAX_MARGIN = 3;

function calcCatMbtiSecondary(code, axes) {
  const order = ["EI", "SN", "TF", "JP"];
  let target = null;
  order.forEach((key, idx) => {
    const margin = axes[key].winnerScore - axes[key].loserScore;
    if (!target || margin < target.margin) target = { key, idx, margin };
  });
  if (!target || target.margin > CATMBTI_SECONDARY_MAX_MARGIN) return null;

  const axis = axes[target.key];
  const letters = code.split("");
  letters[target.idx] = axis.loser;
  const secondaryCode = letters.join("");
  return {
    code: secondaryCode,
    info: CATMBTI_TYPES[secondaryCode],
    axisKey: target.key,
    axisTitle: axis.title,
    margin: target.margin,
    winner: axis.winner,
    loser: axis.loser,
    winnerPct: axis.pctByLetter[axis.winner],
    loserPct: axis.pctByLetter[axis.loser],
    winnerInfo: axis.info,
    loserInfo: CATMBTI_AXES[target.key][axis.loser]
  };
}

// 우세 글자가 전체 문항에서 차지한 비율로 성향 강도 라벨 결정
function catMbtiStrength(score, total) {
  const ratio = total ? score / total : 0.5;
  if (ratio >= 6 / 7) return "아주 뚜렷";
  if (ratio >= 5 / 7) return "꽤 뚜렷";
  return "살짝 기운";
}

if (typeof module !== 'undefined') {
  module.exports = { CATMBTI_QUESTIONS, CATMBTI_AXES, CATMBTI_TYPES, calcCatMbti, calcCatMbtiSecondary, catMbtiStrength };
}
