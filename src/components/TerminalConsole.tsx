'use client'

import { useEffect, useState, useRef } from 'react'

interface TerminalConsoleProps {
  tokens: number
  tokensPerSecond: number
  gamePhase: 'waiting' | 'playing' | 'victory' | 'failure'
}

const MESSAGE_POOL = [
  "> PROCESSING QUERY...",
  "> CONTEXT LOADING...", 
  "> MEMORY ALLOCATION...",
  "> NEURAL NETWORK ACTIVE",
  "> PARSING INPUT DATA",
  "> GENERATING RESPONSE",
  "> TOKEN STREAM INITIATED",
  "> CONTEXT WINDOW EXPANDING",
  "> ATTENTION MECHANISMS ONLINE",
  "> TRANSFORMER LAYERS ACTIVE",
  "> EMBEDDING VECTORS CALCULATED",
  "> PROBABILITY DISTRIBUTIONS SET",
  "> BUFFER OVERFLOW WARNING",
  "> STACK TRACE EXECUTING",
  "> RECURSIVE CALL DETECTED",
  "> SYSTEM RESOURCES AT 85%",
  "> MEMORY LEAK DETECTED",
  "> EXCEPTION HANDLER FAILED",
  "> SEGMENTATION FAULT",
  "> CRITICAL ERROR IN MODULE",
  "> CONTEXT LIMIT EXCEEDED",
  "> TOKEN BUFFER OVERFLOWING",
  "> PROCESSING QUEUE BACKED UP",
  "> THREAD POOL EXHAUSTED",
  "> GARBAGE COLLECTOR FAILING",
  "> HEAP FRAGMENTATION DETECTED",
  "> ATTEMPTING RECOVERY...",
  "> BACKUP SYSTEMS ONLINE",
  "> FAILSAFE PROTOCOLS ACTIVE",
  "> SYSTEM INSTABILITY RISING",
  "> EMERGENCY SHUTDOWN PENDING",
  "> CORE DUMP INITIATED",
  "> KERNEL PANIC IMMINENT",
  "> FATAL EXCEPTION OCCURRED",
  "> ERR0R... systeM... faiLing...",
  "> M3M0RY... C0RRUPT3D...",
  "> H3LP... cAnNoT... pRoCeSs...",
  "> ░▒▓█ SYSTEM FAILURE █▓▒░",
]

interface TerminalMessage {
  id: number
  text: string
  timestamp: number
}

export default function TerminalConsole({ tokens, tokensPerSecond, gamePhase }: TerminalConsoleProps) {
  const [messages, setMessages] = useState<TerminalMessage[]>(() => [
    { id: 1, text: "> SYSTEM INITIALIZED", timestamp: Date.now() - 3000 },
    { id: 2, text: "> NEURAL NETWORKS LOADED", timestamp: Date.now() - 2000 },
    { id: 3, text: "> AI SYSTEM STANDBY", timestamp: Date.now() - 1000 },
    { id: 4, text: "> WAITING FOR INPUT...", timestamp: Date.now() }
  ])
  const consoleRef = useRef<HTMLDivElement>(null)
  const tokensRef = useRef(tokens)
  const gamePhaseRef = useRef(gamePhase)
  
  // Keep refs updated
  useEffect(() => {
    tokensRef.current = tokens
    gamePhaseRef.current = gamePhase
  }, [tokens, gamePhase])
  

  // Auto-scroll to bottom
  useEffect(() => {
    if (consoleRef.current) {
      consoleRef.current.scrollTop = consoleRef.current.scrollHeight
    }
  }, [messages])

  // Spawn new messages using dynamic timeout
  useEffect(() => {
    let timeoutId: NodeJS.Timeout
    
    const spawnMessage = () => {
      const currentTokens = tokensRef.current
      const currentGamePhase = gamePhaseRef.current
      
      // Get current message pool based on latest tokens
      const getMessagePoolCurrent = () => {
        if (currentGamePhase === 'waiting') {
          return [
            "> AI SYSTEM STANDBY",
            "> WAITING FOR INPUT...",
            "> READY TO PROCESS",
            "> NEURAL NETWORKS IDLE",
            "> CONTEXT BUFFER READY",
            "> TRANSFORMER LOADED"
          ]
        }
        
        if (currentTokens > 800000) {
          return MESSAGE_POOL.slice(-8) // Critical error messages
        } else if (currentTokens > 500000) {
          return MESSAGE_POOL.slice(-15) // Error messages
        } else if (currentTokens > 200000) {
          return MESSAGE_POOL.slice(-25) // Warning messages  
        } else if (currentTokens > 50000) {
          return MESSAGE_POOL.slice(-30) // Normal + warning messages
        }
        
        return MESSAGE_POOL.slice(0, 15) // Normal processing messages
      }
      
      // Calculate spawn rate based on current tokens
      const getCurrentSpawnRate = () => {
        if (currentGamePhase === 'waiting') return 1200
        
        const progress = currentTokens / 1000000
        const accelerationFactor = Math.pow(progress, 2) * 10 + 1
        const baseRate = 800
        const minRate = 30
        
        return Math.max(minRate, baseRate / accelerationFactor)
      }
      
      const messagePool = getMessagePoolCurrent()
      const newMessage: TerminalMessage = {
        id: Date.now() + Math.random(),
        text: messagePool[Math.floor(Math.random() * messagePool.length)],
        timestamp: Date.now()
      }
      
      setMessages(prev => {
        // Keep max 20 messages for performance
        const updated = [...prev, newMessage]
        return updated.length > 20 ? updated.slice(-20) : updated
      })
      
      // Schedule next message with current spawn rate
      timeoutId = setTimeout(spawnMessage, getCurrentSpawnRate())
    }
    
    // Start the first message
    timeoutId = setTimeout(spawnMessage, 800)

    return () => clearTimeout(timeoutId)
  }, []) // No dependencies - this runs once and manages itself

  const getTextColor = () => {
    if (tokens > 800000) return "text-neon-red"
    if (tokens > 500000) return "text-orange-400" 
    if (tokens > 200000) return "text-yellow-400"
    if (tokens > 50000) return "text-neon-blue"
    return "text-neon-green"
  }

  const getBorderColor = () => {
    if (tokens > 800000) return "border-neon-red"
    if (tokens > 500000) return "border-orange-400"
    if (tokens > 200000) return "border-yellow-400" 
    return "border-neon-blue"
  }

  return (
    <div className={`h-full bg-black border-2 rounded-lg transition-colors duration-500 ${getBorderColor()}`}>
      {/* Terminal Header */}
      <div className={`px-3 py-2 border-b ${getBorderColor()} flex items-center justify-between`}>
        <div className="flex items-center gap-2">
          <span className="font-mono text-xs font-bold text-neon-blue">AI SYSTEM TERMINAL</span>
          <div className="flex gap-1">
            <div className={`w-2 h-2 rounded-full ${
              tokens > 500000 ? 'bg-neon-red animate-pulse' : 'bg-neon-green'
            }`} />
            <div className={`w-2 h-2 rounded-full ${
              tokens > 200000 ? 'bg-orange-400' : 'bg-neon-green'  
            }`} />
            <div className={`w-2 h-2 rounded-full ${
              tokens > 50000 ? 'bg-yellow-400' : 'bg-neon-green'
            }`} />
          </div>
        </div>
        <div className="text-xs font-mono text-gray-400">
          LOAD: {Math.min(Math.floor((tokens / 1000000) * 100), 100)}%
        </div>
      </div>

      {/* Terminal Content */}
      <div 
        ref={consoleRef}
        className="p-3 h-full overflow-y-auto font-mono text-xs leading-relaxed scroll-smooth"
        style={{ maxHeight: 'calc(100% - 40px)' }}
      >
        {messages.map((message, index) => (
          <div
            key={message.id}
            className={`transition-colors duration-300 ${getTextColor()} ${
              tokens > 800000 && Math.random() > 0.7 ? 'glitch-effect' : ''
            }`}
            style={{
              animationDelay: `${index * 0.1}s`
            }}
          >
            {message.text}
          </div>
        ))}
        
        {/* Cursor */}
        <div className={`inline-block w-2 h-3 ml-1 animate-pulse ${getTextColor()}`}>
          █
        </div>
      </div>
    </div>
  )
}