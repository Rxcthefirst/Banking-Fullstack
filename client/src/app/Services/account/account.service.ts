import { Injectable } from '@angular/core';
import { Account } from 'src/app/Models/account';
import { ACCOUNTS } from 'src/app/Models/mock-accounts';
import { HttpClient } from '@angular/common/http';
import { of, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  public header = {
    "Authorization": `Bearer ${localStorage.getItem("token")}`
  }
  public requestOptions = {
    headers: this.header
  } 

  getAccounts(): Observable<Account[]> {
    return this.http.get<Account[]>(`${environment.apiUrl}/api/account/customerAccounts`, this.requestOptions);
  }

  constructor(private http: HttpClient) { }

}
