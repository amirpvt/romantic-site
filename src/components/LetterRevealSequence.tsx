"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

type HeartParticle = {
  id: number;
  x: number;
  y: number;
  rotate: number;
  scale: number;
  size: number;
  delay: number;
  duration: number;
  color: string;
};

type EdgeBubble = {
  id: number;
  side: "left" | "right";
  top: string;
  size: number;
  delay: number;
  duration: number;
  opacity: number;
};

const englishPoem = [
  "Shall I compare thee to a summer's day?",
  "Thou art more lovely and more temperate:",
  "Rough winds do shake the darling buds of May,",
  "And summer's lease hath all too short a date;",
  "Sometime too hot the eye of heaven shines,",
  "And often is his gold complexion dimm'd;",
  "And every fair from fair sometime declines,",
  "By chance, or nature's changing course, untrimm'd;",
  "But thy eternal summer shall not fade,",
  "Nor lose possession of that fair thou ow'st;",
  "Nor shall Death brag thou wander'st in his shade,",
  "When in eternal lines to time thou grow'st:",
  "So long as men can breathe, or eyes can see,",
  "So long lives this, and this gives life to thee.",
];

const persianPoem = [
  "آیا تو را به روزی از تابستان تشبیه کنم؟",
  "تو از تابستان، دل‌انگیزتر و معتدل‌تری.",
  "بادهای تند، شکوفه‌های لطیف ماه مه را می‌لرزانند،",
  "و عمر تابستان، چه کوتاه و گذراست.",
  "گاه خورشید با گرمایی سوزان می‌تابد،",
  "و گاه رخسار زرینش در پس ابرها پنهان می‌شود.",
  "هر زیبایی، روزی از زیبایی فرو می‌افتد،",
  "یا به دست تقدیر، یا بر اثر دگرگونی طبیعت.",
  "اما تابستان جاودانهٔ تو هرگز رنگ نخواهد باخت،",
  "و زیبایی‌ات هرگز از آنِ تو جدا نخواهد شد.",
  "مرگ نیز هرگز نخواهد توانست به خود ببالد",
  "که تو در سایهٔ او گام می‌زنی؛",
  "زیرا در این سطرهای جاودان، همواره با زمان زنده خواهی ماند.",
  "تا وقتی انسانی نفس می‌کشد و چشمی توان دیدن دارد،",
  "این شعر زنده خواهد ماند، و زندگی را به تو خواهد بخشید.",
];

const heartColors = [
  "#38bdf8",
  "#60a5fa",
  "#7dd3fc",
  "#93c5fd",
  "#2563eb",
];

export default function LetterRevealSequence() {
  const [isOpening, setIsOpening] = useState(false);
  const [isLetterOpen, setIsLetterOpen] = useState(false);

  const particles = useMemo<HeartParticle[]>(
    () =>
      Array.from({ length: 130 }, (_, id) => {
        const angle = (id / 130) * Math.PI * 2;
        const distance = 180 + ((id * 47) % 520);

        return {
          id,
          x: Math.cos(angle) * distance + ((id * 31) % 140) - 70,
          y: Math.sin(angle) * distance + ((id * 19) % 140) - 70,
          rotate: ((id * 37) % 180) - 90,
          scale: 0.45 + ((id * 17) % 100) / 100,
          size: 12 + ((id * 23) % 28),
          delay: (id % 22) * 0.045,
          duration: 2.8 + ((id * 13) % 18) / 10,
          color: heartColors[id % heartColors.length],
        };
      }),
    [],
  );

  const edgeBubbles = useMemo<EdgeBubble[]>(
    () =>
      Array.from({ length: 16 }, (_, id) => ({
        id,
        side: id % 2 === 0 ? "left" : "right",
        top: `${8 + ((id * 23) % 82)}%`,
        size: 30 + ((id * 17) % 34),
        delay: (id % 8) * 0.6,
        duration: 7 + ((id * 13) % 35) / 10,
        opacity: 0.42 + ((id * 11) % 22) / 100,
      })),
    [],
  );

  const openLetter = () => {
    if (isOpening || isLetterOpen) return;

    setIsOpening(true);

    window.setTimeout(() => {
      setIsLetterOpen(true);
    }, 1900);
  };

  return (
    <main
      aria-label="Final love letter"
      className="relative min-h-screen overflow-hidden bg-[#01040b] text-white"
    >
      {/* Background */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(15,62,112,0.24),transparent_38%),#01040b]"
      />

      {/* Ambient glow */}
      <motion.div
        aria-hidden="true"
        className="absolute left-1/2 top-1/2 h-[34rem] w-[34rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#1989d8]/10 blur-[120px]"
        animate={{
          opacity: [0.25, 0.58, 0.25],
          scale: [0.88, 1.12, 0.88],
        }}
        transition={{
          duration: 7,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Center explosion */}
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/2 z-10 h-5 w-5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#d9f5ff] shadow-[0_0_35px_15px_rgba(93,187,255,0.9)]"
        initial={{
          opacity: 0,
          scale: 0,
        }}
        animate={{
          opacity: [0, 1, 0.75, 0],
          scale: [0, 2.2, 14, 34],
        }}
        transition={{
          duration: 2.4,
          delay: 0.35,
          ease: "easeOut",
          times: [0, 0.18, 0.52, 1],
        }}
      />

      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/2 z-10 h-14 w-14 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-[#62bdff]/80"
        initial={{
          opacity: 0,
          scale: 0,
        }}
        animate={{
          opacity: [0, 0.9, 0],
          scale: [0, 7, 14],
        }}
        transition={{
          duration: 2.3,
          delay: 0.45,
          ease: "easeOut",
        }}
      />

      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/2 z-10 h-20 w-20 -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#38bdf8]/50"
        initial={{
          opacity: 0,
          scale: 0,
        }}
        animate={{
          opacity: [0, 0.65, 0],
          scale: [0, 5, 12],
        }}
        transition={{
          duration: 3,
          delay: 0.9,
          ease: "easeOut",
        }}
      />

      {/* Exploding blue hearts */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/2 z-20"
      >
        {particles.map((particle) => (
          <motion.span
            key={particle.id}
            className="absolute left-0 top-0 select-none"
            style={{
              color: particle.color,
              fontSize: particle.size,
              textShadow: `0 0 8px ${particle.color}, 0 0 18px ${particle.color}`,
            }}
            initial={{
              x: 0,
              y: 0,
              opacity: 0,
              scale: 0,
              rotate: 0,
            }}
            animate={{
              x: particle.x,
              y: particle.y,
              opacity: [0, 1, 0.95, 0.65, 0],
              scale: [
                0,
                particle.scale * 1.35,
                particle.scale,
                particle.scale * 0.72,
                0.18,
              ],
              rotate: [
                0,
                particle.rotate * 0.35,
                particle.rotate,
                particle.rotate * 1.35,
              ],
            }}
            transition={{
              duration: particle.duration,
              delay: particle.delay,
              ease: [0.16, 1, 0.3, 1],
            }}
          >
            ♥
          </motion.span>
        ))}
      </div>

      {/* Main envelope and letter */}
      <section className="relative z-30 flex min-h-screen items-center justify-center px-5 py-12">
        <AnimatePresence mode="wait">
          {!isLetterOpen && (
            <motion.div
              key="envelope"
              initial={{
                opacity: 0,
                y: 42,
                scale: 0.82,
              }}
              animate={{
                opacity: 1,
                y: 0,
                scale: isOpening ? 1.08 : 1,
              }}
              transition={{
                opacity: {
                  duration: 1.2,
                  delay: 2.8,
                },
                y: {
                  duration: 1.4,
                  delay: 2.8,
                  ease: [0.22, 1, 0.36, 1],
                },
                scale: {
                  duration: 1.2,
                  ease: [0.22, 1, 0.36, 1],
                },
              }}
              className="relative h-[21rem] w-full max-w-[35rem] sm:h-[24rem]"
              style={{
                perspective: 1400,
              }}
            >
              {/* Warm light */}
              <motion.div
                aria-hidden="true"
                className="absolute left-1/2 top-[10%] z-0 h-[70%] w-[70%] -translate-x-1/2 rounded-full bg-[#ffd8af]"
                animate={{
                  opacity: isOpening ? [0, 0.75, 0.35] : 0,
                  scale: isOpening ? [0.35, 1.1, 1] : 0.35,
                  filter: isOpening
                    ? ["blur(32px)", "blur(52px)", "blur(42px)"]
                    : "blur(32px)",
                }}
                transition={{
                  duration: 1.9,
                  ease: "easeOut",
                }}
              />

              {/* Letter inside envelope */}
              <motion.div
                className="absolute left-[6%] top-[7%] z-10 h-[92%] w-[88%] overflow-hidden rounded-[3px] bg-[#f5ead9] shadow-[0_12px_35px_rgba(0,0,0,0.28)]"
                initial={{
                  y: "58%",
                  opacity: 0,
                }}
                animate={{
                  y: isOpening ? "-28%" : "58%",
                  opacity: isOpening ? 1 : 0,
                }}
                transition={{
                  duration: 1.7,
                  delay: isOpening ? 0.55 : 0,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_15%,rgba(255,255,255,0.7),transparent_30%),linear-gradient(120deg,rgba(255,255,255,0.18),transparent_45%)]" />

                <div className="relative flex h-full flex-col items-center justify-center gap-4 px-6 text-center text-[#503b2c]">
                  <span className="text-xs tracking-[0.3em] uppercase">
                    A letter for you
                  </span>

                  <span className="font-[Poppins,sans-serif] text-lg font-medium">
                    Amir <span className="text-[#1769aa]">💙</span> Mahsa
                  </span>
                </div>
              </motion.div>

              {/* Envelope */}
              <motion.button
                type="button"
                onClick={openLetter}
                disabled={isOpening}
                aria-label="Open the letter"
                className="absolute inset-0 z-20 overflow-hidden rounded-[1.5rem] border border-[#d7c4a7]/45 bg-[#eee1cc] text-center shadow-[0_30px_100px_rgba(0,0,0,0.62)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#9bdcff]"
              >
                <span
                  aria-hidden="true"
                  className="absolute inset-0 bg-[radial-gradient(circle_at_25%_20%,rgba(255,255,255,0.8),transparent_24%),linear-gradient(135deg,rgba(255,255,255,0.35),transparent_48%,rgba(122,85,55,0.12))]"
                />

                <span
                  aria-hidden="true"
                  className="absolute bottom-0 left-0 h-[70%] w-[55%] bg-[#dac1a9]/80"
                  style={{
                    clipPath: "polygon(0 0, 100% 100%, 0 100%)",
                  }}
                />

                <span
                  aria-hidden="true"
                  className="absolute bottom-0 right-0 h-[70%] w-[55%] bg-[#cfb39b]/80"
                  style={{
                    clipPath: "polygon(100% 0, 100% 100%, 0 100%)",
                  }}
                />

                {/* Envelope top flap */}
                <motion.span
                  aria-hidden="true"
                  className="absolute left-0 top-0 z-30 h-[64%] w-full origin-top bg-[#e5d1b3] shadow-[0_9px_18px_rgba(0,0,0,0.18)]"
                  animate={{
                    rotateX: isOpening ? 180 : 0,
                  }}
                  transition={{
                    duration: 1.65,
                    delay: isOpening ? 0.15 : 0,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  style={{
                    clipPath: "polygon(0 0, 100% 0, 50% 100%)",
                    transformStyle: "preserve-3d",
                    backfaceVisibility: "hidden",
                  }}
                >
                  <span className="absolute inset-0 bg-gradient-to-br from-[#fff7eb]/70 via-transparent to-[#c6a890]/40" />
                </motion.span>

                {/* Flap inner side */}
                <motion.span
                  aria-hidden="true"
                  className="absolute left-0 top-0 z-[29] h-[64%] w-full origin-top bg-[#c9a98d]"
                  animate={{
                    rotateX: isOpening ? 0 : -180,
                  }}
                  transition={{
                    duration: 1.65,
                    delay: isOpening ? 0.15 : 0,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  style={{
                    clipPath: "polygon(0 0, 100% 0, 50% 100%)",
                    transformStyle: "preserve-3d",
                    backfaceVisibility: "hidden",
                  }}
                />

                {/* Seal */}
                <motion.span
                  aria-hidden="true"
                  animate={{
                    opacity: isOpening ? 0 : 1,
                    scale: isOpening ? 0.5 : 1,
                  }}
                  transition={{
                    duration: 0.45,
                  }}
                  className="absolute left-1/2 top-[52%] z-40 flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-[#9a7757]/35 bg-[#caa77e]/30 text-3xl text-[#226fa5] shadow-[0_0_25px_rgba(42,126,180,0.3)]"
                >
                  ♥
                </motion.span>

                <motion.span
                  animate={{
                    opacity: isOpening ? 0 : 1,
                    y: isOpening ? 12 : 0,
                  }}
                  transition={{
                    duration: 0.5,
                  }}
                  className="absolute bottom-9 left-1/2 z-40 w-full -translate-x-1/2 px-6 font-[Poppins,sans-serif] text-base font-medium leading-relaxed text-[#503b2c] sm:text-lg"
                >
                  Please click here to open the letter ❤️
                </motion.span>
              </motion.button>

              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 z-50 rounded-[1.5rem] border border-white/20"
              />
            </motion.div>
          )}

          {isLetterOpen && (
            <motion.article
              key="opened-letter"
              initial={{
                opacity: 0,
                scale: 0.72,
                y: 45,
              }}
              animate={{
                opacity: 1,
                scale: 1,
                y: 0,
              }}
              transition={{
                duration: 1.5,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="relative max-h-[calc(100vh-3rem)] w-full max-w-4xl overflow-y-auto rounded-[1.25rem] border border-[#e7d6bb]/50 bg-[#f5ead9] px-6 py-10 text-[#3e3026] shadow-[0_30px_120px_rgba(0,0,0,0.7)] sm:px-12 sm:py-14 md:px-20"
            >
                {/* Blue balloons rising from both bottom corners */}
                <div
                aria-hidden="true"
                className="pointer-events-none fixed inset-0 z-50 overflow-hidden"
                >
                {Array.from({ length: 18 }, (_, id) => {
                    const isLeft = id % 2 === 0;

                    return (
                    <motion.div
                        key={id}
                        className="absolute bottom-[-7rem]"
                        style={{
                        left: isLeft
                            ? `${-2 + ((id * 7) % 18)}%`
                            : undefined,
                        right: !isLeft
                            ? `${-2 + ((id * 11) % 18)}%`
                            : undefined,
                        }}
                        initial={{
                        y: 0,
                        x: isLeft ? 0 : 0,
                        opacity: 0,
                        scale: 0.7,
                        rotate: isLeft ? -7 : 7,
                        }}
                        animate={{
                        y: "-125vh",
                        x: isLeft
                            ? [0, 22, -12, 18, 0]
                            : [0, -22, 12, -18, 0],
                        opacity: [0, 0.95, 0.95, 0.8, 0],
                        scale: [0.7, 1, 0.96, 1.03, 0.8],
                        rotate: isLeft
                            ? [-7, 5, -4, 7, 0]
                            : [7, -5, 4, -7, 0],
                        }}
                        transition={{
                        duration: 9 + ((id * 13) % 35) / 10,
                        delay: (id % 9) * 0.45,
                        repeat: Infinity,
                        ease: "easeInOut",
                        }}
                    >
                        {/* Balloon body */}
                        <div
                        className="relative h-24 w-[4.4rem] rounded-[50%_50%_46%_46%] border border-[#b9e7ff]/65 bg-gradient-to-br from-[#b8ecff] via-[#249fe4] to-[#075596] shadow-[inset_-12px_-14px_18px_rgba(3,42,88,0.45),0_0_22px_rgba(56,189,248,0.72)] sm:h-32 sm:w-24"
                        >
                        {/* Balloon highlight */}
                        <span className="absolute left-[20%] top-[14%] h-[25%] w-[27%] rounded-full bg-white/65 blur-[2px]" />

                        <span className="absolute left-[30%] top-[8%] h-[12%] w-[18%] rounded-full bg-white/30 blur-[3px]" />

                        {/* Balloon bottom knot */}
                        <span
                            aria-hidden="true"
                            className="absolute bottom-[-0.35rem] left-1/2 h-3 w-3 -translate-x-1/2 rotate-45 rounded-[2px] bg-[#0865a6] shadow-[0_0_8px_rgba(56,189,248,0.65)]"
                        />
                        </div>

                        {/* Balloon string */}
                        <span
                        aria-hidden="true"
                        className="absolute left-1/2 top-[calc(100%+0.15rem)] h-28 w-px -translate-x-1/2 bg-gradient-to-b from-[#8bdcff]/80 via-[#4aa8d8]/50 to-transparent sm:h-36"
                        />
                    </motion.div>
                    );
                })}
                </div>

              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_15%_10%,rgba(255,255,255,0.75),transparent_25%),linear-gradient(120deg,rgba(255,255,255,0.18),transparent_45%)]"
              />

              <motion.div
                initial={{
                  opacity: 0,
                  y: 15,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                transition={{
                  duration: 1.2,
                  delay: 0.35,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="relative z-10"
              >
                <header className="mb-10 text-center">
                  <p className="text-xs tracking-[0.35em] text-[#836d58] uppercase">
                    A poem for you
                  </p>

                  <h1 className="mt-4 font-[Poppins,sans-serif] text-3xl font-medium tracking-wide text-[#403025] sm:text-4xl">
                    Sonnet 18
                  </h1>

                  <p className="mt-2 font-serif text-lg italic text-[#806a54]">
                    William Shakespeare
                  </p>

                  <p className="mt-7 font-[Poppins,sans-serif] text-lg font-medium text-[#235d83]">
                    Amir <span aria-hidden="true">💙</span> Mahsa
                  </p>
                </header>

                <div className="mx-auto max-w-2xl font-serif text-lg leading-[2] text-[#4b392d] sm:text-xl">
                  {englishPoem.map((line, index) => (
                    <motion.p
                      key={`english-${index}`}
                      initial={{
                        opacity: 0,
                        y: 8,
                      }}
                      animate={{
                        opacity: 1,
                        y: 0,
                      }}
                      transition={{
                        duration: 0.55,
                        delay: 0.8 + index * 0.06,
                      }}
                      className={
                        index === 12 || index === 13
                          ? "font-semibold text-[#235d83]"
                          : undefined
                      }
                    >
                      {line}
                    </motion.p>
                  ))}
                </div>

                <div className="mx-auto my-12 h-px max-w-xs bg-[#a48666]/35" />

                <div
                  dir="rtl"
                  className="mx-auto max-w-2xl font-[Vazirmatn,sans-serif] text-base leading-[2.25] text-[#4b392d] sm:text-lg"
                >
                  {persianPoem.map((line, index) => (
                    <motion.p
                      key={`persian-${index}`}
                      initial={{
                        opacity: 0,
                        y: 8,
                      }}
                      animate={{
                        opacity: 1,
                        y: 0,
                      }}
                      transition={{
                        duration: 0.55,
                        delay: 1.8 + index * 0.06,
                      }}
                      className={
                        index === 8 ||
                        index === 13 ||
                        index === 14
                          ? "font-semibold text-[#235d83]"
                          : undefined
                      }
                    >
                      {line}
                    </motion.p>
                  ))}
                </div>

                <footer className="mt-14 text-center">
                  <p className="font-[Vazirmatn,sans-serif] text-sm text-[#806a54]">
                    💙برای تو مهسام، با تمام قلبم
                  </p>

                  <p className="mt-4 font-[Poppins,sans-serif] text-base font-medium tracking-wide text-[#235d83]">
                    Amir <span aria-hidden="true">💙</span> Mahsa
                  </p>
                </footer>
              </motion.div>
            </motion.article>
          )}
        </AnimatePresence>
      </section>

      {/* Vignette */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-[60] bg-[radial-gradient(ellipse_at_center,transparent_34%,rgba(0,5,20,0.52)_100%)]"
      />
    </main>
  );
}