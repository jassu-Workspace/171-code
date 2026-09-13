import React from 'react';
import { Theme } from '../utils/theme';

interface ThemeToggleProps {
  theme: Theme;
  onToggle: () => void;
  compact?: boolean;
}

export const ThemeToggle: React.FC<ThemeToggleProps> = ({ theme, onToggle, compact = false }) => {
  const isLight = theme === 'light';

  if (compact) {
    return (
      <button
        onClick={onToggle}
        title={isLight ? 'Switch to Dark Mode (Obsidian)' : 'Switch to Light Mode (Royal Champagne)'}
        aria-label="Toggle theme"
        className="relative p-1.5 rounded-lg border transition-all duration-200 group bg-champagne-sub dark:bg-royal-navy-800 border-champagne-border dark:border-royal-navy-700 hover:border-aureate-gold dark:hover:border-aureate-gold shadow-sm hover:shadow-royal-gold"
      >
        {isLight ? (
          <svg className="w-4 h-4 text-aureate-gold transition-transform duration-300 group-hover:rotate-45" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
          </svg>
        ) : (
          <svg className="w-4 h-4 text-aureate-gold-light transition-transform duration-300 group-hover:-rotate-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
          </svg>
        )}
      </button>
    );
  }

  return (
    <button
      onClick={onToggle}
      title={isLight ? 'Switch to Dark Mode (Obsidian)' : 'Switch to Light Mode (Royal Champagne)'}
      aria-label="Toggle theme"
      className="flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-mono border transition-all duration-200 bg-champagne-surface dark:bg-royal-navy-900 border-champagne-border dark:border-royal-navy-700 hover:border-aureate-gold dark:hover:border-aureate-gold shadow-sm hover:shadow-royal-gold"
    >
      <div className={`w-3.5 h-3.5 rounded-full flex items-center justify-center transition-colors ${
        isLight ? 'text-aureate-dark' : 'text-aureate-gold-light'
      }`}>
        {isLight ? (
          <svg className="w-3.5 h-3.5 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
          </svg>
        ) : (
          <svg className="w-3.5 h-3.5 text-aureate-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
          </svg>
        )}
      </div>
      <span className="text-[11px] font-medium tracking-wide uppercase text-royal-navy-700 dark:text-royal-navy-200">
        {isLight ? 'Light' : 'Dark'}
      </span>
    </button>
  );
};
