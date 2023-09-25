package com.rchbanking.api.util;

import com.rchbanking.api.model.Customer;
import io.jsonwebtoken.*;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import javax.crypto.SecretKey;
import java.util.Date;
import java.util.HashMap;
import java.util.NoSuchElementException;
import java.util.Optional;

@Service
public class JWTUtils {

    SecretKey key = Keys.secretKeyFor(SignatureAlgorithm.HS256);
    public String generateToken(String username, long id) {
        return Jwts.builder().setClaims(new HashMap<String, Object>())
                .setSubject(username)
                .setId(String.valueOf(id))
                .setIssuedAt(new Date(System.currentTimeMillis()))
                .setExpiration(new Date(System.currentTimeMillis() + 1000 * 60 * 10))
                .signWith(key).compact();
    }


    public Optional<Claims> getClaims(String token) {
        Claims claims;
        try {
            claims = Jwts.parserBuilder().setSigningKey(key).build().parseClaimsJws(token).getBody();
            return Optional.of(claims);
        } catch (JwtException e) {
            return Optional.empty();
        }
    }

    public String getUsername(String token) {
        try {
            return getClaims(token).get().getSubject();
        } catch (NoSuchElementException e) {
            return "";
        }

    }
    public int getId(String token) {
        try {
            return Integer.parseInt(getClaims(token).get().getId());
        } catch (NoSuchElementException e) {
            return -1;
        }

    }

    public Boolean validateToken(String token, Customer customer) {
        try {
            Claims claims = getClaims(token).orElse(null);
            final String username = claims.getSubject();
            final Date expiration = claims.getExpiration();
            return (username.equals(customer.getUsername()) && !expiration.before(new Date()));
        } catch(Exception e) {
            return false;
        }

    }
}
