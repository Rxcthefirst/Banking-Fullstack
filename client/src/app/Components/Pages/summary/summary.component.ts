import { Router } from '@angular/router';
import { environment } from './../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { Account } from 'src/app/Models/account';
import { AuthService } from 'src/app/Services/auth/auth.service';
import { tap } from 'rxjs';

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.css']
})
export class SummaryComponent implements OnInit {

  @Input() loggedin = this.authService.loggedIn;

  public accounts: Account[] = [];

  constructor(private http: HttpClient, private authService: AuthService, private router: Router) { }
  ngOnChanges(changes: SimpleChanges): void {
    const header = {
      "Authorization": `Bearer ${localStorage.getItem("token")}`
    }
    const requestOptions = {
      headers: header
    }

    this.http.get<Account[]>(`${environment.apiUrl}/api/account/customerAccounts`, requestOptions)
    .pipe(tap((data) => data.forEach((account: Account) => this.accounts.push(account)))).subscribe();
  }

  ngOnInit(): void {
    if (this.authService.loggedOut()) {
      this.router.navigate(["/"]);
    }
    const header = {
      "Authorization": `Bearer ${localStorage.getItem("token")}`
    }
    const requestOptions = {
      headers: header
    }

    this.http.get<Account[]>(`${environment.apiUrl}/api/account/customerAccounts`, requestOptions)
    .pipe(tap((data) => data.forEach((account: Account) => this.accounts.push(account)))).subscribe();
  }

  onProfile(): void {
    this.router.navigate(['/profile']);
  }
}
