import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { AuthUser } from 'src/app/Model/AuthUser';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  baseUrl = environment.ApiUrl; 
constructor(private _http: HttpClient) { }
AuthRegister(user:AuthUser) {
  return this._http.post(this.baseUrl + 'Auth/AddAuthUser',user); 
 }
}
