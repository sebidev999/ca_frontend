import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { Location } from '../models/location/location';

/**
 * The service class to call RESTful api for location.
 */
@Injectable({
  providedIn: 'root'
})
export class LocationService {

  /**
   * 
   * @param http The http client
   */
  constructor(
    private readonly http: HttpClient
  ) { }

  /**
   * The function to get all locations.
   */
  public get(): Observable<Array<Location>> {
    const url = '/locations';
    return this.http.get<Array<Location>>(url, {});
  }

  /**
   * The function to get location by id
   * @param id The location id
   */
  public getById(id: string): Observable<Location> {
    const url = `/location/${id}`;
    return this.http.get<Location>(url, {});
  }

  /**
   * The function to create/update location.
   * @param id The location id
   * @param location The location obj
   */
  public post(id: string, location: Location = null): Observable<Location> {
    const url = id ? `/location/${id}` : '/location';
    return of(location);
  }

  /**
   * The function to delete location with ID.
   * @param id The location id
   */
  public del(id: string): Observable<string> {
    const url = `/location/${id}`;
    return this.http.delete<string>(url);
  }
}
