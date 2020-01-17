import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Store, select } from '@ngrx/store';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { Router } from '@angular/router';

import { ChangeCheckService } from '../../../core/service/change-check.service';
import { CommonService } from '../../../core/service/common.service';
import { BehaviorSubject, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ViewType, EventCategories, CategoriesType } from '../../../core/models/event/categories';
import { AppState } from 'src/app/store/app.state.js';
import * as fromEventCategory from '../../../store/event-category/event-categories.reducer';
import { DropdownOption } from '../../../shared/components/dropdown/dropdown';
import * as EventCategoryActions from '../../../store/event-category/event-categories.actions';
import { CancelModalComponent } from '../../../shared/components/cancel-modal/cancel-modal.component';

@Component({
  selector: 'tes-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
/**
 * The component class for category page.
 */
export class CategoryComponent implements OnInit, OnDestroy  {
  /**
   * The variable for category form.
   */
  public categoryForm: FormGroup;

  /**
   * The observable variable for unsubscribe.
   */
  private readonly destroy$: Subject<boolean> = new Subject<boolean>();

  /**
   * The variable to check the form value is changed.
   */
  public hasChanged: boolean;

  /**
   * The string array for category list.
   */
  public selectOptions: Array<DropdownOption> = [
    {
      id: ViewType.ACTIVE_OR_UNCONFIRMED,
      name: ViewType.ACTIVE_OR_UNCONFIRMED,
    }, {
      id:  ViewType.ACTIVE,
      name: ViewType.ACTIVE
    }, {
      id: ViewType.AT_NO_TIME,
      name: ViewType.AT_NO_TIME
    }
  ];

  /**
   * The variable for modal reference.
   */
  public cancelModalRef: BsModalRef;

  /**
   *
   * @param store The definition of app store
   * @param formBuilder The definition of form builder
   * @param changeCheckService The definition of change check service
   * @param commonService The definition of common service
   * @param modalService The modal service
   * @param router The router
   */
  constructor(
    private readonly store: Store<AppState>,
    private readonly formBuilder: FormBuilder,
    private readonly changeCheckService: ChangeCheckService,
    private readonly commonService: CommonService,
    private readonly modalService: BsModalService,
    private readonly router: Router,
  ) {
    commonService.isOnEventDetailPage = false;
   }

  /**
   * The function to set category form value.
   * @param form The category Form
   * @param value The changed value
   */
  public onCategoryChanged(form: FormGroup, value: string): void {
    form.controls.viewMode.setValue(value);
  }

  public ngOnInit(): void {
    this.store.pipe(
      select(fromEventCategory.getEventCategories),
      takeUntil(this.destroy$)
    ).subscribe((categories: EventCategories) => {
      /**
       * Initialize category form array.
       */
      const categoryFields = Object.keys(categories).filter(key => key !== 'partnerId');
      this.categoryForm = this.formBuilder.group({
        partnerId: [categories.partnerId],
        items: this.formBuilder.array(
          categoryFields.map(field => this.formBuilder.group({
            category: [field === 'error' ?  CategoriesType.RED : field === 'warning' ? CategoriesType.YELLOW : CategoriesType.GREY],
            view: [categories[field].view],
            emailNotification: [categories[field].emailNotification]
          }))
        )
      });
    });
    const category$ = new BehaviorSubject(this.categoryForm.value).asObservable();
    /**
     * Detects the change of category form.
     */
    this.categoryForm.valueChanges.pipe(
      takeUntil(this.destroy$),
      this.changeCheckService.changeCheck(category$)
    ).subscribe(
      res => {
        this.hasChanged = res;
      }
    );
  }

  /**
   * The live cycle hook for destroying this component.
   */
  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.unsubscribe();
  }

  /**
   * Updates categories.
   */
  public onSubmit(): void {
    if (this.categoryForm.invalid) {
      return;
    }

    const eventCategories: EventCategories = {
      partnerId: this.categoryForm.controls.partnerId.value,
      error: {
        view: this.categoryForm.controls.items.value.find(value => value.category === 'red').view,
        emailNotification: this.categoryForm.controls.items.value.find(value => value.category === 'red').emailNotification
      },
      warning: {
        view: this.categoryForm.controls.items.value.find(value => value.category === 'yellow').view,
        emailNotification: this.categoryForm.controls.items.value.find(value => value.category === 'yellow').emailNotification
      },
      info: {
        view: this.categoryForm.controls.items.value.find(value => value.category === 'grey').view,
        emailNotification: this.categoryForm.controls.items.value.find(value => value.category === 'grey').emailNotification
      }
    };

    this.store.dispatch(new EventCategoryActions.Update({eventCategories}));
  }

  /* HostListener
   * @param event ESC keypress event
   */
  @HostListener('document:keydown.escape', ['$event']) public onKeydownHandler(event: KeyboardEvent): void {
    if (!this.cancelModalRef) {
      this.cancelModalRef = this.modalService.show(CancelModalComponent, {
        keyboard: true
      });
      this.cancelModalRef.content.action.pipe(takeUntil(this.destroy$)).subscribe(() => {
        this.router.navigate([`/overview`]).then();
      });
    } else if (this.cancelModalRef) {
      this.cancelModalRef = undefined;
    }
  }
}
