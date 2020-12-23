import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms'
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { ConfirmPasswordValidator } from '../../helpers/confirm-password.validator';
@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  constructor(
    private fb: FormBuilder,
    private _api: ApiService,
    private _router:Router
  ) { }

  signUpForm: FormGroup;

  checkPasswords(group: FormGroup) { // here we have the 'passwords' group
    let pass = group.get('password').value;
    let confirmPass = group.get('confirmPassword').value;

    return pass === confirmPass ? null : { passMismatch: true }
  }

  ngOnInit(): void {
    this.signUpForm = this.fb.group({
      'email': [null, [Validators.required, Validators.email]],
      'firstName': [null, [Validators.required]],
      'lastName': [null, [Validators.required]],
      'password': [null, [Validators.required, Validators.minLength(6)]],
      'confirmPassword': [null, [Validators.required]]
    },
      {
        validator: this.checkPasswords
      })
  }

  //sign-up and send verification email
  onSubmit() {
    this._api.postSignUp(this.signUpForm.value)
      .subscribe(
        response => {
          if (response["message"] == "Success"){
            localStorage.setItem('user', JSON.stringify(response["user"]));
            alert("You have successfully signed up, you will recieve a verification email shortly")
            this._router.navigate(['pre-verify'])
          } else {
            alert("Something went wrong. Please try again later.")
          }
        }),
        (error: Response) => {
          alert("Something went wrong. Please try again later.")
        }
  }

}
