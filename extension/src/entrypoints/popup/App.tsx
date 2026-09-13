import React, { useState, useEffect, useRef, useCallback } from 'react';
import { browser, Browser } from 'wxt/browser';
import { useTheme } from '../../utils/theme';
import { ThemeToggle } from '../../components/ThemeToggle';

const App: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  const [task, setTask] = useState<string>('');
  const [logs, setLogs] = useState<string[]>([]);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const logEndRef = useRef<HTMLDivElement | null>(null);

  // Auto-scroll to bottom of logs
  const scrollToBottom = useCallback(() => {
    logEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [logs, scrollToBottom]);

  // Listen for LOG_UPDATE messages
  useEffect(() => {
    const messageListener = (
      message: { type: string; payload: string },
      _sender: Browser.runtime.MessageSender,
      _sendResponse: (response?: unknown) => void
    ) => {
      if (message.type === 'LOG_UPDATE') {
        setLogs((prevLogs) => [...prevLogs, message.payload]);
        if (message.payload.includes('✅ Task Complete!') || message.payload.includes('Aborting') || message.payload.includes('Agent loop error')) {
          setIsRunning(false);
        }
      }
    };

    browser.runtime.onMessage.addListener(messageListener);

    return () => {
      browser.runtime.onMessage.removeListener(messageListener);
    };
  }, []);

  // Handle "Run Agent" button click
  const handleRunAgent = () => {
    if (!task.trim() || isRunning) return;

    setIsRunning(true);

    try {
      browser.runtime.sendMessage({
        type: 'START_AGENT',
        payload: task,
      });
    } catch (error) {
      console.error('❌ Failed to send message to background script:', error);
      setIsRunning(false);
    }
  };

  // Mission Control: open the full-tab dashboard
  const handleOpenDashboard = () => {
    const url = browser.runtime.getURL('/dashboard.html');
    browser.tabs.create({ url });
  };

  // Open native persistent Chrome side panel
  const handleOpenSidePanel = async () => {
    try {
      const [tab] = await browser.tabs.query({ active: true, currentWindow: true });
      if (tab?.windowId && (chrome as any)?.sidePanel?.open) {
        await (chrome as any).sidePanel.open({ windowId: tab.windowId });
        window.close();
      }
    } catch (e) {
      console.warn('Could not open sidePanel:', e);
    }
  };

  return (
    <div className="w-88 min-h-[460px] bg-champagne-base dark:bg-royal-navy-950 text-royal-navy dark:text-gray-100 flex flex-col p-4 font-sans select-none transition-colors duration-200">
      {/* Header */}
      <div className="flex items-center justify-between pb-3 mb-3 border-b border-champagne-border dark:border-royal-navy-800">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-md bg-royal-navy dark:bg-royal-navy-900 border border-aureate-gold flex items-center justify-center shadow-xs">
            <svg className="w-3.5 h-3.5 text-aureate-gold" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
            </svg>
          </div>
          <div>
            <span className="font-serif font-bold text-xs tracking-wider text-royal-navy dark:text-white uppercase block">
              Sovereign Agent
            </span>
            <span className="text-[9px] font-mono text-royal-navy-500 dark:text-royal-navy-400">
              Zero-Trust Guard
            </span>
          </div>
        </div>
        <ThemeToggle theme={theme} onToggle={toggleTheme} compact />
      </div>

      {/* Task textarea */}
      <textarea
        value={task}
        onChange={(e) => setTask(e.target.value)}
        placeholder="Enter sovereign task (e.g. Find best puma shoes under 2.5k)..."
        rows={3}
        className="w-full p-2.5 mb-2.5 bg-champagne-sub dark:bg-royal-navy-900 border border-champagne-border dark:border-royal-navy-700 rounded-lg text-xs text-royal-navy dark:text-white placeholder-gray-400 dark:placeholder-gray-500 resize-none focus:outline-none focus:border-aureate-gold dark:focus:border-aureate-gold focus:ring-1 focus:ring-aureate-gold shadow-inner"
      />

      {/* Run Agent button */}
      <button
        onClick={handleRunAgent}
        disabled={isRunning || !task.trim()}
        className={`w-full py-2 px-3 rounded-lg font-medium text-xs transition-all duration-150 flex items-center justify-center gap-2 ${
          isRunning || !task.trim()
            ? 'bg-gray-200 dark:bg-royal-navy-800 text-gray-400 dark:text-gray-500 cursor-not-allowed border border-gray-300 dark:border-royal-navy-700'
            : 'bg-royal-navy hover:bg-royal-navy-800 text-champagne-surface border border-aureate-gold/50 shadow-royal-gold'
        }`}
      >
        {isRunning ? (
          <>
            <svg className="animate-spin h-3.5 w-3.5 text-aureate-gold" viewBox="0 0 24 24" fill="none">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
            </svg>
            <span className="font-mono text-aureate-gold-light">Executing...</span>
          </>
        ) : (
          <>
            <span className="text-aureate-gold">⚡</span>
            <span className="font-serif">Run Autonomous Agent</span>
          </>
        )}
      </button>

      {/* Side Panel Dock button */}
      <button
        onClick={handleOpenSidePanel}
        className="w-full mt-2 py-1.5 px-3 rounded-lg font-mono text-xs border border-champagne-border dark:border-royal-navy-700 bg-champagne-sub dark:bg-royal-navy-900 text-royal-navy-700 dark:text-gray-300 hover:border-aureate-gold hover:text-royal-navy dark:hover:text-white transition-colors duration-150 flex items-center justify-center gap-1.5 shadow-xs"
      >
        <span>📌</span>
        <span>Dock to Side Panel (Persistent)</span>
      </button>

      {/* Mission Control dashboard button */}
      <button
        onClick={handleOpenDashboard}
        className="w-full mt-1.5 py-1.5 px-3 rounded-lg font-mono text-xs border border-champagne-border dark:border-royal-navy-700 bg-champagne-sub dark:bg-royal-navy-900 text-royal-navy-700 dark:text-gray-300 hover:border-aureate-gold hover:text-royal-navy dark:hover:text-white transition-colors duration-150 flex items-center justify-center gap-1.5 shadow-xs"
      >
        <span>🛰</span>
        <span>Open Mission Control Cockpit</span>
      </button>

      {/* Log console */}
      <div className="flex-1 mt-3 max-h-36 overflow-y-auto bg-champagne-sub dark:bg-royal-navy-900 border border-champagne-border dark:border-royal-navy-800 rounded-lg p-2 font-mono text-[11px] shadow-inner">
        <div className="space-y-1">
          {logs.map((log, index) => (
            <div key={index} className="leading-snug break-words text-royal-navy-700 dark:text-emerald-400">
              {log}
            </div>
          ))}
          {logs.length === 0 && (
            <div className="text-gray-400 dark:text-gray-500 text-center py-4 font-serif italic text-xs">
              Awaiting sovereign commands...
            </div>
          )}
        </div>
        <div ref={logEndRef} />
      </div>
    </div>
  );
};

export default App;