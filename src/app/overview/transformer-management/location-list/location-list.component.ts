import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

import { Location } from '../../../core/models/location/location';
@Component({
  selector: 'tes-location-list',
  templateUrl: './location-list.component.html',
  styleUrls: ['./location-list.component.scss']
})

/**
 * The component class for location dropdown.
 */
export class LocationListComponent {
  /**
   * The inputted form control.
   */
  @Input() public control: FormControl;

  /**
   * The location array.
   */
  @Input() public optionsList: Array<Location>;

  /**
   * The selected location value.
   */
  @Output() private readonly valueChanged: EventEmitter<string> = new EventEmitter<string>();

  /**
   * Emits the current location value
   * @param value The location value
   */
  public onOptionSelected(value: string): void {
    this.valueChanged.emit(value);
  }
}
