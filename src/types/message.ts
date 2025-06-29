export interface Message {
  id: string
  conversationId: string
  senderId: string
  receiverId: string
  content: string
  type: 'text' | 'image' | 'file' | 'booking'
  timestamp: Date
  isRead: boolean
  attachments?: MessageAttachment[]
}

export interface MessageAttachment {
  id: string
  name: string
  url: string
  type: string
  size: number
}

export interface Conversation {
  id: string
  participants: ConversationParticipant[]
  lastMessage?: Message
  unreadCount: number
  createdAt: Date
  updatedAt: Date
}

export interface ConversationParticipant {
  id: string
  name: string
  avatar: string
  isOnline: boolean
  lastSeen?: Date
}