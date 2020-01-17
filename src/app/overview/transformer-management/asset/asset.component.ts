import { Component } from '@angular/core';
import { Location } from '@angular/common';

/**
 * The enum for steps.
 */
enum STEPS {
  GENERAL = 'general',
  FIELD_DEVICE = 'field_device'
}
@Component({
  selector: 'tes-add-asset',
  templateUrl: './asset.component.html',
  styleUrls: ['./asset.component.scss']
})

/**
 * The component class for asset page.
 */
export class AssetComponent {
  /**
   * The events array.
   */
  public currentStep: string = 'general';

  /**
   * The Steps
   */
  public steps: {
    GENERAL: string;
    FIELD_DEVICE: string;
  } = STEPS;

  /**
   *
   * @param location The location
   */
  constructor(
    private readonly location: Location
  ) {
  }

  /**
   * Redirects to the previous page.
   */
  public goBack(): void {
    this.location.back();
  }

  /**
   * Switches step.
   * @param step: The step name
   */
  public switchStep(step: string): void {
    this.currentStep = step;
  }
}
