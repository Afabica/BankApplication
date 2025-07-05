package com.example.demo.repository;

import com.example.demo.model.RegisterUser;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface RegisterRepo extends JpaRepository<RegisterUser, Long> {
    boolean existsByEmail(String email);

    boolean existsByUsername(String username);

    boolean existsByMobile(String mobile);

    RegisterUser findByUsername(String username);

    Optional<RegisterUser> findByAccountId(Long accountId);

    RegisterUser getByAccountId(Long accountId);

    //    Optional<RegisterUser> findByUserId(Long account_id);
    Optional<RegisterUser> findByMobile(String mobile);
}
