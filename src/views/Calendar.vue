<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    <div class="flex flex-col lg:flex-row gap-8">
      <!-- Calendar Section -->
      <div class="flex-1">
        <div class="card">
          <div class="flex items-center justify-between mb-6">
            <h1 class="text-2xl font-bold text-gray-900">Calendrier</h1>
            <div class="flex items-center space-x-3">
              <select
                v-model="viewMode"
                class="input w-auto"
              >
                <option value="month">Mois</option>
                <option value="week">Semaine</option>
                <option value="day">Jour</option>
              </select>
              <button
                @click="goToToday"
                class="btn btn-outline"
              >
                Aujourd'hui
              </button>
              <button
                @click="createEvent"
                class="btn btn-primary"
              >
                <Plus class="w-4 h-4 mr-2" />
                Nouveau rendez-vous
              </button>
            </div>
          </div>

          <!-- Calendar Navigation -->
          <div class="flex items-center justify-between mb-6">
            <div class="flex items-center space-x-3">
              <button
                @click="previousPeriod"
                class="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <ChevronLeft class="w-5 h-5" />
              </button>
              <button
                @click="nextPeriod"
                class="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <ChevronRight class="w-5 h-5" />
              </button>
            </div>
            <h2 class="text-xl font-semibold text-gray-900">
              {{ currentPeriodLabel }}
            </h2>
            <div class="w-20"></div>
          </div>

          <!-- Calendar Grid -->
          <div class="border border-gray-200 rounded-lg overflow-hidden">
            <!-- Week Days Header -->
            <div class="grid grid-cols-7 border-b border-gray-200 bg-gray-50">
              <div
                v-for="day in weekDays"
                :key="day"
                class="px-4 py-3 text-sm font-medium text-gray-700 text-center"
              >
                {{ day }}
              </div>
            </div>

            <!-- Calendar Days -->
            <div class="grid grid-cols-7">
              <div
                v-for="date in calendarDates"
                :key="date.date"
                class="min-h-32 border-r border-b border-gray-200 p-2 bg-white hover:bg-gray-50 transition-colors cursor-pointer"
                :class="{
                  'bg-gray-50': !date.isCurrentMonth,
                  'bg-primary-50': date.isToday
                }"
                @click="selectDate(date)"
              >
                <div class="flex items-center justify-between mb-2">
                  <span
                    class="text-sm font-medium"
                    :class="{
                      'text-gray-400': !date.isCurrentMonth,
                      'text-primary-600 font-bold': date.isToday,
                      'text-gray-900': date.isCurrentMonth && !date.isToday
                    }"
                  >
                    {{ date.day }}
                  </span>
                  <div
                    v-if="date.events.length > 0"
                    class="w-2 h-2 bg-primary-600 rounded-full"
                  ></div>
                </div>

                <!-- Events -->
                <div class="space-y-1">
                  <div
                    v-for="event in date.events.slice(0, 2)"
                    :key="event.id"
                    class="text-xs p-1 rounded truncate"
                    :class="getEventClasses(event.type)"
                    @click.stop="selectEvent(event)"
                  >
                    {{ event.title }}
                  </div>
                  <div
                    v-if="date.events.length > 2"
                    class="text-xs text-gray-500"
                  >
                    +{{ date.events.length - 2 }} autres
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Sidebar -->
      <div class="lg:w-80 space-y-6">
        <!-- Today's Events -->
        <div class="card">
          <h3 class="text-lg font-semibold text-gray-900 mb-4">
            Aujourd'hui
          </h3>
          <div v-if="todayEvents.length === 0" class="text-center py-6">
            <Calendar class="w-12 h-12 text-gray-300 mx-auto mb-2" />
            <p class="text-gray-500">Aucun événement aujourd'hui</p>
          </div>
          <div v-else class="space-y-3">
            <div
              v-for="event in todayEvents"
              :key="event.id"
              class="flex items-center space-x-3 p-3 rounded-lg border border-gray-200 hover:border-primary-200 transition-colors cursor-pointer"
              @click="selectEvent(event)"
            >
              <div
                class="w-3 h-3 rounded-full flex-shrink-0"
                :class="getEventColor(event.type)"
              ></div>
              <div class="flex-1 min-w-0">
                <p class="text-sm font-medium text-gray-900 truncate">
                  {{ event.title }}
                </p>
                <p class="text-xs text-gray-500">
                  {{ formatTime(event.startTime) }} - {{ formatTime(event.endTime) }}
                </p>
              </div>
            </div>
          </div>
        </div>

        <!-- Quick Actions -->
        <div class="card">
          <h3 class="text-lg font-semibold text-gray-900 mb-4">
            Actions rapides
          </h3>
          <div class="space-y-2">
            <button
              @click="createEvent"
              class="w-full btn btn-primary justify-start"
            >
              <Plus class="w-4 h-4 mr-2" />
              Nouveau rendez-vous
            </button>
            <button
              @click="viewAvailability"
              class="w-full btn btn-outline justify-start"
            >
              <Clock class="w-4 h-4 mr-2" />
              Mes disponibilités
            </button>
            <button
              @click="syncCalendars"
              class="w-full btn btn-outline justify-start"
            >
              <RefreshCw class="w-4 h-4 mr-2" />
              Synchroniser
            </button>
          </div>
        </div>

        <!-- Event Types Legend -->
        <div class="card">
          <h3 class="text-lg font-semibold text-gray-900 mb-4">
            Types d'événements
          </h3>
          <div class="space-y-2">
            <div class="flex items-center space-x-2">
              <div class="w-3 h-3 bg-primary-600 rounded-full"></div>
              <span class="text-sm text-gray-700">Cours donnés</span>
            </div>
            <div class="flex items-center space-x-2">
              <div class="w-3 h-3 bg-secondary-600 rounded-full"></div>
              <span class="text-sm text-gray-700">Cours reçus</span>
            </div>
            <div class="flex items-center space-x-2">
              <div class="w-3 h-3 bg-accent-600 rounded-full"></div>
              <span class="text-sm text-gray-700">Événements personnels</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Event Modal -->
    <EventModal
      v-if="showEventModal"
      :event="selectedEvent"
      @close="showEventModal = false"
      @save="handleSaveEvent"
      @delete="handleDeleteEvent"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { startOfMonth, endOfMonth, startOfWeek, endOfWeek, eachDayOfInterval, format, isToday, isSameMonth, addMonths, subMonths } from 'date-fns'
import { fr } from 'date-fns/locale'
import { formatTime } from '@/utils/date'
import {
  Plus,
  ChevronLeft,
  ChevronRight,
  Calendar,
  Clock,
  RefreshCw
} from 'lucide-vue-next'
import EventModal from '@/components/calendar/EventModal.vue'

const route = useRoute()

const viewMode = ref('month')
const currentDate = ref(new Date())
const showEventModal = ref(false)
const selectedEvent = ref(null)

const weekDays = ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim']

// Mock events
const events = ref([
  {
    id: '1',
    title: 'Cours Vue.js avec Alice',
    startTime: new Date(2024, 0, 15, 14, 0),
    endTime: new Date(2024, 0, 15, 15, 30),
    type: 'teaching',
    description: 'Introduction aux composants Vue.js',
    participant: 'Alice Martin'
  },
  {
    id: '2',
    title: 'Apprentissage design avec Marie',
    startTime: new Date(2024, 0, 16, 10, 0),
    endTime: new Date(2024, 0, 16, 11, 30),
    type: 'learning',
    description: 'Principes de base du design UI/UX',
    participant: 'Marie Dupont'
  },
  {
    id: '3',
    title: 'Réunion équipe',
    startTime: new Date(2024, 0, 17, 16, 0),
    endTime: new Date(2024, 0, 17, 17, 0),
    type: 'personal',
    description: 'Point d\'équipe hebdomadaire'
  }
])

const currentPeriodLabel = computed(() => {
  return format(currentDate.value, 'MMMM yyyy', { locale: fr })
})

const calendarDates = computed(() => {
  const start = startOfWeek(startOfMonth(currentDate.value), { weekStartsOn: 1 })
  const end = endOfWeek(endOfMonth(currentDate.value), { weekStartsOn: 1 })
  
  return eachDayOfInterval({ start, end }).map(date => ({
    date,
    day: format(date, 'd'),
    isCurrentMonth: isSameMonth(date, currentDate.value),
    isToday: isToday(date),
    events: getEventsForDate(date)
  }))
})

const todayEvents = computed(() => {
  return getEventsForDate(new Date())
})

const getEventsForDate = (date: Date) => {
  return events.value.filter(event => 
    format(event.startTime, 'yyyy-MM-dd') === format(date, 'yyyy-MM-dd')
  )
}

const getEventClasses = (type: string) => {
  switch (type) {
    case 'teaching':
      return 'bg-primary-100 text-primary-800 border border-primary-200'
    case 'learning':
      return 'bg-secondary-100 text-secondary-800 border border-secondary-200'
    case 'personal':
      return 'bg-accent-100 text-accent-800 border border-accent-200'
    default:
      return 'bg-gray-100 text-gray-800 border border-gray-200'
  }
}

const getEventColor = (type: string) => {
  switch (type) {
    case 'teaching':
      return 'bg-primary-600'
    case 'learning':
      return 'bg-secondary-600'
    case 'personal':
      return 'bg-accent-600'
    default:
      return 'bg-gray-600'
  }
}

const previousPeriod = () => {
  currentDate.value = subMonths(currentDate.value, 1)
}

const nextPeriod = () => {
  currentDate.value = addMonths(currentDate.value, 1)
}

const goToToday = () => {
  currentDate.value = new Date()
}

const selectDate = (date: any) => {
  // Handle date selection
  console.log('Selected date:', date)
}

const selectEvent = (event: any) => {
  selectedEvent.value = event
  showEventModal.value = true
}

const createEvent = () => {
  selectedEvent.value = null
  showEventModal.value = true
}

const handleSaveEvent = (eventData: any) => {
  if (selectedEvent.value) {
    // Update existing event
    const index = events.value.findIndex(e => e.id === selectedEvent.value.id)
    if (index !== -1) {
      events.value[index] = { ...events.value[index], ...eventData }
    }
  } else {
    // Create new event
    const newEvent = {
      id: Date.now().toString(),
      ...eventData
    }
    events.value.push(newEvent)
  }
  showEventModal.value = false
}

const handleDeleteEvent = (eventId: string) => {
  events.value = events.value.filter(e => e.id !== eventId)
  showEventModal.value = false
}

const viewAvailability = () => {
  // Navigate to availability settings
  console.log('View availability')
}

const syncCalendars = () => {
  // Sync with external calendars
  console.log('Sync calendars')
}

onMounted(() => {
  // Check if provider parameter is provided for viewing someone else's calendar
  const providerId = route.query.provider as string
  if (providerId) {
    // Load provider's availability
    console.log('Loading calendar for provider:', providerId)
  }
})
</script>