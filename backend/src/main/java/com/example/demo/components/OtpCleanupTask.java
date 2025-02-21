package com.example.demo.components;

import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;
import org.springframework.scheduling.annotation.SCheduled;
import com.example.demo.repository.OtpRepository;

@Service
public class OtpCleanupTask {

    private OtpRepository otpRepository;

    public OtpCleanupTask(OtpRepository otpRepository) {
        this.otpRepository = otpRepository;
    }

    @Scheduled(fixedRate = 180000)
    public void cleanUp() {
        LocalDataTime now = LocalDateTime.now();
        otpRepository.deleteByExpiresAtBefore(now);
        System.out.println("Expired OTPS deleted at: " + now);
    }
}

