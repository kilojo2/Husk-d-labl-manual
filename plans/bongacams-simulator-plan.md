# BongaCams Model Interface Simulator - Architectural Plan

## Overview

Create an interactive simulator of the BongaCams model interface within the existing Next.js knowledge base. Focus on three key areas:
1. Stream control panel (broadcast management)
2. Chat interface (viewer interactions)
3. Settings panel (profile and stream configuration)

## Project Context

**Current State:**
- Next.js 16.2.10 with App Router
- TypeScript + Tailwind CSS v4
- Existing navigation system with nested children support
- Component-based architecture (ArticlePage, MarkdownContent)

**Available Resources:**
- BongaSim/ folder with complete HTML/CSS/JS source files
- Original BongaCams styling (bm_guest_redesign.css)
- Profile images and UI assets
- Bonga/Main.png screenshot

## Architecture

### Route Structure

```
app/
  bongacams-simulator/
    page.tsx              # Main simulator entry
    layout.tsx            # Simulator-specific layout
    components/
      StreamPanel.tsx     # Broadcast controls
      ChatInterface.tsx   # Chat simulation
      SettingsPanel.tsx   # Configuration
      ViewerList.tsx      # Active viewers
      TokenCounter.tsx    # Earnings display
      StatusBar.tsx       # Connection status
```

### Component Hierarchy

```
BongaCamsSimulator
├── SimulatorLayout
│   ├── TopBar (model info, status, earnings)
│   ├── MainContent
│   │   ├── StreamPanel (left: 60%)
│   │   │   ├── VideoPreview
│   │   │   ├── StreamControls
│   │   │   │   ├── CameraToggle
│   │   │   │   ├── MicToggle
│   │   │   │   ├── PrivateShowButton
│   │   │   │   └── GoalSettings
│   │   │   └── QuickActions
│   │   └── ChatInterface (right: 40%)
│   │       ├── ChatMessages
│   │       ├── ViewerList
│   │       ├── TipNotifications
│   │       └── MessageInput
│   └── BottomPanel
│       └── SettingsTabs
│           ├── Profile
│           ├── ShowSettings
│           ├── Goals
│           └── Extensions
```

## Key Features

### 1. Stream Control Panel

**Components:**
- Video preview area (mock camera feed with placeholder)
- Stream status indicator (Online/Offline/Private)
- Control buttons:
  - Start/Stop stream
  - Camera on/off
  - Microphone on/off
  - Screen share
  - Private show toggle
- Quick settings:
  - Goal settings
  - Tip menu
  - Room topic

**State Management:**
```typescript
interface StreamState {
  isLive: boolean;
  isPrivate: boolean;
  cameraEnabled: boolean;
  micEnabled: boolean;
  currentGoal: Goal | null;
  viewers: number;
  earnings: number;
}
```

### 2. Chat Interface

**Components:**
- Message feed with scrolling
- Viewer list with roles (guest/member/moderator)
- Tip notifications
- Auto-generated messages simulation
- Emoji support
- Private message handling

**Mock Data:**
```typescript
interface ChatMessage {
  id: string;
  username: string;
  role: 'guest' | 'member' | 'vip' | 'moderator';
  message: string;
  timestamp: Date;
  isTip?: boolean;
  tipAmount?: number;
}
```

### 3. Settings Panel

**Tabs:**
1. **Profile**
   - Display name
   - Bio/description
   - Languages
   - Tags/categories

2. **Show Settings**
   - Private show rates
   - Group show settings
   - Spy show prices
   - Block regions

3. **Goals & Apps**
   - Tip goals
   - Token packages
   - Tip menu items
   - Wheel of fortune

4. **Notifications**
   - Sound alerts
   - Tip alerts
   - Private show requests

## Implementation Plan

### Phase 1: Foundation (Core Structure)

1. **Create route and layout**
   - Set up [`/app/bongacams-simulator/page.tsx`](app/bongacams-simulator/page.tsx)
   - Create [`layout.tsx`](app/bongacams-simulator/layout.tsx) with full-width design
   - Add navigation entry in [`lib/navigation.ts`](lib/navigation.ts)

2. **Extract and adapt styles**
   - Copy relevant CSS classes from [`BongaSim/i.bgicdn.com/css-min/bm/h1WHKX6/bm_guest_redesign.css`](BongaSim/i.bgicdn.com/css-min/bm/h1WHKX6/bm_guest_redesign.css)
   - Create [`app/bongacams-simulator/simulator.css`](app/bongacams-simulator/simulator.css)
   - Adapt BongaCams colors and styling to Tailwind

3. **Set up assets**
   - Copy profile images to [`public/bongacams/`](public/bongacams/)
   - Copy icons and UI elements
   - Add main screenshot from [`Bonga/Main.png`](Bonga/Main.png)

### Phase 2: Core Components

4. **Build StreamPanel component**
   - Create [`app/bongacams-simulator/components/StreamPanel.tsx`](app/bongacams-simulator/components/StreamPanel.tsx)
   - Implement video preview area
   - Add stream control buttons
   - Integrate status indicators

5. **Build ChatInterface component**
   - Create [`app/bongacams-simulator/components/ChatInterface.tsx`](app/bongacams-simulator/components/ChatInterface.tsx)
   - Implement message display
   - Add viewer list sidebar
   - Create message input

6. **Build SettingsPanel component**
   - Create [`app/bongacams-simulator/components/SettingsPanel.tsx`](app/bongacams-simulator/components/SettingsPanel.tsx)
   - Implement tab navigation
   - Create settings forms
   - Add save/cancel actions

### Phase 3: Interactivity

7. **Implement state management**
   - Create [`app/bongacams-simulator/lib/simulator-state.ts`](app/bongacams-simulator/lib/simulator-state.ts)
   - Use React Context or Zustand for global state
   - Handle stream status changes
   - Manage chat messages

8. **Add mock data generators**
   - Create [`app/bongacams-simulator/lib/mock-data.ts`](app/bongacams-simulator/lib/mock-data.ts)
   - Generate random chat messages
   - Simulate tip notifications
   - Create fake viewer activity

9. **Implement interactive features**
   - Start/stop stream simulation
   - Add auto-generated chat messages
   - Simulate tip notifications
   - Toggle camera/mic states

### Phase 4: Polish

10. **Add realistic animations**
    - Fade in/out transitions
    - Typing indicators
    - Notification popups
    - Button hover states

11. **Add tooltips and help**
    - Explain each control
    - Add "What is this?" hints
    - Create tutorial mode

12. **Optimize and test**
    - Ensure responsive design
    - Test all interactive elements
    - Verify state persistence

## Technical Specifications

### Styling Approach

**BongaCams Color Palette:**
- Primary: `#a91838` (burgundy red)
- Background: `#1a1a1a` (dark)
- Text: `#ffffff` (white)
- Secondary: `#2a2a2a` (dark gray)
- Accent: `#ff6b9d` (pink)
- Success: `#4caf50` (green)

**Tailwind Configuration:**
```typescript
// Add to tailwind.config or use inline styles
colors: {
  bonga: {
    primary: '#a91838',
    dark: '#1a1a1a',
    gray: '#2a2a2a',
    accent: '#ff6b9d',
    success: '#4caf50'
  }
}
```

### Mock Data Structure

```typescript
// Viewer profiles
const MOCK_VIEWERS = [
  { username: 'User123', role: 'guest', tokens: 0 },
  { username: 'BigSpender', role: 'vip', tokens: 5000 },
  { username: 'ModHelper', role: 'moderator', tokens: 1000 }
];

// Chat message templates
const MESSAGE_TEMPLATES = [
  'Привет! 👋',
  'You look amazing today!',
  'Show more please',
  '🔥🔥🔥',
  'How are you?'
];

// Tip amounts
const TIP_AMOUNTS = [10, 25, 50, 100, 250, 500, 1000];
```

## Navigation Integration

Add to [`lib/navigation.ts`](lib/navigation.ts):

```typescript
{
  title: "Симулятор BongaCams",
  href: "/bongacams-simulator",
  icon: "desktopcomputer", // or create custom icon
  description: "Интерактивный симулятор интерфейса модели"
}
```

## Search Index Integration

Add to [`lib/search-index.ts`](lib/search-index.ts):

```typescript
{
  title: "Симулятор BongaCams",
  section: "Инструменты",
  keywords: [
    "simulator", "bongacams", "practice",
    "interface", "model", "stream"
  ],
  content: "Interactive BongaCams model interface simulator..."
}
```

## User Experience Flow

1. **Entry**: User clicks "Симулятор BongaCams" in navigation
2. **Landing**: Full-screen simulator interface loads
3. **Tutorial** (optional): Highlight tour of key features
4. **Practice**: User interacts with controls
   - Start/stop stream
   - Send mock chat messages
   - Adjust settings
   - See simulated earnings
5. **Learn**: Tooltips explain each feature
6. **Exit**: Return to knowledge base

## Success Criteria

- [ ] Simulator loads without errors
- [ ] All three main sections are functional
- [ ] Controls respond to user input
- [ ] Mock data generates realistically
- [ ] Interface matches BongaCams styling
- [ ] Responsive design works on different screens
- [ ] Navigation integration complete
- [ ] Search index updated
- [ ] Documentation added

## Future Enhancements

1. **Advanced Features**
   - Private show simulation
   - Group show mechanics
   - Tip goals with progress bars
   - Lovense toy integration simulation

2. **Scenarios**
   - Busy room (many viewers)
   - Slow room (few viewers)
   - Big tipper arrival
   - Private show request handling

3. **Analytics**
   - Session stats
   - Earnings calculator
   - Goal tracker
   - Viewer retention metrics

4. **Customization**
   - User can set their mock profile
   - Adjustable room settings
   - Custom tip menu
   - Personalized goals

## Resources & References

- Source files: [`BongaSim/`](BongaSim/)
- Screenshot: [`Bonga/Main.png`](Bonga/Main.png)
- CSS: [`BongaSim/i.bgicdn.com/css-min/bm/h1WHKX6/bm_guest_redesign.css`](BongaSim/i.bgicdn.com/css-min/bm/h1WHKX6/bm_guest_redesign.css)
- JavaScript: [`BongaSim/i.bgicdn.com/js-min/bm/h1WHKX6/bm_static.js`](BongaSim/i.bgicdn.com/js-min/bm/h1WHKX6/bm_static.js)

## Notes

- This is an educational tool, not a real streaming interface
- All data is mock/simulated
- No actual streaming or payment processing
- Focus on UI/UX familiarization
- Must be clearly labeled as a simulator
