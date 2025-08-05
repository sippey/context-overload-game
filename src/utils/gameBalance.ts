export interface Upgrade {
  id: string
  name: string
  description: string
  basePrice: number
  currentPrice: number
  owned: number
  clickMultiplier: number // Now acts as a multiplier (2x, 4x, etc)
  passiveGeneration: number
  enableHoldClick?: boolean // New field for hold-to-click upgrade
  isMultiplier?: boolean // Indicates if this upgrade multiplies click value
}

export const VICTORY_TARGET = 1_000_000

export const BASE_UPGRADES: Omit<Upgrade, 'currentPrice' | 'owned'>[] = [
  {
    id: 'repeat-query',
    name: 'Repeat Query 2X',
    description: 'Double your click power!',
    basePrice: 30,
    clickMultiplier: 2, // 2x multiplier
    passiveGeneration: 0,
    isMultiplier: true
  },
  {
    id: 'context-injection',
    name: 'Context Bomb 4X',
    description: 'Quadruple tokens with context overload!',
    basePrice: 500,
    clickMultiplier: 4, // 4x multiplier
    passiveGeneration: 0,
    isMultiplier: true
  },
  {
    id: 'auto-prompt',
    name: 'Auto-Prompt',
    description: 'Generate prompts automatically',
    basePrice: 1_000,
    clickMultiplier: 0,
    passiveGeneration: 100 // Increased for better balance
  },
  {
    id: 'recursive-loop',
    name: 'Recursive Loop 8X',
    description: 'Exponential token multiplication!',
    basePrice: 5_000,
    clickMultiplier: 8, // 8x multiplier
    passiveGeneration: 0,
    isMultiplier: true
  },
  {
    id: 'multi-threading',
    name: 'Multi-Threading',
    description: 'Process multiple requests simultaneously',
    basePrice: 10_000,
    clickMultiplier: 0,
    passiveGeneration: 1_000 // Increased passive
  },
  {
    id: 'system-exploit',
    name: 'System Exploit 16X',
    description: 'Maximum token multiplication!',
    basePrice: 50_000,
    clickMultiplier: 16, // 16x multiplier
    passiveGeneration: 5_000, // Also adds passive
    isMultiplier: true
  }
]

export function calculateUpgradePrice(basePrice: number, owned: number): number {
  return Math.floor(basePrice * Math.pow(1.15, owned))
}

export function calculateTokensPerClick(upgrades: Upgrade[]): number {
  let baseValue = 1 // Base click value
  let multiplier = 1 // Total multiplier
  
  upgrades.forEach(upgrade => {
    if (upgrade.owned > 0 && upgrade.clickMultiplier > 0) {
      if (upgrade.isMultiplier) {
        // For multiplier upgrades, multiply the total
        // Each purchase multiplies again (2x, 4x, 8x becomes 2x, then 2x*2x=4x if bought twice)
        multiplier *= Math.pow(upgrade.clickMultiplier, upgrade.owned)
      } else {
        // For additive upgrades (if any remain), add to base
        baseValue += upgrade.clickMultiplier * upgrade.owned
      }
    }
  })
  
  return Math.floor(baseValue * multiplier)
}

export function calculateTokensPerSecond(upgrades: Upgrade[]): number {
  let total = 0
  
  upgrades.forEach(upgrade => {
    if (upgrade.owned > 0) {
      total += upgrade.passiveGeneration * upgrade.owned
    }
  })
  
  return total
}