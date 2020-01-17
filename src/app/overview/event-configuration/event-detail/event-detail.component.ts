import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';
import { Subject, BehaviorSubject } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { takeUntil } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { Location } from '@angular/common';

import * as fromEvent from '../../../store/event/event.reducer';
import { AppState } from '../../../store/app.state';
import { Event } from '../../../core/models/event/event';
import * as EventActions from '../../../store/event/event.actions';
import { ChangeCheckService } from '../../../core/service/change-check.service';
import { CancelModalComponent } from '../../../shared/components/cancel-modal/cancel-modal.component';
import { CommonService } from '../../../core/service/common.service';

@Component({
  selector: 'tes-event-detail',
  templateUrl: './event-detail.component.html',
  styleUrls: ['./event-detail.component.scss']
})

/**
 * The component class for event detail page.
 */
export class EventDetailComponent implements OnInit, OnDestroy {
  /**
   * The observable variable for unsubscribe.
   */
  private readonly destroy$: Subject<boolean> = new Subject<boolean>();

  /**
   * The events array.
   */
  public events: Array<Event> = [];

  /**
   * The variable to check the form has changed.
   */
  public hasChanged: boolean;

  /**
   * The event detail form.
   */
  public eventDetailForm: FormGroup;

  /**
   * The variable to check the form is submitted.
   */
  public submitted: boolean = false;

  /**
   * The variable for modal reference.
   */
  public cancelModalRef: BsModalRef;

  /**
   * The page number of event table.
   */
  private tablePageNumber: number;

  /**
   *
   * @param formBuilder The form builder
   * @param store The app store
   * @param route The route
   * @param router The router
   * @param changeCheckService The change check service
   * @param modalService The modal service
   * @param location The location
   * @param commonService The common service
   */
  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly store: Store<AppState>,
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly changeCheckService: ChangeCheckService,
    private readonly modalService: BsModalService,
    private readonly location: Location,
    private readonly commonService: CommonService
  ) {
    this.store.pipe(
      select(fromEvent.getEvents),
      takeUntil(this.destroy$)
    ).subscribe(events => {
      this.events = events;
    });

    commonService.isOnEventDetailPage = true;
  }

  /**
   * The live cycle hook for initializing this component.
   */
  public ngOnInit(): void {
    this.eventDetailForm = this.formBuilder.group({
      id: [''],
      component: ['', Validators.required],
      device: ['', Validators.required],
      asset: ['', Validators.required],
      location: ['', Validators.required],
      category: ['', Validators.required],
      eventName: ['', Validators.required],
      remedy: ['', Validators.required],
      description: ['', Validators.required],
      report: ['', Validators.required]
    });

    let event$ = new BehaviorSubject(this.eventDetailForm.value).asObservable();

    this.route.params.pipe(takeUntil(this.destroy$)).subscribe((params: { id: string }) => {
      const id = params.id;
      /**
       * Gets events from store with ID.
       */
      this.store.pipe(select(fromEvent.getEventById, { id }), takeUntil(this.destroy$)).subscribe(
        event => {
          event$ = new BehaviorSubject(event).asObservable();
          this.setEventValue(event);
        }
      );
    });

    /**
     * Detects the change of event detail form.
     */
    this.eventDetailForm.valueChanges.pipe(
      takeUntil(this.destroy$),
      this.changeCheckService.changeCheck(event$)
    ).subscribe(
      res => {
        this.hasChanged = res;
      }
    );

    this.route.queryParams.pipe(
      takeUntil(this.destroy$)
    ).subscribe(
      params => this.tablePageNumber = params.page
    );
  }

  /**
   * Sets form values.
   * @param value: The asset settings
   */
  public setEventValue(value: Event): void {
    this.eventDetailForm.setValue(value);
  }

  /**
   * The live cycle hook for destroying this component.
   */
  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.unsubscribe();
  }

  /**
   * Submits the event detail form.
   */
  public onSubmit(): void {
    this.submitted = true;
    if (this.eventDetailForm.invalid) {
      return;
    }
    const updateEvent = {
      id: this.eventDetailForm.value.id,
      event: this.eventDetailForm.value
    };

    this.store.dispatch(new EventActions.Update(updateEvent));
    this.location.back();
    this.commonService.isOnEventDetailPage = false;
  }

  /**
   * Gets the control of event detail form.
   */
  get eventDetailFormControls(): { [key: string]: AbstractControl } { return this.eventDetailForm.controls; }

  /**
   * Cancels the detail form.
   */
  public abort(): void {
    if (this.hasChanged) {
      this.cancelModalRef = this.modalService.show(CancelModalComponent, {
        keyboard: true
      });
      this.cancelModalRef.content.action.pipe(takeUntil(this.destroy$)).subscribe(() => {
        this.goToEventTablePage();
      });
    } else {
      this.goToEventTablePage();
    }
    this.commonService.isOnEventDetailPage = false;
  }

  /**
   * Redirects to event table page.
   */
  private goToEventTablePage(): void {
    this.router.navigate([`/overview/event-configuration/table`],
      { queryParams: { page: this.tablePageNumber}}).then();
  }

  /**
   * Updates the report state.
   * @param value The current state of report
   */
  public updateReportState(value: boolean): void {
    this.eventDetailForm.controls.report.setValue(!value);
  }

  @HostListener('document:keydown.escape', ['$event']) public onKeydownHandler(event: KeyboardEvent): void {
    /**
     * Goes to event configuration page when user hits the esc keyboard.
     */
    if (!this.cancelModalRef) {
      this.abort();
    } else {
      this.cancelModalRef = undefined;
    }
  }

  /**
   * Sets the changed the category value.
   * @param value The selected category value
   */
  public onCategoryChanged(value: string): void {
    this.eventDetailForm.controls.category.setValue(value);
  }
}
