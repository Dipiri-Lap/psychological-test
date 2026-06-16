// vark-config.js — VARK 학습유형 테스트
// 의존: vark_learning_test.js (VARK_QUESTIONS, VARK_TYPES, calcVarkType)

window.TEST_CONFIGS = window.TEST_CONFIGS || {};

window.TEST_CONFIGS['study'] = {
  data: {
    title: "나의 학습 유형 테스트",
    emoji: "📚",
    thumb: "images/study/thumb.webp",
    subtitle: "시각형? 청각형? 체험형? 나에게 맞는 공부법 찾기 (20문항)",
    questions: VARK_QUESTIONS.map(q => ({
      q: q.emoji + ' ' + q.question,
      choices: q.choices.map(c => ({
        text: c.text,
        _type: c.type,
        score: { _: 0 }
      }))
    })),
    results: Object.fromEntries(
      Object.entries(VARK_TYPES).map(([k, v]) => [k, {
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
    const result = calcVarkType(state.answersRaw);
    const info = result.primaryTypeInfo;
    return {
      winner: result.primaryType,
      type: info.emoji + ' ' + info.name,
      emoji: info.emoji,
      tagline: info.tagline,
      desc: info.desc,
      percentages: result.percentages,
      primaryType: result.primaryType,
      primaryTypeInfo: result.primaryTypeInfo,
      secondaryType: result.secondaryType,
      secondaryTypeInfo: result.secondaryTypeInfo,
      comboNote: result.comboNote,
      isTie: result.isTie
    };
  },

  getShareImage(winner) {
    const map = { V: 0, A: 1, R: 2, K: 3 };
    return `images/study/${map[winner] ?? 0}.webp`;
  },

  afterResult(result) {
    const container = document.getElementById('varkStats');
    if (!container) return;

    const typeOrder = ['V', 'A', 'R', 'K'];
    const rows = typeOrder.map(key => {
      const info = VARK_TYPES[key];
      const pct = result.percentages[key];
      const isPrimary   = key === result.primaryType;
      const isSecondary = key === result.secondaryType;
      const label = isPrimary ? ' ★ 주유형' : (isSecondary ? ' 보조유형' : '');
      return `
        <div class="vark-row${isPrimary ? ' vark-row-primary' : isSecondary ? ' vark-row-secondary' : ''}">
          <div class="vark-row-left">
            <span class="vark-row-emoji">${info.emoji}</span>
            <div class="vark-row-info">
              <span class="vark-row-name">${info.name}<span class="vark-row-badge">${label}</span></span>
              <span class="vark-row-keyword">${info.keywords.map(k => '#' + k).join(' ')}</span>
            </div>
          </div>
          <div class="vark-bar-wrap">
            <div class="vark-bar" style="width:${pct}%; background:${info.color}"></div>
          </div>
          <div class="vark-pct" style="color:${info.color}">${pct}%</div>
        </div>
      `;
    }).join('');

    const comboHtml = result.comboNote ? `
      <div class="vark-combo">
        <div class="vark-combo-label">🔗 ${result.primaryTypeInfo.emoji} + ${result.secondaryTypeInfo.emoji} 혼합 패턴</div>
        <div class="vark-combo-desc">${result.comboNote}</div>
      </div>
    ` : '';

    container.innerHTML = `
      <div class="vark-chart-title">학습 유형 분석</div>
      <div class="vark-divider"></div>
      ${rows}
      ${comboHtml}
      <div class="vark-tip">
        <span class="vark-tip-label">💡 나에게 맞는 공부법</span>
        <span class="vark-tip-desc">${result.primaryTypeInfo.tip}</span>
      </div>
    `;
    container.style.display = 'block';
  }
};
