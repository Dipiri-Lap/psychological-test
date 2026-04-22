const fs = require('fs');
const path = require('path');

const BASE = 'https://psychological-test-mu.vercel.app';

const TEST_META = {
  sbti:       { title: 'SBTI 성격 유형 테스트',  desc: '나의 숨겨진 본능은? (30문항)',          img: '/images/sbti/thumb.webp' },
  jealousy:   { title: '질투 유형 테스트',        desc: '나의 질투 레벨은 어느 정도일까?',        img: '/images/jealousy/thumb.webp' },
  attachment: { title: '애착 유형 테스트',        desc: '안정형? 불안형? 회피형?',               img: '/images/jealousy/thumb.webp' },
  moral:      { title: '도덕 정렬 테스트',        desc: '나는 Lawful Good? Chaotic Evil?',      img: '/images/jealousy/thumb.webp' },
  brain:      { title: '좌뇌 우뇌 테스트',        desc: '나는 논리파? 감성파?',                  img: '/images/jealousy/thumb.webp' },
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
