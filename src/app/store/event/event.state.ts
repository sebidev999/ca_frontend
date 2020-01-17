import { Event } from '../../core/models/event/event';

/**
 * The interface for event state
 */
export interface EventState {
    events: Array<Event>;
    pending: boolean;
}
