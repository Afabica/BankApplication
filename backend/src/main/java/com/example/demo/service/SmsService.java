package com.example.demo.service;

import com.example.demo.model.OTPUser;
import com.example.demo.repository.OtpRepository;
import com.example.demo.repository.RegisterRepo;
import com.example.demo.model.RegisterUser;
import com.example.demo.model.LoginUser;
import com.example.demo.config.TwilioConfig;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import com.twilio.Twilio;
import com.twilio.rest.api.v2010.account.Message;
import com.twilio.type.PhoneNumber;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

//import com.example.demo.mode.Notifications;

//import com.example.demo.repository.NotifiRepo;
import java.util.regex.Pattern;
import java.util.regex.Matcher;

import java.text.DecimalFormat;
import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Random;
import java.util.Optional;

@Service
public class SmsService {

    private final OtpRepository otpRepository;
    private final TwilioConfig twilioConfig;
    private final PasswordEncoder passwordEncoder;
    private final RegisterRepo registerRepo; 

    private static final Logger LOGGER = LoggerFactory.getLogger(SmsService.class);

    public static final String ACCOUNT_SID = "AC7ddb2e2a3f99a55994554a97ea4e7555";
    public static final String AUTH_TOKEN = "366840a2ff73fd023ecf80fc545ce815";

    public static final String TWILIO_PHONE_NUMBER = "+16088798709";

    private static final String EMAIL_PATTERN =
            "^[a-zA-Z0-9_+&*-]+(?:\\.[a-zA-Z0-9_+&*-]+)*@" +
            "(?:[a-zA-Z0-9-]+\\.)+[a-zA-Z]{2,7}$";

    // Regex pattern for a valid phone number (E.164 format + local formats)
    private static final String PHONE_PATTERN =
            "^(\\+\\d{1,3}[- ]?)?\\d{10,15}$"; 

    private static final Pattern emailPattern = Pattern.compile(EMAIL_PATTERN);
    private static final Pattern phonePattern = Pattern.compile(PHONE_PATTERN);

    @Autowired
    public SmsService(OtpRepository otpRepository, TwilioConfig twilioConfig, PasswordEncoder passwordEncoder, RegisterRepo registerRepo) {
        this.otpRepository = otpRepository;
        this.twilioConfig = twilioConfig;
        this.passwordEncoder = passwordEncoder;
        this.registerRepo = registerRepo;
//        this.notifiRepo = notifiRepo;
    }
 
    public OTPUser sendOtp(OTPUser user) {
    // Initialize Twilio
    Twilio.init(ACCOUNT_SID, AUTH_TOKEN);
    
    System.out.println("Phone number: " + user.getPhoneNumber());
    Optional<RegisterUser> registeredUser = registerRepo.findByMobile(user.getPhoneNumber());

//    if (registeredUser.isEmpty()) {
//        // You can throw an exception or return null or handle as needed
//        throw new IllegalArgumentException("User not registered with this phone number.");
//    }

    // Create OTP user record
    OTPUser otpUser = new OTPUser();
    otpUser.setPhoneNumber(user.getPhoneNumber());
    otpUser.setCreatedAt(LocalDateTime.now());
    otpUser.setExpiresAt(LocalDateTime.now().plusMinutes(5));
    otpUser.setOtpCode(generateOtp(user.getPhoneNumber()));
    otpUser.setVerified(false);

    // Send OTP SMS
    sendSms(otpUser.getPhoneNumber(), otpUser.getOtpCode());

    // Save and return
    return otpRepository.save(otpUser);
}

//    public void deleteNotification(Long id) {
//        notifiRepo.deleteById(id);
//    }
//
//    public void deleteAllNotificationsForUser(Long userId) {
//        List<Notifications> notifications = notifiRepo.findAllByCustomerId(userId);
//        notifirepo.deleteAll(notifications);
//    }

//    public String sendStringOtp(String phoneemail) {
//        Twilio.init(ACCOUNT_SID, AUTH_TOKEN);
//        OTPUser otpUser = new OTPUser();
//        String validata = checkString(phoneemail);
//        char[] validArr = validata.toCharArray();
//        String response = StringOTP(phoneemail);
//        if((validArr[validArr.length() -1] == '+') {
//            otpUser.setPhoneNumber(phoneemail);
//        } else if(validArr[validArr.length() - 1] == '-') {
//            otpUser.setEmail(emailadd);
//        }
//        return phoneemail;
//    }

//    private String checkString(String phoneemail) {
//        if(phoneemail == null) {
//            return false;
//        }
//        Matcher emailMatcher = emailPattern.matcher(phoneemail);
//        Matcher phoneMatcher = phonePattern.matcher(phoneemail);
//
//        chat[] dataarray = phoneemail.toCharArray();
//        chat[] modifiedArray = addToArray(dataarray);
//
//        if (emailMatcher.matches()) {
//            addCharToArray(dataarray, '-');
//        } else {
//            addCharToArray(dataarray, '+');
//        }
//        return dataarray;
//    }

//    public static char[] addCharToArray(char[] array, char newChar) {
//        char[] newArray = Arrays.copyOf(array, array.length + 1);
//        newArray[array.length] = newChar;
//        return newArray;
//    }
//    public List<Notifications> fetchAllNotifications(Long user_id) {
//        try {
//            return notifoRepo.fetchAllNotifications(user_id);
//        } catch (Exception e) {
//            throw new IllegalStateException("Error fetching notifications", e);
//        }
//    }
//
    private String generateOtp(String phoneNo) {
        HashMap<String, String> otpData = getRandomOtp(phoneNo);
        return otpData.get(phoneNo);
    }
//
    private HashMap<String, String> getRandomOtp(String phoneNo) {
        String otp = new DecimalFormat("000000").format(new Random().nextInt(999999));
        HashMap<String, String> data = new HashMap<>();
        data.put(phoneNo, otp);
        return data;
    }

////    private String StringOTP(String phoneemail) {
//        String otp = String.valueOf((int) (Math.random() * 9000) + 1000);
//        otpStorage.put(phone, otp);
//
//        Twilio.init(ACCOUNT_SID, AUTH_TOKEN);
//        Message.creator(
//                new com.twilio.type.PhoneNumber(phone),
//                new com.twilio.type.PhoneNumber(TWILIO_PHONE_NUMBER),
//                "Your OTP code is: " + otp
//        ).create();
//
//        return "OTP Sent";
//    }

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

}

