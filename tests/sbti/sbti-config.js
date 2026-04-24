// ============================================
// SBTI — 러너 설정 등록
// ============================================
// 의존: questions.js, type-patterns.js, dimension-descriptions.js
// ============================================

window.TEST_CONFIGS = window.TEST_CONFIGS || {};

window.TEST_CONFIGS['sbti'] = {
  data: {
    title: "SBTI 성격 유형 테스트",
    emoji: "💜",
    thumb: "images/sbti/thumb.webp",
    subtitle: "나의 숨겨진 본능은? (30문항)",
    questions: KBTI_QUESTIONS.map(q => ({
      q: q.question,
      choices: q.choices.map(c => ({
        text: c.text,
        emoji: c.label === 'L' ? '😐' : c.label === 'M' ? '🙂' : '😎',
        score: c.score
      }))
    })),
    results: KBTI_TYPES
  },
  onAnswer(choice, state) {
    state.answersRaw.push(choice.score);
  },
  calcResult(state) {
    const pattern = calcDimensions(state.answersRaw);
    const match   = matchType(pattern, KBTI_TYPE_PATTERNS);
    const winner  = match.type;
    const t       = KBTI_TYPES[winner];
    return { winner, type: t.name, emoji: t.emoji, desc: t.desc, tagline: t.tagline, pattern };
  },
  getShareImage(winner) {
    return `images/sbti/${winner}.webp`;
  },
  getSaveFilename(winner) {
    return `SBTI_${winner}.webp`;
  },
  afterResult(result) {
    if (typeof getDimensionAnalysis !== 'undefined') {
      renderDimAnalysis(getDimensionAnalysis(result.pattern));
    }
  },
  afterIntro() {
    const extra = document.getElementById('sbtiIntroExtra');
    if (extra) extra.style.display = 'block';
  }
};
