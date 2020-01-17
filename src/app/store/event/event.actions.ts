import { Action } from '@ngrx/store';
import { Event } from '../../core/models/event/event';

/**
 * Enum for event action types
 */
export enum EventActionTypes {
    GetAll = '[event] GetAll',
    GetAllSuccess = '[event] GetAll Success',
    Get = '[event] Get',
    GetSuccess = '[event] GetSuccess',
    Create = '[event] Create',
    CreateSuccess = '[event] CreateSuccess',
    Update = '[event] Update',
    UpdateSuccess = '[event] UpdateSuccess',
    Error = '[event] Get Error'
}

/**
 * Action class Happens when user getss all events.
 */
export class GetAll implements Action {
    public readonly type: EventActionTypes = EventActionTypes.GetAll;
}

/**
 * Action class Happens when user gets all event.
 */
export class GetAllSuccess implements Action {
    public readonly type: EventActionTypes = EventActionTypes.GetAllSuccess;
    constructor(public payload: {
        events: Array<Event>;
    }) {}
}

/**
 * Action class Happens when user gets event by id.
 */
// tslint:disable-next-line:max-classes-per-file
export class Get implements Action {
    public readonly type: EventActionTypes = EventActionTypes.Get;
    constructor(public payload: {
        id: string;
        event: Event;
    }) {}
}

/**
 * Action class Happens when user gets event by id successfully.
 */
// tslint:disable-next-line:max-classes-per-file
export class GetSuccess implements Action {
    public readonly type: EventActionTypes = EventActionTypes.GetSuccess;
    constructor(public payload: {
        id: string;
        event: Event;
    }) {}
}

/**
 * Action class when user creates event.
 */
// tslint:disable-next-line:max-classes-per-file
export class Create implements Action {
    public readonly type: EventActionTypes = EventActionTypes.Create;
    constructor(public payload: {
        event: Event;
    }) {}
}

/**
 * Action class when event is created successfully.
 */
// tslint:disable-next-line:max-classes-per-file
export class CreateSuccess implements Action {
    public readonly type: EventActionTypes = EventActionTypes.CreateSuccess;
    constructor(public payload: {
        event: Event;
    }) {}
}

/**
 * Action class when user updates event.
 */
// tslint:disable-next-line:max-classes-per-file
export class Update implements Action {
    public readonly type: EventActionTypes = EventActionTypes.Update;
    constructor(public payload: {
        id: string;
        event: Event;
    }) {}
}

/**
 * Action class when event is updated successfully.
 */
// tslint:disable-next-line:max-classes-per-file
export class UpdateSuccess implements Action {
    public readonly type: EventActionTypes = EventActionTypes.UpdateSuccess;
    constructor(public payload: {
        id: string;
        event: Event;
    }) {}
}


/**
 * Action class when err is raised.
 */
// tslint:disable-next-line:max-classes-per-file
export class Error implements Action {
    public readonly type: EventActionTypes = EventActionTypes.Error;
    constructor(public error: any) {}
}

export type EventActions = GetAll | GetAllSuccess | Error | Get | GetSuccess | Create | CreateSuccess | Update | UpdateSuccess;



