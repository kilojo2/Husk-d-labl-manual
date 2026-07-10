'use client';

import { useSimulatorState } from '../lib/simulator-state';

export default function TopBar() {
  const { isLive, isPrivate, viewers, earnings } = useSimulatorState();

  return (
    <div className="bg-[#2a2a2a] px-6 py-4 border-b border-[#3a3a3a] flex items-center justify-between">
      {/* Left: Model Info */}
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#a91838] to-[#ff6b9d] flex items-center justify-center text-white font-bold text-lg">
          М
        </div>
        <div>
          <h2 className="font-bold text-lg">Model Name</h2>
          <div className="flex items-center gap-2 text-sm">
            <span className={`inline-flex items-center gap-1 ${isLive ? 'text-green-400' : 'text-gray-400'}`}>
              <span className={`w-2 h-2 rounded-full ${isLive ? 'bg-green-400' : 'bg-gray-400'}`}></span>
              {isLive ? (isPrivate ? 'Private Show' : 'Live') : 'Offline'}
            </span>
            {isLive && (
              <span className="text-gray-400">
                • {viewers} {viewers === 1 ? 'viewer' : 'viewers'}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Center: Notice */}
      <div className="text-center">
        <p className="text-sm text-[#ff6b9d] font-semibold">⚠️ Симулятор интерфейса BongaCams</p>
        <p className="text-xs text-gray-400">Все данные являются имитацией</p>
      </div>

      {/* Right: Earnings */}
      <div className="text-right">
        <p className="text-sm text-gray-400">Заработано сегодня</p>
        <p className="text-2xl font-bold text-[#4caf50]">${earnings.toFixed(2)}</p>
      </div>
    </div>
  );
}
