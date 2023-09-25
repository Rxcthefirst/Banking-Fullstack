package com.rchbanking.api.repository;

import com.rchbanking.api.model.Account;
import com.rchbanking.api.model.Customer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface AccountRepository extends JpaRepository<Account, Long> {
    List<Account> findAllByCustomerId(Long id);

    @Query(value = "SELECT * FROM accounts WHERE id= ?1 AND account_type='CHECKING'", nativeQuery = true)
    Optional<Account> findCheckingById(Long id);

}
