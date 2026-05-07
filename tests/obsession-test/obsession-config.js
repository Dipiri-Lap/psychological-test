// obsession-config.js — 나의 집착 레벨 테스트
// 의존: obsession-test.js (OBSESSION_QUESTIONS, OBSESSION_LEVELS, calcObsessionLevel)

window.TEST_CONFIGS = window.TEST_CONFIGS || {};

window.TEST_CONFIGS['obsession'] = {
  data: {
    title: "나의 집착 레벨 테스트",
    emoji: "💀",
    thumb: "images/obsession-test/thumb.webp",
    subtitle: "연인에게 나는 어느 정도 집착할까? (12문항)",
    questions: OBSESSION_QUESTIONS.map(q => ({
      q: q.question,
      choices: q.choices.map(c => ({
        text: c.text,
        _score: c.score,
        score: { _: 0 }
      }))
    })),
    results: Object.fromEntries(
      Object.entries(OBSESSION_LEVELS).map(([k, v]) => [k, {
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
    const result = calcObsessionLevel(state.answersRaw);
    const info = result.levelInfo;
    return {
      winner: result.levelKey,
      type: info.emoji + ' ' + info.name,
      emoji: info.emoji,
      tagline: info.tagline,
      desc: info.desc,
      badge: info.badge,
      color: info.color,
      totalScore: result.totalScore,
      percentage: result.percentage
    };
  },
  afterResult(result) {
    const container = document.getElementById('obsessionStats');
    if (!container) return;
    container.innerHTML = `
      <div class="finger-trait-card" style="border-left: 3px solid ${result.color};">
        <div class="finger-trait-title">${result.badge}</div>
        <div class="finger-trait-desc">총점 ${result.totalScore}점 / 36점 &nbsp;·&nbsp; 집착 지수 ${result.percentage}%</div>
      </div>
    `;
    container.style.display = 'block';
  },
  getShareImage(winner) {
    const map = { FREE: 0, MILD: 1, MODERATE: 2, HIGH: 3, EXTREME: 4 };
    return `images/obsession-test/${map[winner] ?? 0}.webp`;
  }
};
