import { AbstractControl, ValidatorFn } from '@angular/forms';

/**
 * Function to check if the control has empty space.
 */
export function NoWhitespaceValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: string } => {
    const isWhitespace = (control.value || '').trim().length === 0;
    const isValid = !isWhitespace;
    return isValid ? null : { whitespace: 'value is only whitespace' };
  };
}
