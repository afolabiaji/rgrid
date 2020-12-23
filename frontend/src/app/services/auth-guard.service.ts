import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs";
import { ApiService } from "./api.service";
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root',
})
//allow user to continue only if authenticated data is in local storage and verified
export class AuthGuard implements CanActivate {
    reqBody;
    constructor(
        private _router: Router,
        private _api: ApiService
    ) { }
    canActivate(route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
        if (localStorage.getItem('user') !== null) {
            this.reqBody = JSON.parse(localStorage.getItem('user'))
            return new Observable<boolean>(
                obs => {this._api.postVerificationStatus(this.reqBody).subscribe(
                res => {
                    return obs.next(true)
                },
                (error: Response) => {
                    this._router.navigate(['sign-up'])
                    return obs.next(false)
                }
            )
        })
        } else {
            this._router.navigate(['sign-up'])
            return false
        }
    }
}