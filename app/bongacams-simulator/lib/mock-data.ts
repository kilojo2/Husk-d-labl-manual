export interface ChatMessage {
  id: string;
  username: string;
  role: 'guest' | 'member' | 'vip' | 'moderator';
  message: string;
  timestamp: Date;
  isTip?: boolean;
  tipAmount?: number;
}

export interface Viewer {
  username: string;
  role: 'guest' | 'member' | 'vip' | 'moderator';
  tokens: number;
}

export const MOCK_VIEWERS: Viewer[] = [
  { username: 'User123', role: 'guest', tokens: 0 },
  { username: 'RegularFan', role: 'member', tokens: 150 },
  { username: 'BigSpender', role: 'vip', tokens: 5000 },
  { username: 'ModHelper', role: 'moderator', tokens: 1000 },
  { username: 'NewUser45', role: 'guest', tokens: 0 },
  { username: 'TokenKing', role: 'vip', tokens: 3200 },
  { username: 'SupportGuy', role: 'member', tokens: 500 },
];

export const MESSAGE_TEMPLATES = [
  'Привет! 👋',
  'Hello beautiful! 😍',
  'You look amazing today!',
  'Show more please',
  '🔥🔥🔥',
  'How are you?',
  'Nice show!',
  'Love your style 💕',
  'Can you dance?',
  'Смайл для меня? 😊',
];

export const TIP_AMOUNTS = [10, 25, 50, 100, 250, 500, 1000];

export const TIP_MESSAGES = [
  'Thanks for the show!',
  'You deserve it! 💰',
  'Keep going!',
  'Amazing performance!',
  'For being awesome!',
];

export function generateRandomMessage(): ChatMessage {
  const viewer = MOCK_VIEWERS[Math.floor(Math.random() * MOCK_VIEWERS.length)];
  const isTip = Math.random() < 0.15; // 15% chance of tip
  
  return {
    id: `msg-${Date.now()}-${Math.random()}`,
    username: viewer.username,
    role: viewer.role,
    message: isTip 
      ? TIP_MESSAGES[Math.floor(Math.random() * TIP_MESSAGES.length)]
      : MESSAGE_TEMPLATES[Math.floor(Math.random() * MESSAGE_TEMPLATES.length)],
    timestamp: new Date(),
    isTip,
    tipAmount: isTip ? TIP_AMOUNTS[Math.floor(Math.random() * TIP_AMOUNTS.length)] : undefined,
  };
}
