import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { switchMap, map, catchError } from 'rxjs/operators';

import * as DeviceActions from './device.actions';
import { DeviceService } from '../../core/service/device.service';
import { Device } from '../../core/models/device/device';

/**
 * Effects class for device.
 */
@Injectable()
export class DeviceEffects {
    /**
     * Getting all Device.
     */
    @Effect()
    public getAllDevices$: Observable<Action> = this.actions$.pipe(
        ofType<DeviceActions.GetAll>(DeviceActions.DeviceActionTypes.GetAll),
        switchMap(() => this.deviceService.get().pipe(
            map((res: Array<Device>) => new DeviceActions.GetAllSuccess({
                devices: res
            })),
            catchError(err => of(new DeviceActions.Error(err)))
        ))
    );

    /**
     * Creating device.
     */
    @Effect()
    public createDevice$: Observable<Action> = this.actions$.pipe(
        ofType<DeviceActions.Create>(DeviceActions.DeviceActionTypes.Create),
        map(action => ({
            device: action.payload.device
        })),
        switchMap(({device}) => this.deviceService.post('', device).pipe(
            map((res: Device) => new DeviceActions.CreateSuccess({
                device: res
            })),
            catchError(err => of(new DeviceActions.Error(err)))
        ))
    );

    /**
     * Updating device.
     */
    @Effect()
    public updateDevice$: Observable<Action> = this.actions$.pipe(
        ofType<DeviceActions.Update>(DeviceActions.DeviceActionTypes.Update),
        map(action => ({
            id: action.payload.id,
            device: action.payload.device
        })),
        switchMap(({id, device}) => this.deviceService.post(id, device).pipe(
            map((res: Device) => new DeviceActions.UpdateSuccess({
                device: res,
                id
            }))
        )),
        catchError(err => of(new DeviceActions.Error(err)))
    );

    /**
     * Deleting device.
     */
    @Effect()
    public deleteDevice$: Observable<Action> = this.actions$.pipe(
        ofType<DeviceActions.Delete>(DeviceActions.DeviceActionTypes.Delete),
        map(action => ({
            device: action.payload.device
        })),
        switchMap(({device}) => this.deviceService.post(device.id, device).pipe(
            map((res: Device) => new DeviceActions.DeleteSuccess({
                device: res
            }))
        )),
        catchError(err => of(new DeviceActions.Error(err)))
    );

    /**
     * 
     * @param deviceService The device servie
     * @param actions$ The actions observable
     */
    constructor(
        private readonly deviceService: DeviceService,
        private readonly actions$: Actions
    ) {}
}
