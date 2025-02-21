package com.example.demo.repository;

import com.example.demo.model.Transaction;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.Optional;
import com.example.demo.model.UserStatistic;

@Repository 
public interface StatisticRepo extends JpaRepository<UserStatistic, Long> {
    UserStatistic findByUserId(Long user_id);
}
