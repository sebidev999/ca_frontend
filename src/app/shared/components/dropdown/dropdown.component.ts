import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl } from '@angular/forms';

import { DropdownOption } from './dropdown';
@Component({
  selector: 'tes-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.scss']
})

/** 
 * The component class for dropdown.
 */
export class DropdownComponent {
  /** 
   * The inputted form control.
   */
  @Input() public control: FormControl;

  /** 
   * The options list.
   */
  @Input() public optionsList: Array<DropdownOption>;

  /**
   * The changed value of dropdown list.
   */
  @Output() private readonly valueChanged: EventEmitter<string> = new EventEmitter<string>();

  /**
   * The exceptional option.
   */
  @Input() private readonly exceptionalOptional: string;

  /**
   * The variable to show/hide 'Please select option'.
   */
  @Input() public isNeedSelectOption: boolean = false;

  /**
   * Emits the selected value.
   * @param value The selected value
   */
  public onOptionSelected(value: string): void {
    this.valueChanged.emit(value);
  }
}
