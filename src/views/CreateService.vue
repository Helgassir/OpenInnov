<template>
  <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    <div class="mb-8">
      <h1 class="text-3xl font-bold text-gray-900">Créer un nouveau service</h1>
      <p class="text-gray-600 mt-2">
        Partagez vos compétences avec la communauté SkillShare
      </p>
    </div>

    <form @submit.prevent="handleSubmit" class="space-y-8">
      <div class="card">
        <h2 class="text-xl font-semibold text-gray-900 mb-6">Informations générales</h2>
        
        <div class="space-y-6">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">
              Titre du service *
            </label>
            <input
              v-model="form.title"
              type="text"
              required
              class="input"
              placeholder="Ex: Cours de développement Vue.js pour débutants"
            />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">
              Description *
            </label>
            <textarea
              v-model="form.description"
              rows="4"
              required
              class="input resize-none"
              placeholder="Décrivez votre service, ce que vous enseignez, votre méthode..."
            ></textarea>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">
                Catégorie *
              </label>
              <select v-model="form.category" required class="input">
                <option value="">Sélectionnez une catégorie</option>
                <option value="Programmation">Programmation</option>
                <option value="Design">Design</option>
                <option value="Langues">Langues</option>
                <option value="Musique">Musique</option>
                <option value="Marketing">Marketing</option>
                <option value="Photographie">Photographie</option>
              </select>
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">
                Durée (minutes) *
              </label>
              <select v-model="form.duration" required class="input">
                <option value="">Sélectionnez une durée</option>
                <option value="30">30 minutes</option>
                <option value="45">45 minutes</option>
                <option value="60">1 heure</option>
                <option value="90">1h30</option>
                <option value="120">2 heures</option>
              </select>
            </div>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">
                Prix (€/heure) *
              </label>
              <input
                v-model="form.price"
                type="number"
                min="0"
                step="5"
                required
                class="input"
                placeholder="35"
              />
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">
                Localisation
              </label>
              <input
                v-model="form.location"
                type="text"
                class="input"
                placeholder="Paris, France"
              />
            </div>
          </div>
        </div>
      </div>

      <div class="card">
        <h2 class="text-xl font-semibold text-gray-900 mb-6">Options du service</h2>
        
        <div class="space-y-6">
          <div>
            <label class="flex items-center">
              <input
                v-model="form.isOnline"
                type="checkbox"
                class="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
              />
              <span class="ml-2 text-sm text-gray-700">
                Service disponible en ligne
              </span>
            </label>
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">
              Compétences enseignées
            </label>
            <div class="flex flex-wrap gap-2 mb-3">
              <span
                v-for="tag in form.tags"
                :key="tag"
                class="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-primary-100 text-primary-800"
              >
                {{ tag }}
                <button
                  type="button"
                  @click="removeTag(tag)"
                  class="ml-1 text-primary-600 hover:text-primary-800"
                >
                  <X class="w-3 h-3" />
                </button>
              </span>
            </div>
            <div class="flex space-x-2">
              <input
                v-model="newTag"
                type="text"
                class="input flex-1"
                placeholder="Ajouter une compétence"
                @keyup.enter="addTag"
              />
              <button
                type="button"
                @click="addTag"
                class="btn btn-outline"
                :disabled="!newTag.trim()"
              >
                <Plus class="w-4 h-4" />
              </button>
            </div>
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">
              Disponibilités
            </label>
            <div class="grid grid-cols-2 md:grid-cols-4 gap-3">
              <label
                v-for="day in weekDays"
                :key="day.value"
                class="flex items-center"
              >
                <input
                  v-model="form.availability"
                  :value="day.value"
                  type="checkbox"
                  class="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                />
                <span class="ml-2 text-sm text-gray-700">{{ day.label }}</span>
              </label>
            </div>
          </div>
        </div>
      </div>

      <div class="flex justify-end space-x-4">
        <router-link to="/dashboard" class="btn btn-outline">
          Annuler
        </router-link>
        <button
          type="submit"
          class="btn btn-primary"
          :disabled="isSubmitting"
        >
          <span v-if="isSubmitting">Création...</span>
          <span v-else>Créer le service</span>
        </button>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { useToast } from 'vue-toastification'
import { X, Plus } from 'lucide-vue-next'

const router = useRouter()
const toast = useToast()

const isSubmitting = ref(false)
const newTag = ref('')

const form = reactive({
  title: '',
  description: '',
  category: '',
  duration: '',
  price: '',
  location: '',
  isOnline: false,
  tags: [] as string[],
  availability: [] as string[]
})

const weekDays = [
  { value: 'Mon', label: 'Lundi' },
  { value: 'Tue', label: 'Mardi' },
  { value: 'Wed', label: 'Mercredi' },
  { value: 'Thu', label: 'Jeudi' },
  { value: 'Fri', label: 'Vendredi' },
  { value: 'Sat', label: 'Samedi' },
  { value: 'Sun', label: 'Dimanche' }
]

const addTag = () => {
  const tag = newTag.value.trim()
  if (tag && !form.tags.includes(tag)) {
    form.tags.push(tag)
    newTag.value = ''
  }
}

const removeTag = (tagToRemove: string) => {
  form.tags = form.tags.filter(tag => tag !== tagToRemove)
}

const handleSubmit = async () => {
  if (!form.title || !form.description || !form.category || !form.duration || !form.price) {
    toast.error('Veuillez remplir tous les champs obligatoires')
    return
  }

  isSubmitting.value = true
  
  try {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    toast.success('Service créé avec succès !')
    router.push('/dashboard')
  } catch (error) {
    toast.error('Erreur lors de la création du service')
  } finally {
    isSubmitting.value = false
  }
}
</script>