package com.example.demo.repository;

import com.example.demo.model.Profile;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface ProfileRepo extends JpaRepository<Profile, Long> {
    Profile findOneById(Long id); 
    
}
