'use client'

import { useState, useEffect, useCallback } from 'react'
import { 
  playClickSound, 
  playPurchaseSound, 
  playGlitchSound, 
  playWarningSound, 
  playVictorySound,
  initializeAudio
} from '@/utils/audioSynthesis'

export function useAudio() {
  const [isEnabled, setIsEnabled] = useState(false)
  const [isInitialized, setIsInitialized] = useState(false)
  const [volume, setVolume] = useState(0.5)

  // Initialize audio on first user interaction
  useEffect(() => {
    const initAudio = () => {
      const ctx = initializeAudio()
      if (ctx) {
        setIsInitialized(true)
        setIsEnabled(true)
      }
    }

    // Add listeners for user interaction
    const events = ['click', 'touchstart', 'keydown']
    events.forEach(event => {
      document.addEventListener(event, initAudio, { once: true })
    })

    return () => {
      events.forEach(event => {
        document.removeEventListener(event, initAudio)
      })
    }
  }, [])

  const playClick = useCallback(() => {
    if (isEnabled && isInitialized) {
      playClickSound(volume * 0.1)
    }
  }, [isEnabled, isInitialized, volume])

  const playPurchase = useCallback(() => {
    if (isEnabled && isInitialized) {
      playPurchaseSound(volume * 0.15)
    }
  }, [isEnabled, isInitialized, volume])

  const playGlitch = useCallback(() => {
    if (isEnabled && isInitialized) {
      playGlitchSound(volume * 0.05)
    }
  }, [isEnabled, isInitialized, volume])

  const playWarning = useCallback(() => {
    if (isEnabled && isInitialized) {
      playWarningSound(volume * 0.08)
    }
  }, [isEnabled, isInitialized, volume])

  const playVictory = useCallback(() => {
    if (isEnabled && isInitialized) {
      playVictorySound(volume * 0.2)
    }
  }, [isEnabled, isInitialized, volume])

  const toggleAudio = useCallback(() => {
    if (!isInitialized) {
      const ctx = initializeAudio()
      if (ctx) {
        setIsInitialized(true)
        setIsEnabled(true)
      }
    } else {
      setIsEnabled(!isEnabled)
    }
  }, [isEnabled, isInitialized])

  return {
    isEnabled,
    isInitialized,
    volume,
    setVolume,
    toggleAudio,
    playClick,
    playPurchase,
    playGlitch,
    playWarning,
    playVictory
  }
}