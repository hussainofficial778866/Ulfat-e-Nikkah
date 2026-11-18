// Lightweight Web Audio ambient melody synthesizer (no external files, zero network dependency)
class AmbientMelodyPlayer {
  private ctx: AudioContext | null = null;
  private timerId: number | null = null;
  private active = false;
  private step = 0;

  // Soft Cmaj9 / Fmaj7 peaceful arpeggio frequencies (Hz)
  private readonly sequence = [
    261.63, 329.63, 392.0, 493.88, 587.33, 493.88, 392.0, 329.63,
    174.61, 261.63, 349.23, 440.0, 523.25, 440.0, 349.23, 261.63,
    220.0, 329.63, 392.0, 493.88, 523.25, 493.88, 392.0, 329.63,
    196.0, 293.66, 392.0, 493.88, 587.33, 493.88, 392.0, 293.66,
  ];

  private playNote(freq: number) {
    if (!this.ctx || !this.active) return;

    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const harmonic = this.ctx.createOscillator();
    const filter = this.ctx.createBiquadFilter();
    const gain = this.ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, now);

    harmonic.type = 'triangle';
    harmonic.frequency.setValueAtTime(freq * 2, now);

    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(1100, now);

    const harmonicGain = this.ctx.createGain();
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

  public start(): boolean {
    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
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

  public stop() {
    this.active = false;
    if (this.timerId !== null) {
      window.clearInterval(this.timerId);
      this.timerId = null;
    }
  }

  public isPlaying(): boolean {
    return this.active;
  }
}

export const ambientAudio = new AmbientMelodyPlayer();
