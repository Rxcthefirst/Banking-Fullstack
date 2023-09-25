package com.rchbanking.api.controller;


import com.rchbanking.api.model.AuthRequest;
import com.rchbanking.api.service.AuthService;
import com.rchbanking.api.service.CustomerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("api/auth")
@CrossOrigin(origins = {"http://localhost:4200"})
public class AuthController {

    @Autowired
    private CustomerService customerService;
    @Autowired
    private AuthService authService;

    @PostMapping("/login")
    ResponseEntity<Map<String, Object>> login (@RequestBody AuthRequest request) {
        Optional<String> result = Optional.ofNullable(authService.Authenticate(request).orElse(null));
        Map<String,Object> map = new HashMap<>();
        System.out.println(result);
        if (result.isPresent()) {
            map.put("access_token", result.get());
            map.put("token_type", "Bearer");
            map.put("expires_in",600000);
            return new ResponseEntity<>(map, HttpStatus.ACCEPTED);
        }
        return new ResponseEntity<>(map, HttpStatus.UNAUTHORIZED);
    }
}

