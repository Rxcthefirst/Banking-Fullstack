package com.rchbanking.api.controller;

import com.rchbanking.api.model.Account;
import com.rchbanking.api.model.Customer;
import com.rchbanking.api.model.Transaction;
import com.rchbanking.api.model.TransactionType;
import com.rchbanking.api.service.AccountService;
import com.rchbanking.api.service.CustomerService;
import com.rchbanking.api.service.TransactionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RequestMapping("api/transaction")
@RestController
@CrossOrigin(origins = {"http://localhost:4200"})
public class TransactionController {

    @Autowired
    private AccountService accountService;
    @Autowired
    private TransactionService transactionService;
    @Autowired
    private CustomerService customerService;

    @PostMapping("/create-deposit/{id}")
    public ResponseEntity<Transaction> addDeposit(@RequestBody Transaction transaction, @PathVariable("id") Long id) {
        Optional<Account> account = accountService.findAccountById(id);
        Account updatedAccount = account.get();
        Double deposit = transaction.getAmount();
        Double balance = updatedAccount.getBalance();
        updatedAccount.setBalance(balance + deposit);
        transaction.setAccount(account.get());
        Transaction addedTransaction = transactionService.addTransaction(transaction);
        accountService.updateAccount(updatedAccount);
        return new ResponseEntity<>(addedTransaction, HttpStatus.CREATED);
    }

    @PostMapping("/create-withdrawal/{id}")
    public ResponseEntity<Transaction> addWithdrawal(@RequestBody Transaction transaction, @PathVariable("id") Long id) {
        Optional<Account> account = accountService.findAccountById(id);
        Account updatedAccount = account.get();
        Double amount = transaction.getAmount();
        Double balance = updatedAccount.getBalance();
        updatedAccount.setBalance(balance - amount);
        transaction.setAccount(account.get());
        Transaction addedTransaction = transactionService.addTransaction(transaction);
        accountService.updateAccount(updatedAccount);
        return new ResponseEntity<>(addedTransaction, HttpStatus.CREATED);
    }

    @PostMapping("/create-payment/{id}")
    public ResponseEntity<Transaction> addPayment(@RequestBody Transaction transaction, @PathVariable("id") Long id) {
        Optional<Account> account = accountService.findAccountById(id);
        Account updatedAccount = account.get();
        Double payment = transaction.getAmount();
        Double balance = updatedAccount.getBalance();
        updatedAccount.setBalance(balance - payment);
        transaction.setAccount(account.get());
        Transaction addedTransaction = transactionService.addTransaction(transaction);
        accountService.updateAccount(updatedAccount);
        return new ResponseEntity<>(addedTransaction, HttpStatus.CREATED);
    }

    @PostMapping("/create-transfer/{id1}&{id2}")
    public ResponseEntity<Transaction> processTransfer(@RequestBody Transaction transaction, @PathVariable("id1") Long id1, @PathVariable("id2") Long id2) {
        // From Account - Transfer Logic
        Optional<Account> fromAccountOpt = accountService.findAccountById(id1);
        Account fromAccount = fromAccountOpt.get();
        Double transferAmount = transaction.getAmount();
        Double fromBalance = fromAccount.getBalance();
        fromAccount.setBalance(fromBalance - transferAmount);
        transaction.setAccount(fromAccount);
        Transaction addedTransfer = transactionService.addTransaction(transaction);
        accountService.updateAccount(fromAccount);
        Optional<Account> toAccountOpt = accountService.findAccountById(id2);
        Account toAccount = toAccountOpt.get();
        Double toBalance = toAccount.getBalance();
        Transaction addedDeposit = new Transaction();
        addedDeposit.setTransactionType(TransactionType.DEPOSIT);
        toAccount.setBalance(toBalance + transferAmount);
        addedDeposit.setAccount(toAccount);
        //Set this to something custom
        addedDeposit.setDescription("Transfer from: " + fromAccount.getCustomer().getFirstname());
        addedDeposit.setAmount(transaction.getAmount());
        transactionService.addTransaction(addedDeposit);
        accountService.updateAccount(toAccount);
        System.out.println(fromAccount);
        System.out.println(toAccount);
        return new ResponseEntity<>(addedTransfer, HttpStatus.CREATED);
    }

    @PostMapping("/create-zelle-payment/{id1}&{email}")
    public ResponseEntity<Transaction> processPayment(@RequestBody Transaction transaction, @PathVariable("id1") Long id1, @PathVariable("email") String email) {
        // From Account - Payment Logic
        // Find From account by Id, retrieving from optional
        Optional<Account> fromAccountOpt = accountService.findAccountById(id1);
        System.out.println("TEST");
        Account fromAccount = fromAccountOpt.get();
        System.out.println(2);

        // declaring values from request body (probably redundant)
        Double transferAmount = transaction.getAmount();
        System.out.println(3);
        Double fromBalance = fromAccount.getBalance();
        System.out.println(4);
        //setting balance of the from account (deducting amount)
        fromAccount.setBalance(fromBalance - transferAmount);
        System.out.println(5);
        transaction.setAccount(fromAccount);
        System.out.println(6);
        //updating database to post transaction and updating the account information
        Transaction addedTransfer = transactionService.addTransaction(transaction);
        System.out.println(7);
        accountService.updateAccount(fromAccount);
        System.out.println(8);

        //Setting account 2

        //Find customer by the email string input
        System.out.println(9);
        Optional<Customer> recipientCustomerOpt = customerService.findCustomerByEmail(email);
        System.out.println(10);
        Customer recipientCustomer = recipientCustomerOpt.get();


        //Find account (Recipient) to create transaction and update balance on account
        System.out.println(11);
        Optional<Account> toAccountOpt = accountService.findCheckingById(recipientCustomer.getId());
        Account toAccount = toAccountOpt.get();

        System.out.println(12);
        // Declaring initial balance to be updated
        Double toBalance = toAccount.getBalance();
        System.out.println(13);
        // Creating transaction to update in the database
        Transaction addedDeposit = new Transaction();
        addedDeposit.setTransactionType(TransactionType.ZELLE_DEPOSIT);
        toAccount.setBalance(toBalance + transferAmount);
        addedDeposit.setAccount(toAccount);
        System.out.println(14);
        //Set this to something custom
        addedDeposit.setDescription("Payment from: " + fromAccount.getCustomer().getFirstname() + " - " + addedTransfer.getDescription());
        addedDeposit.setAmount(transaction.getAmount());
        transactionService.addTransaction(addedDeposit);
        accountService.updateAccount(toAccount);
        System.out.println(toAccount);
        System.out.println(fromAccount);
        return new ResponseEntity<>(addedTransfer, HttpStatus.CREATED);
    }

    @GetMapping("/all")
    public ResponseEntity<List<Transaction>> getAllTransactions() {
        List<Transaction> transactions = transactionService.getAllTransactions();
        return new ResponseEntity<>(transactions, HttpStatus.OK);
    }

    @GetMapping("/all/{id}")
    public ResponseEntity<List<Transaction>> getAllTransactionsByAccountId(@PathVariable("id") Long id) {
        List<Transaction> accountTransactions = transactionService.getAllTransactionsByAccountId(id);
        return new ResponseEntity<>(accountTransactions, HttpStatus.OK);
    }

    @GetMapping("/view-income/{id}")
    public ResponseEntity<List<Transaction>> getAllIncomeTransactionsById(@PathVariable("id") Long id) {
        List<Transaction> accountIncome = transactionService.getAllIncomeTransactions(id);
        return new ResponseEntity<>(accountIncome, HttpStatus.OK);
    }

    @GetMapping("/view-expenses/{id}")
    public ResponseEntity<List<Transaction>> getAllExpenseTransactionsById(@PathVariable("id") Long id) {
        List<Transaction> accountExpenses = transactionService.getAllExpenseTransactions(id);
        return new ResponseEntity<>(accountExpenses, HttpStatus.OK);
    }

    @GetMapping("/view-income-sum/{id}")
    public ResponseEntity<Double> getIncomeSumTransactionsById(@PathVariable("id") Long id) {
        Double accountIncomeSum = transactionService.getIncomeSum(id);
        return new ResponseEntity<>(accountIncomeSum, HttpStatus.OK);
    }

    @GetMapping("/view-expense-sum/{id}")
    public ResponseEntity<Double> getExpenseSumTransactionsById(@PathVariable("id") Long id) {
        Double accountExpenseSum = transactionService.getExpenseSum(id);
        return new ResponseEntity<>(accountExpenseSum, HttpStatus.OK);
    }

}
