import { Directive, Input, forwardRef, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { NG_VALIDATORS, Validator, ValidatorFn, AbstractControl } from '@angular/forms';

import { lte } from './validator';

const LESS_THAN_EQUAL_VALIDATOR: any = {
  provide: NG_VALIDATORS,
  useExisting: forwardRef(() => LessThanEqualValidator),
  multi: true
};

@Directive({
  selector: '[lte][formControlName],[lte][formControl],[lte][ngModel]',
  providers: [LESS_THAN_EQUAL_VALIDATOR]
})
export class LessThanEqualValidator implements Validator, OnInit, OnChanges {
  @Input() lte?: number;

  private validator?: ValidatorFn;
  private onChange?: () => void;

  ngOnInit() {
    if (this.lte === undefined) {
      throw new Error('Lte input required.');
    }
    this.validator = lte(this.lte);
  }

  ngOnChanges(changes: SimpleChanges) {
    for (const key in changes) {
      if (key === 'lte') {
        this.validator = lte(changes[key].currentValue);
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
