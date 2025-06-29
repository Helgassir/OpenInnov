<template>
  <div id="app" class="min-h-screen bg-gray-50">
    <AppNavbar />
    <main>
      <router-view />
    </main>
    <AppFooter />
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { useAuthStore } from '@/stores/auth'
import AppNavbar from '@/components/layout/AppNavbar.vue'
import AppFooter from '@/components/layout/AppFooter.vue'

const authStore = useAuthStore()

onMounted(() => {
  // Check if user is logged in on app start
  authStore.initializeAuth()
})
</script>