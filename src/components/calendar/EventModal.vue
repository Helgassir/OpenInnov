<template>
  <div class="fixed inset-0 z-50 overflow-y-auto">
    <div class="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
      <div class="fixed inset-0 transition-opacity bg-gray-500 bg-opacity-75" @click="$emit('close')"></div>

      <div class="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
        <div class="flex items-center justify-between mb-6">
          <h3 class="text-xl font-bold text-gray-900">
            {{ event ? 'Modifier l\'événement' : 'Nouvel événement' }}
          </h3>
          <button
            @click="$emit('close')"
            class="p-2 text-gray-400 hover:text-gray-600"
          >
            <X class="w-5 h-5" />
          </button>
        </div>

        <form @submit.prevent="handleSubmit" class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">
              Titre *
            </label>
            <input
              v-model="form.title"
              type="text"
              required
              class="input"
              placeholder="Titre de l'événement"
            />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">
              Type
            </label>
            <select v-model="form.type" class="input">
              <option value="teaching">Cours donné</option>
              <option value="learning">Cours reçu</option>
              <option value="personal">Personnel</option>
            </select>
          </div>

          <div class="grid grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">
                Date *
              </label>
              <input
                v-model="form.date"
                type="date"
                required
                class="input"
              />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">
                Durée
              </label>
              <select v-model="form.duration" class="input">
                <option value="30">30 min</option>
                <option value="60">1h</option>
                <option value="90">1h30</option>
                <option value="120">2h</option>
              </select>
            </div>
          </div>

          <div class="grid grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">
                Heure de début *
              </label>
              <input
                v-model="form.startTime"
                type="time"
                required
                class="input"
              />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">
                Heure de fin *
              </label>
              <input
                v-model="form.endTime"
                type="time"
                required
                class="input"
              />
            </div>
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">
              Participant
            </label>
            <input
              v-model="form.participant"
              type="text"
              class="input"
              placeholder="Nom du participant (optionnel)"
            />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <textarea
              v-model="form.description"
              rows="3"
              class="input resize-none"
              placeholder="Description de l'événement"
            ></textarea>
          </div>

          <div class="flex justify-between pt-6 border-t border-gray-200">
            <button
              v-if="event"
              type="button"
              @click="handleDelete"
              class="btn bg-red-600 text-white hover:bg-red-700"
            >
              Supprimer
            </button>
            <div class="flex space-x-3" :class="{ 'ml-auto': !event }">
              <button
                type="button"
                @click="$emit('close')"
                class="btn btn-outline"
              >
                Annuler
              </button>
              <button
                type="submit"
                class="btn btn-primary"
              >
                {{ event ? 'Modifier' : 'Créer' }}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, onMounted } from 'vue'
import { format } from 'date-fns'
import { X } from 'lucide-vue-next'

interface Props {
  event?: any
}

const props = defineProps<Props>()
const emit = defineEmits(['close', 'save', 'delete'])

const form = reactive({
  title: '',
  type: 'teaching',
  date: '',
  startTime: '',
  endTime: '',
  duration: 60,
  participant: '',
  description: ''
})

const handleSubmit = () => {
  const eventData = {
    title: form.title,
    type: form.type,
    startTime: new Date(`${form.date}T${form.startTime}`),
    endTime: new Date(`${form.date}T${form.endTime}`),
    participant: form.participant,
    description: form.description
  }
  
  emit('save', eventData)
}

const handleDelete = () => {
  if (props.event && confirm('Êtes-vous sûr de vouloir supprimer cet événement ?')) {
    emit('delete', props.event.id)
  }
}

onMounted(() => {
  if (props.event) {
    form.title = props.event.title
    form.type = props.event.type
    form.date = format(props.event.startTime, 'yyyy-MM-dd')
    form.startTime = format(props.event.startTime, 'HH:mm')
    form.endTime = format(props.event.endTime, 'HH:mm')
    form.participant = props.event.participant || ''
    form.description = props.event.description || ''
  } else {
    // Set defaults for new event
    form.date = format(new Date(), 'yyyy-MM-dd')
    form.startTime = '14:00'
    form.endTime = '15:00'
  }
})
</script>