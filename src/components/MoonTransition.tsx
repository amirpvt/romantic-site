"use client";

import { useEffect, useMemo } from "react";
import { motion, useReducedMotion } from "framer-motion";

type MoonTransitionProps = {
  onComplete: () => void;
};

type MoonParticle = {
  id: number;
  x: number;
  y: number;
  size: number;
  delay: number;
};

export default function MoonTransition({
  onComplete,
}: MoonTransitionProps) {
  const shouldReduceMotion = useReducedMotion();

  const particles = useMemo<MoonParticle[]>(
    () =>
      Array.from({ length: 28 }, (_, id) => ({
        id,
        x: ((id * 43) % 180) - 90,
        y: -35 - ((id * 29) % 120),
        size: 2 + ((id * 11) % 4),
        delay: (id % 8) * 0.035,
      })),
    [],
  );

  useEffect(() => {
    const timeout = window.setTimeout(
      onComplete,
      shouldReduceMotion ? 900 : 3300,
    );

    return () => window.clearTimeout(timeout);
  }, [onComplete, shouldReduceMotion]);

  return (
    <main
      aria-label="Moon transition"
      className="relative min-h-screen overflow-hidden bg-[#050b1c]"
    >
      {/* Deep blue atmosphere */}
      <motion.div
        aria-hidden="true"
        className="absolute inset-0 bg-[radial-gradient(circle_at_50%_74%,rgba(42,133,213,0.3),transparent_25%),linear-gradient(180deg,#020617_0%,#071a3d_65%,#0b2a5b_100%)]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2 }}
      />

      {/* Horizon glow */}
      <motion.div
        aria-hidden="true"
        className="absolute bottom-[13%] left-1/2 h-32 w-[30rem] -translate-x-1/2 rounded-full bg-[#5dbbff]/20 blur-[70px]"
        initial={{ opacity: 0, scale: 0.6 }}
        animate={{
          opacity: [0, 0.6, 0.25],
          scale: [0.6, 1.2, 1],
        }}
        transition={{
          duration: shouldReduceMotion ? 0.5 : 2.1,
          ease: "easeOut",
        }}
      />

      {/* Falling moon */}
      <motion.div
        className="absolute left-1/2 top-1/2 z-10 h-36 w-36 -translate-x-1/2 -translate-y-1/2 sm:h-48 sm:w-48 md:h-56 md:w-56"
        initial={{
          y: "-72vh",
          scale: 0.38,
          rotate: -18,
          opacity: 0,
        }}
        animate={{
          y: shouldReduceMotion
            ? 0
            : ["-72vh", "20vh", "1vh", "5vh", "0vh"],
          scale: shouldReduceMotion ? 1 : [0.38, 0.82, 1.08, 0.97, 1],
          rotate: shouldReduceMotion ? 0 : [-18, 8, -4, 2, 0],
          opacity: 1,
        }}
        transition={{
          duration: shouldReduceMotion ? 0.35 : 2.25,
          ease: [0.22, 1, 0.36, 1],
          times: shouldReduceMotion
            ? undefined
            : [0, 0.52, 0.76, 0.89, 1],
        }}
      >
        {/* Moon aura */}
        <motion.div
          aria-hidden="true"
          className="absolute -inset-10 rounded-full bg-[#69c4ff]/25 blur-3xl"
          animate={
            shouldReduceMotion
              ? undefined
              : {
                  opacity: [0.3, 0.8, 0.45],
                  scale: [0.85, 1.12, 1],
                }
          }
          transition={{
            duration: 2.4,
            ease: "easeInOut",
          }}
        />

        {/* Falling blue heart */}
        <div className="relative flex h-full w-full items-center justify-center">
          {/* Heart aura */}
          <motion.div
            aria-hidden="true"
            className="absolute -inset-12 rounded-full bg-[#49b9ff]/35 blur-3xl"
            animate={
              shouldReduceMotion
                ? undefined
                : {
                    opacity: [0.35, 0.85, 0.45],
                    scale: [0.85, 1.12, 1],
                  }
            }
            transition={{
              duration: 2.4,
              ease: "easeInOut",
            }}
          />

          {/* CSS blue heart */}
          <motion.div
            className="relative h-28 w-28 rotate-45 rounded-[27%] bg-gradient-to-br from-[#d9f5ff] via-[#63c8ff] to-[#1769aa] shadow-[inset_-16px_-18px_24px_rgba(5,48,92,0.42),0_0_42px_rgba(93,187,255,0.8)] sm:h-36 sm:w-36 md:h-44 md:w-44"
            animate={
              shouldReduceMotion
                ? undefined
                : {
                    scale: [1, 1.04, 1],
                  }
            }
            transition={{
              duration: 2.2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            {/* Left lobe */}
            <span className="absolute -left-1/2 top-0 h-full w-full rounded-full bg-gradient-to-br from-[#d9f5ff] via-[#63c8ff] to-[#1769aa]" />

            {/* Right lobe */}
            <span className="absolute left-0 -top-1/2 h-full w-full rounded-full bg-gradient-to-br from-[#e5f8ff] via-[#63c8ff] to-[#1769aa]" />

            {/* Heart reflection */}
            <span className="absolute left-[24%] top-[12%] h-[18%] w-[24%] -rotate-45 rounded-full bg-white/55 blur-[2px]" />

            {/* Heart inner glow */}
            <span className="absolute inset-[18%] -rotate-45 rounded-full bg-[radial-gradient(circle_at_30%_25%,rgba(255,255,255,0.4),transparent_32%)]" />
          </motion.div>
        </div>
      </motion.div>

      {/* Impact glow */}
      <motion.div
        aria-hidden="true"
        className="absolute bottom-[18%] left-1/2 z-20 h-3 w-3 -translate-x-1/2 rounded-full bg-white"
        initial={{ opacity: 0, scale: 0 }}
        animate={{
          opacity: [0, 0, 1, 0],
          scale: [0, 0, 22, 46],
        }}
        transition={{
          duration: shouldReduceMotion ? 0.3 : 1.4,
          delay: shouldReduceMotion ? 0.2 : 1.85,
          ease: "easeOut",
          times: [0, 0.35, 0.58, 1],
        }}
      />

      {/* Blue impact ring */}
      <motion.div
        aria-hidden="true"
        className="absolute bottom-[18%] left-1/2 z-10 h-16 w-16 -translate-x-1/2 rounded-full border border-[#8bd4ff]/70"
        initial={{ opacity: 0, scale: 0.2 }}
        animate={{
          opacity: [0, 0.8, 0],
          scale: [0.2, 5.5, 8],
        }}
        transition={{
          duration: shouldReduceMotion ? 0.3 : 1.2,
          delay: shouldReduceMotion ? 0.2 : 1.9,
          ease: "easeOut",
        }}
      />

      {/* Moon particles */}
      <div
        aria-hidden="true"
        className="absolute bottom-[18%] left-1/2 z-30"
      >
        {particles.map((particle) => (
          <motion.span
            key={particle.id}
            className="absolute rounded-full bg-[#9bddff] shadow-[0_0_9px_3px_rgba(93,187,255,0.7)]"
            style={{
              width: particle.size,
              height: particle.size,
            }}
            initial={{
              x: 0,
              y: 0,
              opacity: 0,
              scale: 0.4,
            }}
            animate={{
              x: particle.x,
              y: particle.y,
              opacity: [0, 1, 0],
              scale: [0.4, 1, 0.2],
            }}
            transition={{
              duration: shouldReduceMotion ? 0.25 : 1.1,
              delay:
                (shouldReduceMotion ? 0.2 : 1.9) + particle.delay,
              ease: [0.22, 1, 0.36, 1],
            }}
          />
        ))}
      </div>

      {/* Final dark fade before next scene */}
      <motion.div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-50 bg-[#071a3d]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{
          duration: shouldReduceMotion ? 0.25 : 0.9,
          delay: shouldReduceMotion ? 0.55 : 2.45,
          ease: "easeInOut",
        }}
      />
    </main>
  );
}