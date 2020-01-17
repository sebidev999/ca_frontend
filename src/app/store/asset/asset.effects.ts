import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { switchMap, map, catchError } from 'rxjs/operators';

import * as AssetActions from './asset.actions';
import { AssetService } from '../../core/service/asset.service';
import { Asset } from '../../core/models/asset/asset';

/**
 * Effects class for asset.
 */
@Injectable()
export class AssetEffects {
    /**
     * Getting all assets.
     */
    @Effect()
    public getAllAssets$: Observable<Action> = this.actions$.pipe(
        ofType<AssetActions.GetAll>(AssetActions.AssetActionTypes.GetAll),
        switchMap(() => this.assetService.get().pipe(
            map((res: Array<Asset>) => new AssetActions.GetAllSuccess({
                assets: res
            })),
            catchError(err => of(new AssetActions.Error(err)))
        ))
    );
    /**
     * Creating asset.
     */
    @Effect()
    public createAsset$: Observable<Action> = this.actions$.pipe(
        ofType<AssetActions.Create>(AssetActions.AssetActionTypes.Create),
        map(action => ({
            asset: action.payload.asset
        })),
        switchMap(({asset}) => this.assetService.post('', asset).pipe(
            map((res: Asset) => new AssetActions.CreateSuccess({
                asset: res
            })),
            catchError(err => of(new AssetActions.Error(err)))
        ))
    );

    /**
     * Updating asset.
     */
    @Effect()
    public updateAsset$: Observable<Action> = this.actions$.pipe(
        ofType<AssetActions.Update>(AssetActions.AssetActionTypes.Update),
        map(action => ({
            id: action.payload.id,
            asset: action.payload.asset
        })),
        switchMap(({id, asset}) => this.assetService.post(id, asset).pipe(
            map((res: Asset) => new AssetActions.UpdateSuccess({
                asset: res,
                id
            })),
            catchError(err => of(new AssetActions.Error(err)))
        ))
    );

    /**
     * 
     * @param assetService The asset service
     * @param actions$ The actions observable
     */
    constructor(
        private readonly assetService: AssetService,
        private readonly actions$: Actions,
    ) {}
}
