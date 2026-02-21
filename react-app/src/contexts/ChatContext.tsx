import { createContext, useCallback, useContext, useMemo, useState } from 'react'
import type { ReactNode } from 'react'

interface ChatMessage {
  id: string
  role: 'user' | 'assistant'
  content: string
  timestamp: Date
}

interface ChatContextValue {
  isOpen: boolean
  toggleChat: () => void
  messages: ChatMessage[]
}

const ChatContext = createContext<ChatContextValue | null>(null)

export function ChatProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false)
  const [messages] = useState<ChatMessage[]>([])

  const toggleChat = useCallback(() => {
    setIsOpen((prev) => !prev)
  }, [])

  const value = useMemo<ChatContextValue>(
    () => ({ isOpen, toggleChat, messages }),
    [isOpen, toggleChat, messages],
  )

  return <ChatContext.Provider value={value}>{children}</ChatContext.Provider>
}

export function useChat(): ChatContextValue {
  const context = useContext(ChatContext)
  if (!context) {
    throw new Error('useChat must be used within a ChatProvider')
  }
  return context
}
