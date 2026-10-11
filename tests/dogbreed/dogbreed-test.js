// ============================================
// 나와 찰떡인 강아지는? 견종 매칭 테스트
// ============================================
// 구조: 26문항.
//   생활 패턴·성향 23문항: 3지선다, 선택지가 한 기준(dim)에 1/3/5 값을 준다
//   취향 3문항: 끌리는 외모·매력·놀이 스타일 (범주 선택)
// 기준(DOGBREED_DIMS)마다 사용자 값 = 해당 문항 답의 평균
// 견종(DOGBREED_BREEDS)은 같은 기준의 특성값(1~5)과 취향 범주를 가진다.
// 기준 종류
//   match : 양쪽 거리 |사용자 - 견종|            (활동량, 크기, 애정 표현, 집 분위기)
//           overMul이 있으면 견종 쪽이 넘칠 때 차이를 그만큼 키운다
//           (좁은 집에 큰 개, 산책을 못 해 주는 집에 활동량 많은 개가 반대 경우보다 심각하므로)
//   tol   : 견종 값이 사용자 허용치를 넘는 만큼  (털 빠짐, 미용, 훈련 난이도, 짖음, 비용)
//   need  : 사용자 요구치가 견종 값을 넘는 만큼  (혼자 있는 시간)
//   cat   : 고른 범주가 견종 범주에 없으면 고정 차이 3  (외모, 매력, 놀이)
// 벌점 = Σ 가중치 × 차이,  궁합% = 100 - 벌점 / 최대벌점 × 100
// 견종 특성값은 일반적인 경향을 단순화한 것이며 개체 차이가 크다.
// ============================================

const DOGBREED_DIMS = {
  energy:    { name: "활동량",        kind: "match", w: 1.5, overMul: 1.6, low: "느긋",     high: "활동적" },
  size:      { name: "공간·크기",     kind: "match", w: 1.2, overMul: 1.6, low: "소형",     high: "대형" },
  alone:     { name: "혼자 있는 시간", kind: "need",  w: 1.1, low: "짧음",     high: "김" },
  shed:      { name: "털 빠짐",       kind: "tol",   w: 1.0, low: "적음",     high: "많음" },
  groom:     { name: "미용·빗질",     kind: "tol",   w: 0.8, low: "가벼움",   high: "손 많이 감" },
  train:     { name: "훈련 난이도",    kind: "tol",   w: 1.0, low: "쉬움",     high: "고집 셈" },
  bark:      { name: "짖음",          kind: "tol",   w: 1.0, low: "조용",     high: "잘 짖음" },
  cost:      { name: "관리 비용",      kind: "tol",   w: 0.8, low: "적음",     high: "많음" },
  affection: { name: "애정 표현",      kind: "match", w: 1.0, low: "쿨함",     high: "껌딱지" },
  social:    { name: "집 분위기",      kind: "match", w: 0.8, low: "조용",     high: "북적" },
  look:      { name: "끌리는 외모",    kind: "cat",   w: 1.2 },
  charm:     { name: "끌리는 매력",    kind: "cat",   w: 1.0 },
  play:      { name: "놀이 스타일",    kind: "cat",   w: 1.0 }
};

// 궁합 상세 화면에서 사용자 값을 어떻게 읽어 줄지 (tol/need 기준은 "허용치/요구치" 의미)
const DOGBREED_USER_LABEL = {
  energy: "나의 활동량", size: "공간·선호 크기", alone: "혼자 두는 시간", shed: "털 허용치",
  groom: "관리 여유", train: "훈련 경험·인내", bark: "소음 허용치", cost: "예산 여유",
  affection: "원하는 애정도", social: "집 북적임"
};

const DOGBREED_QUESTIONS = [
  {
    id: 1, dim: "energy", emoji: "🗓️",
    question: "쉬는 날, 나는 주로 어떻게 보내?",
    choices: [
      { text: "🛋️ 집에서 뒹굴며 푹 쉰다", val: 1 },
      { text: "☕ 동네 산책하거나 카페에 간다", val: 3 },
      { text: "🏕️ 등산, 캠핑, 러닝처럼 밖에서 움직인다", val: 5 }
    ]
  },
  {
    id: 2, dim: "size", emoji: "🏠",
    question: "지금 사는 곳(또는 강아지와 살 곳)은?",
    choices: [
      { text: "🏢 원룸이나 오피스텔", val: 1 },
      { text: "🏘️ 아파트나 빌라", val: 3 },
      { text: "🏡 마당이 있는 주택", val: 5 }
    ]
  },
  {
    id: 3, dim: "alone", emoji: "⏰",
    question: "강아지가 하루에 혼자 있게 될 시간은?",
    choices: [
      { text: "🏡 거의 없다 (재택이거나 가족이 늘 있음)", val: 1 },
      { text: "🕓 4~6시간 정도", val: 3 },
      { text: "🌙 8시간 이상", val: 5 }
    ]
  },
  {
    id: 4, dim: "affection", emoji: "💞",
    question: "강아지와 어떤 관계를 원해?",
    choices: [
      { text: "🧊 각자의 시간을 존중하는 쿨한 사이", val: 1 },
      { text: "🤝 적당히 붙어 있는 다정한 사이", val: 3 },
      { text: "🫶 하루 종일 껌딱지처럼 붙어 있는 사이", val: 5 }
    ]
  },
  {
    id: 5, dim: "shed", emoji: "🧹",
    question: "옷과 소파에 털이 날린다면?",
    choices: [
      { text: "😱 상상만 해도 힘들다", val: 1 },
      { text: "🧽 청소를 자주 하면 괜찮다", val: 3 },
      { text: "😎 털쯤이야 아무렇지 않다", val: 5 }
    ]
  },
  {
    id: 6, dim: "energy", emoji: "🦮",
    question: "하루에 산책에 쓸 수 있는 시간은?",
    choices: [
      { text: "⏱️ 20분 정도가 현실적이다", val: 1 },
      { text: "🚶 30분~1시간은 낼 수 있다", val: 3 },
      { text: "🏃 1시간 이상, 하루 두 번도 괜찮다", val: 5 }
    ]
  },
  {
    id: 7, dim: "train", emoji: "📚",
    question: "반려견을 키워 본 경험은?",
    choices: [
      { text: "🐣 이번이 처음이다", val: 1 },
      { text: "👨‍👩‍👧 어릴 때 가족이 키웠다", val: 3 },
      { text: "🎓 직접 키워 본 적이 있다", val: 5 }
    ]
  },
  {
    id: 8, dim: "bark", emoji: "🔊",
    question: "층간소음이나 이웃 민원이 걱정되나요?",
    choices: [
      { text: "😰 매우 신경 쓰인다", val: 1 },
      { text: "🤔 조금 신경 쓰인다", val: 3 },
      { text: "🙆 크게 상관없는 환경이다", val: 5 }
    ]
  },
  {
    id: 9, dim: "look", emoji: "👀", categorical: true,
    question: "길에서 마주쳤을 때 눈을 못 떼는 강아지는?",
    choices: [
      { text: "☁️ 하얗고 몽글몽글한 솜뭉치", val: "fluffy" },
      { text: "🧸 곱슬곱슬 테디베어 같은 아이", val: "teddy" },
      { text: "🦊 여우나 늑대처럼 늠름한 얼굴", val: "fox" },
      { text: "🐶 순둥하고 듬직한 인상", val: "gentle" },
      { text: "🥸 수염, 납작코, 짧은 다리 같은 개성 만점 외모", val: "quirky" }
    ]
  },
  {
    id: 10, dim: "size", emoji: "📏",
    question: "마음이 가는 강아지 크기는?",
    choices: [
      { text: "🤲 품에 쏙 안기는 작은 아이", val: 1 },
      { text: "🐕 무릎에 올라올 만한 중간 크기", val: 3 },
      { text: "🦁 듬직하게 큰 아이", val: 5 }
    ]
  },
  {
    id: 11, dim: "cost", emoji: "💰",
    question: "반려견에게 매달 쓸 수 있는 예산은? (사료·간식·미용·용품)",
    choices: [
      { text: "🪙 최소한으로 아끼고 싶다", val: 1 },
      { text: "💳 적당히 쓸 수 있다", val: 3 },
      { text: "💎 필요한 만큼 아낌없이 쓸 수 있다", val: 5 }
    ]
  },
  {
    id: 12, dim: "energy", emoji: "🗣️",
    question: "친구들이 말하는 나는?",
    choices: [
      { text: "🍵 차분하고 조용한 사람", val: 1 },
      { text: "🙂 상황에 따라 다른 사람", val: 3 },
      { text: "⚡ 늘 에너지 넘치는 사람", val: 5 }
    ]
  },
  {
    id: 13, dim: "shed", emoji: "🤧",
    question: "나나 가족에게 비염·알레르기가 있나요?",
    choices: [
      { text: "😷 있다, 꽤 신경 쓰인다", val: 1 },
      { text: "🤏 약간 있지만 심하지 않다", val: 3 },
      { text: "💯 전혀 없다", val: 5 }
    ]
  },
  {
    id: 14, dim: "social", emoji: "👨‍👩‍👧‍👦",
    question: "우리 집 분위기는?",
    choices: [
      { text: "🤫 혼자 또는 둘이 사는 조용한 집", val: 1 },
      { text: "🙂 가끔 손님이 오는 편", val: 3 },
      { text: "🎉 아이가 있거나 손님이 자주 오는 북적이는 집", val: 5 }
    ]
  },
  {
    id: 15, dim: "groom", emoji: "✂️",
    question: "정기 미용과 빗질 관리는?",
    choices: [
      { text: "😓 시간도 비용도 부담스럽다", val: 1 },
      { text: "🗓️ 한두 달에 한 번 미용, 가끔 빗질은 OK", val: 3 },
      { text: "💇 매일 빗질도 교감이라 즐겁다", val: 5 }
    ]
  },
  {
    id: 16, dim: "alone", emoji: "🧳",
    question: "여행이나 약속으로 집을 비우는 일은?",
    choices: [
      { text: "🙅 거의 없다", val: 1 },
      { text: "🙂 한 달에 몇 번 정도", val: 3 },
      { text: "✈️ 잦은 편이다", val: 5 }
    ]
  },
  {
    id: 17, dim: "play", emoji: "🎾", categorical: true,
    question: "강아지와 가장 해 보고 싶은 놀이는?",
    choices: [
      { text: "🛋️ 소파에서 꼭 붙어 쉬며 쓰다듬기", val: "lap" },
      { text: "🎾 공 던지기, 터그 놀이처럼 신나게 뛰기", val: "ball" },
      { text: "🌿 냄새 맡으며 낯선 길 탐험하기", val: "sniff" }
    ]
  },
  {
    id: 18, dim: "train", emoji: "🧩",
    question: "훈련에 대한 나의 생각은?",
    choices: [
      { text: "😇 가르치기 쉬운 순한 아이가 좋다", val: 1 },
      { text: "🙂 시간을 들여 차근차근 가르칠 수 있다", val: 3 },
      { text: "💪 고집 센 아이도 도전해 볼 만하다", val: 5 }
    ]
  },
  {
    id: 19, dim: "affection", emoji: "🚪",
    question: "퇴근하고 문을 열었을 때 바라는 모습은?",
    choices: [
      { text: "😌 꼬리 한 번 흔들고 쿨하게 인사", val: 1 },
      { text: "😊 반갑게 현관으로 마중", val: 3 },
      { text: "🤩 온몸으로 뛰어오르며 대환영", val: 5 }
    ]
  },
  {
    id: 20, dim: "shed", emoji: "🧼",
    question: "평소 나의 청소 습관은?",
    choices: [
      { text: "✨ 먼지 하나도 못 참는 깔끔쟁이", val: 1 },
      { text: "🧺 주말에 몰아서 하는 편", val: 3 },
      { text: "🤷 조금 어질러져도 신경 안 쓴다", val: 5 }
    ]
  },
  {
    id: 21, dim: "bark", emoji: "😴",
    question: "나는 소리에 얼마나 예민한 편?",
    choices: [
      { text: "👂 작은 소리에도 잠이 깬다", val: 1 },
      { text: "🙂 보통이다", val: 3 },
      { text: "🔇 웬만한 소리엔 무던하다", val: 5 }
    ]
  },
  {
    id: 22, dim: "charm", emoji: "✨", categorical: true,
    question: "강아지의 어떤 매력에 가장 약해?",
    choices: [
      { text: "🥰 애교 만점, 보기만 해도 녹는 귀여움", val: "cute" },
      { text: "🎓 말귀를 척척 알아듣는 똑똑함", val: "smart" },
      { text: "😎 자기 주관이 뚜렷한 개성", val: "unique" }
    ]
  },
  {
    id: 23, dim: "energy", emoji: "💪",
    question: "평소 나의 체력과 운동 습관은?",
    choices: [
      { text: "😮‍💨 운동과는 거리가 먼 편이다", val: 1 },
      { text: "🙂 가끔 걷기나 가벼운 운동을 한다", val: 3 },
      { text: "🔥 꾸준히 운동하고 체력에 자신 있다", val: 5 }
    ]
  },
  {
    id: 24, dim: "groom", emoji: "🎀",
    question: "강아지 옷 입히기, 털 스타일링 같은 꾸미기는?",
    choices: [
      { text: "🙅 관심 없다, 자연스러운 게 좋다", val: 1 },
      { text: "🙂 가끔은 해 보고 싶다", val: 3 },
      { text: "🛍️ 너무 좋다, 미용 스타일도 고르고 싶다", val: 5 }
    ]
  },
  {
    id: 25, dim: "cost", emoji: "🏥",
    question: "병원비나 미용비처럼 예상 못 한 지출이 생긴다면?",
    choices: [
      { text: "😥 큰 지출은 부담이 크다", val: 1 },
      { text: "🙂 어느 정도는 대비해 둘 수 있다", val: 3 },
      { text: "🛡️ 펫보험이나 비상금으로 충분히 대비할 수 있다", val: 5 }
    ]
  },
  {
    id: 26, dim: "social", emoji: "🐾",
    question: "다른 강아지나 사람들과 어울리는 자리에 데려가고 싶어?",
    choices: [
      { text: "🏠 우리 둘만의 시간이 좋다", val: 1 },
      { text: "🙂 가끔 애견 카페 정도는 가고 싶다", val: 3 },
      { text: "🎪 애견 운동장, 모임, 여행까지 함께 다니고 싶다", val: 5 }
    ]
  }
];

// ============================================
// 20견종 특성값 (1~5)
// energy: 필요한 운동량 / size: 체구 / alone: 혼자 있기 적응력(높을수록 잘 견딤)
// shed: 털 빠짐 / groom: 미용·빗질 필요 / train: 훈련 난이도(고집) / bark: 짖음 경향
// cost: 관리 비용 규모(사료·미용·병원비) / affection: 애정 표현·밀착 / social: 낯선 사람·북적임 친화
// look·charm·play: 취향 범주
// ============================================

const DOGBREED_BREEDS = {
  maltese: {
    name: "말티즈", emoji: "🤍", size: "소형", weight: "2~4kg", coat: "단일모 · 긴 직모",
    tagline: "당신 곁이 세상에서 제일 좋은 껌딱지",
    keywords: ["애교쟁이", "껌딱지", "털빠짐 적음"],
    desc: "작고 하얀 털, 동그란 눈으로 사랑받는 대표 소형견입니다. 보호자에게 깊이 애착하고 애교가 많아 늘 곁에 붙어 있으려 해요. 털 빠짐이 적은 편이라 털 날림에 예민한 사람에게도 잘 맞지만, 혼자 있는 시간이 길면 외로움을 크게 타는 편입니다.",
    traits: { energy: 2, size: 1, alone: 1, shed: 1, groom: 4, train: 3, bark: 4, cost: 2, affection: 5, social: 3 },
    look: ["fluffy"], charm: ["cute"], play: ["lap"],
    day: "아침엔 침대 위에서 눈을 맞추며 하루를 시작하고, 짧은 동네 산책 뒤엔 무릎 위에서 낮잠을 자요. 저녁엔 소파 옆자리를 지키며 쓰다듬어 달라고 앞발을 톡톡 내밉니다.",
    checklist: ["혼자 있는 시간을 짧게부터 늘려 갈 수 있나요?", "미끄럼 방지 매트로 관절을 지켜 줄 수 있나요?", "눈물 자국과 털 엉킴을 자주 관리할 수 있나요?"],
    caution: "슬개골 탈구에 주의하고, 높은 곳에서 뛰어내리지 않게 해 주세요. 분리불안이 생기기 쉬워 혼자 있는 연습이 필요합니다.",
    tip: "외출과 귀가를 담담하게 하고, 미끄럼 방지 매트로 관절을 지켜 주세요."
  },
  poodle: {
    name: "토이 푸들", emoji: "🧸", size: "소형", weight: "2~4kg", coat: "단일모 · 곱슬",
    tagline: "똑똑하고 털 걱정 없는 모범생",
    keywords: ["영리함", "털빠짐 적음", "초보 추천"],
    desc: "영리하고 훈련 습득이 빨라 초보 보호자에게도 인기가 많은 견종입니다. 곱슬곱슬한 털은 잘 빠지지 않아 알레르기가 걱정되는 집에서도 많이 선택해요. 대신 털이 계속 자라서 정기적인 미용이 꼭 필요합니다.",
    traits: { energy: 3, size: 1, alone: 2, shed: 1, groom: 5, train: 1, bark: 3, cost: 3, affection: 4, social: 4 },
    look: ["teddy"], charm: ["smart"], play: ["ball"],
    day: "아침 산책에서 새로 배운 개인기를 자랑하고, 낮에는 노즈워크 장난감으로 머리를 써요. 저녁엔 공놀이 한 판 뒤에 보호자 옆에서 얌전히 쉬는 모범생입니다.",
    checklist: ["4~6주마다 미용실에 갈 시간과 비용이 있나요?", "매일 짧게라도 두뇌 놀이를 해 줄 수 있나요?", "털 엉킴을 막을 빗질을 할 수 있나요?"],
    caution: "털이 계속 자라 4~6주마다 미용이 필요해요. 머리를 쓰는 놀이가 부족하면 지루해할 수 있습니다.",
    tip: "개인기와 노즈워크로 두뇌를 자주 써 주면 훨씬 안정적으로 지내요."
  },
  pomeranian: {
    name: "포메라니안", emoji: "🧡", size: "소형", weight: "1.5~3.5kg", coat: "이중모 · 풍성",
    tagline: "작은 몸에 담긴 커다란 자신감",
    keywords: ["솜사탕털", "활발함", "경계심"],
    desc: "솜사탕 같은 풍성한 털과 밝은 성격이 매력인 소형견입니다. 활발하고 호기심이 많으며 경계심도 있어 집을 지키려는 듯 짖는 편이에요. 이중모라 털 빠짐이 꽤 있어서 빗질을 자주 해 줘야 합니다.",
    traits: { energy: 3, size: 1, alone: 2, shed: 4, groom: 3, train: 3, bark: 5, cost: 2, affection: 4, social: 3 },
    look: ["fluffy", "fox"], charm: ["cute"], play: ["lap"],
    day: "초인종 소리에 가장 먼저 달려가 집을 지키고, 산책길에선 당당한 걸음으로 시선을 끌어요. 집에 오면 보호자 무릎에 올라와 솜사탕 같은 털을 쓰다듬게 해 줍니다.",
    checklist: ["어릴 때부터 짖음 교육을 꾸준히 할 수 있나요?", "털갈이 시기 빗질을 자주 할 수 있나요?", "작은 체구라 낙상에 주의할 수 있나요?"],
    caution: "짖음이 많은 편이라 공동주택이라면 어릴 때부터 짖음 교육이 필요해요. 털갈이 시기엔 털이 많이 빠집니다.",
    tip: "초인종 소리 같은 자극에 차분히 반응하도록 보상 훈련을 해 주세요."
  },
  bichon: {
    name: "비숑 프리제", emoji: "☁️", size: "소형", weight: "3~8kg", coat: "이중모 · 곱슬",
    tagline: "누구에게나 웃어 주는 구름 솜뭉치",
    keywords: ["명랑함", "사교왕", "털빠짐 적음"],
    desc: "하얀 솜사탕 같은 외모에 사람을 정말 좋아하는 명랑한 견종입니다. 낯선 사람이나 아이와도 잘 어울려 가족견으로 인기가 많아요. 털 빠짐은 적지만 미용과 빗질을 꾸준히 해야 털이 엉키지 않습니다.",
    traits: { energy: 3, size: 2, alone: 1, shed: 1, groom: 5, train: 2, bark: 3, cost: 3, affection: 5, social: 5 },
    look: ["fluffy", "teddy"], charm: ["cute"], play: ["ball"],
    day: "아침부터 신나게 '비숑 타임' 우다다를 하고, 산책길에선 만나는 사람마다 꼬리를 흔들어요. 손님이 오면 가장 먼저 반겨 주는 우리 집 분위기 메이커입니다.",
    checklist: ["혼자 있는 시간을 길게 만들지 않을 수 있나요?", "매일 빗질과 정기 미용을 챙길 수 있나요?", "피부와 눈 주변을 자주 살펴 줄 수 있나요?"],
    caution: "사람을 너무 좋아해서 혼자 있는 시간을 힘들어해요. 털이 쉽게 엉켜 빗질을 자주 해야 합니다.",
    tip: "짧은 외출부터 혼자 있는 연습을 하고, 매일 짧게라도 빗질해 주세요."
  },
  shihtzu: {
    name: "시츄", emoji: "🎀", size: "소형", weight: "4~7kg", coat: "이중모 · 긴 직모",
    tagline: "느긋하고 순한 평화주의자",
    keywords: ["순둥이", "운동량 적음", "실내 생활"],
    desc: "순하고 느긋한 성격으로 실내 생활에 잘 맞는 소형견입니다. 운동량이 많지 않아 바쁜 사람이나 활동량이 적은 사람에게도 부담이 적어요. 사람을 좋아하지만 과하게 보채지 않는 편안한 동반자입니다.",
    traits: { energy: 1, size: 2, alone: 3, shed: 2, groom: 4, train: 3, bark: 2, cost: 3, affection: 4, social: 4 },
    look: ["teddy"], charm: ["cute"], play: ["lap"],
    day: "느지막이 일어나 짧은 산책을 즐기고, 대부분의 시간은 쿠션 위에서 느긋하게 쉬어요. 보호자가 바빠도 보채지 않고 조용히 곁에 있어 주는 편안한 룸메이트입니다.",
    checklist: ["눈물과 눈 주변을 매일 닦아 줄 수 있나요?", "여름철 더위 관리를 해 줄 수 있나요?", "정기 미용을 챙길 수 있나요?"],
    caution: "눈이 커서 눈물과 눈 관리가 필요하고, 코가 짧아 더위에 약해요. 털이 길어 정기 미용이 필요합니다.",
    tip: "여름엔 시원한 시간대에 짧게 산책하고, 눈 주변을 자주 닦아 주세요."
  },
  frenchie: {
    name: "프렌치 불독", emoji: "🦇", size: "중소형", weight: "8~14kg", coat: "단모",
    tagline: "조용하고 듬직한 소파 친구",
    keywords: ["조용함", "장난꾸러기", "더위 주의"],
    desc: "박쥐 같은 귀와 듬직한 체형이 매력인 견종입니다. 잘 짖지 않고 운동량도 많지 않아 아파트 생활에 잘 맞는 편이에요. 장난기 있고 사람을 좋아하지만, 코가 짧아 더위와 격한 운동에는 약합니다.",
    traits: { energy: 2, size: 2, alone: 3, shed: 3, groom: 1, train: 3, bark: 1, cost: 4, affection: 4, social: 4 },
    look: ["quirky"], charm: ["unique"], play: ["lap"],
    day: "아침 산책은 시원할 때 짧게, 집에선 코를 골며 소파 한쪽을 차지해요. 가끔 장난감을 물고 와 놀아 달라 조르는 귀여운 장난꾸러기입니다.",
    checklist: ["에어컨 등으로 여름 더위를 확실히 관리할 수 있나요?", "호흡기·피부 관련 병원비에 대비할 수 있나요?", "주름 사이를 자주 닦아 줄 수 있나요?"],
    caution: "단두종이라 더위와 호흡에 특히 주의해야 해요. 한여름 낮 산책과 격한 운동은 피해 주세요.",
    tip: "에어컨이 있는 시원한 환경을 유지하고, 주름 사이를 자주 닦아 피부를 관리해 주세요."
  },
  dachshund: {
    name: "닥스훈트", emoji: "🌭", size: "소형", weight: "4~6kg (미니어처)", coat: "단모 · 장모 · 강모",
    tagline: "짧은 다리, 넘치는 호기심",
    keywords: ["호기심", "용감함", "허리 주의"],
    desc: "긴 허리와 짧은 다리가 트레이드마크인 사냥견 출신입니다. 호기심과 용기가 많고 냄새 탐색을 좋아해요. 영리하지만 자기 주장이 있어서 훈련에는 일관성이 필요합니다.",
    traits: { energy: 3, size: 2, alone: 2, shed: 3, groom: 1, train: 4, bark: 4, cost: 2, affection: 4, social: 3 },
    look: ["quirky"], charm: ["unique"], play: ["sniff"],
    day: "산책길에선 코를 땅에 박고 냄새를 탐험하느라 바쁘고, 집에선 이불 속으로 파고들어 숨는 걸 좋아해요. 보호자에게는 애교 많은 껌딱지가 됩니다.",
    checklist: ["계단·소파 점프를 줄이는 환경을 만들 수 있나요?", "체중 관리를 꾸준히 할 수 있나요?", "일관된 규칙으로 훈련할 수 있나요?"],
    caution: "허리가 길어 디스크에 취약해요. 계단, 소파 점프를 줄이고 체중 관리를 꼭 해 주세요.",
    tip: "계단 대신 경사로를 두고, 안을 땐 허리와 엉덩이를 함께 받쳐 주세요."
  },
  corgi: {
    name: "웰시 코기", emoji: "🍑", size: "중형", weight: "10~14kg", coat: "이중모",
    tagline: "짧은 다리로 온 동네를 누비는 에너자이저",
    keywords: ["에너자이저", "영리함", "털빠짐 많음"],
    desc: "목양견 출신으로 영리하고 활발하며 사람을 잘 따르는 견종입니다. 짧은 다리와 통통한 엉덩이로 사랑받지만, 의외로 운동량이 많고 털도 많이 빠져요. 활동적인 가족과 잘 맞습니다.",
    traits: { energy: 4, size: 3, alone: 3, shed: 5, groom: 2, train: 2, bark: 4, cost: 3, affection: 4, social: 4 },
    look: ["fox"], charm: ["cute"], play: ["ball"],
    day: "아침 산책에서 엉덩이를 씰룩이며 앞장서고, 낮엔 공놀이로 에너지를 쏟아요. 저녁엔 식사 시간을 정확히 기억해 보호자를 재촉하는 귀여운 먹보입니다.",
    checklist: ["매일 충분한 산책 시간을 낼 수 있나요?", "털갈이 시기 엄청난 털을 감당할 수 있나요?", "간식 양을 조절해 체중을 관리할 수 있나요?"],
    caution: "털 빠짐이 매우 많고 식욕이 좋아 비만이 되기 쉬워요. 허리 건강을 위해 체중 관리가 중요합니다.",
    tip: "매일 충분한 산책과 빗질을 하고, 간식 양을 꼼꼼히 조절해 주세요."
  },
  shiba: {
    name: "시바견", emoji: "🦊", size: "중형", weight: "7~11kg", coat: "이중모",
    tagline: "깔끔하고 독립적인 츤데레",
    keywords: ["독립적", "깔끔함", "고집"],
    desc: "여우 같은 얼굴과 말린 꼬리가 매력인 일본 견종입니다. 깔끔하고 독립심이 강해 혼자 있는 시간도 비교적 잘 보내요. 다만 고집이 세고 싫은 건 확실히 표현해서, 훈련에는 인내심이 필요합니다.",
    traits: { energy: 3, size: 3, alone: 4, shed: 5, groom: 2, train: 5, bark: 2, cost: 3, affection: 2, social: 2 },
    look: ["fox"], charm: ["unique"], play: ["sniff"],
    day: "산책은 자기가 정한 코스로, 집에선 자기만의 자리에서 조용히 쉬어요. 평소엔 쿨하다가도 가끔 슬며시 다가와 몸을 기대는 츤데레 매력이 있습니다.",
    checklist: ["억지로 만지지 않고 기다려 줄 인내심이 있나요?", "털갈이 시기 대량의 털을 감당할 수 있나요?", "보상 위주로 꾸준히 훈련할 수 있나요?"],
    caution: "털갈이 시기에 털이 엄청나게 빠지고, 고집이 세서 강압적인 훈련은 역효과가 나요.",
    tip: "억지로 안거나 만지기보다 스스로 다가오게 기다리고, 보상 위주로 가르쳐 주세요."
  },
  jindo: {
    name: "진돗개", emoji: "🐺", size: "중대형", weight: "15~23kg", coat: "이중모",
    tagline: "한 사람만 바라보는 충직한 파트너",
    keywords: ["충성심", "영리함", "경계심"],
    desc: "우리나라 천연기념물로 충성심과 영리함으로 유명한 견종입니다. 가족에게는 한없이 충직하지만 낯선 사람에게는 경계심이 강해요. 깔끔하고 독립적이며, 충분한 운동과 어릴 때부터의 사회화가 중요합니다.",
    traits: { energy: 4, size: 4, alone: 4, shed: 4, groom: 2, train: 4, bark: 3, cost: 3, affection: 3, social: 1 },
    look: ["fox"], charm: ["unique"], play: ["sniff"],
    day: "새벽 산책을 누구보다 좋아하고, 집에선 현관 쪽을 지키며 가족을 살펴요. 낯선 사람에겐 거리를 두지만 보호자 곁에서는 든든하고 다정한 파트너입니다.",
    checklist: ["어릴 때부터 다양한 사람·환경에 사회화할 수 있나요?", "매일 충분한 운동 시간을 낼 수 있나요?", "중대형견에 맞는 공간이 있나요?"],
    caution: "낯선 사람과 다른 개에게 경계심이 강해 어릴 때부터 사회화 교육이 꼭 필요해요. 운동량도 많은 편입니다.",
    tip: "다양한 사람과 환경을 천천히 경험하게 해 주고, 매일 충분히 산책해 주세요."
  },
  golden: {
    name: "골든 리트리버", emoji: "🌻", size: "대형", weight: "25~34kg", coat: "이중모 · 장모",
    tagline: "모두를 사랑하는 다정한 천사",
    keywords: ["다정함", "가족견", "대형견"],
    desc: "온순하고 사람을 정말 좋아해 대표적인 가족견으로 꼽히는 대형견입니다. 영리하고 훈련도 잘 받아 초보자도 키우기 좋은 편이에요. 다만 운동량이 많고 털 빠짐도 많아 넓은 공간과 시간이 필요합니다.",
    traits: { energy: 4, size: 5, alone: 2, shed: 5, groom: 3, train: 1, bark: 2, cost: 5, affection: 5, social: 5 },
    look: ["gentle"], charm: ["smart"], play: ["ball"],
    day: "아침 공원에서 공을 물어 오며 신나게 뛰고, 집에선 가족 발밑에 큰 몸을 누이고 쉬어요. 손님이 오면 꼬리로 온 집을 쓸며 환영하는 다정한 천사입니다.",
    checklist: ["대형견에 맞는 넉넉한 공간이 있나요?", "매일 1시간 이상 운동시킬 수 있나요?", "대형견 사료·병원비를 감당할 수 있나요?"],
    caution: "대형견이라 공간과 운동 시간이 넉넉해야 해요. 털 빠짐이 많고, 혼자 있는 시간이 길면 외로워합니다.",
    tip: "매일 충분한 산책과 공놀이를 해 주고, 고관절 건강을 위해 체중 관리를 해 주세요."
  },
  bordercollie: {
    name: "보더콜리", emoji: "⚡", size: "중대형", weight: "14~20kg", coat: "이중모",
    tagline: "지치지 않는 천재 운동선수",
    keywords: ["천재견", "운동광", "두뇌 놀이"],
    desc: "가장 영리한 견종으로 손꼽히는 목양견입니다. 훈련 습득이 빠르고 보호자와 함께 무언가를 하는 걸 좋아해요. 대신 운동량과 두뇌 자극이 매우 많이 필요해서, 활동적인 보호자와 가장 잘 맞습니다.",
    traits: { energy: 5, size: 4, alone: 2, shed: 4, groom: 3, train: 1, bark: 3, cost: 4, affection: 3, social: 3 },
    look: ["gentle"], charm: ["smart"], play: ["ball"],
    day: "아침엔 프리스비로 전력 질주하고, 낮엔 새로운 훈련 과제를 척척 해내요. 저녁에 또 한 번 뛰어야 비로소 만족하는 지치지 않는 운동 파트너입니다.",
    checklist: ["하루 1~2시간 운동과 두뇌 놀이를 해 줄 수 있나요?", "어질리티·프리스비 같은 활동을 함께할 수 있나요?", "운동 부족 시 생길 문제 행동을 감당할 수 있나요?"],
    caution: "운동과 두뇌 활동이 부족하면 문제 행동으로 이어지기 쉬워요. 하루 산책 30분으로는 부족합니다.",
    tip: "어질리티, 프리스비, 노즈워크처럼 몸과 머리를 함께 쓰는 활동을 매일 해 주세요."
  },
  chihuahua: {
    name: "치와와", emoji: "🌶️", size: "초소형", weight: "1.5~3kg", coat: "단모 · 장모",
    tagline: "세상에서 가장 작은 용감한 수호자",
    keywords: ["초소형", "용감함", "한 사람 바라기"],
    desc: "세계에서 가장 작은 견종 중 하나지만 용기와 자존심은 누구보다 큰 강아지입니다. 한 사람에게 깊이 애착하는 편이고 낯선 사람에게는 경계심을 보여요. 운동량과 관리 비용이 적어 1인 가구에도 인기가 많습니다.",
    traits: { energy: 2, size: 1, alone: 3, shed: 2, groom: 1, train: 4, bark: 5, cost: 1, affection: 4, social: 1 },
    look: ["fox"], charm: ["unique"], play: ["lap"],
    day: "짧은 산책이면 충분하고, 집에선 담요 속에 쏙 들어가 보호자 곁을 지켜요. 낯선 소리에는 작은 몸으로 용감하게 짖으며 집을 지키는 꼬마 경비원입니다.",
    checklist: ["짖음 교육을 꾸준히 할 수 있나요?", "추위를 타는 체질이라 보온에 신경 쓸 수 있나요?", "작은 체구라 밟히거나 떨어지지 않게 주의할 수 있나요?"],
    caution: "작은 체구에 비해 경계심과 짖음이 강한 편이에요. 추위에 약하고 뼈가 가늘어 낙상에 주의해야 합니다.",
    tip: "다양한 사람을 천천히 만나게 해 사회성을 키워 주고, 겨울엔 옷이나 담요로 보온해 주세요."
  },
  yorkie: {
    name: "요크셔 테리어", emoji: "🎗️", size: "초소형", weight: "2~3kg", coat: "단일모 · 긴 직모",
    tagline: "작지만 당찬 실크결 꼬마 신사",
    keywords: ["당찬 성격", "털빠짐 적음", "활발함"],
    desc: "비단 같은 긴 털과 당찬 성격을 가진 테리어 출신 소형견입니다. 작지만 겁이 없고 호기심이 많아 늘 활발해요. 털이 잘 빠지지 않는 대신 꾸준한 빗질과 미용이 필요합니다.",
    traits: { energy: 3, size: 1, alone: 2, shed: 1, groom: 4, train: 3, bark: 4, cost: 3, affection: 4, social: 3 },
    look: ["teddy"], charm: ["unique"], play: ["lap"],
    day: "집 안을 종종거리며 순찰하고, 산책길에선 큰 개 앞에서도 당당하게 걸어요. 놀이가 끝나면 보호자 무릎 위에서 실크 같은 털을 빗겨 달라 기다립니다.",
    checklist: ["긴 털 빗질과 정기 미용을 챙길 수 있나요?", "짖음 교육을 할 수 있나요?", "치아 관리(양치)를 꾸준히 할 수 있나요?"],
    caution: "작은 체구라 슬개골과 치아 관리가 중요해요. 테리어답게 경계 짖음이 있는 편입니다.",
    tip: "어릴 때부터 양치 습관을 들이고, 털이 엉키지 않게 매일 짧게 빗질해 주세요."
  },
  schnauzer: {
    name: "미니어처 슈나우저", emoji: "🧔", size: "소형", weight: "5~8kg", coat: "이중모 · 강모",
    tagline: "수염 난 똑똑한 꼬마 경비대장",
    keywords: ["영리함", "털빠짐 적음", "경계 짖음"],
    desc: "멋진 눈썹과 수염이 트레이드마크인 영리한 견종입니다. 털이 잘 빠지지 않아 실내 생활에 인기가 많고, 활발하고 사람을 잘 따라요. 경계심이 있어 집을 지키는 짖음이 있는 편입니다.",
    traits: { energy: 3, size: 2, alone: 3, shed: 1, groom: 4, train: 3, bark: 5, cost: 3, affection: 4, social: 3 },
    look: ["quirky"], charm: ["smart"], play: ["sniff"],
    day: "산책길에서 냄새를 꼼꼼히 확인하며 동네를 순찰하고, 집에선 창밖을 지키다 수상한 소리에 먼저 알려 줘요. 가족에겐 애교 많은 똑똑한 친구입니다.",
    checklist: ["정기 미용(수염·눈썹 정리)을 챙길 수 있나요?", "경계 짖음을 줄이는 교육을 할 수 있나요?", "기름진 음식을 피하는 식단 관리를 할 수 있나요?"],
    caution: "경계 짖음이 있는 편이고, 기름진 음식에 민감할 수 있어 식단 관리가 필요해요.",
    tip: "초인종·발소리에 차분히 반응하도록 보상 훈련을 하고, 간식은 저지방으로 골라 주세요."
  },
  beagle: {
    name: "비글", emoji: "🎺", size: "중소형", weight: "9~11kg", coat: "단모",
    tagline: "냄새 따라 세상을 탐험하는 명랑한 모험가",
    keywords: ["명랑함", "후각 탐험가", "에너지"],
    desc: "뛰어난 후각을 가진 사냥견 출신으로 명랑하고 사교적인 견종입니다. 사람과 다른 개 모두와 잘 어울리지만, 에너지가 넘치고 호기심이 강해 '말썽꾸러기'로도 유명해요. 충분한 운동과 탐색 활동이 필요합니다.",
    traits: { energy: 4, size: 2, alone: 2, shed: 3, groom: 1, train: 4, bark: 5, cost: 2, affection: 4, social: 5 },
    look: ["gentle"], charm: ["unique"], play: ["sniff"],
    day: "산책길에선 코를 땅에 대고 온갖 냄새를 쫓아다니고, 집에선 간식 냄새가 나는 곳이면 어디든 찾아내요. 사람도 개도 모두 친구로 만드는 명랑한 모험가입니다.",
    checklist: ["매일 충분히 걷고 냄새 맡을 시간을 줄 수 있나요?", "하울링·짖음을 감당하거나 교육할 수 있나요?", "음식과 쓰레기를 손 닿지 않게 관리할 수 있나요?"],
    caution: "에너지와 호기심이 넘쳐 운동이 부족하면 말썽이 늘어요. 하울링과 짖음이 있는 편입니다.",
    tip: "노즈워크와 긴 산책으로 후각 욕구를 채워 주고, 쓰레기통은 꼭 뚜껑 있는 걸 써 주세요."
  },
  labrador: {
    name: "래브라도 리트리버", emoji: "🦴", size: "대형", weight: "25~36kg", coat: "이중모 · 단모",
    tagline: "언제나 신나는 긍정왕 파트너",
    keywords: ["긍정왕", "가족견", "운동량 많음"],
    desc: "밝고 온순하며 사람을 좋아해 안내견·구조견으로도 활약하는 대형견입니다. 영리하고 훈련 습득이 빨라 가족견으로 훌륭해요. 다만 에너지가 넘치고 식욕이 왕성해 충분한 운동과 체중 관리가 필요합니다.",
    traits: { energy: 5, size: 5, alone: 2, shed: 4, groom: 1, train: 1, bark: 2, cost: 5, affection: 5, social: 5 },
    look: ["gentle"], charm: ["smart"], play: ["ball"],
    day: "눈 뜨자마자 장난감을 물고 와 놀자고 하고, 물만 보면 뛰어들 만큼 수영과 공놀이를 좋아해요. 하루 종일 꼬리를 흔드는 긍정 에너지 덩어리입니다.",
    checklist: ["매일 1시간 이상 활발하게 운동시킬 수 있나요?", "대형견 사료·병원비를 감당할 수 있나요?", "식탐을 관리하며 체중을 조절할 수 있나요?"],
    caution: "운동량이 매우 많고 식욕이 왕성해 비만이 되기 쉬워요. 어릴 땐 물고 씹는 행동이 많습니다.",
    tip: "공놀이·수영처럼 에너지를 쏟을 활동을 매일 해 주고, 씹어도 되는 장난감을 넉넉히 주세요."
  },
  samoyed: {
    name: "사모예드", emoji: "❄️", size: "대형", weight: "16~30kg", coat: "이중모 · 풍성",
    tagline: "늘 웃고 있는 하얀 눈꽃 천사",
    keywords: ["사모예드 스마일", "사교적", "털 관리"],
    desc: "입꼬리가 올라간 '사모예드 스마일'로 유명한 하얀 대형견입니다. 사람을 정말 좋아하고 온순하지만, 썰매견 출신이라 운동량이 많아요. 풍성한 이중모라 털 빠짐과 빗질 관리가 상당한 편입니다.",
    traits: { energy: 4, size: 4, alone: 2, shed: 5, groom: 4, train: 3, bark: 4, cost: 5, affection: 4, social: 5 },
    look: ["fluffy"], charm: ["cute"], play: ["sniff"],
    day: "아침 산책에서 누구보다 신나게 걷고, 만나는 사람마다 미소로 인사해요. 집에 오면 빗질을 받으며 눈처럼 하얀 털을 뽐내는 미소 천사입니다.",
    checklist: ["매일 빗질과 털갈이 관리를 감당할 수 있나요?", "더위 관리를 확실히 해 줄 수 있나요?", "대형견 사료·미용비를 감당할 수 있나요?"],
    caution: "털 빠짐과 빗질 관리가 매우 많고, 추운 지방 출신이라 더위에 약해요.",
    tip: "여름엔 실내 온도를 시원하게 유지하고, 털갈이 시기엔 매일 빗질해 주세요."
  },
  husky: {
    name: "시베리안 허스키", emoji: "🐾", size: "중대형", weight: "16~27kg", coat: "이중모",
    tagline: "끝없이 달리고 싶은 자유로운 영혼",
    keywords: ["자유로운 영혼", "체력왕", "하울링"],
    desc: "늑대를 닮은 외모와 푸른 눈이 매력인 썰매견 출신입니다. 사람에게 친근하지만 독립심과 고집이 강하고, 체력이 엄청나 매일 많은 운동이 필요해요. 하울링으로 '대화'하는 것으로도 유명합니다.",
    traits: { energy: 5, size: 4, alone: 2, shed: 5, groom: 3, train: 5, bark: 4, cost: 4, affection: 3, social: 5 },
    look: ["fox"], charm: ["unique"], play: ["sniff", "ball"],
    day: "아침 러닝을 함께 뛰고도 아직 쌩쌩하고, 집에선 하울링으로 수다를 떨어요. 열린 문 틈만 보이면 모험을 떠나려는 자유로운 영혼입니다.",
    checklist: ["하루 1~2시간 달리기 수준의 운동을 해 줄 수 있나요?", "탈출 방지(울타리·문 관리)를 할 수 있나요?", "털갈이와 더위 관리를 감당할 수 있나요?"],
    caution: "운동량이 매우 많고 고집이 세며 탈출을 잘하는 편이에요. 더위에 약하고 털이 많이 빠집니다.",
    tip: "러닝·자전거 산책처럼 체력을 쓸 활동을 매일 하고, 문과 울타리 단속을 철저히 해 주세요."
  },
  cavalier: {
    name: "카발리에 킹 찰스 스파니엘", emoji: "👑", size: "소형", weight: "5~8kg", coat: "단일모 · 장모",
    tagline: "누구에게나 다정한 귀족 무릎 강아지",
    keywords: ["다정함", "온순함", "무릎 강아지"],
    desc: "부드러운 귀털과 다정한 눈빛을 가진 귀족 출신 소형견입니다. 온순하고 사람을 정말 좋아해 아이나 노인이 있는 가정에도 잘 어울려요. 보호자 곁에 있는 걸 가장 좋아해 혼자 있는 시간이 길면 힘들어합니다.",
    traits: { energy: 2, size: 2, alone: 2, shed: 3, groom: 3, train: 2, bark: 2, cost: 3, affection: 5, social: 5 },
    look: ["gentle"], charm: ["cute"], play: ["lap"],
    day: "산책은 느긋하게, 집에선 가족 누구의 무릎이든 찾아가 올라앉아요. 손님에게도 금세 다가가 기대는, 누구에게나 다정한 귀족 강아지입니다.",
    checklist: ["혼자 있는 시간을 짧게 유지할 수 있나요?", "정기 건강검진(심장 등)을 챙길 수 있나요?", "귀 청소와 털 빗질을 할 수 있나요?"],
    caution: "심장 질환에 주의가 필요해 정기 검진이 중요해요. 귀가 덮여 있어 귀 관리도 필요합니다.",
    tip: "정기적으로 건강검진을 받고, 늘어진 귀 안쪽을 자주 확인해 깨끗하게 관리해 주세요."
  }
};

// ============================================
// 결과 문구 (기준별 이유·주의)
// ============================================

const DOGBREED_REASONS = {
  energy:    "나의 활동량과 필요한 운동량이 잘 맞아요",
  size:      "사는 공간과 원하는 크기에 잘 어울려요",
  alone:     "나의 생활 패턴에서도 혼자 있는 시간을 잘 견딜 수 있어요",
  shed:      "털 날림이 내가 감당할 수 있는 수준이에요",
  groom:     "미용·빗질 부담이 내 여유에 맞아요",
  train:     "나의 경험과 인내심으로 충분히 가르칠 수 있어요",
  bark:      "소음 걱정이 적은 편이에요",
  cost:      "관리 비용이 내 예산 안에 들어와요",
  affection: "내가 원하는 애정 표현 스타일과 잘 맞아요",
  social:    "우리 집 분위기와 잘 어울려요",
  look:      "눈을 못 떼는 외모 취향에 딱 맞아요",
  charm:     "내가 가장 약한 매력 포인트를 가졌어요",
  play:      "내가 하고 싶은 놀이를 함께 즐길 수 있어요"
};

// 사용자보다 견종 값이 클 때(over) / 작을 때(under)
const DOGBREED_CAUTIONS = {
  energy:    { over: "생각보다 운동량이 많이 필요해요. 산책 시간을 늘릴 각오가 필요해요", under: "활동적인 나에게는 조금 느긋한 친구일 수 있어요" },
  size:      { over: "사는 공간이나 원하는 크기에 비해 덩치가 큰 편이에요", under: "원하는 것보다 작은 체구예요" },
  alone:     { under: "혼자 있는 시간이 길면 외로움을 많이 탈 수 있어요" },
  shed:      { over: "털 빠짐이 많은 편이라 청소와 빗질이 필요해요" },
  groom:     { over: "정기 미용과 빗질 관리에 시간과 비용이 들어요" },
  train:     { over: "고집이 있어서 훈련에 인내심이 필요해요" },
  bark:      { over: "짖음이 있는 편이라 소음 관리가 필요해요" },
  cost:      { over: "예상보다 관리 비용이 많이 들 수 있어요" },
  affection: { over: "생각보다 훨씬 껌딱지일 수 있어요", under: "애정 표현이 담백한 편이에요" },
  social:    { over: "사람을 워낙 좋아해서 조용한 집에선 심심해할 수 있어요", under: "낯선 사람이나 북적이는 환경에 적응할 시간이 필요해요" }
};

// ============================================
// 채점 함수
// ============================================

function calcDogBreed(answers) {
  // answers = [{ dim: "energy", val: 3 }, { dim: "look", val: "fox" }, ...]
  const sums = {}, counts = {}, user = {};
  answers.forEach(a => {
    if (!a || !DOGBREED_DIMS[a.dim]) return;
    if (DOGBREED_DIMS[a.dim].kind === "cat") { user[a.dim] = a.val; return; }
    sums[a.dim] = (sums[a.dim] || 0) + a.val;
    counts[a.dim] = (counts[a.dim] || 0) + 1;
  });
  Object.entries(DOGBREED_DIMS).forEach(([d, def]) => {
    if (def.kind === "cat") return;
    user[d] = counts[d] ? sums[d] / counts[d] : 3;
  });

  const maxPenalty = Object.values(DOGBREED_DIMS).reduce((s, d) => s + d.w * (d.kind === "cat" ? 3 : 4 * (d.overMul || 1)), 0);

  const ranked = Object.entries(DOGBREED_BREEDS).map(([id, breed]) => {
    const detail = {};
    let penalty = 0;
    Object.entries(DOGBREED_DIMS).forEach(([d, def]) => {
      const u = user[d];
      if (def.kind === "cat") {
        const gap = u === undefined || breed[d].includes(u) ? 0 : 3;
        penalty += gap * def.w;
        detail[d] = { gap, weighted: gap * def.w, dir: "same" };
        return;
      }
      const b = breed.traits[d];
      let gap;
      if (def.kind === "match") gap = Math.abs(u - b) * (b > u ? (def.overMul || 1) : 1);
      else if (def.kind === "tol") gap = Math.max(0, b - u);
      else gap = Math.max(0, u - b); // need
      const weighted = gap * def.w;
      penalty += weighted;
      detail[d] = { gap, weighted, dir: b > u ? "over" : (b < u ? "under" : "same") };
    });
    const percent = Math.round(100 - (penalty / maxPenalty) * 100);
    return { id, breed, penalty, percent, detail };
  }).sort((a, b) => a.penalty - b.penalty);

  const best = ranked[0];
  const worst = ranked[ranked.length - 1];
  return {
    winner: best.id,
    best,
    top5: ranked.slice(0, 5),
    worst,
    worstReason: dogBreedCautions(worst)[0] || "",
    ranked,
    user,
    reasons: dogBreedReasons(best),
    cautions: dogBreedCautions(best)
  };
}

// 차이가 거의 없는 기준 중 가중치가 큰 순으로 최대 3개
function dogBreedReasons(entry) {
  return Object.entries(entry.detail)
    .filter(([, v]) => v.gap <= 0.5)
    .sort((a, b) => DOGBREED_DIMS[b[0]].w - DOGBREED_DIMS[a[0]].w)
    .slice(0, 3)
    .map(([d]) => DOGBREED_REASONS[d]);
}

// 가중 차이가 큰 기준 최대 2개 (가중 차이 1 이상, 취향 범주 제외)
function dogBreedCautions(entry) {
  return Object.entries(entry.detail)
    .filter(([d, v]) => v.weighted >= 1 && DOGBREED_DIMS[d].kind !== "cat")
    .sort((a, b) => b[1].weighted - a[1].weighted)
    .slice(0, 2)
    .map(([d, v]) => {
      const c = DOGBREED_CAUTIONS[d];
      return c[v.dir] || c.over || c.under;
    })
    .filter(Boolean);
}

// 궁합 상세 화면용: 기준별 판정 (잘 맞음 / 조금 차이 / 차이 큼)
function dogBreedFit(gap) {
  if (gap <= 0.7) return { label: "잘 맞음", mark: "✓", tone: "good" };
  if (gap <= 1.7) return { label: "조금 차이", mark: "△", tone: "mid" };
  return { label: "차이 큼", mark: "✕", tone: "bad" };
}

if (typeof module !== 'undefined') {
  module.exports = { DOGBREED_DIMS, DOGBREED_USER_LABEL, DOGBREED_QUESTIONS, DOGBREED_BREEDS, DOGBREED_REASONS, DOGBREED_CAUTIONS, calcDogBreed, dogBreedFit };
}
