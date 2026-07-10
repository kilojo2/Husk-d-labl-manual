'use client';

import { useSimulatorState } from '../lib/simulator-state';

export default function StreamPanel() {
  const {
    isLive,
    isPrivate,
    cameraEnabled,
    micEnabled,
    currentGoal,
    toggleStream,
    togglePrivate,
    toggleCamera,
    toggleMic,
  } = useSimulatorState();

  return (
    <div className="p-6 space-y-6">
      {/* Video Preview Area */}
      <div className="relative aspect-video bg-[#000] rounded-lg overflow-hidden border border-[#3a3a3a]">
        {cameraEnabled ? (
          <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-[#a91838]/20 to-[#ff6b9d]/20">
            <div className="text-center">
              <div className="w-32 h-32 mx-auto mb-4 rounded-full bg-gradient-to-br from-[#a91838] to-[#ff6b9d] flex items-center justify-center">
                <svg className="w-16 h-16 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
              </div>
              <p className="text-white text-lg font-medium">Camera Preview</p>
              <p className="text-gray-400 text-sm mt-1">This is a simulator - no real video</p>
            </div>
          </div>
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <svg className="w-16 h-16 mx-auto mb-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
              </svg>
              <p className="text-gray-400">Camera Off</p>
            </div>
          </div>
        )}

        {/* Stream Status Overlay */}
        {isLive && (
          <div className="absolute top-4 left-4 flex gap-2">
            <span className="px-3 py-1 bg-red-600 text-white text-sm font-bold rounded flex items-center gap-1">
              <span className="w-2 h-2 bg-white rounded-full animate-pulse"></span>
              LIVE
            </span>
            {isPrivate && (
              <span className="px-3 py-1 bg-[#a91838] text-white text-sm font-bold rounded">
                PRIVATE
              </span>
            )}
          </div>
        )}
      </div>

      {/* Control Buttons */}
      <div className="grid grid-cols-2 gap-4">
        <button
          onClick={toggleStream}
          className={`px-6 py-4 rounded-lg font-bold text-lg transition-all ${
            isLive
              ? 'bg-red-600 hover:bg-red-700 text-white'
              : 'bg-[#4caf50] hover:bg-[#45a049] text-white'
          }`}
        >
          {isLive ? '⏹ Stop Stream' : '▶ Start Stream'}
        </button>

        <button
          onClick={togglePrivate}
          disabled={!isLive}
          className={`px-6 py-4 rounded-lg font-bold text-lg transition-all ${
            !isLive
              ? 'bg-gray-700 text-gray-500 cursor-not-allowed'
              : isPrivate
              ? 'bg-[#a91838] hover:bg-[#8a1530] text-white'
              : 'bg-[#ff6b9d] hover:bg-[#e55a8c] text-white'
          }`}
        >
          {isPrivate ? '🔒 End Private' : '🔒 Go Private'}
        </button>

        <button
          onClick={toggleCamera}
          className={`px-6 py-3 rounded-lg font-medium transition-all ${
            cameraEnabled
              ? 'bg-[#2a2a2a] hover:bg-[#3a3a3a] text-white'
              : 'bg-gray-700 text-gray-400'
          }`}
        >
          📹 Camera: {cameraEnabled ? 'On' : 'Off'}
        </button>

        <button
          onClick={toggleMic}
          className={`px-6 py-3 rounded-lg font-medium transition-all ${
            micEnabled
              ? 'bg-[#2a2a2a] hover:bg-[#3a3a3a] text-white'
              : 'bg-gray-700 text-gray-400'
          }`}
        >
          🎤 Mic: {micEnabled ? 'On' : 'Off'}
        </button>
      </div>

      {/* Current Goal */}
      {currentGoal && (
        <div className="bg-[#2a2a2a] rounded-lg p-4">
          <div className="flex justify-between items-center mb-2">
            <h3 className="font-bold text-lg">🎯 {currentGoal.title}</h3>
            <span className="text-[#4caf50] font-bold">
              {currentGoal.currentTokens}/{currentGoal.targetTokens} tokens
            </span>
          </div>
          <div className="w-full bg-[#1a1a1a] rounded-full h-3 overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-[#a91838] to-[#ff6b9d] transition-all duration-500"
              style={{
                width: `${(currentGoal.currentTokens / currentGoal.targetTokens) * 100}%`,
              }}
            />
          </div>
        </div>
      )}

      {/* Quick Actions */}
      <div className="bg-[#2a2a2a] rounded-lg p-4">
        <h3 className="font-bold mb-3">Quick Actions</h3>
        <div className="grid grid-cols-3 gap-2">
          <button className="px-4 py-2 bg-[#3a3a3a] hover:bg-[#4a4a4a] rounded text-sm transition-all">
            Set Goal
          </button>
          <button className="px-4 py-2 bg-[#3a3a3a] hover:bg-[#4a4a4a] rounded text-sm transition-all">
            Tip Menu
          </button>
          <button className="px-4 py-2 bg-[#3a3a3a] hover:bg-[#4a4a4a] rounded text-sm transition-all">
            Room Topic
          </button>
        </div>
      </div>
    </div>
  );
}
