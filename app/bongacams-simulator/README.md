# BongaCams Simulator

## Overview

Interactive simulator of the BongaCams model interface for educational purposes. This tool allows webcam operators to practice and familiarize themselves with the platform's interface before going live.

## Features

### 1. Stream Control Panel

- **Video Preview**: Simulated camera feed display
- **Stream Controls**:
  - Start/Stop streaming
  - Toggle private show mode
  - Camera on/off
  - Microphone on/off
- **Goal Tracking**: Set and monitor tip goals with progress bar
- **Quick Actions**: Access to tip menu, room topic, and goal settings

### 2. Chat Interface

- **Live Chat Simulation**: Auto-generated messages from mock viewers
- **Viewer List**: Shows active viewers with roles (Guest, Member, VIP, Moderator)
- **Tip Notifications**: Animated tip alerts with amounts
- **Role Indicators**: Color-coded usernames based on viewer status

### 3. Settings Panel

Expandable settings panel with four tabs:

#### Profile
- Display name configuration
- Language settings
- Bio/description editor

#### Show Settings
- Private show rates
- Group show configuration
- Spy show pricing
- Region blocking

#### Goals & Apps
- Create tip goals (title + target amount)
- Interactive apps showcase (Wheel of Fortune, Dice Game, Tip Menu)

#### Notifications
- Sound alerts toggle
- Tip notification settings
- Private show request alerts

## Usage

1. **Access the Simulator**: Navigate to `/bongacams-simulator` in the application
2. **Start Streaming**: Click "▶ Start Stream" to begin simulation
3. **Watch Chat Activity**: Messages will auto-generate from mock viewers
4. **Explore Controls**: Try toggling camera, microphone, and private mode
5. **Set Goals**: Use the Settings panel to create tip goals
6. **Practice**: Familiarize yourself with all interface elements

## State Management

The simulator uses Zustand for global state management:

```typescript
interface SimulatorState {
  isLive: boolean;        // Stream status
  isPrivate: boolean;     // Private show mode
  cameraEnabled: boolean; // Camera state
  micEnabled: boolean;    // Microphone state
  currentGoal: Goal | null; // Active tip goal
  viewers: number;        // Viewer count
  earnings: number;       // Simulated earnings
  messages: ChatMessage[]; // Chat history
  activeViewers: Viewer[]; // Current viewers
}
```

## Mock Data

### Viewer Roles
- **Guest** (gray): No tokens, basic access
- **Member** (red): Registered users with tokens
- **VIP** (pink): Premium members with high token balance
- **Moderator** (green): Room moderators

### Message Generation
Messages are auto-generated every 3-8 seconds when live, with 15% chance of tips (10-1000 tokens).

## Technical Stack

- **Framework**: Next.js 16 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **State Management**: Zustand
- **Components**: React 19

## Files Structure

```
app/bongacams-simulator/
├── page.tsx              # Route entry point
├── layout.tsx            # Dark theme layout
├── components/
│   ├── BongaCamsSimulator.tsx  # Main container
│   ├── TopBar.tsx              # Status bar
│   ├── StreamPanel.tsx         # Left panel (video + controls)
│   ├── ChatInterface.tsx       # Right panel (chat + viewers)
│   └── SettingsPanel.tsx       # Bottom panel (settings tabs)
└── lib/
    ├── simulator-state.ts      # Zustand store
    └── mock-data.ts            # Mock viewers & messages
```

## Important Notes

⚠️ **This is a simulator, not a real streaming interface:**
- All data is mock/simulated
- No actual streaming occurs
- No real payment processing
- Input fields are disabled (for demonstration)
- Focus is on UI/UX familiarization

## Color Palette

BongaCams-inspired colors:
- **Primary**: `#a91838` (burgundy red)
- **Background**: `#1a1a1a` (dark)
- **Secondary**: `#2a2a2a` (dark gray)
- **Accent**: `#ff6b9d` (pink)
- **Success**: `#4caf50` (green)

## Future Enhancements

- [ ] Private show request simulation
- [ ] Interactive tip games (Wheel of Fortune)
- [ ] Lovense toy integration preview
- [ ] Multiple scenario modes (busy room, slow room, big tipper)
- [ ] Session analytics and stats
- [ ] Customizable mock profile
- [ ] Tutorial/walkthrough mode

## Support

For issues or questions about the simulator, refer to the main project documentation or contact support.
