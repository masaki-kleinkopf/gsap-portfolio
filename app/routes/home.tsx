import type { Route } from "./+types/home";
import { useRef, useState, useEffect } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Masaki Kleinkopf" },
    {
      name: "description",
      content: "The personal homepage of Masaki Kleinkopf.",
    },
  ];
}

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const introTl = gsap.timeline({
        scrollTrigger: {
          trigger: ".intro-pin",
          start: "top top",
          end: "+=150%",
          pin: true,
          scrub: 1,
        },
      });

      introTl
        .fromTo(
          ".intro-photo",
          { rotation: -720, scale: 0.1, opacity: 0 },
          {
            rotation: 0,
            scale: 1,
            opacity: 1,
            duration: 1,
            ease: "power2.out",
          },
        )
        .fromTo(
          ".intro-caption",
          { scale: 0, rotation: 15 },
          { scale: 1, rotation: -3, duration: 0.3, ease: "back.out(2)" },
          0.7,
        )
        .to({}, { duration: 0.4 })
        .to(".intro-photo", { scale: 0.95, opacity: 0.3, duration: 0.3 })
        .to(".intro-caption", { opacity: 0, y: -20, duration: 0.2 }, "<")
        .to(".intro-cta", { opacity: 1, duration: 0.3 });

      introTl.to(".intro-scroll-hint", { opacity: 0, duration: 0.1 }, 0);

      gsap.from(".hero-name", {
        y: 80,
        opacity: 0,
        duration: 1.2,
        ease: "power4.out",
      });

      gsap.from(".hero-sub", {
        y: 30,
        opacity: 0,
        duration: 0.8,
        delay: 0.3,
        ease: "power2.out",
      });

      gsap.from(".hero-detail", {
        opacity: 0,
        duration: 0.8,
        delay: 0.7,
        ease: "power1.out",
      });

      gsap.to(".marquee-track", {
        xPercent: -50,
        repeat: -1,
        duration: 30,
        ease: "none",
      });

      gsap.from(".resume-section", {
        scrollTrigger: {
          trigger: ".resume-section",
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
        y: 40,
        opacity: 0,
        duration: 0.7,
        ease: "power2.out",
      });

      const geos = gsap.utils.toArray<HTMLElement>(".geo");
      geos.forEach((el, i) => {
        gsap.from(el, {
          scrollTrigger: {
            trigger: ".geo-divider",
            start: "top 85%",
            end: "top 30%",
            scrub: 1,
          },
          scale: 0,
          rotation: i % 2 === 0 ? -180 : 180,
          opacity: 0,
          ease: "power2.out",
        });
      });

      gsap.to(".geo-square, .geo-diamond, .geo-diamond-big", {
        scrollTrigger: {
          trigger: ".geo-divider",
          start: "top 80%",
          end: "bottom 20%",
          scrub: 2,
        },
        rotation: "+=90",
        ease: "none",
      });

      gsap.to(".geo-circle, .geo-circle-fill", {
        scrollTrigger: {
          trigger: ".geo-divider",
          start: "top 80%",
          end: "bottom 20%",
          scrub: 2,
        },
        scale: 1.2,
        ease: "power1.inOut",
      });

      gsap.from(".about-text", {
        scrollTrigger: {
          trigger: ".about-section",
          start: "top 80%",
          end: "top 40%",
          scrub: 1,
        },
        y: 40,
        opacity: 0,
      });

      const buttons = gsap.utils.toArray<HTMLElement>(".fun-btn");

      buttons.forEach((btn) => {
        btn.addEventListener("mouseenter", () => {
          gsap.to(btn, {
            rotation: gsap.utils.random(-5, 5),
            scale: 1.08,
            duration: 0.25,
            ease: "power2.out",
          });
        });
        btn.addEventListener("mouseleave", () => {
          gsap.to(btn, {
            rotation: 0,
            scale: 1,
            duration: 0.35,
            ease: "elastic.out(1, 0.5)",
          });
        });
      });

      gsap.to(".blink", {
        opacity: 0,
        repeat: -1,
        yoyo: true,
        duration: 0.53,
        ease: "steps(1)",
      });

      gsap.to(".sticker", {
        rotation: "+=360",
        repeat: -1,
        duration: 20,
        ease: "none",
      });

      gsap.from(".footer-item", {
        scrollTrigger: {
          trigger: ".footer-section",
          start: "top 90%",
          toggleActions: "play none none reverse",
        },
        opacity: 0,
        y: 10,
        stagger: 0.05,
        duration: 0.3,
        ease: "power1.out",
      });
    },
    { scope: containerRef },
  );

  return (
    <div ref={containerRef}>
      <section className="intro-pin h-screen bg-[var(--color-text)] flex flex-col items-center justify-center overflow-hidden relative">
        <div className="intro-photo relative" style={{ opacity: 0 }}>
          <div className="w-64 h-64 md:w-80 md:h-80 border-4 border-white overflow-hidden">
            <img
              src="/IMG_8720.jpg"
              alt="Masaki eating a full English breakfast at Pellicci's"
              className="w-full h-full object-cover object-[center_30%]"
            />
          </div>
        </div>
        <div className="intro-caption absolute bottom-[22%] md:bottom-[25%] bg-[var(--color-magenta)] text-white px-6 py-3 border-2 border-white" style={{ scale: 0 }}>
          <p className="font-bold text-2xl md:text-3xl tracking-tight leading-none">
            Masaki Kleinkopf
          </p>
          <p className="font-[family-name:var(--font-mono)] text-xs mt-1 opacity-80">
            Software Developer · Breakfast Enjoyer
          </p>
        </div>
        <div className="intro-scroll-hint absolute bottom-20 md:bottom-10 font-[family-name:var(--font-mono)] text-xs text-white/40 text-center">
          <p>scroll</p>
          <p className="mt-1 animate-bounce">↓</p>
        </div>
        <div className="intro-cta absolute bottom-10 opacity-0 font-[family-name:var(--font-mono)] text-xs text-white/50 text-center">
          <p>keep scrolling</p>
          <p className="mt-1">↓</p>
        </div>
      </section>
      <nav className="flex justify-between items-center px-5 md:px-10 py-4 text-sm">
        <span className="font-bold">masaki k.</span>
        <div className="flex items-center gap-6 text-[var(--color-text-muted)]">
          <a
            href="#work"
            className="no-underline hover:text-[var(--color-text)]"
          >
            Resume
          </a>
          <a
            href="#about"
            className="no-underline hover:text-[var(--color-text)]"
          >
            About
          </a>
          <a
            href="#contact"
            className="no-underline hover:text-[var(--color-text)]"
          >
            Contact
          </a>
        </div>
      </nav>
      <section className="px-5 md:px-10 pt-16 pb-20 md:pt-28 md:pb-32 relative">
        <h1 className="hero-name text-7xl md:text-[8rem] lg:text-[10rem] font-bold leading-[0.9] tracking-tight">
          Masaki
          <br />
          <span className="text-[var(--color-magenta)]">Kleinkopf</span>
        </h1>
        <p className="hero-sub text-xl md:text-2xl mt-8 max-w-md text-[var(--color-text-muted)]">
          Software developer.
        </p>
        <div className="sticker absolute top-16 right-8 md:right-16 w-20 h-20 md:w-28 md:h-28 border-2 border-[var(--color-magenta)] rounded-full flex items-center justify-center text-[var(--color-magenta)] font-[family-name:var(--font-mono)] text-[10px] md:text-xs text-center leading-tight pointer-events-none">
          scroll
          <br />
          down
          <br />
          :)
        </div>
      </section>
      <div className="overflow-hidden border-y-2 border-[var(--color-text)] py-4">
        <div className="marquee-track whitespace-nowrap inline-block">
          {[0, 1].map((n) => (
            <span
              key={n}
              className="text-4xl md:text-5xl font-bold tracking-tight"
            >
              REACT · TYPESCRIPT · GSAP · REACT ROUTER · TAILWIND · NODE · FIGMA
              · <span className="text-[var(--color-magenta)]">✦</span> ·{" "}
            </span>
          ))}
        </div>
      </div>
      <section
        id="work"
        className="resume-section px-5 md:px-10 py-16 md:py-28"
      >
        <h2 className="font-[family-name:var(--font-mono)] text-xs uppercase tracking-widest text-[var(--color-text-muted)] mb-8">
          Experience
        </h2>
        <p className="text-lg text-[var(--color-text-muted)] mb-2 max-w-lg">
          Currently building e-commerce software at Munchkin working in headless
          Shopify. Previous agency experience working with a variety of brands.
        </p>
        <div className="mt-8">
          <a
            href="/kleinkopf-resume.pdf"
            className="fun-btn inline-block text-lg font-bold px-8 py-4 bg-[var(--color-surface)] no-underline border-2 border-[var(--color-text)]"
          >
            Resume (PDF) ↓
          </a>
        </div>
      </section>
      <section className="geo-divider overflow-hidden py-10 md:py-16 flex items-center justify-center relative">
        <div className="flex items-center gap-6 md:gap-10">
          <div className="geo geo-square w-12 h-12 md:w-16 md:h-16 border-2 border-[var(--color-text)]" />
          <div className="geo geo-circle w-16 h-16 md:w-24 md:h-24 border-2 border-[var(--color-magenta)] rounded-full" />
          <div className="geo geo-diamond w-10 h-10 md:w-14 md:h-14 border-2 border-[var(--color-text)] rotate-45" />
          <div className="geo geo-circle-fill w-8 h-8 md:w-12 md:h-12 bg-[var(--color-magenta)] rounded-full" />
          <div className="geo geo-square-big w-20 h-20 md:w-28 md:h-28 border-2 border-[var(--color-text)]" />
          <div className="geo geo-dot w-4 h-4 md:w-6 md:h-6 bg-[var(--color-text)] rounded-full" />
          <div className="geo geo-diamond-big w-14 h-14 md:w-20 md:h-20 border-2 border-[var(--color-magenta)] rotate-45" />
        </div>
      </section>
      <section
        id="about"
        className="about-section px-5 md:px-10 py-16 md:py-28"
      >
        <div className="max-w-2xl">
          <h2 className="font-[family-name:var(--font-mono)] text-xs uppercase tracking-widest text-[var(--color-text-muted)] mb-10">
            About
          </h2>
          <div className="about-text space-y-5 text-lg">
            <p>
              I build software. I enjoy learning new things and collaborating
              with others to solve interesting problems and create user friendly
              experiences. I also enjoy eating good food, running and spending
              time off of a screen.
            </p>
          </div>
        </div>
      </section>
      <section
        id="contact"
        className="px-5 md:px-10 py-16 md:py-28 border-t-2 border-[var(--color-text)]"
      >
        <h2 className="text-5xl md:text-7xl font-bold mb-8">
          Say hello<span className="text-[var(--color-magenta)]">.</span>
        </h2>
        <div className="flex flex-wrap gap-4">
          <a
            href="mailto:masaki.kleinkopf@gmail.com"
            className="fun-btn inline-block text-lg font-bold px-8 py-4 bg-[var(--color-magenta)] text-white hover:!text-white no-underline border-2 border-[var(--color-text)]"
          >
            masaki.kleinkopf@gmail.com
          </a>
          <a
            href="https://github.com/masaki-kleinkopf"
            className="fun-btn inline-block text-lg font-bold px-8 py-4 bg-[var(--color-surface)] no-underline border-2 border-[var(--color-text)]"
          >
            GitHub
          </a>
          <a
            href="https://www.linkedin.com/in/masakikleinkopf/"
            className="fun-btn inline-block text-lg font-bold px-8 py-4 bg-[var(--color-surface)] no-underline border-2 border-[var(--color-text)]"
          >
            LinkedIn
          </a>
        </div>
      </section>
      <footer className="footer-section px-5 md:px-10 py-8 border-t border-[var(--color-border)]">
        <div className="flex flex-col md:flex-row justify-between gap-4 text-sm text-[var(--color-text-muted)]">
          <div className="space-y-1">
            <p className="footer-item">© 2026 Masaki Kleinkopf</p>
            <p className="footer-item font-[family-name:var(--font-mono)] text-xs">
              React Router + GSAP + Helvetica + vibes
            </p>
          </div>
          <p className="footer-item font-[family-name:var(--font-mono)] text-xs self-start md:self-end">
            <span className="blink">▮</span>
          </p>
        </div>
      </footer>
    </div>
  );
}
