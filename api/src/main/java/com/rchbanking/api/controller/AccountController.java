package com.rchbanking.api.controller;

import com.rchbanking.api.model.Account;
import com.rchbanking.api.model.Customer;
import com.rchbanking.api.service.AccountService;
import com.rchbanking.api.service.CustomerService;
import com.rchbanking.api.util.JWTUtils;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;



@RequestMapping("api/account")
@RestController
@CrossOrigin(origins = {"http://localhost:4200"})
public class AccountController {
    @Autowired
    private AccountService accountService;
    @Autowired
    private CustomerService customerService;
    @Autowired
    private JWTUtils jwtUtils;

    @PostMapping("/createAccount")
    public ResponseEntity<Account> addAccount(@RequestBody Account account, @RequestHeader(HttpHeaders.AUTHORIZATION) String auth) {
        Long id = (long) jwtUtils.getId(auth.substring(7));
        Optional<Customer> customer = customerService.findCustomerById(id);
        account.setCustomer(customer.get());
        Account addedAccount = accountService.addAccount(account);

        return new ResponseEntity<>(addedAccount, HttpStatus.CREATED);
    }
    @GetMapping("/all")
    public ResponseEntity<List<Account>> getAllAccounts() {
        List<Account> accounts = accountService.getAllAccounts();
        return new ResponseEntity<>(accounts, HttpStatus.OK);
    }

    @GetMapping("/customerAccounts")
    public ResponseEntity<List<Account>> getAllAccountsByCustomerId(@RequestHeader(HttpHeaders.AUTHORIZATION) String auth){
        Long id = (long) jwtUtils.getId(auth.substring(7));
        Optional<Customer> customer = customerService.findCustomerById(id);
        List<Account> customerAccounts = accountService.getAllAccountsByCustomerId(id);
        return new ResponseEntity<>(customerAccounts, HttpStatus.OK);
    }


}
