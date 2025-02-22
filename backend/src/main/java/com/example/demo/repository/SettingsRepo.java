package com.example.demo.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.repository.query.Param;
import com.example.demo.model.UserSettings;

@Repository
public interface SettingsRepo extends JpaRepository<UserSettings, Long> {
    UserSettings findByUserId(Long user_id);
}
