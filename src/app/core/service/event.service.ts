import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { Event } from '../../core/models/event/event';

/**
 * The service class to call RESTful for event.
 */
@Injectable({
  providedIn: 'root'
})
export class EventService {

  /**
   *
   * @param http The http client
   */
  constructor(
    private readonly http: HttpClient
  ) { }

  /**
   * Returns all events.
   */
  public get(): Observable<Array<Event>> {
    const url = '';
    return this.http.get<Array<Event>>(url, {});
  }

  /**
   * The function to get event by id.
   * @param id The event id
   */
  public getById(id: string): Observable<Event> {
    const url = '';
    return this.http.get<Event>(url, {});
  }

  /**
   * The function to create/update event.
   * @param id The event id
   * @param event The event obj
   */
  public post(id: string, event: Event = null): Observable<Event> {
    const url = '';
    return of(event);
  }

  /**
   * The function to delete event with id.
   * @param id The event id
   */
  public del(id: string): Observable<string> {
    const url = '';
    return this.http.delete<string>(url);
  }
}
