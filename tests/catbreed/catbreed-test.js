// ============================================
// 나와 찰떡인 고양이는? 묘종 매칭 테스트
// ============================================
// 구조: 26문항 (견종 매칭 테스트와 같은 엔진)
//   생활 패턴·성향 23문항: 3지선다, 선택지가 한 기준(dim)에 1/3/5 값을 준다
//   취향 3문항: 끌리는 외모·매력·놀이 스타일 (범주 선택)
// 기준(CATBREED_DIMS)마다 사용자 값 = 해당 문항 답의 평균
// 묘종(CATBREED_BREEDS)은 같은 기준의 특성값(1~5)과 취향 범주를 가진다.
// 기준 종류
//   match : 양쪽 거리 |사용자 - 묘종|            (활동량, 크기, 애정 표현, 집 분위기)
//           overMul이 있으면 묘종 쪽이 넘칠 때 차이를 그만큼 키운다
//           (좁은 집에 큰 고양이, 놀아 주지 못하는 집에 에너지 넘치는 고양이가 반대 경우보다 심각하므로)
//   tol   : 묘종 값이 사용자 허용치를 넘는 만큼  (털 빠짐, 미용, 울음, 비용, 말썽)
//   need  : 사용자 요구치가 묘종 값을 넘는 만큼  (혼자 있는 시간)
//   cat   : 고른 범주가 묘종 범주에 없으면 고정 차이 3  (외모, 매력, 놀이)
// 벌점 = Σ 가중치 × 차이,  궁합% = 100 - 벌점 / 최대벌점 × 100
// 묘종 특성값은 일반적인 경향을 단순화한 것이며 개체 차이가 크다.
// ============================================

const CATBREED_DIMS = {
  energy:    { name: "활동량",        kind: "match", w: 1.5, overMul: 1.6, low: "느긋",   high: "에너지 넘침" },
  size:      { name: "공간·크기",     kind: "match", w: 1.0, overMul: 1.6, low: "소형",   high: "대형" },
  alone:     { name: "혼자 있는 시간", kind: "need",  w: 1.1, low: "짧음",   high: "김" },
  shed:      { name: "털 빠짐",       kind: "tol",   w: 1.2, low: "적음",   high: "많음" },
  groom:     { name: "빗질·관리",     kind: "tol",   w: 0.9, low: "가벼움", high: "손 많이 감" },
  vocal:     { name: "울음·수다",     kind: "tol",   w: 1.0, low: "조용",   high: "수다쟁이" },
  mischief:  { name: "말썽·장난기",   kind: "tol",   w: 1.0, low: "얌전",   high: "말썽꾸러기" },
  cost:      { name: "관리 비용",     kind: "tol",   w: 0.6, low: "적음",   high: "많음" },
  affection: { name: "애정 표현",     kind: "match", w: 1.0, low: "쿨함",   high: "껌딱지" },
  social:    { name: "집 분위기",     kind: "match", w: 0.8, low: "조용",   high: "북적" },
  look:      { name: "끌리는 외모",   kind: "cat",   w: 1.2 },
  charm:     { name: "끌리는 매력",   kind: "cat",   w: 1.0 },
  play:      { name: "놀이 스타일",   kind: "cat",   w: 1.0 }
};

// 궁합 상세 화면에서 사용자 값을 어떻게 읽어 줄지 (tol/need 기준은 "허용치/요구치" 의미)
const CATBREED_USER_LABEL = {
  energy: "놀아 줄 여유", size: "공간·선호 크기", alone: "혼자 두는 시간", shed: "털 허용치",
  groom: "관리 여유", vocal: "소음 허용치", mischief: "말썽 허용치", cost: "예산 여유",
  affection: "원하는 애정도", social: "집 북적임"
};

const CATBREED_QUESTIONS = [
  {
    id: 1, dim: "energy", emoji: "🗓️",
    question: "쉬는 날, 나는 주로 어떻게 보내?",
    choices: [
      { text: "🛋️ 집에서 뒹굴며 푹 쉰다", val: 1 },
      { text: "☕ 집과 밖을 적당히 오간다", val: 3 },
      { text: "🏃 집에 가만히 있는 게 더 어색하다", val: 5 }
    ]
  },
  {
    id: 2, dim: "size", emoji: "🏠",
    question: "고양이와 함께 살 집은?",
    choices: [
      { text: "🏢 원룸이나 오피스텔", val: 1 },
      { text: "🏘️ 아파트나 빌라", val: 3 },
      { text: "🏡 넓은 집이나 마당 있는 주택", val: 5 }
    ]
  },
  {
    id: 3, dim: "alone", emoji: "⏰",
    question: "평일 낮에 고양이가 혼자 있는 시간은?",
    choices: [
      { text: "🏡 거의 없다 (재택이거나 가족이 늘 있음)", val: 1 },
      { text: "🕓 6~8시간 정도", val: 3 },
      { text: "🌙 10시간 이상", val: 5 }
    ]
  },
  {
    id: 4, dim: "affection", emoji: "💞",
    question: "고양이와 어떤 관계를 원해?",
    choices: [
      { text: "🧊 각자의 공간을 존중하는 쿨한 룸메이트", val: 1 },
      { text: "🤝 가끔 와서 부비는 다정한 사이", val: 3 },
      { text: "🫶 무릎, 품, 침대까지 붙어 있는 껌딱지", val: 5 }
    ]
  },
  {
    id: 5, dim: "shed", emoji: "🧹",
    question: "옷과 이불에 털이 붙는다면?",
    choices: [
      { text: "😱 상상만 해도 힘들다", val: 1 },
      { text: "🧽 청소를 자주 하면 괜찮다", val: 3 },
      { text: "😎 털쯤이야 아무렇지 않다", val: 5 }
    ]
  },
  {
    id: 6, dim: "energy", emoji: "🎣",
    question: "하루에 고양이와 놀아 줄 수 있는 시간은?",
    choices: [
      { text: "⏱️ 10분 정도가 현실적이다", val: 1 },
      { text: "🪶 30분 정도는 낼 수 있다", val: 3 },
      { text: "🎾 1시간 이상, 하루 두세 번도 괜찮다", val: 5 }
    ]
  },
  {
    id: 7, dim: "vocal", emoji: "🔊",
    question: "고양이가 수다스럽게 운다면?",
    choices: [
      { text: "😰 이웃에게 들릴까 봐 신경 쓰인다", val: 1 },
      { text: "🤔 가끔은 괜찮다", val: 3 },
      { text: "🙆 대화하는 것 같아 오히려 좋다", val: 5 }
    ]
  },
  {
    id: 8, dim: "look", emoji: "👀", categorical: true,
    question: "길에서 마주치면 눈을 못 떼는 고양이는?",
    choices: [
      { text: "☁️ 풍성한 털이 구름 같은 아이", val: "fluffy" },
      { text: "🖤 매끈하고 우아한 실루엣", val: "sleek" },
      { text: "🌕 동글동글 보름달 같은 얼굴", val: "round" },
      { text: "🐆 표범처럼 야성미 있는 무늬와 체격", val: "wild" },
      { text: "🥸 곱슬털, 접힌 귀, 짧은 다리처럼 독특한 외모", val: "unique" }
    ]
  },
  {
    id: 9, dim: "size", emoji: "📏",
    question: "마음이 가는 고양이 크기는?",
    choices: [
      { text: "🤲 작고 가벼운 아이", val: 1 },
      { text: "🐈 보통 크기의 아이", val: 3 },
      { text: "🦁 5kg 넘는 듬직한 아이", val: 5 }
    ]
  },
  {
    id: 10, dim: "cost", emoji: "💰",
    question: "고양이에게 매달 쓸 수 있는 예산은? (사료·모래·간식·용품)",
    choices: [
      { text: "🪙 최소한으로 아끼고 싶다", val: 1 },
      { text: "💳 적당히 쓸 수 있다", val: 3 },
      { text: "💎 필요한 만큼 아낌없이 쓸 수 있다", val: 5 }
    ]
  },
  {
    id: 11, dim: "mischief", emoji: "🥛",
    question: "컵을 떨어뜨리고 커튼에 매달리는 말썽은?",
    choices: [
      { text: "🙅 곤란하다, 얌전한 아이가 좋다", val: 1 },
      { text: "🙂 어느 정도는 귀엽게 넘길 수 있다", val: 3 },
      { text: "😆 그것도 매력이다, 같이 장난치고 싶다", val: 5 }
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
    question: "나나 가족에게 고양이 털 알레르기나 비염이 있나요?",
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
    id: 15, dim: "groom", emoji: "🪮",
    question: "털 빗질과 목욕 같은 관리는?",
    choices: [
      { text: "😓 시간도 손도 부담스럽다", val: 1 },
      { text: "🗓️ 일주일에 몇 번 빗질은 괜찮다", val: 3 },
      { text: "💇 매일 빗질도 교감이라 즐겁다", val: 5 }
    ]
  },
  {
    id: 16, dim: "alone", emoji: "🧳",
    question: "여행이나 출장으로 집을 비우는 일은?",
    choices: [
      { text: "🙅 거의 없다", val: 1 },
      { text: "🙂 한 달에 한두 번 정도", val: 3 },
      { text: "✈️ 잦은 편이다", val: 5 }
    ]
  },
  {
    id: 17, dim: "play", emoji: "🧶", categorical: true,
    question: "고양이와 가장 해 보고 싶은 놀이는?",
    choices: [
      { text: "🛋️ 무릎 위에서 골골송 들으며 쓰다듬기", val: "lap" },
      { text: "🎣 낚싯대로 사냥 놀이 한 판", val: "hunt" },
      { text: "🧗 캣타워를 오르내리는 걸 구경하기", val: "climb" }
    ]
  },
  {
    id: 18, dim: "mischief", emoji: "🏺",
    question: "깨지기 쉬운 물건이나 화분이 많은 집인가요?",
    choices: [
      { text: "🫖 소중한 물건이 많아 조심스럽다", val: 1 },
      { text: "🙂 정리하면 어느 정도는 괜찮다", val: 3 },
      { text: "🧺 물건이 거의 없는 심플한 집이다", val: 5 }
    ]
  },
  {
    id: 19, dim: "affection", emoji: "🚪",
    question: "퇴근하고 문을 열었을 때 바라는 모습은?",
    choices: [
      { text: "😌 안 나와도 괜찮다, 자기 자리에서 쉬는 쿨함", val: 1 },
      { text: "😊 슬쩍 나와서 다리에 한 번 비벼 주기", val: 3 },
      { text: "🤩 현관에서 냥냥거리며 졸졸 따라다니기", val: 5 }
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
    id: 21, dim: "vocal", emoji: "😴",
    question: "나는 소리에 얼마나 예민한 편?",
    choices: [
      { text: "👂 작은 소리에도 잠이 깬다", val: 1 },
      { text: "🙂 보통이다", val: 3 },
      { text: "🔇 웬만한 소리엔 무던하다", val: 5 }
    ]
  },
  {
    id: 22, dim: "charm", emoji: "✨", categorical: true,
    question: "고양이의 어떤 매력에 가장 약해?",
    choices: [
      { text: "🥰 보기만 해도 녹는 앙증맞은 귀여움", val: "cute" },
      { text: "👑 우아하고 도도한 분위기", val: "elegant" },
      { text: "🧠 사람 말을 알아듣는 듯한 영리함", val: "clever" },
      { text: "🫠 세상 느긋하고 순한 성격", val: "chill" }
    ]
  },
  {
    id: 23, dim: "social", emoji: "🐾",
    question: "다른 반려동물을 더 키울 계획이 있나요?",
    choices: [
      { text: "🙅 이 아이 한 마리면 충분하다", val: 1 },
      { text: "🤔 나중에 생각해 볼 수도 있다", val: 3 },
      { text: "🐕 다른 동물이나 고양이와 함께 지내게 하고 싶다", val: 5 }
    ]
  },
  {
    id: 24, dim: "groom", emoji: "✂️",
    question: "발톱 정리, 양치, 귀 청소 같은 기본 케어는?",
    choices: [
      { text: "😓 솔직히 자신 없다", val: 1 },
      { text: "🙂 필요하면 배워서 할 수 있다", val: 3 },
      { text: "🎓 꾸준히 챙길 수 있다", val: 5 }
    ]
  },
  {
    id: 25, dim: "cost", emoji: "🏥",
    question: "병원비나 정기 검진처럼 예상 못 한 지출이 생긴다면?",
    choices: [
      { text: "😥 큰 지출은 부담이 크다", val: 1 },
      { text: "🙂 어느 정도는 대비해 둘 수 있다", val: 3 },
      { text: "🛡️ 펫보험이나 비상금으로 충분히 대비할 수 있다", val: 5 }
    ]
  },
  {
    id: 26, dim: "alone", emoji: "🌃",
    question: "야근이나 늦은 귀가가 잦은 편인가요?",
    choices: [
      { text: "🙅 칼퇴가 기본이다", val: 1 },
      { text: "🙂 가끔 있다", val: 3 },
      { text: "🌙 자주 늦는다", val: 5 }
    ]
  }
];

// ============================================
// 20묘종 특성값 (1~5)
// energy: 필요한 놀이·활동량 / size: 체구 / alone: 혼자 있기 적응력(높을수록 잘 견딤)
// shed: 털 빠짐 / groom: 빗질·관리 필요 / vocal: 울음·수다 / mischief: 말썽·장난기
// cost: 관리 비용(사료·검진·병원비 경향) / affection: 애정 표현·밀착 / social: 낯선 사람·북적임 친화
// look·charm·play: 취향 범주
// ============================================

const CATBREED_BREEDS = {
  koshort: {
    name: "코리안 숏헤어", emoji: "🍀", size: "중소형", weight: "3.5~5.5kg", coat: "단모 · 다양한 무늬",
    tagline: "어떤 집에도 스며드는 우리 동네 대표 고양이",
    keywords: ["적응력 최고", "건강한 편", "무늬 다양"],
    desc: "우리나라에서 가장 흔히 만나는 고양이로, 치즈·고등어·삼색 등 무늬와 성격이 정말 다양합니다. 환경 적응력이 좋고 비교적 튼튼한 편이라 처음 키우는 사람에게도 부담이 적어요. 성격은 개체 차이가 커서, 같은 코숏이라도 껌딱지부터 쿨한 독립파까지 제각각입니다.",
    traits: { energy: 3, size: 2, alone: 4, shed: 3, groom: 2, vocal: 2, mischief: 3, cost: 2, affection: 3, social: 3 },
    look: ["sleek"], charm: ["clever"], play: ["hunt"],
    day: "아침엔 밥 달라고 가볍게 깨우고, 낮엔 창가에서 햇볕을 쬐다 낮잠을 자요. 저녁엔 낚싯대 사냥 한 판을 즐기고, 밤엔 집사 곁 적당한 거리에서 자리를 잡습니다.",
    checklist: ["입양 전 성격(껌딱지형/독립형)을 직접 만나 보고 고를 수 있나요?", "중성화와 정기 접종을 챙길 수 있나요?", "높은 곳에 올라갈 캣타워나 선반을 마련할 수 있나요?"],
    caution: "무늬마다 성격이 다르다는 말이 많지만 개체 차이가 훨씬 커요. 입양 전 아이의 성격을 직접 확인하는 게 중요합니다.",
    tip: "처음엔 한 방에서 천천히 적응시키고, 은신처와 높은 곳을 함께 마련해 주세요."
  },
  russianblue: {
    name: "러시안 블루", emoji: "🩶", size: "중소형", weight: "3~5.5kg", coat: "단모 · 은회색",
    tagline: "푸른빛 은색 털의 조용한 신사",
    keywords: ["은회색 털", "조용함", "낯가림"],
    desc: "은은하게 빛나는 푸른 회색 털과 초록 눈이 매력적인 고양이입니다. 조용하고 온순하며 보호자에게는 깊이 애착하지만 낯선 사람에게는 낯을 가려요. 울음이 적고 얌전해 아파트 생활에 잘 맞는 편입니다.",
    traits: { energy: 2, size: 2, alone: 4, shed: 2, groom: 1, vocal: 1, mischief: 2, cost: 3, affection: 3, social: 2 },
    look: ["sleek"], charm: ["elegant"], play: ["lap"],
    day: "조용히 집 안을 순찰하고 창가에서 바깥을 관찰하며 하루를 보내요. 낯선 소리엔 은신처로 숨지만, 저녁엔 집사 옆에서 얌전히 골골송을 들려줍니다.",
    checklist: ["낯선 손님이 올 때 숨을 은신처를 마련해 줄 수 있나요?", "일과를 일정하게 유지할 수 있나요?", "큰 소리나 갑작스러운 변화를 줄여 줄 수 있나요?"],
    caution: "낯가림이 있고 변화에 예민해서 환경이 자주 바뀌면 스트레스를 받아요. 식욕이 좋아 비만에도 주의해야 합니다.",
    tip: "일정한 식사 시간과 놀이 시간을 지켜 주고, 손님이 올 땐 숨을 공간을 열어 두세요."
  },
  britishshort: {
    name: "브리티시 숏헤어", emoji: "🧸", size: "중형", weight: "4~8kg", coat: "단모 · 조밀한 털",
    tagline: "푹신한 볼살의 느긋한 곰돌이",
    keywords: ["곰돌이 얼굴", "느긋함", "독립적"],
    desc: "동그란 얼굴과 통통한 볼, 곰 인형 같은 체형으로 사랑받는 고양이입니다. 느긋하고 점잖아 혼자 있는 시간도 잘 견디고, 안기는 것보다 곁에 있는 걸 더 좋아해요. 털이 짧고 촘촘해 털갈이 때 꽤 빠지고, 주기적인 빗질이 필요합니다.",
    traits: { energy: 2, size: 3, alone: 4, shed: 3, groom: 3, vocal: 1, mischief: 2, cost: 3, affection: 3, social: 3 },
    look: ["round"], charm: ["chill"], play: ["lap"],
    day: "느지막이 일어나 느긋하게 식사하고, 낮엔 소파 한쪽에서 곰 인형처럼 자요. 안기는 건 싫어해도 저녁엔 집사 옆에 자리를 잡고 같이 TV를 봅니다.",
    checklist: ["체중 관리를 위해 급여량을 조절할 수 있나요?", "털갈이 시기에 빗질을 자주 할 수 있나요?", "안기는 걸 싫어하는 성향을 존중해 줄 수 있나요?"],
    caution: "움직임이 적어 비만이 되기 쉽고, 비대성 심근병증(HCM) 같은 심장 질환에 주의해야 해요. 정기 검진이 중요합니다.",
    tip: "사냥 놀이로 하루 20분 이상 몸을 쓰게 하고, 급여량을 정확히 재서 주세요."
  },
  scottishfold: {
    name: "스코티시 폴드", emoji: "🦉", size: "중소형", weight: "3~6kg", coat: "단모 · 장모",
    tagline: "접힌 귀가 사랑스러운 순둥이",
    keywords: ["접힌 귀", "순둥이", "관절 주의"],
    desc: "앞으로 접힌 귀와 동그란 얼굴이 올빼미를 닮은 온순한 고양이입니다. 사람을 잘 따르고 조용해 가족 고양이로 인기가 많아요. 다만 귀가 접히는 유전자가 뼈·관절 질환과 관련되어 있어 건강 관리에 각별한 주의가 필요합니다.",
    traits: { energy: 2, size: 2, alone: 3, shed: 3, groom: 2, vocal: 1, mischief: 2, cost: 4, affection: 4, social: 3 },
    look: ["round"], charm: ["cute"], play: ["lap"],
    day: "동그란 눈으로 집사를 따라다니고, 앉아서 앞발을 모으는 귀여운 자세로 쉬어요. 저녁엔 무릎 위로 올라와 조용히 골골거립니다.",
    checklist: ["접힌 귀 유전자와 관련된 관절·뼈 질환 위험을 이해하고 있나요?", "정기 검진과 관절 관리 비용을 감당할 수 있나요?", "높은 곳 점프를 줄이는 환경을 만들 수 있나요?"],
    caution: "접힌 귀 유전자는 골연골이형성증 등 관절 질환과 관련이 있어, 일부 나라에서는 번식이 제한됩니다. 입양 전 건강 상태와 부모묘 이력을 꼭 확인하세요.",
    tip: "관절에 무리가 가지 않게 낮은 계단과 푹신한 바닥을 마련하고, 걸음이 이상하면 바로 병원을 찾으세요."
  },
  munchkin: {
    name: "먼치킨", emoji: "🐾", size: "소형", weight: "2~4kg", coat: "단모 · 장모",
    tagline: "짧은 다리로 총총 달리는 꼬마 탐험가",
    keywords: ["짧은 다리", "호기심", "관절 주의"],
    desc: "짧은 다리가 트레이드마크인 활발하고 호기심 많은 고양이입니다. 다리가 짧아도 집 안을 잘 뛰어다니고 사람을 좋아해요. 다만 척추와 관절에 부담이 갈 수 있어 건강 관리에 신경 써야 합니다.",
    traits: { energy: 3, size: 1, alone: 3, shed: 3, groom: 2, vocal: 2, mischief: 3, cost: 4, affection: 4, social: 4 },
    look: ["unique"], charm: ["cute"], play: ["hunt"],
    day: "짧은 다리로 총총 뛰어다니며 집 안 구석구석을 탐험하고, 낚싯대를 보면 눈빛이 변해요. 높이 점프는 어려워도 낮은 곳에서 열심히 놀고, 저녁엔 무릎 위에서 쉽니다.",
    checklist: ["낮은 계단, 경사로 등 점프를 도와줄 환경을 만들 수 있나요?", "척추·관절 정기 검진을 챙길 수 있나요?", "체중 관리를 꾸준히 할 수 있나요?"],
    caution: "짧은 다리와 긴 허리 때문에 척추·관절 질환이 생길 수 있어요. 입양 전 부모묘의 건강 이력을 확인하는 것이 좋습니다.",
    tip: "높은 곳엔 단계별 발판을 두고, 비만이 되지 않게 급여량과 놀이 시간을 관리해 주세요."
  },
  persian: {
    name: "페르시안", emoji: "👑", size: "중형", weight: "3.5~7kg", coat: "장모 · 긴 털",
    tagline: "느긋한 우아함의 고양이 귀족",
    keywords: ["긴 털", "조용함", "손이 많이 감"],
    desc: "풍성한 장모와 납작한 얼굴이 특징인 대표적인 장모종입니다. 성격이 매우 느긋하고 조용해 얌전한 반려묘를 원하는 사람에게 어울려요. 대신 매일 빗질과 눈 관리가 필요하고 털 빠짐도 많습니다.",
    traits: { energy: 1, size: 2, alone: 3, shed: 5, groom: 5, vocal: 1, mischief: 1, cost: 4, affection: 3, social: 2 },
    look: ["fluffy", "round"], charm: ["chill", "elegant"], play: ["lap"],
    day: "느긋하게 일어나 창가에서 햇볕을 쬐고, 하루 대부분을 푹신한 자리에서 우아하게 쉬어요. 저녁엔 빗질 시간을 기다리며 집사 곁에 앉아 있습니다.",
    checklist: ["매일 빗질과 눈 주변 관리를 할 수 있나요?", "털 빠짐 청소를 감당할 수 있나요?", "눈물 자국, 호흡기, 신장 정기 검진을 챙길 수 있나요?"],
    caution: "납작한 얼굴 때문에 눈물과 호흡기 문제가 생기기 쉽고, 다낭성 신장 질환(PKD) 위험도 있어 정기 검진이 필요해요.",
    tip: "매일 빗질로 털 엉킴을 막고, 눈 주변을 부드럽게 닦아 주세요."
  },
  exotic: {
    name: "엑조틱 숏헤어", emoji: "🌕", size: "중형", weight: "3.5~6.5kg", coat: "단모 · 촘촘한 털",
    tagline: "페르시안의 순한 성격에 짧은 털을 더한 인형",
    keywords: ["납작한 얼굴", "순함", "관리 쉬운 털"],
    desc: "페르시안의 납작한 얼굴과 순한 성격을 가졌지만 털이 짧아 관리가 쉬운 고양이입니다. 조용하고 애교가 있어 아파트 생활에 잘 맞아요. 다만 페르시안처럼 눈물과 호흡기 건강에 주의해야 합니다.",
    traits: { energy: 1, size: 2, alone: 3, shed: 3, groom: 3, vocal: 1, mischief: 1, cost: 4, affection: 4, social: 3 },
    look: ["round"], charm: ["chill", "cute"], play: ["lap"],
    day: "느긋하게 집사를 따라다니다 무릎 위에서 인형처럼 자리를 잡아요. 놀이는 짧게, 휴식은 길게 즐기는 조용한 반려묘입니다.",
    checklist: ["눈물 자국을 매일 닦아 줄 수 있나요?", "호흡기·치아 정기 검진을 챙길 수 있나요?", "더운 날 시원한 환경을 유지할 수 있나요?"],
    caution: "납작한 얼굴 때문에 눈물, 호흡기, 치아 문제가 생기기 쉬워요. 여름철 더위에도 약한 편입니다.",
    tip: "눈 주변은 부드러운 거즈로 매일 닦아 주고, 여름엔 실내 온도를 시원하게 유지하세요."
  },
  siamese: {
    name: "샴", emoji: "🗣️", size: "중소형", weight: "3~5.5kg", coat: "단모 · 포인트 색상",
    tagline: "하루 종일 수다 떠는 사랑꾼",
    keywords: ["수다쟁이", "껌딱지", "영리함"],
    desc: "푸른 눈과 포인트 컬러가 매력적인 영리하고 사교적인 고양이입니다. 사람 곁을 떠나지 않는 껌딱지로, 집사와 끊임없이 대화하듯 울어요. 외로움을 많이 타서 혼자 있는 시간이 길면 힘들어합니다.",
    traits: { energy: 4, size: 2, alone: 1, shed: 2, groom: 1, vocal: 5, mischief: 4, cost: 3, affection: 5, social: 4 },
    look: ["sleek"], charm: ["clever", "elegant"], play: ["hunt", "lap"],
    day: "아침부터 큰 소리로 말을 걸고, 집사가 가는 곳마다 졸졸 따라다녀요. 낮엔 퍼즐 장난감으로 머리를 쓰고, 밤엔 침대에서 집사 옆에 붙어 잡니다.",
    checklist: ["하루 종일 말을 걸어 주고 놀아 줄 수 있나요?", "큰 울음소리를 이웃과 가족이 받아들일 수 있나요?", "혼자 있는 시간을 길게 만들지 않을 수 있나요?"],
    caution: "울음이 크고 잦으며 외로움을 많이 타요. 오래 혼자 두면 분리불안과 파괴 행동이 생길 수 있습니다.",
    tip: "퍼즐 급식기와 낚싯대 놀이로 머리와 몸을 함께 쓰게 하고, 가능하면 친구 고양이를 고려해 보세요."
  },
  abyssinian: {
    name: "아비시니안", emoji: "🌟", size: "중소형", weight: "3~5kg", coat: "단모 · 틱 무늬",
    tagline: "쉬지 않고 탐험하는 날쌘 모험가",
    keywords: ["에너자이저", "호기심", "점프왕"],
    desc: "가는 몸매와 틱 무늬 털이 특징인 활동적인 고양이입니다. 호기심이 대단해 집 안 모든 곳을 오르내리며 탐험하고, 사람과 노는 걸 매우 좋아해요. 에너지가 넘쳐 충분히 놀아 주지 못하면 말썽을 부릴 수 있습니다.",
    traits: { energy: 5, size: 2, alone: 2, shed: 2, groom: 1, vocal: 3, mischief: 5, cost: 3, affection: 3, social: 4 },
    look: ["wild", "sleek"], charm: ["clever"], play: ["climb", "hunt"],
    day: "아침부터 캣타워 꼭대기를 정복하고, 집사가 요리하면 어깨에 올라와 구경해요. 저녁엔 낚싯대 놀이를 한참 하고 나서야 비로소 쉬는 모험가입니다.",
    checklist: ["하루 1시간 이상 활발하게 놀아 줄 수 있나요?", "높은 캣타워와 다양한 놀이 공간을 마련할 수 있나요?", "깨지기 쉬운 물건을 미리 치워 둘 수 있나요?"],
    caution: "에너지가 매우 많아 놀이가 부족하면 가구를 긁고 물건을 떨어뜨리는 등 말썽이 늘어요.",
    tip: "높은 캣타워, 숨바꼭질 상자, 사냥 놀이를 매일 번갈아 제공해 에너지를 풀어 주세요."
  },
  bengal: {
    name: "벵갈", emoji: "🐆", size: "중형", weight: "4~7kg", coat: "단모 · 표범 무늬",
    tagline: "표범을 닮은 지치지 않는 사냥꾼",
    keywords: ["표범 무늬", "체력왕", "물 좋아함"],
    desc: "표범 같은 로제트 무늬와 근육질 몸매를 가진 야성미 넘치는 고양이입니다. 영리하고 체력이 엄청나며 물도 좋아해요. 운동량이 많아 활동적인 집사와 잘 맞고, 놀이가 부족하면 집이 엉망이 될 수 있습니다.",
    traits: { energy: 5, size: 3, alone: 2, shed: 2, groom: 1, vocal: 3, mischief: 5, cost: 5, affection: 3, social: 4 },
    look: ["wild"], charm: ["clever"], play: ["climb", "hunt"],
    day: "새벽부터 집 안을 질주하고, 높은 선반을 오르내리며 하루를 보내요. 물 소리가 나면 달려와 구경하고, 저녁에도 두 번째 사냥 놀이를 요구하는 체력왕입니다.",
    checklist: ["하루 1시간 이상 격한 놀이를 해 줄 수 있나요?", "넓은 활동 공간과 높은 캣타워를 마련할 수 있나요?", "높은 입양비와 사료 비용을 감당할 수 있나요?"],
    caution: "운동량과 지능이 매우 높아 심심하면 문을 열거나 물건을 부수는 말썽이 늘어요. 입양비와 관리 비용도 높은 편입니다.",
    tip: "하네스 산책, 퍼즐 장난감, 캣휠처럼 몸과 머리를 함께 쓰는 활동을 매일 제공해 주세요."
  },
  mainecoon: {
    name: "메인쿤", emoji: "🦁", size: "대형", weight: "5~9kg", coat: "장모 · 풍성한 털",
    tagline: "덩치는 크지만 마음은 순한 거인",
    keywords: ["대형묘", "순한 거인", "사교적"],
    desc: "고양이 중 가장 큰 편에 속하는 온화한 대형묘입니다. 덩치는 크지만 성격은 순하고 사교적이라 사람과 다른 동물과도 잘 어울려요. 풍성한 털 관리와 넓은 공간, 높은 사료·병원비를 감당할 수 있어야 합니다.",
    traits: { energy: 3, size: 5, alone: 3, shed: 4, groom: 4, vocal: 2, mischief: 2, cost: 5, affection: 4, social: 5 },
    look: ["fluffy", "wild"], charm: ["chill"], play: ["climb", "lap"],
    day: "느긋하게 집 안을 걸어 다니며 가족을 하나씩 살피고, 큰 몸으로 소파 한쪽을 차지해요. 물방울이나 장난감을 사냥하듯 잡기도 하고, 저녁엔 부드럽게 골골거립니다.",
    checklist: ["큰 캣타워와 넉넉한 이동장을 마련할 수 있나요?", "털 엉킴 방지를 위해 꾸준히 빗질할 수 있나요?", "대형묘 사료·병원비를 감당할 수 있나요?"],
    caution: "비대성 심근병증(HCM)과 고관절 이형성증에 주의가 필요해 정기 검진이 중요해요. 털 관리와 사료 비용도 큰 편입니다.",
    tip: "튼튼한 대형 캣타워와 넓은 화장실을 마련하고, 털이 엉키기 전에 정기적으로 빗질해 주세요."
  },
  ragdoll: {
    name: "랙돌", emoji: "🧶", size: "대형", weight: "4.5~9kg", coat: "장모 · 부드러운 털",
    tagline: "안기면 인형처럼 축 늘어지는 순둥이",
    keywords: ["인형 같은 순둥이", "껌딱지", "대형묘"],
    desc: "안아 올리면 인형처럼 몸에 힘을 빼는 데서 이름이 붙은 매우 순한 대형묘입니다. 사람을 정말 좋아하고 졸졸 따라다니는 껌딱지예요. 털이 부드럽고 길어서 빗질이 필요하고, 혼자 있는 시간이 길면 외로워합니다.",
    traits: { energy: 2, size: 4, alone: 2, shed: 4, groom: 4, vocal: 1, mischief: 1, cost: 4, affection: 5, social: 5 },
    look: ["fluffy"], charm: ["chill", "cute"], play: ["lap"],
    day: "집사를 따라 방마다 졸졸 이동하고, 앉으면 곧장 무릎 위로 올라와요. 안겨서 축 늘어진 채 골골거리는 순둥이 껌딱지입니다.",
    checklist: ["집사가 오래 집을 비우지 않을 수 있나요?", "털 엉킴 방지를 위해 주 3~4회 이상 빗질할 수 있나요?", "대형묘의 심장 검진(HCM)을 챙길 수 있나요?"],
    caution: "순한 성격 때문에 위험 상황에서도 도망가지 않을 수 있어 실내 사육이 필수예요. 비대성 심근병증에도 주의해야 합니다.",
    tip: "안아 올릴 땐 엉덩이를 받쳐 안정감 있게 안고, 혼자 있는 시간이 길면 놀이 환경을 풍부하게 해 주세요."
  },
  norwegian: {
    name: "노르웨이 숲", emoji: "🌲", size: "대형", weight: "4~9kg", coat: "장모 · 이중모",
    tagline: "숲에서 온 듬직한 장모 탐험가",
    keywords: ["방한 이중모", "듬직함", "점프왕"],
    desc: "추운 북유럽 숲에서 살아온 방한용 이중모를 가진 대형묘입니다. 튼튼하고 영리하며 높은 곳을 오르는 걸 좋아해요. 털이 풍성해서 털갈이 때 엄청나게 빠지니 빗질과 청소를 각오해야 합니다.",
    traits: { energy: 3, size: 4, alone: 3, shed: 5, groom: 4, vocal: 2, mischief: 3, cost: 4, affection: 3, social: 3 },
    look: ["fluffy", "wild"], charm: ["elegant"], play: ["climb"],
    day: "캣타워 꼭대기에서 집 안을 내려다보다 한 번씩 내려와 사냥 놀이를 즐겨요. 거리를 두면서도 집사 곁을 지키는 품위 있는 숲의 신사입니다.",
    checklist: ["튼튼한 대형 캣타워를 마련할 수 있나요?", "털갈이 시기 대량의 털을 감당할 수 있나요?", "정기 빗질을 꾸준히 할 수 있나요?"],
    caution: "털갈이 때 털이 매우 많이 빠지고 엉키기 쉬워요. 고관절·심장 질환도 정기 검진이 필요합니다.",
    tip: "튼튼한 대형 캣타워와 넓은 점프 공간을 두고, 털갈이 시기엔 매일 빗질해 주세요."
  },
  turkishangora: {
    name: "터키시 앙고라", emoji: "🕊️", size: "중소형", weight: "2.5~5kg", coat: "장모 · 실크 같은 털",
    tagline: "우아하고 영리한 하얀 발레리나",
    keywords: ["우아함", "영리함", "활발함"],
    desc: "실크처럼 부드러운 털과 날씬한 체형을 가진 우아한 고양이입니다. 영리하고 장난기가 많아 활발하게 노는 걸 좋아해요. 사람을 따르지만 자기 마음이 내킬 때 다가오는 도도한 매력도 있습니다.",
    traits: { energy: 4, size: 2, alone: 2, shed: 3, groom: 3, vocal: 2, mischief: 4, cost: 4, affection: 3, social: 3 },
    look: ["fluffy", "sleek"], charm: ["elegant", "clever"], play: ["hunt", "climb"],
    day: "우아한 걸음으로 집 안을 거닐다 높은 곳으로 점프하고, 장난감을 가지고 한참 놀아요. 마음이 내키면 집사 곁에 와서 부드러운 털을 내어 주는 도도한 발레리나입니다.",
    checklist: ["하루 30분 이상 놀이로 에너지를 풀어 줄 수 있나요?", "털 엉킴 방지용 빗질을 챙길 수 있나요?", "깨지기 쉬운 물건을 정리해 둘 수 있나요?"],
    caution: "하얀 털에 파란 눈인 경우 청각 문제가 있을 수 있어요. 활발해서 놀이가 부족하면 말썽이 늘 수 있습니다.",
    tip: "높은 곳을 오르내릴 캣타워를 마련하고, 이어진 사냥 놀이로 에너지를 풀어 주세요."
  },
  americanshort: {
    name: "아메리칸 숏헤어", emoji: "🍎", size: "중형", weight: "4~7kg", coat: "단모 · 튼튼한 털",
    tagline: "건강하고 무던한 실내 만능 고양이",
    keywords: ["튼튼함", "무던함", "가족 친화"],
    desc: "튼튼한 체격과 무던한 성격으로 가족 고양이로 사랑받는 견종입니다. 아이와 다른 반려동물과도 잘 지내고, 사냥 본능이 살아 있어 놀이도 즐겨요. 관리가 비교적 쉽고 건강한 편이라 처음 키우는 사람에게도 어울립니다.",
    traits: { energy: 3, size: 3, alone: 4, shed: 3, groom: 2, vocal: 2, mischief: 3, cost: 2, affection: 3, social: 4 },
    look: ["sleek"], charm: ["chill"], play: ["hunt"],
    day: "아이와 어울려 놀다가 낮엔 창가에서 쉬어요. 저녁엔 낚싯대 사냥에 열중한 뒤 가족이 모인 거실 한쪽에서 느긋하게 자리를 잡습니다.",
    checklist: ["체중 관리를 위해 급여량을 조절할 수 있나요?", "정기 접종과 검진을 챙길 수 있나요?", "가족 모두가 고양이를 존중하며 지낼 수 있나요?"],
    caution: "식욕이 좋아 비만이 되기 쉬워요. 대체로 건강하지만 심장 질환 검진은 챙기는 것이 좋습니다.",
    tip: "사냥 놀이를 매일 챙기고, 사료는 정량으로 급여해 체중을 관리해 주세요."
  },
  sphynx: {
    name: "스핑크스", emoji: "🪽", size: "중소형", weight: "3~5kg", coat: "무모 · 솜털",
    tagline: "털은 없지만 사랑은 가득한 따뜻한 껌딱지",
    keywords: ["무모종", "껌딱지", "피부 관리"],
    desc: "털이 거의 없는 독특한 외모와 따뜻한 체온을 가진 고양이입니다. 사람을 매우 좋아하고 관심받는 걸 즐기는 껌딱지예요. 털이 없는 대신 피부 관리와 보온이 필수이고, 알레르기가 완전히 없는 건 아닙니다.",
    traits: { energy: 4, size: 2, alone: 1, shed: 1, groom: 3, vocal: 3, mischief: 4, cost: 4, affection: 5, social: 4 },
    look: ["unique"], charm: ["clever", "cute"], play: ["lap", "hunt"],
    day: "집사의 이불 속이나 무릎, 햇볕 아래 따뜻한 곳을 귀신같이 찾아내고, 활발하게 놀다가도 곧 품으로 파고들어요. 털 대신 체온으로 사랑을 표현하는 껌딱지입니다.",
    checklist: ["정기 목욕과 피부 관리를 할 수 있나요?", "겨울 보온과 여름 햇볕 차단을 챙길 수 있나요?", "혼자 두는 시간을 짧게 유지할 수 있나요?"],
    caution: "털이 없어 피부에 기름이 쌓이고 추위와 햇볕에 약해요. 고양이 알레르겐은 털뿐 아니라 침과 피부에도 있어 알레르기가 있는 사람에게 안전하다고 단정할 수 없습니다.",
    tip: "주기적으로 부드럽게 목욕시키고, 겨울엔 옷이나 따뜻한 잠자리를, 여름엔 자외선 차단을 신경 써 주세요."
  },
  siberian: {
    name: "시베리안", emoji: "❄️", size: "대형", weight: "4~9kg", coat: "장모 · 이중모",
    tagline: "눈 속에서 온 다정한 장모 점프왕",
    keywords: ["다정함", "점프왕", "방한 털"],
    desc: "러시아의 추운 숲에서 온 튼튼한 장모 대형묘입니다. 다정하고 사교적이며 개처럼 사람을 따라다니는 면이 있어요. 점프력이 뛰어나 높은 곳을 좋아하고, 풍성한 털은 정기적인 빗질이 필요합니다.",
    traits: { energy: 4, size: 4, alone: 3, shed: 5, groom: 4, vocal: 2, mischief: 3, cost: 4, affection: 4, social: 4 },
    look: ["fluffy"], charm: ["clever"], play: ["climb", "hunt"],
    day: "높은 캣타워에서 가족을 내려다보다 한 번씩 점프해 내려와 놀이를 요구하고, 현관까지 마중 나와 인사해요. 저녁엔 가족 곁에서 느긋하게 골골거립니다.",
    checklist: ["넉넉한 높은 점프 공간을 마련할 수 있나요?", "털갈이 시기 빗질과 청소를 감당할 수 있나요?", "대형묘의 사료·병원비를 감당할 수 있나요?"],
    caution: "'알레르기가 적다'는 이야기가 있지만 개체 차이가 크고 보장되는 것이 아니에요. 털 빠짐과 빗질 관리가 많은 편입니다.",
    tip: "튼튼한 대형 캣타워를 마련하고, 입양 전 알레르기가 있다면 꼭 직접 만나 반응을 확인해 보세요."
  },
  devonrex: {
    name: "데본 렉스", emoji: "🧚", size: "소형", weight: "2.5~4.5kg", coat: "단모 · 곱슬 솜털",
    tagline: "요정 같은 큰 귀의 장난꾸러기",
    keywords: ["곱슬털", "큰 귀", "장난꾸러기"],
    desc: "큰 귀와 곱슬곱슬한 솜털을 가진 요정 같은 외모의 고양이입니다. 사람을 매우 좋아하고 장난기가 많아 어깨나 머리 위에 올라오기도 해요. 털 빠짐이 적은 편이지만 에너지가 넘쳐 놀아 줄 시간이 필요합니다.",
    traits: { energy: 4, size: 2, alone: 2, shed: 1, groom: 2, vocal: 3, mischief: 5, cost: 4, affection: 5, social: 4 },
    look: ["unique"], charm: ["cute", "clever"], play: ["climb", "lap"],
    day: "집사 어깨에 올라와 하루를 함께하고, 높은 곳에 올라가 장난을 치다 무릎 위에서 쉬어요. 큰 귀를 쫑긋거리며 사람 곁을 떠나지 않는 요정입니다.",
    checklist: ["하루 30분 이상 놀이 시간을 낼 수 있나요?", "귀 청소와 피부 관리를 꾸준히 할 수 있나요?", "혼자 있는 시간을 짧게 유지할 수 있나요?"],
    caution: "털이 얇아 추위에 약하고 귀에 분비물이 쌓이기 쉬워요. 에너지가 많아 심심하면 말썽을 부립니다.",
    tip: "귀를 정기적으로 청소하고, 겨울에는 보온에 신경 쓰며, 놀이 시간을 충분히 마련해 주세요."
  },
  birman: {
    name: "버만", emoji: "🥛", size: "중형", weight: "3.5~7kg", coat: "장모 · 실키 모질",
    tagline: "흰 장갑을 낀 부드러운 신사",
    keywords: ["흰 장갑", "온화함", "사교적"],
    desc: "푸른 눈과 하얀 발끝, 부드러운 실키 털을 가진 온화한 고양이입니다. 조용하고 다정하며 사람 곁에 있는 걸 좋아해요. 속털이 적어 장모종 중 털 엉킴이 비교적 적은 편이지만 정기 빗질은 필요합니다.",
    traits: { energy: 2, size: 3, alone: 3, shed: 3, groom: 3, vocal: 2, mischief: 2, cost: 4, affection: 4, social: 4 },
    look: ["fluffy"], charm: ["elegant", "chill"], play: ["lap"],
    day: "조용히 집사를 따라다니며 곁을 지키고, 부드러운 목소리로 인사를 건네요. 저녁엔 무릎 위에서 흰 장갑 낀 발로 가볍게 꾹꾹이를 해 줍니다.",
    checklist: ["주 2~3회 이상 빗질을 챙길 수 있나요?", "혼자 있는 시간이 너무 길지 않게 할 수 있나요?", "눈 주변 관리와 정기 검진을 챙길 수 있나요?"],
    caution: "사람 곁을 좋아해서 오래 혼자 두면 외로워해요. 유전 질환 확인을 위해 신뢰할 수 있는 곳에서 입양하세요.",
    tip: "부드러운 빗으로 주기적으로 빗질하고, 조용한 쉼터와 함께 놀 시간을 마련해 주세요."
  },
  americancurl: {
    name: "아메리칸 컬", emoji: "🌀", size: "중소형", weight: "3~5kg", coat: "단모 · 장모",
    tagline: "뒤로 말린 귀가 매력적인 영원한 아기 고양이",
    keywords: ["말린 귀", "다정함", "사교적"],
    desc: "뒤로 말린 독특한 귀 모양이 특징인 다정하고 사교적인 고양이입니다. 사람과 다른 동물을 잘 따르고 호기심이 많아 어른이 되어도 아기처럼 장난기가 있어요. 귀가 말린 만큼 귀 건강 관리가 중요합니다.",
    traits: { energy: 3, size: 2, alone: 3, shed: 3, groom: 2, vocal: 2, mischief: 2, cost: 4, affection: 5, social: 5 },
    look: ["unique"], charm: ["cute"], play: ["lap", "hunt"],
    day: "현관에서 가족을 반기고 졸졸 따라다니다 말린 귀를 쫑긋 세우고 놀이에 참여해요. 저녁엔 무릎 위에서 부드럽게 골골거리며 사랑을 표현합니다.",
    checklist: ["귀 안쪽을 정기적으로 확인하고 청소할 수 있나요?", "혼자 있는 시간을 길지 않게 할 수 있나요?", "다른 반려동물이나 아이와의 생활을 준비할 수 있나요?"],
    caution: "귀가 말린 구조라 귀 염증이 생기기 쉬우니 정기적인 확인이 필요해요. 귀를 무리하게 구부리면 다칠 수 있습니다.",
    tip: "귀 청소는 수의사에게 방법을 배워 부드럽게 하고, 놀 때 귀를 만지지 않도록 주의해 주세요."
  }
};

// ============================================
// 결과 문구 (기준별 이유·주의)
// ============================================

const CATBREED_REASONS = {
  energy:    "나의 놀아 줄 여유와 필요한 활동량이 잘 맞아요",
  size:      "사는 공간과 원하는 크기에 잘 어울려요",
  alone:     "나의 생활 패턴에서도 혼자 있는 시간을 잘 견딜 수 있어요",
  shed:      "털 날림이 내가 감당할 수 있는 수준이에요",
  groom:     "빗질·관리 부담이 내 여유에 맞아요",
  vocal:     "울음 소리 걱정이 적은 편이에요",
  mischief:  "말썽과 장난기가 내가 받아줄 수 있는 수준이에요",
  cost:      "관리 비용이 내 예산 안에 들어와요",
  affection: "내가 원하는 애정 표현 스타일과 잘 맞아요",
  social:    "우리 집 분위기와 잘 어울려요",
  look:      "눈을 못 떼는 외모 취향에 딱 맞아요",
  charm:     "내가 가장 약한 매력 포인트를 가졌어요",
  play:      "내가 하고 싶은 놀이를 함께 즐길 수 있어요"
};

// 사용자보다 묘종 값이 클 때(over) / 작을 때(under)
const CATBREED_CAUTIONS = {
  energy:    { over: "생각보다 훨씬 많이 놀아 줘야 해요. 놀이 시간을 늘릴 각오가 필요해요", under: "활동적인 나에게는 조금 느긋한 친구일 수 있어요" },
  size:      { over: "사는 공간이나 원하는 크기에 비해 덩치가 큰 편이에요", under: "원하는 것보다 작은 체구예요" },
  alone:     { under: "혼자 있는 시간이 길면 외로움을 많이 탈 수 있어요" },
  shed:      { over: "털 빠짐이 많은 편이라 청소와 빗질이 필요해요" },
  groom:     { over: "정기 빗질과 관리에 시간과 손이 많이 가요" },
  vocal:     { over: "울음이 잦은 편이라 소음 관리가 필요해요" },
  mischief:  { over: "말썽과 장난기가 많아 집 정리가 필요해요" },
  cost:      { over: "예상보다 관리 비용이 많이 들 수 있어요" },
  affection: { over: "생각보다 훨씬 껌딱지일 수 있어요", under: "애정 표현이 담백한 편이에요" },
  social:    { over: "사람이 많은 집을 더 좋아해 조용한 집에선 심심해할 수 있어요", under: "낯선 사람이나 북적이는 환경에 적응할 시간이 필요해요" }
};

// ============================================
// 채점 함수
// ============================================

function calcCatBreed(answers) {
  // answers = [{ dim: "energy", val: 3 }, { dim: "look", val: "fluffy" }, ...]
  const sums = {}, counts = {}, user = {};
  answers.forEach(a => {
    if (!a || !CATBREED_DIMS[a.dim]) return;
    if (CATBREED_DIMS[a.dim].kind === "cat") { user[a.dim] = a.val; return; }
    sums[a.dim] = (sums[a.dim] || 0) + a.val;
    counts[a.dim] = (counts[a.dim] || 0) + 1;
  });
  Object.entries(CATBREED_DIMS).forEach(([d, def]) => {
    if (def.kind === "cat") return;
    user[d] = counts[d] ? sums[d] / counts[d] : 3;
  });

  const maxPenalty = Object.values(CATBREED_DIMS).reduce((s, d) => s + d.w * (d.kind === "cat" ? 3 : 4 * (d.overMul || 1)), 0);

  const ranked = Object.entries(CATBREED_BREEDS).map(([id, breed]) => {
    const detail = {};
    let penalty = 0;
    Object.entries(CATBREED_DIMS).forEach(([d, def]) => {
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
    worstReason: catBreedCautions(worst)[0] || "",
    ranked,
    user,
    reasons: catBreedReasons(best),
    cautions: catBreedCautions(best)
  };
}

// 차이가 거의 없는 기준 중 가중치가 큰 순으로 최대 3개
function catBreedReasons(entry) {
  return Object.entries(entry.detail)
    .filter(([, v]) => v.gap <= 0.5)
    .sort((a, b) => CATBREED_DIMS[b[0]].w - CATBREED_DIMS[a[0]].w)
    .slice(0, 3)
    .map(([d]) => CATBREED_REASONS[d]);
}

// 가중 차이가 큰 기준 최대 2개 (가중 차이 1 이상, 취향 범주 제외)
function catBreedCautions(entry) {
  return Object.entries(entry.detail)
    .filter(([d, v]) => v.weighted >= 1 && CATBREED_DIMS[d].kind !== "cat")
    .sort((a, b) => b[1].weighted - a[1].weighted)
    .slice(0, 2)
    .map(([d, v]) => {
      const c = CATBREED_CAUTIONS[d];
      return c[v.dir] || c.over || c.under;
    })
    .filter(Boolean);
}

// 궁합 상세 화면용: 기준별 판정 (잘 맞음 / 조금 차이 / 차이 큼)
function catBreedFit(gap) {
  if (gap <= 0.7) return { label: "잘 맞음", mark: "✓", tone: "good" };
  if (gap <= 1.7) return { label: "조금 차이", mark: "△", tone: "mid" };
  return { label: "차이 큼", mark: "✕", tone: "bad" };
}

if (typeof module !== 'undefined') {
  module.exports = { CATBREED_DIMS, CATBREED_USER_LABEL, CATBREED_QUESTIONS, CATBREED_BREEDS, CATBREED_REASONS, CATBREED_CAUTIONS, calcCatBreed, catBreedFit };
}
