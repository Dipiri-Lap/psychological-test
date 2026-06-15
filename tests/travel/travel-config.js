// travel-config.js — 여행 메이트 유형 테스트
// 의존: travel_compatibility_test.js (TRAVEL_QUESTIONS, TRAVEL_TYPES, TRAVEL_COMPATIBILITY, calcTravelType)

window.TEST_CONFIGS = window.TEST_CONFIGS || {};

window.TEST_CONFIGS['travel'] = {
  data: {
    title: "나의 여행 메이트 유형",
    emoji: "✈️",
    thumb: "images/travel/thumb.webp",
    subtitle: "12문항으로 알아보는 나의 여행 스타일과 동행 궁합",
    questions: TRAVEL_QUESTIONS.map(q => ({
      q: q.emoji + ' ' + q.question,
      choices: q.choices.map(c => ({
        text: c.text,
        _score: c.score,
        score: { _: 0 }
      }))
    })),
    results: Object.fromEntries(
      Object.entries(TRAVEL_TYPES).map(([k, v]) => [k, {
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
    const result = calcTravelType(state.answersRaw);
    const info = result.typeInfo;
    return {
      winner: result.typeCode,
      type: info.emoji + ' ' + info.name,
      emoji: info.emoji,
      tagline: info.tagline,
      desc: info.desc,
      percentages: result.percentages,
      keywords: info.keywords,
      bestMatch: info.bestMatch,
      toughMatch: info.toughMatch
    };
  },

  afterResult(result) {
    const container = document.getElementById('travelStats');
    if (!container) return;

    const { percentages, bestMatch, toughMatch, winner } = result;
    const bestInfo = TRAVEL_TYPES[bestMatch];
    const toughInfo = TRAVEL_TYPES[toughMatch];

    const pairKey = [winner, bestMatch].sort().join('_');
    const compatText = TRAVEL_COMPATIBILITY[pairKey] || '';

    const keywordBadges = (result.keywords || [])
      .map(k => `<span class="travel-keyword">${k}</span>`)
      .join('');

    const showTough = toughMatch && toughMatch !== bestMatch;
    const toughCompatKey = showTough ? [winner, toughMatch].sort().join('_') : null;
    const toughText = toughCompatKey ? (TRAVEL_COMPATIBILITY[toughCompatKey] || '') : '';

    const myInfo = TRAVEL_TYPES[winner];

    container.innerHTML = `
      <div class="travel-my-type">
        <div class="travel-my-label">나의 여행 유형</div>
        <div class="travel-my-name">
          <span class="travel-my-emoji">${myInfo.emoji}</span>
          ${myInfo.name}
        </div>
        ${keywordBadges ? `<div class="travel-keywords">${keywordBadges}</div>` : ''}
      </div>

      <div class="travel-chart-title">스타일 분석</div>
      <div class="travel-axis">
        <div class="travel-axis-header">
          <span>📋 계획형</span>
          <span>🎲 즉흥형</span>
        </div>
        <div class="travel-axis-track">
          <div class="travel-axis-fill" style="width:${percentages.계획}%"></div>
        </div>
        <div class="travel-axis-pcts">
          <span>${percentages.계획}%</span>
          <span>${percentages.즉흥}%</span>
        </div>
      </div>

      <div class="travel-axis">
        <div class="travel-axis-header">
          <span>🏃 활동형</span>
          <span>😴 휴식형</span>
        </div>
        <div class="travel-axis-track">
          <div class="travel-axis-fill" style="width:${percentages.활동}%"></div>
        </div>
        <div class="travel-axis-pcts">
          <span>${percentages.활동}%</span>
          <span>${percentages.휴식}%</span>
        </div>
      </div>

      <div class="travel-match-section">
        <div class="travel-match-label-row">✈️ 베스트 여행 동행</div>
        <div class="travel-match-type-row">
          <span class="travel-match-emoji">${bestInfo.emoji}</span>
          <span class="travel-match-name">${bestInfo.name}</span>
        </div>
        <p class="travel-match-desc">${compatText}</p>
      </div>

      ${showTough ? `
      <div class="travel-match-section travel-tough-section">
        <div class="travel-match-label-row">⚠️ 주의가 필요한 동행</div>
        <div class="travel-match-type-row">
          <span class="travel-match-emoji">${toughInfo.emoji}</span>
          <span class="travel-match-name">${toughInfo.name}</span>
        </div>
        <p class="travel-match-desc">${toughText}</p>
      </div>` : ''}
    `;
    container.style.display = 'block';
  },

  getShareImage(winner) {
    const map = { PLANNER: 0, CURATOR: 1, ADVENTURER: 2, WANDERER: 3 };
    return `images/travel/${map[winner] ?? 0}.webp`;
  }
};
