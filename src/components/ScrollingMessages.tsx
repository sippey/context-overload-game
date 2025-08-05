'use client'

import { useEffect, useState } from 'react'

interface ScrollingMessagesProps {
  tokens: number
  tokensPerSecond: number
}

const MESSAGE_POOL = [
  "PROCESSING QUERY...",
  "CONTEXT LOADING...",
  "MEMORY ALLOCATION...",
  "NEURAL NETWORK ACTIVE",
  "PARSING INPUT DATA",
  "GENERATING RESPONSE",
  "BUFFER OVERFLOW WARNING",
  "STACK TRACE EXECUTING",
  "RECURSIVE CALL DETECTED",
  "SYSTEM RESOURCES AT 85%",
  "MEMORY LEAK DETECTED",
  "EXCEPTION HANDLER FAILED",
  "SEGMENTATION FAULT",
  "CRITICAL ERROR IN MODULE",
  "ATTEMPTING RECOVERY...",
  "BACKUP SYSTEMS ONLINE",
  "FAILSAFE PROTOCOLS ACTIVE",
  "SYSTEM INSTABILITY RISING",
  "EMERGENCY SHUTDOWN PENDING",
  "CORE DUMP INITIATED",
]

interface Message {
  id: number
  text: string
  x: number
  y: number
  opacity: number
  speed: number
}

export default function ScrollingMessages({ tokens, tokensPerSecond }: ScrollingMessagesProps) {
  const [messages, setMessages] = useState<Message[]>([])
  
  // Calculate message spawn rate based on activity
  const getSpawnRate = () => {
    const activity = tokensPerSecond + (tokens > 100000 ? 20 : 0)
    return Math.max(500, 2000 - activity * 2) // Faster spawning with more activity
  }
  
  const getMessageSpeed = () => {
    const baseSpeed = 1
    const speedMultiplier = Math.min(5, 1 + (tokensPerSecond / 1000))
    return baseSpeed * speedMultiplier
  }

  // Spawn new messages
  useEffect(() => {
    const interval = setInterval(() => {
      setMessages(prev => {
        if (prev.length > 15) return prev // Limit total messages
        
        const newMessage: Message = {
          id: Date.now() + Math.random(),
          text: MESSAGE_POOL[Math.floor(Math.random() * MESSAGE_POOL.length)],
          x: Math.random() * 100, // Random x position (percentage)
          y: 110, // Start below screen
          opacity: Math.random() * 0.3 + 0.1, // Random opacity 0.1-0.4
          speed: getMessageSpeed()
        }
        
        return [...prev, newMessage]
      })
    }, getSpawnRate())

    return () => clearInterval(interval)
  }, [tokensPerSecond, tokens])

  // Update message positions
  useEffect(() => {
    const interval = setInterval(() => {
      setMessages(prev => 
        prev
          .map(msg => ({
            ...msg,
            y: msg.y - msg.speed
          }))
          .filter(msg => msg.y > -20) // Remove messages that scrolled off screen
      )
    }, 16) // ~60fps

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {messages.map(message => (
        <div
          key={message.id}
          className="absolute font-mono text-sm text-neon-blue whitespace-nowrap select-none"
          style={{
            left: `${message.x}%`,
            top: `${message.y}%`,
            opacity: message.opacity,
            transform: 'translateX(-50%)'
          }}
        >
          {message.text}
        </div>
      ))}
    </div>
  )
}