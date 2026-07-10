import { create } from 'zustand';
import { ChatMessage, Viewer, MOCK_VIEWERS } from './mock-data';

export interface Goal {
  id: string;
  title: string;
  targetTokens: number;
  currentTokens: number;
}

interface SimulatorState {
  // Stream state
  isLive: boolean;
  isPrivate: boolean;
  cameraEnabled: boolean;
  micEnabled: boolean;
  currentGoal: Goal | null;
  viewers: number;
  earnings: number;
  
  // Chat state
  messages: ChatMessage[];
  activeViewers: Viewer[];
  
  // Actions
  toggleStream: () => void;
  togglePrivate: () => void;
  toggleCamera: () => void;
  toggleMic: () => void;
  addMessage: (message: ChatMessage) => void;
  setGoal: (goal: Goal | null) => void;
  addTip: (amount: number) => void;
}

export const useSimulatorState = create<SimulatorState>((set) => ({
  // Initial state
  isLive: false,
  isPrivate: false,
  cameraEnabled: true,
  micEnabled: true,
  currentGoal: null,
  viewers: 0,
  earnings: 0,
  messages: [],
  activeViewers: MOCK_VIEWERS,
  
  // Actions
  toggleStream: () => set((state) => {
    const newIsLive = !state.isLive;
    return {
      isLive: newIsLive,
      viewers: newIsLive ? Math.floor(Math.random() * 50) + 10 : 0,
    };
  }),
  
  togglePrivate: () => set((state) => ({
    isPrivate: !state.isPrivate,
    viewers: !state.isPrivate ? 1 : Math.floor(Math.random() * 50) + 10,
  })),
  
  toggleCamera: () => set((state) => ({
    cameraEnabled: !state.cameraEnabled,
  })),
  
  toggleMic: () => set((state) => ({
    micEnabled: !state.micEnabled,
  })),
  
  addMessage: (message) => set((state) => ({
    messages: [...state.messages, message].slice(-50), // Keep last 50 messages
  })),
  
  setGoal: (goal) => set({ currentGoal: goal }),
  
  addTip: (amount) => set((state) => {
    const newEarnings = state.earnings + amount * 0.5; // 50% commission
    const newGoal = state.currentGoal ? {
      ...state.currentGoal,
      currentTokens: Math.min(
        state.currentGoal.currentTokens + amount,
        state.currentGoal.targetTokens
      ),
    } : null;
    
    return {
      earnings: newEarnings,
      currentGoal: newGoal,
    };
  }),
}));
