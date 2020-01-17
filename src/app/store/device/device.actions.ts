import { Action } from '@ngrx/store';
import { Device } from '../../core/models/device/device';

/**
 * Enum for device action types.
 */
export enum DeviceActionTypes {
    GetAll = '[device] GetAll',
    GetAllSuccess = '[device] GetAll Success',
    Get = '[device] Get',
    GetSuccess = '[device] GetSuccess',
    Create = '[device] Create',
    CreateSuccess = '[device] CreateSuccess',
    Update = '[device] Update',
    UpdateSuccess = '[device] UpdateSuccess',
    Delete = '[device] Delete',
    DeleteSuccess = '[device] DeleteSuccess',
    Error = '[device] Get Error'
}

/**
 * Action class Happens when user creates get all device event
 */
export class GetAll implements Action {
    public readonly type: DeviceActionTypes = DeviceActionTypes.GetAll;
}

/**
 * Action class Happens when all device are returned successfully.
 */
export class GetAllSuccess implements Action {
    public readonly type: DeviceActionTypes = DeviceActionTypes.GetAllSuccess;
    constructor(public payload: {
        devices: Array<Device>;
    }) {}
}

/**
 * Action class Happens when user creates geting device event with id.
 */
// tslint:disable-next-line:max-classes-per-file
export class Get implements Action {
    public readonly type: DeviceActionTypes = DeviceActionTypes.Get;
    constructor(public payload: {
        id: string;
        device: Device;
    }) {}
}

/**
 * Action class Happens when the device is returned successfully by id.
 */
// tslint:disable-next-line:max-classes-per-file
export class GetSuccess implements Action {
    public readonly type: DeviceActionTypes = DeviceActionTypes.GetSuccess;
    constructor(public payload: {
        id: string;
        device: Device;
    }) {}
}

/**
 * Action class Happens when user create creating device event.
 */
// tslint:disable-next-line:max-classes-per-file
export class Create implements Action {
    public readonly type: DeviceActionTypes = DeviceActionTypes.Create;
    constructor(public payload: {
        device: Device;
    }) {}
}

/**
 * Action class Happens when device is created successfully.
 */
// tslint:disable-next-line:max-classes-per-file
export class CreateSuccess implements Action {
    public readonly type: DeviceActionTypes = DeviceActionTypes.CreateSuccess;
    constructor(public payload: {
        device: Device;
    }) {}
}

/**
 * Action class - Happens when user creates updating device event.
 */
// tslint:disable-next-line:max-classes-per-file
export class Update implements Action {
    public readonly type: DeviceActionTypes = DeviceActionTypes.Update;
    constructor(public payload: {
        id: string;
        device: Device;
    }) {}
}

/**
 * Action class Happens when the device is updated successfully.
 */
// tslint:disable-next-line:max-classes-per-file
export class UpdateSuccess implements Action {
    public readonly type: DeviceActionTypes = DeviceActionTypes.UpdateSuccess;
    constructor(public payload: {
        id: string;
        device: Device;
    }) {}
}

/**
 * Action class Happens when user deletes the device.
 */
// tslint:disable-next-line:max-classes-per-file
export class Delete implements Action {
    public readonly type: DeviceActionTypes = DeviceActionTypes.Delete;
    constructor(public payload: {
        device: Device;
    }) {}
}

/**
 * Action Class Happens when the device is deleted successfully.
 */
// tslint:disable-next-line:max-classes-per-file
export class DeleteSuccess implements Action {
    public readonly type: DeviceActionTypes = DeviceActionTypes.DeleteSuccess;
    constructor(public payload: {
        device: Device;
    }) {}
}

/**
 * Action class Happens when error is raised.
 */
// tslint:disable-next-line:max-classes-per-file
export class Error implements Action {
    public readonly type: DeviceActionTypes = DeviceActionTypes.Error;
    constructor(public error: any) {}
}

export type DeviceActions = Get | GetSuccess | GetAll | GetAllSuccess | Create | CreateSuccess | Update | UpdateSuccess
  | Delete | DeleteSuccess | Error;
