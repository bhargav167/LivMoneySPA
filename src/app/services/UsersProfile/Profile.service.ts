import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  baseUrl = environment.ApiUrl;
  constructor(private _http: HttpClient) { }

  GetUserProfile(userId:number) {
    return this._http.get(this.baseUrl + 'Profile/GetUserProfile/'+userId); 
  }
}
