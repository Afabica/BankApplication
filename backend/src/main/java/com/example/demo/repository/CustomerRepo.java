package com.example.demo.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.example.demo.model.Customer;

import java.util.Optional;

@Repository
public interface CustomerRepo extends JpaRepository<Customer, Long> {
    Customer findByUsername(String username);
    Customer findByAddress(String address);
    Customer findByEmail(String email);
    Customer findByFullName(String full_name);
}

