"use client";

import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";

const STORY_LINE = "Every beautiful story has a beginning...";
const PERSIAN_STORY_LINE = "هر داستان زیبایی، یک آغاز دارد...";

type Star = {
  id: number;
  left: string;
  top: string;
  size: number;
  opacity: number;
  duration: number;
  delay: number;
};

type Particle = {
  id: number;
  left: string;
  top: string;
  size: number;
  opacity: number;
  duration: number;
  delay: number;
};

export default function OpeningSequence() {
  const prefersReducedMotion = useReducedMotion();

  const [shouldReduceMotion, setShouldReduceMotion] = useState(true);

  useEffect(() => {
    setShouldReduceMotion(!!prefersReducedMotion);
  }, [prefersReducedMotion]);

  const [showIntro, setShowIntro] = useState(false);
  const [showPersianSubtitle, setShowPersianSubtitle] = useState(false);
  const [showDate, setShowDate] = useState(false);
  const [dateStage, setDateStage] = useState(0);
  const [showButton, setShowButton] = useState(false);
  const [isLeaving, setIsLeaving] = useState(false);

  const words = useMemo(() => STORY_LINE.split(" "), []);

  const stars = useMemo<Star[]>(
    () =>
      Array.from({ length: 90 }, (_, id) => ({
        id,
        left: `${(id * 47.31) % 100}%`,
        top: `${(id * 71.19) % 100}%`,
        size: id % 11 === 0 ? 2 : id % 4 === 0 ? 1.5 : 1,
        opacity: 0.18 + ((id * 13) % 55) / 100,
        duration: 2.8 + ((id * 17) % 40) / 10,
        delay: ((id * 23) % 30) / 10,
      })),
    [],
  );

  const particles = useMemo<Particle[]>(
    () =>
      Array.from({ length: 16 }, (_, id) => ({
        id,
        left: `${(id * 63.7) % 100}%`,
        top: `${85 - ((id * 31.4) % 75)}%`,
        size: id % 3 === 0 ? 3 : 2,
        opacity: 0.08 + ((id * 9) % 16) / 100,
        duration: 8 + ((id * 11) % 60) / 10,
        delay: ((id * 19) % 50) / 10,
      })),
    [],
  );

  const exitParticles = useMemo(
    () =>
      Array.from({ length: 24 }, (_, id) => ({
        id,
        x: ((id * 43) % 160) - 80,
        y: -20 - ((id * 29) % 100),
        scale: 0.5 + ((id * 17) % 100) / 100,
        delay: (id % 8) * 0.025,
      })),
    [],
  );

  useEffect(() => {
    // The shooting star completes at approximately 2.2 seconds.
    const introTimer = window.setTimeout(
      () => setShowIntro(true),
      shouldReduceMotion ? 0 : 2200,
    );

    const persianTimer = window.setTimeout(
      () => setShowPersianSubtitle(true),
      shouldReduceMotion ? 500 : 3900,
    );

    const dateTimer = window.setTimeout(
      () => setShowDate(true),
      shouldReduceMotion ? 1000 : 5600,
    );

    const dateStageTimers = [
      window.setTimeout(() => setDateStage(1), shouldReduceMotion ? 1200 : 5900),
      window.setTimeout(() => setDateStage(2), shouldReduceMotion ? 1400 : 6200),
      window.setTimeout(() => setDateStage(3), shouldReduceMotion ? 1600 : 6500),
      window.setTimeout(() => setDateStage(4), shouldReduceMotion ? 1800 : 6800),
      window.setTimeout(() => setDateStage(5), shouldReduceMotion ? 2000 : 7100),
    ];

    const buttonTimer = window.setTimeout(
      () => setShowButton(true),
      shouldReduceMotion ? 2300 : 7700,
    );

    return () => {
      window.clearTimeout(introTimer);
      window.clearTimeout(persianTimer);
      window.clearTimeout(dateTimer);
      window.clearTimeout(buttonTimer);
      dateStageTimers.forEach(window.clearTimeout);
    };
  }, [shouldReduceMotion]);

  const fadeUp = {
    initial: { opacity: 0, y: shouldReduceMotion ? 0 : 14 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 1.2, ease: [0.22, 1, 0.36, 1] },
  };

  const handleBeginJourney = () => {
    setIsLeaving(true);
  };

  return (
    <main
      aria-label="Opening sequence"
      className="relative min-h-screen overflow-hidden bg-black font-[Poppins,sans-serif] text-white"
    >
      {/* Base atmosphere */}
      <motion.div
        aria-hidden="true"
        className="absolute inset-0 bg-[radial-gradient(circle_at_50%_45%,rgba(38,47,78,0.7)_0%,rgba(15,23,42,0.9)_42%,#0a0e1a_100%)]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 3, ease: "easeOut" }}
      />

      {/* Ambient pink glow */}
      <motion.div
        aria-hidden="true"
        className="absolute left-1/2 top-[42%] h-[34rem] w-[34rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#f472b6]/[0.045] blur-[110px]"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 4, ease: "easeOut" }}
      />

      {/* Shooting star */}
      {!shouldReduceMotion && (
        <motion.div
          aria-hidden="true"
          className="pointer-events-none absolute right-[-8%] top-[14%] z-10 h-px w-44 rotate-[155deg] origin-right opacity-0"
          initial={{ x: 0, opacity: 0 }}
          animate={{ x: "-125vw", opacity: [0, 0.9, 0.8, 0] }}
          transition={{
            delay: 0.35,
            duration: 1.85,
            ease: [0.45, 0, 0.55, 1],
            times: [0, 0.12, 0.72, 1],
          }}
        >
          <span className="absolute inset-0 bg-gradient-to-l from-white via-[#f472b6] to-transparent shadow-[0_0_14px_4px_rgba(244,114,182,0.45)]" />
          <span className="absolute -right-1 -top-1 h-2 w-2 rounded-full bg-white shadow-[0_0_12px_5px_rgba(255,255,255,0.8)]" />
        </motion.div>
      )}

      {/* Stars */}
      <div aria-hidden="true" className="absolute inset-0">
        {stars.map((star) => (
          <motion.span
            key={star.id}
            className="absolute rounded-full bg-white"
            style={{
              left: star.left,
              top: star.top,
              width: star.size,
              height: star.size,
              opacity: star.opacity,
              boxShadow:
                star.size > 1
                  ? "0 0 8px rgba(255,255,255,0.6)"
                  : undefined,
            }}
            animate={
              shouldReduceMotion
                ? undefined
                : {
                    opacity: [star.opacity * 0.45, star.opacity, star.opacity * 0.5],
                    scale: [0.8, 1.2, 0.8],
                  }
            }
            transition={{
              duration: star.duration,
              delay: star.delay,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      {/* Floating particles */}
      <div aria-hidden="true" className="absolute inset-0">
        {particles.map((particle) => (
          <motion.span
            key={particle.id}
            className="absolute rounded-full bg-[#f472b6]"
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
                    y: [0, -80, -150],
                    x: [0, particle.id % 2 === 0 ? 18 : -18, 0],
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

      {/* Main content */}
      <section className="relative z-10 flex min-h-screen items-center justify-center px-6">
        <div className="flex w-full max-w-4xl flex-col items-center text-center">
          <AnimatePresence mode="wait">
            {showIntro && !showDate && (
              <motion.div
                key="intro"
                className="flex flex-col items-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, y: shouldReduceMotion ? 0 : -10 }}
                transition={{ duration: 0.8 }}
              >
                <p className="flex max-w-2xl flex-wrap justify-center gap-x-[0.35em] gap-y-1 text-xl font-light leading-relaxed tracking-wide text-white/90 sm:text-2xl md:text-3xl">
                  {words.map((word, index) => (
                    <motion.span
                      key={`${word}-${index}`}
                      initial={{
                        opacity: 0,
                        y: shouldReduceMotion ? 0 : 8,
                        filter: "blur(5px)",
                      }}
                      animate={{
                        opacity: 1,
                        y: 0,
                        filter: "blur(0px)",
                      }}
                      transition={{
                        duration: 0.65,
                        delay: shouldReduceMotion ? 0 : index * 0.16,
                        ease: [0.22, 1, 0.36, 1],
                      }}
                    >
                      {word}
                    </motion.span>
                  ))}
                </p>

                <AnimatePresence>
                  {showPersianSubtitle && (
                    <motion.p
                      initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{
                        duration: 1,
                        ease: [0.22, 1, 0.36, 1],
                      }}
                      className="mt-5 font-[Vazirmatn,sans-serif] text-base font-light tracking-wide text-[#f9a8d4]/75 sm:text-lg"
                      dir="rtl"
                    >
                      {PERSIAN_STORY_LINE}
                    </motion.p>
                  )}
                </AnimatePresence>
              </motion.div>
            )}

            {showDate && !showButton && (
              <motion.div key="date" {...fadeUp} className="relative">
                <div
                  aria-hidden="true"
                  className="absolute inset-0 -z-10 scale-150 rounded-full bg-[#ff4d6d]/20 blur-[70px]"
                />

                <div
                  aria-label="05 05 05"
                  className="flex items-center justify-center text-5xl font-light tracking-[0.18em] text-white sm:text-7xl md:text-8xl"
                >
                  <AnimatePresence mode="popLayout">
                    {dateStage >= 1 && (
                      <motion.span
                        key="date-one"
                        initial={{ opacity: 0, y: 18, filter: "blur(8px)" }}
                        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                        transition={{ duration: 0.7 }}
                      >
                        05
                      </motion.span>
                    )}

                    {dateStage >= 4 && (
                      <motion.span
                        key="separator-one"
                        initial={{ opacity: 0, scale: 0.4, filter: "blur(5px)" }}
                        animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                        transition={{ duration: 0.6 }}
                        className="mx-3 text-[#ff4d6d] sm:mx-5"
                      >
                        •
                      </motion.span>
                    )}

                    {dateStage >= 2 && (
                      <motion.span
                        key="date-two"
                        initial={{ opacity: 0, y: 18, filter: "blur(8px)" }}
                        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                        transition={{ duration: 0.7 }}
                      >
                        05
                      </motion.span>
                    )}

                    {dateStage >= 4 && (
                      <motion.span
                        key="separator-two"
                        initial={{ opacity: 0, scale: 0.4, filter: "blur(5px)" }}
                        animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                        transition={{ duration: 0.6, delay: 0.12 }}
                        className="mx-3 text-[#ff4d6d] sm:mx-5"
                      >
                        •
                      </motion.span>
                    )}

                    {dateStage >= 3 && (
                      <motion.span
                        key="date-three"
                        initial={{ opacity: 0, y: 18, filter: "blur(8px)" }}
                        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                        transition={{ duration: 0.7 }}
                      >
                        05
                      </motion.span>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            )}

            {showButton && (
              <motion.div
                key="button"
                {...fadeUp}
                className="flex flex-col items-center gap-5"
              >
                <p className="text-sm font-light tracking-[0.3em] text-white/45 uppercase">
                  Our story begins here
                </p>

                <motion.button
                  type="button"
                  onClick={handleBeginJourney}
                  whileHover={
                    shouldReduceMotion
                      ? undefined
                      : {
                          y: -4,
                          scale: 1.025,
                          boxShadow:
                            "0 0 42px rgba(255,77,109,0.32), inset 0 1px 0 rgba(255,255,255,0.22)",
                        }
                  }
                  whileTap={
                    shouldReduceMotion
                      ? undefined
                      : {
                          scale: 0.97,
                          y: 0,
                        }
                  }
                  className="group relative overflow-visible rounded-full border border-white/20 bg-white/[0.08] px-8 py-4 text-base font-medium tracking-wide text-white shadow-[0_0_28px_rgba(255,77,109,0.2)] backdrop-blur-xl transition-colors duration-500 hover:bg-[#ff4d6d]/20 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#f472b6] focus-visible:ring-offset-4 focus-visible:ring-offset-[#0f172a] sm:px-10 sm:py-5 sm:text-lg"
                >
                  {/* Idle breathing glow */}
                  <motion.span
                    aria-hidden="true"
                    className="pointer-events-none absolute -inset-2 -z-10 rounded-full bg-[#ff4d6d]/20 blur-xl"
                    animate={
                      shouldReduceMotion
                        ? undefined
                        : {
                            opacity: [0.3, 0.6, 0.3],
                            scale: [0.96, 1.04, 0.96],
                          }
                    }
                    transition={{
                      duration: 4.5,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  />

                  <span
                    aria-hidden="true"
                    className="absolute inset-0 -translate-x-full overflow-hidden rounded-full bg-gradient-to-r from-transparent via-white/15 to-transparent transition-transform duration-700 group-hover:translate-x-full"
                  />

                  <span className="relative">
                    Begin Our Journey{" "}
                    <motion.span
                      className="relative inline-block"
                      animate={
                        shouldReduceMotion
                          ? undefined
                          : {
                              opacity: [1, 0.75, 1],
                            }
                      }
                      transition={{
                        duration: 3.5,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                    >
                      ❤️
                    </motion.span>
                  </span>
                </motion.button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* Exit transition and dissolving heart particles */}
      <AnimatePresence>
        {isLeaving && (
          <motion.div
            aria-hidden="true"
            className="fixed inset-0 z-50 bg-black"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, ease: "easeInOut" }}
          >
            <motion.div
              className="absolute left-1/2 top-1/2"
              initial={{ opacity: 1, scale: 1 }}
              animate={{ opacity: 0, scale: 0.35 }}
              transition={{ duration: 0.45, ease: "easeOut" }}
            >
              <span className="text-2xl">❤️</span>
            </motion.div>

            {exitParticles.map((particle) => (
              <motion.span
                key={particle.id}
                className="absolute left-1/2 top-1/2 h-1.5 w-1.5 rounded-full bg-[#f472b6] shadow-[0_0_10px_3px_rgba(244,114,182,0.8)]"
                initial={{
                  x: 0,
                  y: 0,
                  opacity: 1,
                  scale: 0.4,
                }}
                animate={{
                  x: particle.x,
                  y: particle.y,
                  opacity: 0,
                  scale: particle.scale,
                }}
                transition={{
                  duration: 0.75,
                  delay: particle.delay,
                  ease: [0.22, 1, 0.36, 1],
                }}
              />
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Soft vignette */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-20 bg-[radial-gradient(ellipse_at_center,transparent_35%,rgba(0,0,0,0.42)_100%)]"
      />
    </main>
  );
}