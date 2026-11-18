import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { Sparkles } from 'lucide-react';

interface ScratchDateRevealProps {
  children: React.ReactNode;
  onRevealed?: () => void;
}

export function ScratchDateReveal({ children, onRevealed }: ScratchDateRevealProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const isDrawingRef = useRef(false);
  const lastPointRef = useRef<{ x: number; y: number } | null>(null);
  const strokeCountRef = useRef(0);
  const [isRevealed, setIsRevealed] = useState(false);

  useEffect(() => {
    if (isRevealed) return;

    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext('2d', { willReadFrequently: true });
    if (!ctx) return;

    const drawCover = () => {
      const rect = container.getBoundingClientRect();
      if (rect.width === 0 || rect.height === 0) return;

      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      canvas.style.width = `${rect.width}px`;
      canvas.style.height = `${rect.height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      // Soft sky-blue & pearlescent white luxury scratch foil
      const grad = ctx.createLinearGradient(0, 0, rect.width, rect.height);
      grad.addColorStop(0, '#E1F0FB');
      grad.addColorStop(0.5, '#F5FAFE');
      grad.addColorStop(1, '#D4E9F9');

      ctx.globalCompositeOperation = 'source-over';
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, rect.width, rect.height);

      // Subtle diagonal silk sheen lines
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.55)';
      ctx.lineWidth = 1;
      for (let i = -rect.height; i < rect.width + rect.height; i += 14) {
        ctx.beginPath();
        ctx.moveTo(i, 0);
        ctx.lineTo(i - rect.height * 0.4, rect.height);
        ctx.stroke();
      }

      // Delicate inner border
      ctx.strokeStyle = 'rgba(138, 196, 232, 0.65)';
      ctx.lineWidth = 1;
      ctx.strokeRect(8, 8, rect.width - 16, rect.height - 16);

      // Prompt text directly on the foil
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillStyle = '#9E1B32';
      ctx.font = 'italic 600 20px "Cormorant Garamond", Georgia, serif';
      ctx.fillText('Scratch Me', rect.width / 2, rect.height / 2 - 14);

      ctx.fillStyle = '#496A85';
      ctx.font = '500 11px "Plus Jakarta Sans", sans-serif';
      ctx.fillText('SWIPE TO REVEAL OUR NIKAH DATE', rect.width / 2, rect.height / 2 + 16);
    };

    drawCover();
    const observer = new ResizeObserver(() => {
      if (!isRevealed) drawCover();
    });
    observer.observe(container);

    return () => observer.disconnect();
  }, [isRevealed]);

  const checkRevealProgress = () => {
    const canvas = canvasRef.current;
    if (!canvas || isRevealed) return;
    const ctx = canvas.getContext('2d', { willReadFrequently: true });
    if (!ctx) return;

    const { width, height } = canvas;
    if (width === 0 || height === 0) return;

    const sample = ctx.getImageData(0, 0, width, height).data;
    let transparentPixels = 0;
    const stride = 32; // Sample every 8th pixel for instant performance
    let totalSampled = 0;

    for (let i = 3; i < sample.length; i += stride) {
      totalSampled += 1;
      if (sample[i] < 60) transparentPixels += 1;
    }

    if (totalSampled > 0 && transparentPixels / totalSampled >= 0.34) {
      setIsRevealed(true);
      onRevealed?.();
    }
  };

  const scratchAt = (clientX: number, clientY: number) => {
    const canvas = canvasRef.current;
    if (!canvas || isRevealed) return;
    const ctx = canvas.getContext('2d', { willReadFrequently: true });
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const x = clientX - rect.left;
    const y = clientY - rect.top;

    ctx.globalCompositeOperation = 'destination-out';
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.lineWidth = 42;

    if (lastPointRef.current) {
      ctx.beginPath();
      ctx.moveTo(lastPointRef.current.x, lastPointRef.current.y);
      ctx.lineTo(x, y);
      ctx.stroke();
    } else {
      ctx.beginPath();
      ctx.arc(x, y, 21, 0, Math.PI * 2);
      ctx.fill();
    }

    lastPointRef.current = { x, y };
    strokeCountRef.current += 1;
    if (strokeCountRef.current % 6 === 0) {
      checkRevealProgress();
    }
  };

  const handleInstantReveal = () => {
    if (isRevealed) return;
    setIsRevealed(true);
    onRevealed?.();
  };

  return (
    <div ref={containerRef} className="relative overflow-hidden rounded-[16px]">
      {children}

      <AnimatePresence>
        {!isRevealed && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 1.02 }}
            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-0 z-20 flex flex-col items-center justify-end"
          >
            <canvas
              ref={canvasRef}
              aria-label="Scratch off veil to reveal wedding date"
              onPointerDown={(e) => {
                isDrawingRef.current = true;
                e.currentTarget.setPointerCapture(e.pointerId);
                scratchAt(e.clientX, e.clientY);
              }}
              onPointerMove={(e) => {
                if (!isDrawingRef.current) return;
                scratchAt(e.clientX, e.clientY);
              }}
              onPointerUp={() => {
                isDrawingRef.current = false;
                lastPointRef.current = null;
                checkRevealProgress();
              }}
              onPointerCancel={() => {
                isDrawingRef.current = false;
                lastPointRef.current = null;
              }}
              className="absolute inset-0 w-full h-full cursor-crosshair touch-none"
            />

            {/* Accessible 1-tap reveal fallback at bottom of scratch foil */}
            <button
              type="button"
              onClick={handleInstantReveal}
              className="relative z-30 mb-3 inline-flex items-center gap-1.5 min-h-[34px] px-4 py-1 rounded-full bg-white/90 border border-[#B8DDF3] text-[11px] font-medium tracking-[0.12em] uppercase text-[#1D405B] shadow-sm hover:text-[#9E1B32] hover:border-[#E5B4BE] transition-colors cursor-pointer whitespace-nowrap shrink-0"
            >
              <Sparkles className="w-3 h-3 text-[#9E1B32]" aria-hidden="true" />
              <span>Tap to Reveal</span>
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
