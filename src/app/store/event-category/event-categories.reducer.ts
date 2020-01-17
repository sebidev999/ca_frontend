import { EventCategoryState } from './event-categories.state';
import { EventCategoryActions, EventCategoryTypes, GetSuccess, UpdateSuccess } from './event-categories.actions';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AppState } from '../app.state';
import { ViewType } from '../../core/models/event/categories';

const initialStates: EventCategoryState = {
    eventCategories: {
        partnerId: 1,
        error: {
            view: ViewType.ACTIVE_OR_UNCONFIRMED,
            emailNotification: true
        },
        warning: {
            view: ViewType.ACTIVE_OR_UNCONFIRMED,
            emailNotification: true
        },
        info: {
            view: ViewType.ACTIVE_OR_UNCONFIRMED,
            emailNotification: true
        }
    },
    pending: false
};


export function reducer(state: EventCategoryState = initialStates, action: EventCategoryActions): EventCategoryState {
    switch (action.type) {
        /**
         * Returns current state.
         */
        case EventCategoryTypes.Get:
        case EventCategoryTypes.Update: {
            return {
                ...state,
                pending: true
            };
        }

        /**
         * Returns state when get success happens.
         */
        case EventCategoryTypes.GetSuccess: {
            const eventCategories = action instanceof GetSuccess ? action.payload.eventCategories : null;
            return {
                eventCategories,
                pending: false
            };
        }

        /**
         * Returns state when update success happens.
         */
        case EventCategoryTypes.UpdateSuccess: {
            const payload = action instanceof UpdateSuccess ? action.payload : null;

            return {
                eventCategories: payload.eventCategories,
                pending: false
            };
        }

        /**
         * Returns state when err happens.
         */
        case EventCategoryTypes.Error: {
            return {
                ... state,
                pending: false
            };
        }
        default: {
            return state;
        }
    }
}

/**
 * Feature selector for eventCategories.
 */
export const getEventCategoryState = createFeatureSelector<AppState, EventCategoryState>('eventCategories');

/**
 * Selector to get all categories.
 */
export const getEventCategories = createSelector(
    getEventCategoryState,
    state => state.eventCategories
);

/**
 * Selector to get pending state.
 */
export const getEventCategoryPending = createSelector(
    getEventCategoryState,
    state => state.pending
);
