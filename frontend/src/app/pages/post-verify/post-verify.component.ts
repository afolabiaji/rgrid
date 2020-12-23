import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-post-verify',
  templateUrl: './post-verify.component.html',
  styleUrls: ['./post-verify.component.css']
})
export class PostVerifyComponent implements OnInit {

  constructor(
    private _route:ActivatedRoute,
    private _router:Router,
    private _api:ApiService
  ) { }
  
  id;
  token;
  reqBody;
  title;
  message;

  //get route params from email and verify user
  ngOnInit(): void {
    this._route.params.subscribe(params => {
      this.id = params['id'];
      this.token = params['token'];
      this.reqBody = {
        userId: this.id,
        token: this.token
      }
      this._api.postVerify(this.reqBody).subscribe(res => {
        this.title = "Account Verified!"
        this.message = "Congratulations your account has been verified."
        setTimeout(() => { 
          this._router.navigate(['log-in'])
        }, 1500);
      },
      (error: Response) => {
        this.title = "Verification Unsuccessful"
        this.message = "Please try again later."
      })
    });
  }

}
