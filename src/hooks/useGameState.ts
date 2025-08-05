'use client'

import { useState, useEffect, useCallback } from 'react'
import { 
  BASE_UPGRADES, 
  VICTORY_TARGET,
  calculateUpgradePrice,
  calculateTokensPerClick,
  calculateTokensPerSecond,
  type Upgrade 
} from '@/utils/gameBalance'

export type GamePhase = 'playing' | 'victory'

interface GameState {
  tokens: number
  tokensPerClick: number
  tokensPerSecond: number
  upgrades: Upgrade[]
  gamePhase: GamePhase
  startTime: number
}

export function useGameState() {
  const [gameState, setGameState] = useState<GameState>(() => {
    const initialUpgrades: Upgrade[] = BASE_UPGRADES.map(upgrade => ({
      ...upgrade,
      currentPrice: upgrade.basePrice,
      owned: 0
    }))

    return {
      tokens: 0,
      tokensPerClick: 1,
      tokensPerSecond: 0,
      upgrades: initialUpgrades,
      gamePhase: 'playing' as GamePhase,
      startTime: Date.now()
    }
  })

  // Update derived values when upgrades change
  useEffect(() => {
    const newTokensPerClick = calculateTokensPerClick(gameState.upgrades)
    const newTokensPerSecond = calculateTokensPerSecond(gameState.upgrades)
    
    setGameState(prev => ({
      ...prev,
      tokensPerClick: newTokensPerClick,
      tokensPerSecond: newTokensPerSecond
    }))
  }, [gameState.upgrades])

  // Passive token generation
  useEffect(() => {
    if (gameState.tokensPerSecond === 0 || gameState.gamePhase === 'victory') {
      return
    }

    const interval = setInterval(() => {
      setGameState(prev => {
        const newTokens = prev.tokens + (prev.tokensPerSecond / 10) // Update every 100ms
        
        if (newTokens >= VICTORY_TARGET && prev.gamePhase === 'playing') {
          return {
            ...prev,
            tokens: VICTORY_TARGET,
            gamePhase: 'victory'
          }
        }
        
        return {
          ...prev,
          tokens: newTokens
        }
      })
    }, 100)

    return () => clearInterval(interval)
  }, [gameState.tokensPerSecond, gameState.gamePhase])

  const handleClick = useCallback(() => {
    if (gameState.gamePhase === 'victory') return

    setGameState(prev => {
      const newTokens = prev.tokens + prev.tokensPerClick
      
      if (newTokens >= VICTORY_TARGET) {
        return {
          ...prev,
          tokens: VICTORY_TARGET,
          gamePhase: 'victory'
        }
      }
      
      return {
        ...prev,
        tokens: newTokens
      }
    })
  }, [gameState.gamePhase])

  const purchaseUpgrade = useCallback((upgradeId: string) => {
    setGameState(prev => {
      const upgrade = prev.upgrades.find(u => u.id === upgradeId)
      if (!upgrade || prev.tokens < upgrade.currentPrice) {
        return prev
      }

      const newTokens = prev.tokens - upgrade.currentPrice
      const newUpgrades = prev.upgrades.map(u => {
        if (u.id === upgradeId) {
          const newOwned = u.owned + 1
          return {
            ...u,
            owned: newOwned,
            currentPrice: calculateUpgradePrice(u.basePrice, newOwned)
          }
        }
        return u
      })

      return {
        ...prev,
        tokens: newTokens,
        upgrades: newUpgrades
      }
    })
  }, [])

  const resetGame = useCallback(() => {
    const initialUpgrades: Upgrade[] = BASE_UPGRADES.map(upgrade => ({
      ...upgrade,
      currentPrice: upgrade.basePrice,
      owned: 0
    }))

    setGameState({
      tokens: 0,
      tokensPerClick: 1,
      tokensPerSecond: 0,
      upgrades: initialUpgrades,
      gamePhase: 'playing',
      startTime: Date.now()
    })
  }, [])

  return {
    tokens: gameState.tokens,
    tokensPerClick: gameState.tokensPerClick,
    tokensPerSecond: gameState.tokensPerSecond,
    upgrades: gameState.upgrades,
    gamePhase: gameState.gamePhase,
    startTime: gameState.startTime,
    handleClick,
    purchaseUpgrade,
    resetGame
  }
}