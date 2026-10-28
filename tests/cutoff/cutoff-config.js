// cutoff-config.js — 나의 손절 유형은? 인간관계 손절 테스트
// 의존: cutoff-test.js (CUTOFF_QUESTIONS, CUTOFF_TYPES, CUTOFF_LEVELS, calcCutoff)

window.TEST_CONFIGS = window.TEST_CONFIGS || {};

// 같은 유형이 항상 같은 번호에 오지 않도록 상황 번호에 따라 선택지 순서를 돌린다(결정적)
function cutoffRotate(arr, n) {
  const k = (n * 2) % arr.length;
  return arr.slice(k).concat(arr.slice(0, k));
}

window.TEST_CONFIGS['cutoff'] = {
  data: {
    title: "나의 손절 유형은? 인간관계 손절 테스트",
    shareTag: "손절 유형 테스트",
    emoji: "✂️",
    thumb: "images/cutoff/thumb.webp",
    subtitle: "12가지 인간관계 상황으로 알아보는 나의 손절 유형과 손절 지수 (12문항)",
    questions: CUTOFF_QUESTIONS.map(q => ({
      q: q.emoji + ' ' + q.question,
      choices: cutoffRotate(q.choices, q.id).map(c => ({
        text: c.text,
        _type: c.type,
        _flag: c.flag,
        score: { _: 0 }
      }))
    })),
    results: Object.fromEntries(
      Object.entries(CUTOFF_TYPES).map(([k, v]) => [k, {
        type: v.emoji + ' ' + v.name,
        emoji: v.emoji,
        tagline: v.tagline,
        desc: v.desc
      }])
    )
  },

  onAnswer(choice, state) {
    state.answersRaw.push({ type: choice._type, flag: choice._flag });
  },

  calcResult(state) {
    const r = calcCutoff(state.answersRaw);
    const info = r.primaryInfo;
    return Object.assign({}, r, {
      winner: r.primary,
      type: info.emoji + ' ' + info.name,
      emoji: info.emoji,
      // 공유 카드 한 줄: 손절 지수가 먼저 보이도록
      tagline: r.level.emoji + ' 손절 지수 ' + r.score + '% — ' + info.tagline,
      desc: info.desc
    });
  },

  // 결과 이미지가 준비된 유형만 이미지 사용, 나머지는 이모지로 대체
  getShareImage(winner) {
    const ready = ['F', 'K', 'S', 'T', 'H', 'R'];
    return ready.includes(winner) ? `images/cutoff/${winner}.webp` : null;
  },

  afterResult(result) {
    const container = document.getElementById('cutoffStats');
    if (!container) return;

    const info = result.primaryInfo, sec = result.secondaryInfo, lv = result.level;
    const partner = result.matchInfo;

    const rows = result.sorted.map(key => {
      const t = CUTOFF_TYPES[key];
      const pct = result.percentages[key];
      const isP = key === result.primary, isS = key === result.secondary && result.totals[key] > 0;
      const badge = isP ? ' ★ 주 유형' : (isS ? ' 보조 유형' : '');
      return `
        <div class="lv-row${isP ? ' lv-row-primary' : isS ? ' lv-row-secondary' : ''}">
          <span class="lv-row-emoji">${t.emoji}</span>
          <span class="lv-row-name">${t.name}<span class="lv-row-badge">${badge}</span></span>
          <div class="lv-bar-wrap"><div class="lv-bar" style="width:${pct}%; background:${t.color}"></div></div>
          <span class="lv-pct" style="color:${t.color}">${pct}%</span>
        </div>`;
    }).join('');

    const comboHtml = (result.comboNote && result.totals[result.secondary] > 0) ? `
      <div class="lv-combo">
        <div class="lv-combo-label">🔗 ${info.emoji} ${info.name} + ${sec.emoji} ${sec.name}</div>
        <div class="lv-combo-desc">${result.comboNote}</div>
      </div>` : '';

    container.innerHTML = `
      <div class="lv-flag">
        <div class="lv-flag-label">나의 손절 지수</div>
        <div class="lv-flag-num" style="color:${lv.color}">${result.score}<span>%</span></div>
        <div class="lv-flag-level" style="color:${lv.color}">${lv.emoji} ${lv.name}</div>
        <div class="lv-gauge">
          <div class="lv-gauge-track" style="background:linear-gradient(90deg,#3E9B6E 0%,#7FA650 25%,#E8A33A 50%,#D2555A 75%,#3F7FB8 100%)"><div class="lv-gauge-marker" style="left:${result.score}%"></div></div>
          <div class="lv-gauge-scale"><span>🤝 붙잡기</span><span>🌿</span><span>✂️</span><span>🔪</span><span>❄️ 빙하기</span></div>
        </div>
        <div class="lv-flag-desc">${lv.desc}</div>
      </div>

      <div class="lv-divider"></div>
      <div class="lv-title">내 손절 유형 분포</div>
      ${rows}
      ${comboHtml}

      <div class="lv-divider"></div>
      <div class="lv-keys">${info.keywords.map(k => '<span>#' + k + '</span>').join('')}</div>
      <div class="lv-card lv-card-view">
        <div class="lv-card-label">👀 상대 눈에는 이렇게 보여요</div>
        <div class="lv-card-desc">${info.partner}</div>
      </div>
      <div class="lv-card lv-card-charm">
        <div class="lv-card-label">💖 사실은 이런 매력이 있어요</div>
        <div class="lv-card-desc">${info.charm}</div>
      </div>
      <div class="lv-card lv-card-flag">
        <div class="lv-card-label">⚠️ 이런 습관은 돌아봐요</div>
        <div class="lv-card-desc">${info.flag}</div>
      </div>
      <div class="lv-quote">
        <div class="lv-quote-label">💬 이렇게 말해 보세요</div>
        <div class="lv-quote-text">${info.say}</div>
      </div>
      <div class="lv-card">
        <div class="lv-card-label">🌱 이렇게 바꿔 보면 좋아요</div>
        <div class="lv-card-desc">${info.together}</div>
      </div>
      <div class="lv-card">
        <div class="lv-card-label">🤝 서로 편하게 이어 가기 좋은 유형</div>
        <div class="lv-card-desc"><b>${partner.emoji} ${partner.name}</b> — ${partner.tagline}</div>
      </div>

      <div class="lv-footer">재미로 보는 테스트이고 사람을 평가하거나 진단하지 않아요. 손절에는 좋고 나쁜 방식이 없고, 관계를 정리하는 모습이 사람마다 다를 뿐이에요. 폭력이나 괴롭힘이 있는 관계라면 혼자 고민하지 말고 믿을 수 있는 사람이나 전문가의 도움을 받으세요.</div>
    `;
    container.style.display = 'block';
  }
};
