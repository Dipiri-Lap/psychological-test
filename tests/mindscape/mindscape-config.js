// mindscape-config.js — 그림으로 보는 내 마음 (마음의 풍경 테스트)
// 의존: mindscape-test.js (MINDSCAPE_QUESTIONS, MINDSCAPE_TYPES, calcMindscape)
// 선택지에 img가 있으면 test.html이 이미지 카드(2×2)로 그린다.

window.TEST_CONFIGS = window.TEST_CONFIGS || {};

// 같은 유형이 항상 같은 위치에 오지 않도록 장면 번호에 따라 선택지 순서를 돌린다(결정적)
function mindscapeRotate(arr, n) {
  const k = (n * 3) % arr.length;
  return arr.slice(k).concat(arr.slice(0, k));
}

window.TEST_CONFIGS['mindscape'] = {
  data: {
    title: "그림으로 보는 내 마음 — 마음의 풍경 테스트",
    shareTag: "마음의 풍경 테스트",
    emoji: "🖼️",
    thumb: "images/mindscape/thumb.webp",
    subtitle: "글 대신 그림으로 고르는 6장면, 지금 가장 끌리는 풍경은? (6문항)",
    questions: MINDSCAPE_QUESTIONS.map(q => ({
      q: q.emoji + ' ' + q.question,
      choices: mindscapeRotate(q.choices, q.id).map(c => ({
        img: c.img,
        text: c.cap,
        _type: c.type,
        score: { _: 0 }
      }))
    })),
    results: Object.fromEntries(
      Object.entries(MINDSCAPE_TYPES).map(([k, v]) => [k, {
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
    const r = calcMindscape(state.answersRaw);
    const info = r.primaryInfo;
    return Object.assign({}, r, {
      winner: r.primary,
      type: info.emoji + ' ' + info.name,
      emoji: info.emoji,
      tagline: info.tagline,
      desc: info.desc
    });
  },

  // 결과 이미지가 준비된 유형만 이미지 사용, 나머지는 이모지로 대체
  getShareImage(winner) {
    const ready = ['F', 'S', 'C', 'M', 'G', 'N'];
    return ready.includes(winner) ? `images/mindscape/${winner}.webp` : null;
  },

  afterResult(result) {
    const container = document.getElementById('mindscapeStats');
    if (!container) return;

    const info = result.primaryInfo;
    const sec = result.secondaryInfo;

    const rows = result.sorted.map(key => {
      const t = MINDSCAPE_TYPES[key];
      const pct = result.percentages[key];
      const isP = key === result.primary, isS = key === result.secondary && result.totals[key] > 0;
      const badge = isP ? ' ★ 주 풍경' : (isS ? ' 보조 풍경' : '');
      return `
        <div class="ms-row${isP ? ' ms-row-primary' : isS ? ' ms-row-secondary' : ''}">
          <span class="ms-row-emoji">${t.emoji}</span>
          <span class="ms-row-name">${t.name}<span class="ms-row-badge">${badge}</span></span>
          <div class="ms-bar-wrap"><div class="ms-bar" style="width:${pct}%; background:${t.color}"></div></div>
          <span class="ms-pct" style="color:${t.color}">${pct}%</span>
        </div>`;
    }).join('');

    const comboHtml = (result.comboNote && result.totals[result.secondary] > 0) ? `
      <div class="ms-combo">
        <div class="ms-combo-label">🔗 ${info.emoji} ${info.name} + ${sec.emoji} ${sec.name}</div>
        <div class="ms-combo-desc">${result.comboNote}</div>
      </div>` : '';

    const list = arr => arr.map(s => `<li>${s}</li>`).join('');
    const partner = result.matchInfo;

    container.innerHTML = `
      <div class="ms-title">내 마음의 풍경 분포</div>
      ${rows}
      ${comboHtml}

      <div class="ms-divider"></div>
      <div class="ms-card ms-keys">${info.keywords.map(k => '<span>#' + k + '</span>').join('')}</div>
      <div class="ms-cols">
        <div class="ms-col ms-col-good">
          <div class="ms-col-label">🌿 이런 모습이 있어요</div>
          <ul>${list(info.traits)}</ul>
        </div>
        <div class="ms-col ms-col-warn">
          <div class="ms-col-label">🌙 이런 그림자도 있어요</div>
          <ul>${list(info.shadows)}</ul>
        </div>
      </div>

      <div class="ms-card">
        <div class="ms-card-label">🫧 마음이 지칠 때 필요한 것</div>
        <div class="ms-card-desc">${info.needs}</div>
      </div>
      <div class="ms-quote">
        <div class="ms-quote-label">💬 이럴 때 이렇게 말해 보세요</div>
        <div class="ms-quote-text">${info.saying}</div>
      </div>
      <div class="ms-card">
        <div class="ms-card-label">🤝 함께하면 좋은 사람</div>
        <div class="ms-card-desc">${info.together}<br><br>
          마음이 잘 통하는 풍경 — <b>${partner.emoji} ${partner.name}</b> · ${partner.tagline}</div>
      </div>

      <div class="ms-footer">재미로 보는 테스트이며 심리학적 검사나 진단이 아니에요. 오늘의 기분과 상황에 따라 끌리는 그림은 달라질 수 있어요.</div>
    `;
    container.style.display = 'block';
  }
};
