//package com.example.demo.components;
//
//import org.springframework.scheduling.annotation.Scheduled;
//import org.springframework.stereotype.Component;
//
//@Component
//public class OtpCleanupTask {
//    private final OtpService otpService;
//
//    public OtpCleanupTask(OtpService otpService) {
//        this.otpService = otpService;
//    }
//
//    @Scheduled(cron = "0 0 * * * *") // Runs every hour
//    public void cleanUp() {
//        otpService.cleanupExpiredOtps();
//    }
//}
//
