<template>
  <div class="fixed inset-0 z-50 overflow-y-auto">
    <div class="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
      <div class="fixed inset-0 transition-opacity bg-gray-500 bg-opacity-75" @click="$emit('close')"></div>

      <div class="inline-block w-full max-w-2xl p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
        <div class="flex items-center justify-between mb-6">
          <h3 class="text-2xl font-bold text-gray-900">
            Modifier mon profil
          </h3>
          <button
            @click="$emit('close')"
            class="p-2 text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X class="w-6 h-6" />
          </button>
        </div>

        <form @submit.prevent="handleSubmit" class="space-y-6">
          <!-- Avatar Upload -->
          <div class="text-center">
            <div class="flex justify-center">
              <div class="relative">
                <img
                  :src="form.avatar || user?.avatar"
                  :alt="user?.firstName"
                  class="w-24 h-24 rounded-full object-cover border-4 border-gray-200"
                />
                <button
                  type="button"
                  @click="triggerFileUpload"
                  class="absolute bottom-0 right-0 w-8 h-8 bg-primary-600 text-white rounded-full flex items-center justify-center hover:bg-primary-700 transition-colors"
                >
                  <Camera class="w-4 h-4" />
                </button>
              </div>
            </div>
            <input
              ref="fileInput"
              type="file"
              accept="image/*"
              class="hidden"
              @change="handleAvatarChange"
            />
            <p class="mt-2 text-sm text-gray-500">
              Cliquez sur l'icône pour changer votre photo
            </p>
          </div>

          <!-- Basic Info -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">
                Prénom *
              </label>
              <input
                v-model="form.firstName"
                type="text"
                required
                class="input"
                placeholder="Votre prénom"
              />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">
                Nom *
              </label>
              <input
                v-model="form.lastName"
                type="text"
                required
                class="input"
                placeholder="Votre nom"
              />
            </div>
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">
              Email *
            </label>
            <input
              v-model="form.email"
              type="email"
              required
              class="input"
              placeholder="votre@email.com"
            />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">
              Localisation
            </label>
            <input
              v-model="form.location"
              type="text"
              class="input"
              placeholder="Paris, France"
            />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">
              Téléphone
            </label>
            <input
              v-model="form.phone"
              type="tel"
              class="input"
              placeholder="+33 6 12 34 56 78"
            />
          </div>

          <!-- Bio -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">
              Bio
            </label>
            <textarea
              v-model="form.bio"
              rows="4"
              class="input resize-none"
              placeholder="Parlez-nous de vous, vos expériences, vos passions..."
            ></textarea>
            <p class="mt-1 text-sm text-gray-500">
              {{ form.bio?.length || 0 }}/500 caractères
            </p>
          </div>

          <!-- Skills -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">
              Compétences
            </label>
            <div class="flex flex-wrap gap-2 mb-3">
              <span
                v-for="skill in form.skills"
                :key="skill"
                class="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-primary-100 text-primary-800"
              >
                {{ skill }}
                <button
                  type="button"
                  @click="removeSkill(skill)"
                  class="ml-1 text-primary-600 hover:text-primary-800"
                >
                  <X class="w-3 h-3" />
                </button>
              </span>
            </div>
            <div class="flex space-x-2">
              <input
                v-model="newSkill"
                type="text"
                class="input flex-1"
                placeholder="Ajouter une compétence"
                @keyup.enter="addSkill"
              />
              <button
                type="button"
                @click="addSkill"
                class="btn btn-outline"
                :disabled="!newSkill.trim()"
              >
                <Plus class="w-4 h-4" />
              </button>
            </div>
          </div>

          <!-- Social Links -->
          <div>
            <h4 class="text-lg font-medium text-gray-900 mb-3">Liens sociaux</h4>
            <div class="space-y-3">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">
                  LinkedIn
                </label>
                <input
                  v-model="form.socialLinks.linkedin"
                  type="url"
                  class="input"
                  placeholder="https://linkedin.com/in/votre-profil"
                />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">
                  GitHub
                </label>
                <input
                  v-model="form.socialLinks.github"
                  type="url"
                  class="input"
                  placeholder="https://github.com/votre-username"
                />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">
                  Site web
                </label>
                <input
                  v-model="form.website"
                  type="url"
                  class="input"
                  placeholder="https://votre-site.com"
                />
              </div>
            </div>
          </div>

          <!-- Preferences -->
          <div>
            <h4 class="text-lg font-medium text-gray-900 mb-3">Préférences</h4>
            <div class="space-y-3">
              <label class="flex items-center">
                <input
                  v-model="form.preferences.notifications"
                  type="checkbox"
                  class="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                />
                <span class="ml-2 text-sm text-gray-700">
                  Recevoir les notifications push
                </span>
              </label>
              <label class="flex items-center">
                <input
                  v-model="form.preferences.emailUpdates"
                  type="checkbox"
                  class="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                />
                <span class="ml-2 text-sm text-gray-700">
                  Recevoir les mises à jour par email
                </span>
              </label>
              <label class="flex items-center">
                <input
                  v-model="form.preferences.publicProfile"
                  type="checkbox"
                  class="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                />
                <span class="ml-2 text-sm text-gray-700">
                  Profil public (visible dans les recherches)
                </span>
              </label>
            </div>
          </div>

          <!-- Actions -->
          <div class="flex justify-end space-x-3 pt-6 border-t border-gray-200">
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
              :disabled="isSubmitting"
            >
              <span v-if="isSubmitting">Enregistrement...</span>
              <span v-else>Enregistrer</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue'
import { X, Camera, Plus } from 'lucide-vue-next'
import type { User } from '@/types/auth'

interface Props {
  user: User | null
}

const props = defineProps<Props>()
const emit = defineEmits(['close', 'save'])

const fileInput = ref<HTMLInputElement>()
const isSubmitting = ref(false)
const newSkill = ref('')

const form = reactive({
  firstName: '',
  lastName: '',
  email: '',
  location: '',
  phone: '',
  bio: '',
  avatar: '',
  website: '',
  skills: [] as string[],
  socialLinks: {
    linkedin: '',
    github: '',
    twitter: ''
  },
  preferences: {
    notifications: true,
    emailUpdates: false,
    publicProfile: true
  }
})

const triggerFileUpload = () => {
  fileInput.value?.click()
}

const handleAvatarChange = (event: Event) => {
  const file = (event.target as HTMLInputElement).files?.[0]
  if (file) {
    const reader = new FileReader()
    reader.onload = (e) => {
      form.avatar = e.target?.result as string
    }
    reader.readAsDataURL(file)
  }
}

const addSkill = () => {
  const skill = newSkill.value.trim()
  if (skill && !form.skills.includes(skill)) {
    form.skills.push(skill)
    newSkill.value = ''
  }
}

const removeSkill = (skillToRemove: string) => {
  form.skills = form.skills.filter(skill => skill !== skillToRemove)
}

const handleSubmit = async () => {
  isSubmitting.value = true
  try {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    emit('save', { ...form })
  } finally {
    isSubmitting.value = false
  }
}

onMounted(() => {
  if (props.user) {
    Object.assign(form, {
      firstName: props.user.firstName,
      lastName: props.user.lastName,
      email: props.user.email,
      location: props.user.location,
      phone: props.user.phone || '',
      bio: props.user.bio,
      avatar: props.user.avatar || '',
      website: props.user.website || '',
      skills: [...props.user.skills],
      socialLinks: {
        linkedin: props.user.socialLinks?.linkedin || '',
        github: props.user.socialLinks?.github || '',
        twitter: props.user.socialLinks?.twitter || ''
      },
      preferences: {
        notifications: props.user.preferences?.notifications ?? true,
        emailUpdates: props.user.preferences?.emailUpdates ?? false,
        publicProfile: props.user.preferences?.publicProfile ?? true
      }
    })
  }
})
</script>