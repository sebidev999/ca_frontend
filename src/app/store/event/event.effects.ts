import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { switchMap, map, catchError } from 'rxjs/operators';

import * as EventActions from './event.actions';
import { EventService } from '../../core/service/event.service';
import { Event } from '../../core/models/event/event';

/**
 * Effects class for event.
 */
@Injectable()
export class EventEffects {
    /**
     * Getting all events.
     */
    @Effect()
    public getAllEvents$: Observable<Action> = this.actions$.pipe(
        ofType<EventActions.GetAll>(EventActions.EventActionTypes.GetAll),
        switchMap(() => this.eventService.get().pipe(
            map((res: Array<Event>) => new EventActions.GetAllSuccess({
                events: res
            })),
            catchError(err => of(new EventActions.Error(err)))
        ))
    );

    /**
     * Creating event.
     */
    @Effect()
    public createEvent$: Observable<Action> = this.actions$.pipe(
        ofType<EventActions.Create>(EventActions.EventActionTypes.Create),
        map(action => ({
            event: action.payload.event
        })),
        switchMap(({event}) => this.eventService.post('', event).pipe(
            map((res: Event ) => new EventActions.CreateSuccess({
                event: res
            })),
            catchError(err => of(new EventActions.Error(err)))
        ))
    );

    /**
     * Updating event.
     */
    @Effect()
    public updateEvent$: Observable<Action> = this.actions$.pipe(
        ofType<EventActions.Update>(EventActions.EventActionTypes.Update),
        map(action => ({
            id: action.payload.id,
            event: action.payload.event
        })),
        switchMap(({id, event}) => this.eventService.post(id, event).pipe(
            map((res: Event) => new EventActions.UpdateSuccess({
                event: res,
                id
            })),
            catchError(err => of(new EventActions.Error(err)))
        ))
    );

    /**
     * 
     * @param eventService The event service
     * @param actions$ The actions observable
     */
    constructor(
        private readonly eventService: EventService,
        private readonly actions$: Actions,
    ) {}
}
