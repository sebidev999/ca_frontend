import { AssetState } from './asset.state';
import { AssetActions, AssetActionTypes, GetAllSuccess, GetSuccess, CreateSuccess, UpdateSuccess } from './asset.actions';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AppState } from '../app.state';

const initialStates: AssetState = {
    assets: [{
        id: '1',
        transformerName: 'xyz-123456789',
        location: 'German',
        manufacturer: 'Siemens',
        yearOfManufacture: '1960',
        maximumPower: 'MVA',
        serialNumber: '123456789',
        operator: '',
        number: '',
        nominalTensionHv: '',
        nominalTensionLv: '',
        typeDesignation: '',
        tapChangerSerialNumber: '',
        tapChangerManufacture: ''
    }],
    pending: false,
};

/**
 * The reducer for asset.
 * @param state The initial states
 * @param action The action
 */
export function reducer(state: AssetState = initialStates, action: AssetActions): AssetState {

    switch (action.type) {
        /**
         * Returns current state in these cases.
         */
        case AssetActionTypes.GetAll:
        case AssetActionTypes.Get:
        case AssetActionTypes.Create:
        case AssetActionTypes.Update: {
            return {
                ... state,
                pending: true
            };
        }

        /**
         * Returns all assets when getallsuccess happens.
         */
        case AssetActionTypes.GetAllSuccess: {
            const assets = action instanceof GetAllSuccess ? action.payload.assets : null;
            return {
                assets,
                pending: false
            };
        }

        /**
         * Returns asset by id when getsuccess happnes.
         */
        case AssetActionTypes.GetSuccess: {
            const { id, asset } = action instanceof GetSuccess ? action.payload : null;
            const { assets } = state;
            return {
                assets: assets.map(item => {
                    if (item.id === id) {
                        return asset;
                    }
                    return item;
                }),
                pending: false
            };
        }

        /**
         * Returns all assets with newly created asset when createsuccess happens.
         */
        case AssetActionTypes.CreateSuccess: {
            const { assets } = state;
            const payload = action instanceof CreateSuccess ? action.payload : null;
            return {
                assets: [...assets, payload.asset],
                pending: false
            };
        }

        /**
         * Returns all assets with updated asset when updatesuccess happens.
         */
        case AssetActionTypes.UpdateSuccess: {
            const { assets } = state;
            const payload = action instanceof UpdateSuccess ? action.payload : null;
            return {
                assets: assets.map(asset => {
                    if (asset.id === payload.id) {
                        return payload.asset;
                    }
                    return asset;
                }),
                pending: false
            };
        }

        /**
         * Returns current state when error is raised.
         */
        case AssetActionTypes.Error: {
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
 * Feature Selector to get assets state.
 */
export const getAssetState = createFeatureSelector<AppState, AssetState>('assets');

/**
 * Selector to get all assets.
 */
export const getAssets = createSelector(
    getAssetState,
    state => state.assets
);

/**
 * Selector to get asset by ID.
 */
export const getAssetById = createSelector(
    getAssetState,
    (state: AssetState, props: {
        id: string;
    }) => {
        return state.assets.find(asset => asset.id === props.id);
    }
);

/**
 * Selector to get pending state.
 */
export const getAssetsPending = createSelector(
    getAssetState,
    state => state.pending
);
