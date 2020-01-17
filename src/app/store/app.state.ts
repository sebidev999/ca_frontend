import { AssetState } from './asset/asset.state';
import { LocationState } from './location/location.state';
import { EventState } from './event/event.state';
import { EventCategoryState } from './event-category/event-categories.state';
import { DeviceState } from './device/device.state';

/**
 * The interface for App State.
 */
export interface AppState {
    readonly assets: AssetState;
    readonly locations: LocationState;
    readonly events: EventState;
    readonly eventCategories: EventCategoryState;
    readonly devices: DeviceState;
}
