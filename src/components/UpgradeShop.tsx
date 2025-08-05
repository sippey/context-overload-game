'use client'

import { formatNumber } from '@/utils/formatNumbers'
import type { Upgrade } from '@/utils/gameBalance'

interface UpgradeShopProps {
  tokens: number
  upgrades: Upgrade[]
  onPurchase: (upgradeId: string) => void
}

export default function UpgradeShop({ tokens, upgrades, onPurchase }: UpgradeShopProps) {
  return (
    <div className="h-full flex flex-col bg-cyber-gray/50 border border-neon-blue/50 rounded-lg p-3">
      <h2 className="text-lg font-bold neon-text mb-3">
        UPGRADES
      </h2>
      
      <div className="flex-1 space-y-2 overflow-y-auto pr-2">
        {upgrades.map((upgrade) => {
          const canAfford = tokens >= upgrade.currentPrice
          const isOwned = upgrade.owned > 0
          
          return (
            <button
              key={upgrade.id}
              onClick={() => onPurchase(upgrade.id)}
              disabled={!canAfford}
              className={`
                w-full text-left border rounded p-2 transition-all duration-200 text-sm
                ${canAfford 
                  ? 'border-neon-green/50 bg-green-900/10 hover:bg-green-900/30 cursor-pointer hover:border-neon-green' 
                  : 'border-gray-600 bg-gray-900/10 cursor-not-allowed opacity-75'
                }
                ${isOwned ? 'border-neon-blue' : ''}
              `}
            >
              <div className="flex justify-between items-start gap-2">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <h3 className={`font-bold text-xs ${
                      canAfford ? 'text-neon-green' : 'text-gray-400'
                    }`}>
                      {upgrade.name}
                      {isOwned && <span className="text-neon-blue">({upgrade.owned})</span>}
                    </h3>
                  </div>
                  
                  <div className="flex items-center gap-3 mt-1">
                    <div className="text-xs">
                      {upgrade.clickMultiplier > 0 && (
                        <span className="text-neon-blue">
                          {upgrade.isMultiplier ? `${upgrade.clickMultiplier}X` : `+${upgrade.clickMultiplier}/click`}
                        </span>
                      )}
                      {upgrade.passiveGeneration > 0 && (
                        <span className="text-neon-green">+{upgrade.passiveGeneration}/sec</span>
                      )}
                    </div>
                  </div>
                </div>
                
                <div className="flex flex-col items-end gap-1">
                  <div className={`px-2 py-1 rounded text-xs font-bold ${
                    canAfford 
                      ? 'bg-neon-green/20 text-neon-green border border-neon-green/50' 
                      : 'bg-gray-700/50 text-gray-500 border border-gray-600'
                  }`}>
                    {formatNumber(upgrade.currentPrice)}
                  </div>
                  {canAfford && (
                    <div className="text-xs text-neon-green animate-pulse">
                      CLICK TO BUY
                    </div>
                  )}
                </div>
              </div>
            </button>
          )
        })}
      </div>
      
      {/* Compact Footer */}
      <div className="mt-3 pt-2 border-t border-gray-600 text-center">
        <div className="text-neon-blue font-bold text-sm">
          Balance: {formatNumber(tokens)}
        </div>
      </div>
    </div>
  )
}