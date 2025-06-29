import mongoose from 'mongoose'

const socialLinksSchema = new mongoose.Schema({
  linkedin: String,
  github: String,
  twitter: String
}, { _id: false })

const preferencesSchema = new mongoose.Schema({
  notifications: Boolean,
  emailUpdates: Boolean,
  publicProfile: Boolean
}, { _id: false })

const userSchema = new mongoose.Schema({
  id: String,
  email: String,
  firstName: String,
  lastName: String,
  avatar: String,
  skills: [String],
  location: String,
  rating: Number,
  reviewCount: Number,
  bio: String,
  phone: String,
  website: String,
  socialLinks: socialLinksSchema,
  preferences: preferencesSchema
})

export default mongoose.model('User', userSchema)
