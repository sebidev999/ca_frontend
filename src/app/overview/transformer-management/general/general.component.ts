import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { Subject, BehaviorSubject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import * as guid from 'guid';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

import { Asset } from '../../../core/models/asset/asset';
import { AppState } from '../../../store/app.state';
import * as AssetActions from '../../../store/asset/asset.actions';
import * as fromAsset from '../../../store/asset/asset.reducer';

import { Location } from '../../../core/models/location/location';
import * as fromLocation from '../../../store/location/location.reducer';

import { LocationModalComponent } from '../location-modal/location-modal.component';
import { ChangeCheckService } from '../../../core/service/change-check.service';
import { CancelModalComponent } from 'src/app/shared/components/cancel-modal/cancel-modal.component';

@Component({
  selector: 'tes-general',
  templateUrl: './general.component.html',
  styleUrls: ['./general.component.scss']
})

/**
 * The component class for general page
 */
export class GeneralComponent implements OnInit, OnDestroy {
  /**
   * The asset add form.
   */
  public assetAddForm: FormGroup;

  /**
   * The variable to check if the form is submitted.
   */
  public submitted: boolean = false;

  /**
   * The observable variable to unsubscribe.
   */
  private readonly destroy$: Subject<boolean> = new Subject<boolean>();

  /**
   * The variable to check if the form has changed.
   */
  public hasChanged: boolean;

  /**
   * The assets array.
   */
  public assets: Array<Asset> = [];

  /**
   * The locations array.
   */
  public locations: Array<Location> = [];

  /**
   * The selected asset id.
   */
  public selectedAssetId: string;

  /**
   * The modal ref.
   */
  public bsModalRef: BsModalRef;

  /**
   * The variable for modal reference.
   */
  public cancelModalRef: BsModalRef;

  /**
   *
   * @param router The router
   * @param formBuilder The form builder
   * @param route The route
   * @param store The app store
   * @param modalService The modal service
   * @param changeCheckService The change check service
   */
  constructor(
    private readonly router: Router,
    private readonly formBuilder: FormBuilder,
    private readonly route: ActivatedRoute,
    private readonly store: Store<AppState>,
    private readonly modalService: BsModalService,
    private readonly changeCheckService: ChangeCheckService
    ) {
  }

  /**
   * The live cycle hook for initializing this component.
   */
  public ngOnInit(): void {
    this.assetAddForm = this.formBuilder.group({
      id: [''],
      operator: ['', Validators.required],
      location: ['', Validators.required],
      transformerName: ['', Validators.required],
      number: ['', [Validators.required]],
      manufacturer: ['', Validators.required],
      serialNumber: ['', Validators.required],
      yearOfManufacture: ['', Validators.required],
      maximumPower: ['', Validators.required],
      nominalTensionHv: ['', Validators.required],
      nominalTensionLv: ['', Validators.required],
      typeDesignation: ['', Validators.required],
      tapChangerSerialNumber: ['', Validators.required],
      tapChangerManufacture: ['', Validators.required],
    });

    this.prepareData();

    let asset$ = new BehaviorSubject(this.assetAddForm.value).asObservable();

    this.route.params.pipe(takeUntil(this.destroy$)).subscribe((params: { id: string}) => {
      const id = params.id;
      this.selectedAssetId = id;

      if (id) {
        /**
         * Sets the form value when user edits asset.
         */
        this.store.pipe(select(fromAsset.getAssetById, { id }), takeUntil(this.destroy$)).subscribe(asset => {
          if (asset) {
            this.setAssetValue(asset);
            asset$ = new BehaviorSubject(asset).asObservable();
          }
        });
      }
    });

    /**
     * Detects the change of asset form.
     */
    this.assetAddForm.valueChanges.pipe(
      takeUntil(this.destroy$),
      this.changeCheckService.changeCheck(asset$)
    ).subscribe(
      res => {
        this.hasChanged = res;
      }
    );
  }

  /**
   * Saves the asset settings.
   */
  public onSubmit(): void {
    this.submitted = true;
    if (this.assetAddForm.invalid) {
      return;
    }
    const asset: Asset = {
      ...this.assetAddForm.value,
      id: this.selectedAssetId ? this.selectedAssetId : guid.create().value
    };

    if (this.selectedAssetId) {
      const updatedAsset = {
        id: this.selectedAssetId,
        asset
      };
      this.store.dispatch(new AssetActions.Update(updatedAsset));

    } else {
      this.store.dispatch(new AssetActions.Create({asset}));
    }
    this.router.navigate([`/overview/transformer-management`]).then();
  }

  /**
   * Gets control of asset form.
   */
  get assetAddFormControls(): { [key: string]: AbstractControl } { return this.assetAddForm.controls; }

  /**
   * Sets form values.
   * @param value: The asset settings.
   */
  public setAssetValue(value: Asset): void {
    this.assetAddForm.setValue(value);
  }

  /**
   * The live cycle hook for destroying this component.
   */
  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.unsubscribe();
  }

  /**
   * Opens add location modal.
   */
  public addNewLocation(): void {
    this.bsModalRef = this.modalService.show(LocationModalComponent, {class: 'gray modal-lg'});
  }

  /**
   * Edits the current location information.
   * @param locationName The location name.
   */
  public editLocation(locationName: string): void {
    const initialState = {
      ...this.locations.find(location => location.name === locationName)
    };

    this.bsModalRef = this.modalService.show(LocationModalComponent, {  class: 'gray modal-lg', initialState });
  }

  /**
   * Gets assets and location.
   */
  public prepareData(): void {
    this.store.pipe(
      select(fromAsset.getAssets),
      takeUntil(this.destroy$)
    ).subscribe(assets => {
      this.assets = assets;
    });

    this.store.pipe(
      select(fromLocation.getLocations),
      takeUntil(this.destroy$)
    ).subscribe(locations => {
      this.locations = locations;
      this.assetAddForm.controls.location.setValue(this.locations.length ? this.locations[this.locations.length - 1].name : '');
    });
  }

  /**
   * Function to get location information from dropdown list.
   * @param value The location name
   */
  public onLocationChanged(value: string): void {
    if (value === 'addNewLocation') {
      this.addNewLocation();
      this.assetAddForm.controls.location.setValue(this.locations.length ? this.locations[this.locations.length - 1].name : '');
    } else {
      this.assetAddForm.controls.location.setValue(value);
    }
  }

  /**
   * 
   * @param event ESC key event
   */
  @HostListener('document:keydown.escape', ['$event']) public onKeydownHandler(event: KeyboardEvent): void {
    if (this.hasChanged) {
      if (!this.cancelModalRef) {
        this.cancelModalRef = this.modalService.show(CancelModalComponent, {
          keyboard: true
        });
        this.cancelModalRef.content.action.pipe(takeUntil(this.destroy$)).subscribe(() => {
          this.router.navigate([`/overview/transformer-management/assets`]).then();
        });
      } else {
        this.cancelModalRef = undefined;
      }
    } else {
      this.router.navigate([`/overview/transformer-management/assets`]).then();
    }
  }
}
