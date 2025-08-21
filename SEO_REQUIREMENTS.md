## 한국어 SEO 진단 및 개선 요구사항 (Next.js App Router)

본 문서는 현재 리포지토리의 설정과 코드를 기준으로 한국어(ko-KR) 검색 성능이 저조한 원인을 진단하고, 파일·코드 단위의 구체적 조치와 기대효과를 우선순위에 따라 정리했습니다.

### 현황 요약
- **프레임워크**: Next.js 15 (App Router)
- **언어 구조**: 한국어가 루트(`/`), 영어는 `/en` 하위 경로
- **메타데이터**: `app/layout.tsx`에서 전역 메타, `app/en/page.tsx`, `app/en/contact/page.tsx`는 페이지 단위 메타 정의. 한국어 홈(`app/page.tsx`)·한국어 연락처(`app/contact/...`)의 페이지 전용 메타는 부재
- **hreflang/대체 링크**: `alternates.languages`는 일부 정의되어 있으나, `x-default` 미지정, 사이트맵 교차 언어 링크 미구현
- **HTML lang**: 루트 레이아웃이 `<html lang="ko">`로 고정, 영어 경로에서도 `lang=ko` 노출 가능성 높음
- **이미지 최적화**: `next.config.mjs`에서 `images.unoptimized: true`로 비활성화
- **구조화 데이터**: `Organization`, `WebSite` JSON-LD는 존재. `LocalBusiness/ProfessionalService`, `BreadcrumbList`, FAQ 등은 미구현
- **사이트맵/로봇**: `app/sitemap.ts`는 최소 경로만 포함, `public/robots.txt`에 `Crawl-delay: 1` 지정

---

## 우선순위별 핵심 문제와 해결안

### P0. HTML `lang` 속성의 경로별 정확성 확보
- **문제**: `app/layout.tsx`가 `<html lang="ko">`를 고정 출력. `/en` 이하 영어 페이지도 `lang=ko`로 렌더링될 가능성이 큼. 이는 언어 인식/색인 오류와 중복 콘텐츠 판단에 악영향.
- **해결**:
  - 권장: 라우트 구조를 `app/[locale]/...`로 개편하고 `generateStaticParams`로 `['ko','en']` 생성, 루트 레이아웃에서 `params.locale`에 따라 `<html lang>` 설정.
  - 단기: 클라이언트에서 `document.documentElement.lang`을 경로 기준으로 보정. 장기적으로는 SSR 단계에서 올바른 `lang`을 출력하는 방향으로 구조 전환.
- **관련 파일**: `app/layout.tsx`, `app/en/layout.tsx`, 라우트 구조 전반
- **기대효과**: 
  - 언어·지역 타게팅 정확도 향상 → 잘못된 색인·중복 이슈 감소
  - 다국어 신호 일관성 확보 → 한국어/영어 각각 랭킹 안정화

### P0. 이미지 최적화 활성화(코어 웹 바이탈)
- **문제**: `next.config.mjs`에서 `images.unoptimized: true`로 설정되어 LCP, CLS, INP 등 지표 악화 가능성.
- **해결**:
  - `images.unoptimized` 제거 또는 `false`로 설정하고, 이미지 사용처를 `next/image`로 통일.
  - 외부 호스트를 쓸 경우 `images.remotePatterns` 또는 `domains` 설정 추가.
- **관련 파일**: `next.config.mjs`, 이미지를 사용하는 컴포넌트들
- **기대효과**:
  - LCP 10–40% 개선 가능, 모바일 SEO 가시성 상승
  - 크롤링/색인 속도와 CTR 간접 개선

### P0. 다국어 hreflang 신호 강화 (메타데이터 + 사이트맵)
- **문제**: 메타데이터에 언어 대체 링크가 있으나 `x-default` 부재. 사이트맵에 교차 언어 대체 링크 미포함.
- **해결**:
  - `metadata.alternates.languages`에 `"x-default"` 추가.
  - `app/sitemap.ts`에서 각 URL에 `alternates.languages`를 추가해 ko-KR/en-US 교차 링크와 `x-default` 제공.
- **관련 파일**: `app/layout.tsx`, `app/en/layout.tsx`, `app/sitemap.ts`
- **기대효과**:
  - 한국/영어 버전 매칭 정확도 향상 → 잘못된 지역 노출 감소, 세션 품질 개선

### P1. 페이지별 한국어 메타데이터 보강
- **문제**: 한국어 홈(`app/page.tsx`)과 한국어 연락처 페이지(`/contact`)에 페이지 전용 `metadata`가 없음. 전역 메타로만 커버되어 검색 의도·문구 최적화 부족.
- **해결**:
  - `app/page.tsx`에 한국어 타이틀/디스크립션/OG/Twitter 메타 명시.
  - `app/contact/page.tsx`(신규)에서 한국어 연락처 페이지 메타 정의.
- **관련 파일**: `app/page.tsx`, `app/contact/page.tsx`(신규), `app/contact/layout.tsx`
- **기대효과**:
  - 쿼리 적합도 향상으로 CTR 상승, 브랜드 쿼리 외 롱테일 유입 확대

### P1. 타이틀 템플릿과 키워드 최적화
- **문제**: 현재 타이틀 템플릿이 `파키즈 | %s`. 검색 의도에 따라 핵심 키워드를 좌측 우선 배치하는 것이 유리한 경우가 많음.
- **해결**: 한국어 페이지 타이틀을 `%s | 파키즈` 패턴으로 조정하고, 페이지별 핵심 키워드가 앞에 오도록 정리.
- **관련 파일**: `app/layout.tsx` 및 각 페이지 메타
- **기대효과**: CTR 3–10%p 개선 가능(브랜드/서비스명 검색에서 체감)

### P1. 사이트맵 확장 및 최신화 정책
- **문제**: 현재 `app/sitemap.ts`는 최소 경로만 포함하고 언어 대체 링크/우선순위 정책이 단조로움.
- **해결**:
  - 모든 중요 URL(서비스 섹션/블로그/케이스 스터디 등 포함 시) 반영.
  - 각 항목에 `lastModified`, `changeFrequency`, `priority`, `alternates.languages` 설정.
- **관련 파일**: `app/sitemap.ts`
- **기대효과**: 크롤링 효율 개선, 신규/변경 콘텐츠의 색인 속도 단축

### P2. 구조화 데이터 확장(한국어 로컬/서비스 신호 강화)
- **문제**: `Organization`, `WebSite`만 존재. 서비스/지역 맥락 부족.
- **해결**:
  - `ProfessionalService` 또는 `LocalBusiness`(한국 주소/전화/영업지역 포함) JSON-LD 추가.
  - 주요 페이지에 `BreadcrumbList`, FAQ 섹션에는 `FAQPage` 적용.
- **관련 파일**: `app/layout.tsx`(또는 각 페이지 헤드 영역), 관련 섹션 컴포넌트
- **기대효과**: 리치 결과 노출 가능성 증가 → CTR 상승

### P2. robots.txt 크롤 정책 조정
- **문제**: `Crawl-delay: 1` 지정. 일부 검색엔진(특히 Naver/Bing)은 이를 준수하여 크롤 빈도를 제한할 수 있음.
- **해결**: `Crawl-delay` 제거 또는 더 완화. 서버 여건에 따라 결정.
- **관련 파일**: `public/robots.txt`
- **기대효과**: 초기/변경 콘텐츠 크롤 속도 증가, 색인 지연 최소화

### P3. 기타 품질 개선 권고
- **메타 keywords**: `keywords` 메타는 검색엔진에서 거의 무시. 과도한 나열은 노이즈. 간결화 또는 제거 권장. 관련 파일: `app/layout.tsx`
- **내부링크 앵커 텍스트**: 한국어 키워드 포함 내부 링크 최적화(헤더/푸터/본문). 관련 컴포넌트: `components/...`
- **이미지 대체 텍스트**: 한국어 맥락 반영 alt 속성 점검.
- **콘텐츠 현지화**: 한국어 페이지에 한국 시장 용어/사례/가격정책 등 현지성 강화.

---

## 실행 체크리스트 (파일 단위)

- [ ] `app/layout.tsx`: 
  - [ ] 타이틀 템플릿을 `%s | 파키즈`로 조정
  - [ ] `alternates.languages`에 `x-default` 추가
  - [ ] (구조 개선 시) `params` 기반으로 `<html lang>` 동적 설정
  - [ ] `keywords` 정리 또는 제거
- [ ] `app/en/layout.tsx`:
  - [ ] `alternates.languages`에 `x-default` 추가
  - [ ] (구조 개선 시) 레이아웃 전략 통합(`[locale]` 기반)
- [ ] `app/page.tsx`(KO 홈):
  - [ ] 한국어 페이지 전용 `metadata` 추가(타이틀/디스크립션/OG/Twitter)
- [ ] `app/contact/page.tsx`(신규, KO 연락처):
  - [ ] 한국어 연락처 페이지 메타 추가 및 `alternates` 설정
- [ ] `app/sitemap.ts`:
  - [ ] 모든 핵심 URL 반영
  - [ ] `alternates.languages`와 `x-default` 포함
- [ ] `next.config.mjs`:
  - [ ] `images.unoptimized` 제거 또는 `false`
  - [ ] 외부 이미지 호스트 허용 설정
- [ ] `public/robots.txt`:
  - [ ] `Crawl-delay` 제거/완화 검토
- [ ] 구조화 데이터:
  - [ ] `LocalBusiness/ProfessionalService`, `BreadcrumbList`, `FAQPage` 적용
- [ ] 서치 콘솔/서치 어드바이저:
  - [ ] Google Search Console, Naver Search Advisor 등록/소유권 검증(이미 환경변수 지원됨)
  - [ ] `sitemap.xml` 제출 및 주기 점검

---

## 변경 전/후 기대효과

- **언어 신호 정합성 개선**: 한국어/영어 페이지 구분 명확 → 색인 오류·중복 이슈 감소 → 안정적 노출
- **코어 웹 바이탈 개선**: LCP, CLS, INP 개선 → 모바일 순위·가시성 상승 → 자연검색 유입 증대
- **CTR 상승**: 타이틀/디스크립션 최적화 및 리치결과 노출로 클릭률 3–15%p 개선 기대
- **색인 속도 향상**: 사이트맵·크롤 정책 최적화로 신규/변경 페이지 반영 지연 감소

---

## 구현 가이드 (참고용 코드 스케치)

아래 스니펫은 구현 방향을 제시하기 위한 참고용으로, 프로젝트 스타일에 맞게 조정하세요.

```ts
// app/layout.tsx (일부)
export const metadata: Metadata = {
  title: { default: "파키즈 | Pakids 크리에이티브 에이전시", template: "%s | 파키즈" },
  alternates: {
    canonical: "/",
    languages: {
      "ko-KR": "/",
      "en-US": "/en",
      "x-default": "/",
    },
  },
}
```

```ts
// app/sitemap.ts (언어 교차 링크 예시)
export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://www.pakids.team"
  return [
    {
      url: `${base}/`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
      alternates: {
        languages: {
          "ko-KR": `${base}/`,
          "en-US": `${base}/en`,
          "x-default": `${base}/`,
        },
      },
    },
  ]
}
```

```txt
# public/robots.txt (예시)
User-agent: *
Disallow:
Sitemap: https://www.pakids.team/sitemap.xml
# Crawl-delay: 1  ← 서버 상황상 필요할 때만 사용
```

```ts
// next.config.mjs (핵심만 예시)
const nextConfig = {
  images: {
    // unoptimized: false, // 기본값 사용(제거)
    remotePatterns: [
      { protocol: "https", hostname: "s3.us-east-2.amazonaws.com", pathname: "/cdn.pakids.team/**" },
    ],
  },
}
export default nextConfig
```

---

## 모니터링 및 운영
- **서치 콘솔/네이버 서치 어드바이저**: 소유권 검증(meta 태그 환경변수 적용), 사이트맵 등록, 색인 현황·커버리지 점검
- **코어 웹 바이탈**: PageSpeed Insights/LH CI/CrUX 모니터링, LCP/CLS/INP 목표: P75 기준 Good
- **로그/알림**: 사이트맵 빌드 실패, 크롤 에러(5xx/4xx), CLS 급증 알림 설정 권장

---

## 우선순위/일정 제안
1. P0(언어 신호, 이미지 최적화, hreflang 보강) → 배포 + 1–2주 추적
2. P1(페이지 메타 확장, 사이트맵 확장, 타이틀 템플릿) → 배포 + 2–3주 추적
3. P2/P3(구조화 데이터, robots 정책, 콘텐츠/내부링크) → 순차 반영

