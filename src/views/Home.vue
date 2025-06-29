<template>
  <div class="min-h-screen">
    <!-- Hero Section -->
    <section class="relative bg-gradient-to-br from-primary-600 via-primary-700 to-secondary-600 text-white">
      <div class="absolute inset-0 bg-black/20"></div>
      <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div class="text-center">
          <h1 class="text-5xl md:text-6xl font-bold mb-6 leading-tight">
            Échangez vos <span class="text-secondary-300">compétences</span>
            <br>et grandissez ensemble
          </h1>
          <p class="text-xl md:text-2xl mb-8 max-w-2xl mx-auto text-primary-100">
            La plateforme qui connecte les passionnés pour apprendre, enseigner et créer des liens durables
          </p>
          
          <!-- Search Bar -->
          <div class="max-w-2xl mx-auto mb-8">
            <div class="relative">
              <Search class="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                v-model="searchQuery"
                type="text"
                placeholder="Que souhaitez-vous apprendre ? (ex: guitare, programmation, cuisine...)"
                class="w-full pl-12 pr-32 py-4 rounded-xl text-gray-900 text-lg focus:ring-4 focus:ring-white/30 focus:outline-none"
                @keyup.enter="handleSearch"
              />
              <button
                @click="handleSearch"
                class="absolute right-2 top-1/2 transform -translate-y-1/2 btn btn-primary px-6 py-2"
              >
                Rechercher
              </button>
            </div>
          </div>

          <div class="flex flex-col sm:flex-row gap-4 justify-center">
            <router-link to="/register" class="btn bg-white text-primary-600 hover:bg-gray-50 px-8 py-3 text-lg">
              Commencer gratuitement
            </router-link>
            <router-link to="/search" class="btn border-2 border-white text-white hover:bg-white hover:text-primary-600 px-8 py-3 text-lg">
              Explorer les services
            </router-link>
          </div>
        </div>
      </div>
    </section>

    <!-- Stats Section -->
    <section class="py-16 bg-white">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div>
            <div class="text-4xl font-bold text-primary-600 mb-2">2,500+</div>
            <div class="text-gray-600">Utilisateurs actifs</div>
          </div>
          <div>
            <div class="text-4xl font-bold text-secondary-600 mb-2">450+</div>
            <div class="text-gray-600">Compétences échangées</div>
          </div>
          <div>
            <div class="text-4xl font-bold text-accent-600 mb-2">98%</div>
            <div class="text-gray-600">Satisfaction utilisateur</div>
          </div>
          <div>
            <div class="text-4xl font-bold text-success-600 mb-2">15k+</div>
            <div class="text-gray-600">Sessions réalisées</div>
          </div>
        </div>
      </div>
    </section>

    <!-- Categories Section -->
    <section class="py-20 bg-gray-50">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-16">
          <h2 class="text-4xl font-bold text-gray-900 mb-4">
            Explorez par catégorie
          </h2>
          <p class="text-xl text-gray-600 max-w-2xl mx-auto">
            Des milliers de compétences dans tous les domaines vous attendent
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div
            v-for="category in categories"
            :key="category.name"
            @click="searchByCategory(category.name)"
            class="card-hover cursor-pointer group"
          >
            <div class="flex items-center space-x-4 mb-4">
              <div :class="category.iconBg" class="w-12 h-12 rounded-lg flex items-center justify-center">
                <component :is="category.icon" class="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 class="text-xl font-semibold text-gray-900 group-hover:text-primary-600 transition-colors">
                  {{ category.name }}
                </h3>
                <p class="text-gray-500">{{ category.count }} services</p>
              </div>
            </div>
            <p class="text-gray-600">{{ category.description }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Featured Services -->
    <section class="py-20 bg-white">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-16">
          <h2 class="text-4xl font-bold text-gray-900 mb-4">
            Services populaires
          </h2>
          <p class="text-xl text-gray-600">
            Découvrez les services les mieux notés de la communauté
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <ServiceCard
            v-for="service in featuredServices"
            :key="service.id"
            :service="service"
            class="animate-fade-in"
          />
        </div>

        <div class="text-center mt-12">
          <router-link to="/search" class="btn btn-primary px-8 py-3 text-lg">
            Voir tous les services
          </router-link>
        </div>
      </div>
    </section>

    <!-- How it works -->
    <section class="py-20 bg-gradient-to-r from-primary-50 to-secondary-50">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-16">
          <h2 class="text-4xl font-bold text-gray-900 mb-4">
            Comment ça marche ?
          </h2>
          <p class="text-xl text-gray-600">
            Échanger des compétences n'a jamais été aussi simple
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div class="text-center">
            <div class="w-16 h-16 bg-primary-600 rounded-full flex items-center justify-center mx-auto mb-6">
              <UserPlus class="w-8 h-8 text-white" />
            </div>
            <h3 class="text-2xl font-semibold text-gray-900 mb-4">1. Créez votre profil</h3>
            <p class="text-gray-600">
              Présentez vos compétences et ce que vous souhaitez apprendre
            </p>
          </div>

          <div class="text-center">
            <div class="w-16 h-16 bg-secondary-600 rounded-full flex items-center justify-center mx-auto mb-6">
              <Search class="w-8 h-8 text-white" />
            </div>
            <h3 class="text-2xl font-semibold text-gray-900 mb-4">2. Trouvez le match parfait</h3>
            <p class="text-gray-600">
              Utilisez notre système de recherche intelligent pour trouver votre partenaire d'échange
            </p>
          </div>

          <div class="text-center">
            <div class="w-16 h-16 bg-accent-600 rounded-full flex items-center justify-center mx-auto mb-6">
              <Calendar class="w-8 h-8 text-white" />
            </div>
            <h3 class="text-2xl font-semibold text-gray-900 mb-4">3. Planifiez et échangez</h3>
            <p class="text-gray-600">
              Organisez vos sessions et commencez à apprendre ensemble
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="py-20 bg-gray-900 text-white">
      <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 class="text-4xl font-bold mb-6">
          Prêt à commencer votre aventure d'apprentissage ?
        </h2>
        <p class="text-xl text-gray-300 mb-8">
          Rejoignez des milliers d'utilisateurs qui échangent déjà leurs compétences
        </p>
        <div class="flex flex-col sm:flex-row gap-4 justify-center">
          <router-link to="/register" class="btn bg-primary-600 hover:bg-primary-700 px-8 py-3 text-lg">
            S'inscrire gratuitement
          </router-link>
          <router-link to="/search" class="btn border-2 border-white text-white hover:bg-white hover:text-gray-900 px-8 py-3 text-lg">
            Explorer sans compte
          </router-link>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useServicesStore } from '@/stores/services'
import { Search, UserPlus, Calendar, Code, Palette, Languages, Music, Camera, Briefcase } from 'lucide-vue-next'
import ServiceCard from '@/components/services/ServiceCard.vue'

const router = useRouter()
const servicesStore = useServicesStore()

const searchQuery = ref('')
const featuredServices = ref([])

const categories = [
  {
    name: 'Programmation',
    count: 124,
    description: 'Développement web, mobile, IA, DevOps...',
    icon: Code,
    iconBg: 'bg-primary-600'
  },
  {
    name: 'Design',
    count: 89,
    description: 'UI/UX, graphisme, illustration, photo...',
    icon: Palette,
    iconBg: 'bg-secondary-600'
  },
  {
    name: 'Langues',
    count: 156,
    description: 'Anglais, espagnol, français, chinois...',
    icon: Languages,
    iconBg: 'bg-accent-600'
  },
  {
    name: 'Musique',
    count: 67,
    description: 'Piano, guitare, chant, production...',
    icon: Music,
    iconBg: 'bg-success-600'
  },
  {
    name: 'Photographie',
    count: 43,
    description: 'Portrait, paysage, retouche, studio...',
    icon: Camera,
    iconBg: 'bg-warning-600'
  },
  {
    name: 'Business',
    count: 78,
    description: 'Marketing, finance, management...',
    icon: Briefcase,
    iconBg: 'bg-error-600'
  }
]

const handleSearch = () => {
  if (searchQuery.value.trim()) {
    router.push(`/search?q=${encodeURIComponent(searchQuery.value)}`)
  } else {
    router.push('/search')
  }
}

const searchByCategory = (category: string) => {
  router.push(`/search?category=${encodeURIComponent(category)}`)
}

onMounted(async () => {
  await servicesStore.fetchServices()
  featuredServices.value = servicesStore.services.slice(0, 6)
})
</script>