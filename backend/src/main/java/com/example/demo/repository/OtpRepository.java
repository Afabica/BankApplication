package com.example.demo.repository;

import com.example.demo.model.OTPUser;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;

@Repository
public interface OtpRepository extends JpaRepository<OTPUser, Long> {
    OTPUser findByPhoneNumber(String phoneNumber);

    OTPUser findByOtpCode(String otpCode);

    //    OTPUser findByCustomerId(Long customer_id);

    //    @Transactional
    //    @Modifying
    //    @Query("DELETE FROM OTPUser o WHERE o.expiresAt < :now")
    //    void deleteExpiredOtps(LocalDateTime now);
    void deleteByCreatedAtBefore(LocalDateTime createdAt);
}
