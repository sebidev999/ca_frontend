import { ActionReducerMap } from '@ngrx/store';

import * as fromAssets from './asset/asset.reducer';
import * as fromLocations from './location/location.reducer';
import * as fromEvents from './event/event.reducer';
import * as fromEventCategory from './event-category/event-categories.reducer';
import * as fromDevices from './device/device.reducer';

import { AppState } from './app.state';

export const reducer: ActionReducerMap<AppState> = {
    assets: fromAssets.reducer,
    locations: fromLocations.reducer,
    events: fromEvents.reducer,
    eventCategories: fromEventCategory.reducer,
    devices: fromDevices.reducer
};
