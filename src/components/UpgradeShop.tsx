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
    <div className="bg-cyber-gray border border-neon-blue rounded-lg p-4 md:p-6">
      <h2 className="text-xl md:text-2xl font-bold neon-text mb-4 text-center">
        UPGRADE SHOP
      </h2>
      
      <div className="space-y-3 max-h-96 md:max-h-none overflow-y-auto">
        {upgrades.map((upgrade) => {
          const canAfford = tokens >= upgrade.currentPrice
          const isOwned = upgrade.owned > 0
          
          return (
            <div
              key={upgrade.id}
              className={`
                border rounded-lg p-3 md:p-4 transition-all duration-200
                ${canAfford 
                  ? 'border-neon-green bg-green-900/20 hover:bg-green-900/30' 
                  : 'border-gray-600 bg-gray-900/20'
                }
                ${isOwned ? 'border-neon-blue' : ''}
              `}
            >
              <div className="flex justify-between items-start mb-2">
                <div className="flex-1">
                  <h3 className={`font-bold text-sm md:text-base ${
                    canAfford ? 'text-neon-green' : 'text-gray-400'
                  }`}>
                    {upgrade.name}
                    {isOwned && (
                      <span className="ml-2 text-neon-blue text-xs">
                        (Owned: {upgrade.owned})
                      </span>
                    )}
                  </h3>
                  <p className="text-xs md:text-sm text-gray-300 mt-1">
                    {upgrade.description}
                  </p>
                </div>
                
                <button
                  onClick={() => onPurchase(upgrade.id)}
                  disabled={!canAfford}
                  className={`
                    ml-3 px-3 py-1 rounded text-xs md:text-sm font-bold transition-all duration-200
                    ${canAfford
                      ? 'bg-neon-green text-cyber-dark hover:bg-green-400 cursor-pointer'
                      : 'bg-gray-700 text-gray-500 cursor-not-allowed'
                    }
                  `}
                >
                  BUY
                </button>
              </div>
              
              <div className="flex justify-between items-end text-xs md:text-sm">
                <div className="space-y-1">
                  {upgrade.clickMultiplier > 0 && (
                    <div className="text-neon-blue">
                      +{upgrade.clickMultiplier} tokens/click
                    </div>
                  )}
                  {upgrade.passiveGeneration > 0 && (
                    <div className="text-neon-green">
                      +{upgrade.passiveGeneration} tokens/sec
                    </div>
                  )}
                </div>
                
                <div className={`font-bold ${
                  canAfford ? 'text-neon-green' : 'text-gray-400'
                }`}>
                  {formatNumber(upgrade.currentPrice)} tokens
                </div>
              </div>
            </div>
          )
        })}
      </div>
      
      {/* Shop Footer */}
      <div className="mt-4 pt-4 border-t border-gray-600 text-center">
        <div className="text-neon-blue font-bold text-lg md:text-xl">
          {formatNumber(tokens)} tokens available
        </div>
        <div className="text-gray-400 text-xs md:text-sm mt-1">
          Purchase upgrades to increase token generation
        </div>
      </div>
    </div>
  )
}