export interface Service {
  id: string
  title: string
  description: string
  category: string
  price: number
  duration: number
  location: string
  isOnline: boolean
  provider: ServiceProvider
  images: string[]
  rating: number
  reviewCount: number
  tags: string[]
  availability: string[]
  createdAt?: Date
  updatedAt?: Date
}

export interface ServiceProvider {
  id: string
  name: string
  avatar: string
  rating: number
  reviewCount: number
}

export interface ServiceFilter {
  category: string
  location: string
  priceRange: [number, number]
  rating: number
  availability: string
}

export interface Review {
  id: string
  serviceId: string
  userId: string
  userName: string
  userAvatar: string
  rating: number
  comment: string
  createdAt: Date
}

export interface Booking {
  id: string
  serviceId: string
  providerId: string
  clientId: string
  date: Date
  duration: number
  status: 'pending' | 'confirmed' | 'cancelled' | 'completed'
  totalPrice: number
  notes?: string
}