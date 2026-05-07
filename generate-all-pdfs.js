const { execSync } = require('child_process');

const TYPES = ['INTJ','INTP','ENTJ','ENTP','INFJ','INFP','ENFJ','ENFP',
               'ISTJ','ISFJ','ESTJ','ESFJ','ISTP','ISFP','ESTP','ESFP'];
const VARIANTS = ['AC','AS','TC','TS'];

let success = 0, failed = 0;

for (const t of TYPES) {
  for (const v of VARIANTS) {
    const code = `${t}-${v}`;
    try {
      execSync(`node generate-pdf.js ${code}`, { stdio: 'inherit' });
      success++;
    } catch (e) {
      console.error(`✗ 실패: ${code}`);
      failed++;
    }
  }
}

console.log(`\n완료: 성공 ${success} / 실패 ${failed} / 전체 ${success + failed}`);
