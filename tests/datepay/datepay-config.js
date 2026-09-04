// datepay-config.js — 데이트 비용, 누가 더 내야 해? 연애 지갑 테스트
// 의존: datepay-test.js (DATEPAY_QUESTIONS, DATEPAY_AREAS, DATEPAY_LEVELS, calcDatePay)

window.TEST_CONFIGS = window.TEST_CONFIGS || {};

const _DP_LEVEL_BG = {
  CALC:  "#E9F1FA",
  FAIR:  "#E7F4F1",
  FLOW:  "#FBF3E5",
  GIVER: "#FBF0E5",
  ALLIN: "#FBE9E7"
};

window.TEST_CONFIGS['datepay'] = {
  data: {
    title: "데이트 비용, 누가 더 내야 해? 연애 지갑 테스트",
    shareTag: "연애 지갑 테스트",
    emoji: "💳",
    thumb: "images/datepay/thumb.webp",
    subtitle: "내 연애 지갑은 몇 대 몇으로 맞춰져 있을까? (15문항)",
    questions: DATEPAY_QUESTIONS.map(q => ({
      q: q.emoji + ' ' + q.question,
      choices: q.choices.map(c => ({
        text: c.text,
        _score: c.score,
        score: { _: 0 }
      }))
    })),
    results: Object.fromEntries(
      Object.entries(DATEPAY_LEVELS).map(([k, v]) => [k, {
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
    const result = calcDatePay(state.answersRaw);
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
      myShare: result.myShare,
      badge: info.badge,
      color: info.color,
      areaScores: result.areaScores,
      strictestArea: result.strictestArea,
      loosestArea: result.loosestArea
    };
  },

  getShareImage(winner) {
    const map = { CALC: 0, FAIR: 1, FLOW: 2, GIVER: 3, ALLIN: 4 };
    return `images/datepay/${map[winner] ?? 0}.webp`;
  },

  afterResult(result) {
    const container = document.getElementById('datepayStats');
    if (!container) return;

    const bg = _DP_LEVEL_BG[result.winner] || '#F5F5F5';
    const barColor = result.color || '#E85D75';
    const levelName = DATEPAY_LEVELS[result.winner]?.name || result.type;
    const mine = result.myShare;
    const yours = 100 - mine;

    const areaRows = Object.entries(result.areaScores || {}).map(([key, v]) => {
      const area = DATEPAY_AREAS[key];
      if (!area) return '';
      const label = v.percentage <= 33 ? '반반'
                  : v.percentage <= 66 ? '조금 더'
                  : '내가 다';
      return `
        <div class="dp-area">
          <div class="dp-area-top">
            <span class="dp-area-name">${area.emoji} ${area.name}</span>
            <span class="dp-area-tag" style="color:${area.color}">${label} · ${v.score}/${v.max}점</span>
          </div>
          <div class="dp-area-desc">${area.desc}</div>
          <div class="dp-area-track"><div class="dp-area-fill" style="width:${v.percentage}%; background:${area.color}"></div></div>
        </div>`;
    }).join('');

    const strict = DATEPAY_AREAS[result.strictestArea];
    const loose  = DATEPAY_AREAS[result.loosestArea];
    const summary = (strict && loose && result.strictestArea !== result.loosestArea)
      ? `<div class="dp-footer">가장 칼같이 나누는 영역은 <b>${strict.emoji} ${strict.name}</b>,
           가장 후하게 쓰는 영역은 <b>${loose.emoji} ${loose.name}</b>입니다.</div>`
      : `<div class="dp-footer">모든 영역에서 <b>비슷한 기준</b>으로 지갑을 열고 있습니다.</div>`;

    container.innerHTML = `
      <div class="dp-chart-title">나의 연애 지갑 분석표</div>

      <div class="dp-split">
        <div class="dp-split-head">
          <span class="dp-split-me" style="color:${barColor}">나 ${mine}%</span>
          <span class="dp-split-you">상대 ${yours}%</span>
        </div>
        <div class="dp-split-track">
          <div class="dp-split-fill" style="width:${mine}%; background:${barColor}"></div>
        </div>
        <div class="dp-scale"><span>철저한 N빵</span><span>내가 전부</span></div>
      </div>

      <div class="dp-total-row">
        <span class="dp-total-label">지갑 개방 지수</span>
        <span class="dp-total-score" style="color:${barColor}">${result.totalScore}<span class="dp-total-max"> / ${result.maxScore}점</span></span>
      </div>

      <div class="dp-grade-banner" style="background:${bg}">
        <span class="dp-grade-emoji">${result.emoji}</span>
        <div>
          <div class="dp-grade-name">${levelName}</div>
          <div class="dp-grade-tagline">${result.tagline}</div>
        </div>
      </div>

      <div class="dp-area-title">영역별 부담 비중</div>
      ${areaRows}
      ${summary}
      <div class="dp-badge">${result.badge}</div>
    `;
    container.style.display = 'block';
  }
};
