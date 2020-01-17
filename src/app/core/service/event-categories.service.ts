import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { EventCategories } from '../models/event/categories';

@Injectable({
  providedIn: 'root'
})
/**
 * The service class to call RESTful api for event category.
 */
export class EventCategoriesService {

  /**
   * 
   * @param http The http client
   */
  constructor(
    private readonly http: HttpClient
  ) { }

  /**
   * Returns all categories.
   */
  public get(): Observable<EventCategories> {
    const url = '/eventCategories';
    return this.http.get<EventCategories>(url, {});
  }

  /**
   * Create/update categories.
   * @param eventCategories The categories 
   */
  public post(eventCategories: EventCategories): Observable<EventCategories> {
    const url = '';
    return of(eventCategories);
  }
}
