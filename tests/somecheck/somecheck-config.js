// somecheck-config.js — 이거 썸이야, 아니야? 썸 판독기
// 의존: somecheck-test.js (SOME_QUESTIONS, SOME_AREAS, SOME_LEVELS, SOME_LIGHTS, calcSome)

window.TEST_CONFIGS = window.TEST_CONFIGS || {};

const _SM_LEVEL_BG = {
  NONE:   "#EEF0F1",
  MAYBE:  "#E7F4F1",
  LIKELY: "#FBF3E5",
  STRONG: "#FBEBEE",
  ALMOST: "#FBE9E7"
};

window.TEST_CONFIGS['somecheck'] = {
  data: {
    title: "이거 썸이야, 아니야? 썸 판독기",
    shareTag: "썸 판독기",
    emoji: "💘",
    thumb: "images/somecheck/thumb.webp",
    subtitle: "상대의 신호 15개로 썸 확률을 계산합니다 (15문항)",
    questions: SOME_QUESTIONS.map(q => ({
      q: q.emoji + ' ' + q.question,
      choices: q.choices.map(c => ({
        text: c.text,
        _score: c.score,
        score: { _: 0 }
      }))
    })),
    results: Object.fromEntries(
      Object.entries(SOME_LEVELS).map(([k, v]) => [k, {
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
    const result = calcSome(state.answersRaw);
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
    return `images/somecheck/${map[winner] ?? 0}.webp`;
  },

  afterResult(result) {
    const container = document.getElementById('somecheckStats');
    if (!container) return;

    const bg = _SM_LEVEL_BG[result.winner] || '#F5F5F5';
    const barColor = result.color || '#E85D75';
    const levelName = SOME_LEVELS[result.winner]?.name || result.type;
    const prob = result.probability;
    const light = result.light || { emoji: '🟡', text: '' };

    const areaRows = Object.entries(result.areaScores || {}).map(([key, v]) => {
      const area = SOME_AREAS[key];
      if (!area) return '';
      const label = v.percentage <= 33 ? '약함'
                  : v.percentage <= 66 ? '보통'
                  : '강함';
      return `
        <div class="sm-area">
          <div class="sm-area-top">
            <span class="sm-area-name">${area.emoji} ${area.name}</span>
            <span class="sm-area-tag" style="color:${area.color}">${label} · ${v.score}/${v.max}점</span>
          </div>
          <div class="sm-area-desc">${area.desc}</div>
          <div class="sm-area-track"><div class="sm-area-fill" style="width:${v.percentage}%; background:${area.color}"></div></div>
        </div>`;
    }).join('');

    const weak   = SOME_AREAS[result.weakestArea];
    const strong = SOME_AREAS[result.strongestArea];
    const summary = (weak && strong && result.weakestArea !== result.strongestArea)
      ? `<div class="sm-footer">가장 강한 신호는 <b>${strong.emoji} ${strong.name}</b>,
           가장 약한 신호는 <b>${weak.emoji} ${weak.name}</b>입니다.</div>`
      : `<div class="sm-footer">모든 신호가 <b>비슷한 세기</b>로 나왔습니다.</div>`;

    container.innerHTML = `
      <div class="sm-chart-title">썸 판독 결과</div>

      <div class="sm-gauge-wrap">
        <div class="sm-gauge" style="background: conic-gradient(${barColor} 0% ${prob}%, var(--c-surf2) ${prob}% 100%)">
          <div class="sm-gauge-hole">
            <div class="sm-gauge-num" style="color:${barColor}">${prob}<span>%</span></div>
            <div class="sm-gauge-cap">썸 확률</div>
          </div>
        </div>
      </div>

      <div class="sm-light" style="background:${bg}">
        <span class="sm-light-emoji">${light.emoji}</span>
        <div class="sm-light-body">
          <div class="sm-light-action">${result.action}</div>
          <div class="sm-light-advice">${result.advice}</div>
        </div>
      </div>

      <div class="sm-grade-banner" style="background:${bg}">
        <span class="sm-grade-emoji">${result.emoji}</span>
        <div>
          <div class="sm-grade-name">${levelName}</div>
          <div class="sm-grade-tagline">${result.tagline}</div>
        </div>
      </div>

      <div class="sm-area-title">신호별 세기 <span class="sm-area-score">${result.totalScore} / ${result.maxScore}점</span></div>
      ${areaRows}
      ${summary}
      <div class="sm-badge">${result.badge}</div>
    `;
    container.style.display = 'block';
  }
};
