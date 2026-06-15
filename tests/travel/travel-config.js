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

      <div class="travel-chart-title">두 축에서 어느 쪽에 가까운지 보여드려요</div>
      <div class="travel-axis">
        <div class="travel-axis-header">
          <span style="color:#4A90D9">📋 계획형 <strong>${percentages.계획}%</strong></span>
          <span style="color:#E8943A"><strong>${percentages.즉흥}%</strong> 즉흥형 🎲</span>
        </div>
        <div class="travel-axis-track-split">
          <div style="flex:${percentages.계획}; background:#4A90D9; border-radius:${percentages.즉흥 === 0 ? '5px' : '5px 0 0 5px'}"></div>
          <div style="flex:${percentages.즉흥}; background:#E8943A; border-radius:${percentages.계획 === 0 ? '5px' : '0 5px 5px 0'}"></div>
        </div>
      </div>

      <div class="travel-axis">
        <div class="travel-axis-header">
          <span style="color:#E74C3C">🏃 활동형 <strong>${percentages.활동}%</strong></span>
          <span style="color:#27AE60"><strong>${percentages.휴식}%</strong> 휴식형 😴</span>
        </div>
        <div class="travel-axis-track-split">
          <div style="flex:${percentages.활동}; background:#E74C3C; border-radius:${percentages.휴식 === 0 ? '5px' : '5px 0 0 5px'}"></div>
          <div style="flex:${percentages.휴식}; background:#27AE60; border-radius:${percentages.활동 === 0 ? '5px' : '0 5px 5px 0'}"></div>
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

    // 동행 궁합 체커
    const checker = document.getElementById('travelCompatChecker');
    if (!checker) return;

    checker.innerHTML = `
      <div class="travel-compat-title">동행 궁합 보기</div>
      <p class="travel-compat-sub">같이 가는 사람의 유형을 선택해보세요</p>
      <div class="travel-compat-grid">
        ${Object.entries(TRAVEL_TYPES).map(([key, t]) => `
          <button class="travel-compat-btn" data-type="${key}">
            <span class="travel-compat-btn-emoji">${t.emoji}</span>
            <span>${t.name}</span>
          </button>
        `).join('')}
      </div>
      <div class="travel-compat-result" id="travelCompatResult" style="display:none">
        <div class="travel-compat-result-header" id="travelCompatHeader"></div>
        <p class="travel-compat-result-text" id="travelCompatText"></p>
      </div>
    `;
    checker.style.display = 'block';

    checker.querySelectorAll('.travel-compat-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        checker.querySelectorAll('.travel-compat-btn').forEach(b => b.classList.remove('selected'));
        btn.classList.add('selected');

        const selectedType = btn.dataset.type;
        const pairKey = [winner, selectedType].sort().join('_');
        const compatText = TRAVEL_COMPATIBILITY[pairKey] || '';
        const myInfo = TRAVEL_TYPES[winner];
        const selInfo = TRAVEL_TYPES[selectedType];

        document.getElementById('travelCompatHeader').innerHTML =
          `${myInfo.emoji} × ${selInfo.emoji} <span>궁합 결과</span>`;
        document.getElementById('travelCompatText').textContent = compatText;

        const resultEl = document.getElementById('travelCompatResult');
        resultEl.style.display = 'block';
        resultEl.style.animation = 'none';
        void resultEl.offsetWidth;
        resultEl.style.animation = '';
      });
    });
  },

  getShareImage(winner) {
    const map = { PLANNER: 0, CURATOR: 1, ADVENTURER: 2, WANDERER: 3 };
    return `images/travel/${map[winner] ?? 0}.webp`;
  }
};
