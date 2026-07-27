"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useReducedMotion } from "framer-motion";

type QuestionSequenceProps = {
  onComplete: () => void;
};

type Heart = {
  id: number;
  left: string;
  size: number;
  duration: number;
  delay: number;
  opacity: number;
};

const questions = [
  "✨ Ready for a little surprise?",
  "🌹 Do you promise to stay until the end?",
  "💌 Do you believe someone loves you more than words can say?",
  "🌙 Are you ready to see what's inside my heart?",
  "Will you let me keep loving you forever?",
];

export default function QuestionSequence({
  onComplete,
}: QuestionSequenceProps) {
  const shouldReduceMotion = useReducedMotion();

  const [questionIndex, setQuestionIndex] = useState(0);
  const [isAdvancing, setIsAdvancing] = useState(false);
  const [showFinalModal, setShowFinalModal] = useState(false);

  const [noPosition, setNoPosition] = useState({
    x: 0,
    y: 0,
    rotate: 0,
  });

  const hearts = useMemo<Heart[]>(
    () =>
      Array.from({ length: 38 }, (_, id) => ({
        id,
        left: `${(id * 29.7) % 100}%`,
        size: 16 + ((id * 17) % 28),
        duration: 8 + ((id * 13) % 60) / 10,
        delay: ((id * 19) % 60) / 10,
        opacity: 0.12 + ((id * 11) % 24) / 100,
      })),
    [],
  );

  const isFinalQuestion = questionIndex === questions.length - 1;

  const moveNoButton = () => {
    if (isFinalQuestion || isAdvancing) return;

    const x = Math.floor(Math.random() * 260) - 130;
    const y = Math.floor(Math.random() * 180) - 90;
    const rotate = Math.floor(Math.random() * 30) - 15;

    setNoPosition({
      x,
      y,
      rotate,
    });
  };

  const handleYes = () => {
    if (isAdvancing) return;

    setIsAdvancing(true);

    window.setTimeout(() => {
      if (!isFinalQuestion) {
        setQuestionIndex((current) => current + 1);

        setNoPosition({
          x: 0,
          y: 0,
          rotate: 0,
        });

        setIsAdvancing(false);
      } else {
        onComplete();
      }
    }, shouldReduceMotion ? 100 : 650);
  };

  const handleFinalNo = () => {
    if (!isFinalQuestion) return;

    setShowFinalModal(true);
  };

  const closeFinalModal = () => {
    setShowFinalModal(false);
  };

  return (
    <main
      aria-label="Romantic question sequence"
      className="relative min-h-screen overflow-hidden bg-[#071a3d] text-white"
    >
      {/* Full-screen blue flowers background */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0 overflow-hidden"
      >
        <motion.div
          initial={{
            opacity: 0,
            scale: shouldReduceMotion ? 1 : 1.05,
          }}
          animate={{
            opacity: 1,
            scale: 1,
          }}
          transition={{
            duration: shouldReduceMotion ? 0.3 : 1.8,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="absolute inset-0"
        >
          <Image
            src="/blue-flowers2.png"
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover object-center opacity-70"
          />

          <div className="absolute inset-0 bg-[#071a3d]/45" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#071a3d]/30 via-[#071a3d]/10 to-[#071a3d]/90" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_38%,rgba(93,187,255,0.2),transparent_44%)]" />
        </motion.div>
      </div>

      {/* Blue atmospheric background */}
      <div
        aria-hidden="true"
        className="absolute inset-0 z-[1] bg-[radial-gradient(circle_at_50%_38%,rgba(93,187,255,0.18),transparent_34%),linear-gradient(145deg,rgba(7,26,61,0.35),rgba(6,21,47,0.55))]"
      />

      {/* Floating hearts */}
      <div aria-hidden="true" className="absolute inset-0 z-[2]">
        {hearts.map((heart) => (
          <motion.span
            key={heart.id}
            className="absolute bottom-[-8%] select-none text-[#62bdff]"
            style={{
              left: heart.left,
              fontSize: heart.size,
              opacity: heart.opacity,
              filter: "drop-shadow(0 0 8px rgba(93,187,255,0.45))",
            }}
            animate={
              shouldReduceMotion
                ? undefined
                : {
                    y: [0, "-115vh"],
                    x: [0, heart.id % 2 === 0 ? 18 : -18, 0],
                    rotate: [0, heart.id % 2 === 0 ? 12 : -12, 0],
                    opacity: [0, heart.opacity, 0],
                  }
            }
            transition={{
              duration: heart.duration,
              delay: heart.delay,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            ♥
          </motion.span>
        ))}
      </div>

      {/* Main content */}
      <section className="relative z-10 flex min-h-screen items-center justify-center px-5 py-12">
        <div className="flex w-full max-w-5xl flex-col items-center">
          {/* Characters */}
          <div className="-translate-y-6 mb-[-1.5rem] flex w-full max-w-2xl items-end justify-center sm:-translate-y-10 sm:mb-[-2.5rem]">
            <motion.div
              initial={{ opacity: 0, x: -35, y: 20 }}
              animate={{
                opacity: 1,
                x: 0,
                y: shouldReduceMotion ? 0 : [0, -5, 0],
              }}
              transition={{
                opacity: { duration: 1 },
                x: {
                  duration: 1,
                  ease: [0.22, 1, 0.36, 1],
                },
                y: {
                  duration: 4.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                },
              }}
              className="relative z-10 h-44 w-44 sm:h-60 sm:w-60"
            >
              <Image
                src="/characters/sullivan.png"
                alt="Sullivan"
                fill
                priority
                sizes="(max-width: 640px) 176px, 240px"
                className="object-contain drop-shadow-[0_18px_22px_rgba(0,0,0,0.34)]"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 35, y: 20 }}
              animate={{
                opacity: 1,
                x: 0,
                y: shouldReduceMotion ? 0 : [0, -7, 0],
              }}
              transition={{
                opacity: {
                  duration: 1,
                  delay: 0.15,
                },
                x: {
                  duration: 1,
                  delay: 0.15,
                  ease: [0.22, 1, 0.36, 1],
                },
                y: {
                  duration: 4,
                  delay: 0.3,
                  repeat: Infinity,
                  ease: "easeInOut",
                },
              }}
              className="relative z-20 -ml-10 h-32 w-32 sm:-ml-14 sm:h-44 sm:w-44"
            >
              <Image
                src="/characters/boo.png"
                alt="Boo"
                fill
                priority
                sizes="(max-width: 640px) 128px, 176px"
                className="object-contain drop-shadow-[0_18px_22px_rgba(0,0,0,0.34)]"
              />
            </motion.div>
          </div>

          {/* Question card */}
          <motion.div
            initial={{
              opacity: 0,
              y: 24,
              scale: 0.97,
            }}
            animate={{
              opacity: 1,
              y: 0,
              scale: 1,
            }}
            transition={{
              duration: 1,
              delay: 0.25,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="relative z-20 w-full max-w-xl rounded-[2rem] border border-white/20 bg-[#071a3d]/35 px-6 py-9 text-center shadow-[0_24px_80px_rgba(0,0,0,0.34)] backdrop-blur-2xl sm:px-10 sm:py-12"
          >
            <div
              aria-hidden="true"
              className="absolute inset-x-12 top-0 h-px bg-gradient-to-r from-transparent via-[#9bdcff]/70 to-transparent"
            />

            <p className="mb-4 text-xs font-medium tracking-[0.35em] text-[#a9ddff]/80 uppercase">
              Question {questionIndex + 1} of {questions.length}
            </p>

            <AnimatePresence mode="wait">
              <motion.h1
                key={questions[questionIndex]}
                initial={{
                  opacity: 0,
                  y: 12,
                  filter: "blur(5px)",
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                  filter: "blur(0px)",
                }}
                transition={{
                  duration: shouldReduceMotion ? 0.2 : 0.75,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="min-h-[5.5rem] text-2xl font-light leading-relaxed tracking-wide text-white sm:text-3xl"
              >
                {questions[questionIndex]}
              </motion.h1>
            </AnimatePresence>

            <div className="relative mt-9 flex min-h-14 items-center justify-center gap-4">
              {/* Yes button */}
              <motion.button
                type="button"
                onClick={handleYes}
                disabled={isAdvancing}
                whileHover={
                  shouldReduceMotion
                    ? undefined
                    : {
                        y: -3,
                        scale: 1.04,
                      }
                }
                whileTap={
                  shouldReduceMotion
                    ? undefined
                    : {
                        scale: 0.96,
                      }
                }
                className="rounded-full border border-[#b9e7ff]/50 bg-[#5dbbff]/20 px-7 py-3 text-sm font-medium text-white shadow-[0_0_24px_rgba(93,187,255,0.2)] transition-colors duration-300 hover:bg-[#5dbbff]/35 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#b9e7ff] disabled:opacity-60"
              >
                {isFinalQuestion ? "Yes ❤️" : "Yes 💖"}
              </motion.button>

              {/* No button */}
              <motion.button
                type="button"
                onPointerEnter={
                  isFinalQuestion ? undefined : moveNoButton
                }
                onFocus={isFinalQuestion ? undefined : moveNoButton}
                onTouchStart={
                  isFinalQuestion ? undefined : moveNoButton
                }
                onClick={isFinalQuestion ? handleFinalNo : undefined}
                animate={isFinalQuestion ? undefined : noPosition}
                transition={{
                  type: "spring",
                  stiffness: 520,
                  damping: 17,
                  mass: 0.5,
                }}
                className="relative z-30 rounded-full border border-white/20 bg-white/[0.08] px-7 py-3 text-sm font-medium text-white/85 shadow-[0_0_18px_rgba(93,187,255,0.1)] backdrop-blur-md transition-colors duration-300 hover:bg-white/[0.14] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#b9e7ff]"
              >
                {isFinalQuestion ? "No 💔" : "No 🙈"}
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Emotional final modal */}
      <AnimatePresence>
        {showFinalModal && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-[#020617]/75 px-5 backdrop-blur-xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              initial={{
                opacity: 0,
                y: 24,
                scale: 0.92,
              }}
              animate={{
                opacity: 1,
                y: 0,
                scale: 1,
              }}
              exit={{
                opacity: 0,
                y: 16,
                scale: 0.96,
              }}
              transition={{
                duration: 0.65,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="relative w-full max-w-lg overflow-hidden rounded-[2rem] border border-[#b9e7ff]/25 bg-[#071a3d]/90 px-7 py-10 text-center shadow-[0_30px_100px_rgba(0,0,0,0.6)] backdrop-blur-2xl sm:px-12"
            >
              <div
                aria-hidden="true"
                className="absolute left-1/2 top-0 h-32 w-64 -translate-x-1/2 rounded-full bg-[#5dbbff]/20 blur-3xl"
              />

              <div className="relative z-10">
                <div className="mb-5 text-4xl">👺</div>

                <h2 className="text-2xl font-light leading-relaxed text-white sm:text-3xl">
                  Are you absolutely sure?
                </h2>

                <p className="mx-auto mt-6 max-w-md text-base font-light leading-8 text-white/75 sm:text-lg">
                  Because every line of this little website was made with love
                  ... just for you. ❤️
                </p>

                <p className="mt-4 text-base font-light leading-8 text-[#a9ddff] sm:text-lg">
                  Maybe give my heart one more chance?
                </p>

                <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
                  <motion.button
                    type="button"
                    onClick={handleYes}
                    disabled={isAdvancing}
                    whileHover={{
                      y: -3,
                      scale: 1.03,
                    }}
                    whileTap={{
                      scale: 0.96,
                    }}
                    className="rounded-full border border-[#b9e7ff]/50 bg-[#5dbbff]/20 px-6 py-3 text-sm font-medium text-white shadow-[0_0_24px_rgba(93,187,255,0.25)] transition-colors hover:bg-[#5dbbff]/35 disabled:opacity-60"
                  >
                    💖 Yes, I will
                  </motion.button>

                  <motion.button
                    type="button"
                    onClick={closeFinalModal}
                    whileHover={{
                      y: -3,
                      scale: 1.03,
                    }}
                    whileTap={{
                      scale: 0.96,
                    }}
                    className="rounded-full border border-white/20 bg-white/[0.07] px-6 py-3 text-sm font-medium text-white/80 transition-colors hover:bg-white/[0.14]"
                  >
                    💔 Let me think again
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Vignette */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-40 bg-[radial-gradient(ellipse_at_center,transparent_34%,rgba(0,5,20,0.5)_100%)]"
      />
    </main>
  );
}