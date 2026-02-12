import type { Route } from "./+types/home";
import { useRef, useState, useEffect } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Masaki Kleinkopf — Personal Homepage" },
    {
      name: "description",
      content: "The personal homepage of Masaki Kleinkopf.",
    },
  ];
}

const projects = [
  {
    title: "Interactive Dashboard",
    description: "Real-time data viz with D3 and React. Lots of charts. Very satisfying.",
    tech: ["React", "D3.js", "WebSockets"],
    year: "2025",
    status: "live",
  },
  {
    title: "Design System",
    description: "Component library & docs site. The kind of project that never feels done.",
    tech: ["TypeScript", "Storybook", "Tailwind"],
    year: "2024",
    status: "live",
  },
  {
    title: "Animation Playground",
    description: "Scroll experiments & interaction sketches. This site is part of it.",
    tech: ["GSAP", "ScrollTrigger", "React"],
    year: "2024",
    status: "ongoing",
  },
  {
    title: "E-Commerce Frontend",
    description: "Headless Shopify storefront. Fast. Edge-cached. People bought things.",
    tech: ["Next.js", "Shopify API", "Vercel"],
    year: "2023",
    status: "live",
  },
];

const thoughts = [
  "The best interfaces feel like they were always that way.",
  "I think about spacing more than I should.",
  "Serif fonts on the web are underrated.",
  "Animation should feel like breathing — you notice when it stops.",
  "Every portfolio is a lie. This one is at least a fun lie.",
];

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [currentTime, setCurrentTime] = useState("");

  useEffect(() => {
    const tick = () =>
      setCurrentTime(
        new Date().toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        }),
      );
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  useGSAP(
    () => {
      // Hero — the big name
      gsap.from(".hero-name", {
        y: 60,
        opacity: 0,
        rotation: -2,
        duration: 1,
        ease: "power3.out",
      });

      gsap.from(".hero-subtitle", {
        y: 20,
        opacity: 0,
        duration: 0.8,
        delay: 0.4,
        ease: "power2.out",
      });

      gsap.from(".hero-aside", {
        opacity: 0,
        duration: 1,
        delay: 0.9,
        ease: "power1.out",
      });

      // Marquee
      gsap.to(".marquee-track", {
        xPercent: -50,
        repeat: -1,
        duration: 25,
        ease: "none",
      });

      // Project cards tumble in
      gsap.from(".project-card", {
        scrollTrigger: {
          trigger: ".projects-grid",
          start: "top 75%",
          toggleActions: "play none none reverse",
        },
        y: 50,
        opacity: 0,
        rotation: () => gsap.utils.random(-3, 3),
        stagger: 0.15,
        duration: 0.7,
        ease: "power2.out",
      });

      // Thoughts — one by one
      gsap.from(".thought", {
        scrollTrigger: {
          trigger: ".thoughts-section",
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
        opacity: 0,
        x: -20,
        stagger: 0.12,
        duration: 0.5,
        ease: "power2.out",
      });

      // The big italic pull quote
      gsap.from(".pull-quote", {
        scrollTrigger: {
          trigger: ".pull-quote",
          start: "top 80%",
          end: "top 40%",
          scrub: 1,
        },
        x: -80,
        opacity: 0,
      });

      // Footer bits
      gsap.from(".footer-item", {
        scrollTrigger: {
          trigger: ".footer-section",
          start: "top 90%",
          toggleActions: "play none none reverse",
        },
        opacity: 0,
        y: 10,
        stagger: 0.06,
        duration: 0.4,
        ease: "power1.out",
      });

      // Blink
      gsap.to(".blink", {
        opacity: 0,
        repeat: -1,
        yoyo: true,
        duration: 0.53,
        ease: "steps(1)",
      });
    },
    { scope: containerRef },
  );

  return (
    <div ref={containerRef}>
      {/* Topbar */}
      <div className="flex justify-between items-center px-5 md:px-10 py-3 text-xs font-[family-name:var(--font-mono)] text-[var(--color-text-muted)] border-b border-[var(--color-border)]">
        <span>masaki kleinkopf</span>
        <span>{currentTime}</span>
      </div>

      {/* Hero */}
      <section className="px-5 md:px-10 pt-20 pb-16 md:pt-32 md:pb-24">
        <h1 className="hero-name font-[family-name:var(--font-serif)] text-6xl md:text-8xl lg:text-9xl leading-none mb-6">
          Masaki<span className="text-[var(--color-magenta)]">.</span>
        </h1>
        <p className="hero-subtitle text-xl md:text-2xl text-[var(--color-text-muted)] max-w-lg">
          Frontend developer, sometimes designer, full-time overthinker.
        </p>
        <p className="hero-aside mt-6 font-[family-name:var(--font-mono)] text-sm text-[var(--color-text-muted)]">
          Currently based somewhere with wifi
          <span className="blink ml-1">▮</span>
        </p>
      </section>

      {/* Marquee */}
      <div className="overflow-hidden border-y border-[var(--color-border)] py-3 bg-[var(--color-surface)]">
        <div className="marquee-track whitespace-nowrap inline-block">
          {[0, 1].map((n) => (
            <span key={n} className="font-[family-name:var(--font-serif)] italic text-2xl md:text-3xl text-[var(--color-text-muted)] mr-4">
              React · TypeScript · GSAP · Next.js · Tailwind · Node · Vite · Figma · D3 · GraphQL ·{" "}
              <span className="text-[var(--color-magenta)]">♥</span> ·{" "}
            </span>
          ))}
        </div>
      </div>

      {/* About — casual */}
      <section className="px-5 md:px-10 py-16 md:py-24 max-w-2xl">
        <p className="text-lg mb-4">
          I make websites. I care about how they <em>feel</em> — the timing of a
          transition, the weight of a typeface, whether a button feels like it
          wants to be clicked.
        </p>
        <p className="text-lg text-[var(--color-text-muted)]">
          Right now I'm deep in the GSAP rabbit hole, which is why this page
          moves around a bit. Before that it was something else. There's always
          a rabbit hole.
        </p>
      </section>

      {/* Pull quote */}
      <div className="pull-quote px-5 md:px-10 py-12 border-y border-[var(--color-border)]">
        <p className="font-[family-name:var(--font-serif)] italic text-3xl md:text-5xl leading-tight text-[var(--color-magenta)] max-w-3xl">
          "I like things that look simple but aren't."
        </p>
      </div>

      {/* Projects */}
      <section className="px-5 md:px-10 py-16 md:py-24">
        <h2 className="font-[family-name:var(--font-mono)] text-xs uppercase tracking-widest text-[var(--color-text-muted)] mb-10">
          Things I've Made
        </h2>
        <div className="projects-grid grid md:grid-cols-2 gap-5">
          {projects.map((p, i) => (
            <div
              key={i}
              className="project-card border border-[var(--color-border)] bg-[var(--color-surface)] p-5 hover:shadow-md transition-shadow cursor-pointer group"
            >
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-[family-name:var(--font-serif)] text-xl group-hover:text-[var(--color-magenta)] transition-colors">
                  {p.title}
                </h3>
                <span className="font-[family-name:var(--font-mono)] text-xs text-[var(--color-text-muted)] mt-1">
                  {p.year}
                </span>
              </div>
              <p className="text-sm text-[var(--color-text-muted)] mb-3">{p.description}</p>
              <div className="flex items-center gap-3">
                <div className="flex gap-1.5 flex-wrap">
                  {p.tech.map((t) => (
                    <span
                      key={t}
                      className="font-[family-name:var(--font-mono)] text-[10px] px-1.5 py-0.5 bg-[var(--color-page-bg)] border border-[var(--color-border)]"
                    >
                      {t}
                    </span>
                  ))}
                </div>
                <span
                  className={`font-[family-name:var(--font-mono)] text-[10px] ml-auto ${
                    p.status === "live" ? "text-[var(--color-chartreuse)]" : "text-[var(--color-peach)]"
                  }`}
                >
                  [{p.status}]
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Thoughts */}
      <section className="thoughts-section px-5 md:px-10 py-16 md:py-24 border-t border-[var(--color-border)]">
        <h2 className="font-[family-name:var(--font-mono)] text-xs uppercase tracking-widest text-[var(--color-text-muted)] mb-10">
          Things I Believe (This Week)
        </h2>
        <div className="space-y-4 max-w-xl">
          {thoughts.map((t, i) => (
            <div key={i} className="thought flex items-start gap-3">
              <span
                className="mt-1.5 shrink-0 w-2.5 h-2.5 rounded-full"
                style={{
                  backgroundColor: ["#d6336c", "#4361ee", "#8db600", "#ff8c69", "#d6336c"][i],
                }}
              ></span>
              <p className="font-[family-name:var(--font-serif)] italic text-lg">{t}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Contact — loose */}
      <section className="px-5 md:px-10 py-16 md:py-24 border-t border-[var(--color-border)] bg-[var(--color-surface)]">
        <h2 className="font-[family-name:var(--font-serif)] text-4xl md:text-5xl mb-6">
          Say hi<span className="text-[var(--color-magenta)]">?</span>
        </h2>
        <p className="text-lg text-[var(--color-text-muted)] mb-8 max-w-md">
          I'm always happy to chat about projects, weird CSS tricks, or whatever
          you're excited about.
        </p>
        <div className="flex flex-wrap gap-4">
          <a
            href="mailto:hello@masaki.dev"
            className="font-[family-name:var(--font-mono)] text-sm px-5 py-2.5 border-2 border-[var(--color-magenta)] text-[var(--color-magenta)] no-underline hover:bg-[var(--color-magenta)] hover:text-white transition-colors"
          >
            hello@masaki.dev
          </a>
          <a
            href="#"
            className="font-[family-name:var(--font-mono)] text-sm px-5 py-2.5 border border-[var(--color-border)] text-[var(--color-text-muted)] no-underline hover:border-[var(--color-text)] hover:text-[var(--color-text)] transition-colors"
          >
            github
          </a>
          <a
            href="#"
            className="font-[family-name:var(--font-mono)] text-sm px-5 py-2.5 border border-[var(--color-border)] text-[var(--color-text-muted)] no-underline hover:border-[var(--color-text)] hover:text-[var(--color-text)] transition-colors"
          >
            linkedin
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer-section px-5 md:px-10 py-8 border-t border-[var(--color-border)]">
        <div className="flex flex-col md:flex-row justify-between gap-4 text-xs font-[family-name:var(--font-mono)] text-[var(--color-text-muted)]">
          <div className="space-y-1">
            <p className="footer-item">© 2026 Masaki Kleinkopf</p>
            <p className="footer-item">
              Made with React Router & GSAP. Set in{" "}
              <span className="font-[family-name:var(--font-serif)] text-sm">DM Serif Display</span>,{" "}
              <span>Instrument Sans</span>, and{" "}
              <span>Space Mono</span>.
            </p>
          </div>
          <div className="footer-item flex items-center gap-1.5 self-start md:self-end">
            {["var(--color-magenta)", "var(--color-electric)", "var(--color-chartreuse)", "var(--color-peach)"].map((c, i) => (
              <span
                key={i}
                className="inline-block w-3 h-3 rounded-full"
                style={{ backgroundColor: `${c}` }}
              ></span>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}
