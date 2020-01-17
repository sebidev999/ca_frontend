import { Component, Input, EventEmitter, Output } from '@angular/core';
import { FormControl } from '@angular/forms';

import { CategoriesType } from '../../../core/models/event/categories';
@Component({
  selector: 'tes-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.scss']
})
export class CategoryListComponent {
  /**
   * The live cycle hook for destroying this component.
   */
  @Input() public control: FormControl;

  /**
   * The selected value of category list.
   */
  @Output() private readonly valueChanged: EventEmitter<string> = new EventEmitter<string>();

  /**
   * The Category types.
   */
  public categoriesType: {
    RED: string;
    YELLOW: string;
    GREY: string;
  } = CategoriesType;

  /**
   * The live cycle hook for destroying this component.
   */
  public onOptionSelected(value: string): void {
    this.valueChanged.emit(value);
  }
}
