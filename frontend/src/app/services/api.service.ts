import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent, HttpHeaders } from '@angular/common/http';

// rxjs
import { Observable } from "rxjs";

const baseUrl = "http://localhost:3000/"


export interface responseType {
    name: string,
    blob: any
}

const httpOptions = {
    headers: new HttpHeaders({
        'Content-Type': 'application/json'
    })
};

@Injectable({
    providedIn: 'root',
})
export class ApiService {


    constructor(private _http: HttpClient) { }


    postDownloadFile(reqBody, options:Object): Observable<string> {
        return this._http.post<string>(baseUrl + 'file/download', JSON.stringify(reqBody), options);
    }
    postUploadFile(reqBody, options) {
        return this._http.post(baseUrl + 'file/upload', JSON.stringify(reqBody), options);
    }
    postLogin(reqBody) {
        return this._http.post(baseUrl + 'auth/login', JSON.stringify(reqBody), httpOptions);
    }
    postVerify(reqBody) {
        return this._http.post(baseUrl + 'auth/verify-user', JSON.stringify(reqBody), httpOptions);
    }
    postVerificationStatus(reqBody) {
        return this._http.post(baseUrl + 'auth/verification-status', JSON.stringify(reqBody), httpOptions);
    }
    postResendVerificationEmail(reqBody) {
        return this._http.post(baseUrl + 'auth/resend-verify-email', JSON.stringify(reqBody), httpOptions);
    }
    postSignUp(reqBody) {
        return this._http.post(baseUrl + 'auth/signup', JSON.stringify(reqBody), httpOptions);
    }
    postLoguut(reqBody) {
        return this._http.post(baseUrl + 'auth/logout', JSON.stringify(reqBody), httpOptions);
    }


}