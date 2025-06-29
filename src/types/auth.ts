export interface User {
  id: string
  email: string
  firstName: string
  lastName: string
  avatar?: string
  skills: string[]
  location: string
  rating: number
  reviewCount: number
  bio: string
  phone?: string
  website?: string
  socialLinks?: {
    linkedin?: string
    github?: string
    twitter?: string
  }
  preferences?: {
    notifications: boolean
    emailUpdates: boolean
    publicProfile: boolean
  }
}

export interface LoginCredentials {
  email: string
  password: string
}

export interface RegisterData {
  email: string
  password: string
  firstName: string
  lastName: string
  confirmPassword: string
}