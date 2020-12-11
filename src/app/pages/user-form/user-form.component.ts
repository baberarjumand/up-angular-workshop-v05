import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss'],
})
export class UserFormComponent implements OnInit {
  validEmailRegexPattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  userFormGroup: FormGroup;

  isEmailValid = true;

  constructor(private formBuilder: FormBuilder) {
    this.userFormGroup = this.formBuilder.group({
      userName: [
        '',
        Validators.compose([Validators.required, Validators.minLength(3)]),
      ],
      userEmail: [
        '',
        Validators.compose([
          Validators.required,
          Validators.pattern(this.validEmailRegexPattern),
          Validators.email,
        ]),
      ],
    });
  }

  ngOnInit(): void {
    this.userFormGroup.valueChanges.subscribe((newData) => {
      // console.log('data from obs$:', newData);

      if (newData.userEmail.length > 3) {
        if (this.validEmailRegexPattern.test(newData.userEmail)) {
          this.isEmailValid = true;
        } else {
          this.isEmailValid = false;
        }
      }
    });
  }

  onSubmit(): void {
    console.log('onSubmit:', this.userFormGroup.value);
  }
}
