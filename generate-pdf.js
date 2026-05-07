const puppeteer = require('puppeteer');
const http      = require('http');
const fs        = require('fs');
const path      = require('path');

const PORT = 3456;
const TYPE = process.argv[2] || 'INTJ-AS'; // node generate-pdf.js ENFP-TC
const ROOT = __dirname;

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.css' : 'text/css',
  '.js'  : 'application/javascript',
  '.json': 'application/json',
  '.webp': 'image/webp',
  '.png' : 'image/png',
  '.jpg' : 'image/jpeg',
};

/* ── 간단한 로컬 정적 파일 서버 ── */
function createServer() {
  return http.createServer((req, res) => {
    const urlPath  = decodeURIComponent(req.url.split('?')[0]);
    const filePath = path.join(ROOT, urlPath === '/' ? 'index.html' : urlPath);
    const ext      = path.extname(filePath).toLowerCase();

    fs.readFile(filePath, (err, data) => {
      if (err) { res.writeHead(404); res.end('Not found'); return; }
      res.writeHead(200, { 'Content-Type': MIME[ext] || 'text/plain' });
      res.end(data);
    });
  });
}

async function main() {
  /* 1. 로컬 서버 시작 */
  const server = createServer();
  await new Promise(resolve => server.listen(PORT, resolve));
  console.log(`✓ 서버 시작: http://localhost:${PORT}`);

  /* 2. Puppeteer 실행 */
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });
  const page = await browser.newPage();

  /* A4 기준 뷰포트 (794px = 210mm @ 96dpi) */
  await page.setViewport({ width: 794, height: 1123, deviceScaleFactor: 2 });

  /* 3. 페이지 열기 */
  const url = `http://localhost:${PORT}/mbti-pdf.html?type=${TYPE}`;
  console.log(`✓ 열기: ${url}`);
  await page.goto(url, { waitUntil: 'networkidle0', timeout: 15000 });

  /* 4. 결과 렌더링 완료 대기 */
  await page.waitForSelector('#reportEl[style*="block"]', { timeout: 10000 });

  /* 애니메이션 + 막대 그래프 전환 대기 */
  await new Promise(r => setTimeout(r, 1200));

  /* 5. PDF 저장 */
  const outDir = path.join(ROOT, 'pdfs');
  if (!fs.existsSync(outDir)) fs.mkdirSync(outDir);

  const pdfPath = path.join(outDir, `${TYPE}.pdf`);
  await page.pdf({
    path: pdfPath,
    format: 'A4',
    printBackground: true,
    margin: { top: '0mm', right: '0mm', bottom: '0mm', left: '0mm' },
  });

  console.log(`✓ PDF 저장: ${pdfPath}`);

  await browser.close();
  server.close();
}

main().catch(err => {
  console.error('오류:', err.message);
  process.exit(1);
});
