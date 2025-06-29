<template>
  <nav class="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between items-center h-16">
        <!-- Logo -->
        <div class="flex items-center">
          <router-link to="/" class="flex items-center space-x-2">
            <div class="w-8 h-8 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-lg flex items-center justify-center">
              <span class="text-white font-bold text-sm">SK</span>
            </div>
            <span class="text-xl font-bold text-gray-900">SkillShare</span>
          </router-link>
        </div>

        <!-- Search Bar - Desktop -->
        <div class="hidden md:flex flex-1 max-w-lg mx-8">
          <div class="relative w-full">
            <Search class="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Rechercher des compétences..."
              class="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              @keyup.enter="handleSearch"
              v-model="searchQuery"
            />
          </div>
        </div>

        <!-- Navigation Links -->
        <div class="hidden md:flex items-center space-x-4">
          <router-link
            to="/search"
            class="text-gray-600 hover:text-primary-600 px-3 py-2 rounded-md text-sm font-medium transition-colors"
          >
            Explorer
          </router-link>
          
          <template v-if="authStore.isAuthenticated">
            <router-link
              to="/create-service"
              class="btn btn-outline text-sm"
            >
              Proposer un service
            </router-link>
            
            <!-- User Menu -->
            <div class="relative" ref="userMenuRef">
              <button
                @click="showUserMenu = !showUserMenu"
                class="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <img
                  :src="authStore.user?.avatar"
                  :alt="authStore.user?.firstName"
                  class="w-8 h-8 rounded-full object-cover"
                />
                <ChevronDown class="w-4 h-4 text-gray-500" />
              </button>
              
              <Transition name="fade">
                <div
                  v-if="showUserMenu"
                  class="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-10"
                >
                  <router-link
                    to="/profile"
                    class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                    @click="showUserMenu = false"
                  >
                    <User class="inline w-4 h-4 mr-2" />
                    Mon profil
                  </router-link>
                  <router-link
                    to="/dashboard"
                    class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                    @click="showUserMenu = false"
                  >
                    <BarChart3 class="inline w-4 h-4 mr-2" />
                    Tableau de bord
                  </router-link>
                  <router-link
                    to="/messages"
                    class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                    @click="showUserMenu = false"
                  >
                    <MessageCircle class="inline w-4 h-4 mr-2" />
                    Messages
                  </router-link>
                  <router-link
                    to="/calendar"
                    class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                    @click="showUserMenu = false"
                  >
                    <Calendar class="inline w-4 h-4 mr-2" />
                    Calendrier
                  </router-link>
                  <div class="border-t border-gray-100 my-2"></div>
                  <button
                    @click="handleLogout"
                    class="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                  >
                    <LogOut class="inline w-4 h-4 mr-2" />
                    Déconnexion
                  </button>
                </div>
              </Transition>
            </div>
          </template>
          
          <template v-else>
            <router-link
              to="/login"
              class="text-gray-600 hover:text-primary-600 px-3 py-2 rounded-md text-sm font-medium transition-colors"
            >
              Connexion
            </router-link>
            <router-link
              to="/register"
              class="btn btn-primary text-sm"
            >
              S'inscrire
            </router-link>
          </template>
        </div>

        <!-- Mobile menu button -->
        <div class="md:hidden flex items-center">
          <button
            @click="showMobileMenu = !showMobileMenu"
            class="p-2 rounded-md text-gray-600 hover:text-primary-600 hover:bg-gray-50"
          >
            <Menu v-if="!showMobileMenu" class="w-6 h-6" />
            <X v-else class="w-6 h-6" />
          </button>
        </div>
      </div>
    </div>

    <!-- Mobile Menu -->
    <Transition name="slide">
      <div v-if="showMobileMenu" class="md:hidden bg-white border-t border-gray-200">
        <div class="px-4 py-3 space-y-3">
          <!-- Mobile Search -->
          <div class="relative">
            <Search class="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Rechercher..."
              class="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg"
              v-model="searchQuery"
            />
          </div>
          
          <router-link
            to="/search"
            class="block text-gray-600 hover:text-primary-600 py-2"
            @click="showMobileMenu = false"
          >
            Explorer
          </router-link>
          
          <template v-if="authStore.isAuthenticated">
            <router-link
              to="/dashboard"
              class="block text-gray-600 hover:text-primary-600 py-2"
              @click="showMobileMenu = false"
            >
              Tableau de bord
            </router-link>
            <router-link
              to="/messages"
              class="block text-gray-600 hover:text-primary-600 py-2"
              @click="showMobileMenu = false"
            >
              Messages
            </router-link>
            <router-link
              to="/create-service"
              class="block btn btn-outline w-full text-center mt-3"
              @click="showMobileMenu = false"
            >
              Proposer un service
            </router-link>
            <button
              @click="handleLogout"
              class="block w-full text-left text-red-600 py-2 mt-2"
            >
              Déconnexion
            </button>
          </template>
          
          <template v-else>
            <router-link
              to="/login"
              class="block text-gray-600 hover:text-primary-600 py-2"
              @click="showMobileMenu = false"
            >
              Connexion
            </router-link>
            <router-link
              to="/register"
              class="block btn btn-primary w-full text-center mt-3"
              @click="showMobileMenu = false"
            >
              S'inscrire
            </router-link>
          </template>
        </div>
      </div>
    </Transition>
  </nav>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import { 
  Search, 
  Menu, 
  X, 
  ChevronDown, 
  User, 
  BarChart3, 
  MessageCircle, 
  Calendar,
  LogOut 
} from 'lucide-vue-next'

const router = useRouter()
const authStore = useAuthStore()

const searchQuery = ref('')
const showUserMenu = ref(false)
const showMobileMenu = ref(false)
const userMenuRef = ref<HTMLElement>()

const handleSearch = () => {
  if (searchQuery.value.trim()) {
    router.push(`/search?q=${encodeURIComponent(searchQuery.value)}`)
  }
}

const handleLogout = () => {
  authStore.logout()
  showUserMenu.value = false
  showMobileMenu.value = false
  router.push('/')
}

const handleClickOutside = (event: Event) => {
  if (userMenuRef.value && !userMenuRef.value.contains(event.target as Node)) {
    showUserMenu.value = false
  }
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
})
</script>