import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../../services/api.service'
@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css']
})
export class LogInComponent implements OnInit {

  constructor(
    private _apiService: ApiService,
    private fb:FormBuilder,
    private _router:Router
    ) { }


  loginForm: FormGroup;

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      'email': [null, [Validators.required, Validators.email]],
      'password': [null, [Validators.required, Validators.minLength(6)]]
    });
  }
  
  //submit login credentials to server
  onSubmit() {
    this._apiService.postLogin(this.loginForm.value)
      .subscribe(
        response => {
          this._router.navigate(['/dashboard'])
          localStorage.setItem('user', JSON.stringify(response))
        },
        (error: Response) => {
          alert(error)
        }
      )
  }

}
