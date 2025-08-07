'use client'

export interface IframeMessage {
  type: 'READY' | 'INIT' | 'UPDATE_SANITY' | 'SANITY_CHANGE' | 'GAME_COMPLETE'
  payload: any
}

export interface ReadyPayload {
  minigameType: string
}

export interface InitPayload {
  gameId: string
  sanity?: number
  difficulty?: string
  variant?: string
  [key: string]: any
}

export interface SanityChangePayload {
  sanityDelta: number
}

export interface GameCompletePayload {
  success: boolean
  finalAnswer?: string
}

export interface UpdateSanityPayload {
  sanity: number
}

class IframeCommunication {
  private isInIframe: boolean
  private parentOrigin: string | null = null
  private gameInitialized: boolean = false
  private currentSanity: number = 100
  private messageHandlers: Map<string, (payload: any) => void> = new Map()
  private readyCallback: (() => void) | null = null
  private initCallback: ((payload: InitPayload) => void) | null = null
  private sanityUpdateCallback: ((sanity: number) => void) | null = null

  constructor() {
    this.isInIframe = typeof window !== 'undefined' && window.self !== window.top
    
    if (typeof window !== 'undefined') {
      window.addEventListener('message', this.handleMessage.bind(this))
    }
  }

  private handleMessage(event: MessageEvent) {
    const message = event.data as IframeMessage
    
    if (!message?.type) return

    switch (message.type) {
      case 'INIT':
        this.handleInit(message.payload, event.origin)
        break
      case 'UPDATE_SANITY':
        this.handleSanityUpdate(message.payload)
        break
    }
  }

  private handleInit(payload: InitPayload, origin: string) {
    console.log('[IframeCommunication] INIT received:', payload)
    this.gameInitialized = true
    this.parentOrigin = origin
    this.currentSanity = payload.sanity || 100
    
    if (this.initCallback) {
      this.initCallback(payload)
    }
  }

  private handleSanityUpdate(payload: UpdateSanityPayload) {
    this.currentSanity = payload.sanity
    
    if (this.sanityUpdateCallback) {
      this.sanityUpdateCallback(payload.sanity)
    }
  }

  public sendReady(minigameType: string = 'arcade') {
    if (!this.isInIframe) return
    
    console.log('[IframeCommunication] Sending READY message')
    window.parent.postMessage({
      type: 'READY',
      payload: {
        minigameType
      }
    }, '*')
  }

  public sendSanityChange(delta: number) {
    if (!this.isInIframe || !this.parentOrigin) return
    
    window.parent.postMessage({
      type: 'SANITY_CHANGE',
      payload: {
        sanityDelta: delta
      }
    }, this.parentOrigin)
  }

  public sendGameComplete(success: boolean, finalAnswer?: string) {
    if (!this.isInIframe || !this.parentOrigin) return
    
    window.parent.postMessage({
      type: 'GAME_COMPLETE',
      payload: {
        success,
        finalAnswer
      }
    }, this.parentOrigin)
  }

  public onInit(callback: (payload: InitPayload) => void) {
    this.initCallback = callback
  }

  public onSanityUpdate(callback: (sanity: number) => void) {
    this.sanityUpdateCallback = callback
  }

  public getCurrentSanity(): number {
    return this.currentSanity
  }

  public isInitialized(): boolean {
    return this.gameInitialized
  }

  public isRunningInIframe(): boolean {
    return this.isInIframe
  }

  public startWithTimeout(defaultPayload: InitPayload, timeout: number = 10000) {
    if (!this.isInIframe) {
      this.handleInit(defaultPayload, window.location.origin)
      return
    }
    
    this.sendReady('arcade')
    
    setTimeout(() => {
      if (!this.gameInitialized) {
        console.log('No INIT received, starting with default settings')
        this.handleInit(defaultPayload, window.location.origin)
      }
    }, timeout)
  }
}

export const iframeCommunication = new IframeCommunication()