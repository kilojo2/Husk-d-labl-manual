'use client';

import { useEffect } from 'react';
import StreamPanel from './StreamPanel';
import ChatInterface from './ChatInterface';
import SettingsPanel from './SettingsPanel';
import TopBar from './TopBar';
import { useSimulatorState } from '../lib/simulator-state';
import { generateRandomMessage } from '../lib/mock-data';

export default function BongaCamsSimulator() {
  const { isLive, addMessage } = useSimulatorState();

  // Auto-generate messages when live
  useEffect(() => {
    if (!isLive) return;

    const interval = setInterval(() => {
      const message = generateRandomMessage();
      addMessage(message);
    }, Math.random() * 5000 + 3000); // Random interval between 3-8 seconds

    return () => clearInterval(interval);
  }, [isLive, addMessage]);

  return (
    <div className="flex flex-col h-screen bg-[#1a1a1a] text-white">
      {/* Top Bar */}
      <TopBar />

      {/* Main Content */}
      <div className="flex flex-1 overflow-hidden">
        {/* Left: Stream Panel (60%) */}
        <div className="flex-[6] border-r border-[#2a2a2a] overflow-y-auto">
          <StreamPanel />
        </div>

        {/* Right: Chat Interface (40%) */}
        <div className="flex-[4] flex flex-col">
          <ChatInterface />
        </div>
      </div>

      {/* Bottom: Settings Panel */}
      <div className="border-t border-[#2a2a2a]">
        <SettingsPanel />
      </div>
    </div>
  );
}
