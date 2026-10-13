// catbreed-config.js — 나와 찰떡인 고양이는? 묘종 매칭 테스트
// 의존: catbreed-test.js (CATBREED_DIMS, CATBREED_USER_LABEL, CATBREED_QUESTIONS, CATBREED_BREEDS, calcCatBreed, catBreedFit)

window.TEST_CONFIGS = window.TEST_CONFIGS || {};

// 마지막 글자 받침 유무로 조사 선택 (예: 비글과 / 말티즈와)
function catBreedJosa(word, withBatchim, withoutBatchim) {
  const code = word.charCodeAt(word.length - 1) - 0xAC00;
  if (code < 0 || code > 11171) return withoutBatchim;
  return code % 28 ? withBatchim : withoutBatchim;
}

window.TEST_CONFIGS['catbreed'] = {
  data: {
    title: "나와 찰떡인 고양이는? 묘종 매칭 테스트",
    shareTag: "묘종 매칭 테스트",
    emoji: "🐈",
    thumb: "images/catbreed/thumb.webp",
    subtitle: "나의 성향과 생활 패턴으로 찾는 찰떡궁합 묘종 (26문항 · 20묘종)",
    questions: CATBREED_QUESTIONS.map(q => ({
      q: q.emoji + ' ' + q.question,
      choices: q.choices.map(c => ({
        text: c.text,
        _dim: q.dim,
        _val: c.val,
        score: { _: 0 }
      }))
    })),
    results: Object.fromEntries(
      Object.entries(CATBREED_BREEDS).map(([k, v]) => [k, {
        type: v.emoji + ' ' + v.name,
        emoji: v.emoji,
        tagline: v.tagline,
        desc: v.desc
      }])
    )
  },

  onAnswer(choice, state) {
    state.answersRaw.push({ dim: choice._dim, val: choice._val });
  },

  calcResult(state) {
    const result = calcCatBreed(state.answersRaw);
    const b = result.best.breed;
    return Object.assign({}, result, {
      winner: result.winner,
      type: b.emoji + ' ' + b.name,
      emoji: b.emoji,
      tagline: b.tagline,
      desc: b.desc
    });
  },

  // 결과 이미지가 준비된 묘종만 이미지 사용, 나머지는 이모지로 대체
  getShareImage(winner) {
    const ready = ['koshort', 'russianblue', 'britishshort', 'scottishfold', 'munchkin', 'persian', 'exotic', 'siamese', 'abyssinian', 'bengal', 'mainecoon', 'ragdoll', 'norwegian', 'turkishangora', 'americanshort', 'sphynx', 'siberian', 'devonrex', 'birman', 'americancurl'];
    return ready.includes(winner) ? `images/catbreed/${winner}.webp` : null;
  },

  afterResult(result) {
    const container = document.getElementById('catbreedStats');
    if (!container) return;

    const best = result.best;
    const b = best.breed;
    const scale = v => Math.round(((v - 1) / 4) * 100);

    // 궁합 상세: 수치형 10개 기준
    const fitRows = Object.entries(CATBREED_DIMS)
      .filter(([, def]) => def.kind !== 'cat')
      .map(([d, def]) => {
        const u = result.user[d];
        const bv = b.traits[d];
        const fit = catBreedFit(best.detail[d].gap);
        return `
          <div class="brd-fit">
            <div class="brd-fit-head">
              <span class="brd-fit-name">${def.name}</span>
              <span class="brd-fit-badge brd-${fit.tone}">${fit.mark} ${fit.label}</span>
            </div>
            <div class="brd-fit-line">
              <span class="brd-fit-who">나</span>
              <div class="brd-fit-track"><div class="brd-fit-fill brd-fill-me" style="width:${Math.max(6, scale(u))}%"></div></div>
              <span class="brd-fit-cap">${CATBREED_USER_LABEL[d]}</span>
            </div>
            <div class="brd-fit-line">
              <span class="brd-fit-who">${b.emoji}</span>
              <div class="brd-fit-track"><div class="brd-fit-fill brd-fill-dog" style="width:${Math.max(6, scale(bv))}%"></div></div>
              <span class="brd-fit-cap">${def.low} ↔ ${def.high}</span>
            </div>
          </div>
        `;
      }).join('');

    const reasons = result.reasons.length
      ? result.reasons.map(r => `<li>✓ ${r}</li>`).join('')
      : '<li>✓ 여러 기준에서 고르게 잘 맞아요</li>';
    const cautions = result.cautions.map(c => `<li>• ${c}</li>`).join('');

    const top5 = result.top5.map((e, i) => `
      <div class="brd-rank${i === 0 ? ' brd-rank-best' : ''}">
        <span class="brd-rank-no">${i + 1}</span>
        <span class="brd-rank-name">${e.breed.emoji} ${e.breed.name}</span>
        <div class="brd-rank-track"><div class="brd-rank-fill" style="width:${e.percent}%"></div></div>
        <span class="brd-rank-pct">${e.percent}%</span>
      </div>
    `).join('');

    container.innerHTML = `
      <div class="brd-head">
        <div class="brd-head-label">나와의 궁합</div>
        <div class="brd-head-pct">${best.percent}<span>%</span></div>
        <div class="brd-head-bar"><div class="brd-head-fill" style="width:${best.percent}%"></div></div>
        <div class="brd-chips">
          <span class="brd-chip">📏 ${b.size}</span>
          <span class="brd-chip">⚖️ ${b.weight}</span>
          <span class="brd-chip">🧶 ${b.coat}</span>
        </div>
        <div class="brd-keywords">${b.keywords.map(k => '#' + k).join(' ')}</div>
      </div>

      <div class="brd-divider"></div>
      <div class="brd-title">💛 왜 찰떡일까?</div>
      <ul class="brd-list brd-list-good">${reasons}</ul>

      <div class="brd-card brd-card-warn">
        <div class="brd-card-label">⚠️ 미리 알아 두면 좋은 점</div>
        <ul class="brd-list">${cautions}<li>• ${b.caution}</li></ul>
      </div>

      <div class="brd-divider"></div>
      <div class="brd-title">📊 기준별 궁합 상세</div>
      <div class="brd-sub">위 막대는 나의 답, 아래 막대는 ${b.name}의 일반적인 특성이에요.</div>
      ${fitRows}

      <div class="brd-divider"></div>
      <div class="brd-title">🌤️ ${b.name}${catBreedJosa(b.name, '과', '와')} 함께하는 하루</div>
      <div class="brd-day">${b.day}</div>

      <div class="brd-card">
        <div class="brd-card-label">📝 입양 전 체크리스트</div>
        <ul class="brd-check">${b.checklist.map(c => `<li>☐ ${c}</li>`).join('')}</ul>
      </div>
      <div class="brd-card">
        <div class="brd-card-label">💡 집사 팁</div>
        <div class="brd-card-desc">${b.tip}</div>
      </div>

      <div class="brd-divider"></div>
      <div class="brd-title">🏆 나와 잘 맞는 묘종 TOP 5</div>
      ${top5}

      <div class="brd-worst">
        <div class="brd-card-label">🙅 의외로 안 맞는 묘종</div>
        <div class="brd-worst-name">${result.worst.breed.emoji} ${result.worst.breed.name} <span>${result.worst.percent}%</span></div>
        <div class="brd-card-desc">${result.worstReason || '생활 패턴과 맞지 않는 부분이 많아요.'}</div>
      </div>

      <div class="brd-footer">
        묘종 특성은 일반적인 경향이며 같은 묘종이라도 성격 차이가 큽니다.<br>
        털 알레르기는 털 길이와 별개로 개체마다 달라 입양 전 직접 만나 확인하는 것이 좋아요.<br>
        품종보다 중요한 건 한 아이와의 궁합이에요. 가까운 보호소에서 나와 맞는 아이를 만나 보는 것도 좋은 방법입니다.
      </div>
    `;
    container.style.display = 'block';
  }
};
