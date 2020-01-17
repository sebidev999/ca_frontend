import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { switchMap, map, catchError } from 'rxjs/operators';

import * as EventCategoryActions from './event-categories.actions';
import { EventCategoriesService } from '../../core/service/event-categories.service';
import { EventCategories } from '../../core/models/event/categories';

@Injectable()
/**
 * The effects class for category.
 */
export class EventCategoryEffects {
    /**
     * Getting all categories.
     */
    @Effect()
    public getEventCategories$: Observable<Action> = this.actions$.pipe(
        ofType<EventCategoryActions.Get>(EventCategoryActions.EventCategoryTypes.Get),
        switchMap(() => this.eventCategoryService.get().pipe(
            map((res: EventCategories) => new EventCategoryActions.GetSuccess({
                eventCategories: res
            })),
            catchError(err => of(new EventCategoryActions.Error(err)))
        ))
    );

    /**
     * Updating category.
     */
    @Effect()
    public updateEventCategories$: Observable<Action> = this.actions$.pipe(
        ofType<EventCategoryActions.Update>(EventCategoryActions.EventCategoryTypes.Update),
        map(action => ({
            eventCategories: action.payload.eventCategories
        })),
        switchMap(({ eventCategories }) => this.eventCategoryService.post(eventCategories).pipe(
            map((res: EventCategories) => new EventCategoryActions.UpdateSuccess({
                eventCategories: res
            }))
        )),
        catchError(err => of(new EventCategoryActions.Error(err)))
    );

    /**
     * 
     * @param eventCategoryService The event category service
     * @param actions$ The action observable
     */
    constructor(
        private readonly eventCategoryService: EventCategoriesService,
        private readonly actions$: Actions
    ) {}
}
