"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Footer } from "@/components/footer";
import solutionBanner from "@/public/toss-miniapp/solution-banner.png";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

const fadeSlideUp = {
  hidden: { opacity: 0, y: 28, scale: 0.98 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.7 },
  },
};

const fadeSlideIn = {
  hidden: { opacity: 0, y: 18, filter: "blur(4px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.7 },
  },
};

const stagger = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

function Section({
  children,
  className = "",
  id,
}: {
  children: React.ReactNode;
  className?: string;
  id?: string;
}) {
  return (
    <section
      id={id}
      className={`w-full px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-24 ${className}`}
    >
      <div className="mx-auto w-full max-w-6xl">{children}</div>
    </section>
  );
}

function SectionHeading({
  eyebrow,
  title,
  description,
  titleClassName = "",
  descriptionClassName = "",
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  titleClassName?: string;
  descriptionClassName?: string;
}) {
  return (
    <div className="space-y-3 text-center">
      {eyebrow ? (
        <p className="text-sm font-semibold uppercase tracking-[0.08em] text-blue-600">
          {eyebrow}
        </p>
      ) : null}
      <h2
        className={`text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl ${titleClassName}`}
      >
        {title}
      </h2>
      {description ? (
        <p
          className={`mx-auto max-w-2xl text-base text-slate-600 sm:text-lg ${descriptionClassName}`}
        >
          {description}
        </p>
      ) : null}
    </div>
  );
}

function CTAButtons({
  variant = "light",
  align = "start",
  className = "",
  compact = false,
  showSecondary = true,
  hideSecondaryOnMobile = false,
}: {
  variant?: "light" | "dark";
  align?: "start" | "center" | "end";
  className?: string;
  compact?: boolean;
  showSecondary?: boolean;
  hideSecondaryOnMobile?: boolean;
}) {
  const isDark = variant === "dark";
  const primaryClasses = isDark
    ? "bg-white text-slate-900 hover:bg-slate-100"
    : "bg-blue-600 text-white shadow-sm shadow-blue-200 hover:bg-blue-700";
  const secondaryClasses = isDark
    ? "border border-white/30 text-white hover:border-white/60"
    : "border border-slate-200 text-slate-900 hover:border-blue-200 hover:text-blue-700";

  const justify =
    align === "center"
      ? "justify-center"
      : align === "end"
      ? "justify-end"
      : "justify-start";

  const wrap = compact ? "flex-nowrap" : "flex-wrap";
  const gap = compact ? "gap-2" : "gap-3";
  const sizeClasses = compact
    ? "h-9 min-w-[110px] sm:min-w-[130px] px-3 text-xs sm:h-10 sm:px-4 sm:text-sm"
    : "h-10 min-w-[130px] sm:min-w-[140px] px-4 text-sm sm:h-11 sm:px-5";

  return (
    <div className={`flex ${wrap} ${gap} ${justify} ${className}`}>
      <a
        href="/contact"
        className={`inline-flex items-center justify-center rounded-full font-semibold transition ${sizeClasses} ${primaryClasses}`}
      >
        상담하기
      </a>
      {showSecondary ? (
        <a
          href="mailto:contact@pakids.team"
          className={`${
            hideSecondaryOnMobile ? "hidden sm:inline-flex" : "inline-flex"
          } items-center justify-center rounded-full font-semibold transition ${sizeClasses} ${secondaryClasses}`}
        >
          미니앱 제작 소개서 받기
        </a>
      ) : null}
    </div>
  );
}

export default function TossMiniAppIntro() {
  return (
    <main className="bg-white text-slate-900">
      <PageHeader />
      <HeroSection />
      <ProblemSection />
      <MiniAppIntroSection />
      <ComparisonSection />
      {/* <SolutionSection /> */}
      <ReviewSection />
      <FooterAnchor />
      <Footer />
    </main>
  );
}

function PageHeader() {
  return (
    <header className="sticky top-0 z-20 bg-white/80 backdrop-blur-md">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3">
          <Image
            src="/pakids-logo.png"
            alt="파키즈 로고 - Pakids"
            width={120}
            height={72}
            className="transition-transform duration-300 hover:scale-110"
            priority
          />
        </div>
        <CTAButtons
          compact
          align="end"
          hideSecondaryOnMobile
          className="items-center overflow-x-auto pb-1"
        />
      </div>
    </header>
  );
}

function HeroSection() {
  return (
    <Section className="pt-20 sm:pt-24 lg:pt-28">
      <motion.div
        initial="hidden"
        animate="visible"
        variants={fadeUp}
        className="flex flex-col gap-10 lg:flex-row lg:items-center lg:justify-between"
      >
        <div className="space-y-6 lg:max-w-xl">
          <h1 className="text-4xl font-bold leading-tight tracking-tight sm:text-5xl">
            토스 미니앱으로
            <br />더 많은 고객과
            <br />
            빠르게 만나는 방법
          </h1>
          <p className="text-lg text-slate-600">
            토스 미니앱으로 3,000만 사용자에게 내 서비스를 출시해보세요.
            <br />
            이미 운영중인 서비스, 새로 런칭하는 신규 서비스, 모두 토스
            미니앱에서 선보일 수 있습니다.
          </p>
          <CTAButtons />
        </div>
        <div className="relative w-full max-w-xl overflow-hidden rounded-2xl border border-slate-100 bg-slate-50 shadow-sm">
          <div className="relative aspect-[4/3] w-full">
            <Image
              src="/toss-miniapp/hero-visual.png"
              alt="토스 미니앱 대시보드 그래프 비주얼"
              fill
              sizes="(min-width: 1024px) 480px, 90vw"
              className="object-cover"
              priority
            />
          </div>
        </div>
      </motion.div>
    </Section>
  );
}

function ProblemSection() {
  const cards = [
    "기존 플랫폼에서 점유율 경쟁이 너무 힘들어요.",
    "새로운 유통 채널을 찾기가 쉽지 않아요.",
    "우리 서비스에 대한 빠른 시장 검증이 필요해요.",
    "마케팅은 열심히 했는데 성과가 잘 안 나와요.",
    "마케팅 인력이 없어서 고객 유치가 어려워요.",
    "일단 출시는 했는데, 신규 고객 유입이 잘 안 돼요.",
  ];

  const rotations = [-6, 4, -3, 6, -4, 5];

  return (
    <Section className="relative overflow-hidden bg-gradient-to-b from-blue-50 via-white to-white">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={fadeUp}
        className="mb-12"
      >
        <SectionHeading
          title="이 중 하나라도 공감된다면, 지금이 바로 시작할 때예요."
          titleClassName="text-black"
        />
      </motion.div>

      <div className="absolute inset-x-[-20%] top-[-25%] h-[420px] rounded-full bg-gradient-to-b from-blue-200/60 via-blue-100/40 to-transparent blur-3xl" />

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={stagger}
        className="relative grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
      >
        {cards.map((text, idx) => (
          <motion.div
            key={text}
            variants={fadeUp}
            transition={{ delay: 0.05 * idx }}
            className="relative"
          >
            <div style={{ transform: `rotate(${rotations[idx]}deg)` }}>
              <div className="group flex min-h-[96px] items-center rounded-2xl border border-blue-100 bg-white px-5 py-4 text-blue-700 shadow-md shadow-blue-100/40 transition duration-200 ease-out hover:-translate-y-0.5 hover:scale-[1.03] hover:border-blue-600 hover:bg-blue-700 hover:text-white hover:shadow-blue-300/40">
                <p className="w-full text-center text-base font-semibold transition-colors duration-200">
                  {text}
                </p>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </Section>
  );
}

function MiniAppIntroSection() {
  const highlights = [
    "토스의 3,000만 사용자에게 즉시 노출",
    "결제 · 본인인증 등 핵심 기능을 기본 제공",
    "플랫폼 신뢰도 기반의 높은 전환율",
  ];

  return (
    <Section className="relative overflow-hidden bg-slate-900 text-white">
      <div className="absolute inset-0 opacity-70">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(59,130,246,0.25),transparent_45%),radial-gradient(circle_at_80%_0%,rgba(14,165,233,0.18),transparent_35%),radial-gradient(circle_at_50%_70%,rgba(14,116,144,0.22),transparent_45%)]" />
      </div>

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={fadeUp}
        className="relative grid gap-10 lg:grid-cols-2 lg:items-center"
      >
        <div className="space-y-6">
          <p className="text-sm font-semibold uppercase tracking-[0.14em] text-blue-200">
            Toss Miniapp
          </p>
          <h2 className="text-3xl font-bold leading-tight sm:text-4xl">
            토스 안에서 바로 만나는
            <br />
            새로운 서비스 런칭 방식
          </h2>
          <p className="text-lg text-slate-200">
            별도의 앱 설치 없이 토스 홈에서 바로 진입해 고객의 첫 경험을 줄여
            전환을 높입니다. 파키즈 팀은 기획, 개발, 검수까지 원스톱으로 지원해
            빠르게 시장을 검증할 수 있도록 돕습니다.
          </p>

          <div className="grid gap-3 sm:grid-cols-2">
            {highlights.map((item) => (
              <motion.div
                key={item}
                variants={fadeSlideUp}
                className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 shadow-[0_8px_30px_rgba(0,0,0,0.18)] backdrop-blur"
              >
                <div className="grid h-9 w-9 place-items-center rounded-full bg-gradient-to-br from-blue-500 to-cyan-400 text-sm font-semibold text-slate-900">
                  +
                </div>
                <p className="text-base text-white/90">{item}</p>
              </motion.div>
            ))}
          </div>

          <CTAButtons variant="dark" />
        </div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={fadeSlideUp}
          className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-slate-800 via-slate-900 to-slate-950 p-6 shadow-2xl"
        >
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_40%_30%,rgba(59,130,246,0.25),transparent_45%),radial-gradient(circle_at_80%_60%,rgba(14,165,233,0.25),transparent_40%)]" />
          <div className="relative space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-blue-200">Dashboard</p>
                <p className="text-xl font-semibold text-white">
                  Miniapp Launch
                </p>
              </div>
              <div className="flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-3 py-1 text-xs text-blue-50">
                실시간 트래픽
                <span className="h-2 w-2 rounded-full bg-emerald-400" />
              </div>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <p className="text-sm text-slate-200">유입 전환율</p>
                <p className="text-3xl font-bold text-white">58%</p>
                <p className="text-xs text-blue-200">앱 설치 없이 바로 진입</p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <p className="text-sm text-slate-200">런칭 리드타임</p>
                <p className="text-3xl font-bold text-white">-40%</p>
                <p className="text-xs text-blue-200">검수 프로세스 최적화</p>
              </div>
            </div>
            <div className="rounded-2xl border border-white/10 bg-gradient-to-r from-blue-500/20 via-cyan-400/20 to-emerald-400/20 p-4">
              <p className="text-sm text-blue-100">Security & Payment</p>
              <p className="text-lg font-semibold text-white">
                토스 인증 · 결제 연동으로 초기 구축 비용과 시간을 절감합니다.
              </p>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </Section>
  );
}

function ComparisonSection() {
  const comparisons = [
    {
      title: "배포 프로세스",
      traditional: "스토어 심사 · 업로드 · 배포 동기화 필요",
      miniapp: "토스 검수 통과 후 즉시 배포, 설치 없이 접근",
    },
    {
      title: "고객 유입",
      traditional: "마케팅/광고로 앱 설치 유도 → 이탈률 발생",
      miniapp: "토스 홈/탐색 탭 진입 → 클릭 즉시 서비스 경험",
    },
    {
      title: "핵심 기능",
      traditional: "인증/결제 직접 구축, 보안 인증 비용 부담",
      miniapp: "토스 인증 · 결제 · 사용자 정보 흐름 기본 제공",
    },
    {
      title: "운영/유지보수",
      traditional: "OS별 빌드 관리, 업데이트 공수 증가",
      miniapp: "단일 웹 코드베이스, 서버 배포만으로 반영",
    },
  ];

  const benefits = [
    "빠른 MVP 출시와 시장 검증",
    "토스 브랜드 신뢰 기반 전환율",
    "보안/결제/인증 내장으로 개발 비용 절감",
    "유저 풀을 활용한 성장 마케팅 기회",
  ];

  return (
    <Section className="bg-slate-50">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={fadeUp}
        className="mb-12 text-center space-y-4"
      >
        <p className="text-sm font-semibold uppercase tracking-[0.12em] text-blue-600">
          Compare
        </p>
        <h2 className="text-3xl font-bold text-slate-900 sm:text-4xl">
          기존 앱 개발 vs 토스 미니앱
        </h2>
        <p className="text-base text-slate-600 sm:text-lg">
          동일한 기능이라도 진입 경로와 배포 방식에 따라 결과가 달라집니다. 토스
          미니앱이 제공하는 효율과 속도를 확인하세요.
        </p>
      </motion.div>

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={stagger}
        className="grid gap-4"
      >
        {comparisons.map((item, idx) => (
          <motion.div
            key={item.title}
            variants={fadeUp}
            transition={{ delay: idx * 0.05 }}
            className="grid items-stretch gap-3 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:grid-cols-[1.2fr,1fr,1fr]"
          >
            <div className="flex items-center gap-3">
              <div className="grid h-10 w-10 place-items-center rounded-full bg-blue-50 text-blue-700 font-semibold">
                0{idx + 1}
              </div>
              <div>
                <p className="text-sm text-slate-500">비교 항목</p>
                <p className="text-lg font-semibold text-slate-900">
                  {item.title}
                </p>
              </div>
            </div>
            <div className="rounded-xl border border-slate-100 bg-slate-50 p-4">
              <p className="text-xs font-semibold uppercase tracking-[0.08em] text-slate-500">
                기존 앱
              </p>
              <p className="mt-2 text-sm text-slate-700">{item.traditional}</p>
            </div>
            <div className="rounded-xl border border-blue-100 bg-gradient-to-br from-blue-50 to-cyan-50 p-4">
              <p className="text-xs font-semibold uppercase tracking-[0.08em] text-blue-700">
                토스 미니앱
              </p>
              <p className="mt-2 text-sm text-slate-800">{item.miniapp}</p>
            </div>
          </motion.div>
        ))}
      </motion.div>

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={fadeUp}
        className="mt-10 grid gap-4 rounded-2xl border border-blue-100 bg-white p-6 shadow-sm lg:grid-cols-[1.1fr,1fr]"
      >
        <div className="space-y-3">
          <p className="text-sm font-semibold text-blue-700">
            Why Toss Miniapp
          </p>
          <h3 className="text-2xl font-bold text-slate-900">
            토스 플랫폼의 신뢰와 유저풀을 그대로 활용하세요
          </h3>
          <p className="text-base text-slate-600">
            파키즈 팀은 검수 전략부터 연동, QA, 운영 자동화까지 지원합니다.
            플랫폼의 장점을 살린 기획과 UI/UX로 더 빠른 성과를 내드립니다.
          </p>
          <CTAButtons />
        </div>
        <div className="grid gap-3 sm:grid-cols-2">
          {benefits.map((benefit, idx) => (
            <motion.div
              key={benefit}
              variants={fadeSlideUp}
              transition={{ delay: idx * 0.04 }}
              className="flex items-start gap-3 rounded-xl border border-slate-100 bg-slate-50 px-4 py-3"
            >
              <div className="mt-1 h-2.5 w-2.5 rounded-full bg-blue-600" />
              <p className="text-sm text-slate-800">{benefit}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </Section>
  );
}

function SolutionSection() {
  return (
    <section className="relative w-full overflow-hidden px-4 py-12 text-white sm:px-6 sm:py-16 lg:px-8 lg:py-20">
      <div className="relative mx-auto max-w-6xl">
        <div className="relative aspect-[16/9] w-full overflow-hidden rounded-3xl border border-white/10 bg-black shadow-2xl md:aspect-[21/9]">
          <Image
            src={solutionBanner}
            alt="토스 미니앱 솔루션 배너"
            fill
            sizes="(min-width: 1024px) 1100px, 100vw"
            className="object-cover"
            placeholder="blur"
            priority
          />

          <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/10 to-black/60" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_45%,rgba(0,0,0,0.55)_0%,rgba(0,0,0,0.25)_32%,rgba(0,0,0,0)_60%)] sm:bg-[radial-gradient(circle_at_50%_45%,rgba(0,0,0,0.6)_0%,rgba(0,0,0,0.3)_36%,rgba(0,0,0,0)_62%)] lg:bg-[radial-gradient(circle_at_50%_45%,rgba(0,0,0,0.65)_0%,rgba(0,0,0,0.35)_38%,rgba(0,0,0,0)_64%)]" />

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.25 }}
            variants={stagger}
            className="relative z-10 flex h-full flex-col justify-center gap-6 px-4 sm:gap-8 sm:px-6 lg:gap-10 lg:px-8"
          >
            <div className="flex flex-col items-center gap-4 sm:gap-6 md:flex-row md:items-start md:justify-between">
              <motion.p
                variants={fadeSlideIn}
                tabIndex={0}
                className="w-full max-w-[220px] rounded-full border border-white/30 bg-black/65 px-4 py-2 text-center text-[clamp(14px,2.5vw,18px)] font-semibold text-blue-50 shadow-[0_2px_8px_rgba(0,0,0,0.6)] drop-shadow-[0_2px_8px_rgba(0,0,0,0.6)] backdrop-blur-[20px] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white/80 sm:text-[clamp(16px,3vw,20px)] md:max-w-[240px]"
              >
                더 많은 사용자에게
              </motion.p>

              <motion.div
                variants={fadeSlideUp}
                className="relative w-full max-w-[780px] overflow-hidden rounded-3xl border border-white/30 bg-black/65 px-5 py-6 text-center shadow-[0_2px_8px_rgba(0,0,0,0.6)] backdrop-blur-[20px] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white/80 sm:px-8 sm:py-8 md:max-w-3xl md:text-left lg:px-10"
                tabIndex={0}
              >
                <div className="pointer-events-none absolute inset-0 rounded-3xl bg-[radial-gradient(circle_at_50%_50%,rgba(140,186,255,0.35)_0%,rgba(88,158,255,0.22)_32%,rgba(40,120,255,0.12)_48%,rgba(0,0,0,0)_70%)] mix-blend-screen" />
                <div className="relative space-y-3 sm:space-y-4">
                  <h2 className="text-[clamp(32px,5vw,56px)] font-bold leading-tight tracking-tight drop-shadow-[0_2px_8px_rgba(0,0,0,0.6)]">
                    앱인토스, 거인의 어깨에 오르다
                  </h2>
                  <p className="text-[clamp(16px,3vw,20px)] text-white/95 drop-shadow-[0_2px_8px_rgba(0,0,0,0.6)]">
                    토스라는 강력한 플랫폼을 바탕으로 우리의 서비스를 제공할 수
                    있습니다.
                  </p>
                  <p className="text-[clamp(14px,2.5vw,18px)] text-white/85 drop-shadow-[0_2px_8px_rgba(0,0,0,0.6)]">
                    높은 트래픽, 신뢰성 있는 결제·보안, 그리고 검증된 사용자
                    경험을 바탕으로 더 많은 고객을 빠르게 만날 수 있습니다.
                  </p>
                </div>
              </motion.div>

              <motion.p
                variants={fadeSlideIn}
                tabIndex={0}
                className="w-full max-w-[220px] rounded-full border border-white/30 bg-black/65 px-4 py-2 text-center text-[clamp(14px,2.5vw,18px)] font-semibold text-blue-50 shadow-[0_2px_8px_rgba(0,0,0,0.6)] drop-shadow-[0_2px_8px_rgba(0,0,0,0.6)] backdrop-blur-[20px] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white/80 sm:text-[clamp(16px,3vw,20px)] md:max-w-[240px]"
              >
                더 빠르게
              </motion.p>
            </div>

            <motion.div
              variants={fadeSlideUp}
              className="w-full md:max-w-3xl md:self-center"
            >
              <div className="relative space-y-2 overflow-hidden rounded-2xl border border-white/30 bg-black/65 px-4 py-4 text-center shadow-[0_2px_8px_rgba(0,0,0,0.6)] backdrop-blur-[20px] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white/80 sm:px-6 sm:py-5 md:text-left">
                <h3 className="text-[clamp(18px,3.6vw,26px)] font-bold drop-shadow-[0_2px_8px_rgba(0,0,0,0.6)]">
                  파트너사의 성공을 위한 앱인토스의 다양한 지원
                </h3>
                <p className="text-[clamp(14px,2.5vw,18px)] text-white/90 drop-shadow-[0_2px_8px_rgba(0,0,0,0.6)]">
                  미니앱을 위한 인프라, 트래픽, 수익화 장치를 제공합니다.
                </p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function ReviewSection() {
  const testimonials = [
    {
      company: "주식회사 코심인터내셔널",
      role: "중국 통신 서비스 연동",
      quote:
        "중국 현지 개발자와 직접 소통하며 API 문서 검토, 테스트 환경 세팅까지 모두 맡아주셨어요. 양쪽 개발자와 긴밀히 협의해 기술 이슈도 빠르게 해결해주셨고, 덕분에 토스 미니앱을 무사히 출시해 지금은 사용자 반응도 좋습니다. 복잡한 프로젝트를 깔끔하게 마무리해주셔서 감사합니다.",
    },
    {
      company: "주식회사 야몽시큐리티",
      role: "보안 솔루션 · OK",
      quote:
        "타이트한 일정이었는데도 기한을 정확히 맞춰 완성해주셨어요. 급하게 만들었을 텐데 디테일까지 챙겨주셔서 놀랐습니다. 버그도 거의 없었고 테스트를 꼼꼼히 진행해주셨고, 런칭 당일에도 모니터링을 함께 해주셔서 든든했습니다. 이런 파트너 만나기 쉽지 않은데 정말 운이 좋았다고 생각해요.",
    },
    {
      company: "UNIDEV",
      role: "교육 플랫폼",
      quote:
        "개발 기간을 짧게 잡아주셔서 빠르게 런칭할 수 있었습니다. 급한 수정 요청도 바로 처리해주시고, 소통이 빨라 카톡을 보내면 거의 실시간으로 답변을 주셨어요. 배포 후에도 계속 관리해주셔서 든든하고 궁금한 점을 언제든 물어볼 수 있어 좋습니다. 실력도 좋고 일처리도 깔끔합니다.",
    },
    {
      company: "paperiemoodin",
      role: "이커머스 · OK",
      quote:
        "만들어주신 서비스를 정말 잘 사용하고 있습니다. 유지보수도 꼼꼼하게 챙겨주시고, 개발을 잘 몰라 막막했는데도 상담을 친절하게 해주셨어요. 대응도 빠르고 서버 계정 생성부터 결제까지 모든 과정을 도와주셔서 감사합니다.",
    },
  ];

  return (
    <Section>
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={fadeUp}
        className="mb-12"
      >
        <SectionHeading
          title="파키즈와 함께한 고객사에요"
          description="실제 파키즈와 함께한 고객사의 경험을 확인하세요"
        />
      </motion.div>

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={stagger}
        className="grid gap-6 md:grid-cols-2"
      >
        {testimonials.map((item, idx) => (
          <motion.div
            key={item.company}
            variants={fadeUp}
            transition={{ delay: idx * 0.03 }}
            whileHover={{
              y: -6,
              scale: 1.01,
              boxShadow: "0 10px 30px rgba(15, 23, 42, 0.12)",
            }}
            whileTap={{ scale: 0.995 }}
            className="flex h-full flex-col rounded-2xl border border-slate-200 bg-white/90 p-6 shadow-sm backdrop-blur"
          >
            <p className="mb-6 text-base leading-relaxed text-slate-700">
              “{item.quote}”
            </p>
            <div className="mt-auto text-sm font-semibold text-slate-500 text-right">
              {item.company}
            </div>
          </motion.div>
        ))}
      </motion.div>
    </Section>
  );
}

function FooterAnchor() {
  return (
    <div className="bg-slate-50">
      <Section className="py-12 sm:py-16">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={fadeUp}
          className="text-center space-y-4"
        >
          <h3 className="text-3xl font-bold text-slate-900 sm:text-4xl">
            토스 미니앱, 지금 상담해 보세요
          </h3>
          <p className="mx-auto max-w-2xl text-base text-slate-600 sm:text-lg">
            토스 안에서 고객을 만나고 싶다면 파키즈 팀에 문의해주세요. 서비스
            목표와 예산에 맞춰 기획·개발·런칭까지 한 번에 지원해드립니다.
          </p>
          <CTAButtons align="center" />
        </motion.div>
      </Section>
    </div>
  );
}
