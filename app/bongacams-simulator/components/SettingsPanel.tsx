'use client';

import { useState } from 'react';
import { useSimulatorState } from '../lib/simulator-state';

type Tab = 'profile' | 'show' | 'goals' | 'notifications';

export default function SettingsPanel() {
  const [activeTab, setActiveTab] = useState<Tab>('profile');
  const [isExpanded, setIsExpanded] = useState(false);
  const { setGoal } = useSimulatorState();

  const tabs: { id: Tab; label: string; icon: string }[] = [
    { id: 'profile', label: 'Profile', icon: '👤' },
    { id: 'show', label: 'Show Settings', icon: '⚙️' },
    { id: 'goals', label: 'Goals & Apps', icon: '🎯' },
    { id: 'notifications', label: 'Notifications', icon: '🔔' },
  ];

  return (
    <div className="bg-[#2a2a2a]">
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-3 border-b border-[#3a3a3a]">
        <h3 className="font-bold flex items-center gap-2">
          ⚙️ Settings & Configuration
        </h3>
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="px-4 py-2 bg-[#3a3a3a] hover:bg-[#4a4a4a] rounded text-sm transition-all"
        >
          {isExpanded ? '▼ Collapse' : '▲ Expand'}
        </button>
      </div>

      {/* Tabs and Content */}
      {isExpanded && (
        <div className="p-6">
          {/* Tab Navigation */}
          <div className="flex gap-2 mb-6 border-b border-[#3a3a3a]">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-6 py-3 font-medium transition-all ${
                  activeTab === tab.id
                    ? 'border-b-2 border-[#a91838] text-white'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                {tab.icon} {tab.label}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <div className="space-y-4">
            {activeTab === 'profile' && (
              <div className="space-y-4">
                <h4 className="font-bold text-lg mb-4">Profile Settings</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm text-gray-400 mb-2">Display Name</label>
                    <input
                      type="text"
                      placeholder="Model Name"
                      disabled
                      className="w-full px-4 py-2 bg-[#3a3a3a] text-gray-500 rounded cursor-not-allowed"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-400 mb-2">Languages</label>
                    <input
                      type="text"
                      placeholder="English, Russian"
                      disabled
                      className="w-full px-4 py-2 bg-[#3a3a3a] text-gray-500 rounded cursor-not-allowed"
                    />
                  </div>
                  <div className="col-span-2">
                    <label className="block text-sm text-gray-400 mb-2">Bio / Description</label>
                    <textarea
                      placeholder="Tell viewers about yourself..."
                      rows={3}
                      disabled
                      className="w-full px-4 py-2 bg-[#3a3a3a] text-gray-500 rounded cursor-not-allowed resize-none"
                    />
                  </div>
                </div>
                <p className="text-sm text-gray-500 mt-4">
                  💡 Profile editing is disabled in simulator mode
                </p>
              </div>
            )}

            {activeTab === 'show' && (
              <div className="space-y-4">
                <h4 className="font-bold text-lg mb-4">Show Settings</h4>
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm text-gray-400 mb-2">Private Show Rate</label>
                    <div className="flex items-center gap-2">
                      <input
                        type="number"
                        placeholder="30"
                        disabled
                        className="w-full px-4 py-2 bg-[#3a3a3a] text-gray-500 rounded cursor-not-allowed"
                      />
                      <span className="text-gray-400 text-sm">tokens/min</span>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm text-gray-400 mb-2">Group Show Rate</label>
                    <div className="flex items-center gap-2">
                      <input
                        type="number"
                        placeholder="20"
                        disabled
                        className="w-full px-4 py-2 bg-[#3a3a3a] text-gray-500 rounded cursor-not-allowed"
                      />
                      <span className="text-gray-400 text-sm">tokens/min</span>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm text-gray-400 mb-2">Spy Show Rate</label>
                    <div className="flex items-center gap-2">
                      <input
                        type="number"
                        placeholder="10"
                        disabled
                        className="w-full px-4 py-2 bg-[#3a3a3a] text-gray-500 rounded cursor-not-allowed"
                      />
                      <span className="text-gray-400 text-sm">tokens/min</span>
                    </div>
                  </div>
                </div>
                <div>
                  <label className="block text-sm text-gray-400 mb-2">Block Regions</label>
                  <input
                    type="text"
                    placeholder="Select countries to block..."
                    disabled
                    className="w-full px-4 py-2 bg-[#3a3a3a] text-gray-500 rounded cursor-not-allowed"
                  />
                </div>
                <p className="text-sm text-gray-500 mt-4">
                  💡 Show settings are disabled in simulator mode
                </p>
              </div>
            )}

            {activeTab === 'goals' && (
              <div className="space-y-4">
                <h4 className="font-bold text-lg mb-4">Goals & Interactive Apps</h4>
                
                <div className="bg-[#3a3a3a] rounded-lg p-4">
                  <h5 className="font-bold mb-3">Set a Goal</h5>
                  <div className="grid grid-cols-2 gap-4">
                    <input
                      type="text"
                      placeholder="Goal title (e.g., Topless)"
                      id="goalTitle"
                      className="px-4 py-2 bg-[#2a2a2a] text-white rounded"
                    />
                    <input
                      type="number"
                      placeholder="Target tokens"
                      id="goalTokens"
                      className="px-4 py-2 bg-[#2a2a2a] text-white rounded"
                    />
                  </div>
                  <button
                    onClick={() => {
                      const title = (document.getElementById('goalTitle') as HTMLInputElement)?.value;
                      const tokens = parseInt((document.getElementById('goalTokens') as HTMLInputElement)?.value);
                      if (title && tokens) {
                        setGoal({
                          id: Date.now().toString(),
                          title,
                          targetTokens: tokens,
                          currentTokens: 0,
                        });
                      }
                    }}
                    className="mt-4 w-full px-6 py-3 bg-[#a91838] hover:bg-[#8a1530] text-white rounded-lg font-bold transition-all"
                  >
                    Set Goal
                  </button>
                </div>

                <div className="bg-[#3a3a3a] rounded-lg p-4">
                  <h5 className="font-bold mb-3">Interactive Apps</h5>
                  <div className="space-y-2">
                    <button className="w-full px-4 py-3 bg-[#2a2a2a] hover:bg-[#1a1a1a] rounded text-left transition-all">
                      🎡 Wheel of Fortune
                    </button>
                    <button className="w-full px-4 py-3 bg-[#2a2a2a] hover:bg-[#1a1a1a] rounded text-left transition-all">
                      🎲 Dice Game
                    </button>
                    <button className="w-full px-4 py-3 bg-[#2a2a2a] hover:bg-[#1a1a1a] rounded text-left transition-all">
                      📋 Tip Menu
                    </button>
                  </div>
                  <p className="text-sm text-gray-500 mt-3">
                    💡 These apps are for demonstration only
                  </p>
                </div>
              </div>
            )}

            {activeTab === 'notifications' && (
              <div className="space-y-4">
                <h4 className="font-bold text-lg mb-4">Notification Settings</h4>
                <div className="space-y-3">
                  <label className="flex items-center gap-3 p-3 bg-[#3a3a3a] rounded-lg">
                    <input type="checkbox" defaultChecked disabled className="w-5 h-5" />
                    <div>
                      <p className="font-medium">Sound Alerts</p>
                      <p className="text-sm text-gray-400">Play sound for tips and messages</p>
                    </div>
                  </label>
                  <label className="flex items-center gap-3 p-3 bg-[#3a3a3a] rounded-lg">
                    <input type="checkbox" defaultChecked disabled className="w-5 h-5" />
                    <div>
                      <p className="font-medium">Tip Alerts</p>
                      <p className="text-sm text-gray-400">Show on-screen tip notifications</p>
                    </div>
                  </label>
                  <label className="flex items-center gap-3 p-3 bg-[#3a3a3a] rounded-lg">
                    <input type="checkbox" defaultChecked disabled className="w-5 h-5" />
                    <div>
                      <p className="font-medium">Private Show Requests</p>
                      <p className="text-sm text-gray-400">Notify for private show requests</p>
                    </div>
                  </label>
                </div>
                <p className="text-sm text-gray-500 mt-4">
                  💡 Notification settings are disabled in simulator mode
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
