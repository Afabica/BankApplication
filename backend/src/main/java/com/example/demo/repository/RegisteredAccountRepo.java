package com.example.demo.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.example.demo.model.RegisteredAccount;

import java.util.List;
import java.util.Optional;

@Repository
public interface RegisteredAccountRepo extends JpaRepository<RegisteredAccount, Long> {
    Optional<RegisteredAccount> findByIban(String iban);
}
