import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import remarkDirective from 'remark-directive';
import remarkGoodaily from './src/lib/remark-goodaily.mjs';

// TODO: 실제 도메인으로 교체하세요. canonical/OG/sitemap 이 값을 기준으로 생성됩니다.
// GitHub Pages를 커스텀 도메인 없이 쓸 경우:
//   site: 'https://<사용자명>.github.io',
//   base: '/<저장소명>',   // 예: '/goodaily-site'
export default defineConfig({
  site: 'https://gooddaily.co.kr',
  integrations: [sitemap()],
  markdown: {
    // 본문 커스텀 블록(강조박스/형광펜/버튼) 파이프라인
    remarkPlugins: [remarkDirective, remarkGoodaily],
  },
});
