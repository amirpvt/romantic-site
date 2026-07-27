"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

type OpeningSequenceProps = {
  onComplete: () => void;
};

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

const STORY_LINES = [
  "Some dates become memories...",
  "Some memories become forever.",
  "Today, 05.05.05, is one of those days.",
  "So before you continue...",
  "Thank you for being the most beautiful chapter of my life. ❤️",
];

export default function OpeningSequence({
  onComplete,
}: OpeningSequenceProps) {
  const shouldReduceMotion = useReducedMotion();

  const [isMounted, setIsMounted] = useState(false);
  const [showIntro, setShowIntro] = useState(false);
  const [showDate, setShowDate] = useState(false);
  const [dateStage, setDateStage] = useState(0);
  const [showButton, setShowButton] = useState(false);
  const [isLeaving, setIsLeaving] = useState(false);

  const prefersReducedMotion =
    isMounted && shouldReduceMotion === true;

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
    setIsMounted(true);
  }, []);

  useEffect(() => {
    const introTimer = window.setTimeout(() => {
      setShowIntro(true);
    }, 5000);

    const dateTimer = window.setTimeout(() => {
      setShowDate(true);
    }, 15000);

    const dateStageTimers = [
      window.setTimeout(() => setDateStage(1), 15600),
      window.setTimeout(() => setDateStage(2), 16200),
      window.setTimeout(() => setDateStage(3), 16800),
      window.setTimeout(() => setDateStage(4), 17400),
      window.setTimeout(() => setDateStage(5), 18000),
    ];

    const buttonTimer = window.setTimeout(() => {
      setShowButton(true);
    }, 21000);

    return () => {
      window.clearTimeout(introTimer);
      window.clearTimeout(dateTimer);
      window.clearTimeout(buttonTimer);

      dateStageTimers.forEach((timer) => {
        window.clearTimeout(timer);
      });
    };
  }, []);

  const handleBeginJourney = () => {
    if (isLeaving) return;

    setIsLeaving(true);

    window.setTimeout(
      () => {
        onComplete();
      },
      prefersReducedMotion ? 150 : 1000,
    );
  };

  return (
    <main
      aria-label="Opening sequence"
      className="relative min-h-screen overflow-hidden bg-black font-[Poppins,sans-serif] text-white"
    >
      {/* Personal background image */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0 overflow-hidden"
      >
        <motion.div
          initial={{
            opacity: 0,
            scale: prefersReducedMotion ? 1 : 1.04,
          }}
          animate={{
            opacity: 1,
            scale: 1,
          }}
          transition={{
            duration: prefersReducedMotion ? 0.4 : 2.5,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="absolute inset-0"
        >
          <Image
            src="/hero-background.png"
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover object-center"
          />

          {/* Cinematic dark overlay */}
          <div className="absolute inset-0 bg-[#07111f]/65" />

          {/* Navy color grading */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#0f172a]/55 via-[#0f172a]/35 to-[#020617]/85" />

          {/* Center glow */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_43%,rgba(93,187,255,0.12),transparent_42%)]" />
        </motion.div>
      </div>

      {/* Additional ambient glow */}
      <motion.div
        aria-hidden="true"
        className="absolute left-1/2 top-[42%] z-[1] h-[34rem] w-[34rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#f472b6]/[0.025] blur-[110px]"
        initial={{
          opacity: 0,
          scale: 0.8,
        }}
        animate={{
          opacity: 1,
          scale: 1,
        }}
        transition={{
          duration: 4,
          ease: "easeOut",
        }}
      />

      {/* Shooting star */}
      {isMounted && !prefersReducedMotion && (
        <motion.div
          aria-hidden="true"
          className="pointer-events-none absolute right-[-8%] top-[14%] z-10 h-px w-44 rotate-[155deg] origin-right opacity-0"
          initial={{
            x: 0,
            opacity: 0,
          }}
          animate={{
            x: "-125vw",
            opacity: [0, 0.9, 0.8, 0],
          }}
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
      <div aria-hidden="true" className="absolute inset-0 z-[2]">
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
              prefersReducedMotion
                ? undefined
                : {
                    opacity: [
                      star.opacity * 0.45,
                      star.opacity,
                      star.opacity * 0.5,
                    ],
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
      <div aria-hidden="true" className="absolute inset-0 z-[3]">
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
              prefersReducedMotion
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
            {/* Story text */}
            {showIntro && !showDate && (
              <motion.div
                key="story-text"
                className="flex max-w-3xl flex-col items-center text-center"
                initial={{
                  opacity: 0,
                }}
                animate={{
                  opacity: 1,
                }}
                exit={{
                  opacity: 0,
                  y: prefersReducedMotion ? 0 : -14,
                }}
                transition={{
                  duration: 0.9,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                {STORY_LINES.map((line, index) => (
                  <motion.p
                    key={`${line}-${index}`}
                    initial={{
                      opacity: 0,
                      y: prefersReducedMotion ? 0 : 12,
                      filter: "blur(6px)",
                    }}
                    animate={{
                      opacity: 1,
                      y: 0,
                      filter: "blur(0px)",
                    }}
                    transition={{
                      duration: 0.9,
                      delay: prefersReducedMotion ? 0 : index * 0.8,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    className={
                      index === STORY_LINES.length - 1
                        ? "mt-6 text-xl font-medium leading-relaxed tracking-wide text-white sm:text-2xl md:text-3xl"
                        : "text-lg font-light leading-relaxed tracking-wide text-white/90 sm:text-xl md:text-2xl"
                    }
                  >
                    {line}
                  </motion.p>
                ))}
              </motion.div>
            )}

            {/* Date */}
            {showDate && !showButton && (
              <motion.div
                key="date"
                initial={{
                  opacity: 0,
                  y: prefersReducedMotion ? 0 : 14,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                transition={{
                  duration: 1.2,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="relative"
              >
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
                        initial={{
                          opacity: 0,
                          y: 18,
                          filter: "blur(8px)",
                        }}
                        animate={{
                          opacity: 1,
                          y: 0,
                          filter: "blur(0px)",
                        }}
                        transition={{ duration: 0.7 }}
                      >
                        05
                      </motion.span>
                    )}

                    {dateStage >= 4 && (
                      <motion.span
                        key="separator-one"
                        initial={{
                          opacity: 0,
                          scale: 0.4,
                          filter: "blur(5px)",
                        }}
                        animate={{
                          opacity: 1,
                          scale: 1,
                          filter: "blur(0px)",
                        }}
                        transition={{
                          duration: 0.6,
                        }}
                        className="mx-3 text-[#ff4d6d] sm:mx-5"
                      >
                        •
                      </motion.span>
                    )}

                    {dateStage >= 2 && (
                      <motion.span
                        key="date-two"
                        initial={{
                          opacity: 0,
                          y: 18,
                          filter: "blur(8px)",
                        }}
                        animate={{
                          opacity: 1,
                          y: 0,
                          filter: "blur(0px)",
                        }}
                        transition={{ duration: 0.7 }}
                      >
                        05
                      </motion.span>
                    )}

                    {dateStage >= 4 && (
                      <motion.span
                        key="separator-two"
                        initial={{
                          opacity: 0,
                          scale: 0.4,
                          filter: "blur(5px)",
                        }}
                        animate={{
                          opacity: 1,
                          scale: 1,
                          filter: "blur(0px)",
                        }}
                        transition={{
                          duration: 0.6,
                          delay: 0.12,
                        }}
                        className="mx-3 text-[#ff4d6d] sm:mx-5"
                      >
                        •
                      </motion.span>
                    )}

                    {dateStage >= 3 && (
                      <motion.span
                        key="date-three"
                        initial={{
                          opacity: 0,
                          y: 18,
                          filter: "blur(8px)",
                        }}
                        animate={{
                          opacity: 1,
                          y: 0,
                          filter: "blur(0px)",
                        }}
                        transition={{ duration: 0.7 }}
                      >
                        05
                      </motion.span>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            )}

            {/* Journey button */}
            {showButton && (
              <motion.div
                key="button"
                initial={{
                  opacity: 0,
                  y: prefersReducedMotion ? 0 : 14,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                transition={{
                  duration: 1.2,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="flex flex-col items-center gap-5"
              >
                <p className="text-sm font-light tracking-[0.3em] text-white/60 uppercase">
                  Our story begins here
                </p>

                <motion.button
                  type="button"
                  onClick={handleBeginJourney}
                  disabled={isLeaving}
                  initial="rest"
                  whileHover="hover"
                  whileTap="tap"
                  variants={{
                    rest: {
                      y: 0,
                      scale: 1,
                    },
                    hover: {
                      y: -5,
                      scale: 1.025,
                    },
                    tap: {
                      y: 0,
                      scale: 0.965,
                    },
                  }}
                  className="group relative isolate overflow-visible rounded-full border border-white/25 bg-white/[0.1] px-8 py-4 text-base font-medium tracking-wide text-white shadow-[0_0_28px_rgba(255,77,109,0.24),inset_0_1px_0_rgba(255,255,255,0.2)] backdrop-blur-xl transition-colors duration-700 hover:border-[#f472b6]/60 hover:bg-[#ff4d6d]/[0.16] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#f472b6] focus-visible:ring-offset-4 focus-visible:ring-offset-[#0f172a] disabled:pointer-events-none sm:px-10 sm:py-5 sm:text-lg"
                >
                  {/* Breathing glow */}
                  <motion.span
                    aria-hidden="true"
                    className="pointer-events-none absolute -inset-3 -z-20 rounded-full bg-[#ff4d6d]/25 blur-2xl"
                    variants={{
                      rest: {
                        opacity: 0.35,
                        scale: 0.94,
                      },
                      hover: {
                        opacity: 0.78,
                        scale: 1.12,
                      },
                      tap: {
                        opacity: 0.5,
                        scale: 0.98,
                      },
                    }}
                  />

                  {/* Outer ring */}
                  <motion.span
                    aria-hidden="true"
                    className="pointer-events-none absolute -inset-1 -z-10 rounded-full border border-[#f472b6]/0"
                    variants={{
                      rest: {
                        opacity: 0,
                        scale: 0.96,
                      },
                      hover: {
                        opacity: 1,
                        scale: 1.08,
                        borderColor: "rgba(244,114,182,0.32)",
                      },
                      tap: {
                        opacity: 0,
                        scale: 0.98,
                      },
                    }}
                  />

                  {/* Moving heart */}
                  <motion.span
                    aria-hidden="true"
                    className="pointer-events-none absolute left-0 top-1/2 z-10 -translate-y-1/2 text-xl drop-shadow-[0_0_10px_rgba(255,77,109,0.9)] sm:text-2xl"
                    variants={{
                      rest: {
                        x: -42,
                        opacity: 0,
                        scale: 0.65,
                        rotate: -18,
                      },
                      hover: {
                        x: 315,
                        opacity: [0, 1, 1, 0],
                        scale: [0.65, 1, 1.12, 0.7],
                        rotate: [-18, 0, 12, 25],
                        transition: {
                          duration: 1.25,
                          ease: [0.22, 1, 0.36, 1],
                          opacity: {
                            duration: 1.25,
                            times: [0, 0.18, 0.78, 1],
                          },
                        },
                      },
                    }}
                  >
                    ❤️
                  </motion.span>

                  {/* Button content */}
                  <span className="relative z-20 flex items-center justify-center gap-2">
                    <span>Begin Our Journey</span>

                    <motion.span
                      aria-hidden="true"
                      className="inline-block origin-center"
                      variants={{
                        rest: {
                          scale: 1,
                          rotate: 0,
                        },
                        hover: {
                          scale: 1.2,
                          rotate: [0, -8, 8, 0],
                        },
                        tap: {
                          scale: 0.92,
                          rotate: 0,
                        },
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

      {/* Exit transition */}
      <AnimatePresence>
        {isLeaving && (
          <motion.div
            aria-hidden="true"
            className="fixed inset-0 z-50 bg-black"
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: 1,
            }}
            transition={{
              duration: prefersReducedMotion ? 0.15 : 1,
              ease: "easeInOut",
            }}
          >
            <motion.div
              className="absolute left-1/2 top-1/2"
              initial={{
                opacity: 1,
                scale: 1,
              }}
              animate={{
                opacity: 0,
                scale: 0.35,
              }}
              transition={{
                duration: prefersReducedMotion ? 0.15 : 0.45,
                ease: "easeOut",
              }}
            >
              <span className="text-2xl">❤️</span>
            </motion.div>

            {!prefersReducedMotion &&
              exitParticles.map((particle) => (
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

      {/* Vignette */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-20 bg-[radial-gradient(ellipse_at_center,transparent_35%,rgba(0,0,0,0.42)_100%)]"
      />
    </main>
  );
}