package com.example.demo.repository;

import com.example.demo.model.Profile;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import java.util.Optional;

public interface ProfileRepo extends JpaRepository<Profile, Long> {
    Optional<Profile> findOneById(Long id);
}
