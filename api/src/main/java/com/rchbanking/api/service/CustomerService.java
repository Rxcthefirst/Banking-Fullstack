package com.rchbanking.api.service;

import com.rchbanking.api.model.Customer;
import com.rchbanking.api.repository.CustomerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.security.crypto.bcrypt.BCrypt;

import java.util.*;

@Service
public class CustomerService {
    private final CustomerRepository customerRepository;

    @Autowired
    public CustomerService(CustomerRepository customerRepository) {
        this.customerRepository = customerRepository;
    }

    public Customer addCustomer(Customer customer) {
        String pw_hash = BCrypt.hashpw(customer.getPassword(), BCrypt.gensalt());
        customer.setPassword(pw_hash);
        return customerRepository.save(customer);
    }

    public List<Customer> getAllCustomers() {
        return customerRepository.findAll();
    }

    public Optional<Customer> findCustomerById(Long id) {return customerRepository.findById(id);};

    public Optional<Customer> findCustomerByEmail(String email) { return customerRepository.findByEmail(email); }


}
