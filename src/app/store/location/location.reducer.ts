import { createFeatureSelector, createSelector } from '@ngrx/store';

import { AppState } from '../app.state';
import { LocationState } from './location.state';
import { LocationActions, LocationActionTypes, GetAllSuccess, GetSuccess, CreateSuccess, UpdateSuccess } from './location.actions';
import { Location } from '../../core/models/location/location';

const initialStates: LocationState = {
    locations: [
        {
            id: '1',
            name: 'German',
            position: {
                latitude: 0,
                longitude: 0
            }
        }
    ],
    pending: false,
};

/**
 * The reducer for location.
 * @param state The initial states
 * @param action The action
 */
export function reducer(state: LocationState = initialStates, action: LocationActions): LocationState {
    switch (action.type) {
        /**
         * Return location state in these cases.
         */
        case LocationActionTypes.GetAll:
        case LocationActionTypes.Get:
        case LocationActionTypes.Create:
        case LocationActionTypes.Update: {
            return {
                ... state,
                pending: true
            };
        }

        /**
         * Returns all location when getallsuccess happens.
         */
        case LocationActionTypes.GetAllSuccess: {
            const locations = action instanceof GetAllSuccess ? action.payload.locations : null;
            return {
                locations,
                pending: false
            };
        }

        /**
         * Returns location by id when getsuccess happens.
         */
        case LocationActionTypes.GetSuccess: {
            const { id, location } = action instanceof GetSuccess ? action.payload : null;
            const { locations } = state;
            return {
                locations: locations.map((item: Location) => {
                    if (item.id === id) {
                        return location;
                    }
                    return item;
                }),
                pending: false
            };
        }

        /**
         * Returns all locations when createsuccess happens.
         */
        case LocationActionTypes.CreateSuccess: {
            const { locations } = state;
            const payload = action instanceof CreateSuccess ? action.payload : null;
            return {
                locations: [...locations, payload.location],
                pending: false
            };
        }

        /**
         * Returns all locations when updatesuccess happens.
         */
        case LocationActionTypes.UpdateSuccess: {
            const { locations } = state;
            const payload = action instanceof UpdateSuccess ? action.payload : null;
            return {
                locations: locations.map((location: Location) => {
                    if (location.id === payload.id) {
                        return payload.location;
                    }
                    return location;
                }),
                pending: false
            };
        }

        /**
         * Returns all locations when deletesuccess happens.
         */
        case LocationActionTypes.DeleteSuccess: {
            const { locations } = state;
            const payload = action instanceof UpdateSuccess ? action.payload : null;

            return {
                locations: locations.filter((location: Location) => location.id !== payload.id),
                pending: false
            };
        }

        /**
         * Returns all location state when err happens.
         */
        case LocationActionTypes.Error: {
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
 * Feature selector for location state.
 */
export const getLocationState = createFeatureSelector<AppState, LocationState>('locations');

/**
 * Selector to get all locations.
 */
export const getLocations = createSelector(
    getLocationState,
    state => state.locations
);

/**
 * Selector to get pending state.
 */
export const getLocationsPending = createSelector(
    getLocationState,
    state => state.pending
);
