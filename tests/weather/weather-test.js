// ============================================
// 오늘 기분을 날씨로 표현하면?
// ============================================
// 구조: 질문 1개 → 선택지 6개 → 즉시 결과
// ============================================

const WEATHER_QUESTION = {
  id: 1,
  question: "오늘 당신의 기분을\n날씨로 표현한다면?",
  subtitle: "지금 이 순간 가장 가까운 걸 골라봐 🌤️",
  choices: [
    {
      id: "SUNNY",
      emoji: "☀️",
      label: "맑고 화창해",
      sub: "기분 좋고 에너지 넘쳐",
      color: "#F39C12",
      gradient: "linear-gradient(135deg, #F39C12, #F1C40F)"
    },
    {
      id: "CLOUDY",
      emoji: "⛅",
      label: "구름 조금 낀 맑음",
      sub: "나쁘진 않은데 뭔가 좀 걸려",
      color: "#95A5A6",
      gradient: "linear-gradient(135deg, #95A5A6, #BDC3C7)"
    },
    {
      id: "RAINY",
      emoji: "🌧️",
      label: "비 오는 날",
      sub: "축 처지고 감성적인 날",
      color: "#4A90D9",
      gradient: "linear-gradient(135deg, #4A90D9, #2980B9)"
    },
    {
      id: "STORMY",
      emoji: "⛈️",
      label: "천둥번개 폭풍",
      sub: "감정이 폭발할 것 같아",
      color: "#8E44AD",
      gradient: "linear-gradient(135deg, #8E44AD, #6C3483)"
    },
    {
      id: "FOGGY",
      emoji: "🌫️",
      label: "안개 낀 흐린 날",
      sub: "뭔가 멍하고 흐릿한 느낌",
      color: "#7F8C8D",
      gradient: "linear-gradient(135deg, #7F8C8D, #95A5A6)"
    },
    {
      id: "SNOWY",
      emoji: "❄️",
      label: "첫눈 오는 날",
      sub: "고요하고 감성 충만한 날",
      color: "#5DADE2",
      gradient: "linear-gradient(135deg, #5DADE2, #85C1E9)"
    }
  ]
};

// ============================================
// 6가지 날씨 결과
// ============================================

const WEATHER_TYPES = {
  SUNNY: {
    emoji: "☀️",
    weather: "맑고 화창한 날",
    name: "오늘 당신, 에너지 MAX",
    tagline: "이런 날이 계속됐으면 좋겠어.",
    color: "#F39C12",
    mood: [
      {
        title: "지금 컨디션이 최상이야",
        desc: "오늘 뭔가 잘 풀리는 느낌이지? 몸도 가볍고, 하고 싶은 것도 생기고, 사람들이랑 있어도 에너지가 빠지지 않아. 이런 날은 오래 기억해둬. 힘들 때 꺼내 쓸 수 있는 기억이 돼."
      },
      {
        title: "지금 이 기분, 주변에 나눠줘",
        desc: "당신이 맑으면 주변도 맑아져. 오늘처럼 에너지 넘치는 날에 연락 뜸했던 사람한테 먼저 연락해봐. 당신의 좋은 기운이 전달될 거야."
      },
      {
        title: "오늘 하고 싶었던 거 다 해",
        desc: "이런 컨디션은 자주 오지 않아. 미뤄뒀던 일, 하고 싶었던 것, 만나고 싶었던 사람 — 오늘이 딱 좋은 날이야."
      }
    ]
  },
  CLOUDY: {
    emoji: "⛅",
    weather: "구름 조금 낀 맑음",
    name: "나쁘진 않은데, 뭔가 찜찜해",
    tagline: "딱히 나쁜 건 아닌데 100%는 아닌 날.",
    color: "#95A5A6",
    mood: [
      {
        title: "뭔가 걸리는 게 있는 상태야",
        desc: "기분이 나쁜 건 아닌데 마음 한켠에 뭔가 걸려있는 느낌. 해결 안 된 일이 있거나, 신경 쓰이는 사람이 있거나, 아직 정리 안 된 감정이 남아있을 가능성이 높아."
      },
      {
        title: "오늘은 조용히 정리하는 날로 쓰면 좋아",
        desc: "구름 낀 날씨처럼 완전히 맑지는 않지만 비도 안 와. 대단한 일보다는 밀린 것들 조금씩 정리하고, 마음속에 걸린 것도 천천히 들여다보는 날이야."
      },
      {
        title: "이 기분 억지로 바꾸려 하지 마",
        desc: "억지로 '기분 좋아야 해'라고 강요하지 않아도 돼. 구름 낀 날도 나름의 매력이 있잖아. 이 애매한 기분 그대로 인정해줘."
      }
    ]
  },
  RAINY: {
    emoji: "🌧️",
    weather: "비 오는 날",
    name: "오늘은 좀 축 처지는 날",
    tagline: "비 오는 날엔 그냥 비 맞아도 돼.",
    color: "#4A90D9",
    mood: [
      {
        title: "감정이 많아지는 날이야",
        desc: "비 오는 날엔 이상하게 감성이 올라오잖아. 오래된 노래가 듣고 싶고, 연락하고 싶은 사람이 생기고, 괜히 눈물이 날 것 같은 날. 그 감정 억누르지 않아도 돼."
      },
      {
        title: "지금 좀 지쳐있는 거 맞아",
        desc: "비처럼 축 처진다는 건 몸이든 마음이든 지쳐있다는 신호야. 억지로 힘내려 하지 말고, 오늘만큼은 쉬어도 된다는 허락을 스스로한테 해줘."
      },
      {
        title: "비는 반드시 그치거든",
        desc: "비 오는 날이 영원히 계속된 적은 없어. 지금 이 감정도 마찬가지야. 오늘은 그냥 비 맞으면서 있어도 괜찮아. 내일은 또 달라."
      }
    ]
  },
  STORMY: {
    emoji: "⛈️",
    weather: "천둥번개 폭풍",
    name: "오늘 감정 폭발 직전",
    tagline: "건드리지 마. 나 지금 폭풍이야.",
    color: "#8E44AD",
    mood: [
      {
        title: "뭔가 크게 터질 것 같은 상태야",
        desc: "감정이 한계까지 쌓인 날이야. 작은 말 한마디에도 예민하게 반응하고, 혼자 있고 싶은데 외롭기도 한 복잡한 상태. 지금 네 감정은 충분히 이유가 있어."
      },
      {
        title: "지금 당장 뭔가 쏟아낼 구멍이 필요해",
        desc: "폭풍은 억누른다고 사라지지 않아. 운동이든, 소리 지르기든, 혼자 울든 — 지금 이 감정을 밖으로 꺼낼 방법을 찾아봐. 담아두면 더 힘들어."
      },
      {
        title: "폭풍 뒤에 가장 공기가 맑아",
        desc: "폭풍이 지나고 나면 언제 그랬냐는 듯 맑아지잖아. 지금 이 감정이 최고조라는 건 곧 지나간다는 뜻이기도 해. 오늘 하루만 버텨봐."
      }
    ]
  },
  FOGGY: {
    emoji: "🌫️",
    weather: "안개 낀 흐린 날",
    name: "오늘 멍하고 흐릿한 날",
    tagline: "뭘 해야 할지도 모르겠고, 어디 있는지도 모르겠어.",
    color: "#7F8C8D",
    mood: [
      {
        title: "지금 방향을 잃은 느낌이야",
        desc: "안개 속에서는 앞이 잘 보이지 않잖아. 지금 딱 그 상태야. 뭘 해야 할지 모르겠고, 감정도 명확하지 않고, 그냥 멍하게 있는 것 같은 날. 그것도 괜찮아."
      },
      {
        title: "무기력함이 찾아온 거야",
        desc: "안개 낀 날처럼 모든 게 흐릿하게 느껴지는 건 몸과 마음이 쉬고 싶다는 신호야. 억지로 뭔가 하려 하지 말고, 오늘은 그냥 존재하는 것만으로 충분해."
      },
      {
        title: "안개는 햇빛이 나오면 걷혀",
        desc: "지금 흐릿한 게 영원히 계속되지 않아. 작은 것 하나라도 — 따뜻한 음료, 짧은 산책, 좋아하는 음악 — 그게 안개를 걷어낼 첫 번째 햇빛이 될 수 있어."
      }
    ]
  },
  SNOWY: {
    emoji: "❄️",
    weather: "첫눈 오는 날",
    name: "오늘 고요하고 감성 충만",
    tagline: "세상이 잠시 멈춘 것 같은 날.",
    color: "#5DADE2",
    mood: [
      {
        title: "지금 내면이 조용하고 평화로운 상태야",
        desc: "첫눈처럼 모든 게 조용히 덮여있는 날이야. 복잡한 생각도 잠깐 멈추고, 그냥 지금 이 순간이 예쁘게 느껴지는 상태. 이런 날 오래 간직해."
      },
      {
        title: "감수성이 극에 달해있어",
        desc: "눈 오는 날에 음악이 더 잘 들리고, 글이 더 잘 써지고, 감정이 더 선명해지잖아. 지금 당신도 그런 상태야. 뭔가 만들고 싶거나 기록하고 싶은 마음이 들면 그냥 해봐."
      },
      {
        title: "혼자 있는 시간이 충전이 되는 날이야",
        desc: "첫눈 오는 날엔 혼자 창가에 앉아서 멍하니 보고 싶잖아. 오늘은 그래도 돼. 아무도 안 만나고, 아무것도 안 해도 되는 하루. 그게 지금 네가 필요한 거야."
      }
    ]
  }
};

// ============================================
// 결과 반환 함수
// ============================================

function getWeatherResult(weatherId) {
  return WEATHER_TYPES[weatherId] || null;
}

if (typeof module !== 'undefined') {
  module.exports = { WEATHER_QUESTION, WEATHER_TYPES, getWeatherResult };
}

// ============================================
// 러너 설정 등록
// ============================================

window.TEST_CONFIGS = window.TEST_CONFIGS || {};

window.TEST_CONFIGS['weather'] = {
  data: {
    title: "날씨 기분 테스트",
    emoji: "🌤️",
    thumb: "images/weather/thumb.webp",
    subtitle: "오늘 당신의 기분을 날씨로 표현한다면?",
    questions: [
      {
        q: WEATHER_QUESTION.question,
        subtitle: WEATHER_QUESTION.subtitle,
        choices: WEATHER_QUESTION.choices.map(c => ({
          text: c.label,
          emoji: c.emoji,
          sub: c.sub,
          id: c.id
        }))
      }
    ],
    results: WEATHER_TYPES
  },
  onAnswer(choice, state) {
    state.answersRaw.push(choice.id);
  },
  calcResult(state) {
    const winnerId = state.answersRaw[0];
    const t = WEATHER_TYPES[winnerId];
    // 여러 mood 텍스트를 하나로 합침
    const descText = t.mood.map(m => `<b>${m.title}</b><br>${m.desc}`).join('<br><br>');
    return { winner: winnerId, type: t.name, emoji: t.emoji, desc: descText, tagline: t.tagline };
  },
  getShareImage(winner) {
    const map = { SUNNY: "0", CLOUDY: "1", RAINY: "2", STORMY: "3", FOGGY: "4", SNOWY: "5" };
    return `images/weather/${map[winner]}.webp`;
  },
  getSaveFilename(winner) {
    const map = { SUNNY: "0", CLOUDY: "1", RAINY: "2", STORMY: "3", FOGGY: "4", SNOWY: "5" };
    return `WEATHER_${map[winner]}.webp`;
  }
};
