import { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import {
  Check,
  Clock,
  Copy,
  ExternalLink,
  MapPin,
  MessageCircle,
  Phone,
  RotateCcw,
  Share2,
  Volume2,
  VolumeX,
} from 'lucide-react';
import { WEDDING_DATA } from '../config/weddingConfig';
import {
  CardCornerFiligree,
  RedRoseCluster,
  RedRoseSpray,
  SkyRoseDivider,
  SparkleAccent,
} from './BotanicalOrnaments';
import { ScratchDateReveal } from './ScratchDateReveal';

interface MainInvitationProps {
  isAudioPlaying: boolean;
  onToggleAudio: () => void;
  onReplayCard: () => void;
  onDateRevealed: () => void;
}

interface CountdownState {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isPast: boolean;
}

function getTimeRemaining(): CountdownState {
  const target = new Date(WEDDING_DATA.date.isoTarget).getTime();
  const now = Date.now();
  const diff = target - now;

  if (Number.isNaN(target) || diff <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0, isPast: true };
  }

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / (1000 * 60)) % 60);
  const seconds = Math.floor((diff / 1000) % 60);

  return { days, hours, minutes, seconds, isPast: false };
}

const EASE_LUXURY = [0.22, 1, 0.36, 1] as const;

export function MainInvitation({
  isAudioPlaying,
  onToggleAudio,
  onReplayCard,
  onDateRevealed,
}: MainInvitationProps) {
  const [countdown, setCountdown] = useState<CountdownState>(getTimeRemaining);
  const [venueImgError, setVenueImgError] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  useEffect(() => {
    const id = window.setInterval(() => {
      setCountdown(getTimeRemaining());
    }, 1000);
    return () => window.clearInterval(id);
  }, []);

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      window.setTimeout(() => setCopiedLink(false), 2600);
    } catch {
      setCopiedLink(false);
    }
  };

  const whatsappShareUrl = `https://wa.me/?text=${encodeURIComponent(
    `With the blessings of love and family, you are cordially invited to the Nikah of ${WEDDING_DATA.couple.bride} & ${WEDDING_DATA.couple.groom} on ${WEDDING_DATA.date.full} at ${WEDDING_DATA.venue.name}, ${WEDDING_DATA.venue.location}. ${
      typeof window !== 'undefined' ? window.location.href : ''
    }`
  )}`;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.75, ease: EASE_LUXURY }}
      className="relative min-h-screen w-full bg-gradient-to-b from-[#F4FAFE] via-[#FFFFFF] to-[#F5FAFE] text-[#13293D]"
    >
      {/* Top Bar Contract: [Brand wordmark] — [4 single-line nav links] — [1 primary action] */}
      <header className="sticky top-0 z-30 w-full bg-white/88 backdrop-blur-md border-b border-[#DCEEFB]">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 h-14 flex items-center justify-between gap-4 sm:gap-8">
          <a
            href="#invitation"
            className="font-serif text-base sm:text-lg font-semibold tracking-[0.16em] text-[#13293D] whitespace-nowrap shrink-0 hover:text-[#9E1B32] transition-colors"
          >
            {WEDDING_DATA.brand.english}
          </a>

          <nav
            aria-label="Invitation sections"
            className="hidden md:flex items-center gap-7 text-xs font-medium tracking-[0.12em] uppercase text-[#496A85]"
          >
            <a
              href="#invitation"
              className="hover:text-[#9E1B32] transition-colors whitespace-nowrap shrink-0"
            >
              Invitation
            </a>
            <a
              href="#date"
              className="hover:text-[#9E1B32] transition-colors whitespace-nowrap shrink-0"
            >
              Date
            </a>
            <a
              href="#schedule"
              className="hover:text-[#9E1B32] transition-colors whitespace-nowrap shrink-0"
            >
              Schedule
            </a>
            <a
              href="#venue"
              className="hover:text-[#9E1B32] transition-colors whitespace-nowrap shrink-0"
            >
              Venue
            </a>
          </nav>

          <a
            href="#rsvp"
            className="inline-flex items-center justify-center min-h-[36px] px-4 py-1.5 rounded-full bg-[#9E1B32] text-white text-xs font-medium tracking-[0.1em] uppercase hover:bg-[#861529] transition-colors whitespace-nowrap shrink-0"
          >
            RSVP
          </a>
        </div>
      </header>

      <main className="relative z-10">
        {/* ============================================================ */}
        {/* HERO / MAIN INVITATION                                       */}
        {/* ============================================================ */}
        <section
          id="invitation"
          className="relative pt-10 pb-16 sm:pt-14 sm:pb-24 px-4 sm:px-6 overflow-hidden"
        >
          {/* Soft sky-blue atmospheric halo */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute top-10 left-1/2 -translate-x-1/2 w-[min(92vw,760px)] h-[420px] rounded-full bg-[radial-gradient(circle,_rgba(206,231,247,0.52)_0%,_rgba(244,250,254,0.28)_55%,_transparent_78%)] blur-2xl"
          />

          <div className="relative mx-auto max-w-3xl text-center">
            {/* Botanical Red Rose & Sky-Blue Wildflower Spray */}
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, ease: EASE_LUXURY }}
            >
              <RedRoseSpray className="w-full max-w-[440px] h-36 sm:h-44" />
            </motion.div>

            {/* Bismillah & Urdu Title */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.85, delay: 0.12, ease: EASE_LUXURY }}
              className="mt-2 space-y-2"
            >
              <p
                lang="ar"
                dir="rtl"
                className="font-[family-name:var(--font-urdu)] text-xl sm:text-2xl text-[#3C84B4]"
              >
                {WEDDING_DATA.brand.bismillah}
              </p>

              <p
                lang="ur"
                dir="rtl"
                className="font-[family-name:var(--font-urdu)] text-3xl sm:text-4xl text-[#9E1B32] pt-1"
              >
                {WEDDING_DATA.brand.urdu}
              </p>

              <p className="text-xs sm:text-sm tracking-[0.22em] uppercase text-[#567895] pt-1">
                {WEDDING_DATA.brand.blessingsLead}
              </p>
            </motion.div>

            {/* Focal Point: Bride & Groom Names */}
            <motion.div
              initial={{ opacity: 0, y: 18, letterSpacing: '0.06em' }}
              animate={{ opacity: 1, y: 0, letterSpacing: '0.015em' }}
              transition={{ duration: 1.05, delay: 0.25, ease: EASE_LUXURY }}
              className="mt-8 sm:mt-10 relative"
            >
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-x-8 -inset-y-4 rounded-full bg-[radial-gradient(ellipse_at_center,_rgba(255,255,255,0.95)_0%,_rgba(227,242,253,0.45)_65%,_transparent_100%)] blur-xl"
              />

              <h1 className="relative font-serif text-[clamp(2.65rem,7vw,4.75rem)] font-medium leading-[1.12] text-[#13293D] text-balance">
                <span className="block">{WEDDING_DATA.couple.bride}</span>
                <span className="my-2 sm:my-3 block font-serif italic text-[clamp(1.75rem,4vw,2.75rem)] font-normal text-[#9E1B32]">
                  &amp;
                </span>
                <span className="block">{WEDDING_DATA.couple.groom}</span>
              </h1>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.9, delay: 0.5, ease: EASE_LUXURY }}
              className="mt-8 sm:mt-10"
            >
              <SkyRoseDivider />
              <p className="mt-5 text-xs sm:text-sm tracking-[0.2em] uppercase text-[#496A85] tabular-nums">
                {WEDDING_DATA.date.full} · {WEDDING_DATA.venue.name}
              </p>
            </motion.div>
          </div>
        </section>

        {/* ============================================================ */}
        {/* WEDDING MESSAGE / POETRY                                     */}
        {/* ============================================================ */}
        <section className="py-12 sm:py-16 px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.85, ease: EASE_LUXURY }}
            className="mx-auto max-w-2xl border-y border-[#CBE4F5] bg-gradient-to-b from-[#FBFDFF] via-[#F5FAFE]/60 to-[#FBFDFF] py-10 sm:py-12 px-5 sm:px-10 text-center"
          >
            <p className="font-serif italic text-xl sm:text-[26px] leading-[1.7] text-[#1D405B] text-balance">
              {WEDDING_DATA.poetry.lines.map((line) => (
                <span key={line} className="block">
                  {line}
                </span>
              ))}
            </p>
          </motion.div>
        </section>

        {/* ============================================================ */}
        {/* DATE REVEAL                                                  */}
        {/* ============================================================ */}
        <section
          id="date"
          className="relative py-14 sm:py-20 px-4 sm:px-6 bg-gradient-to-b from-white via-[#EFF7FD] to-white"
        >
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.985 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.9, ease: EASE_LUXURY }}
            className="relative mx-auto max-w-xl rounded-[24px] bg-white border border-[#CBE4F5] shadow-[0_22px_55px_-22px_rgba(39,96,138,0.18)] p-4 sm:p-6 overflow-hidden"
          >
            {/* Subtle corner roses */}
            <RedRoseCluster className="absolute -top-6 -left-6 w-28 h-28 sm:w-32 sm:h-32 opacity-75" />
            <RedRoseCluster
              flip
              className="absolute -bottom-6 -right-6 w-28 h-28 sm:w-32 sm:h-32 opacity-75"
            />

            <div className="relative rounded-[18px] border border-[#E3F1FB] bg-gradient-to-b from-[#F9FCFF] to-white px-6 py-10 sm:px-10 sm:py-12 text-center">
              <SparkleAccent className="absolute top-6 right-8" />
              <SparkleAccent className="absolute bottom-8 left-8 opacity-75" />

              <p className="text-xs tracking-[0.24em] uppercase text-[#567895]">
                Save the Date
              </p>

              <ScratchDateReveal onRevealed={onDateRevealed}>
                <div className="my-2 py-6 px-4 flex flex-col items-center">
                  <p className="font-serif italic text-lg sm:text-xl text-[#9E1B32]">
                    {WEDDING_DATA.date.weekday}
                  </p>

                  <span className="mt-2 font-serif text-[72px] sm:text-[92px] font-medium leading-none text-[#13293D] tabular-nums drop-shadow-[0_4px_18px_rgba(126,192,232,0.35)]">
                    {WEDDING_DATA.date.day}
                  </span>
                  <span className="mt-2 font-serif text-3xl sm:text-4xl font-medium tracking-[0.06em] text-[#1D405B]">
                    {WEDDING_DATA.date.month}
                  </span>
                  <span className="mt-1 font-serif text-xl sm:text-2xl tracking-[0.22em] text-[#496A85] tabular-nums">
                    {WEDDING_DATA.date.year}
                  </span>
                </div>
              </ScratchDateReveal>

              <SkyRoseDivider className="my-6" />

              {/* Unboxed clean typographic countdown */}
              {!countdown.isPast ? (
                <div
                  aria-label="Countdown to Nikah"
                  className="grid grid-cols-4 divide-x divide-[#DCEEFB] max-w-sm mx-auto"
                >
                  <div className="px-2">
                    <span className="block font-serif text-2xl sm:text-3xl font-semibold text-[#13293D] tabular-nums">
                      {String(countdown.days).padStart(2, '0')}
                    </span>
                    <span className="mt-0.5 block text-[11px] tracking-[0.14em] uppercase text-[#567895]">
                      Days
                    </span>
                  </div>
                  <div className="px-2">
                    <span className="block font-serif text-2xl sm:text-3xl font-semibold text-[#13293D] tabular-nums">
                      {String(countdown.hours).padStart(2, '0')}
                    </span>
                    <span className="mt-0.5 block text-[11px] tracking-[0.14em] uppercase text-[#567895]">
                      Hours
                    </span>
                  </div>
                  <div className="px-2">
                    <span className="block font-serif text-2xl sm:text-3xl font-semibold text-[#13293D] tabular-nums">
                      {String(countdown.minutes).padStart(2, '0')}
                    </span>
                    <span className="mt-0.5 block text-[11px] tracking-[0.14em] uppercase text-[#567895]">
                      Mins
                    </span>
                  </div>
                  <div className="px-2">
                    <span className="block font-serif text-2xl sm:text-3xl font-semibold text-[#9E1B32] tabular-nums">
                      {String(countdown.seconds).padStart(2, '0')}
                    </span>
                    <span className="mt-0.5 block text-[11px] tracking-[0.14em] uppercase text-[#567895]">
                      Secs
                    </span>
                  </div>
                </div>
              ) : (
                <p className="font-serif italic text-lg text-[#9E1B32]">
                  The blessed day has arrived
                </p>
              )}
            </div>
          </motion.div>
        </section>

        {/* ============================================================ */}
        {/* EVENT TIMELINE                                               */}
        {/* ============================================================ */}
        <section id="schedule" className="py-14 sm:py-20 px-4 sm:px-6">
          <div className="mx-auto max-w-4xl">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.75, ease: EASE_LUXURY }}
              className="text-center mb-10 sm:mb-12"
            >
              <p className="text-xs tracking-[0.22em] uppercase text-[#567895]">
                Evening Programme
              </p>
              <h2 className="mt-2 font-serif text-3xl sm:text-4xl font-medium text-[#13293D] text-balance">
                Wedding Schedule
              </h2>
              <SkyRoseDivider className="mt-4" />
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
              {WEDDING_DATA.schedule.map((item, idx) => (
                <motion.article
                  key={item.id}
                  initial={{ opacity: 0, y: 22, scale: 0.985 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: true, amount: 0.25 }}
                  transition={{
                    duration: 0.8,
                    delay: idx * 0.14,
                    ease: EASE_LUXURY,
                  }}
                  className="relative rounded-[22px] bg-white border border-[#CBE4F5] shadow-[0_14px_38px_-22px_rgba(39,96,138,0.16)] p-7 sm:p-9 text-center transition-all duration-300 hover:border-[#93C7EA] hover:shadow-[0_18px_42px_-18px_rgba(39,96,138,0.22)]"
                >
                  <CardCornerFiligree position="tl" />
                  <CardCornerFiligree position="br" />

                  <p className="text-xs tracking-[0.2em] uppercase text-[#567895] tabular-nums">
                    {item.indexLabel} · Ceremony Evening
                  </p>

                  <h3 className="mt-3 font-serif text-3xl sm:text-4xl font-medium tracking-[0.08em] text-[#13293D]">
                    {item.title}
                  </h3>

                  <div className="mt-4 inline-flex items-center justify-center gap-2 text-[#9E1B32]">
                    <Clock className="w-4 h-4 stroke-[1.75]" aria-hidden="true" />
                    <span className="font-serif text-2xl sm:text-[28px] font-semibold tabular-nums">
                      {item.time}
                    </span>
                  </div>

                  <div className="my-5 h-px w-16 mx-auto bg-[#CBE4F5]" />

                  <p className="text-sm sm:text-[15px] leading-relaxed text-[#496A85] max-w-xs mx-auto">
                    {item.subtitle}
                  </p>
                </motion.article>
              ))}
            </div>
          </div>
        </section>

        {/* ============================================================ */}
        {/* VENUE SECTION                                                */}
        {/* ============================================================ */}
        <section
          id="venue"
          className="py-14 sm:py-20 px-4 sm:px-6 bg-gradient-to-b from-white via-[#F4FAFE] to-white"
        >
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.85, ease: EASE_LUXURY }}
            className="mx-auto max-w-5xl rounded-[24px] bg-white border border-[#CBE4F5] shadow-[0_20px_50px_-24px_rgba(39,96,138,0.18)] overflow-hidden"
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch">
              {/* Garden Pavilion Watercolor Illustration */}
              <div className="lg:col-span-6 relative min-h-[240px] sm:min-h-[300px] bg-[#EFF7FD] overflow-hidden">
                {!venueImgError ? (
                  <img
                    src={WEDDING_DATA.assets.gardenPavilion}
                    alt="Watercolor illustration of Lala Zaar Marriage Lawn pavilion with white chiffon and red roses"
                    referrerPolicy="no-referrer"
                    onError={() => setVenueImgError(true)}
                    className="w-full h-full object-cover object-center lg:h-full"
                  />
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center p-8 bg-gradient-to-br from-[#E6F3FB] to-white text-center">
                    <MapPin className="w-10 h-10 text-[#9E1B32]" aria-hidden="true" />
                    <p className="mt-3 font-serif text-xl text-[#13293D]">
                      {WEDDING_DATA.venue.name}
                    </p>
                  </div>
                )}
              </div>

              {/* Venue Details & Google Maps Button */}
              <div className="lg:col-span-6 relative p-7 sm:p-10 lg:p-12 flex flex-col justify-center items-center text-center">
                <div className="w-12 h-12 rounded-full bg-[#EFF7FD] border border-[#CBE4F5] flex items-center justify-center text-[#9E1B32]">
                  <MapPin className="w-5 h-5 stroke-[1.75]" aria-hidden="true" />
                </div>

                <p className="mt-4 text-xs tracking-[0.22em] uppercase text-[#567895]">
                  Venue &amp; Directions
                </p>

                <h2 className="mt-2 font-serif text-2xl sm:text-3xl font-semibold tracking-[0.04em] text-[#13293D] text-balance">
                  {WEDDING_DATA.venue.name}
                </h2>

                <p className="mt-2 text-sm sm:text-base text-[#496A85] max-w-sm">
                  {WEDDING_DATA.venue.location}
                </p>

                <SkyRoseDivider className="my-6" />

                <a
                  href={WEDDING_DATA.venue.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2.5 min-h-[48px] px-7 py-3 rounded-full bg-[#1D405B] text-white text-sm font-medium tracking-[0.06em] shadow-[0_10px_24px_-10px_rgba(19,41,61,0.45)] hover:bg-[#13293D] transition-all duration-200 whitespace-nowrap shrink-0"
                >
                  <MapPin className="w-4 h-4 stroke-[1.8]" aria-hidden="true" />
                  <span>View Location</span>
                  <ExternalLink className="w-3.5 h-3.5 opacity-80" aria-hidden="true" />
                </a>
              </div>
            </div>
          </motion.div>
        </section>

        {/* ============================================================ */}
        {/* RSVP SECTION                                                 */}
        {/* ============================================================ */}
        <section id="rsvp" className="py-14 sm:py-20 px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.85, ease: EASE_LUXURY }}
            className="relative mx-auto max-w-2xl rounded-[24px] bg-gradient-to-b from-[#F5FAFE] to-white border border-[#CBE4F5] shadow-[0_20px_50px_-24px_rgba(39,96,138,0.16)] px-6 py-10 sm:px-12 sm:py-14 text-center overflow-hidden"
          >
            <RedRoseCluster className="absolute -top-7 -right-7 w-28 h-28 sm:w-32 sm:h-32 opacity-75" />

            <div className="relative z-10">
              <p className="text-xs tracking-[0.22em] uppercase text-[#567895]">
                R.S.V.P
              </p>

              <h2 className="mt-3 font-serif italic text-2xl sm:text-3xl font-medium text-[#13293D] text-balance">
                {WEDDING_DATA.rsvp.heading}
              </h2>

              <SkyRoseDivider className="my-6" />

              <p className="font-serif text-2xl sm:text-[28px] font-medium text-[#1D405B]">
                {WEDDING_DATA.rsvp.host}
              </p>

              <p className="mt-1.5 text-base sm:text-lg font-medium tracking-[0.08em] text-[#496A85] tabular-nums">
                {WEDDING_DATA.rsvp.phoneDisplay}
              </p>

              {/* Functional Call & WhatsApp RSVP Buttons */}
              <div className="mt-8 flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3.5 sm:gap-4">
                <a
                  href={WEDDING_DATA.rsvp.phoneHref}
                  className="inline-flex items-center justify-center gap-2.5 min-h-[48px] px-7 py-3 rounded-full border border-[#8AC4E8] bg-white text-[#1D405B] text-sm font-medium tracking-[0.04em] hover:bg-[#EFF7FD] transition-colors whitespace-nowrap shrink-0"
                >
                  <Phone className="w-4 h-4 stroke-[1.8]" aria-hidden="true" />
                  <span>Call RSVP</span>
                </a>

                <a
                  href={WEDDING_DATA.rsvp.whatsappHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2.5 min-h-[48px] px-7 py-3 rounded-full bg-[#9E1B32] text-white text-sm font-medium tracking-[0.04em] shadow-[0_10px_24px_-8px_rgba(158,27,50,0.45)] hover:bg-[#861529] transition-colors whitespace-nowrap shrink-0"
                >
                  <MessageCircle className="w-4 h-4 stroke-[1.8]" aria-hidden="true" />
                  <span>WhatsApp RSVP</span>
                </a>
              </div>

              {/* Clean share utilities for WhatsApp link distribution */}
              <div className="mt-7 pt-6 border-t border-[#DCEEFB] flex flex-wrap items-center justify-center gap-5 text-xs tracking-[0.08em] uppercase text-[#496A85]">
                <button
                  type="button"
                  onClick={handleCopyLink}
                  className="inline-flex items-center gap-1.5 min-h-[36px] px-2 hover:text-[#9E1B32] transition-colors cursor-pointer whitespace-nowrap shrink-0"
                >
                  {copiedLink ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-[#2E7D5B]" aria-hidden="true" />
                      <span className="text-[#2E7D5B]">Link Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" aria-hidden="true" />
                      <span>Copy Invitation Link</span>
                    </>
                  )}
                </button>

                <span aria-hidden="true" className="text-[#B8DDF3]">
                  ·
                </span>

                <a
                  href={whatsappShareUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 min-h-[36px] px-2 hover:text-[#9E1B32] transition-colors whitespace-nowrap shrink-0"
                >
                  <Share2 className="w-3.5 h-3.5" aria-hidden="true" />
                  <span>Share via WhatsApp</span>
                </a>
              </div>
            </div>
          </motion.div>
        </section>

        {/* ============================================================ */}
        {/* FINAL CLOSING SECTION                                        */}
        {/* ============================================================ */}
        <footer className="relative pt-10 pb-20 sm:pt-14 sm:pb-24 px-4 sm:px-6 text-center overflow-hidden">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.9, ease: EASE_LUXURY }}
            className="mx-auto max-w-2xl"
          >
            <RedRoseSpray className="w-full max-w-[360px] h-28 sm:h-36 opacity-90" />

            <p className="mt-4 font-serif italic text-xl sm:text-2xl leading-relaxed text-[#496A85] whitespace-pre-line">
              {WEDDING_DATA.closing.message}
            </p>

            <div className="mt-6 font-serif text-3xl sm:text-4xl font-medium text-[#13293D]">
              <span>{WEDDING_DATA.couple.bride}</span>
              <span className="mx-3 italic text-[#9E1B32]">&amp;</span>
              <span>{WEDDING_DATA.couple.groom}</span>
            </div>

            <p className="mt-3 text-xs tracking-[0.2em] uppercase text-[#567895] tabular-nums">
              {WEDDING_DATA.brand.english} · {WEDDING_DATA.date.full}
            </p>

            <div className="mt-8">
              <button
                type="button"
                onClick={onReplayCard}
                className="inline-flex items-center justify-center gap-2 min-h-[40px] px-5 py-2 rounded-full border border-[#CBE4F5] bg-white/90 text-xs font-medium tracking-[0.1em] uppercase text-[#496A85] hover:text-[#9E1B32] hover:border-[#E5B4BE] transition-colors cursor-pointer whitespace-nowrap shrink-0"
              >
                <RotateCcw className="w-3.5 h-3.5" aria-hidden="true" />
                <span>Replay Opening Card</span>
              </button>
            </div>
          </motion.div>
        </footer>
      </main>

      {/* Optional subtle bottom-right ambient music control (never auto-plays with sound) */}
      <button
        type="button"
        onClick={onToggleAudio}
        aria-label={isAudioPlaying ? 'Pause ambient melody' : 'Play ambient melody'}
        title={isAudioPlaying ? 'Pause ambient melody' : 'Play ambient melody'}
        className="fixed bottom-5 right-5 z-30 w-11 h-11 rounded-full bg-white/92 backdrop-blur-md border border-[#CBE4F5] shadow-[0_8px_22px_-8px_rgba(39,96,138,0.28)] flex items-center justify-center text-[#1D405B] hover:text-[#9E1B32] hover:border-[#93C7EA] transition-colors cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#3C84B4]"
      >
        {isAudioPlaying ? (
          <Volume2 className="w-4 h-4 text-[#9E1B32]" aria-hidden="true" />
        ) : (
          <VolumeX className="w-4 h-4" aria-hidden="true" />
        )}
      </button>
    </motion.div>
  );
}
