import { format, formatDistanceToNow } from 'date-fns'
import { fr } from 'date-fns/locale'

export const formatDate = (date: Date): string => {
  return format(date, 'dd MMMM yyyy', { locale: fr })
}

export const formatTime = (date: Date): string => {
  return format(date, 'HH:mm')
}

export const formatDateTime = (date: Date): string => {
  return format(date, 'dd/MM/yyyy à HH:mm', { locale: fr })
}

export const formatRelativeTime = (date: Date): string => {
  return formatDistanceToNow(date, { addSuffix: true, locale: fr })
}