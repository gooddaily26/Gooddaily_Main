# 굿데일리 사이트 — GitHub 호스팅 + 비개발자 글쓰기 셋업 가이드

이 문서는 **한 번만** 하는 초기 설정과, 그 이후 **필자들이 매번** 하는 글쓰기 방법을 나눠서 설명합니다.

- 사이트: Astro 정적 사이트 → **GitHub Pages**로 호스팅
- 글쓰기: **Sveltia CMS** (`/admin`) → 비개발자가 웹에서 글 작성 → 저장하면 자동 배포
- 로그인: **GitHub OAuth** (Cloudflare Worker 경유)

전체 흐름: `CMS에서 저장 → 저장소에 커밋 → GitHub Actions가 빌드 → GitHub Pages 반영`

---

## A. 관리자가 처음 한 번만 하는 설정

### 1) 저장소 만들고 코드 올리기

GitHub에서 새 저장소(예: `goodaily-site`)를 만든 뒤, 이 폴더에서:

```bash
git init
git add .
git commit -m "init: 굿데일리 사이트"
git branch -M main
git remote add origin https://github.com/<사용자명>/<저장소명>.git
git push -u origin main
```

### 2) GitHub Pages 켜기

저장소 **Settings → Pages → Build and deployment → Source** 를 **GitHub Actions**로 선택합니다.
(이미 `.github/workflows/deploy.yml`이 있어서, 이후 커밋마다 자동 빌드·배포됩니다.)

### 3) 주소(도메인) 정하기 — 둘 중 하나

**(a) 커스텀 도메인 `gooddaily.co.kr`을 쓸 경우**
- `astro.config.mjs`의 `site`는 그대로 `https://gooddaily.co.kr` 유지.
- `public/CNAME` 파일을 만들고 안에 도메인 한 줄만 적기: `gooddaily.co.kr`
- 도메인 업체 DNS에서 GitHub Pages로 연결(CNAME/ A레코드) 후, Settings → Pages → Custom domain에 입력.

**(b) 도메인 없이 `사용자명.github.io/저장소명`으로 쓸 경우**
- `astro.config.mjs`를 다음처럼 수정:
  ```js
  site: 'https://<사용자명>.github.io',
  base: '/<저장소명>',   // 예: '/goodaily-site'
  ```
- `public/CNAME`은 만들지 않기.

### 4) 로그인용 OAuth 워커 배포 (Cloudflare, 무료)

비개발자가 "GitHub으로 로그인" 버튼만 누르면 되도록 하는 작은 인증 서버입니다.

1. Cloudflare 계정 생성(무료).
2. `sveltia-cms-auth` 저장소(https://github.com/sveltia/sveltia-cms-auth)의 **Deploy to Cloudflare** 버튼으로 배포.
3. 배포되면 워커 주소가 나옵니다: `https://sveltia-cms-auth.<서브도메인>.workers.dev` — **복사해 두기.**

### 5) GitHub OAuth 앱 등록

1. GitHub → Settings → Developer settings → **OAuth Apps → New OAuth App**.
2. 값 입력:
   - Application name: `굿데일리 CMS` (아무거나)
   - Homepage URL: 사이트 주소
   - **Authorization callback URL**: `https://sveltia-cms-auth.<서브도메인>.workers.dev/callback`
3. 생성 후 **Client ID**와 **Client Secret**을 발급/복사.
4. Cloudflare 워커 → Settings → Variables 에 환경변수 추가:
   - `GITHUB_CLIENT_ID` = 방금 Client ID
   - `GITHUB_CLIENT_SECRET` = 방금 Client Secret
   - (선택) `ALLOWED_DOMAINS` = 사이트 도메인 (예: `gooddaily.co.kr`)
   - 저장 후 재배포.

### 6) CMS 설정 파일 채우기

`public/admin/config.yml` 상단의 TODO 두 곳만 실제 값으로:

```yaml
backend:
  name: github
  repo: <사용자명>/<저장소명>      # 예: gooddaily/goodaily-site
  branch: main
  base_url: https://sveltia-cms-auth.<서브도메인>.workers.dev
```

수정 후 커밋·푸시하면 끝. `사이트주소/admin` 에서 로그인 화면이 뜹니다.

### 7) 필자(글쓴이) 초대

글을 쓸 사람마다 **한 번씩**:
- 그 사람에게 GitHub 계정(무료)이 있어야 함.
- 저장소 **Settings → Collaborators → Add people**로 초대 → 상대가 수락.
- 이후 그 사람은 `사이트주소/admin`에서 자유롭게 로그인·작성 가능.

> 보안 메모: OAuth 로그인은 넓은 `repo` 권한을 요청합니다. 이 사이트는 **전용 저장소**에 두고 민감정보를 넣지 마세요. 필자 계정에는 **2단계 인증(2FA)** 을 권장합니다.

---

## B. 필자가 매번 하는 것 — 글쓰기

1. `사이트주소/admin` 접속 → **GitHub으로 로그인**.
2. **포스팅 / 공지사항 / 채용** 중 선택 → **새로 만들기**.
3. 필드 작성:
   - 제목, 요약(검색 설명), 섹터, 발행일, (선택) 대표 이미지.
   - **임시저장(미게시)** 을 켜면 사이트에 안 보입니다. 발행하려면 끄기.
4. **본문**에서 글을 쓰고, 아래 커스텀 블록을 넣을 수 있습니다.
5. **저장** → 잠시 후(1~2분, 자동 빌드) 사이트에 반영.

### 본문 커스텀 블록 사용법

에디터 툴바의 **삽입(Insert)** 메뉴에 아래 3가지가 있습니다. 클릭해서 값만 채우면 됩니다.

| 블록 | 용도 | 결과 |
|------|------|------|
| **강조 박스** | 안내/팁/주의/핵심을 색 박스로 | 파랑·초록·주황·진파랑 박스 |
| **형광펜** | 문장 일부를 색으로 강조 | 형광펜 밑줄 강조 |
| **버튼** | 문의/신청 등 링크 버튼 | 파란 버튼 |

**직접 타이핑하고 싶을 때(원본 마크다운 모드)** 는 아래 문법을 그대로 쓰면 됩니다. 문법이 최종 기준이라 항상 정상 렌더링됩니다:

```markdown
:::callout{type="info"}
안내 박스입니다. **굵게**, [링크](/) 도 됩니다.
:::

:::callout{type="tip"}
팁 박스
:::

:::callout{type="warn"}
주의 박스
:::

:::callout{type="point"}
핵심 박스
:::

이 문장의 :hl[이 부분]만 형광펜으로 강조됩니다.

:button[문의하기]{href="/contact"}
```

- `type`은 `info`(안내·파랑), `tip`(팁·초록), `warn`(주의·주황), `point`(핵심·진파랑) 4가지.
- **중요:** 강조 박스는 여는 `:::callout{...}` 과 닫는 `:::` 을 **각각 다른 줄**에 써야 합니다. 한 줄로 붙여 쓰면 박스로 안 바뀝니다. (CMS의 "삽입 → 강조 박스" 버튼을 쓰면 자동으로 맞게 들어갑니다.)
- 박스 안에는 굵게/링크/목록 등 일반 마크다운을 자유롭게 사용할 수 있습니다.

> 색·폰트를 글자마다 자유롭게 바꾸는 기능은 일부러 넣지 않았습니다. 브랜드 일관성과 검색 노출(SEO)을 위해, 위의 정해진 블록으로 강조하는 방식을 권장합니다. 새 블록이 필요하면 개발자에게 요청하세요(추가는 쉽습니다).

---

## C. 개발자용 참고

- 블록 렌더링: `src/lib/remark-goodaily.mjs` + `astro.config.mjs`(remark-directive) → `src/styles/global.css`의 `.prose .callout / .post-hl / .post-button`.
- 블록 추가/색 변경은 위 세 파일만 손대면 됩니다(에디터 버튼은 `public/admin/index.html`).
- 로컬 미리보기: `npm install` 후 `npm run dev`.
- 참고: GitHub이 PKCE 인증을 지원하면 향후 OAuth 워커 없이도 로그인 가능해질 예정입니다. 그 전까지는 위 워커 방식이 필요합니다.
