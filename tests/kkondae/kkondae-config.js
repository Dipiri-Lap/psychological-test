// kkondae-config.js — 꼰대 성분 분석표 테스트
// 의존: kkondae-test.js (KKONDAE_QUESTIONS, KKONDAE_COMPONENTS, KKONDAE_GRADES, calcKkondae)

window.TEST_CONFIGS = window.TEST_CONFIGS || {};

window.TEST_CONFIGS['kkondae'] = {
  data: {
    title: "꼰대 성분 분석표",
    emoji: "👴",
    thumb: "images/kkondae/thumb.webp",
    subtitle: "나의 꼰대 지수를 6가지 성분으로 분석합니다 (12문항)",
    questions: KKONDAE_QUESTIONS.map(q => ({
      q: q.emoji + ' ' + q.question,
      choices: q.choices.map(c => ({
        text: c.text,
        _score: c.score,
        score: { _: 0 }
      }))
    })),
    results: Object.fromEntries(
      Object.entries(KKONDAE_GRADES).map(([k, v]) => [k, {
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
    const result = calcKkondae(state.answersRaw);
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

  afterResult(result) {
    const container = document.getElementById('kkondaeStats');
    if (!container) return;

    const components = ['고집', '훈계', '향수', '선긋기', '서열', '과거영광'];
    const rows = components.map(key => {
      const info = KKONDAE_COMPONENTS[key];
      const pct = result.percentages[key];
      const isMain = key === result.mainComponent;
      return `
        <div class="kkondae-row${isMain ? ' kkondae-row-main' : ''}">
          <div class="kkondae-row-label">
            <span class="kkondae-row-emoji">${info.emoji}</span>
            <div class="kkondae-row-info">
              <span class="kkondae-row-name">${info.name}${isMain ? ' ★' : ''}</span>
              <span class="kkondae-row-desc">${info.desc}</span>
            </div>
          </div>
          <div class="kkondae-bar-wrap">
            <div class="kkondae-bar" style="width:${pct}%; background:${info.color}"></div>
          </div>
          <div class="kkondae-pct" style="color:${info.color}">${pct}%</div>
        </div>
      `;
    }).join('');

    container.innerHTML = `
      <div class="kkondae-chart-title">꼰대 성분 분석표</div>
      <div class="kkondae-total-row">
        <span>총 꼰대 지수</span>
        <span class="kkondae-total-pct">${result.totalPct}%</span>
      </div>
      <div class="kkondae-divider"></div>
      ${rows}
      <div class="kkondae-footer">주성분: ${result.mainComponentInfo.emoji} ${result.mainComponent} — ${result.mainComponentInfo.example}</div>
    `;
    container.style.display = 'block';
  },

  getShareImage(winner) {
    const map = { PURE: 0, MILD: 1, MODERATE: 2, HIGH: 3, MASTER: 4 };
    return `images/kkondae/${map[winner] ?? 0}.webp`;
  }
};
