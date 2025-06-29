<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    <!-- Welcome Header -->
    <div class="mb-8">
      <h1 class="text-3xl font-bold text-gray-900">
        Bonjour {{ authStore.user?.firstName }} ! 👋
      </h1>
      <p class="text-gray-600 mt-2">
        Voici un aperçu de votre activité sur SkillShare
      </p>
    </div>

    <!-- Stats Cards -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      <div class="card">
        <div class="flex items-center">
          <div class="p-3 rounded-full bg-primary-100">
            <BookOpen class="w-6 h-6 text-primary-600" />
          </div>
          <div class="ml-4">
            <p class="text-sm font-medium text-gray-500">Sessions données</p>
            <p class="text-2xl font-bold text-gray-900">12</p>
          </div>
        </div>
      </div>

      <div class="card">
        <div class="flex items-center">
          <div class="p-3 rounded-full bg-secondary-100">
            <Users class="w-6 h-6 text-secondary-600" />
          </div>
          <div class="ml-4">
            <p class="text-sm font-medium text-gray-500">Sessions reçues</p>
            <p class="text-2xl font-bold text-gray-900">8</p>
          </div>
        </div>
      </div>

      <div class="card">
        <div class="flex items-center">
          <div class="p-3 rounded-full bg-accent-100">
            <Star class="w-6 h-6 text-accent-600" />
          </div>
          <div class="ml-4">
            <p class="text-sm font-medium text-gray-500">Note moyenne</p>
            <p class="text-2xl font-bold text-gray-900">4.8</p>
          </div>
        </div>
      </div>

      <div class="card">
        <div class="flex items-center">
          <div class="p-3 rounded-full bg-success-100">
            <TrendingUp class="w-6 h-6 text-success-600" />
          </div>
          <div class="ml-4">
            <p class="text-sm font-medium text-gray-500">Revenus</p>
            <p class="text-2xl font-bold text-gray-900">540€</p>
          </div>
        </div>
      </div>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <!-- Recent Activity -->
      <div class="lg:col-span-2">
        <div class="card">
          <h2 class="text-xl font-bold text-gray-900 mb-6">Activité récente</h2>
          <div class="space-y-4">
            <div class="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
              <div class="w-10 h-10 bg-primary-600 rounded-full flex items-center justify-center">
                <BookOpen class="w-5 h-5 text-white" />
              </div>
              <div class="flex-1">
                <p class="font-medium text-gray-900">Session Vue.js avec Alice</p>
                <p class="text-sm text-gray-500">Il y a 2 heures</p>
              </div>
              <span class="text-sm font-medium text-success-600">Terminée</span>
            </div>

            <div class="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
              <div class="w-10 h-10 bg-secondary-600 rounded-full flex items-center justify-center">
                <Users class="w-5 h-5 text-white" />
              </div>
              <div class="flex-1">
                <p class="font-medium text-gray-900">Cours d'espagnol avec Carlos</p>
                <p class="text-sm text-gray-500">Demain à 14h00</p>
              </div>
              <span class="text-sm font-medium text-primary-600">Programmée</span>
            </div>

            <div class="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
              <div class="w-10 h-10 bg-accent-600 rounded-full flex items-center justify-center">
                <MessageCircle class="w-5 h-5 text-white" />
              </div>
              <div class="flex-1">
                <p class="font-medium text-gray-900">Nouveau message de Marie</p>
                <p class="text-sm text-gray-500">Il y a 1 heure</p>
              </div>
              <span class="text-sm font-medium text-warning-600">Non lu</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Quick Actions -->
      <div class="space-y-6">
        <div class="card">
          <h3 class="text-lg font-semibold text-gray-900 mb-4">Actions rapides</h3>
          <div class="space-y-3">
            <router-link to="/create-service" class="w-full btn btn-primary justify-start">
              <Plus class="w-4 h-4 mr-2" />
              Nouveau service
            </router-link>
            <router-link to="/calendar" class="w-full btn btn-outline justify-start">
              <Calendar class="w-4 h-4 mr-2" />
              Voir le calendrier
            </router-link>
            <router-link to="/messages" class="w-full btn btn-outline justify-start">
              <MessageCircle class="w-4 h-4 mr-2" />
              Messages
            </router-link>
            <router-link to="/profile" class="w-full btn btn-outline justify-start">
              <Settings class="w-4 h-4 mr-2" />
              Modifier le profil
            </router-link>
          </div>
        </div>

        <!-- Upcoming Sessions -->
        <div class="card">
          <h3 class="text-lg font-semibold text-gray-900 mb-4">Prochaines sessions</h3>
          <div class="space-y-3">
            <div class="flex items-center space-x-3 p-3 border border-gray-200 rounded-lg">
              <div class="w-2 h-2 bg-primary-600 rounded-full"></div>
              <div class="flex-1">
                <p class="text-sm font-medium text-gray-900">Vue.js - Alice</p>
                <p class="text-xs text-gray-500">Aujourd'hui 16h00</p>
              </div>
            </div>
            <div class="flex items-center space-x-3 p-3 border border-gray-200 rounded-lg">
              <div class="w-2 h-2 bg-secondary-600 rounded-full"></div>
              <div class="flex-1">
                <p class="text-sm font-medium text-gray-900">Espagnol - Carlos</p>
                <p class="text-xs text-gray-500">Demain 14h00</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useAuthStore } from '@/stores/auth'
import {
  BookOpen,
  Users,
  Star,
  TrendingUp,
  Plus,
  Calendar,
  MessageCircle,
  Settings
} from 'lucide-vue-next'

const authStore = useAuthStore()
</script>