import { DeviceState } from './device.state';
import { DeviceActions, DeviceActionTypes, GetAllSuccess, GetSuccess, CreateSuccess, UpdateSuccess, DeleteSuccess } from './device.actions';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AppState } from '../app.state';

const initialStates: DeviceState = {
    devices: [],
    pending: false
};

/**
 * The reducer for device.
 * @param state The device state
 * @param action The action
 */
export function reducer(state: DeviceState = initialStates, action: DeviceActions): DeviceState {
    switch (action.type) {
        /**
         * Returns current state in these case.
         */
        case DeviceActionTypes.GetAll:
        case DeviceActionTypes.Get:
        case DeviceActionTypes.Create:
        case DeviceActionTypes.Update:
        case DeviceActionTypes.Delete: {
            return {
                ...state,
                pending: true
            };
        }

        /**
         * Returns all devices when getallsuccess action happens.
         */
        case DeviceActionTypes.GetAllSuccess: {
            const devices = action instanceof GetAllSuccess ? action.payload.devices : null;
            return {
                devices,
                pending: false
            };
        }

        /**
         * Return device by id when getsuccess happens.
         */
        case DeviceActionTypes.GetSuccess: {
            const { id, device } = action instanceof GetSuccess ? action.payload : null;
            const { devices } = state;
            return {
                devices: [devices.find(item => item.id === id)],
                pending: false
            };
        }

        /**
         * Returns all devices with newly created one when createsuccess happens.
         */
        case DeviceActionTypes.CreateSuccess: {
            const { devices } = state;
            const payload = action instanceof CreateSuccess ? action.payload : null;

            return {
                devices: [...devices, payload.device],
                pending: false
            };
        }

        /**
         * Returns all devices with updated one when updatesuccess happens.
         */
        case DeviceActionTypes.UpdateSuccess: {
            const { devices } = state;
            const payload = action instanceof UpdateSuccess ? action.payload : null;
            return {
                devices: devices.map(device => {
                    if (device.id === payload.id) {
                        return payload.device;
                    }
                    return device;
                }),
                pending: false
            };
        }

        /**
         * Returns all current devices.
         */
        case DeviceActionTypes.DeleteSuccess: {
            const { devices } = state;
            const payload = action instanceof DeleteSuccess ? action.payload : null;

            return {
                devices: devices.filter(device => device.id !== payload.device.id),
                pending: false
            };
        }

        /**
         * Returns current state when error is rasied.
         */
        case DeviceActionTypes.Error: {
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
 * Feature Selector for device state.
 */
export const getDeviceState = createFeatureSelector<AppState, DeviceState>('devices');

/**
 * Selector to getting all devices.
 */
export const getDevices = createSelector(
    getDeviceState,
    state => state.devices
);

/**
 * Selector to getting pending state.
 */
export const getDevicesPending = createSelector(
    getDeviceState,
    state => state.pending
);

