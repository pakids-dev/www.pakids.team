"use client";

import { useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { Footer } from "@/components/footer";
import solutionBanner from "@/public/toss-miniapp/solution-banner.png";
import { useAnalytics } from "@/hooks/use-analytics";

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
  sectionName,
}: {
  children: React.ReactNode;
  className?: string;
  id?: string;
  sectionName?: string;
}) {
  return (
    <section
      id={id}
      data-section={sectionName}
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
        className={`text-[clamp(1.5rem,6vw,2.25rem)] font-bold tracking-tight text-slate-900 break-keep ${titleClassName}`}
      >
        {title}
      </h2>
      {description ? (
        <p
          className={`mx-auto max-w-2xl text-[clamp(0.875rem,4vw,1.125rem)] text-slate-600 break-keep ${descriptionClassName}`}
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
  sectionName,
  onTrackCta,
}: {
  variant?: "light" | "dark";
  align?: "start" | "center" | "end";
  className?: string;
  compact?: boolean;
  showSecondary?: boolean;
  hideSecondaryOnMobile?: boolean;
  sectionName?: string;
  onTrackCta?: (ctaType: string, sectionName?: string) => void;
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
        href="https://pakids-toss-miniapp.channel.io"
        target="_blank"
        rel="noopener noreferrer"
        onClick={() => onTrackCta?.("consult", sectionName)}
        className={`inline-flex items-center justify-center rounded-full font-semibold transition ${sizeClasses} ${primaryClasses}`}
      >
        상담하기
      </a>
      {showSecondary ? (
        <a
          href="https://drive.google.com/file/d/1250ZTN_txy5rgglq5B_DXDz3c5-GlJ_n/view?usp=sharing"
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => onTrackCta?.("brochure", sectionName)}
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
  const { trackSectionView, trackCtaClick } = useAnalytics("/toss-miniapp");

  useEffect(() => {
    if (typeof window === "undefined") return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio >= 0.5) {
            const name = entry.target.getAttribute("data-section") ?? undefined;
            trackSectionView(name);
          }
        });
      },
      { threshold: 0.5 }
    );

    const sections = document.querySelectorAll("[data-section]");
    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, [trackSectionView]);

  return (
    <main className="bg-white text-slate-900">
      <PageHeader onTrackCta={trackCtaClick} />
      <HeroSection onTrackCta={trackCtaClick} />
      <ProblemSection />
      <MiniAppIntroSection />
      <PhoneMockupSection />
      <CaseStudySection />
      <ComparisonSection />
      <BetaBenefitSection onTrackCta={trackCtaClick} />
      <ReviewSection />
      <FooterAnchor onTrackCta={trackCtaClick} />
      <Footer />
    </main>
  );
}

function PageHeader({
  onTrackCta,
}: {
  onTrackCta: (ctaType: string, sectionName?: string) => void;
}) {
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
          sectionName="header"
          onTrackCta={onTrackCta}
          className="items-center overflow-x-auto pb-1"
        />
      </div>
    </header>
  );
}

function HeroSection({
  onTrackCta,
}: {
  onTrackCta: (ctaType: string, sectionName?: string) => void;
}) {
  return (
    <Section className="pt-20 sm:pt-24 lg:pt-28" sectionName="hero">
      <motion.div
        initial="hidden"
        animate="visible"
        variants={fadeUp}
        className="flex flex-col gap-10 lg:flex-row lg:items-center lg:justify-between"
      >
        <div className="space-y-6 lg:max-w-xl">
          <h1 className="text-[clamp(1.75rem,7vw,3rem)] font-bold leading-tight tracking-tight">
            토스 미니앱으로
            <br />더 많은 고객과
            <br />
            빠르게 만나는 방법
          </h1>
          <p className="text-[clamp(0.875rem,4vw,1.125rem)] text-slate-600 break-keep">
            토스 미니앱으로 3,000만 사용자에게 내 서비스를 출시해보세요.
            <br />
            이미 운영중인 서비스, 새로 런칭하는 신규 서비스, 모두 토스
            미니앱에서 선보일 수 있습니다.
          </p>
          <CTAButtons sectionName="hero" onTrackCta={onTrackCta} />
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
    <Section
      className="relative overflow-hidden bg-gradient-to-b from-blue-50 via-white to-white"
      sectionName="problem"
    >
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
                <p className="w-full text-center text-base font-semibold transition-colors duration-200 break-keep">
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
    {
      icon: "/toss-miniapp/money.png",
      title: "비용 · 시간 절감",
      desc: "하이브리드 앱 대비 개발 비용 60% 절감, 1~2개월 내 출시",
    },
    {
      icon: "/toss-miniapp/target.png",
      title: "정밀 타겟 마케팅",
      desc: "3,000만 토스 유저의 세그먼트 기반 효율적 고객 도달",
    },
    {
      icon: "/toss-miniapp/lock.png",
      title: "신뢰성 높은 인증 · 결제",
      desc: "토스의 검증된 인증/결제 서비스로 높은 편리성과 사용성 제공",
    },
  ];

  return (
    <Section
      className="relative overflow-hidden bg-white"
      sectionName="miniapp-intro"
    >
      {/* 배경 데코레이션 */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-32 top-0 h-[400px] w-[400px] rounded-full bg-gradient-to-br from-blue-100/60 to-cyan-100/40 blur-3xl" />
        <div className="absolute -right-32 bottom-0 h-[350px] w-[350px] rounded-full bg-gradient-to-tl from-blue-100/50 to-indigo-100/30 blur-3xl" />
      </div>

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={fadeUp}
        className="relative"
      >
        {/* 섹션 헤더 */}
        <div className="mb-12 text-center space-y-4">
          <div className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-4 py-1.5">
            <span className="h-2 w-2 rounded-full bg-blue-500" />
            <span className="text-sm font-semibold text-blue-700">
              토스 미니앱이란?
            </span>
          </div>
          <h2 className="text-[clamp(1.5rem,6vw,2.25rem)] font-bold tracking-tight text-slate-900 break-keep">
            토스 안에서 바로 만나는
            <br />
            <span className="text-blue-600">새로운 서비스 런칭 방식</span>
          </h2>
          <p className="mx-auto max-w-2xl text-[clamp(0.875rem,4vw,1.125rem)] text-slate-600 break-keep">
            별도의 앱 설치 없이 토스 홈에서 바로 진입해 고객의 첫 경험을 줄여
            전환을 높입니다. <br />
            파키즈 팀은 기획, 개발, 검수까지 턴키 방식으로 지원합니다.
          </p>
        </div>

        {/* 하이라이트 카드 그리드 */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={stagger}
          className="grid gap-6 sm:grid-cols-3"
        >
          {highlights.map((item, idx) => (
            <motion.div
              key={item.title}
              variants={fadeSlideUp}
              transition={{ delay: idx * 0.1 }}
              className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-blue-200 hover:shadow-lg hover:shadow-blue-100/50"
            >
              <div className="pointer-events-none absolute -right-6 -top-6 h-24 w-24 rounded-full bg-gradient-to-br from-blue-100/80 to-cyan-100/60 opacity-0 blur-2xl transition-opacity duration-300 group-hover:opacity-100" />
              <div className="relative">
                <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 to-blue-600 p-3 shadow-lg shadow-blue-200">
                  <Image
                    src={item.icon}
                    alt={item.title}
                    width={28}
                    height={28}
                    className="h-7 w-7 object-contain brightness-0 invert"
                  />
                </div>
                <h3 className="mb-2 text-lg font-bold text-slate-900">
                  {item.title}
                </h3>
                <p className="text-sm leading-relaxed text-slate-600 break-keep">
                  {item.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </Section>
  );
}

function PhoneMockupSection() {
  const steps = [
    {
      number: "01",
      title: "세그먼트 선정",
      desc: "타겟 고객 세분화",
    },
    {
      number: "02",
      title: "배너 / 푸시",
      desc: "토스 홈 최상단 노출",
    },
    {
      number: "03",
      title: "데이터 확인",
      desc: "대시보드 분석",
    },
  ];

  return (
    <Section
      className="relative overflow-hidden bg-gradient-to-b from-white via-blue-50/30 to-white"
      sectionName="phone-mockup"
    >
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -right-40 top-20 h-[500px] w-[500px] rounded-full bg-gradient-to-br from-blue-100/40 to-cyan-100/20 blur-3xl" />
      </div>

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={fadeUp}
        className="relative"
      >
        <div className="flex flex-col gap-12 lg:flex-row lg:items-center lg:gap-16">
          {/* 좌측 텍스트 영역 */}
          <div className="flex-1 space-y-8 lg:max-w-[55%]">
            {/* 아이브로우 뱃지 */}
            <div className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-4 py-1.5">
              <span className="h-2 w-2 rounded-full bg-blue-500 animate-pulse" />
              <span className="text-sm font-semibold text-blue-700">
                3,000만 유저 도달
              </span>
            </div>

            {/* 메인 헤드라인 */}
            <h2 className="text-[clamp(1.75rem,6vw,2.75rem)] font-bold leading-tight tracking-tight text-slate-900 break-keep">
              3천만 토스 유저를
              <br />
              <span className="text-blue-600">정말</span> 만날 수 있어요
            </h2>

            {/* 서브 텍스트 */}
            <p className="max-w-md text-[clamp(0.9rem,4vw,1.125rem)] leading-relaxed text-slate-600 break-keep">
              직접 세그먼트를 지정하고,
              <br />
              앱/푸시 배너 노출을 세팅하며,
              <br />
              그에 따른 결과까지 확인하세요.
            </p>

            {/* 3단계 플로우 카드 */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={stagger}
              className="flex flex-col gap-4 sm:flex-row sm:items-stretch"
            >
              {steps.map((step, idx) => (
                <motion.div
                  key={step.number}
                  variants={fadeUp}
                  transition={{ delay: idx * 0.1 }}
                  className="group relative flex-1"
                >
                  <div className="flex h-full flex-col rounded-xl border border-slate-200 bg-white p-4 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-blue-200 hover:shadow-lg hover:shadow-blue-100/50">
                    <span className="mb-2 text-2xl font-bold text-blue-600">
                      {step.number}
                    </span>
                    <h4 className="mb-1 text-base font-bold text-slate-900">
                      {step.title}
                    </h4>
                    <p className="text-sm text-slate-500">{step.desc}</p>
                  </div>
                  {/* 화살표 (마지막 제외) */}
                  {idx < steps.length - 1 && (
                    <div className="absolute -right-2 top-1/2 z-10 hidden -translate-y-1/2 text-slate-300 sm:block">
                      <svg
                        className="h-4 w-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    </div>
                  )}
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* 우측 폰 목업 이미지 */}
          <div className="relative flex-1 lg:max-w-[45%]">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="relative mx-auto max-w-sm"
            >
              {/* 폰 목업 이미지 - 이미지에 프레임 포함 */}
              <div className="relative aspect-[9/19] w-full">
                <Image
                  src="/toss-miniapp/phone-mockup.png"
                  alt="토스 미니앱 대시보드 화면"
                  fill
                  sizes="(min-width: 1024px) 360px, 280px"
                  className="object-contain drop-shadow-2xl"
                />
              </div>
              {/* 데코레이션 */}
              <div className="pointer-events-none absolute -right-8 -top-8 h-32 w-32 rounded-full bg-gradient-to-br from-blue-400/30 to-cyan-400/20 blur-2xl" />
              <div className="pointer-events-none absolute -bottom-8 -left-8 h-28 w-28 rounded-full bg-gradient-to-tr from-indigo-400/30 to-blue-400/20 blur-2xl" />
            </motion.div>
          </div>
        </div>
      </motion.div>
    </Section>
  );
}

function CaseStudySection() {
  // 오늘의 명언 성과 데이터 - TODO: 실제 수치로 교체
  const quoteAppStats = [
    {
      value: "3,000+",
      label: "사용자 수집",
      sublabel: "비용 0원으로, 타겟 고객 마케팅",
    },
    {
      value: "200+%",
      label: "광고수익 증가",
      sublabel: "비용은 zero, 수익은 증가",
    },
    { value: "17일", label: "출시 소요", sublabel: "빠른 MVP 테스트" },
  ];

  const cosimStats = [
    { value: "100%+", label: "매출 증가", sublabel: "기존 대비 2배 이상" },
    { value: "15%+", label: "매월 MAU", sublabel: "지속적인 성장" },
    { value: "10,000+", label: "사용자 수", sublabel: "신규 주문 3,000+건" },
  ];

  return (
    <Section
      className="relative overflow-hidden bg-gradient-to-b from-slate-50 via-white to-slate-50"
      sectionName="case-study"
    >
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-0 top-1/4 h-[400px] w-[400px] -translate-x-1/2 rounded-full bg-gradient-to-br from-emerald-100/40 to-cyan-100/30 blur-3xl" />
        <div className="absolute right-0 bottom-1/4 h-[350px] w-[350px] translate-x-1/2 rounded-full bg-gradient-to-tl from-blue-100/40 to-indigo-100/20 blur-3xl" />
      </div>

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={fadeUp}
        className="relative"
      >
        {/* 섹션 헤더 */}
        <div className="mb-16 text-center space-y-4">
          <div className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-4 py-1.5">
            <span className="h-2 w-2 rounded-full bg-emerald-500" />
            <span className="text-sm font-semibold text-emerald-700">
              성공 사례
            </span>
          </div>
          <h2 className="text-[clamp(1.5rem,6vw,2.5rem)] font-bold tracking-tight text-slate-900 break-keep">
            실제 성과로 증명합니다
          </h2>
          <p className="mx-auto max-w-2xl text-[clamp(0.875rem,4vw,1.125rem)] text-slate-600 break-keep">
            토스 미니앱으로 성장한 파트너사의 실제 성과를 확인하세요
          </p>
        </div>

        {/* 오늘의 명언 케이스 */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={fadeSlideUp}
          className="mb-12"
        >
          <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-10">
            <div className="mb-8 text-center">
              <span className="mb-2 inline-block rounded-full bg-amber-100 px-3 py-1 text-xs font-semibold text-amber-700">
                CASE 01
              </span>
              <h3 className="mb-2 text-2xl font-bold text-slate-900 sm:text-3xl">
                오늘의 명언
              </h3>
              <p className="text-slate-600">
                매일 새로운 명언으로 하루를 시작하는 라이프스타일 앱
              </p>
            </div>

            {/* 3개 폰 목업 - 중앙 정렬, 가운데 강조 (이미지에 프레임 포함) */}
            <div className="flex items-end justify-center gap-4 sm:gap-6 lg:gap-8">
              {/* 왼쪽 폰 */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1, duration: 0.6 }}
                className="relative w-[100px] sm:w-[140px] lg:w-[180px]"
              >
                <div className="relative aspect-[9/19] w-full">
                  <Image
                    src="/toss-miniapp/quote-app-1.png"
                    alt="오늘의 명언 앱 화면 1"
                    fill
                    sizes="180px"
                    className="object-contain drop-shadow-xl"
                  />
                </div>
              </motion.div>

              {/* 가운데 폰 (강조) */}
              <motion.div
                initial={{ opacity: 0, y: 40, scale: 0.95 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2, duration: 0.7 }}
                className="relative z-10 w-[120px] sm:w-[170px] lg:w-[220px]"
              >
                <div className="relative aspect-[9/19] w-full">
                  <Image
                    src="/toss-miniapp/quote-app-2.png"
                    alt="오늘의 명언 앱 화면 2"
                    fill
                    sizes="220px"
                    className="object-contain drop-shadow-2xl"
                  />
                </div>
                {/* 가운데 폰 데코레이션 */}
                <div className="pointer-events-none absolute -bottom-4 -left-4 -right-4 h-8 rounded-full bg-gradient-to-t from-blue-200/50 to-transparent blur-xl" />
              </motion.div>

              {/* 오른쪽 폰 */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3, duration: 0.6 }}
                className="relative w-[100px] sm:w-[140px] lg:w-[180px]"
              >
                <div className="relative aspect-[9/19] w-full">
                  <Image
                    src="/toss-miniapp/quote-app-3.png"
                    alt="오늘의 명언 앱 화면 3"
                    fill
                    sizes="180px"
                    className="object-contain drop-shadow-xl"
                  />
                </div>
              </motion.div>
            </div>

            {/* 성과 데이터 카드 */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={stagger}
              className="mt-10 grid gap-4 sm:grid-cols-3"
            >
              {quoteAppStats.map((stat, idx) => (
                <motion.div
                  key={stat.label}
                  variants={fadeUp}
                  transition={{ delay: idx * 0.1 }}
                  className="group relative overflow-hidden rounded-2xl border border-amber-200 bg-gradient-to-br from-amber-50 via-white to-orange-50 p-6 text-center shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-amber-100/50"
                >
                  <div className="pointer-events-none absolute -right-4 -top-4 h-16 w-16 rounded-full bg-gradient-to-br from-amber-400/20 to-orange-400/10 blur-xl opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                  <p className="mb-1 text-[clamp(2rem,8vw,3rem)] font-bold text-amber-600">
                    {stat.value}
                  </p>
                  <p className="mb-1 text-base font-semibold text-slate-900">
                    {stat.label}
                  </p>
                  <p className="text-sm text-slate-500">{stat.sublabel}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </motion.div>

        {/* 코심인터내셔널 케이스 */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={fadeSlideUp}
        >
          <div className="overflow-hidden rounded-3xl border border-blue-200 bg-gradient-to-br from-blue-50 via-white to-cyan-50 p-6 shadow-sm sm:p-10">
            <div className="mb-8 flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <span className="mb-2 inline-block rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-700">
                  CASE 02
                </span>
                <h3 className="mb-1 text-2xl font-bold text-slate-900 sm:text-3xl">
                  코심: eSIM 구매 서비스
                </h3>
                <p className="text-slate-600">
                  글로벌 통신사 eSIM 통신망 서비스 연동
                </p>
              </div>
              {/* 코심 로고 */}
              <div className="shrink-0">
                <Image
                  src="/toss-miniapp/kosim-logo.png"
                  alt="코심 로고"
                  width={120}
                  height={40}
                  className="h-10 w-auto object-contain sm:h-12"
                />
              </div>
            </div>

            <blockquote className="mb-8 border-l-4 border-blue-300 pl-4 text-lg italic text-slate-700">
              "빠른 개발 속도와 신뢰성 있는 서비스 제공으로 많은 사용자들에게
              사랑받고 있습니다"
            </blockquote>

            {/* 성과 데이터 카드 */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={stagger}
              className="grid gap-4 sm:grid-cols-3"
            >
              {cosimStats.map((stat, idx) => (
                <motion.div
                  key={stat.label}
                  variants={fadeUp}
                  transition={{ delay: idx * 0.1 }}
                  className="group relative overflow-hidden rounded-2xl border border-blue-200 bg-white p-6 text-center shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-blue-100/50"
                >
                  <div className="pointer-events-none absolute -right-4 -top-4 h-16 w-16 rounded-full bg-gradient-to-br from-blue-400/20 to-cyan-400/10 blur-xl opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                  <p className="mb-1 text-[clamp(2rem,8vw,3rem)] font-bold text-blue-600">
                    {stat.value}
                  </p>
                  <p className="mb-1 text-base font-semibold text-slate-900">
                    {stat.label}
                  </p>
                  <p className="text-sm text-slate-500">{stat.sublabel}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </motion.div>
      </motion.div>
    </Section>
  );
}

function ComparisonSection() {
  const comparisons = [
    {
      icon: "/toss-miniapp/money.png",
      title: "비용 & 시간",
      subtitle: "개발 리소스 절감",
      traditional: {
        label: "하이브리드 앱",
        points: [
          "iOS/Android 동시 개발 필요",
          "스토어 등록 비용 및 심사 기간 소요",
          "평균 개발 기간 3~6개월",
        ],
      },
      miniapp: {
        label: "토스 미니앱",
        points: [
          "단일 웹 코드베이스로 개발",
          "토스 검수 후 즉시 배포",
          "평균 개발 기간 1~2개월",
        ],
        highlight: "개발 비용 최대 60% 절감",
      },
    },
    {
      icon: "/toss-miniapp/target.png",
      title: "마케팅",
      subtitle: "타겟 고객 도달",
      traditional: {
        label: "하이브리드 앱",
        points: [
          "광고 예산으로 앱 설치 유도",
          "사용자 데이터 직접 수집 필요",
          "타겟팅을 위한 추가 분석 비용",
        ],
      },
      miniapp: {
        label: "토스 미니앱",
        points: [
          "나이대, 소비 습관, 관심사 기반 세그먼트",
          "토스 배너 광고 및 바이럴 시스템 활용",
          "3,000만 유저풀 기반 효율적 타겟팅",
        ],
        highlight: "내 서비스에 맞는 고객에게 직접 도달",
      },
    },
    {
      icon: "/toss-miniapp/setting.png",
      title: "운영 & 유지보수",
      subtitle: "지속적인 서비스 관리",
      traditional: {
        label: "하이브리드 앱",
        points: [
          "OS별 빌드 및 배포 관리",
          "스토어 업데이트 심사 대기",
          "버전 파편화에 따른 지원 부담",
        ],
      },
      miniapp: {
        label: "토스 미니앱",
        points: [
          "빠르게 수정/추가 기능 반영",
          "콘솔 관리로 유지보수 용이",
          "토스 인프라 기반 안정적 운영",
        ],
        highlight: "운영 공수 대폭 감소",
      },
    },
    {
      icon: "/toss-miniapp/lock.png",
      title: "인증 & 결제",
      subtitle: "핵심 기능 내장",
      traditional: {
        label: "하이브리드 앱",
        points: [
          "본인인증 모듈 별도 연동 필요",
          "PG사 계약 및 결제 시스템 구축",
          "보안 인증(ISMS 등) 비용 부담",
        ],
      },
      miniapp: {
        label: "토스 미니앱",
        points: [
          "토스 인증 API 즉시 연동",
          "토스페이 결제 기본 제공",
          "토스 보안 인프라 활용",
        ],
        highlight: "높은 인증·결제 수준 유지",
      },
    },
  ];

  return (
    <Section
      className="relative overflow-hidden bg-gradient-to-b from-slate-50 via-white to-slate-50"
      sectionName="comparison"
    >
      {/* 배경 데코레이션 */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-0 top-0 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-br from-blue-100/50 to-cyan-100/30 blur-3xl" />
        <div className="absolute right-0 bottom-0 h-[400px] w-[400px] translate-x-1/3 translate-y-1/3 rounded-full bg-gradient-to-tl from-blue-100/40 to-indigo-100/20 blur-3xl" />
      </div>

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={fadeUp}
        className="relative mb-16 text-center space-y-5"
      >
        <div className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-4 py-1.5">
          <span className="h-2 w-2 rounded-full bg-blue-500 animate-pulse" />
          <span className="text-sm font-semibold text-blue-700">
            왜 토스 미니앱인가요?
          </span>
        </div>
        <h2 className="text-[clamp(1.5rem,6vw,2.5rem)] font-bold text-slate-900 break-keep">
          기존 하이브리드 앱 개발과
          <br className="hidden sm:block" />
          <span className="text-blue-600"> 토스 미니앱</span>의 차이
        </h2>
        <p className="mx-auto max-w-2xl text-[clamp(0.875rem,4vw,1.125rem)] text-slate-600 break-keep">
          같은 서비스라도 어떻게 만드느냐에 따라 비용, 시간, 성과가 완전히
          달라집니다.
        </p>
      </motion.div>

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        variants={stagger}
        className="relative grid gap-6 lg:grid-cols-2"
      >
        {comparisons.map((item, idx) => (
          <motion.div
            key={item.title}
            variants={fadeUp}
            transition={{ delay: idx * 0.08 }}
            className="group h-full"
          >
            <div className="flex h-full flex-col overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:border-blue-200 hover:shadow-lg hover:shadow-blue-100/50">
              {/* 헤더 */}
              <div className="flex items-center gap-4 border-b border-slate-100 bg-gradient-to-r from-slate-50 to-white px-6 py-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 to-blue-600 p-2.5 shadow-lg shadow-blue-200">
                  <Image
                    src={item.icon}
                    alt={item.title}
                    width={28}
                    height={28}
                    className="h-7 w-7 object-contain brightness-0 invert"
                  />
                </div>
                <div>
                  <p className="text-sm font-medium text-slate-500">
                    {item.subtitle}
                  </p>
                  <h3 className="text-xl font-bold text-slate-900">
                    {item.title}
                  </h3>
                </div>
                <div className="ml-auto hidden rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700 sm:block">
                  0{idx + 1}
                </div>
              </div>

              {/* 비교 콘텐츠 */}
              <div className="grid flex-1 gap-4 p-6 xl:grid-cols-2">
                {/* 기존 앱 */}
                <div className="rounded-2xl border border-slate-200 bg-slate-50/50 p-5">
                  <div className="mb-4 flex items-center gap-2">
                    <div className="h-1.5 w-1.5 rounded-full bg-slate-400" />
                    <p className="text-sm font-semibold text-slate-600">
                      {item.traditional.label}
                    </p>
                  </div>
                  <ul className="space-y-3">
                    {item.traditional.points.map((point) => (
                      <li key={point} className="flex items-start gap-3">
                        <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-slate-300" />
                        <span className="text-sm text-slate-600">{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* 토스 미니앱 */}
                <div className="relative overflow-hidden rounded-2xl border-2 border-blue-200 bg-gradient-to-br from-blue-50 via-white to-cyan-50 p-5">
                  <div className="pointer-events-none absolute -right-8 -top-8 h-24 w-24 rounded-full bg-gradient-to-br from-blue-400/20 to-cyan-400/20 blur-2xl" />
                  <div className="relative">
                    <div className="mb-4 flex items-center gap-2">
                      <div className="h-1.5 w-1.5 rounded-full bg-blue-500" />
                      <p className="text-sm font-semibold text-blue-700">
                        {item.miniapp.label}
                      </p>
                      <span className="ml-auto rounded-full bg-blue-100 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-blue-600">
                        추천
                      </span>
                    </div>
                    <ul className="space-y-3">
                      {item.miniapp.points.map((point) => (
                        <li key={point} className="flex items-start gap-3">
                          <svg
                            className="mt-0.5 h-4 w-4 shrink-0 text-blue-500"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={2.5}
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M5 13l4 4L19 7"
                            />
                          </svg>
                          <span className="text-sm font-medium text-slate-700">
                            {point}
                          </span>
                        </li>
                      ))}
                    </ul>
                    {/* 하이라이트 배지 */}
                    <div className="mt-4 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-blue-600 to-cyan-500 px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-blue-200">
                      <svg
                        className="h-4 w-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M13 10V3L4 14h7v7l9-11h-7z"
                        />
                      </svg>
                      {item.miniapp.highlight}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
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

function BetaBenefitSection({
  onTrackCta,
}: {
  onTrackCta: (ctaType: string, sectionName?: string) => void;
}) {
  const benefits = [
    {
      value: "0%",
      label: "인앱결제 수수료",
      sublabel: "2026.02까지 무료",
      icon: (
        <svg
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
          />
        </svg>
      ),
    },
    {
      value: "0%",
      label: "광고 수수료",
      sublabel: "인앱광고 · 토스홈 광고",
      icon: (
        <svg
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z"
          />
        </svg>
      ),
    },
    {
      value: "무료",
      label: "푸시 · 토스페이",
      sublabel: "일 10만건 푸시 무료",
      icon: (
        <svg
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
          />
        </svg>
      ),
    },
  ];

  return (
    <Section
      className="relative overflow-hidden bg-gradient-to-b from-white via-emerald-50/30 to-white"
      sectionName="beta-benefit"
    >
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/4 top-0 h-[400px] w-[400px] -translate-y-1/2 rounded-full bg-gradient-to-br from-emerald-100/50 to-teal-100/30 blur-3xl" />
        <div className="absolute right-0 bottom-0 h-[300px] w-[300px] translate-x-1/3 rounded-full bg-gradient-to-tl from-emerald-100/40 to-cyan-100/20 blur-3xl" />
      </div>

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={fadeUp}
        className="relative"
      >
        {/* 섹션 헤더 */}
        <div className="mb-12 text-center space-y-4">
          <div className="inline-flex items-center gap-2 rounded-full border border-emerald-300 bg-gradient-to-r from-emerald-50 to-teal-50 px-4 py-1.5">
            <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-sm font-semibold text-emerald-700">
              프로모션 기간 연장! ~2026.02.28
            </span>
          </div>
          <h2 className="text-[clamp(1.5rem,6vw,2.5rem)] font-bold tracking-tight text-slate-900 break-keep">
            수수료 <span className="text-emerald-600">전액 무료</span>,
            <br className="sm:hidden" /> 지금이 기회입니다
          </h2>
          <p className="mx-auto max-w-2xl text-[clamp(0.875rem,4vw,1.125rem)] text-slate-600 break-keep">
            인앱결제, 인앱광고, 토스 홈 광고, 푸시/알림, 토스페이
            <br className="hidden sm:block" />
            <strong className="text-slate-800">2026년 2월 28일까지</strong> 모든
            수수료가 무료입니다
          </p>
        </div>

        {/* 혜택 카드 */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={stagger}
          className="mb-10 grid gap-6 sm:grid-cols-3"
        >
          {benefits.map((benefit, idx) => (
            <motion.div
              key={benefit.label}
              variants={fadeSlideUp}
              transition={{ delay: idx * 0.1 }}
              className="group relative overflow-hidden rounded-2xl border border-emerald-200 bg-white p-6 text-center shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-xl hover:shadow-emerald-100/50"
            >
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-emerald-50/50 via-transparent to-teal-50/30 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              <div className="relative">
                <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-400 to-teal-500 text-white shadow-lg shadow-emerald-200">
                  {benefit.icon}
                </div>
                <p className="mb-1 text-[clamp(2rem,8vw,3rem)] font-bold text-emerald-600">
                  {benefit.value}
                </p>
                <p className="mb-1 text-lg font-semibold text-slate-900">
                  {benefit.label}
                </p>
                <p className="text-sm text-slate-500">{benefit.sublabel}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA 배너 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          <div className="overflow-hidden rounded-2xl border border-emerald-300 bg-gradient-to-r from-emerald-500 via-teal-500 to-emerald-600 p-6 text-white shadow-xl shadow-emerald-200/40 sm:p-8">
            <div className="flex flex-col items-center gap-6 text-center sm:flex-row sm:justify-between sm:text-left">
              <div className="space-y-2">
                <h3 className="text-xl font-bold sm:text-2xl">
                  2026년 2월까지 모든 수수료 무료!
                </h3>
                <p className="text-emerald-100">
                  인앱결제, 광고, 푸시, 토스페이 수수료 0원으로 시작하세요
                </p>
              </div>
              <div className="flex shrink-0 gap-3">
                <a
                  href="https://pakids-toss-miniapp.channel.io"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => onTrackCta?.("consult", "beta-benefit")}
                  className="inline-flex items-center justify-center rounded-full bg-white px-6 py-3 text-sm font-semibold text-emerald-600 shadow-lg transition hover:bg-emerald-50"
                >
                  상담하기
                </a>
                <a
                  href="https://drive.google.com/file/d/1250ZTN_txy5rgglq5B_DXDz3c5-GlJ_n/view?usp=sharing"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => onTrackCta?.("brochure", "beta-benefit")}
                  className="inline-flex items-center justify-center rounded-full border border-white/40 px-6 py-3 text-sm font-semibold text-white transition hover:border-white hover:bg-white/10"
                >
                  소개서 받기
                </a>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </Section>
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
    <Section
      className="relative overflow-hidden bg-gradient-to-b from-white to-slate-50"
      sectionName="review"
    >
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={fadeUp}
        className="mb-12"
      >
        <div className="flex flex-col items-center gap-8 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex-1 text-center lg:text-left">
            <h2 className="text-[clamp(1.5rem,6vw,2.25rem)] font-bold tracking-tight text-slate-900 break-keep">
              토스 미니앱, 전문가에게 맡기세요
            </h2>
            <p className="mt-3 text-[clamp(0.875rem,4vw,1.125rem)] text-slate-600 break-keep">
              실제 파키즈와 함께한 고객사의 경험을 확인하세요
            </p>
          </div>
          <div className="w-full max-w-[320px] shrink-0 sm:max-w-[400px] lg:max-w-[480px]">
            <DotLottieReact
              src="/toss-miniapp/review.lottie"
              loop
              autoplay
              className="w-full"
            />
          </div>
        </div>
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
            className="flex h-full flex-col rounded-2xl border border-slate-200 bg-white/90 p-4 shadow-sm backdrop-blur sm:p-6"
          >
            <p className="mb-6 text-[clamp(0.8rem,3.5vw,1rem)] leading-relaxed text-slate-700 break-keep">
              "{item.quote}"
            </p>
            <div className="mt-auto text-[clamp(0.75rem,3vw,0.875rem)] font-semibold text-slate-500 text-right">
              {item.company}
            </div>
          </motion.div>
        ))}
      </motion.div>
    </Section>
  );
}

function FooterAnchor({
  onTrackCta,
}: {
  onTrackCta: (ctaType: string, sectionName?: string) => void;
}) {
  return (
    <Section
      className="relative overflow-hidden bg-white"
      sectionName="footer-cta"
    >
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={fadeSlideUp}
        className="relative"
      >
        <div className="overflow-hidden rounded-3xl border border-blue-200 bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-700 p-5 text-white shadow-2xl shadow-blue-300/30 sm:p-8 lg:p-12">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.15),transparent_50%),radial-gradient(circle_at_70%_80%,rgba(255,255,255,0.1),transparent_40%)]" />
          <div className="relative grid gap-8 lg:grid-cols-[1.2fr,1fr] lg:items-center">
            <div className="space-y-4">
              <h3 className="text-[clamp(1.25rem,5vw,1.875rem)] font-bold break-keep">
                지금 바로 토스 미니앱으로
                <br />
                시작해보세요
              </h3>
              <p className="text-[clamp(0.875rem,4vw,1.125rem)] text-blue-100 break-keep">
                파키즈 팀이 기획부터 개발, 검수, 런칭까지 한 번에 지원합니다.
                <br className="hidden sm:block" />
                토스의 인프라와 유저풀을 활용해 더 빠른 성과를 경험하세요.
              </p>
              <CTAButtons
                variant="dark"
                sectionName="footer-cta"
                onTrackCta={onTrackCta}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[
                { value: "60%", label: "개발 비용 절감" },
                { value: "3,000만", label: "토스 유저 접근" },
                { value: "1~2개월", label: "평균 개발 기간" },
                { value: "맞춤형", label: "사용자 타겟 마케팅" },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-2xl border border-white/20 bg-white/10 p-3 text-center backdrop-blur sm:p-4"
                >
                  <p className="text-[clamp(1.25rem,5vw,1.875rem)] font-bold text-white">
                    {stat.value}
                  </p>
                  <p className="mt-1 text-[clamp(0.625rem,2.5vw,0.875rem)] text-blue-100">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </Section>
  );
}
