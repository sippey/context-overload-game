'use client'

import { useEffect, useState } from 'react'
import { formatNumber } from '@/utils/formatNumbers'

interface TokenCounterProps {
  tokens: number
  tokensPerSecond: number
}

export default function TokenCounter({ tokens, tokensPerSecond }: TokenCounterProps) {
  const [displayTokens, setDisplayTokens] = useState(tokens)
  const [isAnimating, setIsAnimating] = useState(false)

  // Smooth counting animation
  useEffect(() => {
    if (Math.abs(tokens - displayTokens) < 1) {
      setDisplayTokens(tokens)
      return
    }

    const difference = tokens - displayTokens
    const step = difference / 10
    
    const interval = setInterval(() => {
      setDisplayTokens(prev => {
        const newValue = prev + step
        if (Math.abs(tokens - newValue) < Math.abs(step)) {
          return tokens
        }
        return newValue
      })
    }, 16) // ~60fps

    return () => clearInterval(interval)
  }, [tokens, displayTokens])

  // Trigger animation on token change
  useEffect(() => {
    if (tokens > displayTokens) {
      setIsAnimating(true)
      const timeout = setTimeout(() => setIsAnimating(false), 200)
      return () => clearTimeout(timeout)
    }
  }, [tokens, displayTokens])

  const progress = Math.min((tokens / 1_000_000) * 100, 100)

  return (
    <div className="text-center space-y-4">
      {/* Main Token Display */}
      <div className={`text-6xl md:text-8xl font-bold transition-all duration-200 ${
        isAnimating ? 'scale-110 neon-green-text' : 'neon-text'
      }`}>
        {formatNumber(Math.floor(displayTokens))}
      </div>

      {/* Tokens Per Second */}
      {tokensPerSecond > 0 && (
        <div className="text-lg md:text-xl text-neon-green">
          +{formatNumber(tokensPerSecond)} tokens/sec
        </div>
      )}

      {/* Progress Bar */}
      <div className="max-w-2xl mx-auto">
        <div className="bg-cyber-gray h-4 rounded-full overflow-hidden border border-neon-blue">
          <div 
            className="h-full bg-gradient-to-r from-neon-blue to-neon-green transition-all duration-500 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
        <div className="flex justify-between text-sm mt-2 text-gray-400">
          <span>0</span>
          <span className="neon-text">TARGET: 1M TOKENS</span>
          <span>1M</span>
        </div>
      </div>

      {/* System Status */}
      <div className="text-sm md:text-base">
        {progress < 25 && (
          <span className="text-neon-blue">SYSTEM STATUS: NORMAL</span>
        )}
        {progress >= 25 && progress < 50 && (
          <span className="text-yellow-400">SYSTEM STATUS: ELEVATED LOAD</span>
        )}
        {progress >= 50 && progress < 75 && (
          <span className="text-orange-400">SYSTEM STATUS: HIGH LOAD WARNING</span>
        )}
        {progress >= 75 && progress < 95 && (
          <span className="text-neon-red glitch-effect">SYSTEM STATUS: CRITICAL OVERLOAD</span>
        )}
        {progress >= 95 && (
          <span className="text-neon-red glitch-effect animate-pulse">SYSTEM FAILURE IMMINENT</span>
        )}
      </div>
    </div>
  )
}