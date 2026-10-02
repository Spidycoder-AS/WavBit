import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Radio, Zap, ShieldCheck, Activity, Sparkles, CheckCircle2, Cpu, Volume2, VolumeX } from 'lucide-react';
import { initGGWave } from '../audio/ggwaveManager';

interface SoundSimulatorCardProps {
  onStartSend?: () => void;
  onStartReceive?: () => void;
}

export function SoundSimulatorCard({ onStartSend, onStartReceive }: SoundSimulatorCardProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  
  const [activeMode, setActiveMode] = useState<'audible' | 'fast' | 'ultrasound'>('audible');
  const [isPlayingPulse, setIsPlayingPulse] = useState(false);
  const [pulseCount, setPulseCount] = useState(0);
  const [audioMuted, setAudioMuted] = useState(false);
  const [pulseMessage, setPulseMessage] = useState<string>('WavBit Demo Packet');

  // Real-time animation ref state
  const animationFrameRef = useRef<number | null>(null);
  const activeAudioContextRef = useRef<AudioContext | null>(null);

  // Clean up any playing audio context on unmount
  useEffect(() => {
    return () => {
      if (activeAudioContextRef.current && activeAudioContextRef.current.state !== 'closed') {
        activeAudioContextRef.current.close().catch(() => {});
      }
    };
  }, []);

  // Play REAL GGWave acoustic transmission sound matching the selected preset!
  const triggerAcousticPulse = async () => {
    if (isPlayingPulse) return;
    setIsPlayingPulse(true);
    setPulseCount((prev) => prev + 1);

    let durationMs = 1400; // default duration fallback

    if (!audioMuted) {
      try {
        const { instance, inst } = await initGGWave();

        // Select protocol ID based on mode
        let protocolId = instance?.ProtocolId?.GGWAVE_PROTOCOL_AUDIBLE_FAST ?? 1;
        if (activeMode === 'fast') {
          protocolId = instance?.ProtocolId?.GGWAVE_PROTOCOL_AUDIBLE_FASTEST ?? 2;
        } else if (activeMode === 'ultrasound') {
          protocolId = instance?.ProtocolId?.GGWAVE_PROTOCOL_ULTRASOUND_FAST ?? 4;
        }

        // Encode payload "WavBit" with volume 25
        const txBytes = instance.encode(inst, pulseMessage, protocolId, 25);
        if (txBytes && txBytes.byteLength > 0) {
          const floatArray = new Float32Array(txBytes.buffer, txBytes.byteOffset, txBytes.byteLength / 4);
          durationMs = (floatArray.length / 48000) * 1000;

          const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
          const ctx = new AudioCtx({ sampleRate: 48000 });
          activeAudioContextRef.current = ctx;

          if (ctx.state === 'suspended') {
            await ctx.resume();
          }

          const audioBuffer = ctx.createBuffer(1, floatArray.length, 48000);
          audioBuffer.copyToChannel(floatArray, 0);

          const source = ctx.createBufferSource();
          source.buffer = audioBuffer;
          source.connect(ctx.destination);
          
          source.onended = () => {
            setIsPlayingPulse(false);
          };

          source.start();
        } else {
          fallbackSynthPulse();
        }
      } catch (e) {
        console.warn('GGWave encode failed, using synth fallback:', e);
        fallbackSynthPulse();
      }
    }

    // Reset pulse indicator state after duration
    setTimeout(() => {
      setIsPlayingPulse(false);
    }, Math.max(durationMs, 1200));
  };

  // Realistic fallback multi-tone FSK burst if Web Audio / GGWave fails or muted
  const fallbackSynthPulse = () => {
    try {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      const ctx = new AudioCtx();
      activeAudioContextRef.current = ctx;

      const baseFreqMap = { audible: 1800, fast: 2600, ultrasound: 16500 };
      const baseFreq = baseFreqMap[activeMode];
      const toneCount = 10;
      const toneDuration = 0.12; // 120ms per tone -> ~1.2s total transmission sound

      for (let i = 0; i < toneCount; i++) {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        // Frequency shift per symbol (FSK acoustic burst)
        const freqShift = ((i * 17) % 7) * 80;
        osc.type = 'sine';
        osc.frequency.setValueAtTime(baseFreq + freqShift, ctx.currentTime + i * toneDuration);

        gain.gain.setValueAtTime(0.05, ctx.currentTime + i * toneDuration);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + (i + 1) * toneDuration);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(ctx.currentTime + i * toneDuration);
        osc.stop(ctx.currentTime + (i + 1) * toneDuration);
      }
    } catch (e) {
      console.warn('Fallback synth error', e);
    }
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let phase = 0;
    let particleOffset = 0;

    const render = () => {
      const width = canvas.width;
      const height = canvas.height;
      
      ctx.clearRect(0, 0, width, height);

      // Subtle background grid lines
      ctx.strokeStyle = 'rgba(59, 130, 246, 0.05)';
      ctx.lineWidth = 1;
      const gridSpacing = 20;
      for (let x = 0; x < width; x += gridSpacing) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }
      for (let y = 0; y < height; y += gridSpacing) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      // Draw primary acoustic waveform
      const amplitude = isPlayingPulse ? 38 : 18;
      const frequency = activeMode === 'fast' ? 0.09 : activeMode === 'ultrasound' ? 0.14 : 0.05;
      const speed = isPlayingPulse ? 0.28 : 0.08;

      ctx.beginPath();
      ctx.lineWidth = isPlayingPulse ? 3.5 : 2;

      // Create dynamic gradient line
      const grad = ctx.createLinearGradient(0, 0, width, 0);
      grad.addColorStop(0, '#3b82f6');
      grad.addColorStop(0.5, isPlayingPulse ? '#a855f7' : '#06b6d4');
      grad.addColorStop(1, '#6366f1');
      ctx.strokeStyle = grad;

      ctx.moveTo(0, height / 2);
      for (let x = 0; x < width; x++) {
        // Multi-harmonic FSK waveform calculation
        const fskMod = isPlayingPulse ? Math.sin(x * 0.02 + phase * 2) * 8 : 0;
        const y1 = Math.sin(x * frequency + phase) * (amplitude + fskMod);
        const y2 = Math.sin(x * (frequency * 2.1) + phase * 1.5) * (amplitude * 0.4);
        const y = height / 2 + y1 + y2;
        ctx.lineTo(x, y);
      }
      ctx.stroke();

      // Secondary glowing waveform shadow
      ctx.beginPath();
      ctx.lineWidth = isPlayingPulse ? 6 : 4;
      ctx.strokeStyle = isPlayingPulse ? 'rgba(168, 85, 247, 0.35)' : 'rgba(59, 130, 246, 0.2)';
      ctx.moveTo(0, height / 2);
      for (let x = 0; x < width; x++) {
        const y1 = Math.sin(x * (frequency * 0.9) - phase * 0.8) * (amplitude * 0.8);
        const y = height / 2 + y1;
        ctx.lineTo(x, y);
      }
      ctx.stroke();

      // Radiating data symbol particles / pulse nodes if active
      if (isPlayingPulse) {
        particleOffset = (particleOffset + 5) % width;
        ctx.fillStyle = '#a855f7';
        ctx.shadowColor = '#a855f7';
        ctx.shadowBlur = 14;

        for (let i = 0; i < 6; i++) {
          const px = (particleOffset + i * 70) % width;
          const py = height / 2 + Math.sin(px * frequency + phase) * amplitude;
          ctx.beginPath();
          ctx.arc(px, py, 4.5, 0, Math.PI * 2);
          ctx.fill();
        }
        ctx.shadowBlur = 0;
      }

      phase += speed;
      animationFrameRef.current = requestAnimationFrame(render);
    };

    render();

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [activeMode, isPlayingPulse]);

  // Sync canvas display size with container resolution
  useEffect(() => {
    const handleResize = () => {
      if (!containerRef.current || !canvasRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      canvasRef.current.width = rect.width;
      canvasRef.current.height = 140;
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const modeDetails = {
    audible: { label: 'Audible FSK', freq: '1.8 - 2.4 kHz', speed: '~1.2s', status: 'Optimal Reliability' },
    fast: { label: 'Fast Audio Band', freq: '3.0 - 4.5 kHz', speed: '~0.8s', status: 'High Throughput' },
    ultrasound: { label: 'Near-Ultrasound', freq: '17.5 - 20 kHz', speed: '~1.5s', status: 'Silent Transfer' },
  };

  return (
    <div className="w-full max-w-lg mx-auto lg:max-w-none">
      {/* Outer Glow Container */}
      <div className="relative group rounded-3xl p-0.5 bg-gradient-to-b from-blue-500/30 via-purple-500/20 to-transparent shadow-[0_0_50px_rgba(59,130,246,0.15)] backdrop-blur-2xl transition-all duration-500 hover:shadow-[0_0_60px_rgba(59,130,246,0.25)]">
        
        {/* Card Content Wrapper */}
        <div className="bg-[#070b14]/90 rounded-[23px] p-5 sm:p-6 border border-white/10 relative overflow-hidden flex flex-col gap-5">
          
          {/* Top Bar: Live Status Badge & Sound Toggle */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="relative flex items-center justify-center">
                <span className={`w-2.5 h-2.5 rounded-full ${isPlayingPulse ? 'bg-purple-500 animate-ping' : 'bg-emerald-400'}`}></span>
                <span className={`w-2.5 h-2.5 rounded-full ${isPlayingPulse ? 'bg-purple-500' : 'bg-emerald-500'} absolute`}></span>
              </div>
              <span className="text-xs font-semibold tracking-wider uppercase text-gray-300 flex items-center gap-1.5">
                <Activity size={14} className="text-blue-400" />
                Acoustic Signal Engine
              </span>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setAudioMuted(!audioMuted)}
                title={audioMuted ? "Unmute sound preview" : "Mute sound preview"}
                className="p-1.5 rounded-full bg-white/5 border border-white/10 text-gray-400 hover:text-white transition-colors cursor-pointer"
              >
                {audioMuted ? <VolumeX size={13} className="text-red-400" /> : <Volume2 size={13} className="text-blue-400" />}
              </button>
              <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-[11px] font-mono text-blue-300">
                <Cpu size={12} />
                <span>GGWave FSK</span>
              </div>
            </div>
          </div>

          {/* Real-time Waveform Canvas Display */}
          <div ref={containerRef} className="relative w-full h-[140px] rounded-2xl bg-[#02050c] border border-white/10 overflow-hidden flex items-center justify-center">
            <canvas ref={canvasRef} className="w-full h-full block" />
            
            {/* Waveform Overlay Badge */}
            <div className="absolute top-3 left-3 flex items-center gap-2 px-2.5 py-1 rounded-lg bg-black/60 border border-white/10 backdrop-blur-md">
              <Radio size={12} className={isPlayingPulse ? 'text-purple-400 animate-pulse' : 'text-cyan-400'} />
              <span className="text-[10px] font-mono font-medium text-gray-300">
                {isPlayingPulse ? 'TRANSMITTING GGwave DATA...' : 'LIVE SPECTRUM SENSING'}
              </span>
            </div>

            {/* Test Trigger Overlay Button */}
            <button
              onClick={triggerAcousticPulse}
              disabled={isPlayingPulse}
              className="absolute bottom-3 right-3 px-3.5 py-2 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 active:scale-95 text-white text-xs font-bold shadow-lg shadow-purple-600/30 flex items-center gap-1.5 transition-all cursor-pointer disabled:opacity-75"
            >
              <Sparkles size={13} className={isPlayingPulse ? 'animate-spin' : ''} />
              <span>{isPlayingPulse ? 'Broadcasting Audio...' : 'Test Sound Pulse'}</span>
            </button>
          </div>

          {/* Mode Selector Buttons */}
          <div className="space-y-2">
            <div className="text-[11px] font-medium text-gray-400 uppercase tracking-wider flex items-center justify-between px-1">
              <span>Acoustic Protocol Band</span>
              <span className="text-blue-400 font-mono text-[10px]">{modeDetails[activeMode].freq}</span>
            </div>

            <div className="grid grid-cols-3 gap-2 p-1 bg-white/5 rounded-xl border border-white/5">
              {(['audible', 'fast', 'ultrasound'] as const).map((mode) => (
                <button
                  key={mode}
                  onClick={() => setActiveMode(mode)}
                  className={`py-2 px-2 rounded-lg text-[11px] font-semibold tracking-wide transition-all capitalize flex flex-col items-center justify-center gap-0.5 cursor-pointer ${
                    activeMode === mode
                      ? 'bg-blue-600/90 text-white shadow-md shadow-blue-500/20 border border-blue-400/30'
                      : 'text-gray-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <span>{mode}</span>
                  <span className="text-[9px] opacity-70 font-mono">{modeDetails[mode].speed}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Metrics Grid */}
          <div className="grid grid-cols-2 gap-2.5 pt-1">
            <div className="p-3 rounded-xl bg-white/[0.03] border border-white/5 flex flex-col gap-1">
              <span className="text-[10px] uppercase tracking-wider text-gray-400 flex items-center gap-1">
                <Zap size={12} className="text-yellow-400" /> Protocol Speed
              </span>
              <span className="text-sm font-bold font-mono text-white">
                {modeDetails[activeMode].speed} <span className="text-[10px] font-normal text-gray-400">/ message</span>
              </span>
            </div>

            <div className="p-3 rounded-xl bg-white/[0.03] border border-white/5 flex flex-col gap-1">
              <span className="text-[10px] uppercase tracking-wider text-gray-400 flex items-center gap-1">
                <ShieldCheck size={12} className="text-emerald-400" /> Air-Gap Status
              </span>
              <span className="text-sm font-bold font-mono text-emerald-400 flex items-center gap-1">
                <CheckCircle2 size={13} /> 100% Offline
              </span>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
