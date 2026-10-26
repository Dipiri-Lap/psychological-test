// loveshelf-config.js — 내 연애의 유통기한은? 연애 지속력 테스트
// 의존: loveshelf-test.js (LOVESHELF_AREAS, LOVESHELF_QUESTIONS, LOVESHELF_TIERS, calcLoveShelf)

window.TEST_CONFIGS = window.TEST_CONFIGS || {};

// 같은 점수의 선택지가 항상 같은 위치에 오지 않도록 문항 번호에 따라 순서를 돌린다(결정적)
function loveShelfRotate(arr, n) {
  const k = (n * 3) % arr.length;
  return arr.slice(k).concat(arr.slice(0, k));
}

window.TEST_CONFIGS['loveshelf'] = {
  data: {
    title: "내 연애의 유통기한은? 연애 지속력 테스트",
    shareTag: "연애 유통기한 테스트",
    emoji: "⏳",
    thumb: "images/loveshelf/thumb.webp",
    subtitle: "설렘·회복·일상·미래, 4가지 힘으로 보는 나의 연애 지속력 (12문항)",
    questions: LOVESHELF_QUESTIONS.map(q => ({
      q: q.emoji + ' ' + q.question,
      choices: loveShelfRotate(q.choices, q.id).map(c => ({
        text: c.text,
        _area: q.area,
        _pts: c.pts,
        score: { _: 0 }
      }))
    })),
    results: Object.fromEntries(
      LOVESHELF_TIERS.map(t => [t.id, {
        type: t.emoji + ' 연애 유통기한 ' + t.span,
        emoji: t.emoji,
        tagline: t.name + ' — ' + t.tagline,
        desc: t.desc
      }])
    )
  },

  onAnswer(choice, state) {
    state.answersRaw.push({ area: choice._area, pts: choice._pts });
  },

  calcResult(state) {
    const r = calcLoveShelf(state.answersRaw);
    const t = r.tier;
    return Object.assign({}, r, {
      winner: t.id,
      type: t.emoji + ' 연애 유통기한 ' + t.span,
      emoji: t.emoji,
      tagline: t.name + ' — ' + t.tagline,
      desc: t.desc
    });
  },

  // 결과 이미지가 준비된 단계만 이미지 사용, 나머지는 이모지로 대체
  getShareImage(winner) {
    const ready = ['T1', 'T2', 'T3', 'T4', 'T5', 'T6'];
    return ready.includes(winner) ? `images/loveshelf/${winner}.webp` : null;
  },

  afterResult(result) {
    const container = document.getElementById('loveshelfStats');
    if (!container) return;

    const t = result.tier;

    const areaRows = Object.entries(LOVESHELF_AREAS).map(([key, a]) => {
      const v = result.areas[key];
      const tag = result.balanced ? '' : (key === result.weakest ? '가장 약해요' : (key === result.strongest ? '가장 강해요' : ''));
      return `
        <div class="sh-area">
          <div class="sh-area-top">
            <span class="sh-area-name">${a.emoji} ${a.name}</span>
            <span class="sh-area-score">${v.pct}점${tag ? ` <em>${tag}</em>` : ''}</span>
          </div>
          <div class="sh-area-desc">${a.desc}</div>
          <div class="sh-area-track"><div class="sh-area-fill" style="width:${Math.max(4, v.pct)}%"></div></div>
        </div>`;
    }).join('');

    const weakName = LOVESHELF_AREAS[result.weakest].name;
    const strongName = LOVESHELF_AREAS[result.strongest].name;
    const adviceHtml = result.balanced ? `
      <div class="sh-card">
        <div class="sh-card-label">⚖️ 네 가지 힘이 고르게 있어요</div>
        <div class="sh-card-desc">어느 한 영역이 크게 약하지 않은 균형형이에요. 지금처럼 서로에게 관심을 유지하면서 아래 '오래 가는 비결'을 더해 보세요.</div>
      </div>` : `
      <div class="sh-card sh-card-cause">
        <div class="sh-card-label">🧊 금방 식는 원인 1위 — ${weakName}</div>
        <div class="sh-card-desc">${result.weakInfo.cause}이 가장 큰 변수예요.</div>
      </div>
      <div class="sh-card sh-card-tip">
        <div class="sh-card-label">🔥 이 불씨부터 키워 보세요</div>
        <div class="sh-card-desc">${result.weakInfo.tip}</div>
      </div>
      <div class="sh-card">
        <div class="sh-card-label">💪 이미 잘하고 있는 힘 — ${strongName}</div>
        <div class="sh-card-desc">${result.strongInfo.strength}</div>
      </div>`;

    const tierRow = LOVESHELF_TIERS.map(x => `
      <div class="sh-tier${x.id === t.id ? ' sh-tier-on' : ''}" title="${x.name}">
        <span class="sh-tier-emoji">${x.emoji}</span>
        <span class="sh-tier-span">${x.span.replace('약 ', '')}</span>
      </div>`).join('');

    container.innerHTML = `
      <div class="sh-hero">
        <div class="sh-hero-label">나의 연애 유통기한</div>
        <div class="sh-hero-span" style="color:${t.color}">${t.span}</div>
        <div class="sh-hero-name" style="color:${t.color}">${t.emoji} ${t.name}</div>
        <div class="sh-hero-tag">${t.tagline}</div>
        <div class="sh-tiers">${tierRow}</div>
        <div class="sh-power">
          <span>연애 지속력</span>
          <div class="sh-power-track"><div class="sh-power-fill" style="width:${result.power}%; background:${t.color}"></div></div>
          <b style="color:${t.color}">${result.power}점</b>
        </div>
        <div class="sh-keys">${t.keywords.map(k => '<span>#' + k + '</span>').join('')}</div>
      </div>

      <div class="sh-divider"></div>
      <div class="sh-title">연애를 오래 가게 하는 4가지 힘</div>
      ${areaRows}

      <div class="sh-divider"></div>
      ${adviceHtml}
      <div class="sh-card">
        <div class="sh-card-label">⚠️ 이런 습관이 불을 빨리 식혀요</div>
        <div class="sh-card-desc">${t.habit}</div>
      </div>
      <div class="sh-card">
        <div class="sh-card-label">🪵 오래 가게 하는 비결</div>
        <div class="sh-card-desc">${t.boost}</div>
      </div>

      <div class="sh-footer">재미로 보는 테스트이며 실제 연애의 기간을 예측하지 않아요. '유통기한'은 연애 습관을 가볍게 돌아보기 위한 표현이에요. 습관은 마음먹으면 언제든 바꿀 수 있어요.</div>
    `;
    container.style.display = 'block';
  }
};
