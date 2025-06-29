<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    <div class="bg-white rounded-xl shadow-sm border border-gray-200 h-[calc(100vh-200px)]">
      <div class="flex h-full">
        <!-- Conversations List -->
        <div class="w-1/3 border-r border-gray-200 flex flex-col">
          <div class="p-4 border-b border-gray-200">
            <div class="flex items-center justify-between mb-4">
              <h1 class="text-2xl font-bold text-gray-900">Messages</h1>
              <button class="btn btn-primary btn-sm">
                <Plus class="w-4 h-4 mr-2" />
                Nouveau
              </button>
            </div>
            <div class="relative">
              <Search class="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                v-model="searchQuery"
                type="text"
                placeholder="Rechercher une conversation..."
                class="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
            </div>
          </div>

          <div class="flex-1 overflow-y-auto">
            <div
              v-for="conversation in filteredConversations"
              :key="conversation.id"
              @click="selectConversation(conversation)"
              class="p-4 border-b border-gray-100 cursor-pointer hover:bg-gray-50 transition-colors"
              :class="{ 'bg-primary-50 border-primary-200': selectedConversation?.id === conversation.id }"
            >
              <div class="flex items-center space-x-3">
                <div class="relative">
                  <img
                    :src="conversation.participant.avatar"
                    :alt="conversation.participant.name"
                    class="w-12 h-12 rounded-full object-cover"
                  />
                  <div
                    v-if="conversation.participant.isOnline"
                    class="absolute bottom-0 right-0 w-3 h-3 bg-success-500 border-2 border-white rounded-full"
                  ></div>
                </div>
                <div class="flex-1 min-w-0">
                  <div class="flex items-center justify-between">
                    <h3 class="text-sm font-semibold text-gray-900 truncate">
                      {{ conversation.participant.name }}
                    </h3>
                    <span class="text-xs text-gray-500">
                      {{ formatTime(conversation.lastMessage?.timestamp) }}
                    </span>
                  </div>
                  <p class="text-sm text-gray-600 truncate mt-1">
                    {{ conversation.lastMessage?.content }}
                  </p>
                  <div class="flex items-center justify-between mt-1">
                    <div class="flex items-center space-x-1">
                      <MessageCircle class="w-3 h-3 text-gray-400" />
                      <span class="text-xs text-gray-400">
                        {{ conversation.messageCount }} messages
                      </span>
                    </div>
                    <span
                      v-if="conversation.unreadCount > 0"
                      class="inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white bg-primary-600 rounded-full"
                    >
                      {{ conversation.unreadCount }}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Chat Area -->
        <div class="flex-1 flex flex-col">
          <div v-if="!selectedConversation" class="flex-1 flex items-center justify-center">
            <div class="text-center">
              <MessageCircle class="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 class="text-lg font-medium text-gray-900 mb-2">
                Sélectionnez une conversation
              </h3>
              <p class="text-gray-500">
                Choisissez une conversation dans la liste pour commencer à discuter
              </p>
            </div>
          </div>

          <template v-else>
            <!-- Chat Header -->
            <div class="p-4 border-b border-gray-200 bg-gray-50">
              <div class="flex items-center justify-between">
                <div class="flex items-center space-x-3">
                  <div class="relative">
                    <img
                      :src="selectedConversation.participant.avatar"
                      :alt="selectedConversation.participant.name"
                      class="w-10 h-10 rounded-full object-cover"
                    />
                    <div
                      v-if="selectedConversation.participant.isOnline"
                      class="absolute bottom-0 right-0 w-3 h-3 bg-success-500 border-2 border-white rounded-full"
                    ></div>
                  </div>
                  <div>
                    <h3 class="font-semibold text-gray-900">
                      {{ selectedConversation.participant.name }}
                    </h3>
                    <p class="text-sm text-gray-500">
                      {{ selectedConversation.participant.isOnline ? 'En ligne' : `Vu ${formatTime(selectedConversation.participant.lastSeen)}` }}
                    </p>
                  </div>
                </div>
                <div class="flex items-center space-x-2">
                  <button class="btn btn-outline btn-sm">
                    <Phone class="w-4 h-4" />
                  </button>
                  <button class="btn btn-outline btn-sm">
                    <Video class="w-4 h-4" />
                  </button>
                  <button class="btn btn-outline btn-sm">
                    <MoreVertical class="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            <!-- Messages -->
            <div class="flex-1 overflow-y-auto p-4 space-y-4">
              <div
                v-for="message in messages"
                :key="message.id"
                class="flex"
                :class="message.isOwn ? 'justify-end' : 'justify-start'"
              >
                <div
                  class="max-w-xs lg:max-w-md px-4 py-2 rounded-lg"
                  :class="message.isOwn 
                    ? 'bg-primary-600 text-white' 
                    : 'bg-gray-200 text-gray-900'"
                >
                  <p>{{ message.content }}</p>
                  <p
                    class="text-xs mt-1"
                    :class="message.isOwn ? 'text-primary-200' : 'text-gray-500'"
                  >
                    {{ formatTime(message.timestamp) }}
                  </p>
                </div>
              </div>
            </div>

            <!-- Message Input -->
            <div class="p-4 border-t border-gray-200 bg-gray-50">
              <form @submit.prevent="sendMessage" class="flex items-end space-x-3">
                <div class="flex-1">
                  <textarea
                    v-model="newMessage"
                    rows="1"
                    placeholder="Tapez votre message..."
                    class="w-full resize-none border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    @keydown.enter.prevent="sendMessage"
                  ></textarea>
                </div>
                <div class="flex space-x-2">
                  <button
                    type="button"
                    class="btn btn-outline btn-sm"
                  >
                    <Paperclip class="w-4 h-4" />
                  </button>
                  <button
                    type="submit"
                    class="btn btn-primary btn-sm"
                    :disabled="!newMessage.trim()"
                  >
                    <Send class="w-4 h-4" />
                  </button>
                </div>
              </form>
            </div>
          </template>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import { formatTime } from '@/utils/date'
import {
  Search,
  Plus,
  MessageCircle,
  Phone,
  Video,
  MoreVertical,
  Paperclip,
  Send
} from 'lucide-vue-next'

const route = useRoute()
const authStore = useAuthStore()

const searchQuery = ref('')
const selectedConversation = ref(null)
const newMessage = ref('')
const conversations = ref([])
const messages = ref([])

const filteredConversations = computed(() => {
  if (!searchQuery.value) return conversations.value
  return conversations.value.filter(conv =>
    conv.participant.name.toLowerCase().includes(searchQuery.value.toLowerCase())
  )
})

const selectConversation = (conversation) => {
  selectedConversation.value = conversation
  loadMessages(conversation.id)
  // Mark as read
  conversation.unreadCount = 0
}

const loadMessages = (conversationId: string) => {
  // Mock messages
  messages.value = [
    {
      id: '1',
      content: 'Bonjour ! Je suis intéressé par votre cours de Vue.js',
      timestamp: new Date(Date.now() - 3600000),
      isOwn: false
    },
    {
      id: '2',
      content: 'Bonjour ! Avec plaisir, nous pouvons organiser une première session cette semaine',
      timestamp: new Date(Date.now() - 3000000),
      isOwn: true
    },
    {
      id: '3',
      content: 'Parfait ! Quelles sont vos disponibilités ?',
      timestamp: new Date(Date.now() - 1800000),
      isOwn: false
    },
    {
      id: '4',
      content: 'Je suis libre mardi et jeudi après-midi. Quel créneau vous convient le mieux ?',
      timestamp: new Date(Date.now() - 900000),
      isOwn: true
    }
  ]
}

const sendMessage = () => {
  if (!newMessage.value.trim()) return

  const message = {
    id: Date.now().toString(),
    content: newMessage.value,
    timestamp: new Date(),
    isOwn: true
  }

  messages.value.push(message)
  
  // Update last message in conversation
  if (selectedConversation.value) {
    selectedConversation.value.lastMessage = {
      content: newMessage.value,
      timestamp: new Date()
    }
  }

  newMessage.value = ''
}

onMounted(() => {
  // Mock conversations
  conversations.value = [
    {
      id: '1',
      participant: {
        id: '2',
        name: 'Alice Martin',
        avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=1',
        isOnline: true,
        lastSeen: new Date()
      },
      lastMessage: {
        content: 'Je suis libre mardi et jeudi après-midi. Quel créneau vous convient le mieux ?',
        timestamp: new Date(Date.now() - 900000)
      },
      unreadCount: 0,
      messageCount: 12
    },
    {
      id: '2',
      participant: {
        id: '3',
        name: 'Thomas Dubois',
        avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=1',
        isOnline: false,
        lastSeen: new Date(Date.now() - 7200000)
      },
      lastMessage: {
        content: 'Merci pour le cours, c\'était très enrichissant !',
        timestamp: new Date(Date.now() - 86400000)
      },
      unreadCount: 2,
      messageCount: 8
    },
    {
      id: '3',
      participant: {
        id: '4',
        name: 'Sophie Moreau',
        avatar: 'https://images.pexels.com/photos/1130626/pexels-photo-1130626.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=1',
        isOnline: true,
        lastSeen: new Date()
      },
      lastMessage: {
        content: 'À quelle heure peut-on se connecter demain ?',
        timestamp: new Date(Date.now() - 3600000)
      },
      unreadCount: 1,
      messageCount: 5
    }
  ]

  // Auto-select conversation if user parameter is provided
  const userId = route.query.user as string
  if (userId) {
    const conversation = conversations.value.find(c => c.participant.id === userId)
    if (conversation) {
      selectConversation(conversation)
    }
  }
})
</script>