import { Component, OnInit, OnDestroy, ViewChild, ElementRef, ChangeDetectorRef, HostListener } from '@angular/core';
import { Subject } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { takeUntil } from 'rxjs/operators';
import * as lodash from 'lodash';
import moment from 'moment';
import { Router, ActivatedRoute } from '@angular/router';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

import * as fromEvent from '../../../store/event/event.reducer';
import { AppState } from '../../../store/app.state';
import { Event, EventTableFilter } from '../../../core/models/event/event';
import { CategoriesType } from '../../../core/models/event/categories';
import { CsvService } from '../../../core/service/csv.service';
import { CommonService } from '../../../core/service/common.service';
import { EVENTCSVFIELDS } from '../../../../assets/consts/event.field.const';
import { PaginatorItems } from '../../../shared/components/paginator/paginator';
import { EVENT_TABS, EVENT_TABLE_FIELDS } from '../../../../assets/consts/event.table.const';
import { CancelModalComponent } from '../../../shared/components/cancel-modal/cancel-modal.component';

/**
 * The criteria for report event filter.
 */
const NON_REPORT = 'nonReport';

@Component({
  selector: 'tes-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})

/**
 * The component class for table of event page.
 */
export class TableComponent implements OnInit, OnDestroy {
  /**
   * The export element.
   */
  @ViewChild('export', { static: false }) public export: ElementRef;

  /**
   * The filter element.
   */
  @ViewChild('filter', { static: false}) public filter: ElementRef;

  /**
   * The observable variable for unsubscribe.
   */
  private readonly destroy$: Subject<boolean> = new Subject<boolean>();

  /**
   * The events array.
   */
  public events: Array<Event> = [];

  /**
   * The filtered events
   */
  public filteredEvents: Array<Event> = [];

  /**
   * The search key
   */
  public searchKey: string = '';

  /**
   * The variable to check if the events is all shown.
   */
  public isShowAll: boolean = true;

  /**
   * The table filters.
   */
  public tableFilters: EventTableFilter = {
    nonReport: true,
    red: true,
    yellow: true,
    grey: true
  };

  /**
   * The items per page.
   */
  public itemsPerPage: number = 5;

  /**
   * The variable to show/hide filter
   */
  public isShowFilter: boolean = false;

  /**
   * The paginator items for table.
   */
  public paginatorItems: PaginatorItems = {
    startItem: 0,
    endItem: 5,
    currentPage: 0
  };

  /**
   * The sort params.
   */
  public isIncrease: {
    category: boolean;
    eventName: boolean;
    device: boolean;
    asset: boolean;
    location: boolean;
    report: boolean;
  };

  /**
   * The Category types.
   */
  public categoriesType: {
    RED: string;
    YELLOW: string;
    GREY: string;
  } = CategoriesType;

  /**
   * The fields of event table.
   */
  public eventTableFields: {
    CATEGORY: string;
    EVENT_NAME: string;
    DEVICE: string;
    ASSET: string;
    LOCATION: string;
    REPORT: string;
  } = EVENT_TABLE_FIELDS;

  /**
   * The variable for modal reference.
   */
  public cancelModalRef: BsModalRef;

  /**
   *
   * @param store The app store
   * @param route The route
   * @param csvService The csv service
   * @param commonService The common service
   * @param cdRef The change Detector
   * @param modalService The modal service
   * @param router The router
   */
  constructor(
    private readonly store: Store<AppState>,
    private readonly route: ActivatedRoute,
    private readonly csvService: CsvService,
    public commonService: CommonService,
    private readonly cdRef: ChangeDetectorRef,
    private readonly modalService: BsModalService,
    private readonly router: Router
  ) {
    this.store.pipe(
      select(fromEvent.getEvents),
      takeUntil(this.destroy$)
    ).subscribe(events => {
      this.events = events;
    });
  }

  /**
   * The live cycle hook for initializing this component.
  */
  public ngOnInit(): void {
    this.isIncrease = {
      category: false,
      eventName: false,
      device: false,
      asset: false,
      location: false,
      report: false
    };

    /**
     * Gets the filter criteria from url.
     */
    const filters = this.route.snapshot.queryParamMap.get('filter');
    /**
     * If filter criteria exist, sets the table filter status. if nothing, shows all events.
     */
    if (filters) {
      const filterCriteria = filters.split(',');
      this.tableFilters = {
        nonReport: filterCriteria.indexOf(NON_REPORT) > -1,
        red: filterCriteria.indexOf(CategoriesType.RED) > -1,
        yellow: filterCriteria.indexOf(CategoriesType.YELLOW) > -1,
        grey: filterCriteria.indexOf(CategoriesType.GREY) > -1
      };

      this.filterEvents();
    } else  {
      this.showAllEvents();
    }

    /**
     * Gets the sort fields
     */
    const sorter = this.route.snapshot.queryParamMap.get('sort');
    this.isIncrease[sorter] = this.route.snapshot.queryParamMap.get('order') === 'asc';
    if (sorter === EVENT_TABLE_FIELDS.DEVICE || sorter === EVENT_TABLE_FIELDS.ASSET || sorter === EVENT_TABLE_FIELDS.LOCATION || sorter ===
      EVENT_TABLE_FIELDS.REPORT) {
      /**
       * if sort field is one of device, asset, and location,sorts by these field name.
       */
      this.sortTableByFieldName(sorter);
    } else if (sorter === EVENT_TABS.CATEGORY) {
      /**
       * If sort field is category, sorts by category value.
       */
      this.sortByCategory();
    } else if (sorter === EVENT_TABLE_FIELDS.EVENT_NAME) {
      /**
       * If sort field is event name, sorts by event name.
       */
      this.sortByEventName();
    }

    this.route.queryParams.pipe(
      takeUntil(this.destroy$)
    ).subscribe(
      (params: {page: number}) => {
        /**
         * Gets paginator status from url and sets if it exists.
         */
        if (params.hasOwnProperty('page')) {
          this.paginatorItems = {
            startItem: (params.page - 1) * this.itemsPerPage,
            endItem: ((params.page - 1) * this.itemsPerPage) + this.itemsPerPage,
            currentPage: params.page - 1
          };
        }
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
   * The function to filters= events.
   */
  public filterEvents(): void {
    /**
     * Selected filter items.
     */
    const availableKeys = Object.keys(this.tableFilters).map(key => {
      if (this.tableFilters[key]) {
        return key;
      }
    }).filter(key => key);

    /**
     * Gets event based on filter criteria.
     */
    if (availableKeys.length) {
      /**
       * Filters events by checked criteria.
       */
      const filteredEvents = lodash.flatten(availableKeys.map(key => {
        if (key === NON_REPORT) {
          return this.events.filter(evt => !evt.report);
        } else {
          return this.events.filter(evt => evt.category === key);
        }
      }));

      this.sortByCategory();
      this.filteredEvents = lodash.sortBy(lodash.uniqBy(filteredEvents, 'id'),
      [EVENT_TABLE_FIELDS.DEVICE, EVENT_TABLE_FIELDS.ASSET, EVENT_TABLE_FIELDS.LOCATION]);
    } else {
      this.filteredEvents = [];
    }

    /**
     * Checks if all filter criteria are selected.
     */
    this.isShowAll = availableKeys.length === Object.keys(this.tableFilters).length;

    if (!this.isShowAll) {
      this.filterQueryParam(availableKeys.join(','));

      if (this.paginatorItems.startItem > this.filteredEvents.length) {
        this.pageQueryParam(Math.round(this.filteredEvents.length / this.itemsPerPage) || 1);
      }
    } else {
      this.filterQueryParam(null);
    }
  }

  /**
   * Redirects to the event detail page.
   * @param event: THe selected event.
   */
  public goEventDetail(event: Event): void {
    this.router.navigate([`/overview/event-configuration/table/${event.id}`],
      { queryParams:
        { page: this.paginatorItems.currentPage + 1 },
        queryParamsHandling: 'merge'
      }).then();
    this.commonService.isOnEventDetailPage = true;
  }

  /**
   * Exports file as CSV format
   */
  public exportAsCSV(): void {
    const date = moment().format('YYYY-MM-YY');
    const time = moment().format('hh-mm-s');

    /**
     * Gets CSV data from events array.
     */
    const csvData: string = this.csvService.exportAsCSVFile(this.filteredEvents, EVENTCSVFIELDS);
    const blob = new Blob([csvData], { type: 'text/csv' });

    this.export.nativeElement.href = window.URL.createObjectURL(blob);
    this.export.nativeElement.download = `tessa_eventConfigExport_${date}_${time}.csv`;
    this.export.nativeElement.click();
  }

  /**
   * The function to show all events.
   */
  public showAllEvents(): void {
    if (this.isShowAll) {
      this.tableFilters = {
        nonReport: true,
        red: true,
        yellow: true,
        grey: true
      };
      this.sortByCategory();

      /**
       * Sorts the events by device, asset, and location fields.
       */
      this.filteredEvents = lodash.sortBy(this.events,
        [EVENT_TABLE_FIELDS.DEVICE, EVENT_TABLE_FIELDS.ASSET, EVENT_TABLE_FIELDS.LOCATION]);

      this.filterQueryParam(null);
    } else {
      this.tableFilters = {
        nonReport: false,
        red: false,
        yellow: false,
        grey: false
      };
      this.filteredEvents = [];

      this.filterQueryParam('');
    }
  }

  /**
   * The function to search events by keyword.
   * @param searchKey The search keyword
   */
  public searchByKeyword(searchKey: string): void {
    this.searchKey = searchKey;
    /**
     * Splits the keyword by ' '.
     */
    const splitedKeywords = searchKey.split(' ').filter(item => item);
    if (splitedKeywords.length) {
      /**
       * Finds events including keywords on each fields.
       */
      const searchResult = splitedKeywords.map(key => this.events.filter(event =>
        event.eventName.toLowerCase().indexOf(key.toLowerCase()) > -1 ||
        event.device.toLowerCase().indexOf(key.toLowerCase()) > -1 ||
        event.asset.toLowerCase().indexOf(key.toLowerCase()) > -1 ||
        event.location.toLowerCase().indexOf(key.toLowerCase()) > -1
      ));

      this.filteredEvents = lodash.uniqBy(lodash.flatten(searchResult), 'id');
    } else {
      this.filteredEvents = lodash.sortBy(this.events, EVENT_TABS.CATEGORY).reverse();
    }
  }

  /**
   * Sets the start and end item of table
   * @param items The paginator items
   */
  public paginatorTable(items: PaginatorItems): void {
    this.paginatorItems = items;
    this.pageQueryParam(this.paginatorItems.currentPage + 1);
  }

  /**
   * Sorts table by field name
   * @param fieldName The field name
   */
  public sortTableByFieldName(fieldName: string): void {
    this.isIncrease[fieldName] = !this.isIncrease[fieldName];

    /**
     * Filters by field name and sorts when user clicks the table header.
     */
    this.filteredEvents = !this.isIncrease[fieldName] ? lodash.sortBy(this.filteredEvents, fieldName) :
    lodash.sortBy(this.filteredEvents, fieldName).reverse() ;

    this.sortQueryParam(fieldName, this.isIncrease[fieldName] ? 'desc' : 'asc');
  }

  /**
   * The function to show/hide filter
   */
  public showHideFilter(): void {
    this.isShowFilter = !this.isShowFilter;
    if (this.isShowFilter) {
      this.cdRef.detectChanges();
      this.filter.nativeElement.focus();
    }

    this.searchByKeyword('');
  }

  /**
   * HostListener
   * @param event ESC keypress event
   */
  @HostListener('document:keydown.escape', ['$event']) public onKeydownHandler(event: KeyboardEvent): void {
    if (!this.isShowFilter && !this.cancelModalRef) {
      this.cancelModalRef = this.modalService.show(CancelModalComponent, {
        keyboard: true
      });
      this.cancelModalRef.content.action.pipe(takeUntil(this.destroy$)).subscribe(() => {
        this.router.navigate([`/overview`]).then();
      });
    } else if (!this.isShowFilter && this.cancelModalRef) {
      this.cancelModalRef = undefined;
    } else {
      /**
       * Closes the search bar when user hits ESC.
       */
      this.isShowFilter = false;
      this.searchByKeyword('');
    }
  }

  /**
   * Getting the counter of reported events.
   */
  public get unReportedItems(): number {
    return this.filteredEvents.filter(event => !event.report).length;
  }

  /**
   * Getting counter of each category.
   * @param category category value
   */
  public categoryCounter(category: string): number {
    return this.filteredEvents.filter(event => event.category === category).length;
  }

  /**
   * Sorting events by category
   */
  public sortByCategory(): void {
    /**
     * Sorts events by category value in order of red, yellow, grey.
     */
    this.isIncrease.category = !this.isIncrease.category;
    this.filteredEvents.sort((a, b) => {
      if (a.category === CategoriesType.RED && b.category === CategoriesType.YELLOW) {
        return 1;
      } else if (a.category === CategoriesType.RED && b.category === CategoriesType.GREY) {
        return 1;
      } else if (a.category === CategoriesType.YELLOW && b.category === CategoriesType.GREY) {
        return 1;
      } else if ((a.category === CategoriesType.RED && b.category === CategoriesType.RED) ||
      (a.category === CategoriesType.YELLOW && b.category === CategoriesType.YELLOW) ||
      (a.category === CategoriesType.GREY && b.category === CategoriesType.GREY)) {
        return 0;
      } else {
        return -1;
      }
    });

    if (this.isIncrease.category) {
      this.filteredEvents = this.filteredEvents.reverse();
    }

    this.sortQueryParam(EVENT_TABS.CATEGORY, this.isIncrease.category ? 'desc' : 'asc');
  }

  /**
   * Sorting by event name.
   */
  public sortByEventName(): void {
    this.isIncrease.eventName = !this.isIncrease.eventName;

    this.sortByCategory();
    this.filteredEvents = lodash.sortBy(this.events,
      [EVENT_TABLE_FIELDS.EVENT_NAME, EVENT_TABLE_FIELDS.DEVICE, EVENT_TABLE_FIELDS.ASSET, EVENT_TABLE_FIELDS.LOCATION ]);

    if (this.isIncrease.eventName) {
      this.filteredEvents = this.filteredEvents.reverse();
    }

    this.sortQueryParam('eventName', this.isIncrease.eventName ? 'desc' : 'asc');
  }

  /**
   * Changes the query param when the page number is changed.
   * @param page The page number
   */
  public pageQueryParam(page: number = 1): void {
    this.router.navigate([`/overview/event-configuration/table`],
    { queryParams: { page }, queryParamsHandling: 'merge' }).then();
  }

  /**
   * Changes the query param when the selected filters are changed.
   * @param filter The filter params
   */
  public filterQueryParam(filter: string): void {
    this.router.navigate([`/overview/event-configuration/table`],
    { queryParams: { filter }, queryParamsHandling: 'merge' }).then();
  }

  /**
   * Changes the query param when the sort field name and order type are changed.
   * @param sort The sort field name
   * @param order The order type
   */
  public sortQueryParam(sort: string, order: string): void {
    this.router.navigate([`/overview/event-configuration/table`],
    { queryParams: {
      sort,
      order
      },
      queryParamsHandling: 'merge'
    }).then();
  }
}
