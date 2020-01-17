import { Action } from '@ngrx/store';
import { EventCategories } from '../../core/models/event/categories';

/**
 * The enum for EventCategory action types.
 */
export enum EventCategoryTypes {
  Get = '[eventCategories] Get',
  GetSuccess = '[eventCategories] Get Success',
  Update = '[eventCategories] Update',
  UpdateSuccess = '[eventCategories] UpdateSuccess',
  Error = '[eventCategories] Get Error'
}

/**
 * Action class Happens when user gets all categories.
 */
export class Get implements Action {
    public readonly type: EventCategoryTypes = EventCategoryTypes.Get;
}

/**
 * Action class Happens when user gets all categories successfully.
 */
export class GetSuccess implements Action {
    public readonly type: EventCategoryTypes = EventCategoryTypes.GetSuccess;
    constructor(public payload: {
        eventCategories: EventCategories;
    }) {}
}

/**
 * Action class when user updates category.
 */
// tslint:disable-next-line:max-classes-per-file
export class Update implements Action {
    public readonly type: EventCategoryTypes = EventCategoryTypes.Update;
    constructor(public payload: {
        eventCategories: EventCategories;
    }) {}
}

/**
 * Action class when category is updated successfully.
 */
// tslint:disable-next-line:max-classes-per-file
export class UpdateSuccess implements Action {
    public readonly type: EventCategoryTypes = EventCategoryTypes.UpdateSuccess;
    constructor(public payload: {
        eventCategories: EventCategories;
    }) {}
}

/**
 * Action class when err is raised.
 */
// tslint:disable-next-line:max-classes-per-file
export class Error implements Action {
    public readonly type: EventCategoryTypes = EventCategoryTypes.Error;
    constructor(public error: any) {}
}

export type EventCategoryActions = Get | GetSuccess | Error | Update | UpdateSuccess;
