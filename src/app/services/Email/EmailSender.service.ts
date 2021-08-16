import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EmailBody } from 'src/app/Model/Email/EmailBody';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EmailSenderService {
  baseUrl = environment.ApiUrl;
  constructor(private _http: HttpClient) { }
  sendmail(value: EmailBody) {  
    return this._http.post(this.baseUrl + 'EmailServices/SendMail', value);
  }
  confirmmail(userEmail:string,token:string) {
    return this._http.post(this.baseUrl + 'EmailServices/ConfirmEmail/' + userEmail+'/'+token, {});
  }
  IsToken(email:string,token:string){
    return this._http.post(this.baseUrl+'EmailServices/IsTokenMatch/'+email+'/'+token,{});
  }
}
