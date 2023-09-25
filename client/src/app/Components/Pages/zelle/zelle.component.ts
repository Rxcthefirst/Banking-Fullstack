import { Component } from '@angular/core';
import { TransactionService } from 'src/app/Services/transaction/transaction.service';
import { AccountService } from 'src/app/Services/account/account.service';
import { Account } from 'src/app/Models/account';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/Services/auth/auth.service';

@Component({
  selector: 'app-zelle',
  templateUrl: './zelle.component.html',
  styleUrls: ['./zelle.component.css']
})
export class ZelleComponent {
  constructor(private transactionService: TransactionService, 
    private accountService: AccountService,
    private authService: AuthService,
    private router: Router) { }

  public accounts: Account[] = [];
  selectedAccountId: number = 0;

  amount: number = 0;
  description: string = '';
  fromId: number  = 0;
  toId: string = '';
  

  

  ngOnInit(): void {
    if (this.authService.loggedOut()) {
      this.router.navigate(["/"]);
    }
    this.getAccounts();
    
  }

  onSubmit(): void {
    this.transactionService.registerZelle(this.amount, this.description, this.fromId, this.toId);
    console.log("onSubmit Button works");
    console.log(this.amount, this.description, this.fromId, this.toId);
  }

  getAccounts(): void {
    this.accountService.getAccounts().subscribe(accounts => this.accounts = accounts);
  }
}
