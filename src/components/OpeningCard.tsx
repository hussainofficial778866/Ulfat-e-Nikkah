import { useState } from 'react';
import { motion } from 'motion/react';
import { MailOpen } from 'lucide-react';
import { WEDDING_DATA } from '../config/weddingConfig';
import { JoinedHandsShowcase } from './JoinedHandsShowcase';
import { CardCornerFiligree, RedRoseCluster, SkyRoseDivider } from './BotanicalOrnaments';

interface OpeningCardProps {
  onOpenStart: () => void;
  onOpenComplete: () => void;
}

export function OpeningCard({ onOpenStart, onOpenComplete }: OpeningCardProps) {
  const [isOpening, setIsOpening] = useState(false);

  const handleOpen = () => {
    if (isOpening) return;
    setIsOpening(true);
    onOpenStart();

    window.setTimeout(() => {
      onOpenComplete();
    }, 980);
  };

  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } }}
      className="relative min-h-[100dvh] w-full flex flex-col items-center justify-center px-4 py-8 sm:px-6 overflow-hidden bg-[radial-gradient(ellipse_at_top,_#E4F3FC_0%,_#F5FAFE_45%,_#FFFFFF_100%)]"
    >
      {/* Subtle atmospheric sky-blue & rose washes */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-24 left-1/2 -translate-x-1/2 w-[620px] h-[340px] rounded-full bg-[#CBE6F8]/45 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-28 right-1/4 w-[420px] h-[280px] rounded-full bg-[#FCECEF]/55 blur-3xl"
      />

      {/* Invitation Card Wrapper with 3D perspective */}
      <div className="relative z-10 w-full max-w-[540px] [perspective:1400px]">
        <motion.div
          role="button"
          tabIndex={0}
          aria-label="Open Nikah Invitation for Eman Babar and Sheikh Saud Saeed"
          onClick={handleOpen}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              handleOpen();
            }
          }}
          initial={{ opacity: 0, y: 20, scale: 0.98 }}
          animate={
            isOpening
              ? {
                  y: -10,
                  scale: 1.025,
                  opacity: 0,
                  transition: { duration: 0.92, ease: [0.22, 1, 0.36, 1] },
                }
              : {
                  opacity: 1,
                  y: 0,
                  scale: 1,
                  transition: { duration: 0.85, ease: [0.22, 1, 0.36, 1] },
                }
          }
          whileHover={isOpening ? undefined : { y: -4 }}
          className="group relative cursor-pointer rounded-[26px] bg-white/95 backdrop-blur-sm border border-[#BFE0F5] shadow-[0_24px_60px_-20px_rgba(39,96,138,0.18),0_4px_18px_-6px_rgba(158,27,50,0.08)] p-4 sm:p-6 transition-shadow duration-500 hover:shadow-[0_30px_75px_-20px_rgba(39,96,138,0.24)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#3C84B4]"
        >
          {/* Inner luxury stationery frame */}
          <div className="relative rounded-[18px] border border-[#DCEEFB] bg-gradient-to-b from-[#FBFDFF] via-[#FFFFFF] to-[#F6FAFE] px-5 py-7 sm:px-9 sm:py-9 overflow-hidden">
            {/* Corner floral watercolors */}
            <RedRoseCluster className="absolute -top-6 -left-6 w-28 h-28 sm:w-36 sm:h-36 opacity-85" />
            <RedRoseCluster
              flip
              className="absolute -bottom-7 -right-6 w-28 h-28 sm:w-36 sm:h-36 opacity-80"
            />

            {/* Delicate corner line filigree */}
            <CardCornerFiligree position="tl" />
            <CardCornerFiligree position="tr" />
            <CardCornerFiligree position="bl" />
            <CardCornerFiligree position="br" />

            {/* Illuminated opening doors overlay during transition */}
            <motion.div
              aria-hidden="true"
              initial={false}
              animate={
                isOpening
                  ? { opacity: 1, scale: 1.05 }
                  : { opacity: 0, scale: 0.92 }
              }
              transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
              className="pointer-events-none absolute inset-0 z-30 bg-[radial-gradient(circle_at_center,_rgba(255,255,255,0.96)_0%,_rgba(227,242,253,0.72)_60%,_transparent_100%)]"
            />

            <motion.div
              aria-hidden="true"
              initial={false}
              animate={
                isOpening
                  ? { rotateY: -78, x: '-14%', opacity: 0.15 }
                  : { rotateY: 0, x: '0%', opacity: 0 }
              }
              transition={{ duration: 0.88, ease: [0.22, 1, 0.36, 1] }}
              style={{ transformOrigin: 'left center' }}
              className="pointer-events-none absolute inset-y-0 left-0 w-1/2 z-20 bg-gradient-to-r from-[#EAF5FC] to-white/90 border-r border-[#CBE4F5]"
            />
            <motion.div
              aria-hidden="true"
              initial={false}
              animate={
                isOpening
                  ? { rotateY: 78, x: '14%', opacity: 0.15 }
                  : { rotateY: 0, x: '0%', opacity: 0 }
              }
              transition={{ duration: 0.88, ease: [0.22, 1, 0.36, 1] }}
              style={{ transformOrigin: 'right center' }}
              className="pointer-events-none absolute inset-y-0 right-0 w-1/2 z-20 bg-gradient-to-l from-[#EAF5FC] to-white/90 border-l border-[#CBE4F5]"
            />

            {/* Card Content */}
            <div className="relative z-10 flex flex-col items-center text-center">
              {/* Urdu & English Invitation Identity */}
              <p
                lang="ur"
                dir="rtl"
                className="font-[family-name:var(--font-urdu)] text-2xl sm:text-3xl text-[#9E1B32] leading-relaxed"
              >
                {WEDDING_DATA.brand.urdu}
              </p>

              <h1 className="mt-1 font-serif text-lg sm:text-xl font-semibold tracking-[0.26em] text-[#1D405B] uppercase">
                {WEDDING_DATA.brand.english}
              </h1>

              <p className="mt-1 text-xs sm:text-[13px] tracking-[0.18em] uppercase text-[#567895]">
                {WEDDING_DATA.brand.openingKicker}
              </p>

              {/* TWO JOINED HANDS ILLUSTRATION (ONE GROOM HAND + ONE BRIDE HAND) */}
              <div className="my-3 sm:my-4 w-full">
                <JoinedHandsShowcase />
              </div>

              <SkyRoseDivider className="my-2" />

              {/* Subtle Couple Preview */}
              <div className="mt-2 space-y-1">
                <p className="font-serif text-2xl sm:text-[28px] font-medium text-[#13293D] leading-snug text-balance">
                  <span>{WEDDING_DATA.couple.bride}</span>
                  <span className="mx-2.5 font-serif italic text-[#9E1B32]">&amp;</span>
                  <span>{WEDDING_DATA.couple.groom}</span>
                </p>
                <p className="text-xs sm:text-sm tracking-[0.14em] text-[#496A85] tabular-nums">
                  {WEDDING_DATA.date.full} · {WEDDING_DATA.schedule[0].time}
                </p>
              </div>

              {/* Primary Open CTA */}
              <div className="mt-6">
                <span className="inline-flex items-center justify-center gap-2.5 min-h-[48px] px-8 py-3 rounded-full bg-[#9E1B32] text-white text-sm font-medium tracking-[0.08em] shadow-[0_10px_24px_-8px_rgba(158,27,50,0.45)] transition-all duration-300 group-hover:bg-[#861529] group-hover:shadow-[0_14px_28px_-8px_rgba(158,27,50,0.52)] group-active:scale-[0.98] whitespace-nowrap shrink-0">
                  <MailOpen className="w-4 h-4 stroke-[1.75]" aria-hidden="true" />
                  <span>Open Invitation</span>
                </span>
              </div>
            </div>
          </div>
        </motion.div>

        <p className="mt-4 text-center text-xs tracking-[0.16em] uppercase text-[#6686A0]">
          Tap card to unveil invitation
        </p>
      </div>
    </motion.main>
  );
}
