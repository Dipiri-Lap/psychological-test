// kakao-config.js — 카톡 답장 스타일로 보는 연애 유형
// 의존: kakao-test.js (KAKAO_QUESTIONS, KAKAO_TYPES)

window.TEST_CONFIGS = window.TEST_CONFIGS || {};

window.TEST_CONFIGS['kakaotalklove'] = {
  data: {
    title: "카톡 답장 스타일로 보는 연애 유형",
    emoji: "💬",
    thumb: "images/kakaotalklove/thumb.png",
    subtitle: "카톡 하나로 알아보는 나의 연애 타입",
    questions: KAKAO_QUESTIONS.map(q => ({
      q: q.question,
      choices: q.choices.map(c => ({
        text: c.text,
        score: { [c.type]: 1 }
      }))
    })),
    results: Object.fromEntries(
      Object.entries(KAKAO_TYPES).map(([k, v]) => [k, {
        type: v.emoji + ' ' + v.name,
        emoji: v.emoji,
        tagline: v.tagline,
        desc: v.desc + '\n\n💪 강점: ' + v.strength + '\n⚠️ 약점: ' + v.weakness
      }])
    )
  },
  calcResult(state) {
    const s = state.scores;
    const sorted = Object.entries(s).sort((a, b) => b[1] - a[1]);
    const topScore = sorted[0][1];
    const winner = topScore <= 3 ? 'MIXED' : sorted[0][0];
    const t = KAKAO_TYPES[winner];
    return {
      winner,
      type: t.emoji + ' ' + t.name,
      emoji: t.emoji,
      tagline: t.tagline,
      desc: t.desc + '\n\n💪 강점: ' + t.strength + '\n⚠️ 약점: ' + t.weakness
    };
  },
  getShareImage(winner) {
    const map = { FAST: 0, STEADY: 1, CHILL: 2, ANXIOUS: 3, ROMANTIC: 4, MIXED: 5 };
    const idx = map[winner] ?? 0;
    return `images/kakaotalklove/${idx}.png`;
  }
};
