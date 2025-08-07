'use client'

import { useEffect, useState, useCallback } from 'react'
import { iframeCommunication, InitPayload } from '@/utils/iframeCommunication'

interface IframeCommunicationState {
  isInIframe: boolean
  isInitialized: boolean
  currentSanity: number
  gameId: string | null
  difficulty: string | null
  variant: string | null
}

export function useIframeCommunication() {
  const [state, setState] = useState<IframeCommunicationState>({
    isInIframe: false,
    isInitialized: false,
    currentSanity: 100,
    gameId: null,
    difficulty: null,
    variant: null
  })

  useEffect(() => {
    setState(prev => ({
      ...prev,
      isInIframe: iframeCommunication.isRunningInIframe()
    }))

    iframeCommunication.onInit((payload: InitPayload) => {
      console.log('[useIframeCommunication] Init callback triggered with payload:', payload)
      setState(prev => {
        const newState = {
          ...prev,
          isInitialized: true,
          currentSanity: payload.sanity || 100,
          gameId: payload.gameId || 'default',
          difficulty: payload.difficulty || 'normal',
          variant: payload.variant || 'default'
        }
        console.log('[useIframeCommunication] New state:', newState)
        return newState
      })
    })

    iframeCommunication.onSanityUpdate((sanity: number) => {
      setState(prev => ({
        ...prev,
        currentSanity: sanity
      }))
    })

    const defaultPayload: InitPayload = {
      gameId: 'token-overload',
      sanity: 100,
      difficulty: 'normal',
      variant: 'default'
    }
    
    iframeCommunication.startWithTimeout(defaultPayload, 5000)
  }, [])

  const sendSanityChange = useCallback((delta: number) => {
    iframeCommunication.sendSanityChange(delta)
  }, [])

  const sendGameComplete = useCallback((success: boolean, finalAnswer?: string) => {
    iframeCommunication.sendGameComplete(success, finalAnswer)
  }, [])

  return {
    ...state,
    sendSanityChange,
    sendGameComplete
  }
}