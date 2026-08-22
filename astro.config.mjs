import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import remarkDirective from 'remark-directive';
import remarkGoodaily from './src/lib/remark-goodaily.mjs';
import { checkInternalLinks, formatErrors } from './src/lib/check-internal-links.mjs';

// 빌드 시작 전에 발행 글의 내부링크를 전수 검사 — 깨진 링크가 있으면 배포를 중단해
// 404가 사이트에 올라가는 것을 막습니다. (수동 실행: npm run check:links)
const goodailyLinkCheck = {
  name: 'goodaily-link-check',
  hooks: {
    'astro:build:start': () => {
      const errors = checkInternalLinks();
      if (errors.length > 0) {
        throw new Error(formatErrors(errors));
      }
      console.log('✓ 내부링크 이상 없음');
    },
  },
};

export default defineConfig({
  site: 'https://gooddaily.co.kr',
  integrations: [sitemap(), goodailyLinkCheck],
  markdown: {
    // 본문 커스텀 블록(강조박스/형광펜/버튼/표 래핑) 파이프라인
    remarkPlugins: [remarkDirective, remarkGoodaily],
  },
});
