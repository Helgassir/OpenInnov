<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    <div v-if="!service" class="flex justify-center py-12">
      <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
    </div>

    <div v-else class="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <!-- Main Content -->
      <div class="lg:col-span-2 space-y-8">
        <!-- Service Images -->
        <div class="card">
          <img
            :src="service.images[0]"
            :alt="service.title"
            class="w-full h-64 object-cover rounded-lg"
          />
        </div>

        <!-- Service Info -->
        <div class="card">
          <div class="flex items-start justify-between mb-6">
            <div>
              <h1 class="text-3xl font-bold text-gray-900 mb-2">
                {{ service.title }}
              </h1>
              <div class="flex items-center space-x-4 text-sm text-gray-500">
                <span class="flex items-center">
                  <MapPin class="w-4 h-4 mr-1" />
                  {{ service.location }}
                </span>
                <span class="flex items-center">
                  <Clock class="w-4 h-4 mr-1" />
                  {{ service.duration }} min
                </span>
                <span v-if="service.isOnline" class="flex items-center">
                  <Monitor class="w-4 h-4 mr-1" />
                  En ligne
                </span>
              </div>
            </div>
            <div class="text-right">
              <div class="text-3xl font-bold text-primary-600">
                {{ service.price }}€
              </div>
              <div class="text-sm text-gray-500">par heure</div>
            </div>
          </div>

          <div class="flex items-center space-x-4 mb-6">
            <div class="flex items-center space-x-1">
              <Star class="w-5 h-5 text-yellow-400 fill-current" />
              <span class="font-semibold">{{ service.rating }}</span>
              <span class="text-gray-500">({{ service.reviewCount }} avis)</span>
            </div>
            <span class="px-3 py-1 bg-primary-100 text-primary-800 rounded-full text-sm font-medium">
              {{ service.category }}
            </span>
          </div>

          <div class="prose max-w-none">
            <h3 class="text-lg font-semibold text-gray-900 mb-3">Description</h3>
            <p class="text-gray-700 leading-relaxed">
              {{ service.description }}
            </p>
          </div>

          <div class="mt-6">
            <h3 class="text-lg font-semibold text-gray-900 mb-3">Compétences enseignées</h3>
            <div class="flex flex-wrap gap-2">
              <span
                v-for="tag in service.tags"
                :key="tag"
                class="px-3 py-1 bg-gray-100 text-gray-800 rounded-full text-sm"
              >
                {{ tag }}
              </span>
            </div>
          </div>
        </div>

        <!-- Provider Info -->
        <div class="card">
          <h3 class="text-lg font-semibold text-gray-900 mb-4">À propos du formateur</h3>
          <div class="flex items-start space-x-4">
            <img
              :src="service.provider.avatar"
              :alt="service.provider.name"
              class="w-16 h-16 rounded-full object-cover"
            />
            <div class="flex-1">
              <h4 class="font-semibold text-gray-900">{{ service.provider.name }}</h4>
              <div class="flex items-center space-x-1 mt-1">
                <Star class="w-4 h-4 text-yellow-400 fill-current" />
                <span class="text-sm font-medium">{{ service.provider.rating }}</span>
                <span class="text-sm text-gray-500">({{ service.provider.reviewCount }} avis)</span>
              </div>
              <div class="flex space-x-3 mt-4">
                <button
                  @click="contactProvider"
                  class="btn btn-outline btn-sm"
                >
                  <MessageCircle class="w-4 h-4 mr-2" />
                  Contacter
                </button>
                <router-link
                  :to="`/profile/${service.provider.id}`"
                  class="btn btn-outline btn-sm"
                >
                  <User class="w-4 h-4 mr-2" />
                  Voir le profil
                </router-link>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Booking Sidebar -->
      <div class="space-y-6">
        <div class="card sticky top-8">
          <h3 class="text-lg font-semibold text-gray-900 mb-4">Réserver une session</h3>
          
          <div class="space-y-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">
                Date souhaitée
              </label>
              <input
                v-model="bookingForm.date"
                type="date"
                class="input"
                :min="new Date().toISOString().split('T')[0]"
              />
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">
                Heure
              </label>
              <select v-model="bookingForm.time" class="input">
                <option value="">Sélectionnez une heure</option>
                <option value="09:00">09:00</option>
                <option value="10:00">10:00</option>
                <option value="11:00">11:00</option>
                <option value="14:00">14:00</option>
                <option value="15:00">15:00</option>
                <option value="16:00">16:00</option>
                <option value="17:00">17:00</option>
              </select>
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">
                Message (optionnel)
              </label>
              <textarea
                v-model="bookingForm.message"
                rows="3"
                class="input resize-none"
                placeholder="Décrivez vos objectifs, votre niveau..."
              ></textarea>
            </div>

            <div class="border-t pt-4">
              <div class="flex justify-between items-center mb-2">
                <span class="text-gray-600">Prix</span>
                <span class="font-semibold">{{ service.price }}€</span>
              </div>
              <div class="flex justify-between items-center mb-4">
                <span class="text-gray-600">Durée</span>
                <span class="font-semibold">{{ service.duration }} min</span>
              </div>
              <div class="flex justify-between items-center text-lg font-bold border-t pt-2">
                <span>Total</span>
                <span class="text-primary-600">{{ service.price }}€</span>
              </div>
            </div>

            <button
              @click="handleBooking"
              class="w-full btn btn-primary"
              :disabled="!bookingForm.date || !bookingForm.time"
            >
              Réserver maintenant
            </button>
          </div>
        </div>

        <!-- Availability -->
        <div class="card">
          <h3 class="text-lg font-semibold text-gray-900 mb-4">Disponibilités</h3>
          <div class="space-y-2">
            <div
              v-for="day in service.availability"
              :key="day"
              class="flex items-center space-x-2"
            >
              <div class="w-2 h-2 bg-success-500 rounded-full"></div>
              <span class="text-sm text-gray-700">{{ getDayName(day) }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useServicesStore } from '@/stores/services'
import { useToast } from 'vue-toastification'
import {
  MapPin,
  Clock,
  Monitor,
  Star,
  MessageCircle,
  User
} from 'lucide-vue-next'

const route = useRoute()
const router = useRouter()
const servicesStore = useServicesStore()
const toast = useToast()

const service = ref(null)

const bookingForm = reactive({
  date: '',
  time: '',
  message: ''
})

const getDayName = (day: string) => {
  const days = {
    'Mon': 'Lundi',
    'Tue': 'Mardi', 
    'Wed': 'Mercredi',
    'Thu': 'Jeudi',
    'Fri': 'Vendredi',
    'Sat': 'Samedi',
    'Sun': 'Dimanche'
  }
  return days[day] || day
}

const contactProvider = () => {
  router.push(`/messages?user=${service.value.provider.id}`)
}

const handleBooking = () => {
  if (!bookingForm.date || !bookingForm.time) {
    toast.error('Veuillez sélectionner une date et une heure')
    return
  }

  toast.success('Demande de réservation envoyée !')
  // Here you would typically send the booking request to the API
}

onMounted(() => {
  const serviceId = route.params.id as string
  service.value = servicesStore.getServiceById(serviceId)
  
  if (!service.value) {
    router.push('/search')
  }
})
</script>