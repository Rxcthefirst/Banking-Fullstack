import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Account } from 'src/app/Models/account';
import { Transaction } from 'src/app/Models/transaction';
import { AccountService } from 'src/app/Services/account/account.service';
import { AuthService } from 'src/app/Services/auth/auth.service';
import { TransactionService } from 'src/app/Services/transaction/transaction.service';

@Component({
  selector: 'app-accounts',
  templateUrl: './accounts.component.html',
  styleUrls: ['./accounts.component.css']
})
export class AccountsComponent implements OnInit {

  public accounts: Account[] = [];
  public income_transactions: Transaction[] = [];
  public expense_transactions: Transaction[] = [];
  public income: number = 0;
  public expenses: number = 0;
  public selectedAccount?: Account;
  public selectedView?: Transaction[];

  onSelect(account: Account): void {
    this.selectedAccount = account;
    this.setIncome(this.selectedAccount.id);
    this.setExpenses(this.selectedAccount.id);
    this.getAccounts();
    this.getExpenses(this.selectedAccount.id);
    this.getIncome(this.selectedAccount.id);
  }

  onView(transactions: Transaction[]): void {
    this.selectedView = transactions;
  }


  constructor(
    private accountService: AccountService, 
    private transactionService: TransactionService,
    private router: Router) { }

  ngOnInit(): void {
    this.getAccounts();
  }

  getAccounts(): void {
    this.accountService.getAccounts().subscribe(accounts => this.accounts = accounts);
  }

  getIncome(id: number): void {
    this.transactionService.getIncomeTransactions(id).subscribe(transactions => this.income_transactions = transactions);
  }

  getExpenses(id: number): void {
    this.transactionService.getExpenseTransactions(id).subscribe(transactions => this.expense_transactions = transactions);
  }

  setIncome(id: number): void {
    this.transactionService.getIncomeSum(id).subscribe(income => this.income = income);
  }

  setExpenses(id: number): void {
    this.transactionService.getExpenseSum(id).subscribe(expenses => this.expenses = expenses);
  }

  onTransfer() {
    this.router.navigate(["/transfer"]);
  }

  onSendMoney() {
    this.router.navigate(["/zelle"]);
  }

  onProfile() {
    this.router.navigate(["/profile"]);
  }

}