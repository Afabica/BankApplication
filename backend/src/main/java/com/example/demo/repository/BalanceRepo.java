package com.example.demo.repository;

import com.example.demo.model.BalanceChange;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BalanceRepo extends JpaRepository<BalanceChange, Long> {
    //    Optional <BalanceChange> findBySourceId(Long accountSource);
    //    Optional <BalanceChange> findByDestiantionId(Long accountDestination);
    BalanceChange findByAccountSource(Long accountSource);

    BalanceChange findByAccountDestination(Long accountDestination);
}
