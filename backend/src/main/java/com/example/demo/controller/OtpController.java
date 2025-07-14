package com.example.demo.controller;

import com.example.demo.model.OTPUser;
import com.example.demo.model.RegisterUser;
import com.example.demo.service.SmsService;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/otp")
public class OtpController {

    private final SmsService smsService;
    private static final Logger LOGGER = LoggerFactory.getLogger(OtpController.class);

    @Autowired
    public OtpController(SmsService smsService) {
        this.smsService = smsService;
    }

    @PostMapping("/send")
    public ResponseEntity<String> sendOtp(@RequestBody OTPUser user) {
        try {
            OTPUser otpUser = smsService.sendOtp(user);
            if (otpUser != null) {
                LOGGER.info("OTP sent successfully to {}", user.getPhoneNumber());
                return ResponseEntity.ok("OTP sent successfully to " + user.getPhoneNumber());
            } else {
                LOGGER.warn("Failed to send OTP to {}", user.getPhoneNumber());
                return ResponseEntity.status(500).body("Failed to send OTP");
            }
        } catch (Exception e) {
            LOGGER.error("Error sending OTP to {}: {}", user.getPhoneNumber(), e.getMessage());
            return ResponseEntity.badRequest().body("Error sending OTP: " + e.getMessage());
        }
    }

    @PostMapping("/verify")
    public ResponseEntity<String> verifyOtp(
            @RequestParam String phoneNumber, @RequestParam String otpCode) {
        try {
            boolean isVerified = smsService.verifyOtpCode(phoneNumber, otpCode);
            if (isVerified) {
                LOGGER.info("OTP verified successfully for {}", phoneNumber);
                return ResponseEntity.ok("OTP verified successfully for " + phoneNumber);
            } else {
                LOGGER.warn("Invalid or expired OTP for {}", phoneNumber);
                return ResponseEntity.status(400)
                        .body("Invalid or expired OTP. Verification failed.");
            }
        } catch (Exception e) {
            LOGGER.error("Error verifying OTP for {}: {}", phoneNumber, e.getMessage());
            return ResponseEntity.status(500).body("Error verifying OTP: " + e.getMessage());
        }
    }

    @PutMapping("/update")
    public ResponseEntity<String> updatePassword(
            @RequestParam("user_id") Long id, @RequestBody RegisterUser userInfo) {
        try {
            boolean processResult = smsService.updateUserCredentials(id, userInfo);
            if (processResult) {
                LOGGER.info("User credentials updated successfully for user id {}", id);
                return ResponseEntity.ok("User credentials updated successfully");
            } else {
                LOGGER.warn("Failed to update user credentials for user id {}", id);
                return ResponseEntity.status(400).body("User credentials not updated successfully");
            }
        } catch (Exception e) {
            LOGGER.error("Error updating credentials for user id {}: {}", id, e.getMessage());
            return ResponseEntity.status(500)
                    .body("Error updating user credentials: " + e.getMessage());
        }
    }

    // Uncomment and implement if needed
    // @GetMapping("/notifications")
    // public ResponseEntity<List<Notifications>> fetchUserNotifications(@RequestParam Long userId)
    // {
    //     try {
    //         List<Notifications> notifications = smsService.fetchUserNotifications(userId);
    //         return ResponseEntity.ok(notifications);
    //     } catch (Exception e) {
    //         LOGGER.error("Error fetching notifications for user id {}: {}", userId,
    // e.getMessage());
    //         return ResponseEntity.status(500).build();
    //     }
    // }
}
