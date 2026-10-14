// petowner-config.js — 나는 어떤 반려인일까? 집사·견주 유형 테스트
// 의존: petowner-test.js (PETOWNER_QUESTIONS, PETOWNER_TYPES, calcPetOwner)

window.TEST_CONFIGS = window.TEST_CONFIGS || {};

// 같은 유형이 항상 같은 번호에 오지 않도록 문항 번호에 따라 선택지 순서를 돌린다(결정적)
function petOwnerRotate(arr, n) {
  const k = n % arr.length;
  return arr.slice(k).concat(arr.slice(0, k));
}

window.TEST_CONFIGS['petowner'] = {
  data: {
    title: "나는 어떤 반려인일까? 집사·견주 유형 테스트",
    shareTag: "반려인 유형 테스트",
    emoji: "🐾",
    thumb: "images/petowner/thumb.webp",
    subtitle: "헌신형·놀이형·교육형·룸메이트형·스타 매니저형·분석가형, 나의 집사·견주 스타일은? (18문항)",
    questions: PETOWNER_QUESTIONS.map(q => ({
      q: q.emoji + ' ' + q.question,
      choices: petOwnerRotate(q.choices, q.id).map(c => ({
        text: c.text,
        _type: c.type,
        score: { _: 0 }
      }))
    })),
    results: Object.fromEntries(
      Object.entries(PETOWNER_TYPES).map(([k, v]) => [k, {
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
    const r = calcPetOwner(state.answersRaw);
    const info = r.primaryTypeInfo;
    return Object.assign({}, r, {
      winner: r.primaryType,
      type: info.emoji + ' ' + info.name,
      emoji: info.emoji,
      tagline: info.tagline,
      desc: info.desc
    });
  },

  // 결과 이미지가 준비된 유형만 이미지 사용, 나머지는 이모지로 대체
  getShareImage(winner) {
    const ready = ['C', 'P', 'K', 'R', 'S', 'A'];
    return ready.includes(winner) ? `images/petowner/${winner}.webp` : null;
  },

  afterResult(result) {
    const container = document.getElementById('petownerStats');
    if (!container) return;

    const info = result.primaryTypeInfo;
    const sec = result.secondaryTypeInfo;

    // 6유형 분포
    const rows = result.sorted.map(key => {
      const t = PETOWNER_TYPES[key];
      const pct = result.percentages[key];
      const isP = key === result.primaryType;
      const isS = key === result.secondaryType;
      const badge = isP ? ' ★ 주 유형' : (isS ? ' 보조 유형' : '');
      return `
        <div class="po-row${isP ? ' po-row-primary' : isS ? ' po-row-secondary' : ''}">
          <div class="po-row-left">
            <span class="po-row-emoji">${t.emoji}</span>
            <div class="po-row-info">
              <span class="po-row-name">${t.name}<span class="po-row-badge">${badge}</span></span>
              <span class="po-row-key">${t.keywords.map(k => '#' + k).join(' ')}</span>
            </div>
          </div>
          <div class="po-bar-wrap"><div class="po-bar" style="width:${pct}%; background:${t.color}"></div></div>
          <div class="po-pct" style="color:${t.color}">${pct}%</div>
        </div>
      `;
    }).join('');

    const blendHtml = result.isBlend && result.comboNote ? `
      <div class="po-combo">
        <div class="po-combo-label">🔗 ${info.emoji} ${info.name} + ${sec.emoji} ${sec.name} 혼합형</div>
        <div class="po-combo-desc">1위와 2위 점수가 거의 비슷해요. ${result.comboNote}</div>
      </div>
    ` : (result.comboNote ? `
      <div class="po-combo">
        <div class="po-combo-label">🔗 보조 유형은 ${sec.emoji} ${sec.name}</div>
        <div class="po-combo-desc">${result.comboNote}</div>
      </div>
    ` : '');

    const list = arr => arr.map(s => `<li>${s}</li>`).join('');
    const partner = result.matchInfo;

    container.innerHTML = `
      <div class="po-title">나의 반려인 유형 분포</div>
      ${rows}
      ${blendHtml}

      <div class="po-divider"></div>
      <div class="po-cols">
        <div class="po-col po-col-good">
          <div class="po-col-label">💪 이런 점이 강점이에요</div>
          <ul>${list(info.strengths)}</ul>
        </div>
        <div class="po-col po-col-warn">
          <div class="po-col-label">🔎 이런 점은 살펴보세요</div>
          <ul>${list(info.blind)}</ul>
        </div>
      </div>

      <div class="po-quote">
        <div class="po-quote-label">🐾 우리 아이 눈에 비친 나</div>
        <div class="po-quote-text">"${info.petView}"</div>
      </div>

      <div class="po-card">
        <div class="po-card-label">📅 평소 이런 모습이에요</div>
        <ul class="po-plain">${list(info.day)}</ul>
      </div>
      <div class="po-card">
        <div class="po-card-label">💡 이렇게 해 보세요</div>
        <div class="po-card-desc">${info.tip}</div>
      </div>
      <div class="po-card">
        <div class="po-card-label">🐶🐱 잘 맞는 반려동물 성향</div>
        <div class="po-card-desc">${info.petMatch}</div>
      </div>
      <div class="po-card">
        <div class="po-card-label">🤝 함께 돌보면 좋은 파트너 유형</div>
        <div class="po-card-desc"><b>${partner.emoji} ${partner.name}</b> — ${partner.tagline}</div>
      </div>

      <div class="po-divider"></div>
      <div class="po-title">이어서 해 보세요</div>
      <div class="po-links">
        <a class="po-link" href="test.html?id=dogmbti"><span>🐶</span><b>우리 강아지 MBTI</b><small>강아지 성격 16유형</small></a>
        <a class="po-link" href="test.html?id=catmbti"><span>🐱</span><b>우리 고양이 MBTI</b><small>고양이 성격 16유형</small></a>
        <a class="po-link" href="test.html?id=dogbreed"><span>🐕</span><b>견종 매칭 테스트</b><small>나와 맞는 강아지는?</small></a>
        <a class="po-link" href="test.html?id=catbreed"><span>🐈</span><b>묘종 매칭 테스트</b><small>나와 맞는 고양이는?</small></a>
      </div>

      <div class="po-footer">재미로 보는 테스트이며 전문적인 조언이 아닙니다. 어떤 유형이든 정답은 없고, 아이와 보호자가 함께 편안한 방식이 가장 좋아요.</div>
    `;
    container.style.display = 'block';
  }
};
