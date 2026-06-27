// mbti-dependency-config.js — MBTI 의존도 테스트
// 의존: mbti_dependency_test.js (MBTI_QUESTIONS, MBTI_COMPONENTS, MBTI_GRADES, calcMbtiDependency)

window.TEST_CONFIGS = window.TEST_CONFIGS || {};

const _MBTI_DEP_GRADE_BG = {
  FREE:     "#EAF3EC",
  CASUAL:   "#EAF1F7",
  MODERATE: "#FBF3E5",
  HIGH:     "#FBEBE9",
  ULTRA:    "#F2EAF6"
};

window.TEST_CONFIGS['mbtidep'] = {
  data: {
    title: "MBTI 의존도 테스트",
    emoji: "🔮",
    thumb: "images/mbti_dependency_test/thumb.webp",
    subtitle: "나의 MBTI 의존도를 5가지 성분으로 분석합니다 (12문항)",
    questions: MBTI_QUESTIONS.map(q => ({
      q: q.emoji + ' ' + q.question,
      choices: q.choices.map(c => ({
        text: c.text,
        _score: c.score,
        score: { _: 0 }
      }))
    })),
    results: Object.fromEntries(
      Object.entries(MBTI_GRADES).map(([k, v]) => [k, {
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
    const result = calcMbtiDependency(state.answersRaw);
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
    const map = { FREE: 0, CASUAL: 1, MODERATE: 2, HIGH: 3, ULTRA: 4 };
    return `images/mbti_dependency_test/${map[winner] ?? 0}.webp`;
  },

  afterResult(result) {
    const container = document.getElementById('mbtidepStats');
    if (!container) return;

    const bg = _MBTI_DEP_GRADE_BG[result.winner] || '#F5F5F5';
    const sorted = Object.entries(result.percentages).sort((a, b) => b[1] - a[1]);

    const rows = sorted.map(([key, pct]) => {
      const info = MBTI_COMPONENTS[key];
      const isMain = key === result.mainComponent;
      return `
        <div class="mbtidep-comp-row${isMain ? ' mbtidep-comp-row-main' : ''}">
          <div class="mbtidep-comp-dot" style="background:${info.color}"></div>
          <div class="mbtidep-comp-body">
            <div class="mbtidep-comp-top">
              <span class="mbtidep-comp-name">${info.name}${isMain ? ' ★' : ''}</span>
              <span class="mbtidep-comp-pct" style="color:${info.color}">${pct}%</span>
            </div>
            <div class="mbtidep-comp-desc">${info.desc}</div>
            <div class="mbtidep-comp-bar-track">
              <div class="mbtidep-comp-bar-fill" style="width:${pct}%; background:${info.color}"></div>
            </div>
          </div>
        </div>
      `;
    }).join('');

    container.innerHTML = `
      <div class="mbtidep-chart-title">MBTI 의존도 분석표</div>
      <div class="mbtidep-total-row">
        <span class="mbtidep-total-label">총 의존 지수</span>
        <span class="mbtidep-total-pct">${result.totalPct}%</span>
      </div>
      <div class="mbtidep-bar-track"><div class="mbtidep-bar-fill" style="width:${result.totalPct}%"></div></div>
      <div class="mbtidep-grade-banner" style="background:${bg}">
        <span class="mbtidep-grade-emoji">${result.emoji}</span>
        <div>
          <div class="mbtidep-grade-name">${MBTI_GRADES[result.winner] ? MBTI_GRADES[result.winner].name : result.type}</div>
          <div class="mbtidep-grade-tagline">${result.tagline}</div>
        </div>
      </div>
      ${rows}
      <div class="mbtidep-footer">주성분: <b>${result.mainComponentInfo.emoji} ${result.mainComponent}</b> — ${result.mainComponentInfo.example}</div>
    `;
    container.style.display = 'block';
  }
};
