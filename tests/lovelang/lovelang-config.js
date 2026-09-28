// lovelang-config.js — 나의 사랑의 언어는? 5가지 사랑 표현 테스트
// 의존: lovelang-test.js (LOVELANG_QUESTIONS, LOVELANG_TYPES, calcLoveLang)

window.TEST_CONFIGS = window.TEST_CONFIGS || {};

window.TEST_CONFIGS['lovelang'] = {
  data: {
    title: "나의 사랑의 언어는? 5가지 사랑 표현 테스트",
    shareTag: "사랑의 언어 테스트",
    emoji: "💌",
    thumb: "images/lovelang/thumb.webp",
    subtitle: "인정하는 말·시간·선물·봉사·스킨십, 나를 채우는 사랑은? (15문항)",
    questions: LOVELANG_QUESTIONS.map(q => ({
      q: q.emoji + ' ' + q.question,
      choices: q.choices.map(c => ({
        text: c.text,
        _type: c.type,
        score: { _: 0 }
      }))
    })),
    results: Object.fromEntries(
      Object.entries(LOVELANG_TYPES).map(([k, v]) => [k, {
        type: v.emoji + ' ' + v.name,
        emoji: v.emoji,
        tagline: v.tagline,
        desc: v.desc
      }])
    )
  },

  onAnswer(choice, state) {
    state.answersRaw.push(choice._type);
  },

  calcResult(state) {
    const result = calcLoveLang(state.answersRaw);
    const info = result.primaryTypeInfo;
    return {
      winner: result.primaryType,
      type: info.emoji + ' ' + info.name,
      emoji: info.emoji,
      tagline: info.tagline,
      desc: info.desc,
      percentages: result.percentages,
      totals: result.totals,
      maxScore: result.maxScore,
      primaryType: result.primaryType,
      primaryTypeInfo: result.primaryTypeInfo,
      secondaryType: result.secondaryType,
      secondaryTypeInfo: result.secondaryTypeInfo,
      comboNote: result.comboNote,
      isTie: result.isTie
    };
  },

  getShareImage(winner) {
    const map = { W: 0, T: 1, G: 2, S: 3, P: 4 };
    return `images/lovelang/${map[winner] ?? 0}.webp`;
  },

  afterResult(result) {
    const container = document.getElementById('lovelangStats');
    if (!container) return;

    const typeOrder = ['W', 'T', 'G', 'S', 'P'];
    const rows = typeOrder.map(key => {
      const info = LOVELANG_TYPES[key];
      const pct = result.percentages[key];
      const isPrimary   = key === result.primaryType;
      const isSecondary = key === result.secondaryType;
      const label = isPrimary ? ' ★ 주 언어' : (isSecondary ? ' 보조 언어' : '');
      return `
        <div class="ll-row${isPrimary ? ' ll-row-primary' : isSecondary ? ' ll-row-secondary' : ''}">
          <div class="ll-row-left">
            <span class="ll-row-emoji">${info.emoji}</span>
            <div class="ll-row-info">
              <span class="ll-row-name">${info.name}<span class="ll-row-badge">${label}</span></span>
              <span class="ll-row-keyword">${info.keywords.map(k => '#' + k).join(' ')}</span>
            </div>
          </div>
          <div class="ll-bar-wrap">
            <div class="ll-bar" style="width:${pct}%; background:${info.color}"></div>
          </div>
          <div class="ll-pct" style="color:${info.color}">${pct}%</div>
        </div>
      `;
    }).join('');

    const comboHtml = result.comboNote ? `
      <div class="ll-combo">
        <div class="ll-combo-label">🔗 ${result.primaryTypeInfo.emoji} + ${result.secondaryTypeInfo.emoji} 혼합 패턴</div>
        <div class="ll-combo-desc">${result.comboNote}</div>
      </div>
    ` : '';

    container.innerHTML = `
      <div class="ll-chart-title">나의 사랑의 언어 분포</div>
      <div class="ll-divider"></div>
      ${rows}
      ${comboHtml}
      <div class="ll-tip">
        <span class="ll-tip-label">💡 애인에게 이렇게 요청해보세요</span>
        <span class="ll-tip-desc">${result.primaryTypeInfo.tip}</span>
      </div>
    `;
    container.style.display = 'block';
  }
};
