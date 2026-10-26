// ============================================
// 나는 연애할 때 어떤 빌런일까? 연애 빌런 · 레드플래그 테스트
// ============================================
// 구조: 12개 연애 상황, 상황마다 4지선다. 선택지는 6유형 중 하나에 +1, 그리고 위험도(flag 0~3)를 가진다.
// 6유형: G 잠수형 / W 감시형 / P 밀당형 / R 감정 롤러코스터형 / C 쿨한 척형 / H 구원자형
// 상황마다 6유형 중 4유형만 등장하고, 12상황 전체에서 유형별로 정확히 8번씩 등장해 특정 유형이 유리하지 않다.
// (제외 쌍: 1={G,W} 2={W,P} 3={P,R} 4={R,C} 5={C,H} 6={H,G} 7={G,R} 8={W,C} 9={P,H} 10={R,G} 11={C,W} 12={H,P})
// 레드플래그 지수 = (고른 flag 합 − 최소 가능 합) / (최대 가능 합 − 최소 가능 합) × 100  (순한 선택이 많을수록 낮다)
// 결과: 주 유형(+보조 유형) + 레드플래그 단계. 동점은 응답 기반 고정 해시로 처리해 유형 간 편향이 없다.
// 재미로 보는 테스트이며 연애 습관을 가볍게 돌아보는 용도다. 사람을 진단하거나 평가하지 않는다.
// ============================================

const LOVEVILLAIN_QUESTIONS = [
  {
    id: 1, emoji: "📱", question: "연인에게서 두 시간째 연락이 없다. 나는?",
    choices: [
      { text: "일부러 나도 늦게 답하면서 반응을 지켜본다", type: "P", flag: 2 },
      { text: "불안해져서 한 번 전화해 보고 감정을 가라앉히려 애쓴다", type: "R", flag: 1 },
      { text: "괜찮은 척하며 아무 말 없이 혼자 삼킨다", type: "C", flag: 1 },
      { text: "무슨 일 생긴 건 아닌지 주변 사람에게까지 연락해 본다", type: "H", flag: 2 }
    ]
  },
  {
    id: 2, emoji: "🍻", question: "연인이 이성 친구가 있는 술자리에 간다고 한다",
    choices: [
      { text: "쿨하게 보내 주고 그날부터 연락을 끊고 잠수한다", type: "G", flag: 3 },
      { text: "웃으며 보내 놓고 새벽에 감정이 폭발한다", type: "R", flag: 3 },
      { text: "\"재밌게 놀아~\"라고 말하고 그날 연락을 안 하며 속으로 점수를 깎는다", type: "C", flag: 2 },
      { text: "귀가 시간을 정해 주고 집에 갈 때까지 챙긴다", type: "H", flag: 2 }
    ]
  },
  {
    id: 3, emoji: "🌅", question: "크게 싸운 다음 날 아침, 나는?",
    choices: [
      { text: "답장을 안 하고 조용히 며칠 시간을 둔다", type: "G", flag: 2 },
      { text: "상대의 SNS를 슬쩍 보고 안심하려 한다", type: "W", flag: 1 },
      { text: "아무 일 없었다는 듯 행동하며 서운함은 끝내 말하지 않는다", type: "C", flag: 2 },
      { text: "사과와 해결 방법을 길게 정리해서 먼저 보낸다", type: "H", flag: 1 }
    ]
  },
  {
    id: 4, emoji: "🎁", question: "기념일 선물이 내 취향과 전혀 다르다",
    choices: [
      { text: "고맙다고 하고 그 뒤로 말없이 마음이 멀어진다", type: "G", flag: 2 },
      { text: "왜 이걸 골랐는지 이유를 꼬치꼬치 물어본다", type: "W", flag: 2 },
      { text: "표정 관리하면서 다음번에 알아서 눈치채게 만든다", type: "P", flag: 2 },
      { text: "내가 원하는 걸 정리해서 다음 선물 리스트를 건넨다", type: "H", flag: 1 }
    ]
  },
  {
    id: 5, emoji: "⏸️", question: "상대가 \"우리 잠깐 생각할 시간을 갖자\"고 말한다",
    choices: [
      { text: "알겠다고 하고 연락을 완전히 끊어 버린다", type: "G", flag: 3 },
      { text: "상대의 하루를 몰래 확인하며 불안해한다", type: "W", flag: 3 },
      { text: "나도 여유 있는 척하며 연락을 먼저 끊는다", type: "P", flag: 2 },
      { text: "울다가 화내다가 매달리기를 반복한다", type: "R", flag: 3 }
    ]
  },
  {
    id: 6, emoji: "💌", question: "마음에 드는 사람이 생겼다. 나의 방식은?",
    choices: [
      { text: "그 사람의 SNS를 정독하고 취향을 분석한다", type: "W", flag: 1 },
      { text: "일부러 답장을 늦추며 거리를 조절한다", type: "P", flag: 2 },
      { text: "하루에도 몇 번씩 기분이 오르락내리락한다", type: "R", flag: 2 },
      { text: "관심 없는 척하며 아무 티도 내지 않는다", type: "C", flag: 1 }
    ]
  },
  {
    id: 7, emoji: "👀", question: "연인의 SNS에 낯선 이성이 다정한 댓글을 남겼다",
    choices: [
      { text: "그 사람의 계정과 팔로워를 하나씩 뒤져 본다", type: "W", flag: 3 },
      { text: "나도 일부러 다른 사람에게 다정하게 구는 모습을 올린다", type: "P", flag: 3 },
      { text: "아무렇지 않은 척 지나가고 이후 대화에서 은근히 차갑게 군다", type: "C", flag: 2 },
      { text: "\"그 사람과 연락하지 않았으면 좋겠다\"고 단호하게 요구한다", type: "H", flag: 3 }
    ]
  },
  {
    id: 8, emoji: "💬", question: "연인이 힘든 일을 털어놓는다",
    choices: [
      { text: "듣다가 어느새 대화를 피하고 다른 일을 한다", type: "G", flag: 2 },
      { text: "상대가 원하는 말을 계산해서 딱 맞게 해 준다", type: "P", flag: 1 },
      { text: "상대보다 내가 더 울고 흥분해서 감정이 번진다", type: "R", flag: 2 },
      { text: "해결 방법을 전부 정리해서 이렇게 하라고 지시한다", type: "H", flag: 2 }
    ]
  },
  {
    id: 9, emoji: "🗣️", question: "서운한 일이 생겼을 때 나는?",
    choices: [
      { text: "말없이 거리를 두다가 연락 횟수를 줄인다", type: "G", flag: 2 },
      { text: "예전 일까지 꺼내서 증거처럼 정리해 말한다", type: "W", flag: 3 },
      { text: "참다가 터지는 순간 하고 싶은 말을 한꺼번에 쏟아낸다", type: "R", flag: 3 },
      { text: "\"괜찮아\"라고 말하고 속으로 점수만 쌓는다", type: "C", flag: 2 }
    ]
  },
  {
    id: 10, emoji: "🔄", question: "연락은 누가 먼저 해야 한다고 생각해?",
    choices: [
      { text: "상대가 먼저 한 횟수를 세어 보는 나를 발견하고 멈춘다", type: "W", flag: 1 },
      { text: "상대가 먼저 하게 만드는 사람이 이기는 거라고 생각한다", type: "P", flag: 3 },
      { text: "안 와도 괜찮다고 말하며 먼저는 절대 안 한다", type: "C", flag: 2 },
      { text: "내가 먼저 부지런히 챙기고 상대가 따라오길 바란다", type: "H", flag: 1 }
    ]
  },
  {
    id: 11, emoji: "🪞", question: "연인이 내 단점을 지적한다",
    choices: [
      { text: "대화를 피하고 시간이 지나길 기다린다", type: "G", flag: 2 },
      { text: "겉으론 웃으며 받아들이고 다음에 은근히 되돌려준다", type: "P", flag: 3 },
      { text: "순간 감정이 올라와서 크게 반응한다", type: "R", flag: 2 },
      { text: "\"다 너를 위해서 한 말\"이라며 상대 단점부터 정리해 준다", type: "H", flag: 3 }
    ]
  },
  {
    id: 12, emoji: "💔", question: "헤어진 직후 나는?",
    choices: [
      { text: "SNS를 차단하고 연락처를 지우고 사라진다", type: "G", flag: 2 },
      { text: "상대의 근황을 몰래 계속 확인한다", type: "W", flag: 3 },
      { text: "새벽에 장문의 문자를 썼다 지웠다 하며 밤을 보낸다", type: "R", flag: 2 },
      { text: "친구들 앞에서는 쿨하게 말하고 몰래 상대 프로필을 계속 본다", type: "C", flag: 2 }
    ]
  }
];

// ============================================
// 6가지 연애 빌런 유형
// ============================================
// match: 이 유형의 매력을 편하게 받아 주는 유형

const LOVEVILLAIN_TYPES = {
  G: {
    emoji: "👻", name: "잠수 후 감성 문자러", color: "#7B8BA8", match: "H",
    tagline: "읽고 사라졌다가 3일 뒤에 나타나는 사람",
    desc: "감정이 복잡해지면 일단 연락을 끊고 혼자 정리하는 유형입니다. 갈등을 피하려는 마음이 커서 말보다 침묵을 택하고, 시간이 지나 마음이 정리되면 긴 감성 문자로 돌아와요. 혼자 생각할 시간이 필요한 사람이지만, 상대에게는 갑작스러운 잠수가 큰 불안이 됩니다.",
    keywords: ["혼자 정리", "회피", "감성 문자"],
    partner: "상대는 \"내가 뭘 잘못했나?\"라고 계속 불안해해요. 사라져 있는 동안 상대는 이유를 모른 채 기다립니다.",
    charm: "싸움이 커지기 전에 한 걸음 물러설 줄 알고, 감정이 가라앉은 뒤에는 진심을 길게 풀어내는 섬세함이 있어요.",
    flag: "예고 없는 잠수, 말 없이 연락 횟수 줄이기, 대화 자체를 피하기",
    say: "\"지금 마음이 복잡해서 하루만 시간이 필요해. 내일 저녁에 꼭 연락할게.\"",
    together: "기다림을 알려 주는 말 한마디만 있으면 잠수가 '정리 시간'으로 바뀌어요. 시간을 구체적으로 약속하는 습관을 만들어 보세요."
  },
  W: {
    emoji: "🕵️", name: "읽씹 감시관", color: "#B0804A", match: "C",
    tagline: "상대의 마지막 접속 시간까지 기억하는 사람",
    desc: "상대의 작은 신호도 놓치지 않고 읽어내는 유형입니다. 연락 빈도, 접속 시간, 말투 변화까지 세심하게 알아채고, 불안해지면 정보를 모아서 확인하려 해요. 관찰력이 뛰어난 만큼 마음이 불안할 때는 확인이 끝없이 이어질 수 있습니다.",
    keywords: ["섬세한 관찰", "확인", "불안"],
    partner: "상대는 \"감시받는 느낌\"이 들 수 있어요. 해명을 계속 요구받으면 점점 말을 아끼게 됩니다.",
    charm: "상대의 취향과 변화를 가장 잘 기억해 주고, 기념일 하나 놓치지 않는 세심한 사람이에요.",
    flag: "SNS·접속 기록 확인, 과거 일 증거처럼 꺼내기, 연락 횟수 세기",
    say: "\"확인하고 싶은 마음이 들 때는 이렇게 말할게. 오늘 불안한데, 안심되는 말 한마디만 해 줄래?\"",
    together: "확인 대신 마음을 말로 요청해 보세요. 불안을 정리해 주는 한 줄이 열 번의 확인보다 효과가 커요."
  },
  P: {
    emoji: "🎭", name: "밀당 설계자", color: "#8E6BB8", match: "R",
    tagline: "답장 속도도 전략인 사람",
    desc: "관계의 주도권과 거리를 계산하며 움직이는 유형입니다. 답장 타이밍, 말투, 표현의 양까지 조절하면서 상대 반응을 읽고, 상처받지 않으려는 마음이 전략으로 나타나요. 영리하고 눈치가 빠르지만 계산이 앞서면 진심이 전달되기 어렵습니다.",
    keywords: ["전략", "거리 조절", "상처 방어"],
    partner: "상대는 \"이 사람의 진짜 마음이 뭘까?\"를 계속 해석하느라 지쳐 가요.",
    charm: "분위기와 타이밍을 정확히 읽어서 대화가 지루하지 않고 설렘을 만들어 내는 센스가 있어요.",
    flag: "일부러 답장 늦추기, 질투 유발하기, 은근한 되돌려주기",
    say: "\"사실 답장을 바로 하고 싶었는데 밀당하는 것 같아서 망설였어. 앞으로는 솔직하게 말할게.\"",
    together: "계산을 잠깐 내려놓고 솔직하게 먼저 표현해 보세요. 한 번의 솔직함이 열 번의 밀당보다 오래 남아요."
  },
  R: {
    emoji: "🎢", name: "감정 롤러코스터", color: "#E8683A", match: "G",
    tagline: "좋다가 갑자기 폭발하고 금방 미안해하는 사람",
    desc: "감정이 크고 빠르게 움직이는 유형입니다. 사랑도 서운함도 온몸으로 느끼고, 그 순간의 감정이 말과 행동으로 바로 나와요. 솔직하고 표현이 풍부하지만 감정이 파도처럼 오르내리면 곁의 사람이 지치기 쉽습니다.",
    keywords: ["풍부한 감정", "솔직함", "기복"],
    partner: "상대는 \"오늘은 어떤 기분일까?\"를 살피며 눈치를 보게 돼요. 좋을 때의 큰 사랑과 힘들 때의 큰 파도를 모두 받게 됩니다.",
    charm: "사랑하는 마음을 숨기지 않고 크게 표현하는 열정이 있어서, 함께하는 시간이 영화처럼 생생해요.",
    flag: "감정 폭발 후 연달아 연락, 새벽 장문 메시지, 매달림과 분노의 반복",
    say: "\"지금 감정이 너무 올라와서 10분만 진정하고 다시 얘기할게.\"",
    together: "감정이 올라올 때 쓸 '10분 규칙'을 정해 두세요. 말하기 전에 잠깐 멈추는 연습이 큰 차이를 만들어요."
  },
  C: {
    emoji: "🧊", name: "쿨한 척 대마왕", color: "#4A9DD0", match: "W",
    tagline: "속은 서운한데 \"괜찮아\"라고 말하는 사람",
    desc: "감정을 드러내는 것이 어색하거나 부담스러운 유형입니다. 서운해도 \"괜찮아\"라고 말하고, 좋아도 티를 잘 내지 않아요. 상대를 배려하는 마음이 크지만 말하지 못한 감정이 쌓이면 어느 순간 거리가 크게 벌어집니다.",
    keywords: ["배려", "감정 억제", "쌓아 두기"],
    partner: "상대는 \"괜찮다고 했으니 괜찮은 줄 알았는데…\"라며 뒤늦게 당황해요. 신호가 없어서 서운함을 알아채기 어렵습니다.",
    charm: "상대를 부담 없이 편하게 해 주고, 갈등 상황에서도 차분함을 유지하는 안정감이 있어요.",
    flag: "서운함을 말 없이 쌓기, 먼저 연락 안 하기, 괜찮은 척으로 마음 숨기기",
    say: "\"괜찮다고 했지만 사실 조금 서운했어. 이야기해도 될까?\"",
    together: "서운함을 작을 때 가볍게 말하는 연습이 필요해요. 작은 말 한마디가 쌓이는 감정을 대신 풀어 줘요."
  },
  H: {
    emoji: "🦸", name: "나만 믿어 구원자", color: "#E2B13C", match: "G",
    tagline: "상대의 인생 문제까지 정리해 주려는 사람",
    desc: "사랑하는 사람을 위해 적극적으로 나서는 유형입니다. 문제가 보이면 해결하고, 부족해 보이면 채워 주려 해요. 헌신과 책임감이 큰 만큼 상대의 선택을 대신 정하려는 순간이 생기고, 도움이 간섭으로 느껴질 수 있습니다.",
    keywords: ["헌신", "해결사", "과몰입"],
    partner: "상대는 \"고마운데 숨이 막혀\"라고 느낄 수 있어요. 늘 도움받는 쪽이 되면 스스로 결정할 기회가 줄어듭니다.",
    charm: "곁에 있으면 든든하고 뭐든 챙겨 주는 따뜻함이 있어서, 힘든 순간에 가장 먼저 떠오르는 사람이에요.",
    flag: "지시하듯 해결책 주기, 상대 인간관계에 개입하기, \"다 너를 위해서\"라는 말",
    say: "\"내가 도울 일이 있을까, 아니면 그냥 들어 주길 바라는 거야?\"",
    together: "도움을 주기 전에 먼저 물어보세요. 상대가 원하는 방식의 도움이 가장 큰 사랑이 돼요."
  }
};

// ============================================
// 레드플래그 단계 (0~100)
// ============================================

const LOVEVILLAIN_LEVELS = [
  { min: 0,  emoji: "🟢", name: "그린라이트 연애인", tagline: "연애 습관이 꽤 건강해요", color: "#3E9B6E",
    desc: "연애에서 서로를 존중하는 선택을 많이 하는 편이에요. 빌런 기질이 있더라도 큰 문제로 번지기 전에 스스로 조절하는 힘이 있습니다." },
  { min: 40, emoji: "🟡", name: "귀여운 옐로 플래그", tagline: "가끔 깜빡이는 노란불", color: "#D4A017",
    desc: "누구에게나 있는 정도의 연애 습관이에요. 상황에 따라 서운함을 숨기거나 거리를 두는 일이 있지만, 알아차리고 조금씩 고치면 충분히 좋은 연애를 할 수 있어요." },
  { min: 50, emoji: "🟠", name: "조심해야 하는 오렌지", tagline: "습관이 커지기 전에 점검해요", color: "#E8833A",
    desc: "불안하거나 서운할 때 나오는 행동이 꽤 뚜렷해요. 연애가 깊어질수록 상대에게 큰 부담이 될 수 있으니, 아래 '이렇게 말해 보세요'를 습관으로 만들어 보세요." },
  { min: 58, emoji: "🔴", name: "레드플래그 깃발 부대", tagline: "습관을 꼭 돌아봐야 해요", color: "#D2555A",
    desc: "불안한 순간에 나오는 행동의 강도가 큰 편이에요. 사랑이 깊은 만큼 표현 방식이 상대를 지치게 할 수 있어요. 습관을 바꾸려는 마음만으로도 크게 달라질 수 있습니다." },
  { min: 74, emoji: "🚩", name: "깃발 박물관 관장", tagline: "연애에도 휴식과 연습이 필요해요", color: "#A62B3F",
    desc: "상대와 나를 모두 지치게 만드는 습관이 많이 쌓여 있는 편이에요. 이 결과는 재미용이지만, 평소에도 관계가 힘들다면 믿을 수 있는 사람이나 전문가와 이야기해 보는 것을 권해요." }
];
function loveVillainLevel(score) {
  let lv = LOVEVILLAIN_LEVELS[0];
  LOVEVILLAIN_LEVELS.forEach(l => { if (score >= l.min) lv = l; });
  return lv;
}

// 조합 코멘트 (주 유형 + 보조 유형)
const LOVEVILLAIN_COMBOS = {
  G_W: "읽고 사라졌다가 몰래 확인하는 조합이에요. 마음이 불안할수록 연락을 끊고 몰래 지켜보는 이중 신호가 나올 수 있어요.",
  G_P: "거리를 두고 계산하는 조합이에요. 상처받기 싫은 마음이 커서 좀처럼 진심을 꺼내지 않아요.",
  G_R: "폭발하고 사라지는 조합이에요. 감정이 크게 일었다가 갑자기 연락을 끊는 패턴을 조심하세요.",
  C_G: "말 없이 쌓아 두다가 조용히 멀어지는 조합이에요. 서운함을 작을 때 꺼내는 연습이 가장 중요해요.",
  G_H: "도와주다가 지치면 사라지는 조합이에요. 내 한계를 미리 말해 두면 훨씬 안정돼요.",
  P_W: "계산하면서 확인하는 조합이에요. 상대의 마음을 알고 싶은 불안이 전략으로 나타나요.",
  R_W: "불안이 감정 폭발과 확인으로 이어지는 조합이에요. 확인 전에 10분 멈추는 연습이 도움이 돼요.",
  C_W: "겉은 쿨하고 속은 계속 확인하는 조합이에요. 마음속 질문을 말로 꺼내 보세요.",
  H_W: "챙기면서 감시하는 조합이에요. 걱정이 통제로 변하지 않도록 질문으로 바꿔 보세요.",
  P_R: "계산과 감정이 번갈아 나오는 조합이에요. 상대가 어느 쪽이 진짜인지 헷갈릴 수 있어요.",
  C_P: "쿨한 척하면서 계산하는 조합이에요. 마음을 숨기는 기술이 뛰어난 만큼 진심을 보여 주는 용기가 필요해요.",
  H_P: "도와주면서 주도권을 쥐는 조합이에요. 상대가 스스로 선택할 여지를 남겨 주세요.",
  C_R: "참다가 터지는 조합이에요. 쌓기 전에 작게 말하는 습관이 가장 큰 보호막이에요.",
  H_R: "열정적으로 챙기다 폭발하는 조합이에요. 쉬는 시간을 일정으로 만들어 두세요.",
  C_H: "괜찮은 척하면서 다 해 주는 조합이에요. 내 마음의 요청도 가끔은 말로 해 보세요."
};
function getLoveVillainCombo(a, b) { return a === b ? null : (LOVEVILLAIN_COMBOS[[a, b].sort().join("_")] || LOVEVILLAIN_COMBOS[[b, a].join("_")] || null); }

// ============================================
// 채점
// ============================================

function loveVillainHash(str) {
  let h = 2166136261;
  for (let i = 0; i < str.length; i++) { h ^= str.charCodeAt(i); h = Math.imul(h, 16777619); }
  return h >>> 0;
}

function calcLoveVillain(answers) {
  // answers = [{ type: "G", flag: 2 }, ...] 12개
  const keys = Object.keys(LOVEVILLAIN_TYPES);
  const totals = {};
  keys.forEach(k => totals[k] = 0);
  let flagSum = 0;
  answers.forEach(a => { if (a && totals[a.type] !== undefined) { totals[a.type] += 1; flagSum += a.flag || 0; } });

  const maxFlag = LOVEVILLAIN_QUESTIONS.reduce((s, q) => s + Math.max(...q.choices.map(c => c.flag)), 0);
  const minFlag = LOVEVILLAIN_QUESTIONS.reduce((s, q) => s + Math.min(...q.choices.map(c => c.flag)), 0);
  const score = Math.round(((flagSum - minFlag) / (maxFlag - minFlag)) * 100);
  const level = loveVillainLevel(score);

  const seed = answers.map(a => a && a.type).join("");
  const n = answers.length || 1;
  const percentages = {};
  keys.forEach(k => percentages[k] = Math.round((totals[k] / n) * 100));
  const sorted = keys.slice().sort((a, b) => totals[b] !== totals[a] ? totals[b] - totals[a] : loveVillainHash(a + seed) - loveVillainHash(b + seed));
  const primary = sorted[0], secondary = sorted[1];

  return {
    totals, percentages, sorted, primary, secondary,
    primaryInfo: LOVEVILLAIN_TYPES[primary], secondaryInfo: LOVEVILLAIN_TYPES[secondary],
    score, level, flagSum, maxFlag, minFlag,
    comboNote: getLoveVillainCombo(primary, secondary),
    matchInfo: LOVEVILLAIN_TYPES[LOVEVILLAIN_TYPES[primary].match]
  };
}

if (typeof module !== 'undefined') {
  module.exports = { LOVEVILLAIN_QUESTIONS, LOVEVILLAIN_TYPES, LOVEVILLAIN_LEVELS, LOVEVILLAIN_COMBOS, loveVillainLevel, getLoveVillainCombo, calcLoveVillain, loveVillainHash };
}
