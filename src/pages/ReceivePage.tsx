import React, { useState, useEffect, useRef } from 'react';
import {
  ArrowLeft,
  Mic,
  MicOff,
  AlertCircle,
  CheckCircle2,
  Copy,
  Check,
  Radio,
  Volume2,
  Shield,
  Activity,
  Sparkles,
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { startListening, stopListening } from '../audio/ggwaveDecoder';
import { AudioWaveform } from '../components/AudioWaveform';
import { AppHeader } from '../components/AppHeader';

interface ReceivePageProps {
  onBack: () => void;
}

export function ReceivePage({ onBack }: ReceivePageProps) {
  const [isListening, setIsListening] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [rawPayload, setRawPayload] = useState('');
  const [finalMessage, setFinalMessage] = useState('');
  const [status, setStatus] = useState<'idle' | 'listening' | 'decoding' | 'success' | 'error'>(
    'idle'
  );
  const [audioData, setAudioData] = useState<Float32Array | undefined>();
  const [copied, setCopied] = useState(false);

  // Throttle waveform updates to ~30fps for smooth rendering
  const lastUpdateTime = useRef(0);

  useEffect(() => {
    return () => {
      stopListening();
    };
  }, []);

  const handleStartListening = async () => {
    setErrorMsg('');
    setRawPayload('');
    setFinalMessage('');
    setStatus('listening');
    setIsListening(true);
    setCopied(false);

    await startListening(
      () => {
        // on signal detected
      },
      async (decodedString) => {
        setIsListening(false);
        stopListening();

        // Parse protocol wrapper SM1|ID|PAYLOAD
        let payload = decodedString;
        if (decodedString.startsWith('SM1|')) {
          const parts = decodedString.split('|');
          if (parts.length >= 3) {
            payload = parts.slice(2).join('|');
          }
        }

        setRawPayload(payload);
        setFinalMessage(payload);
        setStatus('success');

        // Save to local history
        try {
          const history = JSON.parse(localStorage.getItem('WavBit_history') || '[]');
          history.push({ type: 'received', message: payload, timestamp: new Date().toISOString() });
          localStorage.setItem('WavBit_history', JSON.stringify(history));
        } catch (e) {
          console.error('History save error', e);
        }
      },
      (data) => {
        const now = performance.now();
        if (now - lastUpdateTime.current > 33) {
          setAudioData(data);
          lastUpdateTime.current = now;
        }
      },
      (err) => {
        setIsListening(false);
        setStatus('error');
        setErrorMsg(err.message || 'Microphone access denied or audio capture failed.');
      }
    );
  };

  const handleStopListening = () => {
    stopListening();
    setIsListening(false);
    setStatus('idle');
  };

  const handleBack = () => {
    stopListening();
    onBack();
  };

  const handleCopyMessage = () => {
    if (!finalMessage) return;
    navigator.clipboard.writeText(finalMessage);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex flex-col flex-1 w-full min-h-[100dvh] relative overflow-x-hidden selection:bg-cyan-500/30">
      <AppHeader title="Receive Data" colorTheme="cyan" />

      {/* Main Container: Responsive Grid / Card on Mobile, Tablet & Desktop */}
      <main className="flex-1 overflow-y-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10 pb-36 w-full max-w-5xl mx-auto flex flex-col justify-start min-h-0">
        {/* Top Back Navigation Bar */}
        <div className="w-full flex items-center justify-between mb-6 shrink-0">
          <button
            onClick={handleBack}
            className="group flex items-center gap-2 px-3.5 py-2 -ml-3 text-gray-400 hover:text-white transition-all rounded-xl hover:bg-white/5 border border-transparent hover:border-white/10 cursor-pointer"
          >
            <ArrowLeft size={18} className="transition-transform group-hover:-translate-x-1" />
            <span className="text-xs font-semibold tracking-wider uppercase">Back to Home</span>
          </button>

          {/* Air-Gap Privacy Pill */}
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-[11px] font-mono text-emerald-400">
            <Shield size={12} />
            <span>Air-Gap Listening Active</span>
          </div>
        </div>

        {/* Center Content Section */}
        <div className="w-full flex flex-col items-center justify-start mt-2 sm:mt-4 lg:mt-1">
          <AnimatePresence mode="wait">
            {status !== 'success' ? (
              <motion.div
                key="listening-view"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.4 }}
                className="w-full grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center"
              >
                {/* Left Column: Animated Mic Visualizer & Status */}
                <div className="lg:col-span-5 flex flex-col items-center text-center p-6 sm:p-8 rounded-3xl bg-[#070b14]/80 border border-white/10 backdrop-blur-2xl shadow-[0_0_50px_rgba(6,182,212,0.1)] relative overflow-hidden">
                  {/* Subtle Background Glow Grid */}
                  <div className="absolute inset-0 bg-gradient-to-b from-cyan-500/5 via-purple-500/5 to-transparent pointer-events-none" />

                  {/* Animated Mic Radar Disk */}
                  <div className="relative my-4 sm:my-6 flex items-center justify-center">
                    {isListening && (
                      <>
                        <div className="absolute inset-0 bg-cyan-500/25 rounded-full blur-2xl animate-pulse"></div>
                        <div
                          className="absolute w-44 h-44 sm:w-52 sm:h-52 bg-cyan-500/15 rounded-full animate-ping"
                          style={{ animationDuration: '2.5s' }}
                        ></div>
                        <div
                          className="absolute w-36 h-36 sm:w-44 sm:h-44 border border-cyan-400/30 rounded-full animate-spin"
                          style={{ animationDuration: '8s' }}
                        ></div>
                      </>
                    )}

                    <div
                      className={`w-28 h-28 sm:w-36 sm:h-36 rounded-full flex items-center justify-center transition-all duration-500 relative z-10 ${
                        isListening
                          ? 'bg-gradient-to-br from-cyan-500 to-blue-600 shadow-[0_0_60px_rgba(6,182,212,0.6)] border-2 border-cyan-300'
                          : 'bg-white/[0.04] border border-white/10'
                      }`}
                    >
                      <Mic
                        size={44}
                        className={isListening ? 'text-white animate-pulse' : 'text-gray-500'}
                      />
                    </div>
                  </div>

                  {/* Status Heading & Description */}
                  <div className="space-y-2 relative z-10">
                    <div className="inline-flex items-center gap-1.5 text-[11px] font-mono uppercase tracking-widest text-cyan-400">
                      <Activity size={12} className={isListening ? 'animate-bounce' : ''} />
                      <span>{isListening ? 'SENSING ACOUSTIC SIGNALS' : 'STANDBY MODE'}</span>
                    </div>

                    <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
                      {status === 'idle' && 'Ready to Receive'}
                      {status === 'listening' && 'Listening for Sound...'}
                      {status === 'error' && 'Capture Interrupted'}
                    </h2>

                    <p className="text-xs sm:text-sm text-gray-400 max-w-xs mx-auto leading-relaxed">
                      {status === 'listening'
                        ? 'Bring the transmitting speaker close to your microphone. Volume should be clear.'
                        : 'Tap the start button below to listen for incoming acoustic data packets.'}
                    </p>
                  </div>

                  {/* Error Banner */}
                  {status === 'error' && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="p-4 bg-red-500/10 border border-red-500/20 rounded-2xl flex items-start space-x-3 text-red-400 text-left mt-5 w-full"
                    >
                      <AlertCircle size={18} className="shrink-0 mt-0.5" />
                      <span className="text-xs sm:text-sm leading-relaxed">{errorMsg}</span>
                    </motion.div>
                  )}
                </div>

                {/* Right Column: Audio Waveform Visualizer & Live Stats */}
                <div className="lg:col-span-7 flex flex-col gap-4">
                  <div className="bg-[#070b14]/80 border border-white/10 rounded-3xl p-5 sm:p-6 backdrop-blur-2xl flex flex-col gap-4 shadow-[0_0_30px_rgba(0,0,0,0.5)]">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-semibold uppercase tracking-wider text-gray-300 flex items-center gap-2">
                        <Radio size={14} className="text-cyan-400" />
                        Microphone Audio Spectrum
                      </span>
                      <span className="text-[10px] font-mono text-cyan-400/80 bg-cyan-500/10 px-2.5 py-1 rounded-lg border border-cyan-500/20">
                        {isListening ? '48.0 kHz F32' : 'Muted / Idle'}
                      </span>
                    </div>

                    {/* Waveform Canvas View */}
                    <div className="h-44 sm:h-52 w-full rounded-2xl overflow-hidden border border-white/5 bg-[#02050c]">
                      <AudioWaveform isListening={isListening} audioData={audioData} />
                    </div>

                    {/* Signal Metrics Bar */}
                    <div className="grid grid-cols-3 gap-2 pt-1 text-center">
                      <div className="p-2.5 rounded-xl bg-white/[0.03] border border-white/5 flex flex-col items-center">
                        <span className="text-[9px] uppercase tracking-wider text-gray-500">
                          Protocol
                        </span>
                        <span className="text-xs font-bold font-mono text-white mt-0.5">
                          GGWave FSK
                        </span>
                      </div>
                      <div className="p-2.5 rounded-xl bg-white/[0.03] border border-white/5 flex flex-col items-center">
                        <span className="text-[9px] uppercase tracking-wider text-gray-500">
                          Target Range
                        </span>
                        <span className="text-xs font-bold font-mono text-cyan-400 mt-0.5">
                          0.1 - 2.5m
                        </span>
                      </div>
                      <div className="p-2.5 rounded-xl bg-white/[0.03] border border-white/5 flex flex-col items-center">
                        <span className="text-[9px] uppercase tracking-wider text-gray-500">
                          Network
                        </span>
                        <span className="text-xs font-bold font-mono text-emerald-400 mt-0.5">
                          Air-Gapped
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ) : (
              /* Success View: Received Message Result Card */
              <motion.div
                key="success-view"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4 }}
                className="w-full max-w-2xl bg-[#070b14]/90 border-2 border-emerald-500/30 rounded-3xl p-6 sm:p-8 space-y-6 backdrop-blur-2xl shadow-[0_0_60px_rgba(16,185,129,0.15)] relative overflow-hidden"
              >
                {/* Top Success Badge Header */}
                <div className="flex items-center justify-between pb-5 border-b border-white/10">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                      <CheckCircle2 size={24} />
                    </div>
                    <div>
                      <h3 className="text-base sm:text-lg font-bold text-white">
                        Message Decoded Successfully
                      </h3>
                      <p className="text-xs text-emerald-400 font-mono">
                        100% Acoustic Data Integrity Verified
                      </p>
                    </div>
                  </div>
                </div>

                {/* Received Text Content Display */}
                <div className="py-4 px-5 rounded-2xl bg-white/[0.03] border border-white/10">
                  <div className="flex items-center justify-between mb-2">
                    <div className="text-[10px] text-gray-400 font-bold tracking-widest uppercase">
                      Decoded Message Text
                    </div>
                    <button
                      onClick={handleCopyMessage}
                      title={copied ? "Copied!" : "Copy message"}
                      className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white transition-all border border-white/10 cursor-pointer active:scale-90 flex items-center justify-center"
                    >
                      {copied ? <Check size={14} className="text-emerald-400" /> : <Copy size={14} />}
                    </button>
                  </div>
                  <div className="text-xl sm:text-2xl font-medium text-white break-words leading-relaxed select-text">
                    "{finalMessage}"
                  </div>
                </div>

                {/* Raw Signature Box */}
                <div className="pt-2">
                  <div className="text-[10px] text-gray-500 font-mono tracking-widest uppercase mb-1.5">
                    Raw Packet Payload
                  </div>
                  <div className="font-mono text-[11px] text-cyan-300/80 break-all bg-[#02050c] p-3 rounded-xl border border-white/10 select-all">
                    {rawPayload}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>

      {/* Fixed Bottom Neo-Brutalist Action Bar */}
      <div className="fixed bottom-0 left-0 right-0 p-4 sm:p-6 bg-gradient-to-t from-[#020408] via-[#020408]/95 to-transparent z-30 border-t border-white/5 backdrop-blur-xl">
        <div className="max-w-md mx-auto w-full">
          {isListening ? (
            <motion.button
              whileTap={{ x: 3, y: 3, boxShadow: '0px 0px 0px #ef4444' }}
              transition={{ duration: 0.08, ease: 'easeOut' }}
              onClick={handleStopListening}
              className="w-full py-3.5 sm:py-4 rounded-2xl bg-gradient-to-r from-red-600 via-rose-600 to-red-600 text-white font-extrabold text-sm tracking-wider uppercase border-2 border-red-400 shadow-[3px_3px_0px_#ef4444,0_0_20px_rgba(239,68,68,0.4)] hover:brightness-110 flex items-center justify-center space-x-2.5 cursor-pointer select-none touch-manipulation [webkit-tap-highlight-color:transparent]"
            >
              <MicOff size={18} />
              <span>Stop Listening</span>
            </motion.button>
          ) : status === 'success' ? (
            <motion.button
              whileTap={{ x: 3, y: 3, boxShadow: '0px 0px 0px #06b6d4' }}
              transition={{ duration: 0.08, ease: 'easeOut' }}
              onClick={handleStartListening}
              className="w-full py-3.5 sm:py-4 rounded-2xl bg-gradient-to-r from-blue-600 via-cyan-500 to-blue-600 text-white font-extrabold text-sm tracking-wider uppercase border-2 border-cyan-300 shadow-[3px_3px_0px_#06b6d4,0_0_20px_rgba(6,182,212,0.4)] hover:brightness-110 flex items-center justify-center space-x-2.5 cursor-pointer select-none touch-manipulation [webkit-tap-highlight-color:transparent]"
            >
              <Mic size={18} />
              <span>Listen Again</span>
            </motion.button>
          ) : (
            <motion.button
              whileTap={{ x: 3, y: 3, boxShadow: '0px 0px 0px #06b6d4' }}
              transition={{ duration: 0.08, ease: 'easeOut' }}
              onClick={handleStartListening}
              className="w-full py-3.5 sm:py-4 rounded-2xl bg-gradient-to-r from-blue-600 via-cyan-500 to-blue-600 text-white font-extrabold text-sm tracking-wider uppercase border-2 border-cyan-300 shadow-[3px_3px_0px_#06b6d4,0_0_20px_rgba(6,182,212,0.4)] hover:brightness-110 flex items-center justify-center space-x-2.5 cursor-pointer select-none touch-manipulation [webkit-tap-highlight-color:transparent]"
            >
              <Mic size={18} />
              <span>Start Listening</span>
            </motion.button>
          )}
        </div>
      </div>
    </div>
  );
}
