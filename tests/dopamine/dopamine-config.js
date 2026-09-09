// dopamine-config.js — 숏폼 없이 몇 시간 버텨? 도파민 중독 테스트
// 의존: dopamine-test.js (DOPAMINE_QUESTIONS, DOPAMINE_AREAS, DOPAMINE_LEVELS, calcDopamine)

window.TEST_CONFIGS = window.TEST_CONFIGS || {};

const _DM_LEVEL_BG = {
  CLEAN:  "#EAF3EC",
  MILD:   "#E7F4F1",
  HOOKED: "#FBF3E5",
  HEAVY:  "#FBF0E5",
  FRIED:  "#FBE9E7"
};

window.TEST_CONFIGS['dopamine'] = {
  data: {
    title: "숏폼 없이 몇 시간 버텨? 도파민 중독 테스트",
    shareTag: "도파민 중독 테스트",
    emoji: "📱",
    thumb: "images/dopamine/thumb.webp",
    subtitle: "내 도파민 회로, 얼마나 짧아졌을까? (15문항)",
    questions: DOPAMINE_QUESTIONS.map(q => ({
      q: q.emoji + ' ' + q.question,
      choices: q.choices.map(c => ({
        text: c.text,
        _score: c.score,
        score: { _: 0 }
      }))
    })),
    results: Object.fromEntries(
      Object.entries(DOPAMINE_LEVELS).map(([k, v]) => [k, {
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
    const result = calcDopamine(state.answersRaw);
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
      endurance: result.endurance,
      badge: info.badge,
      color: info.color,
      areaScores: result.areaScores,
      bestArea: result.bestArea,
      worstArea: result.worstArea
    };
  },

  getShareImage(winner) {
    const map = { CLEAN: 0, MILD: 1, HOOKED: 2, HEAVY: 3, FRIED: 4 };
    return `images/dopamine/${map[winner] ?? 0}.webp`;
  },

  afterResult(result) {
    const container = document.getElementById('dopamineStats');
    if (!container) return;

    const bg = _DM_LEVEL_BG[result.winner] || '#F5F5F5';
    const barColor = result.color || '#E85D75';
    const levelName = DOPAMINE_LEVELS[result.winner]?.name || result.type;
    const end = result.endurance || { value: '?', unit: '', text: '?' };

    const areaRows = Object.entries(result.areaScores || {}).map(([key, v]) => {
      const area = DOPAMINE_AREAS[key];
      if (!area) return '';
      const label = v.percentage <= 33 ? '멀쩡'
                  : v.percentage <= 66 ? '주의'
                  : '심각';
      return `
        <div class="dm-area">
          <div class="dm-area-top">
            <span class="dm-area-name">${area.emoji} ${area.name}</span>
            <span class="dm-area-tag" style="color:${area.color}">${label} · ${v.score}/${v.max}점</span>
          </div>
          <div class="dm-area-desc">${area.desc}</div>
          <div class="dm-area-track"><div class="dm-area-fill" style="width:${v.percentage}%; background:${area.color}"></div></div>
        </div>`;
    }).join('');

    const best  = DOPAMINE_AREAS[result.bestArea];
    const worst = DOPAMINE_AREAS[result.worstArea];
    const summary = (best && worst && result.bestArea !== result.worstArea)
      ? `<div class="dm-footer">가장 멀쩡한 영역은 <b>${best.emoji} ${best.name}</b>,
           가장 망가진 영역은 <b>${worst.emoji} ${worst.name}</b>입니다.</div>`
      : `<div class="dm-footer">모든 영역이 <b>비슷한 수준</b>으로 나왔습니다.</div>`;

    container.innerHTML = `
      <div class="dm-chart-title">숏폼 없이 버틸 수 있는 시간</div>

      <div class="dm-endure" style="background:${bg}">
        <div class="dm-endure-num" style="color:${barColor}">${end.value}<span class="dm-endure-unit">${end.unit}</span></div>
        <div class="dm-endure-cap">추정 한계 시간</div>
      </div>

      <div class="dm-total-row">
        <span class="dm-total-label">도파민 중독 지수</span>
        <span class="dm-total-score" style="color:${barColor}">${result.percentage}<span class="dm-total-max">% · ${result.totalScore}/${result.maxScore}점</span></span>
      </div>
      <div class="dm-bar-track"><div class="dm-bar-fill" style="width:${result.percentage}%; background:${barColor}"></div></div>
      <div class="dm-scale"><span>청정</span><span>절임</span></div>

      <div class="dm-grade-banner" style="background:${bg}">
        <span class="dm-grade-emoji">${result.emoji}</span>
        <div>
          <div class="dm-grade-name">${levelName}</div>
          <div class="dm-grade-tagline">${result.tagline}</div>
        </div>
      </div>

      <div class="dm-area-title">영역별 손상도</div>
      ${areaRows}
      ${summary}
      <div class="dm-badge">${result.badge}</div>
    `;
    container.style.display = 'block';
  }
};
