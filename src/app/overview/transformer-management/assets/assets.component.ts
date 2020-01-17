import { Component, OnDestroy, OnInit, ViewChild, ChangeDetectorRef, ElementRef, HostListener } from '@angular/core';
import { Subject } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { takeUntil } from 'rxjs/operators';
import * as lodash from 'lodash';
import { ActivatedRoute, Router } from '@angular/router';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

import * as fromAsset from '../../../store/asset/asset.reducer';
import { AppState } from 'src/app/store/app.state.js';
import { Asset } from 'src/app/core/models/asset/asset.js';
import { PaginatorItems } from '../../../shared/components/paginator/paginator';
import { CommonService } from '../../../core/service/common.service';
import { ASSET_TABLE_FIELDS } from '../../../../assets/consts/asset.table.const';
import { CancelModalComponent } from '../../../shared/components/cancel-modal/cancel-modal.component';

@Component({
  selector: 'tes-assets',
  templateUrl: './assets.component.html',
  styleUrls: ['./assets.component.scss']
})

/**
 * The component class for assets page.
 */
export class AssetsComponent implements OnInit, OnDestroy {

  /**
   * The filter element.
   */
  @ViewChild('filter', { static: false}) public filter: ElementRef;

  /**
   * The observable variable to unsubscribe.
   */
  private readonly destroy$: Subject<boolean> = new Subject<boolean>();

  /**
   * The assets array.
   */
  public assets: Array<Asset> = [];

  /**
   * The search key.
   */
  public searchKey: string = '';

  /**
   * The search results.
   */
  public searchResult: Array<Asset> = [];

  /**
   * The start index of table
   */
  public startItem: number = 0;

  /**
   * The end index of table
   */
  public endItem: number = 5;

  /**
   * The current page number
   */
  public currentPage: number = 0;

  /**
   * The items per page.
   */
  public itemsPerPage: number = 5;

  /**
   * The variable to show/hide filter.
   */
  public isShowFilter: boolean = false;

  /**
   * The object to sort table
   */
  public isIncrease: {
    transformerName: boolean;
    location: boolean;
    manufacturer: boolean;
    yearOfManufacture: boolean;
    maximumPower: boolean;
    serialNumber: boolean;
  };

  /**
   * The asset table fields.
   */
  public assetTableFields: {
    TRANSFORMER_NAME: string;
    LOCATION: string;
    MANUFACTURER: string;
    YEAR_OF_MANUFACTURE: string;
    MAXIMUM_POWER: string;
    SERIAL_NUMBER: string;
  } = ASSET_TABLE_FIELDS;

  /**
   * The variable for modal reference.
   */
  public cancelModalRef: BsModalRef;

  /**
   *
   * @param store The app store
   * @param router The router
   * @param route The route
   * @param commonService The common service
   * @param cdRef The change detector
   * @param modalService The modalService
   */
  constructor(
    private readonly store: Store<AppState>,
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    private readonly commonService: CommonService,
    private readonly cdRef: ChangeDetectorRef,
    private readonly modalService: BsModalService
  ) {
    this.store.pipe(
      select(fromAsset.getAssets),
      takeUntil(this.destroy$)
    ).subscribe(assets => {
      this.assets = assets;
      this.showAllAssets();
    });
  }

  public ngOnInit(): void {
    this.isIncrease = {
      transformerName: false,
      location: false,
      manufacturer: false,
      yearOfManufacture: false,
      maximumPower: false,
      serialNumber: false
    };

    const sorter = this.route.snapshot.queryParamMap.get('sort');
    if (sorter) {
      this.isIncrease[sorter] = this.route.snapshot.queryParamMap.get('order') === 'asc';
      this.sortTableByFieldName(sorter);
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
   * The function to search the assets by keyword.
   *  @param searchKey: keyword
   */
  public searchByKeyword(searchKey: string): void {
    this.searchKey = searchKey;
    const splitedKeyWords = searchKey.split(' ').filter(item => item);
    if (splitedKeyWords.length) {
      const searchResult = splitedKeyWords.map(key => this.assets.filter(asset =>
        asset.transformerName.toLowerCase().includes(key.toLowerCase()) ||
        asset.location.toLowerCase().indexOf(key.toLowerCase()) > -1 ||
        asset.manufacturer.toLowerCase().indexOf(key.toLowerCase()) > -1 ||
        asset.yearOfManufacture.toLowerCase().indexOf(key.toLowerCase()) > -1 ||
        asset.maximumPower.toLowerCase().indexOf(key.toLowerCase()) > -1 ||
        asset.serialNumber.toLowerCase().indexOf(key.toLowerCase()) > -1
      ));

      this.searchResult = lodash.sortBy(lodash.uniqBy(lodash.flatten(searchResult), 'id'),
        [item => item[ASSET_TABLE_FIELDS.TRANSFORMER_NAME].toLowerCase()],
       [ASSET_TABLE_FIELDS.LOCATION, ASSET_TABLE_FIELDS.TRANSFORMER_NAME]);
    } else {
      this.searchResult = this.assets;
    }
  }

  /**
   * Goes to the first page of table.
   */
  public goFirstPageOfTable(): void {
    this.currentPage = 0;
    this.startItem = this.currentPage * this.itemsPerPage;
    this.endItem = (this.currentPage + 1) * this.itemsPerPage;
  }

  /**
   * Goes to the last page of table.
   */
  public goLastPageOfTable(): void {
    this.currentPage = this.lastPageOfTable;
    this.startItem = this.currentPage * this.itemsPerPage;
    this.endItem = (this.currentPage + 1) * this.itemsPerPage;
  }

  /**
   * Goes to the next page.
   */
  public goNextPageOfTable(): void {
    if (this.currentPage < this.lastPageOfTable) {
      this.currentPage ++;
      this.startItem = this.currentPage * this.itemsPerPage;
      this.endItem = (this.currentPage + 1) * this.itemsPerPage;
    }
  }

  /**
   * Goes to the prev page.
   */
  public goPrevPageOfTable(): void {
    if (this.currentPage > 0) {
      this.currentPage --;
      this.startItem = this.currentPage * this.itemsPerPage;
      this.endItem = (this.currentPage + 1) * this.itemsPerPage;
    }
  }

  /**
   * Gets the last page of the table.
   */
  get lastPageOfTable(): number {
    return Math.ceil(this.searchResult.length / this.itemsPerPage) - 1;
  }

  /**
   * Sorts the table by field name.
   * @param fieldName: The field name of table.
   */
  public sortTableByFieldName(fieldName: string): void {
    this.isIncrease[fieldName] = !this.isIncrease[fieldName];
    this.searchResult = this.isIncrease[fieldName] ?
    lodash.sortBy(this.searchResult, [item => item[fieldName].toLowerCase()], [fieldName]) :
     lodash.sortBy(this.searchResult, [item => item[fieldName].toLowerCase()], [fieldName]).reverse();

    this.sortQueryParamForAssetTable(fieldName, this.isIncrease[fieldName] ? 'desc' : 'asc');
  }

  /**
   * The function to show/hide filter.
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
   * Shows all assets.
   */
  public showAllAssets(): void {
    this.searchResult = lodash.sortBy(this.assets, [asset => asset[ASSET_TABLE_FIELDS.TRANSFORMER_NAME].toLowerCase()],
      [ASSET_TABLE_FIELDS.LOCATION, ASSET_TABLE_FIELDS.TRANSFORMER_NAME]);
  }

  /**
   * Sets the start and end item of table.
   * @param items: The paginator items.
   */
  public paginatorTable(items: PaginatorItems): void {
    this.startItem = items.startItem;
    this.endItem = items.endItem;
  }

  /**
   * Passes transformer name in the route when going to asset.
   * @param asset The asset obj.
   */
  public routeToEditAsset(asset: Asset): void {
    this.router.navigate([`/overview/transformer-management/${asset.id}`]).then();
    this.commonService.transformerName = asset.transformerName;
  }

  @HostListener('document:keydown.escape', ['$event']) public onKeydownHandler(event: KeyboardEvent): void {
    if (!this.isShowFilter && !this.cancelModalRef) {
      this.cancelModalRef = this.modalService.show(CancelModalComponent, {
        keyboard: true
      });
      this.cancelModalRef.content.action.pipe(takeUntil(this.destroy$)).subscribe(() => {
        this.router.navigate([`/overview`]).then();
      });
    } else {
      this.cancelModalRef = undefined;
    }

    /**
     * Closes the search bar when user hits ESC.
     */
    this.isShowFilter = false;
    this.searchByKeyword('');
  }

  /**
   * Changes the query param for asset table. 
   * @param sort The sort field name
   * @param order The order type
   */
  public sortQueryParamForAssetTable(sort: string, order: string): void {
    this.router.navigate([`/overview/transformer-management/assets`],
      { queryParams: {
          sort,
          order
        }
      }).then();
  }

}
