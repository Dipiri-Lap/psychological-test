const fs = require('fs');
const path = require('path');

const BASE = 'https://testlab.tmhub.co.kr';

const TEST_META = {
  sbti: { title: 'SBTI 성격 유형 테스트', desc: '나의 숨겨진 본능은? (30문항)', img: '/images/sbti/thumb.webp' },
  jealousy: { title: '질투 유형 테스트', desc: '쿨한 척하지만 속은 부글부글?', img: '/images/jealousy/thumb.webp' },
  attachment: { title: '애착 유형 테스트', desc: '안정형? 불안형? 회피형?', img: '/images/attachment/thumb.webp' },
  brain: { title: '좌뇌 우뇌 테스트', desc: '나는 논리파? 감성파?', img: '/images/brain/thumb.webp' },
  fingerlove: { title: '손가락 연애 스타일', desc: '손가락 하나로 알아보는 나의 연애 스타일', img: '/images/fingerlove/thumb.webp' },
  sleeplove: { title: '잠자는 자세 연애 스타일', desc: '잠드는 자세로 알아보는 나의 연애 스타일', img: '/images/sleeplove/thumb.png' },
  pein: { title: '갓생 살긴 글렀나? 본격 폐인 지수 측정기', desc: '본격 \'현생 탈출\' 테스트: 나의 폐인 레벨은?', img: '/images/Pein/thumb.webp' },
  kakaotalklove: { title: '카톡 답장 스타일로 보는 연애 유형', desc: '카톡 하나로 알아보는 나의 연애 타입 (12문항)', img: '/images/kakaotalklove/thumb.png' },
  obsession: { title: '나의 집착 레벨 테스트', desc: '연인에게 나는 어느 정도 집착할까? (12문항)', img: '/images/obsession-test/thumb.webp' },
  weather: { title: '날씨 기분 테스트', desc: '오늘 내 기분을 날씨로 표현한다면?', img: '/images/weather/thumb.webp' },
  kkondae: { title: '꼰대 성분 분석표', desc: '나의 꼰대 지수를 6가지 성분으로 분석합니다 (12문항)', img: '/images/kkondae/thumb.webp' },
  philconomy: { title: '필코노미 지수 테스트', desc: '내 지갑을 여는 건 이성인가 감정인가? (10문항)', img: '/images/philconomy/thumb.webp' },
  travel: { title: '나의 여행 메이트 유형', desc: '계획형? 즉흥형? 나의 여행 스타일과 동행 궁합 (12문항)', img: '/images/travel/thumb.webp' },
  ai: { title: 'AI 의존도 테스트', desc: '나의 AI 의존도를 5가지 성분으로 분석합니다 (12문항)', img: '/images/ai/thumb.webp' },
  study: { title: '나의 학습 유형 테스트', desc: '시각형? 청각형? 체험형? 나에게 맞는 공부법 찾기 (20문항)', img: '/images/study/thumb.webp' },
  nunchi: { title: '남 눈치 테스트', desc: '나의 눈치 지수를 5가지 성분으로 분석합니다 (20문항)', img: '/images/nunchi/thumb.webp' },
  mbtidep: { title: 'MBTI 의존도 테스트', desc: '나의 MBTI 의존도를 5가지 성분으로 분석합니다 (12문항)', img: '/images/mbti_dependency_test/thumb.webp' },
  blackhistory: { title: '흑역사 보유량 테스트', desc: '내 과거의 흑역사 보유량을 정밀 측정합니다 (15문항)', img: '/images/blackhistory/thumb.webp' },
  cheatline: { title: '어디까지 바람일까? 바람 기준선 테스트', desc: '내가 생각하는 바람의 기준선은 어디일까? (15문항)', img: '/images/cheatline/thumb.webp' },
  datepay: { title: '데이트 비용, 누가 더 내야 해? 연애 지갑 테스트', desc: '내 연애 지갑은 몇 대 몇으로 맞춰져 있을까? (15문항)', img: '/images/datepay/thumb.webp' },
  friendline: { title: '남사친 여사친, 어디까지 친구야?', desc: '내 이성 친구 관계, 애인이 보면 괜찮을까? (15문항)', img: '/images/friendline/thumb.webp' },
  dopamine: { title: '숏폼 없이 몇 시간 버텨? 도파민 중독 테스트', desc: '내 도파민 회로, 얼마나 짧아졌을까? (15문항)', img: '/images/dopamine/thumb.webp' },
  somecheck: { title: '이거 썸이야, 아니야? 썸 판독기', desc: '상대의 신호 15개로 썸 확률을 계산합니다 (15문항)', img: '/images/somecheck/thumb.webp' },
  reunion: { title: '우리 다시 만날 수 있을까? 재회 가능성 테스트', desc: '15가지 신호로 재회 확률을 계산합니다 (15문항)', img: '/images/reunion/thumb.webp' },
  lovelang: { title: '나의 사랑의 언어는? 5가지 사랑 표현 테스트', desc: '인정하는 말·시간·선물·봉사·스킨십, 나를 채우는 사랑은? (15문항)', img: '/images/lovelang/thumb.webp' },
  boredom: { title: '우리 권태기일까? 권태기 진단 테스트', desc: '설렘부터 미래 계획까지, 우리 관계의 온도는? (15문항)', img: '/images/boredom/thumb.webp' },
  dogmbti: { title: '우리 강아지 MBTI 검사', desc: '사교성·호기심·교감·생활 방식 4축으로 보는 강아지 성격 (28문항)', img: '/images/dogmbti/thumb.webp' },
  catmbti: { title: '우리 고양이 MBTI 검사', desc: '사교성·호기심·교감·생활 방식 4축으로 보는 고양이 성격 (28문항)', img: '/images/catmbti/thumb.webp' },
  dogbreed: { title: '나와 찰떡인 강아지는? 견종 매칭 테스트', desc: '성향과 생활 패턴으로 찾는 찰떡궁합 견종 (26문항 · 20견종)', img: '/images/dogbreed/thumb.webp' },
  catbreed: { title: '나와 찰떡인 고양이는? 묘종 매칭 테스트', desc: '성향과 생활 패턴으로 찾는 찰떡궁합 묘종 (26문항 · 20묘종)', img: '/images/catbreed/thumb.webp' },
  petowner: { title: '나는 어떤 반려인일까? 집사·견주 유형 테스트', desc: '케어러? 놀이 파트너? 나의 집사·견주 스타일 6유형 (18문항)', img: '/images/petowner/thumb.webp' },
  mentalage: { title: '내 정신연령은 몇 살? 정신연령 테스트', desc: '취향·생활·소통·멘탈로 알아보는 나의 마음 나이 (12문항)', img: '/images/mentalage/thumb.webp' },
  mindscape: { title: '그림으로 보는 내 마음 — 마음의 풍경 테스트', desc: '글 대신 그림으로 고르는 6장면, 지금 가장 끌리는 풍경은? (6문항)', img: '/images/mindscape/thumb.webp' },
  moral:      { title: '도덕 정렬 테스트',        desc: '나는 Lawful Good? Chaotic Evil?',      img: '/images/jealousy/thumb.webp' },
  humor:      { title: '유머 스타일 테스트',       desc: '나의 웃음 코드는?',                    img: '/images/jealousy/thumb.webp' },
};

module.exports = (req, res) => {
  const id   = req.query.id || '';
  const meta = TEST_META[id] || { title: '마음. — 심리테스트', desc: '나를 알아가는 심리테스트', img: '/images/sbti/thumb.webp' };
  const pageUrl  = `${BASE}/test.html?id=${id}`;
  const imageUrl = `${BASE}${meta.img}`;
  const fullTitle = `${meta.title} — 마음.`;

  let html = fs.readFileSync(path.join(process.cwd(), 'test.html'), 'utf8');

  html = html
    .replace(/<title>[^<]*<\/title>/, `<title>${fullTitle}</title>`)
    .replace(/<meta property="og:title"[^>]*>/, `<meta property="og:title" content="${fullTitle}" id="ogTitle" />`)
    .replace(/<meta property="og:description"[^>]*>/, `<meta property="og:description" content="${meta.desc}" id="ogDesc" />`)
    .replace(/<meta property="og:image"[^>]*>/, `<meta property="og:image" content="${imageUrl}" />`)
    .replace(/<meta property="og:url"[^>]*>/, `<meta property="og:url" content="${pageUrl}" id="ogUrl" />`)
    .replace(/<meta name="twitter:title"[^>]*>/, `<meta name="twitter:title" content="${fullTitle}" />`)
    .replace(/<meta name="twitter:description"[^>]*>/, `<meta name="twitter:description" content="${meta.desc}" />`)
    .replace(/<meta name="twitter:image"[^>]*>/, `<meta name="twitter:image" content="${imageUrl}" />`)
    .replace(/<link rel="canonical"[^>]*>/, `<link rel="canonical" href="${pageUrl}" id="canonical" />`);

  res.setHeader('Content-Type', 'text/html; charset=utf-8');
  res.setHeader('Cache-Control', 's-maxage=3600');
  res.send(html);
};
