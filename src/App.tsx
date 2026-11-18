import { useEffect, useState } from 'react';
import { AnimatePresence } from 'motion/react';
import { OpeningCard } from './components/OpeningCard';
import { MainInvitation } from './components/MainInvitation';
import { PetalCanvas } from './components/PetalCanvas';
import { ambientAudio } from './utils/ambientAudio';

export default function App() {
  const [isOpened, setIsOpened] = useState(false);
  const [burstKey, setBurstKey] = useState(0);
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);

  useEffect(() => {
    return () => {
      ambientAudio.stop();
    };
  }, []);

  const handleOpenStart = () => {
    setBurstKey((prev) => prev + 1);
  };

  const handleOpenComplete = () => {
    setIsOpened(true);
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
  };

  const handleReplayCard = () => {
    setIsOpened(false);
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
  };

  const handleToggleAudio = () => {
    if (ambientAudio.isPlaying()) {
      ambientAudio.stop();
      setIsAudioPlaying(false);
    } else {
      const started = ambientAudio.start();
      setIsAudioPlaying(started);
    }
  };

  return (
    <div className="relative min-h-screen w-full bg-[#F9FCFF] text-[#13293D]">
      <PetalCanvas burstKey={burstKey} density={isOpened ? 'subtle' : 'ambient'} />

      <AnimatePresence mode="wait">
        {!isOpened ? (
          <OpeningCard
            key="opening-card"
            onOpenStart={handleOpenStart}
            onOpenComplete={handleOpenComplete}
          />
        ) : (
          <MainInvitation
            key="main-invitation"
            isAudioPlaying={isAudioPlaying}
            onToggleAudio={handleToggleAudio}
            onReplayCard={handleReplayCard}
            onDateRevealed={handleOpenStart}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
