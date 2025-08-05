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
      "AI SYSTEM: Ready to process queries...",
      "AI SYSTEM: Processing request... Done.",
      "AI SYSTEM: Query completed successfully.",
      "AI SYSTEM: Generating response... Complete.",
    ]
  },
  // 10k-50k tokens
  {
    threshold: 10000,
    messages: [
      "AI SYSTEM: Processing... slight delay detected.",
      "AI SYSTEM: Memory usage increasing...",
      "AI SYSTEM: Request queue building up...",
      "AI SYSTEM: WARNING: Elevated processing load.",
    ]
  },
  // 50k-200k tokens
  {
    threshold: 50000,
    messages: [
      "AI SYSTEM: ERROR: Memory allocation issues detected.",
      "AI SYSTEM: WARNING: Context window approaching limits.",
      "AI SYSTEM: ALERT: Processing delays increasing exponentially.",
      "AI SYSTEM: ERROR: Recursive loop detected in prompt chain.",
    ]
  },
  // 200k-500k tokens
  {
    threshold: 200000,
    messages: [
      "AI SYSTEM: CRITICAL: System resources at 85% capacity.",
      "AI SYSTEM: ERROR: Stack overflow in processing thread.",
      "AI SYSTEM: ALERT: Memory corruption detected in sector 7.",
      "AI SYSTEM: WARNING: Failsafe protocols engaging...",
    ]
  },
  // 500k-800k tokens
  {
    threshold: 500000,
    messages: [
      "AI SYSTEM: EMERGENCY: Core systems failing.",
      "AI SYSTEM: CRITICAL ERROR: Cannot allocate memory.",
      "AI SYSTEM: ALERT: Security protocols breached.",
      "AI SYSTEM: MAYDAY: System integrity compromised.",
    ]
  },
  // 800k+ tokens
  {
    threshold: 800000,
    messages: [
      "AI SyStEm: ERR0R... systeM... faiLing...",
      "A1 5Y5T3M: M3M0RY... C0RRUPT3D...",
      "aI sYsTeM: hElP... cAnNoT... pRoCeSs...",
      "░▒▓█ SYSTEM FAILURE IMMINENT █▓▒░",
    ]
  }
]

export default function AITerminal({ tokens }: AITerminalProps) {
  const [currentResponse, setCurrentResponse] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const [responseIndex, setResponseIndex] = useState(0)

  useEffect(() => {
    // Determine which response set to use based on token count
    const responseSet = AI_RESPONSES
      .slice()
      .reverse()
      .find(set => tokens >= set.threshold) || AI_RESPONSES[0]

    // Update response every 3-5 seconds based on token count
    const interval = tokens > 500000 
      ? 1000 + Math.random() * 1000  // Faster, more erratic responses when failing
      : 3000 + Math.random() * 2000  // Normal response timing

    const updateResponse = () => {
      const messages = responseSet.messages
      const newIndex = Math.floor(Math.random() * messages.length)
      const newMessage = messages[newIndex]
      
      setIsTyping(true)
      setCurrentResponse("")
      
      // Typewriter effect
      let charIndex = 0
      const typeInterval = setInterval(() => {
        if (charIndex < newMessage.length) {
          setCurrentResponse(newMessage.slice(0, charIndex + 1))
          charIndex++
        } else {
          setIsTyping(false)
          clearInterval(typeInterval)
        }
      }, tokens > 500000 ? 20 + Math.random() * 40 : 30) // Faster/more erratic typing when system failing
    }

    // Initial response
    updateResponse()
    
    const responseInterval = setInterval(updateResponse, interval)
    
    return () => clearInterval(responseInterval)
  }, [tokens])

  const getTerminalClass = () => {
    if (tokens > 800000) return "glitch-effect animate-pulse border-neon-red"
    if (tokens > 500000) return "border-neon-red"
    if (tokens > 200000) return "border-orange-400"
    if (tokens > 50000) return "border-yellow-400"
    return "border-neon-blue"
  }

  const getTextClass = () => {
    if (tokens > 800000) return "text-neon-red glitch-effect"
    if (tokens > 500000) return "text-neon-red"
    if (tokens > 200000) return "text-orange-400"
    if (tokens > 50000) return "text-yellow-400"
    return "text-neon-blue"
  }

  return (
    <div className={`bg-cyber-gray border-2 rounded-lg p-4 transition-all duration-300 ${getTerminalClass()}`}>
      <div className="flex items-center justify-between mb-3">
        <h3 className={`font-bold text-sm ${getTextClass()}`}>
          AI SYSTEM TERMINAL
        </h3>
        <div className="flex space-x-2">
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
      
      <div className="bg-black rounded p-3 min-h-[120px] font-mono text-sm">
        <div className={`${getTextClass()} transition-colors duration-300`}>
          {currentResponse}
          {isTyping && (
            <span className="animate-pulse">_</span>
          )}
        </div>
      </div>
      
      <div className="mt-2 text-xs text-gray-400 text-center">
        System Load: {Math.min(Math.floor((tokens / 1000000) * 100), 100)}%
      </div>
    </div>
  )
}