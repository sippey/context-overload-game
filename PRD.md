# Token Overload Game - Product Requirements Document

## Project Overview

**Game Name:** Token Overload  
**Context:** Puzzle component for "Pyramid Scheme" - a detective escape room game set in 2028 San Francisco  
**Platform:** NextJS web application, deployable to GitHub Pages  
**Target Duration:** 2 minutes to completion  
**Goal:** Create an addictive cookie-clicker style game where players overload an AI system to progress

## Core Concept

Players are undercover detectives who must crash a billionaire's AI security system by flooding it with tokens. The game combines rapid clicking with strategic upgrade purchases to reach 1,000,000 tokens and trigger a system crash that frees the victim.

## Technical Requirements

### Technology Stack
- **Framework:** NextJS (static export for GitHub Pages)
- **Styling:** Tailwind CSS
- **Language:** TypeScript
- **Audio:** Web Audio API (synthetic sound generation)
- **State Management:** React hooks (useState, useEffect)
- **Storage:** No persistence required (resets each session)
- **Dependencies:** Minimal external dependencies

### Performance Requirements
- **Load Time:** < 2 seconds on 3G connection
- **Responsiveness:** 60fps animations on modern devices
- **Memory Usage:** < 50MB total
- **Mobile Performance:** Smooth on iOS Safari and Chrome Android

## Game Mechanics

### Core Loop
```
Click → Generate Tokens → Buy Upgrades → Increase Token Generation → Repeat
```

### Token Generation System
**Manual Generation:**
- Base: 1 token per click
- Scales with purchased upgrades
- Click rate limited to prevent automation abuse

**Passive Generation:**
- Unlocked through upgrades
- Runs continuously in background
- Updates every 100ms for smooth visual feedback

### Upgrade Progression (2-minute timeline)

| Time | Tokens Required | Upgrade Name | Effect | Cost |
|------|----------------|--------------|--------|------|
| 0-15s | 50 | Repeat Query | 2 tokens/click | 50 |
| | 150 | Add Context | 5 tokens/click | 200 |
| 15-30s | 300 | Auto-Prompt | 5 tokens/second | 500 |
| | 800 | Code Injection | 15 tokens/click | 1,000 |
| 30-60s | 2,000 | Multi-Threading | 20 tokens/second | 3,000 |
| | 8,000 | Recursive Loops | 50 tokens/click | 10,000 |
| 60-90s | 25,000 | Memory Dump | 100 tokens/second | 30,000 |
| | 75,000 | Stack Overflow | 200 tokens/click | 100,000 |
| 90-120s | 200,000 | System Exploit | 1,000 tokens/click | 300,000 |
| | 500,000 | DDOS Attack | 2,000 tokens/second | 600,000 |
| 120s | 1,000,000 | **SYSTEM CRASH** | Victory! | N/A |

### Exponential Scaling Formula
```typescript
baseValue * (1.15 ^ upgradeLevel)
```

## User Interface Design

### Visual Aesthetic
- **Theme:** 2028 cyberpunk tech aesthetic
- **Colors:** Dark backgrounds, neon accents (blues, greens, reds)
- **Typography:** Monospace fonts for terminal feel
- **Effects:** Glitch animations, screen distortion, particle effects

### Layout Structure

#### Desktop Layout (1024px+)
```
┌─────────────────────────────────────────────────────┐
│                    Header Bar                       │
│              Token Counter Display                  │
├─────────────────────┬───────────────────────────────┤
│                     │                               │
│    Click Area       │        Upgrade Shop           │
│                     │                               │
│  [QUERY AI BUTTON]  │  ┌─ Repeat Query      [BUY] │
│                     │  ├─ Add Context       [BUY] │
│   AI Response       │  ├─ Auto-Prompt       [BUY] │
│   Terminal          │  └─ ...                     │
│                     │                               │
└─────────────────────┴───────────────────────────────┘
```

#### Mobile Layout (<768px)
```
┌─────────────────────────────┐
│        Header Bar           │
│    Token Counter Display    │
├─────────────────────────────┤
│                             │
│     [QUERY AI BUTTON]       │
│                             │
├─────────────────────────────┤
│      Upgrade Shop           │
│  ┌─ Repeat Query    [BUY]   │
│  ├─ Add Context     [BUY]   │
│  └─ Auto-Prompt     [BUY]   │
└─────────────────────────────┘
```

### Component Breakdown

#### TokenCounter Component
- **Purpose:** Display current token count with animations
- **Features:**
  - Number formatting (1K, 1M notation)
  - Smooth counting animations
  - Visual effects when milestones reached
  - Tokens per second display

#### ClickButton Component
- **Purpose:** Main interaction element
- **Features:**
  - Large, responsive click target
  - Visual feedback on click (pulse, particles)
  - Disable during victory screen
  - Mobile-optimized touch handling

#### AITerminal Component
- **Purpose:** Show AI responses and system degradation
- **Features:**
  - Typewriter text effect
  - Progressive glitch effects
  - Response changes based on token count
  - Hidden on mobile to save space

#### UpgradeShop Component
- **Purpose:** Display and handle upgrade purchases
- **Features:**
  - Scrollable upgrade list
  - Purchase validation
  - Visual indicators for affordability
  - Smooth purchase animations

#### VictoryScreen Component
- **Purpose:** End game celebration
- **Features:**
  - Full-screen overlay
  - Victory animation
  - Play again button
  - Statistics display

## Audio Design

### Sound Effects (Web Audio API)
```typescript
// Click sounds
clickSound(): 50-200Hz beep, 100ms duration

// Purchase sounds  
purchaseSound(): Success chime, 200ms duration

// Ambient sounds
glitchSound(): Random noise bursts as system degrades
warningSound(): Alert tone when approaching crash

// Victory sound
crashSound(): Dramatic system failure sound, 2s duration
```

### Audio Implementation
- Generate all sounds procedurally using oscillators
- Volume controls for accessibility
- Audio context management for browser compatibility
- Mobile audio handling (user gesture requirement)

## Responsive Design

### Breakpoints
```css
/* Mobile */
@media (max-width: 767px) { }

/* Tablet */
@media (min-width: 768px) and (max-width: 1023px) { }

/* Desktop */
@media (min-width: 1024px) { }
```

### Mobile Optimizations
- **Touch Targets:** Minimum 44px for accessibility
- **Viewport:** Prevent zoom, optimize for touch
- **Performance:** Reduce particle effects on mobile
- **Layout:** Stack vertically, hide AI terminal
- **Interactions:** Optimize for thumb navigation

## Game Balance

### Pacing Goals
- **0-30 seconds:** Learn mechanics, feel progress
- **30-60 seconds:** Strategic upgrade decisions
- **60-90 seconds:** Exponential growth satisfaction
- **90-120 seconds:** Rush to finish, system chaos

### Difficulty Tuning
- Upgrade costs balanced for 2-minute completion
- No dead ends or impossible states
- Clear visual progress indicators
- Forgiving upgrade strategy (multiple viable paths)

## Technical Implementation

### State Management
```typescript
interface GameState {
  tokens: number;
  tokensPerClick: number;
  tokensPerSecond: number;
  upgrades: Upgrade[];
  gamePhase: 'playing' | 'victory';
  startTime: number;
}
```

### Performance Optimizations
- **Animation:** RequestAnimationFrame for smooth updates
- **Rendering:** Avoid unnecessary re-renders with useMemo
- **Memory:** Clean up intervals and event listeners
- **Mobile:** Reduce particle count and effect complexity

### Accessibility Features
- **Keyboard Navigation:** Full keyboard support
- **Screen Readers:** Proper ARIA labels and announcements
- **Color Contrast:** WCAG AA compliance
- **Audio Controls:** Mute/unmute toggle
- **Reduced Motion:** Respect prefers-reduced-motion

## File Structure
```
src/
├── components/
│   ├── TokenCounter.tsx
│   ├── ClickButton.tsx
│   ├── AITerminal.tsx
│   ├── UpgradeShop.tsx
│   └── VictoryScreen.tsx
├── hooks/
│   ├── useGameState.ts
│   ├── useAudio.ts
│   └── useAnimations.ts
├── utils/
│   ├── gameBalance.ts
│   ├── audioSynthesis.ts
│   └── formatNumbers.ts
└── pages/
    └── index.tsx
```

## Success Metrics

### Primary Goals
- **Completion Rate:** >80% of players reach 1M tokens
- **Average Duration:** 90-150 seconds to completion
- **Mobile Experience:** No performance issues on modern devices
- **Accessibility:** Full keyboard and screen reader support

### Secondary Goals
- **Engagement:** Players replay the game multiple times
- **Performance:** Maintains 60fps throughout gameplay
- **Responsiveness:** Works smoothly on all target devices
- **Integration Ready:** Easy to embed in larger game

## Development Phases

### Phase 1: Core Mechanics (Week 1)
- Basic clicking and token generation
- Upgrade system implementation
- State management setup
- Basic UI layout

### Phase 2: Polish & Effects (Week 2)
- Visual effects and animations
- Audio system implementation
- AI terminal responses
- Mobile responsive design

### Phase 3: Final Polish (Week 3)
- Victory screen and game end
- Accessibility improvements
- Performance optimization
- Testing and bug fixes

## Deployment Requirements

### GitHub Pages Configuration
- NextJS static export configuration
- Custom domain support (optional)
- Automatic deployment via GitHub Actions
- Browser compatibility testing

### Browser Support
- **Primary:** Chrome 90+, Safari 14+, Firefox 88+
- **Secondary:** Edge 90+, Samsung Internet 14+
- **Mobile:** iOS Safari 14+, Chrome Android 90+

## Risk Mitigation

### Technical Risks
- **Audio Context Issues:** Fallback silent mode
- **Performance on Older Devices:** Simplified effects mode
- **Mobile Touch Issues:** Comprehensive touch testing
- **Browser Compatibility:** Progressive enhancement approach

### Design Risks
- **Too Easy/Hard:** Extensive playtesting with timing
- **Addiction Concerns:** 2-minute limit prevents extended play
- **Mobile Usability:** Regular mobile testing throughout development

## Future Enhancements (Post-MVP)

### Potential Features
- Multiple difficulty modes
- Achievement system
- Leaderboards (local storage)
- Different AI personalities
- Custom upgrade paths
- Accessibility improvements
- Performance analytics

### Integration Considerations
- Event system for parent game communication
- Configurable difficulty settings
- Theme customization support
- Save state export/import
- Analytics hooks for parent application