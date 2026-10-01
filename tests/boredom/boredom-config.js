// boredom-config.js — 우리 권태기일까? 권태기 진단 테스트
// 의존: boredom-test.js (BOREDOM_QUESTIONS, BOREDOM_AREAS, BOREDOM_LEVELS, calcBoredom)

window.TEST_CONFIGS = window.TEST_CONFIGS || {};

const _BD_LEVEL_BG = {
  FROZEN:  "#E9F1FA",
  COOL:    "#EEF3F6",
  MILD:    "#FBF3E5",
  WARM:    "#FBF0E5",
  BLAZING: "#FBE9E7"
};

window.TEST_CONFIGS['boredom'] = {
  data: {
    title: "우리 권태기일까? 권태기 진단 테스트",
    shareTag: "권태기 진단 테스트",
    emoji: "🌡️",
    thumb: "images/boredom/thumb.webp",
    subtitle: "설렘부터 미래 계획까지, 우리 관계의 온도는? (15문항)",
    questions: BOREDOM_QUESTIONS.map(q => ({
      q: q.emoji + ' ' + q.question,
      choices: q.choices.map(c => ({
        text: c.text,
        _score: c.score,
        score: { _: 0 }
      }))
    })),
    results: Object.fromEntries(
      Object.entries(BOREDOM_LEVELS).map(([k, v]) => [k, {
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
    const result = calcBoredom(state.answersRaw);
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
      temperature: result.temperature,
      badge: info.badge,
      color: info.color,
      areaScores: result.areaScores,
      coldestArea: result.coldestArea,
      warmestArea: result.warmestArea
    };
  },

  getShareImage(winner) {
    const map = { FROZEN: 0, COOL: 1, MILD: 2, WARM: 3, BLAZING: 4 };
    return `images/boredom/${map[winner] ?? 0}.webp`;
  },

  afterResult(result) {
    const container = document.getElementById('boredomStats');
    if (!container) return;

    const bg = _BD_LEVEL_BG[result.winner] || '#F5F5F5';
    const barColor = result.color || '#E85D75';
    const levelName = BOREDOM_LEVELS[result.winner]?.name || result.type;
    // 온도계 채움 높이: -10~45℃ 전체 구간을 0~100% 높이로 매핑
    const fillPct = Math.max(2, Math.min(100, Math.round(((result.temperature + 10) / 55) * 100)));

    const areaRows = Object.entries(result.areaScores || {}).map(([key, v]) => {
      const area = BOREDOM_AREAS[key];
      if (!area) return '';
      const label = v.percentage <= 33 ? '차가움'
                  : v.percentage <= 66 ? '보통'
                  : '따뜻함';
      return `
        <div class="bd-area">
          <div class="bd-area-top">
            <span class="bd-area-name">${area.emoji} ${area.name}</span>
            <span class="bd-area-tag" style="color:${area.color}">${label} · ${v.score}/${v.max}점</span>
          </div>
          <div class="bd-area-desc">${area.desc}</div>
          <div class="bd-area-track"><div class="bd-area-fill" style="width:${v.percentage}%; background:${area.color}"></div></div>
        </div>`;
    }).join('');

    const cold = BOREDOM_AREAS[result.coldestArea];
    const warm = BOREDOM_AREAS[result.warmestArea];
    const summary = (cold && warm && result.coldestArea !== result.warmestArea)
      ? `<div class="bd-footer">가장 따뜻한 영역은 <b>${warm.emoji} ${warm.name}</b>,
           가장 식은 영역은 <b>${cold.emoji} ${cold.name}</b>입니다.</div>`
      : `<div class="bd-footer">모든 영역이 <b>비슷한 온도</b>로 나왔습니다.</div>`;

    container.innerHTML = `
      <div class="bd-chart-title">우리 관계의 온도</div>

      <div class="bd-thermo-wrap">
        <div class="bd-thermo">
          <div class="bd-thermo-tube">
            <div class="bd-thermo-fill" style="height:${fillPct}%; background:${barColor}"></div>
          </div>
          <div class="bd-thermo-bulb" style="background:${barColor}"></div>
        </div>
        <div class="bd-thermo-readout">
          <div class="bd-thermo-num" style="color:${barColor}">${result.temperature}<span>℃</span></div>
          <div class="bd-thermo-cap">관계 온도</div>
        </div>
      </div>

      <div class="bd-grade-banner" style="background:${bg}">
        <span class="bd-grade-emoji">${result.emoji}</span>
        <div>
          <div class="bd-grade-name">${levelName}</div>
          <div class="bd-grade-tagline">${result.tagline}</div>
        </div>
      </div>

      <div class="bd-area-title">영역별 온도 <span class="bd-area-score">${result.totalScore} / ${result.maxScore}점</span></div>
      ${areaRows}
      ${summary}
      <div class="bd-badge">${result.badge}</div>
    `;
    container.style.display = 'block';
  }
};
