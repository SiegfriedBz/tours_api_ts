import mongoose from 'mongoose'
import QueryBuilder from './queryBuilder.utils'
import type { Query as ExpressQuery } from 'express-serve-static-core'
import type { TReviewFindFilterOptions } from '../controllers/review.controller'

type TProps<T> = {
  modelFindFilterOptions?: TReviewFindFilterOptions
  query: ExpressQuery
  Model: mongoose.Model<T, object, object, T>
}

/**
 * Builds and executes a query using the provided parameters.
 * @param {TProps<T>} props - The properties required for the query.
 * @returns {Promise<T[]>} - The result of the executed query.
 */
export async function queryBuilderService<T>({
  modelFindFilterOptions,
  query,
  Model
}: TProps<T>): Promise<T[]> {
  /** Get filter options if any
   * e.g. GET /tours/:id/reviews => all reviews for 1 tour
   */
  const findFilterOptions = modelFindFilterOptions ?? {}

  /** Create QueryBuilder instance */
  const queryBuilder = new QueryBuilder({
    mongooseQuery: Model.find(findFilterOptions),
    expressQueryObjInit: query
  })

  /** Build Query */
  const documentsQuery = queryBuilder
    .filter()
    .sort()
    .projectFields()
    .paginate().mongooseQuery

  /** Execute Query */
  const documents = await documentsQuery

  return documents
}