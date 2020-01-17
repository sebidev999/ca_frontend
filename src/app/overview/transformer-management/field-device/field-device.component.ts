import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { Subject, BehaviorSubject } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { takeUntil } from 'rxjs/operators';
import { Store, select } from '@ngrx/store';
import * as DeviceActions from '../../../store/device/device.actions';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { DeviceModalComponent } from '../device-modal/device-modal.component';
import { AppState } from '../../../store/app.state';
import * as fromDevice from '../../../store/device/device.reducer';
import { Device } from 'src/app/core/models/device/device';
import { CancelModalComponent } from 'src/app/shared/components/cancel-modal/cancel-modal.component';
import { DropdownOption } from 'src/app/shared/components/dropdown/dropdown';
import { ChangeCheckService } from '../../../core/service/change-check.service';

@Component({
  selector: 'tes-field-device',
  templateUrl: './field-device.component.html',
  styleUrls: ['./field-device.component.scss']
})
export class FieldDeviceComponent implements OnInit, OnDestroy {
  /**
   * The modal ref.
   */
  public bsModalRef: BsModalRef;

  /**
   * The observable variable to unsubscribe.
   */
  private readonly destroy$: Subject<boolean> = new Subject<boolean>();

  /**
   * The selected asset id.
   */
  private selectedAssetId: string;

  /**
   * Devices array.
   */
  public devices: Array<Device> = [];

  /**
   * The variable for modal reference.
   */
  public cancelModalRef: BsModalRef;

  /**
   * The field device form.
   */
  public fieldDeviceForm: FormGroup;

  /**
   * The variable to check if the form has changed.
   */
  public hasChanged: boolean;

  /**
   * The variable to check if the form is submitted.
   */
  public submitted: boolean = false;

  /**
   * The select optins(mock) for dropdown.
   */
  public selectOptions: Array<DropdownOption> = [
    {
      id: 'Bitte auswählen',
      name: 'Bitte auswählen'
    }, {
      id: 'Trafoguard ISM 130',
      name: 'Trafoguard ISM 130'
    }, {
      id: 'Funktion deaktiviert',
      name: 'Funktion deaktiviert'
    }
  ];

  /**
   *
   * @param modalService The modal service
   * @param route The Route
   * @param store The Store
   * @param router The Router
   * @param formBuilder The form builder
   * @param changeCheckService The change check service
   */
  constructor(
    private readonly modalService: BsModalService,
    private readonly route: ActivatedRoute,
    private readonly store: Store<AppState>,
    private readonly router: Router,
    private readonly formBuilder: FormBuilder,
    private readonly changeCheckService: ChangeCheckService
  ) {}

  /**
   * The live cycle hook for initializing this component.
   */
  public ngOnInit(): void {
    this.fieldDeviceForm = this.formBuilder.group({
      dissolved: ['', Validators.required],
      stepMonitoring: ['', Validators.required],
      coolingSystem1: ['', Validators.required],
      coolingSystem2: ['', Validators.required],
      coolingSystem3: ['', Validators.required],
      bushing1: ['', Validators.required],
      bushing2: ['', Validators.required],
      assetCard1: ['', Validators.required],
      assetCard2: ['', Validators.required],
      assetCard3: ['', Validators.required],
      resourceOverview: ['', Validators.required]
    });

    const fieldDevice$ = new BehaviorSubject(this.fieldDeviceForm.value).asObservable();

    this.fieldDeviceForm.valueChanges.pipe(
      takeUntil(this.destroy$),
      this.changeCheckService.changeCheck(fieldDevice$)
    ).subscribe(
      res => {
        this.hasChanged = res;
      }
    );

    this.route.params.pipe(takeUntil(this.destroy$)).subscribe((params: { id: string }) => {
      this.selectedAssetId = params.id;
    });

    this.store.pipe(
      select(fromDevice.getDevices),
      takeUntil(this.destroy$)
    ).subscribe(
      devices => {
        this.devices = devices;
      }
    );
  }

  /**
   * Opens the adding device modal.
   */
  public openDeviceModal(): void {
    const initialState = this.selectedAssetId;

    this.bsModalRef = this.modalService.show(DeviceModalComponent, { class: 'gray modal-lg', initialState });
  }

  /**
   * The live cycle hook for destroying this component.
   */
  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.unsubscribe();
  }

  /**
   * Deleting device.
   */
  public deleteDevice(device: Device): void {
    this.store.dispatch(new DeviceActions.Delete({device}));
  }

  /**
   * Editing device.
   */
  public editDevice(device: Device): void {
    const initialState = device;
    this.bsModalRef = this.modalService.show(DeviceModalComponent, { class: 'gray modal-lg', initialState });
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

  /**
   * Set the dropdown value.
   * @param field The field name
   * @param value The changed dropdown value
   */
  public onValueChanged(field: string, value: string): void {
    this.fieldDeviceForm.controls[field].setValue(value);
  }
}
