<template>
  <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    <div class="mb-8">
      <h1 class="text-3xl font-bold text-gray-900">Mes avis</h1>
      <p class="text-gray-600 mt-2">
        Gérez les avis que vous avez reçus et donnés
      </p>
    </div>

    <!-- Stats -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      <div class="card text-center">
        <div class="text-3xl font-bold text-primary-600 mb-2">4.8</div>
        <div class="text-gray-600">Note moyenne</div>
        <div class="flex justify-center mt-2">
          <Star v-for="i in 5" :key="i" class="w-4 h-4 text-yellow-400 fill-current" />
        </div>
      </div>
      
      <div class="card text-center">
        <div class="text-3xl font-bold text-secondary-600 mb-2">23</div>
        <div class="text-gray-600">Avis reçus</div>
      </div>
      
      <div class="card text-center">
        <div class="text-3xl font-bold text-accent-600 mb-2">15</div>
        <div class="text-gray-600">Avis donnés</div>
      </div>
    </div>

    <!-- Tabs -->
    <div class="card">
      <div class="border-b border-gray-200 mb-6">
        <nav class="-mb-px flex space-x-8">
          <button
            @click="activeTab = 'received'"
            class="py-2 px-1 border-b-2 font-medium text-sm"
            :class="activeTab === 'received' 
              ? 'border-primary-500 text-primary-600' 
              : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'"
          >
            Avis reçus ({{ receivedReviews.length }})
          </button>
          <button
            @click="activeTab = 'given'"
            class="py-2 px-1 border-b-2 font-medium text-sm"
            :class="activeTab === 'given' 
              ? 'border-primary-500 text-primary-600' 
              : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'"
          >
            Avis donnés ({{ givenReviews.length }})
          </button>
        </nav>
      </div>

      <!-- Received Reviews -->
      <div v-if="activeTab === 'received'" class="space-y-6">
        <div
          v-for="review in receivedReviews"
          :key="review.id"
          class="border border-gray-200 rounded-lg p-6"
        >
          <div class="flex items-start space-x-4">
            <img
              :src="review.userAvatar"
              :alt="review.userName"
              class="w-12 h-12 rounded-full object-cover"
            />
            <div class="flex-1">
              <div class="flex items-center justify-between">
                <div>
                  <h4 class="font-semibold text-gray-900">{{ review.userName }}</h4>
                  <div class="flex items-center space-x-1 mt-1">
                    <Star
                      v-for="i in 5"
                      :key="i"
                      class="w-4 h-4"
                      :class="i <= review.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'"
                    />
                    <span class="ml-2 text-sm text-gray-500">{{ review.rating }}/5</span>
                  </div>
                </div>
                <span class="text-sm text-gray-500">
                  {{ formatDate(review.createdAt) }}
                </span>
              </div>
              <p class="mt-3 text-gray-700">{{ review.comment }}</p>
              <div class="mt-3 text-sm text-gray-500">
                Service: {{ review.serviceName }}
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Given Reviews -->
      <div v-if="activeTab === 'given'" class="space-y-6">
        <div
          v-for="review in givenReviews"
          :key="review.id"
          class="border border-gray-200 rounded-lg p-6"
        >
          <div class="flex items-start space-x-4">
            <img
              :src="review.providerAvatar"
              :alt="review.providerName"
              class="w-12 h-12 rounded-full object-cover"
            />
            <div class="flex-1">
              <div class="flex items-center justify-between">
                <div>
                  <h4 class="font-semibold text-gray-900">{{ review.providerName }}</h4>
                  <div class="flex items-center space-x-1 mt-1">
                    <Star
                      v-for="i in 5"
                      :key="i"
                      class="w-4 h-4"
                      :class="i <= review.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'"
                    />
                    <span class="ml-2 text-sm text-gray-500">{{ review.rating }}/5</span>
                  </div>
                </div>
                <span class="text-sm text-gray-500">
                  {{ formatDate(review.createdAt) }}
                </span>
              </div>
              <p class="mt-3 text-gray-700">{{ review.comment }}</p>
              <div class="mt-3 text-sm text-gray-500">
                Service: {{ review.serviceName }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { formatDate } from '@/utils/date'
import { Star } from 'lucide-vue-next'

const activeTab = ref('received')

const receivedReviews = ref([
  {
    id: '1',
    userName: 'Alice Martin',
    userAvatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=1',
    rating: 5,
    comment: 'Excellente expérience ! Jean est un très bon professeur, patient et à l\'écoute. Je recommande vivement ses cours de Vue.js.',
    serviceName: 'Cours de développement Vue.js',
    createdAt: new Date('2024-01-15')
  },
  {
    id: '2',
    userName: 'Thomas Dubois',
    userAvatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=1',
    rating: 4,
    comment: 'Très satisfait du cours. Les explications sont claires et les exemples pratiques très utiles.',
    serviceName: 'Cours de développement Vue.js',
    createdAt: new Date('2024-01-10')
  }
])

const givenReviews = ref([
  {
    id: '1',
    providerName: 'Marie Dupont',
    providerAvatar: 'https://images.pexels.com/photos/1130626/pexels-photo-1130626.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=1',
    rating: 5,
    comment: 'Cours de design exceptionnel ! Marie maîtrise parfaitement son sujet et sait transmettre ses connaissances.',
    serviceName: 'Design graphique et UI/UX',
    createdAt: new Date('2024-01-12')
  }
])
</script>