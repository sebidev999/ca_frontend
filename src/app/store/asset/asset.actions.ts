import { Action } from '@ngrx/store';
import { Asset } from '../../core/models/asset/asset';

/**
 * Enum for asset action types.
 */
export enum AssetActionTypes {
    GetAll = '[asset] GetAll',
    GetAllSuccess = '[asset] GetAll Success',
    Get = '[asset] Get',
    GetSuccess = '[asset] GetSuccess',
    Create = '[asset] Create',
    CreateSuccess = '[asset] CreateSuccess',
    Update = '[asset] Update',
    UpdateSuccess = '[asset] UpdateSuccess',
    Error = '[asset] Get Error'
}

/**
 * Action class Happens when user gets all asset.
 */
export class GetAll implements Action {
    public readonly type: AssetActionTypes = AssetActionTypes.GetAll;
    constructor(public payload: {}) {}
}

/**
 * Action class Happens when user gets all asset successfully.
 */
export class GetAllSuccess implements Action {
    public readonly type: AssetActionTypes = AssetActionTypes.GetAllSuccess;
    constructor(public payload: {
        assets: Array<Asset>;
    }) {}
}

/**
 * Action class Happens when user gets asset by ID.
 */
// tslint:disable-next-line:max-classes-per-file
export class Get implements Action {
  public readonly type: AssetActionTypes = AssetActionTypes.Get;
  constructor(public payload: {
        id: string;
        asset: Asset;
  }) {}
}

/**
 * Action class Happens when user gets asset successfully.
 */
// tslint:disable-next-line:max-classes-per-file
export class GetSuccess implements Action {
    public readonly type: AssetActionTypes = AssetActionTypes.GetSuccess;
    constructor(public payload: {
        id: string;
        asset: Asset;
    }) {}
}

/**
 * Action class Happens when user creates asset.
 */
// tslint:disable-next-line:max-classes-per-file
export class Create implements Action {
    public readonly type: AssetActionTypes = AssetActionTypes.Create;
    constructor(public payload: {
        asset: Asset;
    }) {}
}

/**
 * Action class Happens when the asset is created successfully.
 */
// tslint:disable-next-line: max-classes-per-file
export class CreateSuccess implements Action {
    public readonly type: AssetActionTypes = AssetActionTypes.CreateSuccess;
    constructor(public payload: {
        asset: Asset;
    }) {}
}

/**
 * Action class when user updates asset.
 */
// tslint:disable-next-line:max-classes-per-file
export class Update implements Action {
    public readonly type: AssetActionTypes = AssetActionTypes.Update;
    constructor(public payload: {
        id: string;
        asset: Asset;
    }) {}
}

/**
 * Action class when the asset is updated successfully.
 */
// tslint:disable-next-line:max-classes-per-file
export class UpdateSuccess implements Action {
    public readonly type: AssetActionTypes = AssetActionTypes.UpdateSuccess;
    constructor(public payload: {
        id: string;
        asset: Asset;
    }) {}
}

/**
 * Action class when err is handled.
 */
// tslint:disable-next-line:max-classes-per-file
export class Error implements Action {
    public readonly type: AssetActionTypes = AssetActionTypes.Error;
    constructor(public error: any) {}
}

export type AssetActions = GetAll | GetAllSuccess | Error | Get | GetSuccess | Create | CreateSuccess | Update | UpdateSuccess;
