// catmbti-config.js — 우리 고양이 MBTI 검사
// 의존: catmbti-test.js (CATMBTI_QUESTIONS, CATMBTI_AXES, CATMBTI_TYPES, calcCatMbti)
//       catmbti-situations.js (CATMBTI_SITUATION_LABELS, CATMBTI_SITUATIONS)

window.TEST_CONFIGS = window.TEST_CONFIGS || {};

window.TEST_CONFIGS['catmbti'] = {
  data: {
    title: "우리 고양이 MBTI 검사",
    shareTag: "고양이 MBTI 검사",
    emoji: "🐱",
    thumb: "images/catmbti/thumb.webp",
    subtitle: "사교성·호기심·교감·생활 방식 4축으로 알아보는 우리 고양이 성격 (28문항)",
    questions: CATMBTI_QUESTIONS.map(q => ({
      q: q.emoji + ' ' + q.question,
      choices: q.choices.map(c => ({
        text: c.text,
        _type: c.type,
        score: { _: 0 }
      }))
    })),
    results: Object.fromEntries(
      Object.entries(CATMBTI_TYPES).map(([k, v]) => [k, {
        type: v.emoji + ' ' + k + ' ' + v.name,
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
    const result = calcCatMbti(state.answersRaw);
    const info = result.typeInfo;
    return {
      winner: result.code,
      type: info.emoji + ' ' + result.code + ' ' + info.name,
      emoji: info.emoji,
      tagline: info.tagline,
      desc: info.desc,
      code: result.code,
      typeInfo: info,
      axes: result.axes,
      secondary: result.secondary,
      matchInfo: result.matchInfo,
      clashInfo: result.clashInfo
    };
  },

  // 결과 이미지가 준비된 유형만 이미지 사용, 나머지는 이모지로 대체
  getShareImage(winner) {
    const ready = ['ENFP', 'ISTJ', 'ISFJ', 'INFJ', 'INTJ', 'ISTP', 'ISFP', 'INFP', 'INTP', 'ESTP', 'ESFP', 'ENTP', 'ESTJ', 'ESFJ', 'ENFJ', 'ENTJ'];
    return ready.includes(winner) ? `images/catmbti/${winner}.webp` : null;
  },

  afterResult(result) {
    const container = document.getElementById('catmbtiStats');
    if (!container) return;

    const info = result.typeInfo;
    const axisOrder = ['EI', 'SN', 'TF', 'JP'];

    const axisRows = axisOrder.map(key => {
      const axis = result.axes[key];
      const def = CATMBTI_AXES[key];
      const [a, b] = def.pair;
      const left = def[a];
      const right = def[b];
      const leftPct = axis.pctByLetter[a];
      const rightPct = axis.pctByLetter[b];
      const leftWins = axis.winner === a;
      return `
        <div class="pm-axis">
          <div class="pm-axis-head">
            <span class="pm-axis-title">${def.title}</span>
            <span class="pm-axis-strength" style="color:${axis.info.color}">${axis.info.emoji} ${axis.info.name} · ${axis.strength}</span>
          </div>
          <div class="pm-axis-bar">
            <div class="pm-axis-fill pm-fill-left${leftWins ? ' pm-win' : ''}" style="width:${leftPct}%; background:${left.color}"></div>
            <div class="pm-axis-fill pm-fill-right${leftWins ? '' : ' pm-win'}" style="width:${rightPct}%; background:${right.color}"></div>
          </div>
          <div class="pm-axis-labels">
            <span style="color:${left.color}; font-weight:${leftWins ? 800 : 500}">${a} ${left.name} ${leftPct}%</span>
            <span style="color:${right.color}; font-weight:${leftWins ? 500 : 800}">${rightPct}% ${right.name} ${b}</span>
          </div>
          <div class="pm-axis-desc">${axis.info.desc}</div>
        </div>
      `;
    }).join('');

    // 보조 유형(경계 성향): 가장 아슬아슬한 축이 있을 때만 표시
    const sec = result.secondary;
    const secondaryHtml = sec ? `
      <div class="pm-secondary">
        <div class="pm-secondary-label">🔀 상황에 따라 이런 모습도 보여요</div>
        <div class="pm-secondary-main">
          <span class="pm-secondary-code">${sec.code}</span>
          <span class="pm-secondary-name">${sec.info.emoji} ${sec.info.name}</span>
        </div>
        <div class="pm-secondary-desc">
          <b>${sec.axisTitle}</b>이 ${sec.winner} ${sec.winnerInfo.name} ${sec.winnerPct}% · ${sec.loser} ${sec.loserInfo.name} ${sec.loserPct}%로 아슬아슬해요.
          평소엔 <b>${result.code}</b>이지만, 컨디션이나 환경에 따라 <b>${sec.loserInfo.name}</b> 쪽 모습이 튀어나올 수 있어요.
        </div>
        <div class="pm-secondary-tagline">"${sec.info.tagline}"</div>
      </div>
    ` : `
      <div class="pm-secondary pm-secondary-none">
        <div class="pm-secondary-label">🎯 성향이 아주 뚜렷한 타입이에요</div>
        <div class="pm-secondary-desc">어느 축도 아슬아슬하지 않아서 상황이 바뀌어도 <b>${result.code}</b> 모습 그대로일 가능성이 높아요.</div>
      </div>
    `;

    // 상황별 행동 가이드
    const situations = (typeof CATMBTI_SITUATIONS !== 'undefined' && CATMBTI_SITUATIONS[result.code]) || null;
    const situationHtml = situations ? `
      <div class="pm-divider"></div>
      <div class="pm-chart-title">상황별 우리 고양이</div>
      ${CATMBTI_SITUATION_LABELS.map(l => `
        <div class="pm-situ">
          <div class="pm-situ-head"><span class="pm-situ-emoji">${l.emoji}</span><span class="pm-situ-name">${l.name}</span></div>
          <div class="pm-situ-desc">${situations[l.key]}</div>
        </div>
      `).join('')}
    ` : '';

    container.innerHTML = `
      <div class="pm-code-wrap">
        <div class="pm-code">${result.code.split('').map(l => `<span>${l}</span>`).join('')}</div>
        <div class="pm-code-name">${info.emoji} ${info.name}</div>
        <div class="pm-keywords">${info.keywords.map(k => '#' + k).join(' ')}</div>
      </div>
      <div class="pm-divider"></div>
      <div class="pm-chart-title">우리 고양이 성향 분석</div>
      ${axisRows}
      ${secondaryHtml}
      ${situationHtml}
      <div class="pm-divider"></div>
      <div class="pm-card pm-loves">
        <div class="pm-card-label">💛 우리 고양이가 좋아하는 것</div>
        <div class="pm-card-desc">${info.loves}</div>
      </div>
      <div class="pm-card pm-caution">
        <div class="pm-card-label">⚠️ 이런 점은 주의해 주세요</div>
        <div class="pm-card-desc">${info.caution}</div>
      </div>
      <div class="pm-card pm-tip">
        <div class="pm-card-label">💡 집사를 위한 한 줄 팁</div>
        <div class="pm-card-desc">${info.tip}</div>
      </div>
      <div class="pm-match-row">
        <div class="pm-match pm-match-good">
          <div class="pm-match-label">🤝 잘 맞는 친구</div>
          <div class="pm-match-code">${info.match}</div>
          <div class="pm-match-name">${result.matchInfo.emoji} ${result.matchInfo.name}</div>
        </div>
        <div class="pm-match pm-match-bad">
          <div class="pm-match-label">⚡ 부딪히기 쉬운 친구</div>
          <div class="pm-match-code">${info.clash}</div>
          <div class="pm-match-name">${result.clashInfo.emoji} ${result.clashInfo.name}</div>
        </div>
      </div>
      <div class="pm-footer">재미로 보는 검사로, 실제 행동 문제는 수의사와 상담해 주세요.</div>
    `;
    container.style.display = 'block';
  }
};
