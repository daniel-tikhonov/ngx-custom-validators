import { AbstractControl, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { isPresent } from '../util/lang';

// tslint:disable-next-line:variable-name
export const number: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
  if (isPresent(Validators.required(control))) {
    return null;
  }

  const v: string = control.value;
  return /^(?:-?\d+|-?\d{1,3}(?:,\d{3})+)?(?:\.\d+)?$/.test(v) ? null : { number: true };
};
