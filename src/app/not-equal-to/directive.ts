import { Directive, Input, forwardRef, OnInit } from '@angular/core';
import { NG_VALIDATORS, Validator, ValidatorFn, AbstractControl, NgModel } from '@angular/forms';

import { notEqualTo } from './validator';

const NOT_EQUAL_TO_VALIDATOR: any = {
  provide: NG_VALIDATORS,
  useExisting: forwardRef(() => NotEqualToValidator),
  multi: true
};

@Directive({
  selector: '[notEqualTo][formControlName],[notEqualTo][formControl],[notEqualTo][ngModel]',
  providers: [NOT_EQUAL_TO_VALIDATOR]
})
export class NotEqualToValidator implements Validator, OnInit {
  @Input() notEqualTo?: NgModel;

  private validator?: ValidatorFn;

  ngOnInit() {
    if (this.notEqualTo === undefined) {
      throw new Error('Not equal to input required.');
    }
    this.validator = notEqualTo(this.notEqualTo.control);
  }

  validate(c: AbstractControl): {[key: string]: any}| null {
    return this.validator ? this.validator(c): null;
  }
}
