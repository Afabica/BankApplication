package com.example.demo.service;

import com.example.demo.model.OTPUser;
import com.example.demo.repository.OtpRepository;
import com.example.demo.config.TwilioConfig;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import com.twilio.Twilio;
import com.twilio.rest.api.v2010.account.Message;
import com.twilio.type.PhoneNumber;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.text.DecimalFormat;
import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Random;

@Service
public class SmsService {

    private final OtpRepository otpRepository;
    private final TwilioConfig twilioConfig;
    private final PasswordEncoder passwordEncoder;

    private static final Logger LOGGER = LoggerFactory.getLogger(SmsService.class);

    public static final String ACCOUNT_SID = "AC7ddb2e2a3f99a55994554a97ea4e7555";
    public static final String AUTH_TOKEN = "366840a2ff73fd023ecf80fc545ce815";

    @Autowired
    public SmsService(OtpRepository otpRepository, TwilioConfig twilioConfig, PasswordEncoder passwordEncoder) {
        this.otpRepository = otpRepository;
        this.twilioConfig = twilioConfig;
        this.passwordEncoder = passwordEncoder;
    }

    public OTPUser sendOtp(OTPUser user) {
        // Initialize Twilio with account credentials
        Twilio.init(ACCOUNT_SID, AUTH_TOKEN);

        // Create OTP user record
        OTPUser otpUser = new OTPUser();
        otpUser.setPhoneNumber(user.getPhoneNumber());
        otpUser.setCreatedAt(LocalDateTime.now());
        otpUser.setExpiresAt(LocalDateTime.now().plusMinutes(5)); // OTP expires in 5 minutes
        otpUser.setOtpCode(generateOtp(user.getPhoneNumber()));
        otpUser.setVerified(false); // Initially, OTP is not verified

        // Send the OTP via SMS
        sendSms(otpUser.getPhoneNumber(), otpUser.getOtpCode());

        // Save OTP details to the database
        return otpRepository.save(otpUser);
    }

    private String generateOtp(String phoneNo) {
        HashMap<String, String> otpData = getRandomOtp(phoneNo);
        return otpData.get(phoneNo);
    }

    private HashMap<String, String> getRandomOtp(String phoneNo) {
        String otp = new DecimalFormat("000000").format(new Random().nextInt(999999));
        HashMap<String, String> data = new HashMap<>();
        data.put(phoneNo, otp);
        return data;
    }

    public boolean verifyOtpCode(String phoneNumber, String otpCode) {
        OTPUser otpUser = otpRepository.findByOtpCode(otpCode);
        if (otpUser != null && otpUser.getPhoneNumber().equals(phoneNumber) &&
                otpUser.getExpiresAt().isAfter(LocalDateTime.now())) {
            return true;
        }
        return false;
    }

    private void sendSms(String toPhoneNumber, String otpCode) {
        try {
            PhoneNumber to = new PhoneNumber(toPhoneNumber);
            PhoneNumber from = new PhoneNumber("+16088798709"); // Replace with your Twilio phone number
            String message = "Your OTP code is: " + otpCode;

            Message.creator(to, from, message).create();
            LOGGER.info("OTP sent successfully to {}", toPhoneNumber);
        } catch (Exception e) {
            LOGGER.error("Failed to send SMS to {}: {}", toPhoneNumber, e.getMessage());
        }
    }

    public void cleanupExpiredOtps() {
        otpRepository.deleteExpiredOtps(LocalDateTime.now());
    }
}

