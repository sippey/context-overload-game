'use client'

import { useState, useEffect, useRef } from 'react'
import TokenCounter from '@/components/TokenCounter'
import ClickButton from '@/components/ClickButton'
import UpgradeShop from '@/components/UpgradeShop'
import TerminalConsole from '@/components/TerminalConsole'
import VictoryScreen from '@/components/VictoryScreen'
import FailureScreen from '@/components/FailureScreen'
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
    timeRemaining,
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
    playVictory,
    playTick
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

  // Play clock ticking sound during countdown
  const lastSecondRef = useRef<number | null>(null)
  
  useEffect(() => {
    if (gamePhase === 'playing') {
      const currentSecond = Math.ceil(timeRemaining)
      
      // Play tick when second changes (and it's not the first time)
      if (lastSecondRef.current !== null && currentSecond !== lastSecondRef.current && currentSecond > 0) {
        playTick()
      }
      
      lastSecondRef.current = currentSecond
    } else {
      lastSecondRef.current = null
    }
  }, [gamePhase, timeRemaining, playTick])


  return (
    <main className="h-screen bg-cyber-dark text-neon-blue overflow-hidden flex flex-col relative">
      
      {/* Game Over Screens */}
      {gamePhase === 'victory' && (
        <VictoryScreen 
          finalTokens={tokens}
          duration={Date.now() - startTime}
          onPlayAgain={resetGame}
        />
      )}
      
      {gamePhase === 'failure' && (
        <FailureScreen 
          finalTokens={tokens}
          duration={Date.now() - startTime}
          onTryAgain={resetGame}
        />
      )}
      
      {/* Compact Header */}
      <header className="flex justify-between items-center px-4 py-2 border-b border-neon-blue/30 relative z-10">
        <div className="flex items-center gap-4">
          <h1 className="text-xl font-bold neon-text">TOKEN OVERLOAD</h1>
          <span className="text-xs text-gray-400">TARGET: 1M TOKENS</span>
        </div>
        
        <div className="flex items-center gap-6">
          {/* Countdown Timer */}
          <div className={`text-center ${
            gamePhase === 'waiting' 
              ? 'neon-text animate-pulse'
              : timeRemaining <= 10 
              ? 'animate-pulse neon-red-text' 
              : timeRemaining <= 20 
              ? 'text-orange-400'
              : 'neon-text'
          }`}>
            {gamePhase === 'waiting' ? (
              <>
                <div className="text-xl font-bold font-mono">READY</div>
                <div className="text-xs">CLICK TO START</div>
              </>
            ) : (
              <>
                <div className="text-2xl font-bold font-mono">
                  {Math.ceil(timeRemaining)}
                </div>
                <div className="text-xs">SECONDS</div>
              </>
            )}
          </div>
          
          {/* Audio Controls */}
          <div className="flex items-center gap-2">
            <button
              onClick={toggleAudio}
              className="text-xs px-2 py-1 border border-neon-blue/50 hover:bg-neon-blue/10"
            >
              🔊 {audioEnabled ? 'ON' : 'OFF'}
            </button>
            {audioEnabled && (
              <input
                type="range"
                min="0"
                max="1"
                step="0.1"
                value={volume}
                onChange={(e) => setVolume(parseFloat(e.target.value))}
                className="w-16 h-1 bg-cyber-gray rounded-lg appearance-none cursor-pointer"
              />
            )}
          </div>
        </div>
      </header>

      {/* Main Game Area - Split Layout */}
      <div className="flex-1 flex gap-4 p-4 min-h-0 relative z-10">
        {/* Left Side - Game Controls */}
        <div className="flex-1 flex flex-col gap-4 max-w-md">
          {/* Compact Token Counter */}
          <TokenCounter 
            tokens={tokens}
            tokensPerSecond={tokensPerSecond}
          />
          
          {/* Click Button */}
          <div className="flex items-center justify-center py-4">
            <ClickButton 
              onClick={handleClickWithAudio}
              tokensPerClick={tokensPerClick}
              disabled={gamePhase === 'victory' || gamePhase === 'failure'}
            />
          </div>
          
          {/* Terminal Console - Takes remaining space */}
          <div className="flex-1 min-h-0">
            <TerminalConsole 
              tokens={tokens} 
              tokensPerSecond={tokensPerSecond}
              gamePhase={gamePhase}
            />
          </div>
        </div>

        {/* Right Side - Upgrade Shop */}
        <div className="flex-1 max-w-lg">
          <UpgradeShop 
            tokens={tokens}
            upgrades={upgrades}
            onPurchase={handlePurchaseWithAudio}
          />
        </div>
      </div>
    </main>
  )
}