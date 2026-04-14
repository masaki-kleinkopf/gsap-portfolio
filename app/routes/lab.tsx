import type { MetaFunction } from "react-router";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const ACCENT = "#4af2ff";
const BG = "#060810";

export const meta: MetaFunction = () => [
  { title: "Lab" },
  { name: "robots", content: "noindex, nofollow" },
];

export default function Lab() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const sel = gsap.utils.selector(containerRef);

      // ── Hero ──────────────────────────────────────────────────────────────
      gsap.from(".lab-eyebrow", {
        opacity: 0,
        y: 16,
        duration: 0.6,
        delay: 0.2,
      });
      gsap.from(".lab-title-word", {
        opacity: 0,
        y: 60,
        stagger: 0.12,
        duration: 0.9,
        delay: 0.5,
        ease: "power3.out",
      });
      gsap.from(".lab-sub", { opacity: 0, duration: 0.8, delay: 1.2 });
      gsap.from(".lab-scroll-hint", {
        opacity: 0,
        y: 8,
        duration: 0.6,
        delay: 1.6,
      });

      // Pulsing orb behind title
      gsap.to(".lab-orb", {
        boxShadow: `0 0 100px 40px rgba(74,242,255,0.25), 0 0 200px 80px rgba(74,242,255,0.08)`,
        scale: 1.08,
        duration: 2.2,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      // Floating particles
      gsap.utils.toArray<HTMLElement>(".lab-particle").forEach((el) => {
        gsap.to(el, {
          x: gsap.utils.random(-50, 50),
          y: gsap.utils.random(-50, 50),
          duration: gsap.utils.random(3, 6),
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          delay: gsap.utils.random(0, 4),
        });
      });

      // ── Section A: Action Potential (pinned, scrub) ───────────────────────
      const voltageProxy = { val: -70 };
      const voltageEl = sel(".voltage-num")[0] as HTMLElement | undefined;

      const actionTl = gsap.timeline({
        scrollTrigger: {
          trigger: ".section-action",
          start: "top top",
          end: "+=300%",
          pin: true,
          scrub: 1.5,
        },
      });

      // Step 1 — at rest
      actionTl
        .from(".step-rest", { opacity: 0, x: -24, duration: 1 })
        .from(".ion", { scale: 0, opacity: 0, stagger: 0.07, duration: 0.5 }, "<0.2")
        .to({}, { duration: 1.2 })

        // Step 2 — sodium rushes in
        .to(".step-rest", { opacity: 0, x: -24, duration: 0.5 })
        .fromTo(
          ".step-stimulus",
          { opacity: 0, x: -24 },
          { opacity: 1, x: 0, duration: 0.5 },
          "<",
        )
        .to(
          ".ion-na",
          {
            x: "random(-28, 28)",
            y: "random(-28, 28)",
            color: "#ff6b6b",
            scale: 1.5,
            stagger: 0.04,
            duration: 0.9,
          },
          "<0.2",
        )
        .to(
          voltageProxy,
          {
            val: 40,
            duration: 0.9,
            ease: "power2.in",
            onUpdate: () => {
              if (voltageEl) {
                const v = Math.round(voltageProxy.val);
                voltageEl.textContent = (v >= 0 ? "+" : "") + v;
              }
            },
          },
          "<0.2",
        )
        .to(
          ".voltage-fill",
          { height: "100%", backgroundColor: "#ff6b6b", duration: 0.9 },
          "<",
        )
        .to({}, { duration: 1.2 })

        // Step 3 — repolarize
        .to(".step-stimulus", { opacity: 0, x: -24, duration: 0.5 })
        .fromTo(
          ".step-spike",
          { opacity: 0, x: -24 },
          { opacity: 1, x: 0, duration: 0.5 },
          "<",
        )
        .to(
          ".ion-na",
          {
            x: 0,
            y: 0,
            color: ACCENT,
            scale: 1,
            stagger: 0.03,
            duration: 1.2,
          },
          "<0.1",
        )
        .to(
          voltageProxy,
          {
            val: -70,
            duration: 1.4,
            ease: "power2.out",
            onUpdate: () => {
              if (voltageEl) {
                const v = Math.round(voltageProxy.val);
                voltageEl.textContent = (v >= 0 ? "+" : "") + v;
              }
            },
          },
          "<",
        )
        .to(
          ".voltage-fill",
          { height: "30%", backgroundColor: ACCENT, duration: 1.4 },
          "<",
        )
        .to({}, { duration: 1 });

      // ── Section B: Signal travels (pinned, scrub) ─────────────────────────
      const signalTl = gsap.timeline({
        scrollTrigger: {
          trigger: ".section-signal",
          start: "top top",
          end: "+=200%",
          pin: true,
          scrub: 1,
        },
      });

      signalTl
        .from(".signal-intro", { opacity: 0, y: 20, duration: 0.6 })
        .from(
          ".axon-track",
          {
            scaleX: 0,
            transformOrigin: "left center",
            duration: 1.8,
            ease: "power2.inOut",
          },
          "<0.3",
        )
        .from(".axon-node-start", { scale: 0, duration: 0.4 }, "<")
        .from(".axon-node-end", { scale: 0, duration: 0.4 }, "<1.2")
        .fromTo(
          ".signal-dot",
          { x: 0, opacity: 0 },
          {
            x: () => {
              const wrapper = sel(".axon-track-wrapper")[0] as HTMLElement | undefined;
              return wrapper ? wrapper.offsetWidth - 14 : 500;
            },
            opacity: 1,
            duration: 2.5,
            ease: "none",
          },
          "<0.2",
        )
        .from(".signal-stat", { opacity: 0, scale: 0.85, duration: 0.6 }, "<0.8")
        .to({}, { duration: 1 });

      // ── Section C: Synapse (pinned, scrub) ────────────────────────────────
      const synapseTl = gsap.timeline({
        scrollTrigger: {
          trigger: ".section-synapse",
          start: "top top",
          end: "+=250%",
          pin: true,
          scrub: 1,
        },
      });

      synapseTl
        .from(".synapse-intro", { opacity: 0, y: 20, duration: 0.6 })
        .from(".pre-terminal", { opacity: 0, x: -60, duration: 0.8 }, "<0.2")
        .from(".post-membrane", { opacity: 0, x: 60, duration: 0.8 }, "<0.15")
        .from(".gap-label", { opacity: 0, duration: 0.5 }, "<0.3")
        .from(
          ".nt-dot",
          { scale: 0, opacity: 0, stagger: 0.07, duration: 0.4 },
          "<0.2",
        )
        .to(
          ".nt-dot",
          {
            x: 90,
            y: (i: number) => (i - 2) * 14,
            opacity: 1,
            stagger: 0.06,
            duration: 1.4,
            ease: "power1.out",
          },
        )
        .to(
          ".nt-dot",
          {
            x: 190,
            opacity: 0,
            stagger: 0.05,
            duration: 0.9,
            ease: "power2.in",
          },
        )
        .from(".synapse-caption", { opacity: 0, y: 12, duration: 0.6 })
        .to({}, { duration: 1 });

      // ── Outro counters ────────────────────────────────────────────────────
      gsap.utils.toArray<HTMLElement>(".stat-count").forEach((el) => {
        const target = parseFloat(el.dataset.target ?? "0");
        const proxy = { val: 0 };
        gsap.to(proxy, {
          val: target,
          duration: 2.5,
          ease: "power2.out",
          onUpdate: () => {
            el.textContent = Number.isInteger(target)
              ? Math.round(proxy.val).toLocaleString()
              : proxy.val.toFixed(0);
          },
          scrollTrigger: {
            trigger: el,
            start: "top 80%",
            toggleActions: "play none none reset",
          },
        });
      });

      gsap.from(".outro-line", {
        opacity: 0,
        y: 28,
        stagger: 0.15,
        duration: 0.9,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".outro-section",
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
        color: "#e8f4f8",
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
            backgroundImage: `radial-gradient(rgba(74,242,255,0.12) 1px, transparent 1px)`,
            backgroundSize: "40px 40px",
          }}
        />

        {/* Floating particles */}
        {Array.from({ length: 24 }).map((_, i) => (
          <div
            key={i}
            className="lab-particle absolute rounded-full pointer-events-none"
            style={{
              width: i % 4 === 0 ? 5 : i % 3 === 0 ? 3 : 2,
              height: i % 4 === 0 ? 5 : i % 3 === 0 ? 3 : 2,
              background: ACCENT,
              opacity: 0.15 + (i % 6) * 0.08,
              left: `${(i * 41 + 7) % 92}%`,
              top: `${(i * 57 + 11) % 88}%`,
            }}
          />
        ))}

        {/* Orb */}
        <div
          className="lab-orb absolute rounded-full pointer-events-none"
          style={{
            width: 320,
            height: 320,
            border: `1px solid rgba(74,242,255,0.2)`,
            boxShadow: `0 0 60px 20px rgba(74,242,255,0.15)`,
          }}
        />

        {/* Content */}
        <div className="relative z-10 text-center px-6">
          <p
            className="lab-eyebrow font-mono text-xs tracking-[0.25em] mb-8"
            style={{ color: ACCENT }}
          >
            [ NEUROSCIENCE / SCROLLYTELLING DEMO ]
          </p>
          <h1 className="text-[clamp(3rem,10vw,8rem)] font-bold leading-tight mb-8">
            <span className="lab-title-word inline-block text-white">The</span>{" "}
            <span
              className="lab-title-word inline-block"
              style={{ color: ACCENT }}
            >
              Firing
            </span>
            <br />
            <span className="lab-title-word inline-block text-white">
              Neuron
            </span>
          </h1>
          <p
            className="lab-sub text-lg md:text-xl max-w-sm mx-auto leading-relaxed"
            style={{ color: "rgba(232,244,248,0.5)" }}
          >
            How a single brain cell sends a message at{" "}
            <span className="font-mono" style={{ color: ACCENT }}>
              120 m/s
            </span>
          </p>
        </div>

        <p
          className="lab-scroll-hint absolute bottom-8 font-mono text-xs tracking-widest"
          style={{ color: "rgba(74,242,255,0.4)" }}
        >
          SCROLL TO EXPLORE ↓
        </p>
      </section>

      {/* ── SECTION A: ACTION POTENTIAL ──────────────────────────────────── */}
      <section
        className="section-action h-screen flex overflow-hidden"
        style={{ background: BG }}
      >
        <div className="flex w-full h-full">
          {/* Left: step text */}
          <div className="relative w-1/2 h-full flex items-center">
            {[
              {
                cls: "step-rest",
                step: "01 / AT REST",
                title: "The Resting State",
                body: (
                  <>
                    A neuron at rest holds a negative charge inside its
                    membrane — about{" "}
                    <span className="font-mono" style={{ color: ACCENT }}>
                      −70 mV
                    </span>
                    . Sodium ions (Na⁺) cluster outside; potassium (K⁺) sits
                    within. Everything is in equilibrium.
                  </>
                ),
              },
              {
                cls: "step-stimulus",
                step: "02 / STIMULUS",
                title: "Sodium Rushes In",
                body: (
                  <>
                    When a signal crosses the threshold, sodium channels snap
                    open. Na⁺ floods inward, flipping the charge to{" "}
                    <span className="font-mono" style={{ color: "#ff6b6b" }}>
                      +40 mV
                    </span>{" "}
                    in under one millisecond.
                  </>
                ),
                hidden: true,
              },
              {
                cls: "step-spike",
                step: "03 / REPOLARIZE",
                title: "The Reset",
                body: (
                  <>
                    Potassium channels open, K⁺ flows out, and the membrane
                    snaps back to{" "}
                    <span className="font-mono" style={{ color: ACCENT }}>
                      −70 mV
                    </span>
                    . The whole cycle completes in under{" "}
                    <span className="font-mono" style={{ color: ACCENT }}>
                      2 milliseconds
                    </span>
                    .
                  </>
                ),
                hidden: true,
              },
            ].map(({ cls, step, title, body, hidden }) => (
              <div
                key={cls}
                className={`${cls} absolute px-10 md:px-16`}
                style={hidden ? { opacity: 0 } : undefined}
              >
                <p
                  className="font-mono text-xs tracking-widest mb-5"
                  style={{ color: ACCENT }}
                >
                  [ {step} ]
                </p>
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-5">
                  {title}
                </h2>
                <p
                  className="leading-relaxed max-w-xs"
                  style={{ color: "rgba(232,244,248,0.55)" }}
                >
                  {body}
                </p>
              </div>
            ))}
          </div>

          {/* Right: neuron + voltage meter */}
          <div className="w-1/2 h-full flex items-center justify-center relative">
            {/* Cell body */}
            <div
              className="relative flex items-center justify-center rounded-full flex-shrink-0"
              style={{
                width: 130,
                height: 130,
                border: `1.5px solid ${ACCENT}`,
                boxShadow: `0 0 40px rgba(74,242,255,0.18)`,
              }}
            >
              <span
                className="font-mono text-xs tracking-widest"
                style={{ color: ACCENT }}
              >
                SOMA
              </span>

              {/* Na+ ions — outside */}
              {(
                [
                  { top: -30, left: 24 },
                  { top: -24, right: 20 },
                  { top: 26, right: -52 },
                  { bottom: -32, right: 20 },
                ] as React.CSSProperties[]
              ).map((pos, i) => (
                <span
                  key={i}
                  className="ion ion-na absolute font-mono text-xs font-semibold"
                  style={{ ...pos, color: ACCENT }}
                >
                  Na⁺
                </span>
              ))}

              {/* K+ ions — inside */}
              {(
                [
                  { top: 28, left: 18 },
                  { top: 20, right: 18 },
                  { bottom: 22, left: 30 },
                ] as React.CSSProperties[]
              ).map((pos, i) => (
                <span
                  key={i}
                  className="ion ion-k absolute font-mono text-xs"
                  style={{ ...pos, color: "rgba(232,244,248,0.35)" }}
                >
                  K⁺
                </span>
              ))}
            </div>

            {/* Voltage meter */}
            <div className="absolute right-10 md:right-16 flex flex-col items-center gap-1">
              <span
                className="font-mono text-xs"
                style={{ color: "rgba(74,242,255,0.5)" }}
              >
                +40
              </span>
              <div
                className="relative rounded-full overflow-hidden"
                style={{
                  width: 18,
                  height: 150,
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(74,242,255,0.15)",
                }}
              >
                <div
                  className="voltage-fill absolute bottom-0 w-full rounded-full"
                  style={{ height: "30%", background: ACCENT }}
                />
              </div>
              <span
                className="font-mono text-xs"
                style={{ color: "rgba(74,242,255,0.5)" }}
              >
                −70
              </span>
              <div className="mt-4 text-center">
                <div className="voltage-num font-mono text-3xl font-bold text-white">
                  -70
                </div>
                <div
                  className="font-mono text-xs mt-1"
                  style={{ color: "rgba(74,242,255,0.4)" }}
                >
                  mV
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── SECTION B: SIGNAL TRAVELS ─────────────────────────────────────── */}
      <section
        className="section-signal h-screen flex flex-col items-center justify-center overflow-hidden px-8 md:px-16"
        style={{ background: BG }}
      >
        <div className="signal-intro text-center mb-20 max-w-md">
          <p
            className="font-mono text-xs tracking-widest mb-5"
            style={{ color: ACCENT }}
          >
            [ 04 / PROPAGATION ]
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            The Signal Travels
          </h2>
          <p
            className="leading-relaxed"
            style={{ color: "rgba(232,244,248,0.5)" }}
          >
            The electrical spike races down the axon — a fibre that can stretch
            over a metre in your spine.
          </p>
        </div>

        {/* Axon visualization */}
        <div className="relative w-full max-w-2xl flex items-center">
          <div
            className="axon-node-start flex-shrink-0 rounded-full"
            style={{
              width: 32,
              height: 32,
              background: BG,
              border: `2px solid ${ACCENT}`,
              boxShadow: `0 0 20px rgba(74,242,255,0.5)`,
              zIndex: 1,
            }}
          />

          <div
            className="axon-track-wrapper relative flex-1 mx-1"
            style={{ height: 2 }}
          >
            <div
              className="axon-track absolute inset-0"
              style={{
                background: `linear-gradient(90deg, ${ACCENT}, rgba(74,242,255,0.25))`,
              }}
            />
            <div
              className="signal-dot absolute"
              style={{
                width: 14,
                height: 14,
                borderRadius: "50%",
                background: "#fff",
                top: "50%",
                left: 0,
                transform: "translateY(-50%)",
                boxShadow: `0 0 24px 8px rgba(74,242,255,1), 0 0 50px 20px rgba(74,242,255,0.5)`,
                opacity: 0,
                zIndex: 2,
              }}
            />
          </div>

          <div
            className="axon-node-end flex-shrink-0 rounded-full"
            style={{
              width: 22,
              height: 22,
              background: BG,
              border: `1.5px solid rgba(74,242,255,0.35)`,
              zIndex: 1,
            }}
          />
        </div>

        {/* Speed stat */}
        <div className="signal-stat mt-20 text-center">
          <div className="font-mono text-[clamp(3rem,8vw,6rem)] font-bold text-white leading-none">
            120
          </div>
          <div
            className="font-mono text-xs tracking-widest mt-2"
            style={{ color: ACCENT }}
          >
            METRES PER SECOND
          </div>
          <div
            className="text-sm mt-2"
            style={{ color: "rgba(232,244,248,0.35)" }}
          >
            faster than a diving peregrine falcon
          </div>
        </div>
      </section>

      {/* ── SECTION C: SYNAPSE ────────────────────────────────────────────── */}
      <section
        className="section-synapse h-screen flex flex-col items-center justify-center overflow-hidden px-8"
        style={{ background: BG }}
      >
        <div className="synapse-intro text-center mb-14 max-w-md">
          <p
            className="font-mono text-xs tracking-widest mb-5"
            style={{ color: ACCENT }}
          >
            [ 05 / SYNAPSE ]
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Crossing the Gap
          </h2>
          <p
            className="leading-relaxed"
            style={{ color: "rgba(232,244,248,0.5)" }}
          >
            The signal can&apos;t jump directly. Instead, it triggers the
            release of chemical messengers called neurotransmitters.
          </p>
        </div>

        {/* Synapse diagram */}
        <div className="relative flex items-center" style={{ gap: 0 }}>
          {/* Presynaptic terminal */}
          <div
            className="pre-terminal relative flex items-center justify-center"
            style={{
              width: 110,
              height: 90,
              borderRadius: "14px 6px 6px 14px",
              border: `1.5px solid ${ACCENT}`,
              boxShadow: `0 0 24px rgba(74,242,255,0.18)`,
            }}
          >
            <span
              className="font-mono text-xs text-center leading-tight"
              style={{ color: ACCENT }}
            >
              PRE
              <br />
              SYNAPTIC
            </span>

            {/* Neurotransmitter dots */}
            {Array.from({ length: 5 }).map((_, i) => (
              <div
                key={i}
                className="nt-dot absolute rounded-full"
                style={{
                  width: 9,
                  height: 9,
                  background: ACCENT,
                  right: 10 + (i % 2) * 12,
                  top: 16 + i * 14,
                  boxShadow: `0 0 8px ${ACCENT}`,
                }}
              />
            ))}
          </div>

          {/* Cleft */}
          <div
            className="relative flex flex-col items-center justify-center"
            style={{ width: 90, height: 90 }}
          >
            <div
              className="gap-label font-mono text-xs text-center leading-snug"
              style={{ color: "rgba(232,244,248,0.3)" }}
            >
              synaptic
              <br />
              cleft
              <br />
              <span style={{ color: ACCENT }}>20 nm</span>
            </div>
          </div>

          {/* Postsynaptic membrane */}
          <div
            className="post-membrane flex items-center justify-center"
            style={{
              width: 110,
              height: 90,
              borderRadius: "6px 14px 14px 6px",
              border: "1.5px solid rgba(232,244,248,0.18)",
            }}
          >
            <span
              className="font-mono text-xs text-center leading-tight"
              style={{ color: "rgba(232,244,248,0.4)" }}
            >
              POST
              <br />
              SYNAPTIC
            </span>
          </div>
        </div>

        <p
          className="synapse-caption font-mono text-xs text-center leading-relaxed mt-10 max-w-xs"
          style={{ opacity: 0, color: "rgba(232,244,248,0.35)" }}
        >
          Neurotransmitters diffuse across the 20 nm gap and bind to receptors
          — triggering the next neuron to fire, or stay silent.
        </p>
      </section>

      {/* ── OUTRO ─────────────────────────────────────────────────────────── */}
      <section
        className="outro-section min-h-screen flex flex-col items-center justify-center px-8 py-28"
        style={{ background: BG }}
      >
        <p
          className="outro-line font-mono text-xs tracking-widest mb-20"
          style={{ color: ACCENT }}
        >
          [ YOUR BRAIN, BY THE NUMBERS ]
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-14 md:gap-20 text-center w-full max-w-3xl">
          <div className="outro-line">
            <div
              className="stat-count font-mono font-bold text-white leading-none"
              style={{ fontSize: "clamp(2.5rem,6vw,4.5rem)" }}
              data-target="86"
            >
              0
            </div>
            <div
              className="font-mono text-xs tracking-widest mt-3"
              style={{ color: ACCENT }}
            >
              BILLION NEURONS
            </div>
            <p
              className="text-sm mt-2"
              style={{ color: "rgba(232,244,248,0.35)" }}
            >
              in your brain
            </p>
          </div>
          <div className="outro-line">
            <div
              className="stat-count font-mono font-bold text-white leading-none"
              style={{ fontSize: "clamp(2.5rem,6vw,4.5rem)" }}
              data-target="100"
            >
              0
            </div>
            <div
              className="font-mono text-xs tracking-widest mt-3"
              style={{ color: ACCENT }}
            >
              TRILLION CONNECTIONS
            </div>
            <p
              className="text-sm mt-2"
              style={{ color: "rgba(232,244,248,0.35)" }}
            >
              more than stars in the Milky Way
            </p>
          </div>
          <div className="outro-line">
            <div
              className="stat-count font-mono font-bold text-white leading-none"
              style={{ fontSize: "clamp(2.5rem,6vw,4.5rem)" }}
              data-target="20"
            >
              0
            </div>
            <div
              className="font-mono text-xs tracking-widest mt-3"
              style={{ color: ACCENT }}
            >
              % OF BODY ENERGY
            </div>
            <p
              className="text-sm mt-2"
              style={{ color: "rgba(232,244,248,0.35)" }}
            >
              consumed by your brain
            </p>
          </div>
        </div>

        <p
          className="outro-line text-lg md:text-xl text-center max-w-lg mt-24 leading-relaxed"
          style={{ color: "rgba(232,244,248,0.45)" }}
        >
          Right now, while you read this, billions of neurons are firing —
          each one a tiny electrical storm, passing messages at lightning speed.
        </p>

        <a
          href="/"
          className="outro-line font-mono text-xs tracking-widest mt-14 no-underline"
          style={{ color: ACCENT }}
        >
          ← BACK TO PORTFOLIO
        </a>
      </section>
    </div>
  );
}
