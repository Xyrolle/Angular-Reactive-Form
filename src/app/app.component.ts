import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';

export class User {
  constructor(public name: string, public age: number, public email: string) {}
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  authReactiveForm: FormGroup;

  name: string;
  age: number;
  email: string;

  users: User[] = [];

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.initAuthForm();
  }

  onSubmit(): void {
    const myControls = this.authReactiveForm.controls;

    if (this.authReactiveForm.invalid) {
      Object.keys(myControls).forEach((myControlName) =>
        myControls[myControlName].markAsTouched()
      );
    }

    this.users.push(
      new User(
        myControls.name.value,
        myControls.age.value,
        myControls.email.value
      )
    );
    this.authReactiveForm.reset();
  }

  isControlInvalid(myControlName: string): boolean {
    const myControl = this.authReactiveForm.controls[myControlName];
    return myControl.invalid && myControl.touched;
  }

  private initAuthForm(): void {
    this.authReactiveForm = this.fb.group({
      name: ['', [Validators.required, Validators.pattern(/[A-z]/)]],
      age: ['', [Validators.required, Validators.pattern(/[0-9]/)]],
      email: ['', [Validators.required, Validators.email]],
    });
  }
}
