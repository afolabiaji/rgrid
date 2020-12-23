import { HttpHeaders } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit{

  constructor(
    private _api: ApiService
  ) { }

  reqBody = {
    file: {
      blob: null,
      name: "",
    },
    user: {}
  }
  httpOptions = {
    headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer '+JSON.parse(localStorage.getItem('user')).loginToken
    })
  };    
  validFile = false;
  fileFound = false;

  downloadObservable;
  uploadObservable;

  ngOnInit(): void {
    //get user file from database if it exists
    this.reqBody.user = JSON.parse(localStorage.getItem('user'));
    this.downloadObservable = this._api.postDownloadFile(this.reqBody, this.httpOptions).subscribe(
      res => {
        const downloadedFile = JSON.parse(res)
        this.reqBody.file = downloadedFile.file;
        localStorage.setItem('file', JSON.stringify(downloadedFile.file));
        this.fileFound = true;
      }
    )

  }

  //upload file and convert to utf-8 
  uploadFile(elemId) {
    var reader = new FileReader()
    var el = <HTMLInputElement>document.getElementById(elemId);
    var file = el.files[0];

    var self = this
    reader.addEventListener("load", function () {
      self.reqBody.file.blob = reader.result;
    }, false);

    if (file) {
      if (file.type == "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet") {
        if (file.size <= 9000) {
          alert("Uploaded file is empty, please upload a file with data.")
          this.validFile = false;
        } else {
          this.reqBody.file.name = file.name;
          reader.readAsDataURL(file);
          this.validFile = true;
        }
      } else if (file.type == "text/csv") {
        if (file.size <= 3) {
          alert("Uploaded file is empty, please upload a file with data.")
          this.validFile = false;
        } else {
          this.reqBody.file.name = file.name;
          reader.readAsDataURL(file);
          this.validFile = true;
        }
      } else {
        alert("Please upload a valid file")
        this.validFile = false;

      }

    }
  }

  //send file data to server
  submitFile() {
    this.uploadObservable = this._api.postUploadFile(this.reqBody, this.httpOptions).subscribe(res => {
      this.fileFound = true;
    },
      (error: Response) => {
        alert("File was unable to be submitted, please try again later.")
      })
  }

  //export file and save on client
  exportFile() {
    this.downloadObservable = this._api.postDownloadFile(this.reqBody, this.httpOptions).subscribe(
      res => {
        const downloadedFile = JSON.parse(res)
        this.reqBody.file = downloadedFile.file;
        localStorage.setItem('file', JSON.stringify(downloadedFile.file));
        this.downloadBlob();
      },
      (error: Response) => {
        alert("Could not download file from server, please try again later.")
      })
  }

  //download raw utf-8 data from server
  downloadBlob() {
    // Create a link element
    const link = document.createElement("a");

    // Set link's href to point to the Blob URL
    link.href = this.reqBody.file.blob;
    link.download = this.reqBody.file.name;

    // Append link to the body
    document.body.appendChild(link);

    // Dispatch click event on the link
    // This is necessary as link.click() does not work on the latest firefox
    link.dispatchEvent(
      new MouseEvent('click', {
        bubbles: true,
        cancelable: true,
        view: window
      })
    );

    // Remove link from body
    document.body.removeChild(link);
  }




}
