import Review from '../models/review.model'
import { queryBuilderService } from '../utils/queryBuilder.service.utils'
import type { FilterQuery, UpdateQuery } from 'mongoose'
import type { Query as ExpressQuery } from 'express-serve-static-core'
import type { IReviewDocument } from '../types/review.types'
import type {
  TCreateReviewInput,
  TUpdateReviewInput
} from '../zodSchema/review.zodSchema'
import type { TQueryFilterByTourId } from '../middleware/setQueryFilterByTourId'

/**
 * Retrieves all reviews based on the provided query and filter options.
 * @param {ExpressQuery} props.query - The query object containing request parameters.
 * @param {TQueryFilterByTourId} props.TQueryFilterByTourId - The filter options for finding reviews.
 * @returns {Promise<IReviewDocument[]>} - A promise that resolves to an array of review documents.
 */
type TProps = {
  queryFilterByTourId: TQueryFilterByTourId
  query: ExpressQuery
}

export async function getAllReviews({
  queryFilterByTourId = {},
  query
}: TProps): Promise<IReviewDocument[]> {
  const reviews = await queryBuilderService<IReviewDocument>({
    queryFilterByTourId,
    query,
    Model: Review
  })

  return reviews
}

/**
 * Retrieves a review by its ID.
 * @param {string} reviewId - The ID of the review.
 * @returns {Promise<IReviewDocument | null>} - A promise that resolves to the review document, or null if not found.
 */
export async function getReview(
  filter: FilterQuery<IReviewDocument>
): Promise<IReviewDocument | null> {
  const review = await Review.findOne(filter)

  return review
}

/**
 * Creates a new review on a tour.
 * @param {TCreateReviewInput['body']} body - The body of the review.
 * @returns {Promise<IReviewDocument>} - A promise that resolves to the created review document.
 */
export async function createReviewOnTour(
  body: TCreateReviewInput['body']
): Promise<IReviewDocument | null> {
  const review = await Review.create(body)

  return review
}

/**
 * Updates a review based on the provided filter and update.
 * @param {Object} props - The properties for updating the review.
 * @param {FilterQuery<IReviewDocument>} props.filter - The filter for finding the review to update.
 * @param {UpdateQuery<TUpdateReviewInput['body']>} props.update - The update to apply to the review.
 * @returns {Promise<IReviewDocument | null>} - A promise that resolves to the updated review document, or null if not found.
 */
export async function updateReview({
  filter,
  update
}: {
  filter: FilterQuery<IReviewDocument>
  update: UpdateQuery<TUpdateReviewInput['body']>
}): Promise<IReviewDocument | null> {
  const updatedReview = await Review.findOneAndUpdate(filter, update, {
    new: true
  })

  return updatedReview
}

/**
 * Deletes a review by its ID.
 * @param {string} reviewId - The ID of the review to delete.
 * @returns {Promise<IReviewDocument | null>} - A promise that resolves to the deleted review document, or null if not found.
 */
export async function deleteReview(
  reviewId: string
): Promise<IReviewDocument | null> {
  const deletedReview = await Review.findByIdAndDelete(reviewId)

  return deletedReview
}
