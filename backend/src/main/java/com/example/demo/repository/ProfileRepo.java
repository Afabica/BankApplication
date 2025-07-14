package com.example.demo.repository;

import com.example.demo.model.ProfileEntity;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface ProfileRepo extends JpaRepository<ProfileEntity, Long> {
    Optional<ProfileEntity> findOneById(Long id);

    Optional<ProfileEntity> findByMobile(String mobile);

    boolean findByFullName(String fullName);
}
