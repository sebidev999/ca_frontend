import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { combineLatest, debounceTime, startWith, map } from 'rxjs/operators';
import * as lodash from 'lodash';

/**
 * The service class to detect the change of form value.
 */
@Injectable({
  providedIn: 'root'
})
export class ChangeCheckService {
  /**
   * The function to detect the change of form value.
   * @param source The source data
   */
  public changeCheck<U>(source: Observable<U>): <T>(valueChanges: Observable<T>) => Observable<boolean> {
    return function<T>(valueChanges: Observable<T>): Observable<boolean> {

      return source.pipe(
        combineLatest(valueChanges),
        debounceTime(300),
        map(([a, b]) => !lodash.isEqual(a, b)),
        startWith(false),
      );
    };
  }
}
