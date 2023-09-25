import { environment } from '../../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import * as moment from "moment";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http:HttpClient) { 

  }
  //
  public login (username: string, password: string) {
    return this.http.post<Observable<Object>>(
      `${environment.apiUrl}/api/auth/login`, 
        { "username": username, "password": password })
        .pipe(tap((auth: Observable<Object>) => this.setToken(auth)));
  }

  private setToken(result: any) {
    const expiresAt = moment().add(result.expires_in);;
    localStorage.setItem('token', result.access_token);
    localStorage.setItem("expires_at", JSON.stringify(expiresAt.valueOf()));
  }

  public logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("expires_at");
  }

  public loggedIn() {
    return moment().isBefore(this.getExpiration());
  }

  public loggedOut() {
    return !this.loggedIn();
  }

  public getExpiration() {
    const exp = localStorage.getItem("expires_at");
    return moment(exp ? JSON.parse(exp) : null);
  }
}
