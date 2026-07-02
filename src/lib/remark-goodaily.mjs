/**
 * 굿데일리 본문 커스텀 블록 — remark-directive 위에서 동작합니다.
 *
 * 글 안에서 쓸 수 있는 문법:
 *   :::callout{type="info"}     ← 강조 박스 (info / tip / warn / point)
 *   여기에 본문. **굵게**, [링크](/) 등 마크다운 그대로 사용 가능.
 *   :::
 *
 *   :hl[형광펜으로 강조할 문구]                 ← 인라인 형광펜
 *
 *   :button[문의하기]{href="/contact"}         ← 버튼형 링크
 *
 * 렌더링 결과의 색·모양은 src/styles/global.css 의 `.prose .callout` 등에서 제어합니다.
 */

const CALLOUT_TYPES = new Set(['info', 'tip', 'warn', 'point']);

export default function remarkGoodaily() {
  return (tree) => walk(tree);
}

function walk(node) {
  if (!node || !Array.isArray(node.children)) return;
  for (const child of node.children) {
    transform(child);
    walk(child);
  }
}

function transform(node) {
  // 강조 박스 (블록)
  if (node.type === 'containerDirective' && node.name === 'callout') {
    const raw = node.attributes && node.attributes.type;
    const type = CALLOUT_TYPES.has(raw) ? raw : 'info';
    node.data = node.data || {};
    node.data.hName = 'aside';
    node.data.hProperties = {
      className: ['callout', `callout--${type}`],
      'data-callout': type,
    };
    return;
  }

  // 형광펜 (인라인)
  if (node.type === 'textDirective' && node.name === 'hl') {
    node.data = node.data || {};
    node.data.hName = 'mark';
    node.data.hProperties = { className: ['post-hl'] };
    return;
  }

  // 버튼형 링크 (인라인/블록 모두 허용)
  if ((node.type === 'textDirective' || node.type === 'leafDirective') && node.name === 'button') {
    const href = (node.attributes && node.attributes.href) || '#';
    node.data = node.data || {};
    node.data.hName = 'a';
    node.data.hProperties = { className: ['post-button'], href };
    return;
  }
}
