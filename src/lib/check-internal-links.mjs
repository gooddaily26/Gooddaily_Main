/**
 * 내부링크 검증 — 발행된(draft 아님) 포스팅의 본문 링크를 전수 검사합니다.
 *
 * 잡아내는 것:
 *   · 존재하지 않는 내부 주소로 건 링크 (오타, 삭제된 글)
 *   · 임시저장(draft) 상태의 글로 건 링크 (발행하면 404가 되는 링크)
 *   · public 폴더에 없는 이미지/파일 경로
 *
 * 실행 시점: astro build 시작 시 자동(astro.config.mjs 통합) + `npm run check:links`
 * 깨진 링크가 있으면 빌드가 중단되어 404가 사이트에 올라가는 것을 막습니다.
 * (배포 실패 시 기존 사이트는 그대로 유지되고, GitHub이 실패 메일을 보냅니다)
 */

import { readdirSync, readFileSync, existsSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = fileURLToPath(new URL('../..', import.meta.url));
const SECTORS = ['terminal', 'voucher', 'marketing', 'solution'];

function readCollection(sub) {
  const dir = path.join(ROOT, 'src/content', sub);
  if (!existsSync(dir)) return [];
  return readdirSync(dir)
    .filter((f) => f.endsWith('.md'))
    .map((f) => {
      const raw = readFileSync(path.join(dir, f), 'utf8');
      const fm = raw.match(/^---\r?\n([\s\S]*?)\r?\n---/);
      const head = fm ? fm[1] : '';
      return {
        file: `src/content/${sub}/${f}`,
        slug: f.replace(/\.md$/, ''),
        sector: (head.match(/^sector:\s*["']?([a-z]+)["']?\s*$/m) || [])[1] || '',
        draft: /^draft:\s*true\s*$/m.test(head),
        body: fm ? raw.slice(fm[0].length) : raw,
      };
    });
}

export function checkInternalLinks() {
  const posts = readCollection('posts');

  // 사이트에 실제로 존재하는 주소 목록
  const routes = new Set(['/', '/about/', '/notice/', '/careers/']);
  for (const s of SECTORS) routes.add(`/${s}/`);
  for (const n of readCollection('notices')) if (!n.draft) routes.add(`/notice/${n.slug}/`);
  for (const c of readCollection('careers')) if (!c.draft) routes.add(`/careers/${c.slug}/`);

  const postByRoute = new Map();
  for (const p of posts) if (p.sector) postByRoute.set(`/${p.sector}/${p.slug}/`, p);

  const errors = [];

  for (const p of posts) {
    if (p.draft) continue; // 발행된 글만 검사 (임시저장 글은 발행 시점에 검사됨)

    const links = [];
    let m;
    const mdLink = /\]\((\/[^)\s]*)\)/g;      // [문구](/주소), ![이미지](/경로)
    const hrefAttr = /href="(\/[^"]*)"/g;      // :button[...]{href="/주소"} 등
    while ((m = mdLink.exec(p.body))) links.push(m[1]);
    while ((m = hrefAttr.exec(p.body))) links.push(m[1]);

    for (const raw of links) {
      const clean = raw.split('#')[0].split('?')[0];
      if (!clean) continue;

      // 파일 경로(이미지 등)는 public 폴더에서 확인
      const lastSeg = clean.split('/').pop();
      if (lastSeg && lastSeg.includes('.')) {
        if (!existsSync(path.join(ROOT, 'public', decodeURI(clean)))) {
          errors.push({ file: p.file, link: raw, why: 'public 폴더에 해당 파일이 없습니다' });
        }
        continue;
      }

      const norm = clean.endsWith('/') ? clean : `${clean}/`;
      if (routes.has(norm)) continue;

      const target = postByRoute.get(norm);
      if (!target) {
        errors.push({ file: p.file, link: raw, why: '연결된 페이지가 존재하지 않습니다 (주소 오타 또는 삭제된 글)' });
      } else if (target.draft) {
        errors.push({
          file: p.file,
          link: raw,
          why: `연결된 글(${target.file})이 임시저장 상태입니다 — 그 글을 함께 발행하거나 링크를 빼세요`,
        });
      }
    }
  }

  return errors;
}

export function formatErrors(errors) {
  const lines = ['', '✗ 깨진 내부링크가 발견되어 배포를 중단합니다.', ''];
  for (const e of errors) {
    lines.push(`  글:   ${e.file}`);
    lines.push(`  링크: ${e.link}`);
    lines.push(`  문제: ${e.why}`);
    lines.push('');
  }
  lines.push('위 링크를 수정한 뒤 다시 저장(커밋)하면 자동으로 재배포됩니다.');
  return lines.join('\n');
}
