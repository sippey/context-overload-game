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

export type GamePhase = 'waiting' | 'playing' | 'victory' | 'failure'

interface GameState {
  tokens: number
  tokensPerClick: number
  tokensPerSecond: number
  upgrades: Upgrade[]
  gamePhase: GamePhase
  startTime: number
  timeRemaining: number
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
      gamePhase: 'waiting' as GamePhase,
      startTime: Date.now(),
      timeRemaining: 60 // 60 seconds to win
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

  // Passive token generation and timer countdown
  useEffect(() => {
    if (gameState.gamePhase !== 'playing') {
      return
    }

    const interval = setInterval(() => {
      setGameState(prev => {
        // Update timer
        const newTimeRemaining = prev.timeRemaining - 0.1 // Decrement by 100ms
        
        // Check for failure
        if (newTimeRemaining <= 0 && prev.gamePhase === 'playing') {
          return {
            ...prev,
            timeRemaining: 0,
            gamePhase: 'failure'
          }
        }
        
        // Update tokens from passive generation
        const newTokens = prev.tokens + (prev.tokensPerSecond / 10) // Update every 100ms
        
        // Check for victory
        if (newTokens >= VICTORY_TARGET && prev.gamePhase === 'playing') {
          return {
            ...prev,
            tokens: VICTORY_TARGET,
            gamePhase: 'victory'
          }
        }
        
        return {
          ...prev,
          tokens: newTokens,
          timeRemaining: newTimeRemaining
        }
      })
    }, 100)

    return () => clearInterval(interval)
  }, [gameState.tokensPerSecond, gameState.gamePhase])

  const handleClick = useCallback(() => {
    if (gameState.gamePhase === 'victory' || gameState.gamePhase === 'failure') return

    setGameState(prev => {
      // Start the game on first click
      if (prev.gamePhase === 'waiting') {
        return {
          ...prev,
          tokens: prev.tokens + prev.tokensPerClick,
          gamePhase: 'playing',
          startTime: Date.now() // Reset start time
        }
      }

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
          const newPrice = calculateUpgradePrice(u.basePrice, newOwned)
          
          return {
            ...u,
            owned: newOwned,
            currentPrice: newPrice
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
      gamePhase: 'waiting',
      startTime: Date.now(),
      timeRemaining: 60
    })
  }, [])

  return {
    tokens: gameState.tokens,
    tokensPerClick: gameState.tokensPerClick,
    tokensPerSecond: gameState.tokensPerSecond,
    upgrades: gameState.upgrades,
    gamePhase: gameState.gamePhase,
    startTime: gameState.startTime,
    timeRemaining: gameState.timeRemaining,
    handleClick,
    purchaseUpgrade,
    resetGame
  }
}