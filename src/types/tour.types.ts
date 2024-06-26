import mongoose from 'mongoose'

export interface ITourDBInput {
  name: string
  slug: string
  duration: number
  maxGroupSize: number
  difficulty: 'easy' | 'medium' | 'difficult'
  ratingsAverage: number
  ratingsCount: number
  price: number
  discount: number
  summary: string
  description: string
  imageCover: string
  images: string[]
  startDates: Date[]
  startLocation: object
  locations: object[]
  guides: mongoose.Schema.Types.ObjectId[]
}

export interface ITourDocument extends ITourDBInput, mongoose.Document {
  createdAt: Date
  updatedAt: Date
}

export type TTourStats = {
  _id: 'easy' | 'medium' | 'hard' // Assuming TOUR_DIFFICULTY is an array containing these strings
  avgRating: number
  avgPrice: number
  minPrice: number
  maxPrice: number
  totalRatingsCount: number
  totalToursCount: number
}

export type TMonthlyStats = {
  toursStartCount: number
  tours: string[]
  month: number
}
