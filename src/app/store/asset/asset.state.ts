
import { Asset } from '../../core/models/asset/asset';

/**
 * The interface for Asset state.
 */
export interface AssetState {
    assets: Array<Asset>;
    pending: boolean;
}
