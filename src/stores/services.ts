import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { Service, ServiceFilter } from '@/types/service'

export const useServicesStore = defineStore('services', () => {
  const services = ref<Service[]>([])
  const isLoading = ref(false)
  const filters = ref<ServiceFilter>({
    category: '',
    location: '',
    priceRange: [0, 1000],
    rating: 0,
    availability: ''
  })

  const mockServices: Service[] = [
    {
      id: '1',
      title: 'Cours de développement Vue.js',
      description: 'Apprenez Vue.js de zéro avec un développeur expérimenté. Sessions personnalisées selon votre niveau.',
      category: 'Programmation',
      price: 45,
      duration: 60,
      location: 'Paris, France',
      isOnline: true,
      provider: {
        id: '1',
        name: 'Jean Dupont',
        avatar: 'https://images.pexels.com/photos/1212984/pexels-photo-1212984.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1',
        rating: 4.8,
        reviewCount: 23
      },
      images: ['https://images.pexels.com/photos/1181675/pexels-photo-1181675.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&dpr=1'],
      rating: 4.8,
      reviewCount: 15,
      tags: ['Vue.js', 'JavaScript', 'Frontend'],
      availability: ['Mon', 'Wed', 'Fri']
    },
    {
      id: '2',
      title: 'Design graphique et UI/UX',
      description: 'Formation complète en design graphique et expérience utilisateur. Outils Adobe et Figma inclus.',
      category: 'Design',
      price: 60,
      duration: 90,
      location: 'Lyon, France',
      isOnline: true,
      provider: {
        id: '2',
        name: 'Marie Martin',
        avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1',
        rating: 4.9,
        reviewCount: 31
      },
      images: ['https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&dpr=1'],
      rating: 4.9,
      reviewCount: 22,
      tags: ['Photoshop', 'Figma', 'UI/UX'],
      availability: ['Tue', 'Thu', 'Sat']
    },
    {
      id: '3',
      title: 'Cours d\'espagnol conversationnel',
      description: 'Perfectionnez votre espagnol avec un natif. Focus sur la conversation et la prononciation.',
      category: 'Langues',
      price: 35,
      duration: 45,
      location: 'Barcelona, Spain',
      isOnline: true,
      provider: {
        id: '3',
        name: 'Carlos Rodriguez',
        avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1',
        rating: 4.7,
        reviewCount: 18
      },
      images: ['https://images.pexels.com/photos/1202723/pexels-photo-1202723.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&dpr=1'],
      rating: 4.7,
      reviewCount: 18,
      tags: ['Espagnol', 'Conversation', 'Culture'],
      availability: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri']
    }
  ]

  const fetchServices = async (searchFilters?: Partial<ServiceFilter>) => {
    isLoading.value = true
    try {
      // TODO: Replace with actual API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      services.value = mockServices.filter(service => {
        if (searchFilters?.category && service.category !== searchFilters.category) return false
        if (searchFilters?.location && !service.location.includes(searchFilters.location)) return false
        return true
      })
    } finally {
      isLoading.value = false
    }
  }

  const getServiceById = (id: string) => {
    return services.value.find(service => service.id === id) || mockServices.find(service => service.id === id)
  }

  const updateFilters = (newFilters: Partial<ServiceFilter>) => {
    filters.value = { ...filters.value, ...newFilters }
    fetchServices(filters.value)
  }

  return {
    services,
    isLoading,
    filters,
    fetchServices,
    getServiceById,
    updateFilters
  }
})