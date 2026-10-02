import React from 'react';
import { ArrowLeft } from 'lucide-react';

export type HeaderColorTheme = 'blue' | 'emerald' | 'cyan' | 'gray';

interface AppHeaderProps {
  title: string;
  rightContent?: React.ReactNode;
  colorTheme?: HeaderColorTheme;
}

export function AppHeader({ title, rightContent, colorTheme = 'blue' }: AppHeaderProps) {
  const themeClasses = {
    blue: {
      bg: 'bg-blue-500/10',
      border: 'border-blue-500/20',
      dot: 'bg-blue-500',
      dotShadow: 'shadow-[0_0_8px_#3b82f6]',
      text: 'text-blue-400 drop-shadow-[0_0_8px_rgba(96,165,250,0.4)]',
      pillShadow: 'shadow-[0_0_12px_rgba(59,130,246,0.15)]',
    },
    emerald: {
      bg: 'bg-emerald-500/10',
      border: 'border-emerald-500/20',
      dot: 'bg-emerald-500',
      dotShadow: 'shadow-[0_0_8px_#10b981]',
      text: 'text-emerald-400 drop-shadow-[0_0_8px_rgba(52,211,153,0.4)]',
      pillShadow: 'shadow-[0_0_12px_rgba(16,185,129,0.15)]',
    },
    cyan: {
      bg: 'bg-cyan-500/10',
      border: 'border-cyan-500/20',
      dot: 'bg-cyan-500',
      dotShadow: 'shadow-[0_0_8px_#06b6d4]',
      text: 'text-cyan-400 drop-shadow-[0_0_8px_rgba(34,211,238,0.4)]',
      pillShadow: 'shadow-[0_0_12px_rgba(6,182,212,0.15)]',
    },
    gray: {
      bg: 'bg-gray-500/10',
      border: 'border-gray-500/20',
      dot: 'bg-gray-500',
      dotShadow: 'shadow-[0_0_8px_#6b7280]',
      text: 'text-gray-400 drop-shadow-[0_0_8px_rgba(156,163,175,0.4)]',
      pillShadow: 'shadow-[0_0_12px_rgba(107,114,128,0.15)]',
    },
  };

  const t = themeClasses[colorTheme];

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-4 sm:px-10 h-16 sm:h-20 border-b border-white/10 bg-[#020408]/85 backdrop-blur-xl w-full transition-all">
        <div className="flex items-center h-full gap-2 sm:gap-4">
          <div className="flex items-center h-full">
            <img
              src="/WavBit-logo.png"
              alt="WavBit Logo"
              className="h-full w-auto p-[6px] object-contain drop-shadow-[0_0_12px_rgba(59,130,246,0.4)]"
            />
            <span className="text-2xl sm:text-3xl md:text-4xl font-black tracking-tighter text-white">
              Wav<span className="text-blue-400">Bit</span>
            </span>
          </div>
        </div>
        <div className="flex items-center gap-2 sm:gap-4">
          <div
            className={`flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 py-1 sm:py-1.5 ${t.bg} border ${t.border} ${t.pillShadow} rounded-full shrink-0 max-w-[130px] sm:max-w-none truncate transition-colors duration-500`}
          >
            <div className={`w-2 h-2 ${t.dot} rounded-full ${t.dotShadow} shrink-0`}></div>
            <span
              className={`text-[10px] sm:text-[11px] font-mono uppercase tracking-widest ${t.text} truncate transition-colors duration-500`}
            >
              {title}
            </span>
          </div>
          {rightContent}
        </div>
      </header>
      {/* Spacer element to reserve header height so page content starts below the fixed header */}
      <div
        className="h-[64px] sm:h-[80px] shrink-0 w-full pointer-events-none"
        aria-hidden="true"
      />
    </>
  );
}
