import { Directive } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, ValidatorFn } from '@angular/forms';
import { NoWhitespaceValidator } from './no-whitespace.validator';

/**
 * This validator works like "required" but it does not allow whitespace either.
 */
@Directive({
  selector: '[tesNoWhiteSpace]',
  providers: [{ provide: NG_VALIDATORS, useExisting: NoWhiteSpaceDirective, multi: true }]
})

export class NoWhiteSpaceDirective {

  /**
   * The no whitespace validator
   */
  private readonly valFn: ValidatorFn = NoWhitespaceValidator();

  /**
   * Validates if the control matches to the validator.
   * @param control The AbstractControl
   */
  public validate(control: AbstractControl): { [key: string]: AbstractControl } {
      return this.valFn(control);
  }

}
