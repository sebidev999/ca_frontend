import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { Device } from '../models/device/device';

@Injectable({
  providedIn: 'root'
})

/**
 * The service class to call RESTful api for device.
 */
export class DeviceService {

  /**
   *
   * @param http The http client
   */
  constructor(
    private readonly http: HttpClient
  ) {}

  /**
   * Returns all devices.
   */
  public get(): Observable<Array<Device>> {
    const url = '';
    return this.http.get<Array<Device>>(url, {});
  }

  /**
   * Returns device by Id.
   * @param id The device id
   */
  public getById(id: string): Observable<Device> {
    const url = '';
    return this.http.get<Device>(url, {});
  }

  /**
   * Posts device.
   * @param id The device ID
   * @param device THe device Obj
   */
  public post(id: string, device: Device = null): Observable<Device> {
    const url = '';
    return of(device);
  }

  /**
   * Deletes device by ID.
   * @param id The device id
   */
  public del(id: string): Observable<string> {
    const url = '';
    return this.http.delete<string>(url);
  }
}
