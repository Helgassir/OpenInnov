<template>
  <div class="card-hover group cursor-pointer" @click="goToService">
    <div class="relative mb-4">
      <img
        :src="service.images[0]"
        :alt="service.title"
        class="w-full h-48 object-cover rounded-lg"
      />
      <div class="absolute top-3 right-3">
        <span class="bg-white px-2 py-1 rounded-full text-sm font-medium text-gray-900">
          {{ service.price }}€/h
        </span>
      </div>
      <div class="absolute top-3 left-3">
        <span v-if="service.isOnline" class="bg-success-500 text-white px-2 py-1 rounded-full text-xs font-medium">
          En ligne
        </span>
      </div>
    </div>

    <div class="space-y-3">
      <div>
        <h3 class="text-lg font-semibold text-gray-900 group-hover:text-primary-600 transition-colors line-clamp-2">
          {{ service.title }}
        </h3>
        <p class="text-gray-600 text-sm mt-1 line-clamp-2">
          {{ service.description }}
        </p>
      </div>

      <div class="flex items-center space-x-3">
        <img
          :src="service.provider.avatar"
          :alt="service.provider.name"
          class="w-8 h-8 rounded-full object-cover"
        />
        <div class="flex-1 min-w-0">
          <p class="text-sm font-medium text-gray-900 truncate">
            {{ service.provider.name }}
          </p>
          <p class="text-sm text-gray-500">
            {{ service.location }}
          </p>
        </div>
      </div>

      <div class="flex items-center justify-between">
        <div class="flex items-center space-x-1">
          <Star class="w-4 h-4 text-yellow-400 fill-current" />
          <span class="text-sm font-medium text-gray-900">
            {{ service.rating }}
          </span>
          <span class="text-sm text-gray-500">
            ({{ service.reviewCount }})
          </span>
        </div>
        <div class="text-sm text-gray-500">
          {{ service.duration }}min
        </div>
      </div>

      <div class="flex flex-wrap gap-1">
        <span
          v-for="tag in service.tags.slice(0, 3)"
          :key="tag"
          class="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-primary-100 text-primary-800"
        >
          {{ tag }}
        </span>
        <span
          v-if="service.tags.length > 3"
          class="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-600"
        >
          +{{ service.tags.length - 3 }}
        </span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import { Star } from 'lucide-vue-next'
import type { Service } from '@/types/service'

interface Props {
  service: Service
}

const props = defineProps<Props>()
const router = useRouter()

const goToService = () => {
  router.push(`/service/${props.service.id}`)
}
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>