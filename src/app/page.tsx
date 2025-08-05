'use client'

import { useState, useEffect } from 'react'
import TokenCounter from '@/components/TokenCounter'
import ClickButton from '@/components/ClickButton'
import UpgradeShop from '@/components/UpgradeShop'
import AITerminal from '@/components/AITerminal'
import VictoryScreen from '@/components/VictoryScreen'
import { useGameState } from '@/hooks/useGameState'
import { useAudio } from '@/hooks/useAudio'

export default function Home() {
  const {
    tokens,
    tokensPerClick,
    tokensPerSecond,
    upgrades,
    gamePhase,
    startTime,
    handleClick,
    purchaseUpgrade,
    resetGame
  } = useGameState()

  const {
    isEnabled: audioEnabled,
    volume,
    setVolume,
    toggleAudio,
    playClick,
    playPurchase,
    playGlitch,
    playWarning,
    playVictory
  } = useAudio()

  // Play sounds based on game events
  const handleClickWithAudio = () => {
    handleClick()
    playClick()
  }

  const handlePurchaseWithAudio = (upgradeId: string) => {
    purchaseUpgrade(upgradeId)
    playPurchase()
  }

  // Play ambient sounds based on token count
  useEffect(() => {
    if (tokens > 800000) {
      const interval = setInterval(() => {
        if (Math.random() < 0.3) {
          playGlitch()
        }
      }, 2000 + Math.random() * 3000)
      return () => clearInterval(interval)
    } else if (tokens > 500000) {
      const interval = setInterval(() => {
        if (Math.random() < 0.2) {
          playWarning()
        }
      }, 5000 + Math.random() * 5000)
      return () => clearInterval(interval)
    }
  }, [tokens, playGlitch, playWarning])

  // Play victory sound
  useEffect(() => {
    if (gamePhase === 'victory') {
      playVictory()
    }
  }, [gamePhase, playVictory])

  return (
    <main className="min-h-screen bg-cyber-dark text-neon-blue p-4">
      {gamePhase === 'victory' && (
        <VictoryScreen 
          finalTokens={tokens}
          duration={Date.now() - startTime}
          onPlayAgain={resetGame}
        />
      )}
      
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <header className="text-center mb-8">
          <h1 className="text-4xl md:text-6xl font-bold neon-text mb-2">
            TOKEN OVERLOAD
          </h1>
          <p className="text-sm md:text-base text-gray-400">
            OVERLOAD THE AI SYSTEM • TARGET: 1,000,000 TOKENS
          </p>
          
          {/* Audio Controls */}
          <div className="flex justify-center items-center gap-4 mt-4">
            <button
              onClick={toggleAudio}
              className="cyber-button text-xs px-3 py-1"
            >
              🔊 {audioEnabled ? 'ON' : 'OFF'}
            </button>
            {audioEnabled && (
              <div className="flex items-center gap-2">
                <span className="text-xs text-gray-400">Volume:</span>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.1"
                  value={volume}
                  onChange={(e) => setVolume(parseFloat(e.target.value))}
                  className="w-16 h-1 bg-cyber-gray rounded-lg appearance-none cursor-pointer"
                />
              </div>
            )}
          </div>
        </header>

        {/* Token Counter */}
        <TokenCounter 
          tokens={tokens}
          tokensPerSecond={tokensPerSecond}
        />

        {/* Main Game Area */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
          {/* Left Column - Click Area */}
          <div className="space-y-6">
            <ClickButton 
              onClick={handleClickWithAudio}
              tokensPerClick={tokensPerClick}
              disabled={gamePhase === 'victory'}
            />
            
            {/* AI Terminal - Hidden on mobile */}
            <div className="hidden md:block">
              <AITerminal tokens={tokens} />
            </div>
          </div>

          {/* Right Column - Upgrade Shop */}
          <div>
            <UpgradeShop 
              tokens={tokens}
              upgrades={upgrades}
              onPurchase={handlePurchaseWithAudio}
            />
          </div>
        </div>
      </div>
    </main>
  )
}