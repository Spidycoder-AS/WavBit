import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { HugeiconsIcon } from '@hugeicons/react';
import { AiSpeechIcon } from '@hugeicons/core-free-icons';

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
    <header className="relative z-20 flex items-center justify-between px-4 sm:px-10 py-4 sm:py-6 border-b border-white/5 bg-black/40 backdrop-blur-xl sticky top-0 w-full">
      <div className="flex items-center gap-2 sm:gap-4">
        <div className="flex items-center gap-2 sm:gap-3">
          <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-lg bg-gradient-to-tr from-blue-500 to-purple-600 flex items-center justify-center shadow-lg shadow-blue-500/20 shrink-0">
            <HugeiconsIcon icon={AiSpeechIcon} className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white animate-pulse" strokeWidth={2.5} />
          </div>
          <span className="text-lg sm:text-2xl font-black tracking-tighter text-white">
            Wav<span className="text-blue-400">Bit</span>
          </span>
        </div>
      </div>
      <div className="flex items-center gap-2 sm:gap-4">
        <div className={`flex items-center gap-1.5 sm:gap-2 px-2 sm:px-3 py-1 ${t.bg} border ${t.border} ${t.pillShadow} rounded-full shrink-0 max-w-[120px] sm:max-w-none truncate transition-colors duration-500`}>
          <div className={`w-1.5 h-1.5 ${t.dot} rounded-full ${t.dotShadow} shrink-0`}></div>
          <span className={`text-[9px] sm:text-[10px] font-mono uppercase tracking-widest ${t.text} truncate transition-colors duration-500`}>
            {title}
          </span>
        </div>
        {rightContent}
      </div>
    </header>
  );
}
