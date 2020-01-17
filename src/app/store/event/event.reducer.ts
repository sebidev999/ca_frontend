import { EventState } from './event.state';
import { EventActions, EventActionTypes, GetAllSuccess, GetSuccess, CreateSuccess, UpdateSuccess } from './event.actions';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AppState } from '../app.state';
import { EVENTS } from '../../../assets/consts/event.table.const';

const initialStates: EventState = {
    events: EVENTS,
    pending: false,
};

/**
 * The reducer for event.
 * @param state The initial states
 * @param action The action
 */
export function reducer(state: EventState = initialStates, action: EventActions): EventState {
    switch (action.type) {
        /**
         * Returns current state in these cases.
         */
        case EventActionTypes.GetAll:
        case EventActionTypes.Get:
        case EventActionTypes.Create:
        case EventActionTypes.Update: {
            return {
                ... state,
                pending: true
            };
        }

        /**
         * Returns all events when getallsuccess happens.
         */
        case EventActionTypes.GetAllSuccess: {
            const events = action instanceof GetAllSuccess ? action.payload.events : null;
            return {
                events,
                pending: false
            };
        }

        /**
         * Returns event by id when getsuccess happens.
         */
        case EventActionTypes.GetSuccess: {
            const { id, event } = action instanceof GetSuccess ? action.payload : null;
            const { events } = state;
            return {
                events: events.map(item => {
                    if (item.id === id) {
                        return event;
                    }

                    return item;
                }),
                pending: false
            };
        }

        /**
         * Returns all events when createsuccess happens.
         */
        case EventActionTypes.CreateSuccess: {
            const { events } = state;
            const payload = action instanceof CreateSuccess ? action.payload : null;
            return {
                events: [...events, payload.event],
                pending: false
            };
        }

        /**
         * Returns all events when updatedsuccess happens.
         */
        case EventActionTypes.UpdateSuccess: {
            const { events } = state;
            const payload = action instanceof UpdateSuccess ? action.payload : null;

            return {
                events: events.map(event => {
                    if (event.id === payload.id) {
                        return payload.event;
                    }
                    return event;
                }),
                pending: false
            };
        }

        /**
         * Returns state when err is raised.
         */
        case EventActionTypes.Error: {
            return {
                ...state,
                pending: false
            };
        }

        default: {
            return state;
        }
    }
}

/**
 * Feature Selector to get event state.
 */
export const getEventState = createFeatureSelector<AppState, EventState>('events');

/**
 * Selector to get all events.
 */
export const getEvents = createSelector(
    getEventState,
    state => state.events
);

/**
 * Selector to get event by id.
 */
export const getEventById = createSelector(
    getEventState,
    (state: EventState, props: {
        id: string;
    }) => {
        return state.events.find(event => event.id === props.id);
    }
);

/**
 * Selector to get pending state.
 */
export const getEventsPending = createSelector(
    getEventState,
    state => state.pending
);

