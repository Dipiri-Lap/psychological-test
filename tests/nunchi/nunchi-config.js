// nunchi-config.js — 남 눈치 테스트
// 의존: nunchi_test.js (NUNCHI_QUESTIONS, NUNCHI_COMPONENTS, NUNCHI_GRADES, calcNunchiScore)

window.TEST_CONFIGS = window.TEST_CONFIGS || {};

const _NUNCHI_GRADE_BG = {
  FREE:   "#EAF3EC",
  AWARE:  "#EAF1F7",
  EMPATH: "#FBF8E5",
  EXPERT: "#FBF0E5",
  ULTRA:  "#F2EAF6"
};

window.TEST_CONFIGS['nunchi'] = {
  data: {
    title: "남 눈치 테스트",
    emoji: "👀",
    thumb: "images/nunchi/thumb.webp",
    subtitle: "나의 눈치 지수를 5가지 성분으로 분석합니다 (20문항)",
    questions: NUNCHI_QUESTIONS.map(q => ({
      q: q.emoji + ' ' + q.question,
      choices: q.choices.map(c => ({
        text: c.text,
        _score: c.score,
        score: { _: 0 }
      }))
    })),
    results: Object.fromEntries(
      Object.entries(NUNCHI_GRADES).map(([k, v]) => [k, {
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
    const result = calcNunchiScore(state.answersRaw);
    const info = result.gradeInfo;
    return {
      winner: result.grade,
      type: info.emoji + ' ' + info.name,
      emoji: info.emoji,
      tagline: info.tagline,
      desc: info.desc,
      percentages: result.percentages,
      totalPct: result.totalPct,
      mainComponent: result.mainComponent,
      mainComponentInfo: result.mainComponentInfo
    };
  },

  getShareImage(winner) {
    const map = { FREE: 0, AWARE: 1, EMPATH: 2, EXPERT: 3, ULTRA: 4 };
    return `images/nunchi/${map[winner] ?? 0}.webp`;
  },

  afterResult(result) {
    const container = document.getElementById('nunchiStats');
    if (!container) return;

    const bg = _NUNCHI_GRADE_BG[result.winner] || '#F5F5F5';
    const sorted = Object.entries(result.percentages).sort((a, b) => b[1] - a[1]);

    const rows = sorted.map(([key, pct]) => {
      const info = NUNCHI_COMPONENTS[key];
      const isMain = key === result.mainComponent;
      return `
        <div class="nunchi-comp-row${isMain ? ' nunchi-comp-row-main' : ''}">
          <div class="nunchi-comp-dot" style="background:${info.color}"></div>
          <div class="nunchi-comp-body">
            <div class="nunchi-comp-top">
              <span class="nunchi-comp-name">${info.name}${isMain ? ' ★' : ''}</span>
              <span class="nunchi-comp-pct" style="color:${info.color}">${pct}%</span>
            </div>
            <div class="nunchi-comp-desc">${info.desc}</div>
            <div class="nunchi-comp-bar-track">
              <div class="nunchi-comp-bar-fill" style="width:${pct}%; background:${info.color}"></div>
            </div>
          </div>
        </div>
      `;
    }).join('');

    container.innerHTML = `
      <div class="nunchi-chart-title">눈치 성분 분석표</div>
      <div class="nunchi-total-row">
        <span class="nunchi-total-label">총 눈치 지수</span>
        <span class="nunchi-total-pct">${result.totalPct}%</span>
      </div>
      <div class="nunchi-bar-track"><div class="nunchi-bar-fill" style="width:${result.totalPct}%"></div></div>
      <div class="nunchi-grade-banner" style="background:${bg}">
        <span class="nunchi-grade-emoji">${result.emoji}</span>
        <div>
          <div class="nunchi-grade-name">${NUNCHI_GRADES[result.winner] ? NUNCHI_GRADES[result.winner].name : result.type}</div>
          <div class="nunchi-grade-tagline">${result.tagline}</div>
        </div>
      </div>
      ${rows}
      <div class="nunchi-footer">주성분: <b>${result.mainComponentInfo.emoji} ${result.mainComponent}</b> — ${result.mainComponentInfo.example}</div>
    `;
    container.style.display = 'block';
  }
};
