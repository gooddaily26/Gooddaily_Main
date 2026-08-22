// 내부링크 검사 단독 실행: npm run check:links
import { checkInternalLinks, formatErrors } from '../src/lib/check-internal-links.mjs';

const errors = checkInternalLinks();
if (errors.length > 0) {
  console.error(formatErrors(errors));
  process.exit(1);
}
console.log('✓ 내부링크 이상 없음');
