# 굿데일리(Good Daily) 법인 사이트 — 메인 페이지 골격

Astro 정적 사이트. 구조·콘텐츠·SEO 골격만 구현되어 있고, **시각 디자인은 디자이너가
`global.css`의 토큰과 각 컴포넌트 `<style>`만 교체**하면 됩니다.

## 실행

```bash
npm install
npm run dev      # 로컬 미리보기 http://localhost:4321
npm run build    # 정적 빌드 → dist/ (Cloudflare Pages에 올리면 됨)
```

Cloudflare Pages 빌드 설정: build command `npm run build`, output `dist`.

## 콘텐츠 수정은 어디서?

거의 모든 텍스트·연락처·서비스 문구는 **`src/consts.ts` 한 파일**에 모여 있습니다.
페이지 구조 자체는 `src/pages/index.astro`.

## 폴더 구조

```
src/
  consts.ts                  ← 회사정보·연락처·서비스·내비 (수정 1순위)
  layouts/BaseLayout.astro   ← 전 페이지 공통 <head> + SEO (재사용)
  components/
    Header.astro             ← 주 내비(4개 서비스)
    Footer.astro             ← 사업자정보 + 공지/채용 + SNS
    Breadcrumb.astro         ← 섹터/포스팅용 경로 + 스키마 (홈 미사용)
  pages/index.astro          ← 메인(회사소개) 페이지
  styles/global.css          ← 디자인 토큰 (디자이너 교체 영역)
public/
  robots.txt, favicon.svg
```

## ✅ SEO 점검 — 구현 완료

- `<html lang="ko">`, charset, viewport, theme-color
- 페이지별 `<title>` / `meta description`
- `canonical` (절대 URL 자동 생성)
- `robots` (index,follow / noindex 토글 가능)
- Open Graph 전체 (type/site_name/title/description/url/image/locale=ko_KR)
- Twitter Card (summary_large_image)
- JSON-LD: 메인=Organization, (섹터/글=Service·BreadcrumbList 예정)
- `sitemap-index.xml` 자동 생성 + `robots.txt`에 연결
- 시맨틱 구조: 단일 H1, header/main/footer 랜드마크, 본문 바로가기, 키보드 포커스, reduced-motion

## ⚠️ 실제 값으로 교체해야 할 항목 (TODO)

`src/consts.ts` 와 `astro.config.mjs`:
- 실제 **도메인** (canonical/OG/sitemap 기준)
- **전화번호**, **카카오톡 비즈니스 채널 URL**
- **사업자 정보**: 대표자·사업자등록번호·주소·이메일
- **SNS/유튜브** 링크 (sameAs)

`public/` 에 배치:
- **og-default.png** (1200×630, OG 공유 이미지)
- **logo.png** (Organization 스키마 로고)
- favicon (현재 임시 G 마크)

## 다음 단계

- 4개 섹터(필러) 페이지: `src/pages/terminal/index.astro` 등 — BaseLayout + Breadcrumb 재사용
- 포스팅: Astro content collections + Sveltia CMS(`/admin`)
