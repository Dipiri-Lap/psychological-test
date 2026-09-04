// cheatline-config.js — 어디까지 바람일까? 바람 기준선 테스트
// 의존: cheatline-test.js (CHEATLINE_QUESTIONS, CHEATLINE_AREAS, CHEATLINE_LEVELS, calcCheatLine)

window.TEST_CONFIGS = window.TEST_CONFIGS || {};

const _CL_LEVEL_BG = {
  BORDER:  "#FBE9E7",
  FIRM:    "#FBEBE9",
  BALANCE: "#FBF3E5",
  WIDE:    "#E9F1FA",
  OPEN:    "#F2EAF6"
};

window.TEST_CONFIGS['cheatline'] = {
  data: {
    title: "어디까지 바람일까? 바람 기준선 테스트",
    emoji: "🚧",
    thumb: "images/cheatline/thumb.webp",
    subtitle: "내가 생각하는 바람의 기준선은 어디일까? (15문항)",
    questions: CHEATLINE_QUESTIONS.map(q => ({
      q: q.emoji + ' ' + q.question,
      choices: q.choices.map(c => ({
        text: c.text,
        _score: c.score,
        score: { _: 0 }
      }))
    })),
    results: Object.fromEntries(
      Object.entries(CHEATLINE_LEVELS).map(([k, v]) => [k, {
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
    const result = calcCheatLine(state.answersRaw);
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
      color: info.color,
      areaScores: result.areaScores,
      strictestArea: result.strictestArea,
      loosestArea: result.loosestArea
    };
  },

  getShareImage(winner) {
    const map = { BORDER: 0, FIRM: 1, BALANCE: 2, WIDE: 3, OPEN: 4 };
    return `images/cheatline/${map[winner] ?? 0}.webp`;
  },

  afterResult(result) {
    const container = document.getElementById('cheatlineStats');
    if (!container) return;

    const bg = _CL_LEVEL_BG[result.winner] || '#F5F5F5';
    const barColor = result.color || '#E85D75';
    const levelName = CHEATLINE_LEVELS[result.winner]?.name || result.type;

    const areaRows = Object.entries(result.areaScores || {}).map(([key, v]) => {
      const area = CHEATLINE_AREAS[key];
      if (!area) return '';
      const label = v.percentage <= 33 ? '엄격'
                  : v.percentage <= 66 ? '보통'
                  : '관대';
      return `
        <div class="cl-area">
          <div class="cl-area-top">
            <span class="cl-area-name">${area.emoji} ${area.name}</span>
            <span class="cl-area-tag" style="color:${area.color}">${label} · ${v.score}/${v.max}점</span>
          </div>
          <div class="cl-area-desc">${area.desc}</div>
          <div class="cl-area-track"><div class="cl-area-fill" style="width:${v.percentage}%; background:${area.color}"></div></div>
        </div>`;
    }).join('');

    const strict = CHEATLINE_AREAS[result.strictestArea];
    const loose  = CHEATLINE_AREAS[result.loosestArea];
    const summary = (strict && loose && result.strictestArea !== result.loosestArea)
      ? `<div class="cl-footer">가장 예민한 영역은 <b>${strict.emoji} ${strict.name}</b>,
           가장 너그러운 영역은 <b>${loose.emoji} ${loose.name}</b>입니다.</div>`
      : `<div class="cl-footer">모든 영역에서 <b>비슷한 기준</b>을 유지하고 있습니다.</div>`;

    container.innerHTML = `
      <div class="cl-chart-title">나의 바람 기준선 분석표</div>
      <div class="cl-total-row">
        <span class="cl-total-label">허용 지수 (높을수록 관대)</span>
        <span class="cl-total-score" style="color:${barColor}">${result.totalScore}<span class="cl-total-max"> / ${result.maxScore}점</span></span>
      </div>
      <div class="cl-bar-track"><div class="cl-bar-fill" style="width:${result.percentage}%; background:${barColor}"></div></div>
      <div class="cl-scale"><span>철조망</span><span>수평선</span></div>
      <div class="cl-grade-banner" style="background:${bg}">
        <span class="cl-grade-emoji">${result.emoji}</span>
        <div>
          <div class="cl-grade-name">${levelName}</div>
          <div class="cl-grade-tagline">${result.tagline}</div>
        </div>
      </div>
      <div class="cl-area-title">영역별 허용 범위</div>
      ${areaRows}
      ${summary}
      <div class="cl-badge">${result.badge}</div>
    `;
    container.style.display = 'block';
  }
};
