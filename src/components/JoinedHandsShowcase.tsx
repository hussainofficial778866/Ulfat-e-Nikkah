import { useState } from 'react';
import { motion } from 'motion/react';
import { WEDDING_DATA } from '../config/weddingConfig';

export function JoinedHandsShowcase() {
  const [imgFailed, setImgFailed] = useState(false);

  return (
    <div className="relative mx-auto w-full max-w-[340px] sm:max-w-[400px] aspect-[4/3] flex items-center justify-center select-none">
      {/* Whisper sky-blue luminous halo behind the joined hands */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-4 rounded-full bg-[radial-gradient(circle,_rgba(206,231,247,0.68)_0%,_rgba(244,250,254,0.38)_55%,_transparent_80%)] blur-xl"
      />

      {/* Subtle continuous motion keeping the two hands gracefully connected */}
      <motion.div
        animate={{
          y: [0, -3.5, 0],
          rotate: [-0.45, 0.45, -0.45],
        }}
        transition={{
          duration: 7.5,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="relative w-full h-full flex items-center justify-center"
      >
        {!imgFailed ? (
          <div
            className="relative w-full h-full overflow-hidden rounded-2xl"
            style={{
              maskImage:
                'radial-gradient(ellipse 90% 86% at 50% 50%, rgba(0,0,0,1) 60%, rgba(0,0,0,0) 97%)',
              WebkitMaskImage:
                'radial-gradient(ellipse 90% 86% at 50% 50%, rgba(0,0,0,1) 60%, rgba(0,0,0,0) 97%)',
            }}
          >
            <img
              src={WEDDING_DATA.assets.joinedHands}
              alt="Young groom's hand from the left and young bride's hand from the right gently holding each other in the center"
              referrerPolicy="no-referrer"
              onError={() => setImgFailed(true)}
              className="w-full h-full object-cover object-center scale-[1.03] drop-shadow-[0_0_24px_rgba(255,255,255,0.85)]"
            />

            {/* Soft luminous diagonal light sweep across the joined hands */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-y-0 w-1/3 bg-gradient-to-r from-transparent via-white/45 to-transparent animate-light-sweep"
            />
          </div>
        ) : (
          /* Resilient fallback: strictly two joined hands from opposite sides */
          <div className="w-full h-full rounded-2xl border border-[#CBE4F5] bg-gradient-to-b from-[#F5FAFE] to-white flex flex-col items-center justify-center p-6">
            <svg
              viewBox="0 0 240 120"
              fill="none"
              aria-label="Illustration of bride and groom holding hands"
              className="w-52 h-28"
            >
              <path
                d="M16 64 C52 60, 82 54, 114 58 C126 60, 134 65, 138 69"
                stroke="#3C84B4"
                strokeWidth="2.2"
                strokeLinecap="round"
              />
              <path
                d="M224 58 C188 58, 158 62, 128 66 C116 68, 108 66, 102 62"
                stroke="#9E1B32"
                strokeWidth="2.2"
                strokeLinecap="round"
              />
              <path
                d="M108 62 C114 68, 124 68, 130 62"
                stroke="#496A85"
                strokeWidth="1.6"
                strokeLinecap="round"
              />
            </svg>
            <span className="mt-2 font-serif italic text-sm text-[#496A85]">
              Hand in Hand, Forever
            </span>
          </div>
        )}

        {/* Delicate ambient sparkle around the joined hands */}
        <motion.div
          aria-hidden="true"
          animate={{ opacity: [0.35, 0.85, 0.35], scale: [0.9, 1.1, 0.9] }}
          transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}
          className="pointer-events-none absolute left-[49%] top-[36%] -translate-x-1/2 -translate-y-1/2"
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            className="drop-shadow-[0_0_6px_rgba(126,192,232,0.75)]"
          >
            <path
              d="M12 2L13.4 10.2L21.5 11.6L13.4 13L12 21.2L10.6 13L2.5 11.6L10.6 10.2L12 2Z"
              fill="#FFFFFF"
            />
          </svg>
        </motion.div>

        {/* Subtle floating rose petals near the hands */}
        <motion.span
          aria-hidden="true"
          animate={{ y: [0, -7, 0], x: [0, 3, 0], opacity: [0.55, 0.85, 0.55] }}
          transition={{ duration: 5.8, repeat: Infinity, ease: 'easeInOut' }}
          className="pointer-events-none absolute left-[18%] bottom-[16%] w-2.5 h-1.5 rounded-full bg-[#BE243D]/70 rotate-45"
        />
        <motion.span
          aria-hidden="true"
          animate={{ y: [0, -6, 0], x: [0, -3, 0], opacity: [0.45, 0.8, 0.45] }}
          transition={{ duration: 6.4, repeat: Infinity, ease: 'easeInOut', delay: 1.2 }}
          className="pointer-events-none absolute right-[16%] top-[20%] w-2 h-1.5 rounded-full bg-[#9E1B32]/65 -rotate-12"
        />
      </motion.div>
    </div>
  );
}
