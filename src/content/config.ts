import { defineCollection, z } from 'astro:content';

// CMS에서 선택 필드를 비워두면 undefined가 아니라 빈 문자열('')로 저장되므로,
// 빈 문자열은 "값 없음"으로 취급해 빌드가 깨지지 않게 한다.
const emptyToUndefined = (v: unknown) => (v === '' ? undefined : v);

// 포스팅 — 4개 섹터 중 하나에 속함(사일로). sector 값으로 필러 클러스터에 묶임.
const posts = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),                // meta description / 목록 요약
    sector: z.enum(['terminal', 'voucher', 'marketing', 'solution']),
    pubDate: z.coerce.date(),
    updatedDate: z.preprocess(emptyToUndefined, z.coerce.date().optional()),
    heroImage: z.preprocess(emptyToUndefined, z.string().optional()),       // /public 기준 경로
    heroImageAlt: z.preprocess(emptyToUndefined, z.string().optional()),    // 이미지 SEO
    draft: z.boolean().default(false),      // 검토 워크플로우용
  }),
});

// 공지사항 — 포스팅(SEO 클러스터)과 별개. 사일로/내부링크 대상 아님.
const notices = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    pubDate: z.coerce.date(),
    draft: z.boolean().default(false),
  }),
});

// 채용 공고
const careers = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    employmentType: z.string().optional(), // 정규직/계약직 등
    location: z.string().optional(),
    pubDate: z.coerce.date(),
    open: z.boolean().default(true),        // 모집중 여부
    draft: z.boolean().default(false),
  }),
});

export const collections = { posts, notices, careers };
