import {Component, EventEmitter, Input, Output} from '@angular/core';
import { PaginatorItems } from './paginator';

@Component({
  selector: 'tes-paginator',
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.scss']
})

/** Component class for paginator component*/
export class PaginatorComponent {
  /** 
   * The filtered events size.
   */
  @Input() public filteredEventsSize: number;

  /** 
   * The items per page.
   */
  @Input() public itemsPerPage: number;

  /** 
   * The current page number.
   */
  @Input() public currentPage: number;

  /** 
   * The Start item of page.
   */
  @Input() public startItem: number;

  /** 
   * The End item of page.
   */
  @Input() public endItem: number;

  /** 
   * The paginator items.
   */
  @Output() public paginatorTable: EventEmitter<PaginatorItems> = new EventEmitter<PaginatorItems>();

  /** 
   * Goes to first page of table.
   */
  public goFirstPageOfTable(): void {
    this.currentPage = 0;
    this.startItem = this.currentPage * this.itemsPerPage;
    this.endItem = (this.currentPage * this.itemsPerPage) + this.itemsPerPage;
    this.paginatorTable.emit({startItem: this.startItem, endItem: this.endItem, currentPage: this.currentPage});
  }

  /** 
   * Goes to prev page of table.
   */
  public goPrevPageOfTable(): void {
    if (this.currentPage > 0) {
      this.currentPage--;
      this.startItem = this.currentPage * this.itemsPerPage;
      this.endItem = (this.currentPage * this.itemsPerPage) + this.itemsPerPage;
      this.paginatorTable.emit({startItem: this.startItem, endItem: this.endItem, currentPage: this.currentPage });
    }
  }

  /** 
   * Gets the last page of Table.
   */
  get lastPageOfTable(): number {
    return Math.ceil(this.filteredEventsSize / this.itemsPerPage) - 1;
  }

  /** 
   * Goes to next page of table.
   */
  public goNextPageOfTable(): void {
    if (this.currentPage < this.lastPageOfTable) {
      this.currentPage++;
      this.startItem = this.currentPage * this.itemsPerPage;
      this.endItem = (this.currentPage * this.itemsPerPage) + this.itemsPerPage;
      this.paginatorTable.emit({startItem: this.startItem, endItem: this.endItem, currentPage: this.currentPage});
    }
  }

  /** 
   * Goes to last page of table.
   */
  public goLastPageOfTable(): void {
    this.currentPage = this.lastPageOfTable;
    this.startItem = this.currentPage * this.itemsPerPage;
    this.endItem = (this.currentPage * this.itemsPerPage) + this.itemsPerPage;
    this.paginatorTable.emit({startItem: this.startItem, endItem: this.endItem, currentPage: this.currentPage});
  }
}

