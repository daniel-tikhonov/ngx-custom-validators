import { Directive, Input, forwardRef, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { NG_VALIDATORS, Validator, ValidatorFn, AbstractControl } from '@angular/forms';

import { lt } from './validator';

const LESS_THAN_VALIDATOR: any = {
  provide: NG_VALIDATORS,
  useExisting: forwardRef(() => LessThanValidator),
  multi: true
};

@Directive({
  selector: '[lt][formControlName],[lt][formControl],[lt][ngModel]',
  providers: [LESS_THAN_VALIDATOR]
})
export class LessThanValidator implements Validator, OnInit, OnChanges {
  @Input() lt?: number;

  private validator?: ValidatorFn;
  private onChange?: () => void;

  ngOnInit() {
    if (this.lt === undefined) {
      throw new Error('Lt input required.');
    }
    this.validator = lt(this.lt);
  }

  ngOnChanges(changes: SimpleChanges) {
    for (const key in changes) {
      if (key === 'lt') {
        this.validator = lt(changes[key].currentValue);
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
