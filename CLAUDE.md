# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is **Token Overload**, a cookie-clicker style game built as a puzzle component for "Pyramid Scheme" - a detective escape room game. Players must overload an AI system by generating 1,000,000 tokens within 2 minutes to trigger a system crash.

## Technology Stack

- **Framework**: NextJS with static export for GitHub Pages deployment
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Audio**: Web Audio API with synthetic sound generation
- **State Management**: React hooks (useState, useEffect)
- **Storage**: No persistence (resets each session)

## Current Project State

**⚠️ This is a new project with only documentation files (README.md and PRD.md). No code has been implemented yet.**

The codebase currently contains:
- `README.md` - Basic project description
- `PRD.md` - Comprehensive product requirements document with detailed specifications

## Planned Architecture

Based on the PRD, the project will follow this structure:

```
src/
├── components/
│   ├── TokenCounter.tsx      # Display token count with animations
│   ├── ClickButton.tsx       # Main interaction element
│   ├── AITerminal.tsx        # AI responses and system degradation
│   ├── UpgradeShop.tsx       # Upgrade purchases and display
│   └── VictoryScreen.tsx     # End game celebration
├── hooks/
│   ├── useGameState.ts       # Core game state management
│   ├── useAudio.ts           # Audio system management
│   └── useAnimations.ts      # Animation controls
├── utils/
│   ├── gameBalance.ts        # Game balance and progression
│   ├── audioSynthesis.ts     # Procedural audio generation
│   └── formatNumbers.ts      # Number formatting (1K, 1M notation)
└── pages/
    └── index.tsx             # Main game page
```

## Game Mechanics

- **Core Loop**: Click → Generate Tokens → Buy Upgrades → Increase Generation → Repeat
- **Victory Condition**: Reach 1,000,000 tokens to trigger system crash
- **Target Duration**: 2 minutes to completion
- **Scaling Formula**: `baseValue * (1.15 ^ upgradeLevel)`

## Key Features to Implement

1. **Token Generation System**
   - Manual clicking (1 token per click base)
   - Passive generation through upgrades
   - 100ms update intervals for smooth feedback

2. **Upgrade Progression** (10 upgrades total)
   - Costs range from 50 to 600,000 tokens
   - Effects include increased click value and passive generation
   - Exponential scaling for 2-minute completion

3. **Visual Design**
   - 2028 cyberpunk aesthetic
   - Dark backgrounds with neon accents
   - Monospace fonts for terminal feel
   - Glitch effects as system degrades

4. **Audio System**
   - Procedural sound generation using Web Audio API
   - Click sounds, purchase confirmations, ambient glitches
   - Volume controls and mobile compatibility

5. **Responsive Design**
   - Desktop: Side-by-side click area and upgrade shop
   - Mobile: Stacked layout, hidden AI terminal
   - Touch-optimized interactions

## Performance Requirements

- Load time < 2 seconds on 3G
- 60fps animations on modern devices
- Memory usage < 50MB
- Smooth mobile performance on iOS Safari and Chrome Android

## Deployment

The project will use NextJS static export for GitHub Pages deployment. Browser support targets Chrome 90+, Safari 14+, Firefox 88+.

## Development Commands

**⚠️ No package.json exists yet - these will need to be set up during initial project setup:**

Expected commands once implemented:
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run export` - Generate static export for GitHub Pages
- `npm run lint` - Run linting
- `npm run type-check` - Run TypeScript checking

## Getting Started

Since this is a new project, you'll need to:
1. Initialize NextJS project with TypeScript
2. Set up Tailwind CSS
3. Create the component structure outlined in PRD.md
4. Implement game mechanics following the detailed specifications

Refer to PRD.md for complete implementation details, including upgrade progression, UI layouts, and technical specifications.