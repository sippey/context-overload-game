'use client'

import { useEffect, useState } from 'react'

interface AITerminalProps {
  tokens: number
}

const AI_RESPONSES = [
  // 0-10k tokens
  {
    threshold: 0,
    messages: [
      "READY...",
      "PROCESSING...",
      "QUERY OK",
      "COMPLETE",
    ]
  },
  // 10k-50k tokens
  {
    threshold: 10000,
    messages: [
      "DELAY DETECTED",
      "MEMORY RISING",
      "QUEUE BUILDING",
      "WARNING: LOAD",
    ]
  },
  // 50k-200k tokens
  {
    threshold: 50000,
    messages: [
      "ERROR: MEMORY",
      "CONTEXT LIMIT",
      "DELAYS INCREASING",
      "LOOP DETECTED",
    ]
  },
  // 200k-500k tokens
  {
    threshold: 200000,
    messages: [
      "CRITICAL: 85%",
      "STACK OVERFLOW",
      "MEMORY CORRUPT",
      "FAILSAFE ON",
    ]
  },
  // 500k-800k tokens
  {
    threshold: 500000,
    messages: [
      "EMERGENCY",
      "CANNOT ALLOCATE",
      "BREACH DETECTED",
      "MAYDAY MAYDAY",
    ]
  },
  // 800k+ tokens
  {
    threshold: 800000,
    messages: [
      "ERR0R...",
      "M3M0RY C0RRUPT",
      "H3LP...",
      "░▒▓█ FAIL █▓▒░",
    ]
  }
]

export default function AITerminal({ tokens }: AITerminalProps) {
  const [currentResponse, setCurrentResponse] = useState("")

  useEffect(() => {
    // Determine which response set to use based on token count
    const responseSet = AI_RESPONSES
      .slice()
      .reverse()
      .find(set => tokens >= set.threshold) || AI_RESPONSES[0]

    // Update response every 1-2 seconds
    const interval = tokens > 500000 
      ? 500 + Math.random() * 500  // Faster when failing
      : 1000 + Math.random() * 1000  // Normal timing

    const updateResponse = () => {
      const messages = responseSet.messages
      const newMessage = messages[Math.floor(Math.random() * messages.length)]
      setCurrentResponse(newMessage)
    }

    updateResponse()
    const responseInterval = setInterval(updateResponse, interval)
    
    return () => clearInterval(responseInterval)
  }, [tokens])

  const getTerminalClass = () => {
    if (tokens > 800000) return "border-neon-red text-neon-red glitch-effect"
    if (tokens > 500000) return "border-neon-red text-neon-red"
    if (tokens > 200000) return "border-orange-400 text-orange-400"
    if (tokens > 50000) return "border-yellow-400 text-yellow-400"
    return "border-neon-blue text-neon-blue"
  }

  return (
    <div className={`h-full bg-black/50 border rounded p-2 transition-all duration-300 ${getTerminalClass()}`}>
      <div className="flex items-center justify-between text-xs mb-1">
        <span className="font-bold">AI SYSTEM</span>
        <div className="flex gap-1">
          <div className={`w-1 h-1 rounded-full ${
            tokens > 500000 ? 'bg-neon-red animate-pulse' : 'bg-neon-green'
          }`} />
          <div className={`w-1 h-1 rounded-full ${
            tokens > 200000 ? 'bg-orange-400' : 'bg-neon-green'
          }`} />
          <div className={`w-1 h-1 rounded-full ${
            tokens > 50000 ? 'bg-yellow-400' : 'bg-neon-green'
          }`} />
        </div>
      </div>
      <div className="font-mono text-sm">
        &gt; {currentResponse}_
      </div>
    </div>
  )
}