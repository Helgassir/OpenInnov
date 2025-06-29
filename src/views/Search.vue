<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    <!-- Search Header -->
    <div class="mb-8">
      <h1 class="text-3xl font-bold text-gray-900 mb-4">
        Rechercher des services
      </h1>
      
      <!-- Search Bar -->
      <div class="relative max-w-2xl">
        <Search class="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
        <input
          v-model="searchQuery"
          type="text"
          placeholder="Rechercher des compétences, services..."
          class="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent text-lg"
          @input="performSearch"
        />
      </div>
    </div>

    <div class="flex flex-col lg:flex-row gap-8">
      <!-- Filters Sidebar -->
      <div class="lg:w-80 space-y-6">
        <div class="card">
          <h3 class="text-lg font-semibold text-gray-900 mb-4">Filtres</h3>
          
          <!-- Category Filter -->
          <div class="mb-6">
            <label class="block text-sm font-medium text-gray-700 mb-2">
              Catégorie
            </label>
            <select
              v-model="filters.category"
              @change="applyFilters"
              class="input"
            >
              <option value="">Toutes les catégories</option>
              <option value="Programmation">Programmation</option>
              <option value="Design">Design</option>
              <option value="Langues">Langues</option>
              <option value="Musique">Musique</option>
              <option value="Marketing">Marketing</option>
              <option value="Photographie">Photographie</option>
            </select>
          </div>

          <!-- Location Filter -->
          <div class="mb-6">
            <label class="block text-sm font-medium text-gray-700 mb-2">
              Localisation
            </label>
            <input
              v-model="filters.location"
              type="text"
              placeholder="Ville, pays..."
              class="input"
              @input="applyFilters"
            />
          </div>

          <!-- Price Range -->
          <div class="mb-6">
            <label class="block text-sm font-medium text-gray-700 mb-2">
              Prix (€/heure)
            </label>
            <div class="space-y-2">
              <input
                v-model="filters.priceRange[1]"
                type="range"
                min="0"
                max="200"
                class="w-full"
                @input="applyFilters"
              />
              <div class="flex justify-between text-sm text-gray-500">
                <span>0€</span>
                <span>{{ filters.priceRange[1] }}€</span>
              </div>
            </div>
          </div>

          <!-- Rating Filter -->
          <div class="mb-6">
            <label class="block text-sm font-medium text-gray-700 mb-2">
              Note minimum
            </label>
            <div class="flex items-center space-x-2">
              <button
                v-for="rating in [1, 2, 3, 4, 5]"
                :key="rating"
                @click="filters.rating = rating; applyFilters()"
                class="p-1"
              >
                <Star
                  class="w-5 h-5"
                  :class="rating <= filters.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'"
                />
              </button>
              <span class="text-sm text-gray-500 ml-2">{{ filters.rating || 0 }}/5</span>
            </div>
          </div>

          <!-- Online/Offline -->
          <div class="mb-6">
            <label class="block text-sm font-medium text-gray-700 mb-2">
              Type de service
            </label>
            <div class="space-y-2">
              <label class="flex items-center">
                <input
                  v-model="filters.isOnline"
                  type="radio"
                  :value="true"
                  name="serviceType"
                  class="text-primary-600 focus:ring-primary-500"
                  @change="applyFilters"
                />
                <span class="ml-2 text-sm text-gray-700">En ligne</span>
              </label>
              <label class="flex items-center">
                <input
                  v-model="filters.isOnline"
                  type="radio"
                  :value="false"
                  name="serviceType"
                  class="text-primary-600 focus:ring-primary-500"
                  @change="applyFilters"
                />
                <span class="ml-2 text-sm text-gray-700">En présentiel</span>
              </label>
              <label class="flex items-center">
                <input
                  v-model="filters.isOnline"
                  type="radio"
                  :value="null"
                  name="serviceType"
                  class="text-primary-600 focus:ring-primary-500"
                  @change="applyFilters"
                />
                <span class="ml-2 text-sm text-gray-700">Les deux</span>
              </label>
            </div>
          </div>

          <!-- Clear Filters -->
          <button
            @click="clearFilters"
            class="w-full btn btn-outline"
          >
            <RotateCcw class="w-4 h-4 mr-2" />
            Réinitialiser
          </button>
        </div>

        <!-- Quick Filters -->
        <div class="card">
          <h3 class="text-lg font-semibold text-gray-900 mb-4">Filtres rapides</h3>
          <div class="flex flex-wrap gap-2">
            <button
              v-for="tag in popularTags"
              :key="tag"
              @click="quickFilter(tag)"
              class="px-3 py-1 text-sm rounded-full border border-gray-300 hover:border-primary-500 hover:text-primary-600 transition-colors"
            >
              {{ tag }}
            </button>
          </div>
        </div>
      </div>

      <!-- Results Section -->
      <div class="flex-1">
        <!-- Sort Options -->
        <div class="flex items-center justify-between mb-6">
          <p class="text-gray-600">
            {{ filteredServices.length }} service{{ filteredServices.length > 1 ? 's' : '' }} trouvé{{ filteredServices.length > 1 ? 's' : '' }}
          </p>
          <select
            v-model="sortBy"
            @change="applySorting"
            class="input w-auto"
          >
            <option value="relevance">Pertinence</option>
            <option value="rating">Mieux notés</option>
            <option value="price_asc">Prix croissant</option>
            <option value="price_desc">Prix décroissant</option>
            <option value="newest">Plus récents</option>
          </select>
        </div>

        <!-- Loading State -->
        <div v-if="isLoading" class="flex justify-center py-12">
          <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
        </div>

        <!-- No Results -->
        <div v-else-if="filteredServices.length === 0" class="text-center py-12">
          <Search class="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 class="text-lg font-medium text-gray-900 mb-2">
            Aucun service trouvé
          </h3>
          <p class="text-gray-500 mb-4">
            Essayez de modifier vos critères de recherche
          </p>
          <button
            @click="clearFilters"
            class="btn btn-primary"
          >
            Voir tous les services
          </button>
        </div>

        <!-- Results Grid -->
        <div v-else class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <ServiceCard
            v-for="service in filteredServices"
            :key="service.id"
            :service="service"
            class="animate-fade-in"
          />
        </div>

        <!-- Pagination -->
        <div v-if="totalPages > 1" class="flex justify-center mt-12">
          <nav class="flex items-center space-x-2">
            <button
              @click="currentPage = Math.max(1, currentPage - 1)"
              :disabled="currentPage === 1"
              class="px-3 py-2 rounded-lg border border-gray-300 text-gray-500 hover:text-gray-700 disabled:opacity-50"
            >
              Précédent
            </button>
            
            <button
              v-for="page in visiblePages"
              :key="page"
              @click="currentPage = page"
              class="px-3 py-2 rounded-lg border text-sm"
              :class="page === currentPage 
                ? 'border-primary-500 bg-primary-50 text-primary-600' 
                : 'border-gray-300 text-gray-700 hover:text-gray-900'"
            >
              {{ page }}
            </button>
            
            <button
              @click="currentPage = Math.min(totalPages, currentPage + 1)"
              :disabled="currentPage === totalPages"
              class="px-3 py-2 rounded-lg border border-gray-300 text-gray-500 hover:text-gray-700 disabled:opacity-50"
            >
              Suivant
            </button>
          </nav>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useServicesStore } from '@/stores/services'
import { Search, Star, RotateCcw } from 'lucide-vue-next'
import ServiceCard from '@/components/services/ServiceCard.vue'

const route = useRoute()
const router = useRouter()
const servicesStore = useServicesStore()

const searchQuery = ref('')
const sortBy = ref('relevance')
const currentPage = ref(1)
const itemsPerPage = 12

const filters = ref({
  category: '',
  location: '',
  priceRange: [0, 200],
  rating: 0,
  isOnline: null as boolean | null
})

const popularTags = [
  'Vue.js', 'React', 'Python', 'Design UI/UX', 'Photoshop', 
  'Anglais', 'Marketing', 'SEO', 'Guitare', 'Piano'
]

const isLoading = computed(() => servicesStore.isLoading)

const filteredServices = computed(() => {
  let services = [...servicesStore.services]

  // Text search
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    services = services.filter(service =>
      service.title.toLowerCase().includes(query) ||
      service.description.toLowerCase().includes(query) ||
      service.tags.some(tag => tag.toLowerCase().includes(query))
    )
  }

  // Category filter
  if (filters.value.category) {
    services = services.filter(service => service.category === filters.value.category)
  }

  // Location filter
  if (filters.value.location) {
    services = services.filter(service =>
      service.location.toLowerCase().includes(filters.value.location.toLowerCase())
    )
  }

  // Price filter
  services = services.filter(service =>
    service.price >= filters.value.priceRange[0] && service.price <= filters.value.priceRange[1]
  )

  // Rating filter
  if (filters.value.rating > 0) {
    services = services.filter(service => service.rating >= filters.value.rating)
  }

  // Online/Offline filter
  if (filters.value.isOnline !== null) {
    services = services.filter(service => service.isOnline === filters.value.isOnline)
  }

  // Sorting
  switch (sortBy.value) {
    case 'rating':
      services.sort((a, b) => b.rating - a.rating)
      break
    case 'price_asc':
      services.sort((a, b) => a.price - b.price)
      break
    case 'price_desc':
      services.sort((a, b) => b.price - a.price)
      break
    case 'newest':
      services.sort((a, b) => new Date(b.createdAt || 0).getTime() - new Date(a.createdAt || 0).getTime())
      break
    default:
      // Keep original order for relevance
      break
  }

  // Pagination
  const start = (currentPage.value - 1) * itemsPerPage
  const end = start + itemsPerPage
  return services.slice(start, end)
})

const totalPages = computed(() => {
  const totalServices = servicesStore.services.length
  return Math.ceil(totalServices / itemsPerPage)
})

const visiblePages = computed(() => {
  const delta = 2
  const range = []
  const rangeWithDots = []

  for (let i = Math.max(2, currentPage.value - delta);
       i <= Math.min(totalPages.value - 1, currentPage.value + delta);
       i++) {
    range.push(i)
  }

  if (currentPage.value - delta > 2) {
    rangeWithDots.push(1, '...')
  } else {
    rangeWithDots.push(1)
  }

  rangeWithDots.push(...range)

  if (currentPage.value + delta < totalPages.value - 1) {
    rangeWithDots.push('...', totalPages.value)
  } else {
    rangeWithDots.push(totalPages.value)
  }

  return rangeWithDots.filter((item, index, array) => array.indexOf(item) === index)
})

const performSearch = () => {
  currentPage.value = 1
  updateURL()
}

const applyFilters = () => {
  currentPage.value = 1
  updateURL()
}

const applySorting = () => {
  currentPage.value = 1
  updateURL()
}

const clearFilters = () => {
  searchQuery.value = ''
  filters.value = {
    category: '',
    location: '',
    priceRange: [0, 200],
    rating: 0,
    isOnline: null
  }
  sortBy.value = 'relevance'
  currentPage.value = 1
  updateURL()
}

const quickFilter = (tag: string) => {
  searchQuery.value = tag
  performSearch()
}

const updateURL = () => {
  const query: any = {}
  
  if (searchQuery.value) query.q = searchQuery.value
  if (filters.value.category) query.category = filters.value.category
  if (filters.value.location) query.location = filters.value.location
  if (filters.value.rating > 0) query.rating = filters.value.rating.toString()
  if (filters.value.isOnline !== null) query.online = filters.value.isOnline.toString()
  if (sortBy.value !== 'relevance') query.sort = sortBy.value
  if (currentPage.value > 1) query.page = currentPage.value.toString()

  router.replace({ query })
}

const loadFromURL = () => {
  const query = route.query

  if (query.q) searchQuery.value = query.q as string
  if (query.category) filters.value.category = query.category as string
  if (query.location) filters.value.location = query.location as string
  if (query.rating) filters.value.rating = parseInt(query.rating as string)
  if (query.online) filters.value.isOnline = query.online === 'true'
  if (query.sort) sortBy.value = query.sort as string
  if (query.page) currentPage.value = parseInt(query.page as string)
}

watch(
  () => route.query,
  () => {
    loadFromURL()
  }
)

onMounted(async () => {
  await servicesStore.fetchServices()
  loadFromURL()
})
</script>