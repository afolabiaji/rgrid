import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-pre-verify',
  templateUrl: './pre-verify.component.html',
  styleUrls: ['./pre-verify.component.css']
})
export class PreVerifyComponent implements OnInit {

  constructor(
    private _api:ApiService
  ) { }
  reqBody;
  
  ngOnInit(): void {
  }

  //resend verification email if not sent
  resendEmail(){
    this.reqBody = JSON.parse(localStorage.getItem("user"))

    this._api.postResendVerificationEmail(this.reqBody).subscribe(
      res => {
      }
    )
  }

}
