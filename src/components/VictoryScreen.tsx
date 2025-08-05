'use client'

import { formatNumber, formatDuration } from '@/utils/formatNumbers'

interface VictoryScreenProps {
  finalTokens: number
  duration: number
  onPlayAgain: () => void
}

export default function VictoryScreen({ finalTokens, duration, onPlayAgain }: VictoryScreenProps) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50 p-4">
      <div className="bg-cyber-gray border-2 border-neon-red rounded-lg p-8 max-w-md w-full text-center space-y-6 animate-pulse">
        {/* Victory Title */}
        <div className="space-y-2">
          <h1 className="text-4xl md:text-6xl font-bold neon-red-text glitch-effect">
            SYSTEM
          </h1>
          <h1 className="text-4xl md:text-6xl font-bold neon-red-text glitch-effect">
            OVERLOAD
          </h1>
        </div>

        {/* Victory Message */}
        <div className="space-y-3">
          <div className="text-neon-red text-lg font-bold">
            ░▒▓█ CRITICAL SYSTEM FAILURE █▓▒░
          </div>
          <div className="text-gray-300 text-sm">
            The AI security system has been successfully overloaded!
            The victim has been freed from the digital prison.
          </div>
        </div>

        {/* Statistics */}
        <div className="bg-black border border-neon-red rounded p-4 space-y-2">
          <div className="text-neon-blue">
            <span className="text-gray-400">Final Tokens:</span>{' '}
            <span className="font-bold text-neon-green">
              {formatNumber(finalTokens)}
            </span>
          </div>
          <div className="text-neon-blue">
            <span className="text-gray-400">Completion Time:</span>{' '}
            <span className="font-bold text-neon-green">
              {formatDuration(duration)}
            </span>
          </div>
          <div className="text-neon-blue">
            <span className="text-gray-400">Mission Status:</span>{' '}
            <span className="font-bold text-neon-green">SUCCESS</span>
          </div>
        </div>

        {/* Performance Rating */}
        <div className="space-y-2">
          <div className="text-gray-400 text-sm">PERFORMANCE RATING:</div>
          <div className="text-2xl font-bold">
            {duration < 90000 ? (
              <span className="text-neon-green">ELITE HACKER</span>
            ) : duration < 120000 ? (
              <span className="text-neon-blue">SKILLED OPERATIVE</span>
            ) : duration < 150000 ? (
              <span className="text-yellow-400">DETERMINED AGENT</span>
            ) : (
              <span className="text-orange-400">PERSISTENT DETECTIVE</span>
            )}
          </div>
        </div>

        {/* Play Again Button */}
        <button
          onClick={onPlayAgain}
          className="cyber-button w-full py-3 text-lg font-bold hover:scale-105 transition-transform"
        >
          INFILTRATE AGAIN
        </button>

        {/* Flavor Text */}
        <div className="text-xs text-gray-500 space-y-1">
          <div>{`// System logs cleared`}</div>
          <div>{`// Connection terminated`}</div>
          <div>{`// Trace signatures randomized`}</div>
          <div>{`// Ready for next mission`}</div>
        </div>
      </div>
    </div>
  )
}