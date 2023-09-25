import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Transaction } from 'src/app/Models/transaction';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {

  constructor(private http: HttpClient) { }

  public amount?: number;
  public description?: string;
  public fromAccountId?: number;
  public toAccountId?: number;

  public header = {
    "Authorization": `Bearer ${localStorage.getItem("token")}`
  }
  public requestOptions = {
    headers: this.header
  } 

  getExpenseTransactions(id: number): Observable<Transaction[]> {
    return this.http.get<Transaction[]>(`${environment.apiUrl}/api/transaction/view-expenses/${id}`, this.requestOptions)
  }

  getIncomeTransactions(id: number): Observable<Transaction[]> {
    return this.http.get<Transaction[]>(`${environment.apiUrl}/api/transaction/view-income/${id}`, this.requestOptions)
  }

  getIncomeSum(id: number): Observable<number> {
    return this.http.get<number>(`${environment.apiUrl}/api/transaction/view-income-sum/${id}`, this.requestOptions);
  }

  getExpenseSum(id: number): Observable<number> {
    return this.http.get<number>(`${environment.apiUrl}/api/transaction/view-expense-sum/${id}`, this.requestOptions);
  }

  createTransfer(): void {
    this.http.post<Transaction>(`${environment.apiUrl}/api/transaction/create-transfer/1&2`, {"amount": 20.00, "description": "Transfer Test", "transactionType": 2}, this.requestOptions);
  }

  registerCustomer(firstname: string, surname: string, email: string, username: string, password: string){    
    return this.http.post<any>(environment.apiUrl + `/api/customer/register`, {firstname: `${firstname}`, surname: `${surname}`, email: `${email}`, username: `${username}`, password: `${password}`}).subscribe(data => {
      console.log(data)
    });
  }

  registerTransfer(amount: number, description: string, fromId: number, toId: number){    
    return this.http.post<any>(environment.apiUrl + `/api/transaction/create-transfer/${fromId}&${toId}`, {amount: `${amount}`, description: `${description}`, transactionType: 2}, this.requestOptions).subscribe(data => {
      console.log(data)
    });
  }

  registerZelle(amount: number, description: string, fromId: number, toId: string){    
    return this.http.post<any>(environment.apiUrl + `/api/transaction/create-zelle-payment/${fromId}&${toId}`, {amount: `${amount}`, description: `${description}`, transactionType: 4}, this.requestOptions).subscribe(data => {
      console.log(data)
    });
  }
}
