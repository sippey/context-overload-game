let audioContext: AudioContext | null = null

// Initialize audio context (requires user interaction)
export function initializeAudio(): AudioContext | null {
  if (typeof window === 'undefined') return null
  
  if (!audioContext) {
    try {
      audioContext = new (window.AudioContext || (window as any).webkitAudioContext)()
    } catch (e) {
      console.warn('Web Audio API not supported')
      return null
    }
  }
  
  // Resume context if suspended (required by browser policies)
  if (audioContext.state === 'suspended') {
    audioContext.resume()
  }
  
  return audioContext
}

// Generate click sound
export function playClickSound(volume: number = 0.1): void {
  const ctx = initializeAudio()
  if (!ctx) return

  try {
    const oscillator = ctx.createOscillator()
    const gainNode = ctx.createGain()
    
    oscillator.connect(gainNode)
    gainNode.connect(ctx.destination)
    
    // Configure sound - subtle, low-tone click
    oscillator.frequency.setValueAtTime(220, ctx.currentTime)
    oscillator.frequency.exponentialRampToValueAtTime(180, ctx.currentTime + 0.08)
    oscillator.type = 'sine'
    
    // Volume envelope
    gainNode.gain.setValueAtTime(0, ctx.currentTime)
    gainNode.gain.linearRampToValueAtTime(volume, ctx.currentTime + 0.01)
    gainNode.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.08)
    
    oscillator.start(ctx.currentTime)
    oscillator.stop(ctx.currentTime + 0.08)
  } catch (e) {
    console.warn('Failed to play click sound:', e)
  }
}

// Generate purchase success sound
export function playPurchaseSound(volume: number = 0.15): void {
  const ctx = initializeAudio()
  if (!ctx) return

  try {
    const oscillator1 = ctx.createOscillator()
    const oscillator2 = ctx.createOscillator()
    const gainNode = ctx.createGain()
    
    oscillator1.connect(gainNode)
    oscillator2.connect(gainNode)
    gainNode.connect(ctx.destination)
    
    // Two-tone success chime
    oscillator1.frequency.setValueAtTime(523.25, ctx.currentTime) // C5
    oscillator2.frequency.setValueAtTime(659.25, ctx.currentTime) // E5
    oscillator1.type = 'sine'
    oscillator2.type = 'sine'
    
    // Volume envelope
    gainNode.gain.setValueAtTime(0, ctx.currentTime)
    gainNode.gain.linearRampToValueAtTime(volume, ctx.currentTime + 0.02)
    gainNode.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.3)
    
    oscillator1.start(ctx.currentTime)
    oscillator2.start(ctx.currentTime)
    oscillator1.stop(ctx.currentTime + 0.3)
    oscillator2.stop(ctx.currentTime + 0.3)
  } catch (e) {
    console.warn('Failed to play purchase sound:', e)
  }
}

// Generate glitch/error sound
export function playGlitchSound(volume: number = 0.05): void {
  const ctx = initializeAudio()
  if (!ctx) return

  try {
    const oscillator = ctx.createOscillator()
    const gainNode = ctx.createGain()
    const filter = ctx.createBiquadFilter()
    
    oscillator.connect(filter)
    filter.connect(gainNode)
    gainNode.connect(ctx.destination)
    
    // Harsh, distorted sound
    oscillator.type = 'sawtooth'
    oscillator.frequency.setValueAtTime(200 + Math.random() * 300, ctx.currentTime)
    
    // Low-pass filter with automation
    filter.type = 'lowpass'
    filter.frequency.setValueAtTime(1000, ctx.currentTime)
    filter.frequency.exponentialRampToValueAtTime(100, ctx.currentTime + 0.2)
    
    // Volume envelope
    gainNode.gain.setValueAtTime(0, ctx.currentTime)
    gainNode.gain.linearRampToValueAtTime(volume, ctx.currentTime + 0.01)
    gainNode.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.2)
    
    oscillator.start(ctx.currentTime)
    oscillator.stop(ctx.currentTime + 0.2)
  } catch (e) {
    console.warn('Failed to play glitch sound:', e)
  }
}

// Generate warning/alert sound
export function playWarningSound(volume: number = 0.08): void {
  const ctx = initializeAudio()
  if (!ctx) return

  try {
    const oscillator = ctx.createOscillator()
    const gainNode = ctx.createGain()
    
    oscillator.connect(gainNode)
    gainNode.connect(ctx.destination)
    
    // Alternating warning tone
    oscillator.type = 'square'
    oscillator.frequency.setValueAtTime(880, ctx.currentTime)
    oscillator.frequency.setValueAtTime(440, ctx.currentTime + 0.2)
    oscillator.frequency.setValueAtTime(880, ctx.currentTime + 0.4)
    
    // Volume envelope
    gainNode.gain.setValueAtTime(0, ctx.currentTime)
    gainNode.gain.linearRampToValueAtTime(volume, ctx.currentTime + 0.01)
    gainNode.gain.linearRampToValueAtTime(volume * 0.5, ctx.currentTime + 0.2)
    gainNode.gain.linearRampToValueAtTime(volume, ctx.currentTime + 0.4)
    gainNode.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.6)
    
    oscillator.start(ctx.currentTime)
    oscillator.stop(ctx.currentTime + 0.6)
  } catch (e) {
    console.warn('Failed to play warning sound:', e)
  }
}

// Generate clock tick sound
export function playTickSound(volume: number = 0.06): void {
  const ctx = initializeAudio()
  if (!ctx) return

  try {
    const oscillator = ctx.createOscillator()
    const gainNode = ctx.createGain()
    
    oscillator.connect(gainNode)
    gainNode.connect(ctx.destination)
    
    // Sharp, brief tick sound
    oscillator.frequency.setValueAtTime(1200, ctx.currentTime)
    oscillator.type = 'square'
    
    // Very brief envelope for crisp tick
    gainNode.gain.setValueAtTime(0, ctx.currentTime)
    gainNode.gain.linearRampToValueAtTime(volume, ctx.currentTime + 0.005)
    gainNode.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.02)
    
    oscillator.start(ctx.currentTime)
    oscillator.stop(ctx.currentTime + 0.02)
  } catch (e) {
    console.warn('Failed to play tick sound:', e)
  }
}

// Generate victory/system crash sound
export function playVictorySound(volume: number = 0.2): void {
  const ctx = initializeAudio()
  if (!ctx) return

  try {
    // Create multiple oscillators for a complex crash sound
    const oscillators: OscillatorNode[] = []
    const gainNode = ctx.createGain()
    
    gainNode.connect(ctx.destination)
    
    // Generate chaotic frequencies
    for (let i = 0; i < 5; i++) {
      const osc = ctx.createOscillator()
      osc.connect(gainNode)
      osc.type = i % 2 === 0 ? 'sawtooth' : 'square'
      osc.frequency.setValueAtTime(100 + i * 150 + Math.random() * 200, ctx.currentTime)
      osc.frequency.exponentialRampToValueAtTime(50 + Math.random() * 100, ctx.currentTime + 2)
      oscillators.push(osc)
    }
    
    // Volume envelope - dramatic buildup and decay
    gainNode.gain.setValueAtTime(0, ctx.currentTime)
    gainNode.gain.linearRampToValueAtTime(volume, ctx.currentTime + 0.5)
    gainNode.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 2)
    
    // Start and stop all oscillators
    oscillators.forEach(osc => {
      osc.start(ctx.currentTime)
      osc.stop(ctx.currentTime + 2)
    })
  } catch (e) {
    console.warn('Failed to play victory sound:', e)
  }
}