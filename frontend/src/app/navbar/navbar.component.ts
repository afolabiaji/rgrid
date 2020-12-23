import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(
    private _router: Router,
    private _api: ApiService
  ) {
    _router.events.subscribe((val) => {
      if (localStorage.getItem('user')) {
        this.reqBody = JSON.parse(localStorage.getItem('user'))
        this._api.postVerificationStatus(this.reqBody).subscribe(
          res => {
            this.loggedIn = true
          },
          (error: Response) => {
            this.loggedIn = false
          }
        )
      } else {
        this.loggedIn = false
      }
    });
  }
  reqBody;
  loggedIn;

  ngOnInit(): void {
    if (localStorage.getItem('user')) {
      this.reqBody = JSON.parse(localStorage.getItem('user'))
      this._api.postVerificationStatus(this.reqBody).subscribe(
        res => {
          this.loggedIn = true
        },
        (error: Response) => {
          this.loggedIn = false
        }
      )
    } else {
      this.loggedIn = false
    }
  }

  logout() {
    localStorage.removeItem('user')
    this.loggedIn = false
    this._router.navigate(['log-in'])
  }

}
