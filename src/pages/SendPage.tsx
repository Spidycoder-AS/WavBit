import React, { useState, useEffect, useRef } from 'react';
import { 
  ArrowLeft, 
  Volume2, 
  CheckCircle2, 
  Play, 
  Square, 
  Shield, 
  Sparkles, 
  Key, 
  MapPin, 
  MessageSquare, 
  Trash2, 
  Radio, 
  AlertCircle,
  RefreshCw
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { transmitMessage, generateWavBlob } from '../audio/ggwaveEncoder';
import { AudioWaveform } from '../components/AudioWaveform';
import { AppHeader } from '../components/AppHeader';

interface SendPageProps {
  onBack: () => void;
}

const PRESET_TEMPLATES = [
  { label: 'Secret Key', icon: Key, text: 'KEY-S8P3I6D9Y' },
  { label: 'Location', icon: MapPin, text: '26°52\'41.19"N, 94°38\'40.29"E' },
  { label: 'Quick Note', icon: MessageSquare, text: 'Meet near ranghar at 8pm.' },
];

export function SendPage({ onBack }: SendPageProps) {
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState<'idle' | 'transmitting' | 'success' | 'error'>('idle');
  const [compressedData, setCompressedData] = useState('');
  const [progress, setProgress] = useState(0);
  const [errorMsg, setErrorMsg] = useState('');
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 220)}px`;
    }
  }, [message]);

  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
      }
    };
  }, []);

  const handleTransmit = async () => {
    if (!message.trim()) return;

    try {
      setErrorMsg('');
      setStatus('transmitting');

      const payload = message.trim();
      setCompressedData(payload);

      // Simple protocol wrapper
      const packet = `SM1|${Math.floor(Math.random() * 1000)}|${payload}`;

      await transmitMessage(packet, (p) => {
        setProgress(Math.round(p * 100));
      });

      setStatus('success');

      // Save to local history
      const history = JSON.parse(localStorage.getItem('WavBit_history') || '[]');
      history.push({ type: 'sent', message, timestamp: new Date().toISOString() });
      localStorage.setItem('WavBit_history', JSON.stringify(history));
    } catch (err: any) {
      console.error(err);
      setStatus('error');
      setErrorMsg(err.message || 'Transmission failed. Check audio output permissions.');
    }
  };

  const handlePlayAudio = async () => {
    if (isPlayingAudio && audioRef.current) {
      audioRef.current.pause();
      audioRef.current = null;
      setIsPlayingAudio(false);
      return;
    }

    if (audioRef.current) {
      audioRef.current.pause();
    }

    try {
      setIsPlayingAudio(true);
      const payload = message.trim();
      const packet = `SM1|${Math.floor(Math.random() * 1000)}|${payload}`;
      const blob = await generateWavBlob(packet);
      const url = URL.createObjectURL(blob);
      const audio = new Audio(url);
      audioRef.current = audio;

      audio.onended = () => {
        setIsPlayingAudio(false);
        audioRef.current = null;
      };

      await audio.play();
    } catch (e) {
      console.error(e);
      setIsPlayingAudio(false);
    }
  };

  const handleReset = () => {
    setMessage('');
    setStatus('idle');
    setProgress(0);
    setCompressedData('');
    if (isPlayingAudio && audioRef.current) {
      audioRef.current.pause();
      audioRef.current = null;
      setIsPlayingAudio(false);
    }
  };

  return (
    <div className="flex flex-col flex-1 w-full min-h-screen relative overflow-hidden bg-[#020408] text-white">
      <AppHeader title="Transmit Data" colorTheme="emerald" />

      {/* Main Responsive Grid Container */}
      <main className="flex-1 overflow-y-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 pb-36 w-full max-w-5xl mx-auto flex flex-col justify-start min-h-0">
        
        {/* Top Back Navigation & Security Pill Bar */}
        <div className="w-full flex items-center justify-between mb-6 shrink-0">
          <button
            onClick={onBack}
            className="group flex items-center gap-2 px-3.5 py-2 -ml-3 text-gray-400 hover:text-white transition-all rounded-xl hover:bg-white/5 border border-transparent hover:border-white/10 cursor-pointer"
          >
            <ArrowLeft size={18} className="transition-transform group-hover:-translate-x-1" />
            <span className="text-xs font-semibold tracking-wider uppercase">Back to Home</span>
          </button>

          {/* Security Pill */}
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-[11px] font-mono text-emerald-400">
            <Shield size={12} />
            <span>Acoustic Encoder Active</span>
          </div>
        </div>

        {/* Dynamic Responsive Content Card Container */}
        <div className="w-full flex flex-col items-center justify-start">
          <AnimatePresence mode="wait">
            {status !== 'success' ? (
              <motion.div
                key="send-form"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.3 }}
                className="w-full grid grid-cols-1 lg:grid-cols-12 gap-6 items-start"
              >
                {/* Left Column: Message Input Area (7 cols on desktop) */}
                <div className="lg:col-span-7 flex flex-col gap-4">
                  <div className="p-5 sm:p-6 rounded-3xl bg-[#070b14]/80 border border-white/10 backdrop-blur-2xl shadow-[0_0_40px_rgba(16,185,129,0.08)] relative overflow-hidden">
                    
                    {/* Input Header & Character Counter */}
                    <div className="flex items-center justify-between mb-3">
                      <label className="text-[11px] sm:text-xs font-bold uppercase tracking-widest text-emerald-400 flex items-center gap-2">
                        <Sparkles size={14} />
                        <span>Payload Text</span>
                      </label>

                      <div className="flex items-center gap-3">
                        {message.length > 0 && (
                          <button
                            onClick={() => setMessage('')}
                            className="text-[11px] text-gray-400 hover:text-rose-400 transition-colors flex items-center gap-1 cursor-pointer"
                          >
                            <Trash2 size={12} />
                            <span>Clear</span>
                          </button>
                        )}
                        <span className={`text-xs font-mono font-bold tracking-wider px-2 py-0.5 rounded-full border ${
                          message.length < 90 ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400' :
                          message.length < 125 ? 'bg-amber-500/10 border-amber-500/20 text-amber-400' :
                          'bg-rose-500/10 border-rose-500/20 text-rose-400'
                        }`}>
                          {message.length} / 132
                        </span>
                      </div>
                    </div>

                    {/* Text Area */}
                    <textarea
                      ref={textareaRef}
                      value={message}
                      maxLength={132}
                      onChange={(e) => setMessage(e.target.value)}
                      disabled={status === 'transmitting'}
                      placeholder="Type a secret message, password, or code to transmit..."
                      className="w-full min-h-[140px] bg-white/[0.03] border border-white/10 focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/30 rounded-2xl p-4 sm:p-5 text-white text-base sm:text-lg leading-relaxed placeholder:text-gray-500 resize-none outline-none transition-all disabled:opacity-50"
                    />

                    {/* Quick Preset Templates */}
                    <div className="mt-4 pt-3 border-t border-white/5">
                      <span className="text-[10px] uppercase font-mono tracking-widest text-gray-400 block mb-2">
                        Quick Templates
                      </span>
                      <div className="flex flex-wrap gap-2">
                        {PRESET_TEMPLATES.map((tpl) => {
                          const IconComp = tpl.icon;
                          return (
                            <button
                              key={tpl.label}
                              type="button"
                              onClick={() => setMessage(tpl.text)}
                              disabled={status === 'transmitting'}
                              className="px-2.5 py-1.5 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 text-xs text-gray-300 hover:text-white transition-all flex items-center gap-1.5 cursor-pointer active:scale-95 disabled:opacity-50"
                            >
                              <IconComp size={13} className="text-emerald-400" />
                              <span>{tpl.label}</span>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  </div>

                  {/* Error Message Container */}
                  {status === 'error' && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="p-4 bg-red-500/10 border border-red-500/20 rounded-2xl flex items-start gap-3 text-red-400 text-sm"
                    >
                      <AlertCircle size={18} className="shrink-0 mt-0.5" />
                      <span>{errorMsg}</span>
                    </motion.div>
                  )}
                </div>

                {/* Right Column: Visualizer & Transmitter Stats (5 cols on desktop) */}
                <div className="lg:col-span-5 flex flex-col gap-4">
                  <div className="bg-[#070b14]/80 border border-white/10 rounded-3xl p-5 sm:p-6 backdrop-blur-2xl flex flex-col gap-4 shadow-[0_0_30px_rgba(0,0,0,0.5)]">
                    
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-semibold uppercase tracking-wider text-gray-300 flex items-center gap-2">
                        <Radio size={14} className="text-emerald-400" />
                        Acoustic Signal Waveform
                      </span>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                        {status === 'transmitting' ? 'TRANSMITTING' : 'READY'}
                      </span>
                    </div>

                    {/* Real-time Audio Waveform Canvas */}
                    <div className="h-32 w-full rounded-2xl bg-[#02050c] border border-white/10 overflow-hidden relative">
                      <AudioWaveform isTransmitting={status === 'transmitting'} />
                    </div>

                    {/* Progress indicator during transmission */}
                    {status === 'transmitting' && (
                      <div className="py-2 flex flex-col items-center justify-center">
                        <div className="text-3xl font-black font-mono tracking-tighter text-emerald-400">
                          {progress}%
                        </div>
                        <div className="w-full bg-white/10 h-1.5 rounded-full overflow-hidden mt-2">
                          <div 
                            className="bg-emerald-400 h-full transition-all duration-150"
                            style={{ width: `${progress}%` }}
                          />
                        </div>
                      </div>
                    )}

                    {/* Signal Metrics */}
                    <div className="grid grid-cols-3 gap-2 pt-1 text-center">
                      <div className="p-2.5 rounded-xl bg-white/[0.03] border border-white/5 flex flex-col items-center">
                        <span className="text-[9px] uppercase tracking-wider text-gray-400">Protocol</span>
                        <span className="text-xs font-bold font-mono text-white mt-0.5">GGWave FSK</span>
                      </div>
                      <div className="p-2.5 rounded-xl bg-white/[0.03] border border-white/5 flex flex-col items-center">
                        <span className="text-[9px] uppercase tracking-wider text-gray-400">Sample Rate</span>
                        <span className="text-xs font-bold font-mono text-emerald-400 mt-0.5">48 kHz</span>
                      </div>
                      <div className="p-2.5 rounded-xl bg-white/[0.03] border border-white/5 flex flex-col items-center">
                        <span className="text-[9px] uppercase tracking-wider text-gray-400">Security</span>
                        <span className="text-xs font-bold font-mono text-teal-400 mt-0.5">Air-Gapped</span>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ) : (
              /* Success View Card */
              <motion.div
                key="send-success"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4 }}
                className="w-full max-w-2xl bg-[#070b14]/90 border-2 border-emerald-500/30 rounded-3xl p-6 sm:p-8 space-y-6 backdrop-blur-2xl shadow-[0_0_60px_rgba(16,185,129,0.15)] relative overflow-hidden"
              >
                {/* Header */}
                <div className="flex items-center gap-3 pb-5 border-b border-white/10">
                  <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                    <CheckCircle2 size={24} />
                  </div>
                  <div>
                    <h3 className="text-base sm:text-lg font-bold text-white">
                      Payload Transmitted Successfully
                    </h3>
                    <p className="text-xs text-emerald-400 font-mono">
                      Acoustic Sound Signal Broadcasted
                    </p>
                  </div>
                </div>

                {/* Transmitted Content */}
                <div className="py-4 px-5 rounded-2xl bg-white/[0.03] border border-white/10">
                  <div className="text-[10px] text-gray-400 font-bold tracking-widest uppercase mb-2">
                    Transmitted Message
                  </div>
                  <div className="text-xl sm:text-2xl font-medium text-white break-words leading-relaxed select-text">
                    "{compressedData}"
                  </div>
                </div>

                {/* Note */}
                <p className="text-xs text-gray-400 leading-relaxed text-center">
                  Make sure the target receiving device had its microphone active during playback. You can replay the audio signal below if needed.
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>

      {/* Fixed Bottom Action Bar with Neo-Brutalist Push-into-Shadow Buttons */}
      <div className="fixed bottom-0 left-0 right-0 p-4 sm:p-6 bg-gradient-to-t from-[#020408] via-[#020408]/95 to-transparent z-30 border-t border-white/5 backdrop-blur-xl">
        <div className="max-w-md mx-auto w-full flex items-center gap-3">
          {status === 'success' ? (
            <>
              <motion.button
                whileTap={{ x: 3, y: 3, boxShadow: '0px 0px 0px #8b5cf6' }}
                transition={{ duration: 0.08, ease: 'easeOut' }}
                onClick={handlePlayAudio}
                className={`flex-1 py-3.5 rounded-xl font-bold text-sm tracking-wider uppercase transition-all flex items-center justify-center gap-2 border cursor-pointer ${
                  isPlayingAudio
                    ? 'bg-purple-600 text-white border-purple-400 shadow-[3px_3px_0px_0px_#8b5cf6]'
                    : 'bg-purple-500/20 text-purple-300 border-purple-500/40 hover:bg-purple-500/30 shadow-[3px_3px_0px_0px_#8b5cf6]'
                }`}
              >
                {isPlayingAudio ? <Square size={16} fill="currentColor" /> : <Play size={16} fill="currentColor" />}
                <span>{isPlayingAudio ? 'Stop' : 'Replay'}</span>
              </motion.button>

              <motion.button
                whileTap={{ x: 3, y: 3, boxShadow: '0px 0px 0px #10b981' }}
                transition={{ duration: 0.08, ease: 'easeOut' }}
                onClick={handleReset}
                className="flex-1 py-3.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-bold text-sm tracking-wider uppercase shadow-[3px_3px_0px_0px_#10b981] border border-emerald-300 flex items-center justify-center gap-2 cursor-pointer"
              >
                <RefreshCw size={16} />
                <span>Send New</span>
              </motion.button>
            </>
          ) : (
            <motion.button
              whileTap={{ x: 3, y: 3, boxShadow: '0px 0px 0px #10b981' }}
              transition={{ duration: 0.08, ease: 'easeOut' }}
              onClick={handleTransmit}
              disabled={!message.trim() || status === 'transmitting'}
              className="w-full py-3.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-bold text-sm sm:text-base tracking-wider uppercase shadow-[3px_3px_0px_0px_#10b981] border border-emerald-300 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-40 disabled:pointer-events-none"
            >
              {status === 'transmitting' ? (
                <span>Transmitting...</span>
              ) : (
                <>
                  <Volume2 size={20} />
                  <span>Transmit via Sound</span>
                </>
              )}
            </motion.button>
          )}
        </div>
      </div>
    </div>
  );
}
