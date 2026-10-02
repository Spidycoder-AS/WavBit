import React from 'react';
import { motion } from 'motion/react';
import { Radio, Mic, Volume2, Zap, WifiOff, History, Shield, Waves, ArrowRight } from 'lucide-react';
import { AppHeader } from '../components/AppHeader';
import { SeoSection } from '../components/SeoSection';
import { SoundSimulatorCard } from '../components/SoundSimulatorCard';

interface LandingPageProps {
  onStartSend: () => void;
  onStartReceive: () => void;
  onViewHistory: () => void;
}

export function LandingPage({ onStartSend, onStartReceive, onViewHistory }: LandingPageProps) {
  return (
    <div className="flex flex-col flex-1 selection:bg-blue-500/30 w-full max-w-[100vw] overflow-x-hidden">
      <AppHeader title="SM1-BETA" />

      {/* Hero Section Container */}
      <main className="flex-1 flex flex-col justify-center px-4 sm:px-6 lg:px-8 py-8 sm:py-14 lg:py-16 relative z-10 max-w-7xl mx-auto w-full min-h-0">
        
        {/* Main Grid: Responsive 2-column layout on Desktop (lg), stacked on Tablet/Mobile */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center mb-12 sm:mb-16">
          
          {/* Column 1: Text Content & Action Buttons */}
          <div className="lg:col-span-7 flex flex-col items-center lg:items-start text-center lg:text-left space-y-6 sm:space-y-8">
            
            {/* Air-Gap Badge */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-xs sm:text-sm font-medium text-blue-400 shadow-[0_0_15px_rgba(59,130,246,0.15)]"
            >
              <Zap size={14} className="text-blue-400 animate-pulse" />
              <span>Air-Gapped Acoustic Communication</span>
            </motion.div>

            {/* Main Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="text-4xl sm:text-6xl md:text-7xl lg:text-6xl xl:text-7xl font-extrabold tracking-tight leading-[1.1]"
            >
              Send data <br className="hidden sm:inline" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 drop-shadow-[0_0_35px_rgba(59,130,246,0.35)]">
                through sound.
              </span>
            </motion.h1>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="text-base sm:text-lg md:text-xl text-gray-300 max-w-2xl leading-relaxed px-1 sm:px-0"
            >
              Transfer short text messages between nearby devices using only built-in speakers and microphones. No Wi-Fi, Bluetooth, or cellular internet required.
            </motion.p>

            {/* Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2 sm:pt-4 w-full"
            >
              <button
                onClick={onStartSend}
                className="w-full sm:w-auto px-8 py-4 sm:py-4 rounded-2xl bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-bold text-sm tracking-wider uppercase transition-all duration-300 hover:scale-[1.02] active:scale-95 flex items-center justify-center space-x-3 shadow-lg shadow-blue-600/30 cursor-pointer"
              >
                <Volume2 size={20} />
                <span>Send Message</span>
                <ArrowRight size={16} className="opacity-70" />
              </button>
              <button
                onClick={onStartReceive}
                className="w-full sm:w-auto px-8 py-4 sm:py-4 rounded-2xl bg-white/5 text-white font-bold text-sm tracking-wider uppercase border border-white/10 transition-all duration-300 hover:bg-white/10 hover:border-white/20 hover:scale-[1.02] active:scale-95 flex items-center justify-center space-x-3 backdrop-blur-md cursor-pointer"
              >
                <Mic size={20} />
                <span>Receive Message</span>
              </button>
            </motion.div>

            {/* Feature Highlights Pills */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="flex flex-wrap items-center justify-center lg:justify-start gap-2.5 sm:gap-4 pt-4 sm:pt-6"
            >
              <div className="flex items-center space-x-2 text-xs sm:text-xs text-gray-400 font-semibold bg-white/5 px-3.5 py-2 rounded-xl border border-white/10 backdrop-blur-sm">
                <WifiOff size={14} className="text-blue-400" />
                <span>Zero Internet Needed</span>
              </div>
              <div className="flex items-center space-x-2 text-xs sm:text-xs text-gray-400 font-semibold bg-white/5 px-3.5 py-2 rounded-xl border border-white/10 backdrop-blur-sm">
                <Radio size={14} className="text-purple-400" />
                <span>Acoustic Transfer</span>
              </div>
              <div className="flex items-center space-x-2 text-xs sm:text-xs text-gray-400 font-semibold bg-white/5 px-3.5 py-2 rounded-xl border border-white/10 backdrop-blur-sm">
                <Shield size={14} className="text-emerald-400" />
                <span>End-to-End Local</span>
              </div>
            </motion.div>
          </div>

          {/* Column 2: Interactive Sound Simulator Widget */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:col-span-5 w-full pt-4 lg:pt-0"
          >
            <SoundSimulatorCard onStartSend={onStartSend} onStartReceive={onStartReceive} />
          </motion.div>
        </div>

        {/* History Section */}
        <div className="pt-8 sm:pt-12 border-t border-white/10 w-full">
          <h3 className="text-sm font-semibold text-gray-400 tracking-widest uppercase mb-4 sm:mb-6 flex items-center justify-center space-x-2">
            <History size={16} className="text-blue-400" />
            <span>Transmission History</span>
          </h3>

          {(() => {
            const historyStr = localStorage.getItem('WavBit_history');
            if (!historyStr)
              return (
                <div className="text-center py-6 px-4 rounded-2xl bg-white/[0.02] border border-white/5 max-w-xl mx-auto">
                  <Waves size={28} className="mx-auto text-gray-600 mb-2 opacity-50" />
                  <p className="text-sm text-gray-500 font-medium">No acoustic transmissions recorded yet.</p>
                  <p className="text-xs text-gray-600 mt-1">Send or receive your first sound message above!</p>
                </div>
              );
            try {
              const history = JSON.parse(historyStr);
              if (history.length === 0)
                return (
                  <div className="text-center py-6 px-4 rounded-2xl bg-white/[0.02] border border-white/5 max-w-xl mx-auto">
                    <Waves size={28} className="mx-auto text-gray-600 mb-2 opacity-50" />
                    <p className="text-sm text-gray-500 font-medium">No acoustic transmissions recorded yet.</p>
                    <p className="text-xs text-gray-600 mt-1">Send or receive your first sound message above!</p>
                  </div>
                );
              return (
                <div className="space-y-4 max-w-3xl mx-auto">
                  <div className="space-y-3">
                    {history
                      .slice()
                      .reverse()
                      .slice(0, 3)
                      .map((item: any, i: number) => (
                        <div
                          key={i}
                          className="bg-white/5 border border-white/10 p-4 rounded-2xl flex items-start justify-between backdrop-blur-md hover:bg-white/[0.07] transition-all"
                        >
                          <div className="flex items-start gap-3.5 w-full">
                            <div
                              className={`mt-0.5 p-2.5 rounded-xl ${
                                item.type === 'sent' ? 'bg-purple-500/20 text-purple-400 border border-purple-500/30' : 'bg-blue-500/20 text-blue-400 border border-blue-500/30'
                              }`}
                            >
                              {item.type === 'sent' ? <Volume2 size={18} /> : <Mic size={18} />}
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center justify-between mb-1">
                                <div className="text-[10px] font-bold uppercase tracking-widest text-gray-400 flex items-center gap-1.5">
                                  <span className={`w-1.5 h-1.5 rounded-full ${item.type === 'sent' ? 'bg-purple-400' : 'bg-blue-400'}`}></span>
                                  {item.type === 'sent' ? 'Sent Signal' : 'Received Signal'}
                                </div>
                                <div className="text-[11px] text-gray-500 font-mono">
                                  {new Date(item.timestamp).toLocaleTimeString([], {
                                    hour: '2-digit',
                                    minute: '2-digit',
                                  })}
                                </div>
                              </div>
                              <div className="text-sm sm:text-base font-medium text-gray-100 truncate">
                                {item.message}
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                  </div>
                  {history.length > 3 && (
                    <button
                      onClick={onViewHistory}
                      className="w-full py-3.5 rounded-2xl bg-white/5 text-gray-300 font-bold text-xs tracking-widest uppercase border border-white/10 transition-all hover:bg-white/10 hover:text-white cursor-pointer"
                    >
                      View All {history.length} Transmissions
                    </button>
                  )}
                </div>
              );
            } catch (e) {
              return null;
            }
          })()}
        </div>

        {/* SEO Content Section right after Transmission History */}
        <div className="mt-12">
          <SeoSection />
        </div>
      </main>
    </div>
  );
}
