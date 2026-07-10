'use client';

import { useEffect, useRef } from 'react';
import { useSimulatorState } from '../lib/simulator-state';

export default function ChatInterface() {
  const { messages, activeViewers } = useSimulatorState();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'moderator': return 'text-[#4caf50]';
      case 'vip': return 'text-[#ff6b9d]';
      case 'member': return 'text-[#a91838]';
      default: return 'text-gray-400';
    }
  };

  const getRoleBadge = (role: string) => {
    switch (role) {
      case 'moderator': return '👮';
      case 'vip': return '⭐';
      case 'member': return '💎';
      default: return '';
    }
  };

  return (
    <div className="flex flex-col h-full">
      {/* Viewer List Header */}
      <div className="bg-[#2a2a2a] px-4 py-3 border-b border-[#3a3a3a]">
        <h3 className="font-bold text-sm flex items-center gap-2">
          <span>👥 Viewers</span>
          <span className="text-gray-400">({activeViewers.length})</span>
        </h3>
      </div>

      {/* Viewer List */}
      <div className="bg-[#2a2a2a] px-4 py-2 space-y-1 border-b border-[#3a3a3a]">
        {activeViewers.slice(0, 5).map((viewer) => (
          <div key={viewer.username} className="flex items-center justify-between text-sm">
            <span className={`flex items-center gap-1 ${getRoleColor(viewer.role)}`}>
              {getRoleBadge(viewer.role)} {viewer.username}
            </span>
            {viewer.tokens > 0 && (
              <span className="text-xs text-gray-500">{viewer.tokens}🪙</span>
            )}
          </div>
        ))}
        {activeViewers.length > 5 && (
          <p className="text-xs text-gray-500 text-center mt-2">
            +{activeViewers.length - 5} more...
          </p>
        )}
      </div>

      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-[#1a1a1a]">
        {messages.length === 0 ? (
          <div className="text-center text-gray-500 mt-8">
            <p>💬</p>
            <p className="text-sm mt-2">No messages yet</p>
            <p className="text-xs mt-1">Start streaming to see chat activity</p>
          </div>
        ) : (
          messages.map((msg) => (
            <div key={msg.id} className="space-y-1">
              {msg.isTip && (
                <div className="bg-[#4caf50]/20 border border-[#4caf50]/50 rounded-lg p-3 animate-pulse">
                  <p className="text-[#4caf50] font-bold text-sm flex items-center gap-2">
                    💰 {msg.username} tipped {msg.tipAmount} tokens!
                  </p>
                  {msg.message && (
                    <p className="text-white text-sm mt-1">"{msg.message}"</p>
                  )}
                </div>
              )}
              {!msg.isTip && (
                <div>
                  <span className={`font-bold text-sm ${getRoleColor(msg.role)}`}>
                    {getRoleBadge(msg.role)} {msg.username}:
                  </span>
                  <span className="text-white text-sm ml-2">{msg.message}</span>
                </div>
              )}
            </div>
          ))
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Message Input */}
      <div className="bg-[#2a2a2a] p-4 border-t border-[#3a3a3a]">
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Type a message... (disabled in simulator)"
            disabled
            className="flex-1 px-4 py-2 bg-[#3a3a3a] text-gray-500 rounded-lg cursor-not-allowed"
          />
          <button
            disabled
            className="px-6 py-2 bg-[#a91838]/50 text-gray-500 rounded-lg font-bold cursor-not-allowed"
          >
            Send
          </button>
        </div>
        <p className="text-xs text-gray-500 mt-2 text-center">
          💡 Messages are auto-generated in this simulator
        </p>
      </div>
    </div>
  );
}
