// ai-config.js — AI 의존도 분석표 테스트
// 의존: ai_dependency_test.js (AI_QUESTIONS, AI_COMPONENTS, AI_GRADES, calcAiDependency)

window.TEST_CONFIGS = window.TEST_CONFIGS || {};

const _AI_GRADE_BG = {
  PURE:     "#EAF3EC",
  BALANCED: "#EAF1F7",
  LEANING:  "#FBF3E5",
  HIGH:     "#FBEBE9",
  MASTER:   "#F2EAF6"
};

window.TEST_CONFIGS['ai'] = {
  data: {
    title: "AI 의존도 분석표",
    emoji: "🤖",
    thumb: "images/ai/thumb.webp",
    subtitle: "나의 AI 의존도를 5가지 성분으로 분석합니다 (12문항)",
    questions: AI_QUESTIONS.map(q => ({
      q: q.emoji + ' ' + q.question,
      choices: q.choices.map(c => ({
        text: c.text,
        _score: c.score,
        score: { _: 0 }
      }))
    })),
    results: Object.fromEntries(
      Object.entries(AI_GRADES).map(([k, v]) => [k, {
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
    const result = calcAiDependency(state.answersRaw);
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
    const map = { PURE: 0, BALANCED: 1, LEANING: 2, HIGH: 3, MASTER: 4 };
    return `images/ai/${map[winner] ?? 0}.webp`;
  },

  afterResult(result) {
    const container = document.getElementById('aiStats');
    if (!container) return;

    const bg = _AI_GRADE_BG[result.winner] || '#F5F5F5';
    const sorted = Object.entries(result.percentages).sort((a, b) => b[1] - a[1]);

    const rows = sorted.map(([key, pct]) => {
      const info = AI_COMPONENTS[key];
      const isMain = key === result.mainComponent;
      return `
        <div class="ai-comp-row${isMain ? ' ai-comp-row-main' : ''}">
          <div class="ai-comp-dot" style="background:${info.color}"></div>
          <div class="ai-comp-body">
            <div class="ai-comp-top">
              <span class="ai-comp-name">${info.name}${isMain ? ' ★' : ''}</span>
              <span class="ai-comp-pct" style="color:${info.color}">${pct}%</span>
            </div>
            <div class="ai-comp-desc">${info.desc}</div>
            <div class="ai-comp-bar-track">
              <div class="ai-comp-bar-fill" style="width:${pct}%; background:${info.color}"></div>
            </div>
          </div>
        </div>
      `;
    }).join('');

    container.innerHTML = `
      <div class="ai-chart-title">AI 의존도 분석표</div>
      <div class="ai-total-row">
        <span class="ai-total-label">총 의존 지수</span>
        <span class="ai-total-pct">${result.totalPct}%</span>
      </div>
      <div class="ai-bar-track"><div class="ai-bar-fill" style="width:${result.totalPct}%"></div></div>
      <div class="ai-grade-banner" style="background:${bg}">
        <span class="ai-grade-emoji">${result.emoji}</span>
        <div>
          <div class="ai-grade-name">${AI_GRADES[result.winner] ? AI_GRADES[result.winner].name : result.type}</div>
          <div class="ai-grade-tagline">${result.tagline}</div>
        </div>
      </div>
      ${rows}
      <div class="ai-footer">주성분: <b>${result.mainComponentInfo.emoji} ${result.mainComponent}</b> — ${result.mainComponentInfo.example}</div>
    `;
    container.style.display = 'block';
  }
};
