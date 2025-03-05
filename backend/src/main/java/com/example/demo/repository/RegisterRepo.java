package com.example.demo.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.example.demo.model.RegisterUser;

import java.util.Optional;

public interface RegisterRepo extends JpaRepository<RegisterUser, Long> {
    boolean existsByEmail(String email);
    boolean existsByUsername(String username);
    RegisterUser findByUsername(String username);
    RegisterUser findByCustomerId(Long account_id);
//    Optional<RegisterUser> findByUserId(Long account_id);
    Optional<RegisterUser> findByPhoneNumber(String phoneNumber);
}  
