// reunion-config.js — 우리 다시 만날 수 있을까? 재회 가능성 테스트
// 의존: reunion-test.js (REUNION_QUESTIONS, REUNION_AREAS, REUNION_LEVELS, REUNION_LIGHTS, calcReunion)

window.TEST_CONFIGS = window.TEST_CONFIGS || {};

const _RN_LEVEL_BG = {
  NONE:   "#EEF0F1",
  MAYBE:  "#EEF0F1",
  LIKELY: "#FBF3E5",
  STRONG: "#FBEBEE",
  ALMOST: "#FBE9E7"
};

window.TEST_CONFIGS['reunion'] = {
  data: {
    title: "우리 다시 만날 수 있을까? 재회 가능성 테스트",
    shareTag: "재회 가능성 테스트",
    emoji: "🕊️",
    thumb: "images/reunion/thumb.webp",
    subtitle: "15가지 신호로 재회 확률을 계산합니다 (15문항)",
    questions: REUNION_QUESTIONS.map(q => ({
      q: q.emoji + ' ' + q.question,
      choices: q.choices.map(c => ({
        text: c.text,
        _score: c.score,
        score: { _: 0 }
      }))
    })),
    results: Object.fromEntries(
      Object.entries(REUNION_LEVELS).map(([k, v]) => [k, {
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
    const result = calcReunion(state.answersRaw);
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
      probability: result.probability,
      light: result.light,
      action: result.action,
      advice: result.advice,
      badge: info.badge,
      color: info.color,
      areaScores: result.areaScores,
      weakestArea: result.weakestArea,
      strongestArea: result.strongestArea
    };
  },

  getShareImage(winner) {
    const map = { NONE: 0, MAYBE: 1, LIKELY: 2, STRONG: 3, ALMOST: 4 };
    return `images/reunion/${map[winner] ?? 0}.webp`;
  },

  afterResult(result) {
    const container = document.getElementById('reunionStats');
    if (!container) return;

    const bg = _RN_LEVEL_BG[result.winner] || '#F5F5F5';
    const barColor = result.color || '#E85D75';
    const levelName = REUNION_LEVELS[result.winner]?.name || result.type;
    const prob = result.probability;
    const light = result.light || { emoji: '🟡', text: '' };

    const areaRows = Object.entries(result.areaScores || {}).map(([key, v]) => {
      const area = REUNION_AREAS[key];
      if (!area) return '';
      const label = v.percentage <= 33 ? '약함'
                  : v.percentage <= 66 ? '보통'
                  : '강함';
      return `
        <div class="rn-area">
          <div class="rn-area-top">
            <span class="rn-area-name">${area.emoji} ${area.name}</span>
            <span class="rn-area-tag" style="color:${area.color}">${label} · ${v.score}/${v.max}점</span>
          </div>
          <div class="rn-area-desc">${area.desc}</div>
          <div class="rn-area-track"><div class="rn-area-fill" style="width:${v.percentage}%; background:${area.color}"></div></div>
        </div>`;
    }).join('');

    const weak   = REUNION_AREAS[result.weakestArea];
    const strong = REUNION_AREAS[result.strongestArea];
    const summary = (weak && strong && result.weakestArea !== result.strongestArea)
      ? `<div class="rn-footer">가장 강한 신호는 <b>${strong.emoji} ${strong.name}</b>,
           가장 약한 신호는 <b>${weak.emoji} ${weak.name}</b>입니다.</div>`
      : `<div class="rn-footer">모든 신호가 <b>비슷한 세기</b>로 나왔습니다.</div>`;

    container.innerHTML = `
      <div class="rn-chart-title">재회 판독 결과</div>

      <div class="rn-gauge-wrap">
        <div class="rn-gauge" style="background: conic-gradient(${barColor} 0% ${prob}%, var(--c-surf2) ${prob}% 100%)">
          <div class="rn-gauge-hole">
            <div class="rn-gauge-num" style="color:${barColor}">${prob}<span>%</span></div>
            <div class="rn-gauge-cap">재회 확률</div>
          </div>
        </div>
      </div>

      <div class="rn-light" style="background:${bg}">
        <span class="rn-light-emoji">${light.emoji}</span>
        <div class="rn-light-body">
          <div class="rn-light-action">${result.action}</div>
          <div class="rn-light-advice">${result.advice}</div>
        </div>
      </div>

      <div class="rn-grade-banner" style="background:${bg}">
        <span class="rn-grade-emoji">${result.emoji}</span>
        <div>
          <div class="rn-grade-name">${levelName}</div>
          <div class="rn-grade-tagline">${result.tagline}</div>
        </div>
      </div>

      <div class="rn-area-title">신호별 세기 <span class="rn-area-score">${result.totalScore} / ${result.maxScore}점</span></div>
      ${areaRows}
      ${summary}
      <div class="rn-badge">${result.badge}</div>
    `;
    container.style.display = 'block';
  }
};
