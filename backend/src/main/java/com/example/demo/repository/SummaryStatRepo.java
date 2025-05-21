// package com.example.demo.repository;
//
// import com.example.demo.model.StatisticsSummary;
//
// import org.springframework.data.jpa.repository.JpaRepository;
// import org.springframework.stereotype.Repository;
//
// @Repository
// public interface SummaryStatRepo extends JpaRepository<StatisticsSummary, Long> {
//    StatisticsSummary findOneByAccountId(Long account_id);
// }
package com.example.demo.repository;

import com.example.demo.model.StatisticsSummary;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SummaryStatRepo extends JpaRepository<StatisticsSummary, Long> {
    StatisticsSummary findOneByUserId(Long user_id);
}
