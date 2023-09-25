package com.rchbanking.api.service;

import com.rchbanking.api.model.AuthRequest;
import com.rchbanking.api.model.Customer;
import com.rchbanking.api.util.JWTUtils;

import com.rchbanking.api.repository.CustomerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.security.crypto.bcrypt.BCrypt;
import java.util.Optional;

@Service
public class AuthService {
    @Autowired
    private CustomerRepository customerRepository;
    @Autowired
    private JWTUtils jwtUtils;


    public Optional<String> Authenticate(AuthRequest request) {
        Optional<Customer> customer = customerRepository.findByUsername(request.getUsername());
        if (customer.isPresent()) {
            if(BCrypt.checkpw(request.getPassword(), customer.get().getPassword())) {
                return Optional.ofNullable(jwtUtils.generateToken(customer.get().getUsername(),customer.get().getId()));
            }
        }
        return Optional.empty();
    }
}
