import type { MetaFunction, LinksFunction } from "react-router";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// ── Design tokens ──────────────────────────────────────────────────────────
const BG = "#0d1410";
const ACCENT = "#c8a228"; // warm amber — the anchor colour
const GREEN = "#5e9e6a"; // natural muted sage green
const SOIL = "#a06840"; // earthy sienna
const PETAL = "#c47a90"; // dusty rose
const RULE = "rgba(200,162,40,0.2)"; // thin amber rule

const SERIF = "'DM Serif Display', Georgia, serif";

// Chromosome ideogram palette — botanical specimen pigments
const GENE_COLORS = [
  "#8b4a3c", // terracotta
  "#c8a228", // amber
  "#4a8758", // forest
  "#3d7a90", // slate blue
  "#745590", // violet
  "#b06838", // sienna
  "#3a876a", // teal
  "#5e9e6a", // sage
];

const DAUGHTER_CELLS: { x: number; y: number; type: "leaf" | "root" }[] = [
  { x: 0, y: -90, type: "leaf" },
  { x: 63, y: -63, type: "leaf" },
  { x: 90, y: 0, type: "root" },
  { x: 63, y: 63, type: "root" },
  { x: 0, y: 90, type: "root" },
  { x: -63, y: 63, type: "leaf" },
  { x: -90, y: 0, type: "leaf" },
  { x: -63, y: -63, type: "root" },
];

const CELL_TYPES = [
  { id: "root", label: "Root Cell", color: SOIL, activeGenes: [0, 2, 4, 6] },
  { id: "leaf", label: "Leaf Cell", color: GREEN, activeGenes: [1, 3, 5, 7] },
  {
    id: "flower",
    label: "Flower Cell",
    color: PETAL,
    activeGenes: [0, 3, 5, 6, 7],
  },
] as const;

export const links: LinksFunction = () => [
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&display=swap",
  },
];

export const meta: MetaFunction = () => [
  { title: "Lab — Plants" },
  { name: "robots", content: "noindex, nofollow" },
];

export default function Plants() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      // ── Hero ──────────────────────────────────────────────────────────────
      gsap.from(".plant-eyebrow", {
        opacity: 0,
        y: 12,
        duration: 0.7,
        delay: 0.3,
      });
      gsap.from(".plant-title-word", {
        opacity: 0,
        y: 48,
        stagger: 0.14,
        duration: 1,
        delay: 0.6,
        ease: "power3.out",
      });
      gsap.from(".plant-sub", { opacity: 0, duration: 1, delay: 1.3 });
      gsap.from(".plant-scroll-hint", {
        opacity: 0,
        duration: 0.7,
        delay: 1.8,
      });

      // Orb — warm, slow breath; no neon flash
      gsap.to(".plant-orb-inner", {
        opacity: 0.18,
        scale: 1.06,
        duration: 3.5,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      // Particles — barely visible, just atmospheric
      gsap.utils.toArray<HTMLElement>(".plant-particle").forEach((el) => {
        gsap.to(el, {
          x: gsap.utils.random(-30, 30),
          y: gsap.utils.random(-30, 30),
          duration: gsap.utils.random(5, 10),
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          delay: gsap.utils.random(0, 6),
        });
      });

      // ── Section A: Meristem (pinned, scrub) ───────────────────────────────
      const meristemTl = gsap.timeline({
        scrollTrigger: {
          trigger: ".section-meristem",
          start: "top top",
          end: "+=280%",
          pin: true,
          scrub: 1.4,
        },
      });

      meristemTl
        .from(".meristem-intro", { opacity: 0, y: 18, duration: 0.8 })
        .fromTo(
          ".meristem-cell",
          { scale: 0, opacity: 0 },
          { scale: 1, opacity: 1, duration: 0.5, ease: "back.out(1.7)" },
          "<0.4",
        )
        .fromTo(
          ".daughter-cell",
          {
            x: (i) => -DAUGHTER_CELLS[i].x,
            y: (i) => -DAUGHTER_CELLS[i].y,
            scale: 0,
            opacity: 0,
          },
          {
            x: 0,
            y: 0,
            scale: 1,
            opacity: 1,
            stagger: 0.07,
            duration: 0.7,
            ease: "back.out(1.4)",
          },
          "<0.4",
        )
        .fromTo(
          ".meristem-step-2",
          { opacity: 0, y: 14 },
          { opacity: 1, y: 0, duration: 0.5 },
          "<0.5",
        )
        .to(".daughter-leaf", {
          backgroundColor: "rgba(94,158,106,0.12)",
          borderColor: GREEN,
          stagger: 0.07,
          duration: 0.6,
        })
        .to(
          ".daughter-root",
          {
            backgroundColor: "rgba(160,104,64,0.12)",
            borderColor: SOIL,
            stagger: 0.07,
            duration: 0.6,
          },
          "<0.15",
        )
        .fromTo(
          ".meristem-step-3",
          { opacity: 0, y: 14 },
          { opacity: 1, y: 0, duration: 0.5 },
          "<0.3",
        )
        .to({}, { duration: 1 });

      // ── Section B: Gene Expression (pinned, scrub) ────────────────────────
      const expressionTl = gsap.timeline({
        scrollTrigger: {
          trigger: ".section-expression",
          start: "top top",
          end: "+=320%",
          pin: true,
          scrub: 1.2,
        },
      });

      expressionTl
        .from(".expression-intro", { opacity: 0, y: 18, duration: 0.7 })
        .from(
          ".cell-col",
          { opacity: 0, y: 28, stagger: 0.15, duration: 0.8 },
          "<0.3",
        )
        .from(
          ".cell-icon",
          { scale: 0, stagger: 0.1, duration: 0.5, ease: "back.out(2)" },
          "<0.2",
        )
        .to({}, { duration: 1 })
        .to(".gene-active-root", {
          opacity: 1,
          stagger: 0.07,
          duration: 0.45,
        })
        .to({}, { duration: 0.9 })
        .to(".gene-active-leaf", {
          opacity: 1,
          stagger: 0.07,
          duration: 0.45,
        })
        .to({}, { duration: 0.9 })
        .to(".gene-active-flower", {
          opacity: 1,
          stagger: 0.07,
          duration: 0.45,
        })
        .fromTo(
          ".expression-caption",
          { opacity: 0, y: 10 },
          { opacity: 1, y: 0, duration: 0.6 },
        )
        .to({}, { duration: 1 });

      // ── Section C: Phytochrome (pinned, scrub) ────────────────────────────
      const lightTl = gsap.timeline({
        scrollTrigger: {
          trigger: ".section-light",
          start: "top top",
          end: "+=280%",
          pin: true,
          scrub: 1,
        },
      });

      lightTl
        .from(".light-intro", { opacity: 0, y: 18, duration: 0.7 })
        .from(
          ".pr-badge",
          { opacity: 0, x: -14, stagger: 0.1, duration: 0.5 },
          "<0.3",
        )
        .from(
          ".phyto-wrapper",
          { opacity: 0, scale: 0.88, duration: 0.6, ease: "power2.out" },
          "<0.2",
        )
        .to({}, { duration: 0.9 })
        // Photon descends
        .to(".photon", { y: 86, opacity: 0.9, duration: 0.7, ease: "power2.in" })
        // Conformational change — the protein physically morphs
        .to(".phyto-molecule", {
          borderRadius: "42% 58% 62% 38% / 48% 44% 56% 52%",
          scale: 1.12,
          borderColor: GREEN,
          backgroundColor: "rgba(94,158,106,0.1)",
          boxShadow: `0 6px 32px rgba(94,158,106,0.2)`,
          duration: 0.2,
          ease: "power3.out",
        })
        .to(".phyto-molecule", {
          scale: 1,
          duration: 0.4,
          ease: "back.out(2)",
        })
        .to(".photon", { opacity: 0, duration: 0.15 }, "<-0.3")
        // Label swap
        .to(".phyto-label-pr", { opacity: 0, duration: 0.2 })
        .to(".phyto-label-pfr", { opacity: 1, duration: 0.2 }, "<0.1")
        .to(".phyto-state-inactive", { opacity: 0, duration: 0.2 }, "<")
        .to(".phyto-state-active", { opacity: 1, duration: 0.2 }, "<0.1")
        // Downstream effects cascade
        .to(".light-effect", {
          opacity: 1,
          x: 0,
          stagger: 0.13,
          duration: 0.5,
        })
        .to({}, { duration: 1 });

      // ── Outro counters ────────────────────────────────────────────────────
      gsap.utils.toArray<HTMLElement>(".plant-stat-count").forEach((el) => {
        const target = parseFloat(el.dataset.target ?? "0");
        const proxy = { val: 0 };
        gsap.to(proxy, {
          val: target,
          duration: 2.5,
          ease: "power2.out",
          onUpdate: () => {
            el.textContent = Math.round(proxy.val).toLocaleString();
          },
          scrollTrigger: {
            trigger: el,
            start: "top 80%",
            toggleActions: "play none none reset",
          },
        });
      });

      gsap.from(".plant-outro-line", {
        opacity: 0,
        y: 24,
        stagger: 0.15,
        duration: 1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".plant-outro-section",
          start: "top 70%",
        },
      });
    },
    { scope: containerRef },
  );

  return (
    <div
      ref={containerRef}
      style={{
        background: BG,
        color: "#e6dfd0",
        fontFamily: "var(--font-sans)",
        overflowX: "hidden",
      }}
    >
      {/* ── HERO ─────────────────────────────────────────────────────────── */}
      <section
        className="relative h-screen flex flex-col items-center justify-center overflow-hidden"
        style={{
          background: `radial-gradient(ellipse at 50% 38%, #162118 0%, ${BG} 70%)`,
        }}
      >
        {/* Atmospheric particles — barely there */}
        {Array.from({ length: 14 }).map((_, i) => (
          <div
            key={i}
            className="plant-particle absolute rounded-full pointer-events-none"
            style={{
              width: i % 3 === 0 ? 3 : 2,
              height: i % 3 === 0 ? 3 : 2,
              background: i % 4 === 0 ? ACCENT : GREEN,
              opacity: 0.06 + (i % 5) * 0.04,
              left: `${(i * 47 + 8) % 92}%`,
              top: `${(i * 61 + 12) % 88}%`,
            }}
          />
        ))}

        {/* Soft warm orb */}
        <div
          className="plant-orb-inner absolute rounded-full pointer-events-none"
          style={{
            width: 360,
            height: 360,
            background: `radial-gradient(circle, rgba(200,162,40,0.08) 0%, transparent 70%)`,
            opacity: 0.12,
          }}
        />

        {/* Content */}
        <div className="relative z-10 text-center px-6">
          <p
            className="plant-eyebrow font-mono text-[11px] tracking-[0.22em] mb-10"
            style={{ color: "rgba(200,162,40,0.65)" }}
          >
            PLANT GENETICS
          </p>
          <h1
            className="text-[clamp(3rem,9vw,7rem)] leading-[1.05] mb-10"
            style={{ fontFamily: SERIF }}
          >
            <span className="plant-title-word block text-white">
              The Blueprint
            </span>
            <span
              className="plant-title-word block italic"
              style={{ color: ACCENT }}
            >
              Inside Every Leaf
            </span>
          </h1>
          <p
            className="plant-sub max-w-sm mx-auto leading-relaxed text-base md:text-lg"
            style={{ color: "rgba(230,223,208,0.5)" }}
          >
            A single plant cell contains the complete instructions for a
            400-year-old oak. Written not in binary — but in nucleotides.
          </p>
        </div>

        {/* Thin amber rule at bottom */}
        <div
          className="plant-scroll-hint absolute bottom-0 left-0 right-0 flex flex-col items-center pb-8 gap-4"
        >
          <div style={{ width: 1, height: 40, background: `rgba(200,162,40,0.25)` }} />
          <span
            className="font-mono text-[10px] tracking-[0.2em]"
            style={{ color: "rgba(200,162,40,0.4)" }}
          >
            SCROLL
          </span>
        </div>
      </section>

      {/* ── SECTION A: MERISTEM ──────────────────────────────────────────── */}
      <section
        className="section-meristem h-screen flex overflow-hidden"
        style={{ background: BG }}
      >
        <div className="flex w-full h-full">
          {/* Left: text */}
          <div className="w-1/2 h-full flex items-center px-12 md:px-20">
            <div className="max-w-xs">
              {/* Eyebrow */}
              <div className="flex items-center gap-4 mb-6">
                <span
                  className="font-mono text-[11px] tracking-widest"
                  style={{ color: ACCENT }}
                >
                  I
                </span>
                <div style={{ flex: 1, height: 1, background: RULE }} />
              </div>
              <h2
                className="text-3xl md:text-[2.6rem] leading-tight mb-6"
                style={{ fontFamily: SERIF, color: "#e6dfd0" }}
              >
                The Plant's
                <br />
                <span className="italic" style={{ color: ACCENT }}>
                  Fountain of Youth
                </span>
              </h2>
              <p
                className="meristem-intro leading-relaxed mb-6 text-[0.95rem]"
                style={{ color: "rgba(230,223,208,0.6)" }}
              >
                Hidden at every growing tip is a tiny zone called the{" "}
                <span style={{ color: "#e6dfd0" }}>meristem</span> — cells that
                never fully differentiate. They keep dividing, indefinitely,
                producing the entire plant body.
              </p>
              <p
                className="meristem-step-2 leading-relaxed mb-6 text-[0.95rem]"
                style={{ opacity: 0, color: "rgba(230,223,208,0.6)" }}
              >
                Daughter cells bud off and migrate outward. As they travel, a
                cascade of chemical signals tells each one what to become.
              </p>
              <p
                className="meristem-step-3 leading-relaxed text-[0.95rem]"
                style={{ opacity: 0, color: "rgba(230,223,208,0.6)" }}
              >
                Some push toward light and become leaves. Others grow into the
                dark and become roots.{" "}
                <span style={{ color: "#e6dfd0" }}>
                  Same DNA — entirely different fate.
                </span>
              </p>
            </div>
          </div>

          {/* Right: cell diagram */}
          <div className="w-1/2 h-full flex items-center justify-center relative">
            <div className="relative" style={{ width: 240, height: 240 }}>
              {/* Mother cell */}
              <div
                className="meristem-cell absolute rounded-full flex items-center justify-center"
                style={{
                  width: 46,
                  height: 46,
                  left: "calc(50% - 23px)",
                  top: "calc(50% - 23px)",
                  border: `1.5px solid ${ACCENT}`,
                  background: `rgba(200,162,40,0.08)`,
                  zIndex: 2,
                }}
              >
                <span
                  className="font-mono"
                  style={{ fontSize: 9, color: ACCENT, letterSpacing: "0.1em" }}
                >
                  M
                </span>
              </div>

              {/* Daughter cells */}
              {DAUGHTER_CELLS.map(({ x, y, type }, i) => (
                <div
                  key={i}
                  className={`daughter-cell daughter-${type} absolute rounded-full`}
                  style={{
                    width: 36,
                    height: 36,
                    left: `calc(50% + ${x}px - 18px)`,
                    top: `calc(50% + ${y}px - 18px)`,
                    border: `1px solid ${type === "leaf" ? GREEN : SOIL}`,
                    background: "transparent",
                    opacity: 0,
                  }}
                />
              ))}
            </div>

            {/* Legend */}
            <div
              className="absolute bottom-14 right-12 space-y-2"
              style={{ borderLeft: `1px solid ${RULE}`, paddingLeft: 14 }}
            >
              <div className="flex items-center gap-2">
                <div
                  className="w-2.5 h-2.5 rounded-full"
                  style={{ border: `1px solid ${GREEN}` }}
                />
                <span
                  className="font-mono text-[10px] tracking-widest"
                  style={{ color: GREEN }}
                >
                  LEAF
                </span>
              </div>
              <div className="flex items-center gap-2">
                <div
                  className="w-2.5 h-2.5 rounded-full"
                  style={{ border: `1px solid ${SOIL}` }}
                />
                <span
                  className="font-mono text-[10px] tracking-widest"
                  style={{ color: SOIL }}
                >
                  ROOT
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── SECTION B: GENE EXPRESSION ───────────────────────────────────── */}
      <section
        className="section-expression h-screen flex flex-col items-center justify-center overflow-hidden px-8 md:px-16"
        style={{ background: BG }}
      >
        <div className="expression-intro text-center mb-16 max-w-xl">
          <div className="flex items-center justify-center gap-4 mb-6">
            <div style={{ width: 40, height: 1, background: RULE }} />
            <span
              className="font-mono text-[11px] tracking-widest"
              style={{ color: ACCENT }}
            >
              II
            </span>
            <div style={{ width: 40, height: 1, background: RULE }} />
          </div>
          <h2
            className="text-3xl md:text-[2.6rem] leading-tight mb-5"
            style={{ fontFamily: SERIF, color: "#e6dfd0" }}
          >
            Same DNA.{" "}
            <span className="italic" style={{ color: ACCENT }}>
              Different Destiny.
            </span>
          </h2>
          <p
            className="text-[0.95rem] leading-relaxed"
            style={{ color: "rgba(230,223,208,0.55)" }}
          >
            Every cell in a plant carries the exact same genome. What separates
            a root hair from a flower petal is which genes are switched on —
            and which are silenced.
          </p>
        </div>

        {/* Three cell types */}
        <div className="flex gap-10 md:gap-20 items-end">
          {CELL_TYPES.map(({ id, label, color, activeGenes }) => (
            <div key={id} className="cell-col flex flex-col items-center gap-3">
              <div
                className="cell-icon rounded-full"
                style={{
                  width: 48,
                  height: 48,
                  border: `1.5px solid ${color}`,
                  background: `${color}12`,
                }}
              />
              <span
                className="font-mono text-[10px] tracking-widest text-center"
                style={{ color }}
              >
                {label.toUpperCase()}
              </span>

              {/* Gene strip */}
              <div className="flex gap-[3px] mt-2">
                {GENE_COLORS.map((segColor, i) => {
                  const isActive = (activeGenes as readonly number[]).includes(i);
                  return (
                    <div
                      key={i}
                      className={isActive ? `gene-active-${id}` : undefined}
                      style={{
                        width: 13,
                        height: 32,
                        background: segColor,
                        borderRadius: 2,
                        opacity: 0.1,
                      }}
                    />
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        <p
          className="expression-caption text-center mt-12 text-[0.85rem] italic max-w-sm leading-relaxed"
          style={{
            opacity: 0,
            color: "rgba(230,223,208,0.4)",
            fontFamily: SERIF,
          }}
        >
          This selective activation — differential gene expression — is how a
          25,000-gene genome builds an entire organism from a single cell.
        </p>
      </section>

      {/* ── SECTION C: PHYTOCHROME ────────────────────────────────────────── */}
      <section
        className="section-light h-screen flex overflow-hidden"
        style={{ background: BG }}
      >
        <div className="flex w-full h-full">
          {/* Left: text */}
          <div className="w-1/2 h-full flex items-center px-12 md:px-20">
            <div className="max-w-xs">
              <div className="flex items-center gap-4 mb-6">
                <span
                  className="font-mono text-[11px] tracking-widest"
                  style={{ color: ACCENT }}
                >
                  III
                </span>
                <div style={{ flex: 1, height: 1, background: RULE }} />
              </div>
              <h2
                className="text-3xl md:text-[2.6rem] leading-tight mb-6"
                style={{ fontFamily: SERIF, color: "#e6dfd0" }}
              >
                Plants Can{" "}
                <span className="italic" style={{ color: ACCENT }}>
                  See
                </span>
              </h2>
              <div
                className="light-intro space-y-4 text-[0.95rem]"
                style={{ color: "rgba(230,223,208,0.6)" }}
              >
                <p className="leading-relaxed">
                  Plants carry a protein called{" "}
                  <span style={{ color: "#e6dfd0" }}>phytochrome</span> that
                  changes its three-dimensional shape upon absorbing red light —
                  flipping between an inactive and an active state.
                </p>
                <p className="leading-relaxed">
                  This molecular switch answers the questions a plant needs
                  answered: Is it day? Am I shaded? Has winter passed?
                </p>
              </div>

              {/* Pr / Pfr key */}
              <div className="mt-8 space-y-2.5">
                {[
                  {
                    tag: "Pr",
                    tagColor: "#c06060",
                    label: "inactive · absorbs red light (660 nm)",
                  },
                  {
                    tag: "Pfr",
                    tagColor: GREEN,
                    label: "active · triggers developmental signals",
                  },
                ].map(({ tag, tagColor, label }) => (
                  <div key={tag} className="pr-badge flex items-center gap-3">
                    <span
                      className="font-mono text-[11px] px-2 py-0.5 flex-shrink-0"
                      style={{
                        color: tagColor,
                        border: `1px solid ${tagColor}44`,
                        borderRadius: 3,
                      }}
                    >
                      {tag}
                    </span>
                    <span
                      className="text-xs"
                      style={{ color: "rgba(230,223,208,0.4)" }}
                    >
                      {label}
                    </span>
                  </div>
                ))}
              </div>

              {/* Downstream effects */}
              <div className="mt-8 space-y-2">
                {[
                  "Seed germination",
                  "Stem elongation",
                  "Flowering time",
                  "Shade avoidance",
                ].map((effect) => (
                  <div
                    key={effect}
                    className="light-effect flex items-center gap-3"
                    style={{
                      opacity: 0,
                      transform: "translateX(16px)",
                    }}
                  >
                    <div
                      style={{
                        width: 4,
                        height: 4,
                        borderRadius: "50%",
                        background: ACCENT,
                        flexShrink: 0,
                      }}
                    />
                    <span
                      className="font-mono text-[11px] tracking-wide"
                      style={{ color: "rgba(230,223,208,0.55)" }}
                    >
                      {effect}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right: phytochrome molecule */}
          <div className="w-1/2 h-full flex items-center justify-center">
            <div className="phyto-wrapper flex flex-col items-center relative">
              {/* Photon */}
              <div
                className="photon absolute"
                style={{
                  width: 8,
                  height: 8,
                  borderRadius: "50%",
                  background: "#e05555",
                  boxShadow: "0 0 10px rgba(220,80,80,0.6)",
                  top: -28,
                  left: "calc(50% - 4px)",
                  opacity: 0.8,
                }}
              />
              <p
                className="font-mono text-[10px] tracking-widest mb-10"
                style={{ color: "rgba(220,80,80,0.55)" }}
              >
                ↓ RED LIGHT · 660 nm
              </p>

              {/* Molecule — starts as clean circle, morphs on absorption */}
              <div
                className="phyto-molecule relative flex items-center justify-center"
                style={{
                  width: 120,
                  height: 120,
                  borderRadius: "50%",
                  border: "1.5px solid #a04040",
                  background: "rgba(160,64,64,0.07)",
                  boxShadow: "0 4px 24px rgba(160,64,64,0.15)",
                }}
              >
                <div className="phyto-label-pr absolute inset-0 flex items-center justify-center">
                  <span
                    style={{
                      fontFamily: SERIF,
                      fontStyle: "italic",
                      fontSize: "2rem",
                      color: "#c06060",
                    }}
                  >
                    Pr
                  </span>
                </div>
                <div
                  className="phyto-label-pfr absolute inset-0 flex items-center justify-center"
                  style={{ opacity: 0 }}
                >
                  <span
                    style={{
                      fontFamily: SERIF,
                      fontStyle: "italic",
                      fontSize: "2rem",
                      color: GREEN,
                    }}
                  >
                    Pfr
                  </span>
                </div>
              </div>

              {/* State label */}
              <div className="relative mt-5 h-5">
                <div className="phyto-state-inactive absolute inset-0 flex justify-center items-center">
                  <span
                    className="font-mono text-[10px] tracking-widest"
                    style={{ color: "rgba(230,223,208,0.3)" }}
                  >
                    INACTIVE
                  </span>
                </div>
                <div
                  className="phyto-state-active absolute inset-0 flex justify-center items-center"
                  style={{ opacity: 0 }}
                >
                  <span
                    className="font-mono text-[10px] tracking-widest"
                    style={{ color: GREEN }}
                  >
                    ACTIVE
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── OUTRO ─────────────────────────────────────────────────────────── */}
      <section
        className="plant-outro-section min-h-screen flex flex-col items-center justify-center px-8 py-28"
        style={{
          background: `radial-gradient(ellipse at 50% 60%, #121e14 0%, ${BG} 70%)`,
        }}
      >
        {/* Rule + label */}
        <div className="plant-outro-line flex items-center gap-6 mb-20 w-full max-w-3xl">
          <div style={{ flex: 1, height: 1, background: RULE }} />
          <span
            className="font-mono text-[11px] tracking-[0.2em] flex-shrink-0"
            style={{ color: "rgba(200,162,40,0.55)" }}
          >
            PLANTS · BY THE NUMBERS
          </span>
          <div style={{ flex: 1, height: 1, background: RULE }} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-14 md:gap-16 text-center w-full max-w-3xl">
          {[
            {
              value: "25000",
              label: "Genes",
              sub: "in Arabidopsis thaliana,\nthe model plant",
            },
            {
              value: "391000",
              label: "Known Species",
              sub: "of plants described\non Earth",
            },
            {
              value: "25",
              label: "% Shared with Humans",
              sub: "our common ancestor\nlived 1.5 billion years ago",
            },
          ].map(({ value, label, sub }) => (
            <div key={label} className="plant-outro-line">
              <div
                className="plant-stat-count leading-none"
                style={{
                  fontFamily: SERIF,
                  fontSize: "clamp(2.8rem,6vw,4.5rem)",
                  color: ACCENT,
                }}
                data-target={value}
              >
                0
              </div>
              <div
                className="font-mono text-[11px] tracking-widest mt-3"
                style={{ color: "rgba(230,223,208,0.55)" }}
              >
                {label.toUpperCase()}
              </div>
              <p
                className="text-xs mt-2 whitespace-pre-line"
                style={{ color: "rgba(230,223,208,0.3)" }}
              >
                {sub}
              </p>
            </div>
          ))}
        </div>

        {/* Closing line — italic serif */}
        <p
          className="plant-outro-line text-xl md:text-2xl text-center mt-24 leading-relaxed max-w-lg italic"
          style={{ fontFamily: SERIF, color: "rgba(230,223,208,0.5)" }}
        >
          Everything a plant will ever do — grow toward light, resist drought,
          flower at the first frost — is written in the same ancient four-letter
          alphabet.
        </p>

        {/* Thin rule + back link */}
        <div className="plant-outro-line flex items-center gap-6 mt-16 w-full max-w-3xl">
          <div style={{ flex: 1, height: 1, background: RULE }} />
        </div>
        <a
          href="/"
          className="plant-outro-line font-mono text-[11px] tracking-[0.2em] mt-6 no-underline"
          style={{ color: "rgba(200,162,40,0.5)" }}
        >
          ← PORTFOLIO
        </a>
      </section>
    </div>
  );
}
