// blackhistory-config.js — 흑역사 보유량 테스트
// 의존: blackhistory-test.js (BLACKHISTORY_QUESTIONS, BLACKHISTORY_LEVELS, calcBlackHistory)

window.TEST_CONFIGS = window.TEST_CONFIGS || {};

const _BH_LEVEL_BG = {
  CLEAN:    "#EAF3EC",
  MILD:     "#FBF8E5",
  MODERATE: "#FBF0E5",
  HIGH:     "#FBEBE9",
  MASTER:   "#F2EAF6"
};

window.TEST_CONFIGS['blackhistory'] = {
  data: {
    title: "흑역사 보유량 테스트",
    emoji: "🌑",
    thumb: "images/blackhistory/thumb.webp",
    subtitle: "내 과거의 흑역사 보유량을 정밀 측정합니다 (15문항)",
    questions: BLACKHISTORY_QUESTIONS.map(q => ({
      q: q.emoji + ' ' + q.question,
      choices: q.choices.map(c => ({
        text: c.text,
        _score: c.score,
        score: { _: 0 }
      }))
    })),
    results: Object.fromEntries(
      Object.entries(BLACKHISTORY_LEVELS).map(([k, v]) => [k, {
        type: v.emoji + ' ' + v.name,
        emoji: v.emoji,
        tagline: v.tagline,
        desc: v.desc
      }])
    )
  },

  onAnswer(choice, state) {
    state.answersRaw.push(choice._score);
  },

  calcResult(state) {
    const result = calcBlackHistory(state.answersRaw);
    const info = result.levelInfo;
    return {
      winner: result.levelKey,
      type: info.emoji + ' ' + info.name,
      emoji: info.emoji,
      tagline: info.tagline,
      desc: info.desc,
      totalScore: result.totalScore,
      maxScore: result.maxScore,
      percentage: result.percentage,
      badge: info.badge,
      color: info.color
    };
  },

  getShareImage(winner) {
    const map = { CLEAN: 0, MILD: 1, MODERATE: 2, HIGH: 3, MASTER: 4 };
    return `images/blackhistory/${map[winner] ?? 0}.webp`;
  },

  afterResult(result) {
    const container = document.getElementById('blackhistoryStats');
    if (!container) return;

    const bg = _BH_LEVEL_BG[result.winner] || '#F5F5F5';
    const barColor = result.color || '#8E44AD';
    const levelName = BLACKHISTORY_LEVELS[result.winner]?.name || result.type;

    container.innerHTML = `
      <div class="bh-chart-title">흑역사 보유량 분석표</div>
      <div class="bh-total-row">
        <span class="bh-total-label">흑역사 지수</span>
        <span class="bh-total-score" style="color:${barColor}">${result.totalScore}<span class="bh-total-max"> / ${result.maxScore}점</span></span>
      </div>
      <div class="bh-bar-track"><div class="bh-bar-fill" style="width:${result.percentage}%; background:${barColor}"></div></div>
      <div class="bh-grade-banner" style="background:${bg}">
        <span class="bh-grade-emoji">${result.emoji}</span>
        <div>
          <div class="bh-grade-name">${levelName}</div>
          <div class="bh-grade-tagline">${result.tagline}</div>
        </div>
      </div>
      <div class="bh-badge">${result.badge}</div>
    `;
    container.style.display = 'block';
  }
};
