import type { MetaFunction } from "react-router";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const BG = "#040c05";
const ACCENT = "#4dff7c";
const WARM = "#ffd666";
const SOIL = "#d4956a";
const PETAL = "#ffb3d9";

// Cell positions (offset from center) for the meristem diagram
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

// Same 8 gene colours shown in every cell's strip
const GENE_COLORS = [
  "#ff6b6b",
  "#ffd666",
  ACCENT,
  "#4af2ff",
  "#b987ff",
  "#ff9f43",
  "#ff6b6b",
  ACCENT,
];

const CELL_TYPES = [
  {
    id: "root",
    label: "ROOT CELL",
    desc: "Grows into soil.\nAbsorbs water & minerals.",
    color: SOIL,
    activeGenes: [0, 2, 4, 6],
  },
  {
    id: "leaf",
    label: "LEAF CELL",
    desc: "Faces the sun.\nRuns photosynthesis.",
    color: ACCENT,
    activeGenes: [1, 3, 5, 7],
  },
  {
    id: "flower",
    label: "FLOWER CELL",
    desc: "Attracts pollinators.\nProduces seeds.",
    color: PETAL,
    activeGenes: [0, 3, 5, 6, 7],
  },
] as const;

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
        y: 16,
        duration: 0.6,
        delay: 0.2,
      });
      gsap.from(".plant-title-word", {
        opacity: 0,
        y: 60,
        stagger: 0.12,
        duration: 0.9,
        delay: 0.5,
        ease: "power3.out",
      });
      gsap.from(".plant-sub", { opacity: 0, duration: 0.8, delay: 1.2 });
      gsap.from(".plant-scroll-hint", {
        opacity: 0,
        y: 8,
        duration: 0.6,
        delay: 1.6,
      });

      gsap.to(".plant-orb", {
        boxShadow: `0 0 90px 35px rgba(77,255,124,0.18), 0 0 180px 70px rgba(77,255,124,0.07)`,
        scale: 1.07,
        duration: 2.8,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      gsap.utils.toArray<HTMLElement>(".plant-particle").forEach((el) => {
        gsap.to(el, {
          x: gsap.utils.random(-55, 55),
          y: gsap.utils.random(-55, 55),
          rotation: gsap.utils.random(-80, 80),
          duration: gsap.utils.random(3, 7),
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          delay: gsap.utils.random(0, 5),
        });
      });

      // ── Section A: Meristem (pinned, scrub) ───────────────────────────────
      const meristemTl = gsap.timeline({
        scrollTrigger: {
          trigger: ".section-meristem",
          start: "top top",
          end: "+=280%",
          pin: true,
          scrub: 1.2,
        },
      });

      meristemTl
        .from(".meristem-intro", { opacity: 0, y: 20, duration: 0.8 })
        .fromTo(
          ".meristem-cell",
          { scale: 0, opacity: 0 },
          {
            scale: 1,
            opacity: 1,
            duration: 0.5,
            ease: "back.out(1.7)",
            boxShadow: `0 0 30px rgba(77,255,124,0.45)`,
          },
          "<0.3",
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
            ease: "back.out(1.5)",
          },
          "<0.4",
        )
        .fromTo(
          ".meristem-step-2",
          { opacity: 0, y: 14 },
          { opacity: 1, y: 0, duration: 0.5 },
          "<0.6",
        )
        // Cells differentiate
        .to(".daughter-leaf", {
          backgroundColor: "rgba(77,255,124,0.14)",
          stagger: 0.07,
          duration: 0.5,
        })
        .to(
          ".daughter-root",
          {
            backgroundColor: "rgba(212,149,106,0.14)",
            borderColor: SOIL,
            stagger: 0.07,
            duration: 0.5,
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
        .from(".expression-intro", { opacity: 0, y: 20, duration: 0.7 })
        .from(
          ".cell-col",
          { opacity: 0, y: 30, stagger: 0.15, duration: 0.8 },
          "<0.3",
        )
        .from(
          ".cell-icon",
          { scale: 0, stagger: 0.1, duration: 0.5, ease: "back.out(2)" },
          "<0.2",
        )
        .to({}, { duration: 1 })
        // Root genes light up
        .to(".gene-active-root", {
          opacity: 1,
          boxShadow: `0 0 8px ${SOIL}`,
          stagger: 0.07,
          duration: 0.4,
        })
        .to({}, { duration: 0.8 })
        // Leaf genes light up
        .to(".gene-active-leaf", {
          opacity: 1,
          boxShadow: `0 0 8px ${ACCENT}`,
          stagger: 0.07,
          duration: 0.4,
        })
        .to({}, { duration: 0.8 })
        // Flower genes light up
        .to(".gene-active-flower", {
          opacity: 1,
          boxShadow: `0 0 8px ${PETAL}`,
          stagger: 0.07,
          duration: 0.4,
        })
        .fromTo(
          ".expression-caption",
          { opacity: 0, y: 10 },
          { opacity: 1, y: 0, duration: 0.6 },
        )
        .to({}, { duration: 1 });

      // ── Section C: Phytochrome / light sensing (pinned, scrub) ────────────
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
        .from(".light-intro", { opacity: 0, y: 20, duration: 0.7 })
        .from(
          ".pr-badge",
          { opacity: 0, x: -16, stagger: 0.1, duration: 0.5 },
          "<0.3",
        )
        .from(
          ".phyto-wrapper",
          { opacity: 0, scale: 0.85, duration: 0.6, ease: "back.out(1.5)" },
          "<0.2",
        )
        .to({}, { duration: 0.8 })
        // Photon falls toward molecule
        .to(".photon", { y: 82, duration: 0.7, ease: "power2.in" })
        // Impact flash → transform
        .to(".phyto-molecule", {
          scale: 1.18,
          borderColor: ACCENT,
          boxShadow: `0 0 55px rgba(77,255,124,0.65)`,
          duration: 0.15,
          ease: "power3.out",
        })
        .to(".phyto-molecule", {
          scale: 1,
          duration: 0.35,
          ease: "back.out(2)",
        })
        .to(".photon", { opacity: 0, duration: 0.15 }, "<-0.2")
        // Swap Pr → Pfr labels
        .to(".phyto-label-pr", { opacity: 0, duration: 0.2 })
        .to(".phyto-label-pfr", { opacity: 1, duration: 0.2 }, "<0.1")
        .to(".phyto-state-inactive", { opacity: 0, duration: 0.2 }, "<")
        .to(".phyto-state-active", { opacity: 1, duration: 0.2 }, "<0.1")
        // Effects cascade in
        .to(".light-effect", {
          opacity: 1,
          x: 0,
          stagger: 0.12,
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
        y: 28,
        stagger: 0.15,
        duration: 0.9,
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
        color: "#e8f8ed",
        fontFamily: "var(--font-sans)",
        overflowX: "hidden",
      }}
    >
      {/* ── HERO ─────────────────────────────────────────────────────────── */}
      <section className="relative h-screen flex flex-col items-center justify-center overflow-hidden">
        {/* Dot grid */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: `radial-gradient(rgba(77,255,124,0.1) 1px, transparent 1px)`,
            backgroundSize: "44px 44px",
          }}
        />

        {/* Particles — mix of dots and tiny squares to suggest pollen/spores */}
        {Array.from({ length: 28 }).map((_, i) => (
          <div
            key={i}
            className="plant-particle absolute pointer-events-none"
            style={{
              width: i % 5 === 0 ? 6 : i % 3 === 0 ? 4 : 2,
              height: i % 5 === 0 ? 6 : i % 3 === 0 ? 4 : 2,
              borderRadius: i % 4 === 0 ? "2px" : "50%",
              background: i % 7 === 0 ? WARM : ACCENT,
              opacity: 0.1 + (i % 7) * 0.07,
              left: `${(i * 39 + 5) % 94}%`,
              top: `${(i * 57 + 9) % 90}%`,
            }}
          />
        ))}

        {/* Orb */}
        <div
          className="plant-orb absolute rounded-full pointer-events-none"
          style={{
            width: 320,
            height: 320,
            border: `1px solid rgba(77,255,124,0.13)`,
            boxShadow: `0 0 60px 20px rgba(77,255,124,0.08)`,
          }}
        />

        {/* Content */}
        <div className="relative z-10 text-center px-6">
          <p
            className="plant-eyebrow font-mono text-xs tracking-[0.25em] mb-8"
            style={{ color: ACCENT }}
          >
            [ PLANT GENETICS / SCROLLYTELLING DEMO ]
          </p>
          <h1 className="text-[clamp(2.8rem,9vw,7.5rem)] font-bold leading-tight mb-8">
            <span className="plant-title-word inline-block text-white">The</span>{" "}
            <span
              className="plant-title-word inline-block"
              style={{ color: ACCENT }}
            >
              Blueprint
            </span>
            <br />
            <span className="plant-title-word inline-block text-white">
              in Every
            </span>{" "}
            <span
              className="plant-title-word inline-block"
              style={{ color: ACCENT }}
            >
              Leaf
            </span>
          </h1>
          <p
            className="plant-sub text-lg md:text-xl max-w-sm mx-auto leading-relaxed"
            style={{ color: "rgba(232,248,237,0.5)" }}
          >
            A single cell holds the complete instructions for an oak tree —
            written in a language{" "}
            <span className="font-mono" style={{ color: ACCENT }}>
              3 billion letters long
            </span>
            .
          </p>
        </div>

        <p
          className="plant-scroll-hint absolute bottom-8 font-mono text-xs tracking-widest"
          style={{ color: "rgba(77,255,124,0.4)" }}
        >
          SCROLL TO EXPLORE ↓
        </p>
      </section>

      {/* ── SECTION A: MERISTEM ──────────────────────────────────────────── */}
      <section
        className="section-meristem h-screen flex overflow-hidden"
        style={{ background: BG }}
      >
        <div className="flex w-full h-full">
          {/* Left: text */}
          <div className="w-1/2 h-full flex items-center px-10 md:px-16">
            <div>
              <p
                className="font-mono text-xs tracking-widest mb-5"
                style={{ color: ACCENT }}
              >
                [ 01 / THE MERISTEM ]
              </p>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                The Plant's
                <br />
                Fountain of Youth
              </h2>
              <p
                className="meristem-intro leading-relaxed mb-6 max-w-xs"
                style={{ color: "rgba(232,248,237,0.55)" }}
              >
                Hidden at every growing tip is a tiny zone of cells that never
                fully differentiates —{" "}
                <span className="font-mono" style={{ color: ACCENT }}>
                  the meristem
                </span>
                . It keeps dividing, indefinitely.
              </p>
              <p
                className="meristem-step-2 leading-relaxed mb-6 max-w-xs"
                style={{ opacity: 0, color: "rgba(232,248,237,0.55)" }}
              >
                Daughter cells bud off and migrate outward, receiving chemical
                signals that tell them what to become.
              </p>
              <p
                className="meristem-step-3 leading-relaxed max-w-xs"
                style={{ opacity: 0, color: "rgba(232,248,237,0.55)" }}
              >
                Some reach toward light and become leaves. Others push into the
                dark and become roots.{" "}
                <span style={{ color: ACCENT }}>Same DNA — different fate.</span>
              </p>
            </div>
          </div>

          {/* Right: cell diagram */}
          <div className="w-1/2 h-full flex items-center justify-center relative">
            <div className="relative" style={{ width: 240, height: 240 }}>
              {/* Meristem (mother cell) */}
              <div
                className="meristem-cell absolute rounded-full flex items-center justify-center"
                style={{
                  width: 48,
                  height: 48,
                  left: "calc(50% - 24px)",
                  top: "calc(50% - 24px)",
                  border: `2px solid ${ACCENT}`,
                  background: `rgba(77,255,124,0.1)`,
                  zIndex: 2,
                }}
              >
                <span
                  className="font-mono"
                  style={{ fontSize: 9, color: ACCENT }}
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
                    width: 38,
                    height: 38,
                    left: `calc(50% + ${x}px - 19px)`,
                    top: `calc(50% + ${y}px - 19px)`,
                    border: `1.5px solid ${type === "leaf" ? ACCENT : SOIL}`,
                    background: "transparent",
                  }}
                />
              ))}
            </div>

            {/* Legend */}
            <div className="absolute bottom-12 right-10 flex flex-col gap-2">
              <div className="flex items-center gap-2">
                <div
                  className="w-3 h-3 rounded-full"
                  style={{
                    border: `1.5px solid ${ACCENT}`,
                    background: "rgba(77,255,124,0.14)",
                  }}
                />
                <span
                  className="font-mono text-xs"
                  style={{ color: ACCENT }}
                >
                  LEAF
                </span>
              </div>
              <div className="flex items-center gap-2">
                <div
                  className="w-3 h-3 rounded-full"
                  style={{
                    border: `1.5px solid ${SOIL}`,
                    background: "rgba(212,149,106,0.14)",
                  }}
                />
                <span
                  className="font-mono text-xs"
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
        <div className="expression-intro text-center mb-14 max-w-lg">
          <p
            className="font-mono text-xs tracking-widest mb-5"
            style={{ color: ACCENT }}
          >
            [ 02 / GENE EXPRESSION ]
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Same DNA. Different Destiny.
          </h2>
          <p
            className="leading-relaxed"
            style={{ color: "rgba(232,248,237,0.5)" }}
          >
            Every cell in a plant carries the{" "}
            <em>exact same genome</em>. What separates a root from a petal is
            which genes are switched on.
          </p>
        </div>

        {/* Three cell types */}
        <div className="flex gap-8 md:gap-14 items-end">
          {CELL_TYPES.map(({ id, label, desc, color, activeGenes }) => (
            <div
              key={id}
              className="cell-col flex flex-col items-center gap-3"
            >
              {/* Cell icon */}
              <div
                className="cell-icon rounded-full"
                style={{
                  width: 52,
                  height: 52,
                  border: `2px solid ${color}`,
                  background: `${color}14`,
                }}
              />
              <span
                className="font-mono text-xs text-center"
                style={{ color }}
              >
                {label}
              </span>
              <p
                className="text-xs text-center whitespace-pre-line"
                style={{ color: "rgba(232,248,237,0.38)" }}
              >
                {desc}
              </p>

              {/* Gene strip — same genes, different ones active */}
              <div className="flex gap-1 mt-3">
                {GENE_COLORS.map((segColor, i) => {
                  const isActive = activeGenes.includes(
                    i as (typeof activeGenes)[number],
                  );
                  return (
                    <div
                      key={i}
                      className={isActive ? `gene-active-${id}` : undefined}
                      style={{
                        width: 14,
                        height: 30,
                        background: segColor,
                        borderRadius: 3,
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
          className="expression-caption font-mono text-xs text-center mt-12 max-w-sm leading-relaxed"
          style={{ opacity: 0, color: "rgba(232,248,237,0.35)" }}
        >
          This selective activation — called differential gene expression — is
          how a single genome builds an entire organism.
        </p>
      </section>

      {/* ── SECTION C: PHYTOCHROME / LIGHT SENSING ───────────────────────── */}
      <section
        className="section-light h-screen flex overflow-hidden"
        style={{ background: BG }}
      >
        <div className="flex w-full h-full">
          {/* Left: text */}
          <div className="w-1/2 h-full flex items-center px-10 md:px-16">
            <div>
              <p
                className="font-mono text-xs tracking-widest mb-5"
                style={{ color: ACCENT }}
              >
                [ 03 / PHYTOCHROME ]
              </p>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                Plants Can See
              </h2>
              <div
                className="light-intro max-w-xs space-y-4"
                style={{ color: "rgba(232,248,237,0.55)" }}
              >
                <p className="leading-relaxed">
                  Plants carry a protein called{" "}
                  <span className="font-mono" style={{ color: WARM }}>
                    phytochrome
                  </span>{" "}
                  that changes shape when it absorbs red light — toggling between
                  an inactive and an active state.
                </p>
                <p className="leading-relaxed">
                  This switch answers questions the plant needs to survive: Is it
                  day or night? Am I being shaded? Is spring coming?
                </p>
              </div>

              {/* Pr / Pfr key */}
              <div className="mt-8 space-y-2">
                {[
                  {
                    cls: "pr-badge",
                    tag: "Pr",
                    tagColor: "#cc3333",
                    tagBg: "rgba(255,80,80,0.12)",
                    tagBorder: "rgba(255,80,80,0.3)",
                    label: "inactive — absorbs red light (660 nm)",
                  },
                  {
                    cls: "pr-badge",
                    tag: "Pfr",
                    tagColor: ACCENT,
                    tagBg: `rgba(77,255,124,0.12)`,
                    tagBorder: `rgba(77,255,124,0.3)`,
                    label: "active — triggers developmental signals",
                  },
                ].map(({ cls, tag, tagColor, tagBg, tagBorder, label }) => (
                  <div key={tag} className={`${cls} flex items-center gap-3`}>
                    <span
                      className="font-mono text-xs px-2 py-0.5 rounded flex-shrink-0"
                      style={{
                        color: tagColor,
                        background: tagBg,
                        border: `1px solid ${tagBorder}`,
                      }}
                    >
                      {tag}
                    </span>
                    <span
                      className="text-xs"
                      style={{ color: "rgba(232,248,237,0.4)" }}
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
                    style={{ opacity: 0, transform: "translateX(20px)" }}
                  >
                    <div
                      className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                      style={{ background: ACCENT }}
                    />
                    <span
                      className="font-mono text-xs"
                      style={{ color: ACCENT }}
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
              {/* Photon (starts above molecule) */}
              <div
                className="photon absolute"
                style={{
                  width: 10,
                  height: 10,
                  borderRadius: "50%",
                  background: "#ff5555",
                  boxShadow: "0 0 16px #ff5555, 0 0 30px rgba(255,85,85,0.5)",
                  top: -30,
                  left: "calc(50% - 5px)",
                }}
              />

              <p
                className="font-mono text-xs mb-10"
                style={{ color: "#ff6b6b" }}
              >
                ↓ RED LIGHT (660 nm)
              </p>

              {/* Molecule */}
              <div
                className="phyto-molecule relative rounded-full flex items-center justify-center"
                style={{
                  width: 120,
                  height: 120,
                  border: "2px solid #aa2222",
                  background: "rgba(170,34,34,0.1)",
                  boxShadow: "0 0 24px rgba(170,34,34,0.22)",
                }}
              >
                <div className="phyto-label-pr absolute inset-0 flex items-center justify-center">
                  <span
                    className="font-mono text-3xl font-bold"
                    style={{ color: "#cc3333" }}
                  >
                    Pr
                  </span>
                </div>
                <div
                  className="phyto-label-pfr absolute inset-0 flex items-center justify-center"
                  style={{ opacity: 0 }}
                >
                  <span
                    className="font-mono text-3xl font-bold"
                    style={{ color: ACCENT }}
                  >
                    Pfr
                  </span>
                </div>
              </div>

              {/* State label */}
              <div className="relative mt-5 h-5">
                <div className="phyto-state-inactive absolute inset-0 flex justify-center">
                  <span
                    className="font-mono text-xs"
                    style={{ color: "rgba(232,248,237,0.35)" }}
                  >
                    INACTIVE
                  </span>
                </div>
                <div
                  className="phyto-state-active absolute inset-0 flex justify-center"
                  style={{ opacity: 0 }}
                >
                  <span
                    className="font-mono text-xs"
                    style={{ color: ACCENT }}
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
        style={{ background: BG }}
      >
        <p
          className="plant-outro-line font-mono text-xs tracking-widest mb-20"
          style={{ color: ACCENT }}
        >
          [ PLANTS, BY THE NUMBERS ]
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-14 md:gap-20 text-center w-full max-w-3xl">
          <div className="plant-outro-line">
            <div
              className="plant-stat-count font-mono font-bold text-white leading-none"
              style={{ fontSize: "clamp(2.5rem,6vw,4.5rem)" }}
              data-target="25000"
            >
              0
            </div>
            <div
              className="font-mono text-xs tracking-widest mt-3"
              style={{ color: ACCENT }}
            >
              GENES
            </div>
            <p
              className="text-sm mt-2"
              style={{ color: "rgba(232,248,237,0.35)" }}
            >
              in <em>Arabidopsis</em>, the model plant
            </p>
          </div>
          <div className="plant-outro-line">
            <div
              className="plant-stat-count font-mono font-bold text-white leading-none"
              style={{ fontSize: "clamp(2.5rem,6vw,4.5rem)" }}
              data-target="391000"
            >
              0
            </div>
            <div
              className="font-mono text-xs tracking-widest mt-3"
              style={{ color: ACCENT }}
            >
              KNOWN SPECIES
            </div>
            <p
              className="text-sm mt-2"
              style={{ color: "rgba(232,248,237,0.35)" }}
            >
              of plants on Earth
            </p>
          </div>
          <div className="plant-outro-line">
            <div
              className="plant-stat-count font-mono font-bold text-white leading-none"
              style={{ fontSize: "clamp(2.5rem,6vw,4.5rem)" }}
              data-target="25"
            >
              0
            </div>
            <div
              className="font-mono text-xs tracking-widest mt-3"
              style={{ color: ACCENT }}
            >
              % SHARED WITH HUMANS
            </div>
            <p
              className="text-sm mt-2"
              style={{ color: "rgba(232,248,237,0.35)" }}
            >
              plants and humans share ancient genes
            </p>
          </div>
        </div>

        <p
          className="plant-outro-line text-lg md:text-xl text-center max-w-lg mt-24 leading-relaxed"
          style={{ color: "rgba(232,248,237,0.45)" }}
        >
          A sunflower that tracks the sun. A seed dormant for a century, then
          sprouting. A vine that finds a trellis. All of it written in the same
          ancient molecular alphabet.
        </p>

        <a
          href="/"
          className="plant-outro-line font-mono text-xs tracking-widest mt-14 no-underline"
          style={{ color: ACCENT }}
        >
          ← BACK TO PORTFOLIO
        </a>
      </section>
    </div>
  );
}
