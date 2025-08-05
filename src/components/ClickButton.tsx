'use client'

import { useState } from 'react'
import { formatNumber } from '@/utils/formatNumbers'

interface ClickButtonProps {
  onClick: () => void
  tokensPerClick: number
  disabled?: boolean
}

export default function ClickButton({ onClick, tokensPerClick, disabled }: ClickButtonProps) {
  const [isClicked, setIsClicked] = useState(false)
  const [particles, setParticles] = useState<Array<{ id: number, x: number, y: number }>>([])

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (disabled) return

    onClick()
    setIsClicked(true)
    
    // Create particle effect
    const rect = event.currentTarget.getBoundingClientRect()
    const x = event.clientX - rect.left
    const y = event.clientY - rect.top
    
    const newParticles = Array.from({ length: 5 }, (_, i) => ({
      id: Date.now() + i,
      x: x + (Math.random() - 0.5) * 40,
      y: y + (Math.random() - 0.5) * 40
    }))
    
    setParticles(prev => [...prev, ...newParticles])
    
    // Reset click animation
    setTimeout(() => setIsClicked(false), 150)
    
    // Remove particles
    setTimeout(() => {
      setParticles(prev => prev.filter(p => !newParticles.find(np => np.id === p.id)))
    }, 600)
  }

  return (
    <div className="flex flex-col items-center gap-2">
      <div className="relative">
        {/* Main Click Button */}
        <button
          onClick={handleClick}
          disabled={disabled}
          className={`
            relative w-28 h-28 rounded-full border-2 border-neon-blue
            bg-cyber-gray text-neon-blue font-mono text-lg font-bold
            transition-all duration-150 select-none
            ${isClicked ? 'scale-95 bg-neon-blue text-cyber-dark' : 'hover:scale-105'}
            ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer hover:shadow-lg hover:shadow-neon-blue/50'}
          `}
          style={{
            boxShadow: isClicked 
              ? '0 0 30px #00f5ff, inset 0 0 20px rgba(0, 245, 255, 0.3)'
              : '0 0 15px #00f5ff, 0 0 30px rgba(0, 245, 255, 0.1)'
          }}
        >
          <div className="flex flex-col items-center">
            <div className="text-xs">QUERY AI</div>
            <div className="text-xl">►</div>
          </div>
        </button>

        {/* Click Particles */}
        {particles.map(particle => (
          <div
            key={particle.id}
            className="absolute pointer-events-none text-neon-green font-bold animate-ping"
            style={{
              left: particle.x,
              top: particle.y,
              transform: 'translate(-50%, -50%)',
              animation: 'ping 0.6s cubic-bezier(0, 0, 0.2, 1) forwards'
            }}
          >
            +{formatNumber(tokensPerClick)}
          </div>
        ))}
      </div>

      {/* Click Value Display - Compact */}
      <div className="text-center">
        <div className="text-neon-green text-sm font-bold">
          +{formatNumber(tokensPerClick)}/click
        </div>
        <div className="text-xs text-gray-400">
          Click to generate tokens
        </div>
      </div>
    </div>
  )
}