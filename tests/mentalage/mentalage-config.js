// mentalage-config.js — 내 정신연령은 몇 살? 정신연령 테스트
// 의존: mentalage-test.js (MENTALAGE_QUESTIONS, MENTALAGE_AREAS, MENTALAGE_BANDS, MENTALAGE_REAL_AGES,
//                          mentalAgeGapText, calcMentalAge)

window.TEST_CONFIGS = window.TEST_CONFIGS || {};

// 같은 점수가 항상 같은 번호에 오지 않도록 문항 번호에 따라 선택지 순서를 돌린다(결정적)
function mentalAgeRotate(arr, n) {
  const k = n % arr.length;
  return arr.slice(k).concat(arr.slice(0, k));
}

window.TEST_CONFIGS['mentalage'] = {
  data: {
    title: "내 정신연령은 몇 살? 정신연령 테스트",
    shareTag: "정신연령 테스트",
    emoji: "🧠",
    thumb: "images/mentalage/thumb.webp",
    subtitle: "취향·생활·소통·멘탈로 알아보는 나의 마음 나이 (12문항)",
    questions: MENTALAGE_QUESTIONS.map(q => ({
      q: q.emoji + ' ' + q.question,
      choices: mentalAgeRotate(q.choices, q.id).map(c => ({
        text: c.text,
        _area: q.area,
        _pts: c.pts,
        score: { _: 0 }
      }))
    })),
    results: Object.fromEntries(
      Object.entries(MENTALAGE_BANDS).map(([k, v]) => [k, {
        type: v.emoji + ' ' + v.name,
        emoji: v.emoji,
        tagline: v.tagline,
        desc: v.desc
      }])
    )
  },

  onAnswer(choice, state) {
    state.answersRaw.push({ area: choice._area, pts: choice._pts });
  },

  calcResult(state) {
    const r = calcMentalAge(state.answersRaw);
    const b = r.bandInfo;
    return Object.assign({}, r, {
      winner: r.band,
      // 공유 카드와 결과 제목에 나이가 크게 보이도록 유형 이름에 나이를 포함
      type: b.emoji + ' 정신연령 ' + r.age + '세',
      emoji: b.emoji,
      tagline: b.name + ' · ' + b.tagline,
      desc: b.desc
    });
  },

  // 결과 이미지가 준비된 구간만 이미지 사용, 나머지는 이모지로 대체
  getShareImage(winner) {
    const ready = ['B1', 'B2', 'B3', 'B4', 'B5', 'B6', 'B7', 'B8'];
    return ready.includes(winner) ? `images/mentalage/${winner}.webp` : null;
  },

  afterResult(result) {
    const container = document.getElementById('mentalageStats');
    if (!container) return;

    const b = result.bandInfo;
    const minAge = 6, maxAge = 70;
    const pos = Math.max(0, Math.min(100, ((result.age - minAge) / (maxAge - minAge)) * 100));

    // 영역별 나이
    const areaRows = Object.entries(MENTALAGE_AREAS).map(([key, a]) => {
      const v = result.areas[key];
      const w = Math.max(6, Math.min(100, ((v.age - minAge) / (maxAge - minAge)) * 100));
      const tag = key === result.oldest ? '가장 어른스러워요' : (key === result.youngest ? '가장 어려요' : '');
      return `
        <div class="ma-area">
          <div class="ma-area-top">
            <span class="ma-area-name">${a.emoji} ${a.name}</span>
            <span class="ma-area-age">${v.age}세</span>
          </div>
          <div class="ma-area-desc">${a.desc}${tag ? ` · <b>${tag}</b>` : ''}</div>
          <div class="ma-area-track"><div class="ma-area-fill" style="width:${w}%"></div></div>
        </div>
      `;
    }).join('');

    const spiky = result.spread >= 20
      ? `영역마다 나이 차이가 큰 편이에요. <b>${MENTALAGE_AREAS[result.youngest].name}</b>는 어린데 <b>${MENTALAGE_AREAS[result.oldest].name}</b>는 어른스러운, 입체적인 사람이에요.`
      : `영역마다 나이가 고르게 비슷한 편이에요. 어디서나 일관된 마음 나이를 가진 사람이에요.`;

    const list = arr => arr.map(s => `<li>${s}</li>`).join('');

    container.innerHTML = `
      <div class="ma-hero">
        <div class="ma-hero-label">나의 정신연령</div>
        <div class="ma-hero-age">${result.age}<span>세</span></div>
        <div class="ma-hero-band" style="color:${b.color}">${b.emoji} ${b.name}</div>
        <div class="ma-gauge">
          <div class="ma-gauge-track"><div class="ma-gauge-marker" style="left:${pos}%"><span>${result.age}</span></div></div>
          <div class="ma-gauge-scale"><span>6세</span><span>20</span><span>35</span><span>50</span><span>70세</span></div>
        </div>
        <div class="ma-keywords">${b.keywords.map(k => '#' + k).join(' ')}</div>
      </div>

      <div class="ma-gap">
        <div class="ma-gap-label">🎂 내 실제 나이대는?</div>
        <div class="ma-gap-btns">${MENTALAGE_REAL_AGES.map(r => `<button type="button" class="ma-gap-btn" data-age="${r.age}">${r.label}</button>`).join('')}</div>
        <div class="ma-gap-result" id="maGapResult">연령대를 고르면 실제 나이와 비교해 드려요.</div>
      </div>

      <div class="ma-divider"></div>
      <div class="ma-title">영역별 마음 나이</div>
      <div class="ma-sub">${spiky}</div>
      ${areaRows}

      <div class="ma-divider"></div>
      <div class="ma-card">
        <div class="ma-card-label">🔎 이럴 때 티가 나요</div>
        <ul>${list(b.clues)}</ul>
      </div>
      <div class="ma-card">
        <div class="ma-card-label">👥 친구들이 말하는 나</div>
        <div class="ma-card-desc">${b.friends}</div>
      </div>
      <div class="ma-card">
        <div class="ma-card-label">💡 이렇게 해 보세요</div>
        <div class="ma-card-desc">${b.tip}</div>
      </div>

      <div class="ma-footer">재미로 보는 테스트이며 심리학적 진단이 아닙니다. 실제 나이와 달라도 괜찮아요. 마음의 나이는 상황에 따라 바뀌어요.</div>
    `;

    // 실제 나이대 비교
    container.querySelectorAll('.ma-gap-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        container.querySelectorAll('.ma-gap-btn').forEach(x => x.classList.remove('ma-on'));
        btn.classList.add('ma-on');
        document.getElementById('maGapResult').textContent = mentalAgeGapText(result.age, +btn.dataset.age);
      });
    });

    container.style.display = 'block';
  }
};
