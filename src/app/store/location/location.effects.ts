import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { switchMap, map, catchError } from 'rxjs/operators';

import * as LocationActions from './location.actions';
import { LocationService } from '../../core/service/location.service';

/**
 * The effects class for location.
 */
@Injectable()
export class LocationEffects {
    /**
     * Getting all locations.
     */
    @Effect()
    public getAllLocations$: Observable<Action> = this.actions$.pipe(
        ofType<LocationActions.GetAll>(LocationActions.LocationActionTypes.GetAll),
        switchMap(() => this.locationService.get().pipe(
            map(res => new LocationActions.GetAllSuccess({
                locations: res
            })),
            catchError(err => of(new LocationActions.Error(err)))
        ))
    );

    /**
     * Getting locatin by Id.
     */
    @Effect()
    public getLocation$: Observable<Action> = this.actions$.pipe(
        ofType<LocationActions.Get>(LocationActions.LocationActionTypes.Get),
        map(action => action.payload.id),
        switchMap((id) => this.locationService.getById(id).pipe(
            map(res => new LocationActions.GetSuccess({
                location: res,
                id,
            })),
            catchError(err => of(new LocationActions.Error(err)))
        ))
    );

    /**
     * Creating location.
     */
    @Effect()
    public createLocation$: Observable<Action> = this.actions$.pipe(
        ofType<LocationActions.Create>(LocationActions.LocationActionTypes.Create),
        map(action => ({
            location: action.payload.location
        })),
        switchMap(({location}) => this.locationService.post('', location).pipe(
            map(res => new LocationActions.CreateSuccess({
                location: res
            })),
            catchError(err => of(new LocationActions.Error(err)))
        ))
    );

    /**
     * Updating location.
     */
    @Effect()
    public updateLocation$: Observable<Action> = this.actions$.pipe(
        ofType<LocationActions.Update>(LocationActions.LocationActionTypes.Update),
        map(action => ({
            id: action.payload.id,
            location: action.payload.location
        })),
        switchMap(({id, location}) => this.locationService.post(id, location).pipe(
            map(res => new LocationActions.UpdateSuccess({
                location: res,
                id
            })),
            catchError(err => of(new LocationActions.Error(err)))
        ))
    );

    /**
     * Deleting location.
     */
    @Effect()
    public deleteLocation$: Observable<Action> = this.actions$.pipe(
        ofType<LocationActions.Delete>(LocationActions.LocationActionTypes.Delete),
        map(action => ({
            id: action.payload.id
        })),
        switchMap(({id}) => this.locationService.del(id).pipe(
            map(res => new LocationActions.DeleteSuccess({
                id: res
            })),
            catchError(err => of(new LocationActions.Error(err)))
        ))
    );

    /**
     * 
     * @param locationService The location service
     * @param actions$ The actions observable
     */
    constructor(
        private readonly locationService: LocationService,
        private readonly actions$: Actions,
    ) {}
}
