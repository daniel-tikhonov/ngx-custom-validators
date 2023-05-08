import { Directive, Input, forwardRef, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { NG_VALIDATORS, Validator, ValidatorFn, AbstractControl } from '@angular/forms';

import { notIncludedIn } from './validator';

const NOT_INCLUDED_IN_VALIDATOR: any = {
  provide: NG_VALIDATORS,
  useExisting: forwardRef(() => NotIncludedInValidator),
  multi: true
};

@Directive({
  selector: '[notIncludedIn][formControlName],[notIncludedIn][formControl],[notIncludedIn][ngModel]',
  providers: [NOT_INCLUDED_IN_VALIDATOR]
})
export class NotIncludedInValidator implements Validator, OnInit, OnChanges {
  @Input() notIncludedIn?: Array<any>;

  private validator?: ValidatorFn;
  private onChange?: () => void;

  ngOnInit() {
    if (this.notIncludedIn === undefined) {
      throw new Error('Not included in input required.');
    }
    this.validator = notIncludedIn(this.notIncludedIn);
  }

  ngOnChanges(changes: SimpleChanges) {
    for (const key in changes) {
      if (key === 'notIncludedIn') {
        this.validator = notIncludedIn(changes[key].currentValue);
        if (this.onChange) {
          this.onChange();
        }
      }
    }
  }

  validate(c: AbstractControl): {[key: string]: any}| null {
    return this.validator ? this.validator(c): null;
  }

  registerOnValidatorChange(fn: () => void): void {
    this.onChange = fn;
  }
}
