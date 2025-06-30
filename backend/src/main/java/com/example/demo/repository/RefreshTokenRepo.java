package com.example.demo.repository;

import com.example.demo.model.RefreshToken;
import com.example.demo.model.RegisterUser; // assuming RegisterUser is your User entity

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface RefreshTokenRepo extends JpaRepository<RefreshToken, Long> {

    Optional<RefreshToken> findByToken(String token); // find by token value

    int deleteByUser(RegisterUser user); // fix type to match actual User entity

    void deleteByToken(String token);
}
