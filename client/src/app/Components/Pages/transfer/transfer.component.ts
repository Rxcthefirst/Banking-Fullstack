import { Component, OnInit } from '@angular/core';
import { Transaction } from 'src/app/Models/transaction';
import { TransactionService } from 'src/app/Services/transaction/transaction.service';
import { NgModel } from '@angular/forms';
import { Account } from 'src/app/Models/account';
import { HttpClient } from '@angular/common/http';
import { AccountService } from '../../../Services/account/account.service';
import { AuthService } from 'src/app/Services/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-transfer',
  templateUrl: './transfer.component.html',
  styleUrls: ['./transfer.component.css']
})
export class TransferComponent implements OnInit {

  constructor(private transactionService: TransactionService, 
    private accountService: AccountService,
    private authService: AuthService,
    private router: Router) { }

  public accounts: Account[] = [];
  selectedAccountId: number = 0;

  amount: number = 0;
  description: string = '';
  fromId: number  = 0;
  toId: number = 0;
  

  

  ngOnInit(): void {
    if (this.authService.loggedOut()) {
      this.router.navigate(["/"]);
    }
    this.getAccounts();
    
  }

  onSubmit(): void {
    this.transactionService.registerTransfer(this.amount, this.description, this.fromId, this.toId);
    console.log("onSubmit Button works");
    console.log(this.amount, this.description, this.fromId, this.toId);
  }

  getAccounts(): void {
    this.accountService.getAccounts().subscribe(accounts => this.accounts = accounts);
  }

}
