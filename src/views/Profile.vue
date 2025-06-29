<template>
  <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    <!-- Profile Header -->
    <div class="card mb-8">
      <div class="flex flex-col md:flex-row items-start md:items-center space-y-4 md:space-y-0 md:space-x-6">
        <div class="relative">
          <img
            :src="user?.avatar || 'https://images.pexels.com/photos/1212984/pexels-photo-1212984.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1'"
            :alt="user?.firstName"
            class="w-24 h-24 rounded-full object-cover border-4 border-white shadow-lg"
          />
          <button
            v-if="isOwnProfile"
            @click="showEditProfile = true"
            class="absolute bottom-0 right-0 w-8 h-8 bg-primary-600 text-white rounded-full flex items-center justify-center hover:bg-primary-700 transition-colors"
          >
            <Edit3 class="w-4 h-4" />
          </button>
        </div>

        <div class="flex-1">
          <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 class="text-3xl font-bold text-gray-900">
                {{ user?.firstName }} {{ user?.lastName }}
              </h1>
              <p class="text-gray-600 mt-1 flex items-center">
                <MapPin class="w-4 h-4 mr-1" />
                {{ user?.location || 'Localisation non renseignée' }}
              </p>
            </div>
            
            <div class="flex items-center space-x-4 mt-4 sm:mt-0">
              <div class="text-center">
                <div class="text-2xl font-bold text-primary-600">{{ user?.rating || 0 }}</div>
                <div class="text-sm text-gray-500">Note</div>
              </div>
              <div class="text-center">
                <div class="text-2xl font-bold text-secondary-600">{{ user?.reviewCount || 0 }}</div>
                <div class="text-sm text-gray-500">Avis</div>
              </div>
              <div class="text-center">
                <div class="text-2xl font-bold text-accent-600">{{ servicesCount }}</div>
                <div class="text-sm text-gray-500">Services</div>
              </div>
            </div>
          </div>

          <div class="mt-4 flex flex-wrap gap-2">
            <span
              v-for="skill in user?.skills"
              :key="skill"
              class="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-primary-100 text-primary-800"
            >
              {{ skill }}
            </span>
          </div>

          <p class="mt-4 text-gray-700">
            {{ user?.bio || 'Aucune bio renseignée' }}
          </p>

          <div class="mt-6 flex flex-wrap gap-3">
            <button
              v-if="!isOwnProfile"
              @click="startConversation"
              class="btn btn-primary"
            >
              <MessageCircle class="w-4 h-4 mr-2" />
              Contacter
            </button>
            <button
              v-if="!isOwnProfile"
              @click="viewCalendar"
              class="btn btn-outline"
            >
              <Calendar class="w-4 h-4 mr-2" />
              Voir disponibilités
            </button>
            <button
              v-if="isOwnProfile"
              @click="showEditProfile = true"
              class="btn btn-outline"
            >
              <Settings class="w-4 h-4 mr-2" />
              Modifier le profil
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Services Section -->
    <div class="card mb-8">
      <div class="flex items-center justify-between mb-6">
        <h2 class="text-2xl font-bold text-gray-900">
          Services proposés ({{ userServices.length }})
        </h2>
        <router-link
          v-if="isOwnProfile"
          to="/create-service"
          class="btn btn-primary"
        >
          <Plus class="w-4 h-4 mr-2" />
          Nouveau service
        </router-link>
      </div>

      <div v-if="userServices.length === 0" class="text-center py-12">
        <Briefcase class="w-16 h-16 text-gray-300 mx-auto mb-4" />
        <p class="text-gray-500 text-lg">
          {{ isOwnProfile ? 'Vous n\'avez pas encore créé de service' : 'Aucun service proposé' }}
        </p>
        <router-link
          v-if="isOwnProfile"
          to="/create-service"
          class="btn btn-primary mt-4"
        >
          Créer votre premier service
        </router-link>
      </div>

      <div v-else class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <ServiceCard
          v-for="service in userServices"
          :key="service.id"
          :service="service"
        />
      </div>
    </div>

    <!-- Reviews Section -->
    <div class="card">
      <div class="flex items-center justify-between mb-6">
        <h2 class="text-2xl font-bold text-gray-900">
          Avis reçus ({{ reviews.length }})
        </h2>
        <div class="flex items-center space-x-2">
          <Star class="w-5 h-5 text-yellow-400 fill-current" />
          <span class="text-lg font-semibold">{{ user?.rating || 0 }}</span>
          <span class="text-gray-500">sur 5</span>
        </div>
      </div>

      <div v-if="reviews.length === 0" class="text-center py-12">
        <Star class="w-16 h-16 text-gray-300 mx-auto mb-4" />
        <p class="text-gray-500 text-lg">Aucun avis pour le moment</p>
      </div>

      <div v-else class="space-y-6">
        <div
          v-for="review in reviews"
          :key="review.id"
          class="border border-gray-200 rounded-lg p-4"
        >
          <div class="flex items-start space-x-4">
            <img
              :src="review.userAvatar"
              :alt="review.userName"
              class="w-10 h-10 rounded-full object-cover"
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
                  </div>
                </div>
                <span class="text-sm text-gray-500">
                  {{ formatDate(review.createdAt) }}
                </span>
              </div>
              <p class="mt-2 text-gray-700">{{ review.comment }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Edit Profile Modal -->
    <EditProfileModal
      v-if="showEditProfile"
      :user="user"
      @close="showEditProfile = false"
      @save="handleSaveProfile"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import { useServicesStore } from '@/stores/services'
import { formatDate } from '@/utils/date'
import {
  Edit3,
  MapPin,
  MessageCircle,
  Calendar,
  Settings,
  Plus,
  Briefcase,
  Star
} from 'lucide-vue-next'
import ServiceCard from '@/components/services/ServiceCard.vue'
import EditProfileModal from '@/components/profile/EditProfileModal.vue'
import type { User } from '@/types/auth'
import type { Review } from '@/types/service'

const route = useRoute()
const router = useRouter()
const authStore = useAuthStore()
const servicesStore = useServicesStore()

const showEditProfile = ref(false)
const user = ref<User | null>(null)
const userServices = ref([])
const reviews = ref<Review[]>([])

const isOwnProfile = computed(() => {
  const profileId = route.params.id as string
  return !profileId || profileId === authStore.user?.id
})

const servicesCount = computed(() => userServices.value.length)

const startConversation = () => {
  router.push(`/messages?user=${user.value?.id}`)
}

const viewCalendar = () => {
  router.push(`/calendar?provider=${user.value?.id}`)
}

const handleSaveProfile = (updatedUser: Partial<User>) => {
  if (isOwnProfile.value) {
    authStore.updateProfile(updatedUser)
    user.value = { ...user.value, ...updatedUser } as User
  }
  showEditProfile.value = false
}

// Mock data for reviews
const mockReviews: Review[] = [
  {
    id: '1',
    serviceId: '1',
    userId: '2',
    userName: 'Alice Martin',
    userAvatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=1',
    rating: 5,
    comment: 'Excellente expérience ! Jean est un très bon professeur, patient et à l\'écoute. Je recommande vivement ses cours de Vue.js.',
    createdAt: new Date('2024-01-15')
  },
  {
    id: '2',
    serviceId: '1',
    userId: '3',
    userName: 'Thomas Dubois',
    userAvatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=1',
    rating: 4,
    comment: 'Très satisfait du cours. Les explications sont claires et les exemples pratiques très utiles.',
    createdAt: new Date('2024-01-10')
  }
]

onMounted(async () => {
  const profileId = route.params.id as string
  
  if (isOwnProfile.value) {
    user.value = authStore.user
  } else {
    // TODO: Fetch user profile by ID
    user.value = authStore.user // Mock for now
  }

  // Fetch user services
  await servicesStore.fetchServices()
  userServices.value = servicesStore.services.filter(
    service => service.provider.id === (user.value?.id || authStore.user?.id)
  )

  // Load reviews
  reviews.value = mockReviews
})
</script>