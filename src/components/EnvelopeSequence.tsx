"use client";

import { useEffect, useMemo, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";

type EnvelopeSequenceProps = {
  onComplete: () => void;
};

type AmbientParticle = {
  id: number;
  left: string;
  top: string;
  size: number;
  opacity: number;
  duration: number;
  delay: number;
};

const HERO_BACKGROUND =
  "radial-gradient(circle at 50% 42%, rgba(38,47,78,0.7) 0%, rgba(15,23,42,0.92) 44%, #0a0e1a 100%)";

export default function EnvelopeSequence({
  onComplete,
}: EnvelopeSequenceProps) {
  const shouldReduceMotion = useReducedMotion();
  const [phase, setPhase] = useState<"idle" | "opening" | "transitioning">(
    "idle",
  );

  const particles = useMemo<AmbientParticle[]>(
    () =>
      Array.from({ length: 18 }, (_, id) => ({
        id,
        left: `${(id * 61.7) % 100}%`,
        top: `${(id * 37.9) % 100}%`,
        size: id % 4 === 0 ? 3 : 2,
        opacity: 0.035 + ((id * 13) % 16) / 100,
        duration: 9 + ((id * 17) % 60) / 10,
        delay: ((id * 23) % 50) / 10,
      })),
    [],
  );

  useEffect(() => {
    const timers: number[] = [];

    if (shouldReduceMotion) {
      timers.push(
        window.setTimeout(() => setPhase("opening"), 150),
        window.setTimeout(() => setPhase("transitioning"), 1400),
        window.setTimeout(() => onComplete(), 2200),
      );
    } else {
      timers.push(
        window.setTimeout(() => setPhase("opening"), 4050),
        window.setTimeout(() => setPhase("transitioning"), 8550),
        window.setTimeout(() => onComplete(), 10750),
      );
    }

    return () => timers.forEach(window.clearTimeout);
  }, [onComplete, shouldReduceMotion]);

  const envelopeRiseDuration = shouldReduceMotion ? 0.2 : 2.4;
  const envelopeSettleDuration = shouldReduceMotion ? 0.2 : 0.9;
  const flapDuration = shouldReduceMotion ? 0.3 : 1.8;
  const paperDuration = shouldReduceMotion ? 0.4 : 2.8;

  return (
    <main
      aria-label="Envelope opening sequence"
      className="relative min-h-screen overflow-hidden bg-[#05070c] text-white"
    >
      {/* Atmospheric background */}
      <motion.div
        aria-hidden="true"
        className="absolute inset-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2.5, ease: "easeOut" }}
        style={{ background: HERO_BACKGROUND }}
      />

      <motion.div
        aria-hidden="true"
        className="absolute left-1/2 top-1/2 h-[32rem] w-[32rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#f4c6a8]/[0.035] blur-[120px]"
        animate={
          shouldReduceMotion
            ? undefined
            : {
                opacity: [0.35, 0.6, 0.35],
                scale: [0.95, 1.05, 0.95],
              }
        }
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Subtle ambient particles */}
      <div aria-hidden="true" className="absolute inset-0">
        {particles.map((particle) => (
          <motion.span
            key={particle.id}
            className="absolute rounded-full bg-[#f8d7bd]"
            style={{
              left: particle.left,
              top: particle.top,
              width: particle.size,
              height: particle.size,
              opacity: particle.opacity,
              filter: "blur(0.5px)",
            }}
            animate={
              shouldReduceMotion
                ? undefined
                : {
                    y: [0, -35, 0],
                    x: [0, particle.id % 2 === 0 ? 12 : -12, 0],
                    opacity: [0, particle.opacity, 0],
                  }
            }
            transition={{
              duration: particle.duration,
              delay: particle.delay,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      {/* Cinematic camera layer */}
      <motion.div
        className="relative z-10 flex min-h-screen items-center justify-center"
        animate={{
          scale:
            phase === "transitioning"
              ? shouldReduceMotion
                ? 1
                : 1.65
              : 1,
          y:
            phase === "transitioning"
              ? shouldReduceMotion
                ? 0
                : "8vh"
              : 0,
        }}
        transition={{
          duration: shouldReduceMotion ? 0.4 : 2.5,
          ease: [0.22, 1, 0.36, 1],
        }}
      >
        <motion.div
          className="relative h-[13rem] w-[20rem] sm:h-[16rem] sm:w-[25rem] md:h-[19rem] md:w-[30rem]"
          initial={{
            y: "72vh",
            opacity: 0,
            rotateX: shouldReduceMotion ? 0 : 8,
          }}
          animate={{
            y: 0,
            opacity: 1,
            rotateX: 0,
          }}
          transition={{
            y: {
              duration: envelopeRiseDuration,
              ease: [0.22, 1, 0.36, 1],
            },
            opacity: {
              duration: 1.1,
              ease: "easeOut",
            },
            rotateX: {
              duration: envelopeSettleDuration,
              delay: envelopeRiseDuration - 0.55,
              ease: [0.34, 1.56, 0.64, 1],
            },
          }}
          style={{
            perspective: 1200,
            transformStyle: "preserve-3d",
          }}
        >
          {/* Ground shadow */}
          <motion.div
            aria-hidden="true"
            className="absolute -bottom-10 left-1/2 h-8 w-[75%] -translate-x-1/2 rounded-full bg-black/70 blur-2xl"
            initial={{ opacity: 0, scale: 0.4 }}
            animate={{ opacity: 0.8, scale: 1 }}
            transition={{
              duration: envelopeSettleDuration,
              delay: envelopeRiseDuration * 0.55,
            }}
          />

          {/* Warm light behind the flap */}
          <motion.div
            aria-hidden="true"
            className="absolute left-1/2 top-[12%] z-0 h-[75%] w-[75%] -translate-x-1/2 rounded-full bg-[#ffd5b5]"
            initial={{ opacity: 0, scale: 0.35, filter: "blur(30px)" }}
            animate={{
              opacity: phase === "idle" ? 0 : 0.3,
              scale: phase === "idle" ? 0.35 : 1,
              filter: phase === "idle" ? "blur(30px)" : "blur(48px)",
            }}
            transition={{
              duration: shouldReduceMotion ? 0.3 : 1.8,
              ease: "easeOut",
            }}
          />

          {/* Letter */}
          <motion.div
            className="absolute left-[6%] top-[8%] z-20 h-[92%] w-[88%] overflow-hidden rounded-[3px] bg-[#f7ead8] shadow-[0_8px_35px_rgba(0,0,0,0.3)]"
            initial={{ y: "58%", opacity: 0, rotateX: 5 }}
            animate={{
              y:
                phase === "idle"
                  ? "58%"
                  : phase === "opening"
                    ? "-29%"
                    : "-74%",
              opacity: phase === "idle" ? 0 : 1,
              rotateX: 0,
            }}
            transition={{
              y: {
                duration: paperDuration,
                delay: shouldReduceMotion ? 0 : 1.35,
                ease: [0.22, 1, 0.36, 1],
              },
              opacity: {
                duration: shouldReduceMotion ? 0.2 : 1,
                delay: shouldReduceMotion ? 0 : 1.25,
              },
              rotateX: {
                duration: shouldReduceMotion ? 0.2 : 1.3,
                delay: shouldReduceMotion ? 0 : 1.35,
              },
            }}
          >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_18%,rgba(255,255,255,0.75),transparent_32%),linear-gradient(120deg,rgba(255,255,255,0.18),transparent_45%)]" />

            <div className="relative flex h-full items-center justify-center px-8">
              <div className="h-px w-16 bg-[#b78b72]/30" />
            </div>
          </motion.div>

          {/* Envelope body */}
          <div className="absolute inset-0 z-10 overflow-hidden rounded-[4px] bg-[#e9d7c2] shadow-[0_22px_60px_rgba(0,0,0,0.42)]">
            <div className="absolute inset-0 bg-gradient-to-br from-[#fff6e9]/75 via-[#e9d7c2] to-[#c8ad98]" />

            {/* Left and right inner folds */}
            <div
              className="absolute bottom-0 left-0 h-[78%] w-[53%] origin-bottom-left bg-[#dac1a9]/80"
              style={{
                clipPath: "polygon(0 0, 100% 100%, 0 100%)",
              }}
            />

            <div
              className="absolute bottom-0 right-0 h-[78%] w-[53%] origin-bottom-right bg-[#cfb39b]/80"
              style={{
                clipPath: "polygon(100% 0, 100% 100%, 0 100%)",
              }}
            />

            {/* Lower center fold */}
            <div
              className="absolute bottom-0 left-1/2 h-[76%] w-[80%] -translate-x-1/2 bg-[#e3ccb6]/90"
              style={{
                clipPath: "polygon(0 100%, 50% 0, 100% 100%)",
              }}
            />

            {/* Envelope flap */}
            <motion.div
              className="absolute left-0 top-0 z-30 h-[62%] w-full origin-top"
              initial={{ rotateX: 0 }}
              animate={{
                rotateX: phase === "idle" ? 0 : 180,
              }}
              transition={{
                duration: flapDuration,
                delay: shouldReduceMotion ? 0 : 0.3,
                ease: [0.22, 1, 0.36, 1],
              }}
              style={{
                transformStyle: "preserve-3d",
              }}
            >
              {/* Exterior */}
              <div
                className="absolute inset-0 bg-[#f1dfcb] shadow-[0_7px_16px_rgba(0,0,0,0.18)]"
                style={{
                  clipPath: "polygon(0 0, 100% 0, 50% 100%)",
                  backfaceVisibility: "hidden",
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-[#fff7eb]/70 via-transparent to-[#c6a890]/40" />
              </div>

              {/* Interior */}
              <div
                className="absolute inset-0 rotate-x-180 bg-[#d4b9a0]"
                style={{
                  clipPath: "polygon(0 0, 100% 0, 50% 100%)",
                  backfaceVisibility: "hidden",
                  transform: "rotateX(180deg)",
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-b from-[#b9967b]/40 to-[#ecd8c2]/30" />
              </div>
            </motion.div>
          </div>

          {/* Fine luxury edge highlight */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 z-40 rounded-[4px] border border-white/20"
          />
        </motion.div>
      </motion.div>

      {/* Paper-to-hero transition layer */}
      <motion.div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-30"
        initial={{ opacity: 0 }}
        animate={{
          opacity: phase === "transitioning" ? 1 : 0,
          background:
            phase === "transitioning"
              ? HERO_BACKGROUND
              : "rgba(15,23,42,0)",
        }}
        transition={{
          duration: shouldReduceMotion ? 0.35 : 2.2,
          ease: [0.22, 1, 0.36, 1],
        }}
      />

      {/* Soft vignette */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-40 bg-[radial-gradient(ellipse_at_center,transparent_34%,rgba(0,0,0,0.52)_100%)]"
      />
    </main>
  );
}