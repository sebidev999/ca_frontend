import { Action } from '@ngrx/store';
import { Location } from '../../core/models/location/location';

/**
 * The enum for location action types.
 */
export enum LocationActionTypes {
    GetAll = '[location] GetAll',
    GetAllSuccess = '[location] GetAll Success',
    Get = '[location] Get',
    GetSuccess = '[location] GetSuccess',
    Create = '[location] Create',
    CreateSuccess = '[location] CreateSuccess',
    Update = '[location] Update',
    UpdateSuccess = '[location] UpdateSuccess',
    Delete = '[location] Delete',
    DeleteSuccess = '[location] DeleteSuccess',
    Error = '[location] Get Error'
}

/**
 * Action class Happens when user gets all location.
 */
export class GetAll implements Action {
    public readonly type: LocationActionTypes = LocationActionTypes.GetAll;
}

/**
 * Action class Happens when user gets all location successfully.
 */
export class GetAllSuccess implements Action {
    public readonly type: LocationActionTypes = LocationActionTypes.GetAllSuccess;
    constructor(public payload: {
        locations: Array<Location>;
    }) {}
}

/**
 * Action class Happens when user gets loaction by Id.
 */
// tslint:disable-next-line:max-classes-per-file
export class Get implements Action {
    public readonly type: LocationActionTypes = LocationActionTypes.Get;
    constructor(public payload: {
        id: string;
        location: Location;
    }) {}
}

/**
 * Action class Happens when user gets location by id successfully.
 */
// tslint:disable-next-line:max-classes-per-file
export class GetSuccess implements Action {
    public readonly type: LocationActionTypes = LocationActionTypes.GetSuccess;
    constructor(public payload: {
        id: string;
        location: Location;
    }) {}
}

/**
 * Action class Happens when user creates location.
 */
// tslint:disable-next-line:max-classes-per-file
export class Create implements Action {
    public readonly type: LocationActionTypes = LocationActionTypes.Create;
    constructor(public payload: {
        location: Location;
    }) {}
}

/**
 * Action class Happens when location is created successfully.
 */
// tslint:disable-next-line:max-classes-per-file
export class CreateSuccess implements Action {
    public readonly type: LocationActionTypes = LocationActionTypes.CreateSuccess;
    constructor(public payload: {
        location: Location;
    }) {}
}

/**
 * Action class Happens when user updates location.
 */
// tslint:disable-next-line:max-classes-per-file
export class Update implements Action {
    public readonly type: LocationActionTypes = LocationActionTypes.Update;
    constructor(public payload: {
        id: string;
        location: Location;
    }) {}
}


/**
 * Action class Happens when location is updated successfully.
 */
// tslint:disable-next-line:max-classes-per-file
export class UpdateSuccess implements Action {
    public readonly type: LocationActionTypes = LocationActionTypes.UpdateSuccess;
    constructor(public payload: {
        id: string;
        location: Location;
    }) {}
}

/**
 * Action class Happens when user delete location.
 */
// tslint:disable-next-line:max-classes-per-file
export class Delete implements Action {
    public readonly type: LocationActionTypes = LocationActionTypes.Delete;
    constructor(public payload: {
        id: string;
    }) {}
}


/**
 * Action class when location is deleted successfully.
 */
// tslint:disable-next-line:max-classes-per-file
export class DeleteSuccess implements Action {
    public readonly type: LocationActionTypes = LocationActionTypes.DeleteSuccess;
    constructor(public payload: {
        id: string;
    }) {}
}

/**
 * Action class when err is raised.
 */
// tslint:disable-next-line:max-classes-per-file
export class Error implements Action {
    public readonly type: LocationActionTypes = LocationActionTypes.Error;
    constructor(public error: any) {}
}

export type LocationActions = GetAll | GetAllSuccess | Error | Get | GetSuccess | Create | CreateSuccess | Update | UpdateSuccess |
 DeleteSuccess;
