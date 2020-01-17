import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { takeUntil } from 'rxjs/operators';
import { Subject, BehaviorSubject } from 'rxjs';
import * as L from 'leaflet';
import { Store } from '@ngrx/store';
import * as guid from 'guid';

import { Location } from '../../../core/models/location/location';
import { AppState } from '../../../store/app.state';
import * as LocationActions from '../../../store/location/location.actions';

import { CancelModalComponent } from '../../../shared/components/cancel-modal/cancel-modal.component';
import { ChangeCheckService } from '../../../core/service/change-check.service';

@Component({
  selector: 'tes-location-modal',
  templateUrl: './location-modal.component.html',
  styleUrls: ['./location-modal.component.scss']
})

/**
 * The component class for location modal.
 */
export class LocationModalComponent implements OnInit, OnDestroy {
  /**
   * The Map reference.
   */
  public map: L.Map;

  /**
   * The modal reference.
   */
  public cancelModalRef: BsModalRef;

  /**
   * The observable variable to unsubscribe.
   */
  private readonly destroy$: Subject<boolean> = new Subject<boolean>();

  /**
   * The location form.
   */
  public locationForm: FormGroup;

  /**
   * The variable to check if the form is submitted.
   */
  public submitted: boolean = false;

  /**
   * The variable to check if the form has changed.
   */
  public hasChanged: boolean;

  /**
   *
   * @param formBuilder The form builder
   * @param bsModalRef The modal reference
   * @param modalService The modal service
   * @param store The app store
   * @param changeCheckService The change check service
   */
  constructor(
    private readonly formBuilder: FormBuilder,
    public bsModalRef: BsModalRef,
    private readonly modalService: BsModalService,
    private readonly store: Store<AppState>,
    private readonly changeCheckService: ChangeCheckService
  ) {
    this.locationForm = this.formBuilder.group({
      id: [''],
      name: ['', Validators.required],
      position: ['']
    });
  }

  public async ngOnInit(): Promise<void> {
    this.map = await this.createMap('map');
    let location$ = new BehaviorSubject(this.locationForm.value).asObservable();

    /**
     * Sets value when user edits the location.
     */
    if (this.modalService.config.initialState.hasOwnProperty('id')) {
      this.locationForm.setValue(this.modalService.config.initialState);
      location$ = new BehaviorSubject(this.locationForm.value).asObservable();
    }

    /**
     * Detects change of location form.
     */
    this.locationForm.valueChanges.pipe(
      takeUntil(this.destroy$),
      this.changeCheckService.changeCheck(location$)
    ).subscribe(
      res => {
        this.hasChanged = res;
      }
    );
  }

  /**
   * Creates map.
   * @param id The map id
   */
  private createMap(id: string): Promise<L.Map> {
    return new Promise((resolve, _) => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          pos => {
            resolve(this.createMapMyCenter(id, [pos.coords.latitude, pos.coords.longitude]));
          }, err => {
            resolve(this.createMapMyCenter(id, [0, 0]));
          }
        );
      }
    });
  }

  /**
   * Creates map with user's position.
   * @param id The map id.
   * @param center The current position.
   */
  private createMapMyCenter(id: string, center: Array<number>): L.Map {
    const map = L.map(id, {
      zoom: 12,
      maxZoom: 18,
      zoomControl: false,
      preferCanvas: true
    }).setView(center, 5);

    /**
     * Adds marker on the user's location.
     */
    navigator.geolocation.getCurrentPosition(
      pos => {
        L.marker([pos.coords.latitude, pos.coords.longitude]).addTo(map);
      }
    );

    L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
      accessToken: 'pk.eyJ1Ijoic2RkZXYxIiwiYSI6ImNpbGI5azBkNDBtcjd0dmtuZjRyY2JwNngifQ.IgAvCatUXFrJr8yZFKNz9w',
      id: 'mapbox.light',
      mapid: 'cimdjyz1400g89qkpojzztcyb',
    }).addTo(map);

    /**
     * Adds marker when user click the map.
     */
    map.on('click', (e)  => {
      new L.marker(e.latlng).addTo(map);
    });

    return map;
  }

  /**
   * Goes to user's location.
   */
  public toMyLocation(): void {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        pos => {
         this.map.panTo([pos.coords.latitude, pos.coords.longitude]);
        }
      );
    }
  }

  /**
   * Cancels modal.
   */
  public abort(): void {
    if (this.hasChanged) {
      this.cancelModalRef = this.modalService.show(CancelModalComponent, {
        keyboard: true
      });
      this.cancelModalRef.content.action.pipe(takeUntil(this.destroy$)).subscribe(() => {
        this.bsModalRef.hide();
      });
    } else {
      this.bsModalRef.hide();
    }
  }

  /**
   * Adds new location.
   */
  public addNewLocation(): void {
    this.submitted = true;
    if (this.locationForm.invalid) {
      return;
    }

    if (this.modalService.config.initialState.hasOwnProperty('id')) {
      const updateLocation = {
        id: this.locationForm.controls.id.value,
        location: this.locationForm.value
      };
      this.store.dispatch(new LocationActions.Update(updateLocation));
    } else {
      const location: Location = {
        id: guid.create().value,
        name: this.locationForm.controls.name.value,
        position: {
          latitude: 0,
          longitude: 0
        }
      };
      this.store.dispatch(new LocationActions.Create({location}));
    }
    this.bsModalRef.hide();
  }

 /**
  * The live cycle hook for destroying this component.
  */
  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.unsubscribe();
  }

  @HostListener('document:keydown.escape', ['$event']) public onKeydownHandler(event: KeyboardEvent): void {
    /**
     * Cancels modal when esc event happens.
     */
    if (!this.cancelModalRef) {
      this.abort();
    } else {
      this.cancelModalRef = undefined;
    }

  }

}
