import { WEDDING_DATA } from './wedding-config.js';

// ============================================================
// 1. OPTIONAL WEB AUDIO AMBIENT MELODY (NO EXTERNAL AUDIO FILE)
// ============================================================
class AmbientMelodyPlayer {
  constructor() {
    /** @type {AudioContext | null} */
    this.ctx = null;
    /** @type {number | null} */
    this.timerId = null;
    this.active = false;
    this.step = 0;
    this.sequence = [
      261.63, 329.63, 392.0, 493.88, 587.33, 493.88, 392.0, 329.63,
      174.61, 261.63, 349.23, 440.0, 523.25, 440.0, 349.23, 261.63,
      220.0, 329.63, 392.0, 493.88, 523.25, 493.88, 392.0, 329.63,
      196.0, 293.66, 392.0, 493.88, 587.33, 493.88, 392.0, 293.66,
    ];
  }

  /** @param {number} freq */
  playNote(freq) {
    if (!this.ctx || !this.active) return;

    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const harmonic = this.ctx.createOscillator();
    const filter = this.ctx.createBiquadFilter();
    const gain = this.ctx.createGain();
    const harmonicGain = this.ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, now);

    harmonic.type = 'triangle';
    harmonic.frequency.setValueAtTime(freq * 2, now);

    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(1100, now);

    harmonicGain.gain.setValueAtTime(0.08, now);
    gain.gain.setValueAtTime(0.0001, now);
    gain.gain.exponentialRampToValueAtTime(0.045, now + 0.08);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 2.4);

    osc.connect(filter);
    harmonic.connect(harmonicGain);
    harmonicGain.connect(filter);
    filter.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start(now);
    harmonic.start(now);
    osc.stop(now + 2.5);
    harmonic.stop(now + 2.5);
  }

  start() {
    try {
      const AudioCtx = window.AudioContext || /** @type {any} */ (window).webkitAudioContext;
      if (!AudioCtx) return false;

      if (!this.ctx) {
        this.ctx = new AudioCtx();
      }
      if (this.ctx.state === 'suspended') {
        void this.ctx.resume();
      }

      if (this.active) return true;
      this.active = true;

      const tick = () => {
        if (!this.active) return;
        const freq = this.sequence[this.step % this.sequence.length];
        this.playNote(freq);
        this.step += 1;
      };

      tick();
      this.timerId = window.setInterval(tick, 950);
      return true;
    } catch {
      this.active = false;
      return false;
    }
  }

  stop() {
    this.active = false;
    if (this.timerId !== null) {
      window.clearInterval(this.timerId);
      this.timerId = null;
    }
  }

  isPlaying() {
    return this.active;
  }
}

const ambientAudio = new AmbientMelodyPlayer();

// ============================================================
// 2. FLOATING ROSE PETAL & LUMINOUS PARTICLE CANVAS
// ============================================================
function initPetalCanvas() {
  const canvas = /** @type {HTMLCanvasElement | null} */ (document.getElementById('petal-canvas'));
  if (!canvas) return { burst: () => {}, setDensity: () => {} };

  const prefersReducedMotion =
    window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReducedMotion) return { burst: () => {}, setDensity: () => {} };

  const ctx = canvas.getContext('2d');
  if (!ctx) return { burst: () => {}, setDensity: () => {} };

  const PETAL_COLORS = {
    crimson: 'rgba(158, 27, 50, ',
    rose: 'rgba(190, 36, 61, ',
    blush: 'rgba(220, 108, 126, ',
  };

  let width = window.innerWidth;
  let height = window.innerHeight;
  let densityMode = 'ambient';
  /** @type {Array<any>} */
  let particles = [];

  const getBaseCount = () =>
    densityMode === 'subtle'
      ? Math.min(14, Math.max(8, Math.floor(width / 110)))
      : Math.min(22, Math.max(11, Math.floor(width / 75)));

  const createParticle = (startTop = false) => {
    const isMote = Math.random() < 0.36;
    const hues = /** @type {const} */ (['crimson', 'rose', 'blush']);
    const hue = hues[Math.floor(Math.random() * hues.length)];
    return {
      x: Math.random() * width,
      y: startTop ? -24 - Math.random() * 60 : Math.random() * height,
      vx: (Math.random() - 0.45) * 0.28,
      vy: isMote ? 0.18 + Math.random() * 0.25 : 0.35 + Math.random() * 0.48,
      size: isMote ? 1.5 + Math.random() * 2 : 6 + Math.random() * 6.5,
      rotation: Math.random() * Math.PI * 2,
      rotationSpeed: (Math.random() - 0.5) * 0.012,
      swayPhase: Math.random() * Math.PI * 2,
      swaySpeed: 0.008 + Math.random() * 0.012,
      opacity: isMote ? 0.3 + Math.random() * 0.35 : 0.38 + Math.random() * 0.34,
      hue,
      kind: isMote ? 'mote' : 'petal',
    };
  };

  const setSize = () => {
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    width = window.innerWidth;
    height = window.innerHeight;
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  };

  setSize();
  window.addEventListener('resize', setSize);
  particles = Array.from({ length: getBaseCount() }, () => createParticle(false));

  const drawPetal = (p) => {
    ctx.save();
    ctx.translate(p.x, p.y);

    if (p.kind === 'mote') {
      ctx.beginPath();
      ctx.arc(0, 0, p.size, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(126, 192, 232, ${p.opacity})`;
      ctx.fill();
      ctx.restore();
      return;
    }

    ctx.rotate(p.rotation);
    const s = p.size;

    ctx.beginPath();
    ctx.moveTo(0, -s * 0.65);
    ctx.bezierCurveTo(s * 0.72, -s * 0.55, s * 0.8, s * 0.42, 0, s * 0.75);
    ctx.bezierCurveTo(-s * 0.8, s * 0.42, -s * 0.72, -s * 0.55, 0, -s * 0.65);
    ctx.closePath();

    const grad = ctx.createRadialGradient(-s * 0.15, -s * 0.15, s * 0.05, 0, 0, s);
    const prefix = PETAL_COLORS[p.hue];
    grad.addColorStop(0, `${prefix}${Math.min(1, p.opacity + 0.12)})`);
    grad.addColorStop(1, `${prefix}${Math.max(0.15, p.opacity - 0.15)})`);

    ctx.fillStyle = grad;
    ctx.fill();
    ctx.restore();
  };

  const tick = () => {
    ctx.clearRect(0, 0, width, height);
    const baseCount = getBaseCount();

    for (let i = particles.length - 1; i >= 0; i -= 1) {
      const p = particles[i];
      p.swayPhase += p.swaySpeed;
      const sway = Math.sin(p.swayPhase) * (p.kind === 'mote' ? 0.12 : 0.35);

      p.vx *= 0.992;
      if (p.vy < 0.35 && p.kind === 'petal') {
        p.vy += 0.035;
      }

      p.x += p.vx + sway;
      p.y += p.vy;
      p.rotation += p.rotationSpeed;

      drawPetal(p);

      if (p.y > height + 36 || p.x < -48 || p.x > width + 48) {
        if (particles.length > baseCount) {
          particles.splice(i, 1);
        } else {
          particles[i] = createParticle(true);
        }
      }
    }

    window.requestAnimationFrame(tick);
  };

  window.requestAnimationFrame(tick);

  return {
    burst: () => {
      const hues = /** @type {const} */ (['crimson', 'rose', 'blush']);
      const burstItems = Array.from({ length: 24 }, () => {
        const angle = Math.random() * Math.PI * 2;
        const speed = 1.6 + Math.random() * 3.1;
        return {
          x: width * 0.5 + (Math.random() - 0.5) * 100,
          y: height * 0.45 + (Math.random() - 0.5) * 80,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed - 1.1,
          size: 6.5 + Math.random() * 6.5,
          rotation: Math.random() * Math.PI * 2,
          rotationSpeed: (Math.random() - 0.5) * 0.045,
          swayPhase: Math.random() * Math.PI * 2,
          swaySpeed: 0.015 + Math.random() * 0.02,
          opacity: 0.72 + Math.random() * 0.22,
          hue: hues[Math.floor(Math.random() * hues.length)],
          kind: 'petal',
        };
      });
      particles.push(...burstItems);
    },
    setDensity: (mode) => {
      densityMode = mode;
    },
  };
}

// ============================================================
// 3. HYDRATE WEDDING DATA FROM CENTRALIZED CONFIG
// ============================================================
function hydrateWeddingContent() {
  const setText = (selector, value) => {
    document.querySelectorAll(selector).forEach((el) => {
      el.textContent = value;
    });
  };

  setText('[data-bind="brand-urdu"]', WEDDING_DATA.brand.urdu);
  setText('[data-bind="brand-english"]', WEDDING_DATA.brand.english);
  setText('[data-bind="bismillah"]', WEDDING_DATA.brand.bismillah);
  setText('[data-bind="opening-kicker"]', WEDDING_DATA.brand.openingKicker);
  setText('[data-bind="blessings-lead"]', WEDDING_DATA.brand.blessingsLead);

  setText('[data-bind="bride"]', WEDDING_DATA.couple.bride);
  setText('[data-bind="groom"]', WEDDING_DATA.couple.groom);

  setText('[data-bind="date-full"]', WEDDING_DATA.date.full);
  setText('[data-bind="date-weekday"]', WEDDING_DATA.date.weekday);
  setText('[data-bind="date-day"]', WEDDING_DATA.date.day);
  setText('[data-bind="date-month"]', WEDDING_DATA.date.month);
  setText('[data-bind="date-year"]', WEDDING_DATA.date.year);

  setText('[data-bind="hero-meta"]', `${WEDDING_DATA.date.full} · ${WEDDING_DATA.venue.name}`);
  setText('[data-bind="closing-meta"]', `${WEDDING_DATA.brand.english} · ${WEDDING_DATA.date.full}`);
  setText('[data-bind="closing-message"]', WEDDING_DATA.closing.message);

  setText('[data-bind="venue-name"]', WEDDING_DATA.venue.name);
  setText('[data-bind="venue-location"]', WEDDING_DATA.venue.location);
  const mapBtn = /** @type {HTMLAnchorElement | null} */ (document.getElementById('venue-map-link'));
  if (mapBtn) mapBtn.href = WEDDING_DATA.venue.mapsUrl;

  setText('[data-bind="rsvp-heading"]', WEDDING_DATA.rsvp.heading);
  setText('[data-bind="rsvp-host"]', WEDDING_DATA.rsvp.host);
  setText('[data-bind="rsvp-phone"]', WEDDING_DATA.rsvp.phoneDisplay);

  const callBtn = /** @type {HTMLAnchorElement | null} */ (document.getElementById('rsvp-call-link'));
  if (callBtn) callBtn.href = WEDDING_DATA.rsvp.phoneHref;

  const waBtn = /** @type {HTMLAnchorElement | null} */ (document.getElementById('rsvp-whatsapp-link'));
  if (waBtn) waBtn.href = WEDDING_DATA.rsvp.whatsappHref;

  const shareWaBtn = /** @type {HTMLAnchorElement | null} */ (document.getElementById('share-whatsapp-link'));
  if (shareWaBtn) {
    shareWaBtn.href = `https://wa.me/?text=${encodeURIComponent(
      `With the blessings of love and family, you are cordially invited to the Nikah of ${WEDDING_DATA.couple.bride} & ${WEDDING_DATA.couple.groom} on ${WEDDING_DATA.date.full} at ${WEDDING_DATA.venue.name}, ${WEDDING_DATA.venue.location}. ${window.location.href}`
    )}`;
  }

  // Poetry lines
  const poetryEl = document.getElementById('poetry-lines');
  if (poetryEl) {
    poetryEl.innerHTML = '';
    WEDDING_DATA.poetry.lines.forEach((line) => {
      const span = document.createElement('span');
      span.textContent = line;
      poetryEl.appendChild(span);
    });
  }

  // Schedule cards
  WEDDING_DATA.schedule.forEach((ev, idx) => {
    setText(`[data-bind="schedule-${idx}-index"]`, ev.indexLabel);
    setText(`[data-bind="schedule-${idx}-title"]`, ev.title);
    setText(`[data-bind="schedule-${idx}-time"]`, ev.time);
    setText(`[data-bind="schedule-${idx}-subtitle"]`, ev.subtitle);
  });

  // Assets & Resilient Fallbacks
  const bindImg = (id, src, fallbackId) => {
    const img = /** @type {HTMLImageElement | null} */ (document.getElementById(id));
    if (!img) return;
    img.src = src;
    img.addEventListener('error', () => {
      img.classList.add('is-hidden');
      if (fallbackId) {
        const fb = document.getElementById(fallbackId);
        if (fb) fb.classList.remove('is-hidden');
      }
    });
  };

  bindImg('joined-hands-img', WEDDING_DATA.assets.joinedHands, 'joined-hands-fallback');
  bindImg('venue-pavilion-img', WEDDING_DATA.assets.gardenPavilion, 'venue-pavilion-fallback');

  document.querySelectorAll('[data-img-src="rose-cluster"]').forEach((el) => {
    const img = /** @type {HTMLImageElement} */ (el);
    img.src = WEDDING_DATA.assets.roseCluster;
    img.addEventListener('error', () => {
      if (img.closest('.rose-cluster')) {
        img.closest('.rose-cluster')?.classList.add('is-hidden');
      }
    });
  });

  document.querySelectorAll('[data-img-src="rose-banner"]').forEach((el) => {
    const img = /** @type {HTMLImageElement} */ (el);
    img.src = WEDDING_DATA.assets.roseBanner;
    img.addEventListener('error', () => {
      const spray = img.closest('.rose-spray');
      if (spray) spray.classList.add('is-hidden');
    });
  });
}

// ============================================================
// 4. SCRATCH ME INTERACTIVE DATE REVEAL
// ============================================================
function initScratchReveal(onRevealed) {
  const container = document.getElementById('scratch-container');
  const overlay = document.getElementById('scratch-overlay');
  const canvas = /** @type {HTMLCanvasElement | null} */ (document.getElementById('scratch-canvas'));
  const tapBtn = document.getElementById('scratch-reveal-btn');

  if (!container || !overlay || !canvas) return;

  const ctx = canvas.getContext('2d', { willReadFrequently: true });
  if (!ctx) return;

  let isRevealed = false;
  let isDrawing = false;
  /** @type {{ x: number; y: number } | null} */
  let lastPoint = null;
  let strokeCount = 0;

  const drawCover = () => {
    if (isRevealed) return;
    const rect = container.getBoundingClientRect();
    if (rect.width === 0 || rect.height === 0) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    canvas.style.width = `${rect.width}px`;
    canvas.style.height = `${rect.height}px`;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    const grad = ctx.createLinearGradient(0, 0, rect.width, rect.height);
    grad.addColorStop(0, '#E1F0FB');
    grad.addColorStop(0.5, '#F5FAFE');
    grad.addColorStop(1, '#D4E9F9');

    ctx.globalCompositeOperation = 'source-over';
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, rect.width, rect.height);

    ctx.strokeStyle = 'rgba(255, 255, 255, 0.55)';
    ctx.lineWidth = 1;
    for (let i = -rect.height; i < rect.width + rect.height; i += 14) {
      ctx.beginPath();
      ctx.moveTo(i, 0);
      ctx.lineTo(i - rect.height * 0.4, rect.height);
      ctx.stroke();
    }

    ctx.strokeStyle = 'rgba(138, 196, 232, 0.65)';
    ctx.lineWidth = 1;
    ctx.strokeRect(8, 8, rect.width - 16, rect.height - 16);

    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillStyle = '#9E1B32';
    ctx.font = 'italic 600 20px "Cormorant Garamond", Georgia, serif';
    ctx.fillText('Scratch Me', rect.width / 2, rect.height / 2 - 14);

    ctx.fillStyle = '#496A85';
    ctx.font = '500 11px "Plus Jakarta Sans", sans-serif';
    ctx.fillText('SWIPE TO REVEAL OUR NIKAH DATE', rect.width / 2, rect.height / 2 + 16);
  };

  const reveal = () => {
    if (isRevealed) return;
    isRevealed = true;
    overlay.classList.add('is-cleared');
    window.setTimeout(() => {
      overlay.classList.add('is-hidden');
    }, 680);
    onRevealed();
  };

  const checkProgress = () => {
    if (isRevealed || canvas.width === 0 || canvas.height === 0) return;
    const sample = ctx.getImageData(0, 0, canvas.width, canvas.height).data;
    let transparentPixels = 0;
    let totalSampled = 0;

    for (let i = 3; i < sample.length; i += 32) {
      totalSampled += 1;
      if (sample[i] < 60) transparentPixels += 1;
    }

    if (totalSampled > 0 && transparentPixels / totalSampled >= 0.34) {
      reveal();
    }
  };

  const scratchAt = (clientX, clientY) => {
    if (isRevealed) return;
    const rect = canvas.getBoundingClientRect();
    const x = clientX - rect.left;
    const y = clientY - rect.top;

    ctx.globalCompositeOperation = 'destination-out';
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.lineWidth = 42;

    if (lastPoint) {
      ctx.beginPath();
      ctx.moveTo(lastPoint.x, lastPoint.y);
      ctx.lineTo(x, y);
      ctx.stroke();
    } else {
      ctx.beginPath();
      ctx.arc(x, y, 21, 0, Math.PI * 2);
      ctx.fill();
    }

    lastPoint = { x, y };
    strokeCount += 1;
    if (strokeCount % 6 === 0) checkProgress();
  };

  canvas.addEventListener('pointerdown', (e) => {
    isDrawing = true;
    canvas.setPointerCapture(e.pointerId);
    scratchAt(e.clientX, e.clientY);
  });

  canvas.addEventListener('pointermove', (e) => {
    if (!isDrawing) return;
    scratchAt(e.clientX, e.clientY);
  });

  const endStroke = () => {
    isDrawing = false;
    lastPoint = null;
    checkProgress();
  };

  canvas.addEventListener('pointerup', endStroke);
  canvas.addEventListener('pointercancel', () => {
    isDrawing = false;
    lastPoint = null;
  });

  if (tapBtn) {
    tapBtn.addEventListener('click', reveal);
  }

  if (typeof ResizeObserver !== 'undefined') {
    const observer = new ResizeObserver(() => drawCover());
    observer.observe(container);
  } else {
    window.addEventListener('resize', drawCover);
  }

  return { redraw: drawCover };
}

// ============================================================
// 5. LIVE COUNTDOWN
// ============================================================
function initCountdown() {
  const grid = document.getElementById('countdown-grid');
  const arrived = document.getElementById('countdown-arrived');
  const daysEl = document.getElementById('cd-days');
  const hoursEl = document.getElementById('cd-hours');
  const minsEl = document.getElementById('cd-mins');
  const secsEl = document.getElementById('cd-secs');

  const update = () => {
    const target = new Date(WEDDING_DATA.date.isoTarget).getTime();
    const diff = target - Date.now();

    if (Number.isNaN(target) || diff <= 0) {
      if (grid) grid.classList.add('is-hidden');
      if (arrived) arrived.classList.remove('is-hidden');
      return;
    }

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((diff / (1000 * 60)) % 60);
    const seconds = Math.floor((diff / 1000) % 60);

    if (daysEl) daysEl.textContent = String(days).padStart(2, '0');
    if (hoursEl) hoursEl.textContent = String(hours).padStart(2, '0');
    if (minsEl) minsEl.textContent = String(minutes).padStart(2, '0');
    if (secsEl) secsEl.textContent = String(seconds).padStart(2, '0');
  };

  update();
  window.setInterval(update, 1000);
}

// ============================================================
// 6. SCROLL REVEAL OBSERVER
// ============================================================
function initScrollReveal() {
  const nodes = document.querySelectorAll('[data-reveal]');
  if (!('IntersectionObserver' in window)) {
    nodes.forEach((n) => n.classList.add('is-visible'));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.18 }
  );

  nodes.forEach((n) => observer.observe(n));
}

// ============================================================
// 7. BOOTSTRAP APPLICATION
// ============================================================
document.addEventListener('DOMContentLoaded', () => {
  hydrateWeddingContent();

  const petals = initPetalCanvas();
  const scratch = initScratchReveal(() => petals.burst());
  initCountdown();
  initScrollReveal();

  const openingScreen = document.getElementById('opening-screen');
  const openingCard = document.getElementById('opening-card');
  const mainInvitation = document.getElementById('main-invitation');
  const replayBtn = document.getElementById('replay-card-btn');
  const copyLinkBtn = document.getElementById('copy-link-btn');
  const audioBtn = document.getElementById('audio-toggle-btn');
  const audioIconOn = document.getElementById('audio-icon-on');
  const audioIconOff = document.getElementById('audio-icon-off');

  let isOpening = false;

  const openInvitation = () => {
    if (isOpening || !openingCard || !openingScreen || !mainInvitation) return;
    isOpening = true;

    openingCard.classList.add('is-opening');
    petals.burst();

    window.setTimeout(() => {
      openingScreen.classList.add('is-fading-out');
    }, 520);

    window.setTimeout(() => {
      openingScreen.classList.add('is-hidden');
      mainInvitation.classList.remove('is-hidden');
      petals.setDensity('subtle');
      window.scrollTo(0, 0);

      window.requestAnimationFrame(() => {
        mainInvitation.classList.add('is-active');
        scratch?.redraw();
      });
    }, 960);
  };

  if (openingCard) {
    openingCard.addEventListener('click', openInvitation);
    openingCard.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        openInvitation();
      }
    });
  }

  if (replayBtn && openingCard && openingScreen && mainInvitation) {
    replayBtn.addEventListener('click', () => {
      isOpening = false;
      mainInvitation.classList.remove('is-active');
      mainInvitation.classList.add('is-hidden');
      openingCard.classList.remove('is-opening');
      openingScreen.classList.remove('is-hidden', 'is-fading-out');
      petals.setDensity('ambient');
      window.scrollTo(0, 0);
    });
  }

  if (copyLinkBtn) {
    const labelSpan = copyLinkBtn.querySelector('[data-copy-label]');
    const iconCopy = copyLinkBtn.querySelector('[data-icon-copy]');
    const iconCheck = copyLinkBtn.querySelector('[data-icon-check]');

    copyLinkBtn.addEventListener('click', async () => {
      try {
        await navigator.clipboard.writeText(window.location.href);
        copyLinkBtn.classList.add('is-copied');
        if (labelSpan) labelSpan.textContent = 'Link Copied';
        iconCopy?.classList.add('is-hidden');
        iconCheck?.classList.remove('is-hidden');

        window.setTimeout(() => {
          copyLinkBtn.classList.remove('is-copied');
          if (labelSpan) labelSpan.textContent = 'Copy Invitation Link';
          iconCopy?.classList.remove('is-hidden');
          iconCheck?.classList.add('is-hidden');
        }, 2600);
      } catch {
        // Clipboard API unavailable in restricted context
      }
    });
  }

  if (audioBtn) {
    audioBtn.addEventListener('click', () => {
      if (ambientAudio.isPlaying()) {
        ambientAudio.stop();
        audioBtn.classList.remove('is-playing');
        audioBtn.setAttribute('aria-label', 'Play ambient melody');
        audioBtn.setAttribute('title', 'Play ambient melody');
        audioIconOn?.classList.add('is-hidden');
        audioIconOff?.classList.remove('is-hidden');
      } else {
        const started = ambientAudio.start();
        if (started) {
          audioBtn.classList.add('is-playing');
          audioBtn.setAttribute('aria-label', 'Pause ambient melody');
          audioBtn.setAttribute('title', 'Pause ambient melody');
          audioIconOn?.classList.remove('is-hidden');
          audioIconOff?.classList.add('is-hidden');
        }
      }
    });
  }
});
