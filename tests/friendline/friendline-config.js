// friendline-config.js — 남사친 여사친, 어디까지 친구야?
// 의존: friendline-test.js (FRIENDLINE_QUESTIONS, FRIENDLINE_AREAS, FRIENDLINE_LEVELS, calcFriendLine)

window.TEST_CONFIGS = window.TEST_CONFIGS || {};

const _FL_LEVEL_BG = {
  CLEAR:  "#EAF3EC",
  SAFE:   "#E7F4F1",
  GRAY:   "#FBF3E5",
  RISK:   "#FBF0E5",
  ALMOST: "#FBE9E7"
};

const _FL_VERDICT_COLOR = {
  "무죄": "#2ECC71",
  "의심": "#F39C12",
  "유죄": "#C0392B"
};

window.TEST_CONFIGS['friendline'] = {
  data: {
    title: "남사친 여사친, 어디까지 친구야?",
    shareTag: "남사친 여사친 테스트",
    emoji: "👫",
    thumb: "images/friendline/thumb.webp",
    subtitle: "내 이성 친구 관계, 애인이 보면 괜찮을까? (15문항)",
    questions: FRIENDLINE_QUESTIONS.map(q => ({
      q: q.emoji + ' ' + q.question,
      choices: q.choices.map(c => ({
        text: c.text,
        _score: c.score,
        score: { _: 0 }
      }))
    })),
    results: Object.fromEntries(
      Object.entries(FRIENDLINE_LEVELS).map(([k, v]) => [k, {
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
    const result = calcFriendLine(state.answersRaw);
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
      verdict: result.verdict,
      badge: info.badge,
      color: info.color,
      areaScores: result.areaScores,
      safestArea: result.safestArea,
      riskiestArea: result.riskiestArea
    };
  },

  getShareImage(winner) {
    const map = { CLEAR: 0, SAFE: 1, GRAY: 2, RISK: 3, ALMOST: 4 };
    return `images/friendline/${map[winner] ?? 0}.webp`;
  },

  afterResult(result) {
    const container = document.getElementById('friendlineStats');
    if (!container) return;

    const bg = _FL_LEVEL_BG[result.winner] || '#F5F5F5';
    const barColor = result.color || '#E85D75';
    const levelName = FRIENDLINE_LEVELS[result.winner]?.name || result.type;
    const vColor = _FL_VERDICT_COLOR[result.verdict] || barColor;

    const areaRows = Object.entries(result.areaScores || {}).map(([key, v]) => {
      const area = FRIENDLINE_AREAS[key];
      if (!area) return '';
      const label = v.percentage <= 33 ? '안전'
                  : v.percentage <= 66 ? '주의'
                  : '위험';
      return `
        <div class="fl-area">
          <div class="fl-area-top">
            <span class="fl-area-name">${area.emoji} ${area.name}</span>
            <span class="fl-area-tag" style="color:${area.color}">${label} · ${v.score}/${v.max}점</span>
          </div>
          <div class="fl-area-desc">${area.desc}</div>
          <div class="fl-area-track"><div class="fl-area-fill" style="width:${v.percentage}%; background:${area.color}"></div></div>
        </div>`;
    }).join('');

    const safe = FRIENDLINE_AREAS[result.safestArea];
    const risk = FRIENDLINE_AREAS[result.riskiestArea];
    const summary = (safe && risk && result.safestArea !== result.riskiestArea)
      ? `<div class="fl-footer">가장 깔끔한 영역은 <b>${safe.emoji} ${safe.name}</b>,
           가장 위험한 영역은 <b>${risk.emoji} ${risk.name}</b>입니다.</div>`
      : `<div class="fl-footer">모든 영역이 <b>비슷한 수준</b>으로 나왔습니다.</div>`;

    container.innerHTML = `
      <div class="fl-chart-title">애인 눈으로 본 판정 결과</div>

      <div class="fl-verdict" style="border-color:${vColor}">
        <div class="fl-verdict-stamp" style="color:${vColor}; border-color:${vColor}">${result.verdict}</div>
        <div class="fl-verdict-body">
          <div class="fl-verdict-label">위험도</div>
          <div class="fl-verdict-pct" style="color:${vColor}">${result.percentage}<span>%</span></div>
        </div>
      </div>

      <div class="fl-bar-track"><div class="fl-bar-fill" style="width:${result.percentage}%; background:${barColor}"></div></div>
      <div class="fl-scale"><span>진짜 친구</span><span>친구 아님</span></div>

      <div class="fl-total-row">
        <span class="fl-total-label">누적 점수</span>
        <span class="fl-total-score" style="color:${barColor}">${result.totalScore}<span class="fl-total-max"> / ${result.maxScore}점</span></span>
      </div>

      <div class="fl-grade-banner" style="background:${bg}">
        <span class="fl-grade-emoji">${result.emoji}</span>
        <div>
          <div class="fl-grade-name">${levelName}</div>
          <div class="fl-grade-tagline">${result.tagline}</div>
        </div>
      </div>

      <div class="fl-area-title">영역별 위험도</div>
      ${areaRows}
      ${summary}
      <div class="fl-badge">${result.badge}</div>
    `;
    container.style.display = 'block';
  }
};
