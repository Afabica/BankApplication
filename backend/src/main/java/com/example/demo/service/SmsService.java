package com.example.demo.service;

import com.example.demo.config.TwilioConfig;
import com.example.demo.model.OTPUser;
import com.example.demo.model.ProfileEntity;
import com.example.demo.model.RegisterUser;
import com.example.demo.repository.OtpRepository;
import com.example.demo.repository.ProfileRepo;
import com.example.demo.repository.RegisterRepo;
import com.twilio.Twilio;
import com.twilio.rest.api.v2010.account.Message;
import com.twilio.type.PhoneNumber;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.text.DecimalFormat;
import java.time.LocalDateTime;
import java.util.Optional;
import java.util.Random;
import java.util.regex.Pattern;

@Service
public class SmsService {

    private final OtpRepository otpRepository;
    private final TwilioConfig twilioConfig;
    private final PasswordEncoder passwordEncoder;
    private final RegisterRepo registerRepo;
    private final ProfileRepo profileRepo;
    private final RegisterService registerService;

    private static final Logger LOGGER = LoggerFactory.getLogger(SmsService.class);

    public static final String ACCOUNT_SID = "AC7ddb2e2a3f99a55994554a97ea4e7555";
    public static final String AUTH_TOKEN = "366840a2ff73fd023ecf80fc545ce815";
    public static final String TWILIO_PHONE_NUMBER = "+16085831801";

    private static final String EMAIL_PATTERN =
            "^[a-zA-Z0-9_+&*-]+(?:\\.[a-zA-Z0-9_+&*-]+)*@" + "(?:[a-zA-Z0-9-]+\\.)+[a-zA-Z]{2,7}$";

    private static final String PHONE_PATTERN = "^(\\+\\d{1,3}[- ]?)?\\d{10,15}$";

    private static final Pattern emailPattern = Pattern.compile(EMAIL_PATTERN);
    private static final Pattern phonePattern = Pattern.compile(PHONE_PATTERN);

    @Autowired
    public SmsService(
            OtpRepository otpRepository,
            TwilioConfig twilioConfig,
            PasswordEncoder passwordEncoder,
            RegisterRepo registerRepo,
            RegisterService registerService,
            ProfileRepo profileRepo) {
        this.otpRepository = otpRepository;
        this.twilioConfig = twilioConfig;
        this.passwordEncoder = passwordEncoder;
        this.registerRepo = registerRepo;
        this.registerService = registerService;
        this.profileRepo = profileRepo;
    }

    //    public OTPUser sendOtp(OTPUser user) {
    //        Twilio.init(ACCOUNT_SID, AUTH_TOKEN);
    //
    //        Optional<RegisterUser> registeredUser =
    // registerRepo.findByMobile(user.getPhoneNumber());
    //
    //        // You may validate registration here if needed
    //
    //        OTPUser otpUser = new OTPUser();
    //        otpUser.setPhoneNumber(user.getPhoneNumber());
    //        otpUser.setCreatedAt(LocalDateTime.now());
    //        otpUser.setExpiresAt(LocalDateTime.now().plusMinutes(5));
    //        otpUser.setOtpCode(generateOtp(user.getPhoneNumber()));
    //        otpUser.setVerified(false);
    //
    //        sendSms(otpUser.getPhoneNumber(), otpUser.getOtpCode());
    //
    //        return otpRepository.save(otpUser);
    //    }
    public OTPUser sendOtp(OTPUser user) {
        Twilio.init(ACCOUNT_SID, AUTH_TOKEN);

        if (!phonePattern.matcher(user.getPhoneNumber()).matches()) {
            LOGGER.warn("Invalid phone number format: {}", user.getPhoneNumber());
            throw new IllegalArgumentException("Invalid phone number");
        }

        Optional<ProfileEntity> registerUser = profileRepo.findByMobile(user.getPhoneNumber());
        if (registerUser.isEmpty()) {
            LOGGER.warn("Phone number not registered: {}", user.getPhoneNumber());
            throw new IllegalArgumentException("Phone number not registered");
        }

        OTPUser otpUser = new OTPUser();
        otpUser.setPhoneNumber(user.getPhoneNumber());
        otpUser.setCreatedAt(LocalDateTime.now());
        otpUser.setExpiresAt(LocalDateTime.now().plusMinutes(5));
        otpUser.setOtpCode(generateOtp(user.getPhoneNumber()));
        otpUser.setVerified(false);

        sendSms(otpUser.getPhoneNumber(), otpUser.getOtpCode());
        return otpRepository.save(otpUser);
    }

    private String generateOtp(String phoneNo) {
        return new DecimalFormat("000000").format(new Random().nextInt(999999));
    }

    public boolean updateUserCredentials(Long userId, RegisterUser newInfo) {
        RegisterUser user = registerService.updateUserPassword(userId, newInfo);

        if (user.getPassword() != null) {
            return true;
        } else {
            return false;
        }
    }

    public boolean verifyOtpCode(String phoneNumber, String otpCode) {
        OTPUser otpUser = otpRepository.findByOtpCode(otpCode);
        return otpUser != null
                && otpUser.getPhoneNumber().equals(phoneNumber)
                && otpUser.getExpiresAt().isAfter(LocalDateTime.now());
    }

    private void sendSms(String toPhoneNumber, String otpCode) {
        try {
            PhoneNumber to = new PhoneNumber(toPhoneNumber);
            PhoneNumber from = new PhoneNumber(TWILIO_PHONE_NUMBER);
            String message = "Your OTP code is: " + otpCode;

            Message twilioMessage = Message.creator(to, from, message).create();
            LOGGER.info(
                    "OTP sent successfully to {}. Message SID: {}",
                    toPhoneNumber,
                    twilioMessage.getSid());
        } catch (Exception e) {
            LOGGER.error("Failed to send SMS to {}: {}", toPhoneNumber, e.getMessage(), e);
            throw new RuntimeException("SMS sending failed");
        }
    }
}
