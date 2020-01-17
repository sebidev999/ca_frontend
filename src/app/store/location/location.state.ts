import { Location } from '../../core/models/location/location';

/**
 * The interface for location state.
 */
export interface LocationState {
    locations: Array<Location>;
    pending: boolean;
}
