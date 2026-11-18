import { useState } from 'react';
import { WEDDING_DATA } from '../config/weddingConfig';

export function RedRoseSpray({ className = '' }: { className?: string }) {
  const [imgError, setImgError] = useState(false);

  if (imgError) {
    return (
      <div className={`flex items-center justify-center py-3 ${className}`} aria-hidden="true">
        <SkyRoseDivider />
      </div>
    );
  }

  return (
    <div
      className={`relative mx-auto overflow-hidden pointer-events-none select-none ${className}`}
      aria-hidden="true"
    >
      <div
        className="w-full h-full"
        style={{
          maskImage:
            'radial-gradient(ellipse 84% 80% at 50% 50%, rgba(0,0,0,1) 58%, rgba(0,0,0,0) 98%)',
          WebkitMaskImage:
            'radial-gradient(ellipse 84% 80% at 50% 50%, rgba(0,0,0,1) 58%, rgba(0,0,0,0) 98%)',
        }}
      >
        <img
          src={WEDDING_DATA.assets.roseBanner}
          alt=""
          referrerPolicy="no-referrer"
          onError={() => setImgError(true)}
          className="w-full h-full object-cover scale-[1.24] mix-blend-multiply"
        />
      </div>
    </div>
  );
}

export function RedRoseCluster({
  className = '',
  flip = false,
}: {
  className?: string;
  flip?: boolean;
}) {
  const [imgError, setImgError] = useState(false);

  if (imgError) {
    return (
      <svg
        viewBox="0 0 64 64"
        fill="none"
        aria-hidden="true"
        className={`w-16 h-16 opacity-60 ${flip ? '-scale-x-100' : ''} ${className}`}
      >
        <circle cx="32" cy="28" r="10" fill="#9E1B32" fillOpacity="0.2" />
        <circle cx="32" cy="28" r="6" fill="#9E1B32" fillOpacity="0.4" />
        <path d="M32 38 C32 48, 24 54, 18 56" stroke="#4D7C5F" strokeWidth="1.5" />
      </svg>
    );
  }

  return (
    <div
      className={`relative overflow-hidden pointer-events-none select-none ${
        flip ? '-scale-x-100' : ''
      } ${className}`}
      aria-hidden="true"
    >
      <div
        className="w-full h-full"
        style={{
          maskImage:
            'radial-gradient(circle at 50% 50%, rgba(0,0,0,1) 46%, rgba(0,0,0,0) 88%)',
          WebkitMaskImage:
            'radial-gradient(circle at 50% 50%, rgba(0,0,0,1) 46%, rgba(0,0,0,0) 88%)',
        }}
      >
        <img
          src={WEDDING_DATA.assets.roseCluster}
          alt=""
          referrerPolicy="no-referrer"
          onError={() => setImgError(true)}
          className="w-full h-full object-cover scale-[1.35] mix-blend-multiply"
        />
      </div>
    </div>
  );
}

export function SkyRoseDivider({ className = '' }: { className?: string }) {
  return (
    <div
      className={`flex items-center justify-center gap-4 w-full max-w-xs mx-auto ${className}`}
      aria-hidden="true"
    >
      <span className="h-px flex-1 bg-gradient-to-r from-transparent via-[#A9D4EE] to-[#7EC0E8]" />
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="shrink-0">
        <path
          d="M12 4.5C13.6 6.7 15.8 7.5 16.4 9.8C17 12.1 14.9 14.4 12 14.4C9.1 14.4 7 12.1 7.6 9.8C8.2 7.5 10.4 6.7 12 4.5Z"
          fill="#9E1B32"
          fillOpacity="0.85"
        />
        <path
          d="M12 7.2C13 8.5 14 9.4 14 10.9C14 12.1 13.1 13 12 13C10.9 13 10 12.1 10 10.9C10 9.4 11 8.5 12 7.2Z"
          fill="#FCECEF"
          fillOpacity="0.4"
        />
        <path
          d="M12 14.5V19.5M12 17C10.3 16.5 9.2 15.6 8.6 14.8M12 17C13.7 16.5 14.8 15.6 15.4 14.8"
          stroke="#4F7963"
          strokeWidth="1.2"
          strokeLinecap="round"
        />
      </svg>
      <span className="h-px flex-1 bg-gradient-to-l from-transparent via-[#A9D4EE] to-[#7EC0E8]" />
    </div>
  );
}

export function CardCornerFiligree({
  position,
}: {
  position: 'tl' | 'tr' | 'bl' | 'br';
}) {
  const rotation =
    position === 'tl'
      ? ''
      : position === 'tr'
      ? 'scale-x-[-1]'
      : position === 'bl'
      ? 'scale-y-[-1]'
      : 'scale-[-1]';

  const posClass =
    position === 'tl'
      ? 'top-3 left-3'
      : position === 'tr'
      ? 'top-3 right-3'
      : position === 'bl'
      ? 'bottom-3 left-3'
      : 'bottom-3 right-3';

  return (
    <svg
      width="32"
      height="32"
      viewBox="0 0 32 32"
      fill="none"
      aria-hidden="true"
      className={`pointer-events-none absolute ${posClass} ${rotation} text-[#8AC4E8] opacity-80`}
    >
      <path
        d="M2 24V7C2 4.23858 4.23858 2 7 2H24"
        stroke="currentColor"
        strokeWidth="1.15"
        strokeLinecap="round"
      />
      <path
        d="M6.5 16V8.5C6.5 7.39543 7.39543 6.5 8.5 6.5H16"
        stroke="#C97A8A"
        strokeWidth="0.9"
        strokeLinecap="round"
        strokeOpacity="0.7"
      />
      <circle cx="6.5" cy="6.5" r="1.5" fill="#9E1B32" fillOpacity="0.55" />
    </svg>
  );
}

export function SparkleAccent({ className = '' }: { className?: string }) {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden="true"
      className={`animate-soft-twinkle ${className}`}
    >
      <path
        d="M8 0.5L9.4 6.6L15.5 8L9.4 9.4L8 15.5L6.6 9.4L0.5 8L6.6 6.6L8 0.5Z"
        fill="#7EC0E8"
        fillOpacity="0.7"
      />
    </svg>
  );
}
