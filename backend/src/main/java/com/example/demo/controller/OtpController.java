package com.example.demo.controller;

import com.example.demo.model.OTPUser;
import com.example.demo.service.SmsService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/otp")
public class OtpController {

    private final SmsService smsService;

    @Autowired
    public OtpController(SmsService smsService) {
        this.smsService = smsService;
    }

    @PostMapping("/send")
    public ResponseEntity<String> sendOtp(@RequestBody OTPUser user) {
        try {
            OTPUser otpuser = smsService.sendOtp(user);
            return ResponseEntity.ok("OTP send successfully to" + user.getPhoneNumber());
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error sending OTP: " + e.getMessage());
        }
    }

    @PostMapping("/verify")
    public String verifyOtp(@RequestParam String phoneNumber, @RequestParam String otpCode) {
        boolean isVerified = smsService.verifyOtpCode(phoneNumber, otpCode);
        if (isVerified) {
            return "OTP verified successfully for " + phoneNumber;
        } else {
            return "Invalid or expired OTP. Verification failed.";
        }
    }

    @PostMapping("/resend")
    public ResponseEntity<?> resendOtp(@RequestParam String phoneNumber) {
        
    }

    //    @GetMapping("/notifications")
    //    public List<notifications> fetchUserNotifications(@Request Long user_id) {
    //        try {
    //            return smsService.fetchUserNotifications(user_id);
    //        } catch (Exception e) {
    //            throw new IllegalStateException("Error fetching notifications");
    //        }
    //    }
}
