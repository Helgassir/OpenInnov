import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { User, LoginCredentials, RegisterData } from '../types/auth'

export const useAuthStore = defineStore('auth', () => {
  const user = ref<User | null>(null)
  const token = ref<string | null>(null)
  const isLoading = ref(false)

  const isAuthenticated = computed(() => !!token.value && !!user.value)

  const initializeAuth = () => {
    const savedToken = localStorage.getItem('auth_token')
    const savedUser = localStorage.getItem('user_data')
    
    if (savedToken && savedUser) {
      token.value = savedToken
      user.value = JSON.parse(savedUser)
    }
  }

  const login = async (credentials: LoginCredentials) => {
    isLoading.value = true
    try {
      // TODO: Replace with actual API call
      const mockUser: User = {
        id: '1',
        email: credentials.email,
        firstName: 'John',
        lastName: 'Doe',
        avatar: 'https://images.pexels.com/photos/1212984/pexels-photo-1212984.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1',
        skills: ['Web Development', 'Vue.js'],
        location: 'Paris, France',
        rating: 4.8,
        reviewCount: 23,
        bio: 'Développeur full-stack passionné avec 5 ans d\'expérience.'
      }
      
      const mockToken = 'mock-jwt-token-' + Date.now()
      
      user.value = mockUser
      token.value = mockToken
      
      localStorage.setItem('auth_token', mockToken)
      localStorage.setItem('user_data', JSON.stringify(mockUser))
      
      return { success: true }
    } catch (error) {
      return { success: false, error: 'Login failed' }
    } finally {
      isLoading.value = false
    }
  }

  const register = async (data: RegisterData) => {
    isLoading.value = true
    try {
      // TODO: Replace with actual API call
      const mockUser: User = {
        id: '1',
        email: data.email,
        firstName: data.firstName,
        lastName: data.lastName,
        avatar: 'https://images.pexels.com/photos/1212984/pexels-photo-1212984.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1',
        skills: [],
        location: '',
        rating: 0,
        reviewCount: 0,
        bio: ''
      }
      
      const mockToken = 'mock-jwt-token-' + Date.now()
      
      user.value = mockUser
      token.value = mockToken
      
      localStorage.setItem('auth_token', mockToken)
      localStorage.setItem('user_data', JSON.stringify(mockUser))
      
      return { success: true }
    } catch (error) {
      return { success: false, error: 'Registration failed' }
    } finally {
      isLoading.value = false
    }
  }

  const logout = () => {
    user.value = null
    token.value = null
    localStorage.removeItem('auth_token')
    localStorage.removeItem('user_data')
  }

  const updateProfile = (updatedUser: Partial<User>) => {
    if (user.value) {
      user.value = { ...user.value, ...updatedUser }
      localStorage.setItem('user_data', JSON.stringify(user.value))
    }
  }

  return {
    user,
    token,
    isLoading,
    isAuthenticated,
    initializeAuth,
    login,
    register,
    logout,
    updateProfile
  }
})