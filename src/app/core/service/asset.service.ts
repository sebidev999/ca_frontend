import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Asset } from '../models/asset/asset';

/**
 * The service class to call RESTful api for asset.
 */
@Injectable({
  providedIn: 'root'
})
export class AssetService {
  /**
   * 
   * @param http The http client
   */
  constructor(
    private readonly http: HttpClient
  ) { }

  /**
   * The function to call all asset api.
   */
  public get(): Observable<Array<Asset>> {
    const url = '/assets';
    return this.http.get<Array<Asset>>(url, {});
  }

  /**
   * The function to get asset by id.
   * @param id The asset id
   */
  public getById(id: string): Observable<Asset> {
    const url = `/assets/${id}`;
    return this.http.get<Asset>(url, {});
  }

  /**
   * The function to create/update asset.
   * @param id The asset id
   * @param asset The asset obj
   */
  public post(id: string, asset: Asset = null): Observable<Asset> {
    const url = id ? `/location/${id}` : '/location';
    return of(asset);
  }
}
