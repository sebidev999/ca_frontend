import { Component, OnDestroy } from '@angular/core';
import { Router, NavigationEnd, Event } from '@angular/router';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

import { CommonService } from '../../core/service/common.service';
import { EVENT_TABS } from '../../../assets/consts/event.table.const';

@Component({
  selector: 'tes-event-configuration',
  templateUrl: './event-configuration.component.html',
  styleUrls: ['./event-configuration.component.scss']
})

/**
 * The component class for event configuration page.
 */
export class EventConfigurationComponent implements OnDestroy {
  /**
   * The tabs obj
   */
  public eventTabs: {
    TABLE: string;
    CATEGORY: string;
  } = EVENT_TABS;

  /** The current tab name */
  public currentTab: string = this.eventTabs.CATEGORY;

  /**
   * The selected Event Id.
   */
  public selectedEventId: string;

  /**
   * The observable variable for unsubscibe
   */
  private readonly destroy$: Subject<boolean> = new Subject<boolean>();

  /**
   *
   * @param router The router
   * @param commonService The common service
   */
  constructor(
    private readonly router: Router,
    public commonService: CommonService
  ) {
    router.events.pipe(takeUntil(this.destroy$)).subscribe(
      (event: Event) => {
        if (event instanceof NavigationEnd) {
          /**
           * Gets the current tab name from url.
           */
          this.currentTab = event.urlAfterRedirects.split('/')[3].split('?')[0];

          this.selectedEventId = '';
          commonService.isOnEventDetailPage = false;

          if (event.urlAfterRedirects.split('/')[4]) {
            /**
             * Gets the selected event id.
             */
            this.selectedEventId = event.urlAfterRedirects.split('/')[4].split('?')[0];
            commonService.isOnEventDetailPage = true;
          }
        }
      }
    );
  }

  /**
   * Switches Tab.
   * @param tab: The current tab name
   */
  public switchTab(tab: string): void {
    this.currentTab = tab;

    /**
     * If the current tab is table and page number doesn't exist.
     */
    if (this.currentTab === this.eventTabs.TABLE && !this.router.url.split('?')[1]) {
      this.router.navigate([`/overview/event-configuration/${tab}`],
        {queryParams: {page: 1}}).then();
     } else {
      this.router.navigate([`/overview/event-configuration/${tab}`],
      { queryParamsHandling: 'merge'}).then();
     }
  }

  /**
   * Redirects to overview page.
   */
  public redirect(): void {
    this.router.navigate([`/overview`]).then();
  }

  /**
   * The live cycle hook for destroying this component.
   */
  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.unsubscribe();
  }
}
