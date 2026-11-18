import { useEffect, useRef } from 'react';

interface Petal {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  rotation: number;
  rotationSpeed: number;
  swayPhase: number;
  swaySpeed: number;
  opacity: number;
  hue: 'crimson' | 'rose' | 'blush';
  kind: 'petal' | 'mote';
}

interface PetalCanvasProps {
  burstKey?: number;
  density?: 'ambient' | 'subtle';
}

const PETAL_COLORS: Record<Petal['hue'], string> = {
  crimson: 'rgba(158, 27, 50, ',
  rose: 'rgba(190, 36, 61, ',
  blush: 'rgba(220, 108, 126, ',
};

export function PetalCanvas({ burstKey = 0, density = 'ambient' }: PetalCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const petalsRef = useRef<Petal[]>([]);

  useEffect(() => {
    const prefersReducedMotion =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId = 0;
    let width = window.innerWidth;
    let height = window.innerHeight;

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

    const createParticle = (startTop = false, isBurst = false): Petal => {
      const isMote = !isBurst && Math.random() < 0.36;
      const hues: Petal['hue'][] = ['crimson', 'rose', 'blush'];
      const hue = hues[Math.floor(Math.random() * hues.length)];

      if (isBurst) {
        const angle = Math.random() * Math.PI * 2;
        const speed = 1.4 + Math.random() * 2.8;
        return {
          x: width * 0.5 + (Math.random() - 0.5) * 90,
          y: height * 0.48 + (Math.random() - 0.5) * 70,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed - 0.8,
          size: 7 + Math.random() * 7,
          rotation: Math.random() * Math.PI * 2,
          rotationSpeed: (Math.random() - 0.5) * 0.04,
          swayPhase: Math.random() * Math.PI * 2,
          swaySpeed: 0.015 + Math.random() * 0.02,
          opacity: 0.72 + Math.random() * 0.25,
          hue,
          kind: 'petal',
        };
      }

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

    const baseCount =
      density === 'subtle'
        ? Math.min(14, Math.max(8, Math.floor(width / 110)))
        : Math.min(22, Math.max(11, Math.floor(width / 75)));

    if (petalsRef.current.length === 0) {
      petalsRef.current = Array.from({ length: baseCount }, () => createParticle(false));
    }

    const drawPetal = (p: Petal) => {
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

      const list = petalsRef.current;
      for (let i = list.length - 1; i >= 0; i -= 1) {
        const p = list[i];
        p.swayPhase += p.swaySpeed;
        const sway = Math.sin(p.swayPhase) * (p.kind === 'mote' ? 0.12 : 0.35);

        // Dampen burst horizontal velocity smoothly into natural drift
        p.vx *= 0.992;
        if (p.vy < 0.35 && p.kind === 'petal') {
          p.vy += 0.035;
        }

        p.x += p.vx + sway;
        p.y += p.vy;
        p.rotation += p.rotationSpeed;

        drawPetal(p);

        if (p.y > height + 36 || p.x < -48 || p.x > width + 48) {
          if (list.length > baseCount) {
            list.splice(i, 1);
          } else {
            list[i] = createParticle(true);
          }
        }
      }

      animationId = window.requestAnimationFrame(tick);
    };

    animationId = window.requestAnimationFrame(tick);

    return () => {
      window.cancelAnimationFrame(animationId);
      window.removeEventListener('resize', setSize);
    };
  }, [density]);

  // Release a soft burst of rose petals when burstKey increments
  useEffect(() => {
    if (burstKey <= 0) return;
    const prefersReducedMotion =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const width = window.innerWidth;
    const height = window.innerHeight;
    const hues: Petal['hue'][] = ['crimson', 'rose', 'blush'];

    const burstPetals: Petal[] = Array.from({ length: 24 }, () => {
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

    petalsRef.current.push(...burstPetals);
  }, [burstKey]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-20"
    />
  );
}
