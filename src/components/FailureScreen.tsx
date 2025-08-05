'use client'

import { formatNumber, formatDuration } from '@/utils/formatNumbers'

interface FailureScreenProps {
  finalTokens: number
  duration: number
  onTryAgain: () => void
}

export default function FailureScreen({ finalTokens, duration, onTryAgain }: FailureScreenProps) {
  const progress = (finalTokens / 1_000_000) * 100

  return (
    <div className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50 p-4">
      <div className="bg-cyber-gray border-2 border-neon-red rounded-lg p-8 max-w-md w-full text-center space-y-6">
        {/* Failure Title */}
        <div className="space-y-2">
          <h1 className="text-4xl md:text-6xl font-bold neon-red-text">
            TIME&apos;S UP!
          </h1>
          <h2 className="text-2xl font-bold text-gray-400">
            SYSTEM DEFENDED
          </h2>
        </div>

        {/* Failure Message */}
        <div className="space-y-3">
          <div className="text-neon-red text-lg font-bold">
            ⚠️ CONTEXT OVERLOAD FAILED ⚠️
          </div>
          <div className="text-gray-300 text-sm">
            The AI&apos;s security systems held strong. You didn&apos;t generate enough tokens 
            to trigger a system crash within the time limit.
          </div>
        </div>

        {/* Statistics */}
        <div className="bg-black border border-neon-red rounded p-4 space-y-2">
          <div className="text-neon-blue">
            <span className="text-gray-400">Tokens Generated:</span>{' '}
            <span className="font-bold text-neon-red">
              {formatNumber(finalTokens)} / 1M
            </span>
          </div>
          <div className="text-neon-blue">
            <span className="text-gray-400">Progress:</span>{' '}
            <span className="font-bold text-neon-red">
              {progress.toFixed(1)}%
            </span>
          </div>
          <div className="text-neon-blue">
            <span className="text-gray-400">Time Elapsed:</span>{' '}
            <span className="font-bold text-neon-red">
              60s (TIMEOUT)
            </span>
          </div>
          <div className="text-neon-blue">
            <span className="text-gray-400">Mission Status:</span>{' '}
            <span className="font-bold text-neon-red">FAILED</span>
          </div>
        </div>

        {/* Encouragement */}
        <div className="space-y-2">
          <div className="text-gray-400 text-sm">TIP:</div>
          <div className="text-sm text-neon-blue">
            Buy multiplier upgrades early! They stack exponentially.
            {progress < 10 && " Focus on 2X and 4X multipliers first."}
            {progress >= 10 && progress < 50 && " You need more 8X and 16X multipliers."}
            {progress >= 50 && " So close! You&apos;ve got the strategy down."}
          </div>
        </div>

        {/* Try Again Button */}
        <button
          onClick={onTryAgain}
          className="cyber-button w-full py-3 text-lg font-bold hover:scale-105 transition-transform"
        >
          TRY AGAIN
        </button>

        {/* Flavor Text */}
        <div className="text-xs text-gray-500 space-y-1">
          <div>{`// Mission failed`}</div>
          <div>{`// Security protocols intact`}</div>
          <div>{`// Victim remains trapped`}</div>
          <div>{`// Try a different approach`}</div>
        </div>
      </div>
    </div>
  )
}