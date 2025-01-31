import { Component, OnInit } from '@angular/core';
import { Validators, FormControl, FormGroup } from '@angular/forms';
import { CustomValidators } from '../app/custom-forms.module';

@Component({
  selector: 'app-dev',
  templateUrl: 'dev.component.html',
  styleUrls: ['dev.component.scss']
})
export class DevComponent implements OnInit {
  public form?: FormGroup;
  public num = 5;
  public arrayLengthTest = ['ok'];
  public dateTest = { year: 2017, month: 10, day: 12 };
  public objProperty = { id: 1 };

  ngOnInit() {
    const password = new FormControl('', Validators.required);
    const certainPassword = new FormControl('', CustomValidators.notEqualTo(password));

    this.form = new FormGroup({
      password,
      certainPassword
    });
  }

  onSubmit(form: FormGroup) {
    console.log(form);
  }
}
