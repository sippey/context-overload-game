export interface Upgrade {
  id: string
  name: string
  description: string
  basePrice: number
  currentPrice: number
  owned: number
  clickMultiplier: number
  passiveGeneration: number
}

export const VICTORY_TARGET = 1_000_000

export const BASE_UPGRADES: Omit<Upgrade, 'currentPrice' | 'owned'>[] = [
  {
    id: 'repeat-query',
    name: 'Repeat Query',
    description: 'Send the same request multiple times',
    basePrice: 50,
    clickMultiplier: 1, // +1 tokens per click
    passiveGeneration: 0
  },
  {
    id: 'add-context',
    name: 'Add Context',
    description: 'Include more context in each request',
    basePrice: 200,
    clickMultiplier: 3, // +3 additional tokens per click
    passiveGeneration: 0
  },
  {
    id: 'auto-prompt',
    name: 'Auto-Prompt',
    description: 'Generate prompts automatically',
    basePrice: 500,
    clickMultiplier: 0,
    passiveGeneration: 5 // 5 tokens/second
  },
  {
    id: 'code-injection',
    name: 'Code Injection',
    description: 'Inject code snippets into prompts',
    basePrice: 1_000,
    clickMultiplier: 10, // +10 additional tokens per click
    passiveGeneration: 0
  },
  {
    id: 'multi-threading',
    name: 'Multi-Threading',
    description: 'Process multiple requests simultaneously',
    basePrice: 3_000,
    clickMultiplier: 0,
    passiveGeneration: 15 // +15 additional tokens/second
  },
  {
    id: 'recursive-loops',
    name: 'Recursive Loops',
    description: 'Create self-referencing query loops',
    basePrice: 10_000,
    clickMultiplier: 35, // +35 additional tokens per click
    passiveGeneration: 0
  },
  {
    id: 'memory-dump',
    name: 'Memory Dump',
    description: 'Force the AI to load massive datasets',
    basePrice: 30_000,
    clickMultiplier: 0,
    passiveGeneration: 80 // +80 additional tokens/second
  },
  {
    id: 'stack-overflow',
    name: 'Stack Overflow',
    description: 'Cause recursive function overflows',
    basePrice: 100_000,
    clickMultiplier: 150, // +150 additional tokens per click
    passiveGeneration: 0
  },
  {
    id: 'system-exploit',
    name: 'System Exploit',
    description: 'Exploit system vulnerabilities for max tokens',
    basePrice: 300_000,
    clickMultiplier: 800, // +800 additional tokens per click
    passiveGeneration: 0
  },
  {
    id: 'ddos-attack',
    name: 'DDOS Attack',
    description: 'Flood the system with requests',
    basePrice: 600_000,
    clickMultiplier: 0,
    passiveGeneration: 1000 // +1000 additional tokens/second
  }
]

export function calculateUpgradePrice(basePrice: number, owned: number): number {
  return Math.floor(basePrice * Math.pow(1.15, owned))
}

export function calculateTokensPerClick(upgrades: Upgrade[]): number {
  let total = 1 // Base click value
  
  upgrades.forEach(upgrade => {
    if (upgrade.owned > 0) {
      total += upgrade.clickMultiplier * upgrade.owned
    }
  })
  
  return total
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