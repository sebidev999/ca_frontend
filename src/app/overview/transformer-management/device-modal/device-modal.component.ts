import { Component, OnInit, OnDestroy, HostListener, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { takeUntil } from 'rxjs/operators';
import { Subject, BehaviorSubject } from 'rxjs';
import { FormGroup, AbstractControl, FormBuilder, Validators } from '@angular/forms';
import * as guid from 'guid';
import { Store } from '@ngrx/store';

import { AppState } from '../../../store/app.state';
import * as DeviceActions from '../../../store/device/device.actions';
import { CancelModalComponent } from '../../../shared/components/cancel-modal/cancel-modal.component';
import { DropdownOption } from '../../../shared/components/dropdown/dropdown';
import { ChangeCheckService } from '../../../core/service/change-check.service';
import { Device } from 'src/app/core/models/device/device';

@Component({
  selector: 'tes-device-modal',
  templateUrl: './device-modal.component.html',
  styleUrls: ['./device-modal.component.scss']
})

/**
 * The component class for device modal.
 */
export class DeviceModalComponent implements OnInit, OnDestroy, AfterViewInit {
  /**
   * The name field element reference.
   */
  @ViewChild('name', { static: false}) public name: ElementRef;

  /**
   * The modal reference.
   */
  public cancelModalRef: BsModalRef;

  /**
   * The observable variable to unsubscribe.
   */
  private readonly destroy$: Subject<boolean> = new Subject<boolean>();

  /**
   * The variable to check if the form has changed.
   */
  public hasChanged: boolean;

  /**
   * The device form.
   */
  public deviceForm: FormGroup;

  /**
   * The variable to check the form is submitted.
   */
  public submitted: boolean = false;

  /**
   * The device ids.
   */
  public deviceIds: Array<DropdownOption> = [];

  /**
   *
   * @param bsModalRef The modal reference
   * @param modalService The modal service
   * @param formBuilder The form builder
   * @param changeCheckService The change check service
   * @param store The store
   */
  constructor(
    public bsModalRef: BsModalRef,
    private readonly modalService: BsModalService,
    private readonly formBuilder: FormBuilder,
    private readonly changeCheckService: ChangeCheckService,
    private readonly store: Store<AppState>
  ) { }

  public ngOnInit(): void {
    this.deviceForm = this.formBuilder.group({
      id: [''],
      name: ['',  Validators.required],
      assetId: [''],
      deviceId: ['', Validators.required]
    });

    let device$ = new BehaviorSubject(this.deviceForm.value).asObservable();

    /**
     * Sets the device form when user edits it.
     */
    if (this.modalService.config.initialState.hasOwnProperty('id')) {
      this.deviceForm.setValue(this.modalService.config.initialState);
      device$ = new BehaviorSubject(this.deviceForm.value).asObservable();
    }

    /**
     * Detects the change of device form
     */
    this.deviceForm.valueChanges.pipe(
      takeUntil(this.destroy$),
      this.changeCheckService.changeCheck(device$)
    ).subscribe(
      res => {
        this.hasChanged = res;
      }
    );

    this.deviceIds = this.getDeviceIDs();
  }

  /**
   * The live cycle hook for view initializing this component.
   */
  public ngAfterViewInit(): void {
    setTimeout(() => { this.name.nativeElement.focus(); });
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
   * The live cycle hook for destroying this component.
   */
  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.unsubscribe();
  }

  /**
   * HostListener: Happens when users presses ESC key.
   */
  @HostListener('document:keydown.escape', ['$event']) public onKeydownHandler(event: KeyboardEvent): void {
    if (!this.cancelModalRef) {
      this.abort();
    } else {
      this.cancelModalRef = undefined;
    }
  }

  /**
   * Gets the control of device form.
   */
  get deviceFormControls(): { [key: string]: AbstractControl } { { return this.deviceForm.controls; }}

  /**
   * Submits the form.
   */
  public onSubmit(): void {
    this.submitted = true;

    if (this.deviceForm.invalid) {
      return;
    }

    if (this.modalService.config.initialState.hasOwnProperty('id')) {
      const updateDevice = {
        id: this.deviceForm.controls.id.value,
        device: this.deviceForm.value
      };
      this.store.dispatch(new DeviceActions.Update(updateDevice));
    } else {
      const device: Device = {
        ...this.deviceForm.value,
        id: guid.create().value,
        assetId: this.modalService.config.initialState
      };
      this.store.dispatch(new DeviceActions.Create({device}));
    }

    this.bsModalRef.hide();
  }

  /**
   * Sets the device id.
   */
  public onDeviceIdChange(value: string): void {
    this.deviceForm.controls.deviceId.setValue(value);
  }

  /**
   * Fills DeviceIDs(Mock).
   */
  private getDeviceIDs(): Array<DropdownOption> {
    return [{
      id: guid.create().value,
      name: 'DeviceID0'
    }, {
      id: guid.create().value,
      name: 'DeviceID1'
    }];
  }
}
