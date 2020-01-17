import { EventCategories } from '../../core/models/event/categories';

/**
 * The interface for event category
 */
export interface EventCategoryState {
  eventCategories: EventCategories;
  pending: boolean;
}
