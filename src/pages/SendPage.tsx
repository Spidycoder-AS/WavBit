import React, { useState, useEffect, useRef } from 'react';
import { ArrowLeft, Send, Volume2, CheckCircle2, Download, Play, Square } from 'lucide-react';
import { motion } from 'motion/react';
import { transmitMessage, generateWavBlob } from '../audio/ggwaveEncoder';
import { AudioWaveform } from '../components/AudioWaveform';
import { AppHeader } from '../components/AppHeader';

interface SendPageProps {
  onBack: () => void;
}

export function SendPage({ onBack }: SendPageProps) {
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState<'idle' | 'ready' | 'transmitting' | 'success' | 'error'>(
    'idle'
  );
  const [compressedData, setCompressedData] = useState('');
  const [progress, setProgress] = useState(0);
  const [errorMsg, setErrorMsg] = useState('');
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
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

      let payload = message.trim();
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
      setErrorMsg(err.message || 'An error occurred');
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

  return (
    <div className="flex flex-col flex-1 w-full h-full relative overflow-hidden">
      <AppHeader title="Transmit Data" colorTheme="emerald" />

      <main className="flex-1 overflow-y-auto px-4 sm:px-6 py-6 sm:py-8 pb-32 md:pb-48 lg:pb-56 w-full max-w-3xl mx-auto flex flex-col">
        <div className="w-full flex items-start mb-6 shrink-0">
          <button
            onClick={onBack}
            className="flex items-center gap-2 px-3 py-2 -ml-3 text-gray-400 hover:text-white transition-colors rounded-xl hover:bg-white/5"
          >
            <ArrowLeft size={20} />
            <span className="text-sm font-medium tracking-wide uppercase">Back</span>
          </button>
        </div>
        <div className="space-y-6 sm:space-y-8 flex flex-col w-full transition-all duration-500 md:justify-center flex-1">
          <div className="flex flex-col w-full">
            <label className="block text-[11px] sm:text-xs font-semibold text-gray-400 uppercase tracking-widest mb-3 ml-1">
              Payload Content
            </label>
            <textarea
              ref={textareaRef}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              disabled={status !== 'idle' && status !== 'error'}
              placeholder="E.g. Meet me tomorrow at 7 PM near the cafe."
              className="w-full flex-1 md:flex-none min-h-[120px] max-h-[40dvh] bg-white/5 border border-white/10 rounded-3xl p-5 sm:p-6 text-white text-lg sm:text-xl leading-relaxed placeholder:text-white/20 focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/50 resize-none overflow-y-auto transition-all disabled:opacity-50 shadow-inner backdrop-blur-md"
            />
          </div>

          {status === 'error' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center text-red-400 p-4 text-sm bg-red-500/10 rounded-2xl border border-red-500/20 backdrop-blur-sm"
            >
              {errorMsg}
            </motion.div>
          )}

          {(status === 'transmitting' || status === 'success') && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-4 sm:space-y-6"
            >
              <div className="p-4 sm:p-5 bg-blue-900/20 border border-blue-500/30 rounded-3xl backdrop-blur-xl">
                <div className="flex items-center space-x-2 text-[10px] sm:text-xs text-blue-400 uppercase tracking-widest mb-2">
                  <div
                    className={`w-1.5 h-1.5 rounded-full bg-blue-500 ${status === 'transmitting' ? 'animate-pulse' : ''}`}
                  ></div>
                  <span>Transmitting Payload</span>
                </div>
                <div className="font-mono text-xs sm:text-sm text-blue-100 break-all">
                  {compressedData}
                </div>
              </div>

              <div className="bg-white/5 border border-white/10 rounded-3xl p-4 sm:p-6 backdrop-blur-xl">
                <AudioWaveform isTransmitting={status === 'transmitting'} />

                {status === 'transmitting' && (
                  <div className="mt-6 flex flex-col items-center">
                    <div className="text-4xl sm:text-5xl font-black tabular-nums tracking-tighter text-white">
                      {Math.round(progress)}%
                    </div>
                    <div className="text-[10px] sm:text-xs text-blue-300/60 uppercase tracking-widest mt-1">
                      Completion
                    </div>
                  </div>
                )}

                {status === 'success' && (
                  <div className="mt-6 flex flex-col items-center justify-center text-green-400 space-y-4">
                    <div className="w-12 h-12 bg-green-500/20 rounded-full flex items-center justify-center">
                      <CheckCircle2 size={24} className="text-green-400" />
                    </div>
                    <span className="text-[11px] sm:text-xs font-bold uppercase tracking-widest">
                      Transmission Complete
                    </span>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </div>
      </main>

      {/* Fixed Bottom Action Bar */}
      <div className="fixed bottom-0 left-0 right-0 p-4 sm:p-6 bg-gradient-to-t from-[#020408] via-[#020408]/90 to-transparent z-20">
        <div className="max-w-2xl mx-auto w-full flex items-center gap-3">
          {status === 'success' && (
            <motion.button
              layout
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
              onClick={handlePlayAudio}
              className={`flex-1 py-5 rounded-3xl font-bold text-[15px] sm:text-sm tracking-widest uppercase active:scale-[0.98] flex items-center justify-center space-x-2 border overflow-hidden whitespace-nowrap
                ${
                  isPlayingAudio
                    ? 'bg-purple-500/20 text-purple-400 border-purple-500/50 hover:bg-purple-500/30'
                    : 'bg-blue-500/10 text-blue-400 border-blue-500/20 hover:text-blue-300'
                }`}
            >
              {isPlayingAudio ? (
                <Square size={20} fill="currentColor" className="shrink-0" />
              ) : (
                <Play size={20} fill="currentColor" className="shrink-0" />
              )}
              <span className="shrink-0">{isPlayingAudio ? 'Stop' : 'Play Audio'}</span>
            </motion.button>
          )}

          <motion.button
            layout
            transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
            onClick={
              status === 'success'
                ? () => {
                    setMessage('');
                    setStatus('idle');
                    setProgress(0);
                    setCompressedData('');
                    if (isPlayingAudio && audioRef.current) {
                      audioRef.current.pause();
                      audioRef.current = null;
                      setIsPlayingAudio(false);
                    }
                  }
                : handleTransmit
            }
            disabled={
              !message.trim() || (status !== 'idle' && status !== 'error' && status !== 'success')
            }
            className={`flex-1 py-5 rounded-3xl text-white font-bold text-[15px] sm:text-sm tracking-widest uppercase shadow-lg transition-all active:scale-[0.98] disabled:opacity-50 flex items-center justify-center space-x-3
              ${status === 'success' ? 'bg-white/10 hover:bg-white/20 shadow-white/5 border border-white/10' : 'bg-blue-600 hover:bg-blue-500 shadow-blue-600/30'}`}
          >
            {status === 'success' ? (
              <span className="shrink-0">Send Another</span>
            ) : status === 'transmitting' ? (
              <span className="shrink-0">Transmitting...</span>
            ) : (
              <>
                <Volume2 size={22} className="shrink-0" />
                <span className="shrink-0">Transmit via Sound</span>
              </>
            )}
          </motion.button>
        </div>
      </div>
    </div>
  );
}
