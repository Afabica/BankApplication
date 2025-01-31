package com.example.demo.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import com.example.demo.service.SmsService;
import com.example.demo.model.OTPUser;
import org.springframework.http.ResponseEntity;

@RestController
@RequestMapping("/api/otp")
public class OtpController {

    private final SmsService smsService;

    

    @Autowired
    public OtpController(SmsService smsService) {
        this.smsService = smsService;
    }

    @PostMapping("/send")
    public ResponseEntity<String> sendOtp(@RequestBody OTPUser user){
        try {
            OTPUser otpuser = smsService.sendOtp(user);
            return ResponseEntity.ok("OTP sent successfully to " + user.getPhoneNumber());
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



}
//
//

//package com.example.demo.controller;
//
//import com.example.demo.model.OTPUser;
//import com.example.demo.service.SmsService;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.http.ResponseEntity;
//import org.springframework.web.bind.annotation.*;
//import com.example.demo.config.TwilioConfig;
//import com.twilio.Twilio;
//
//@RestController
//@RequestMapping("/api/otp")
//public class OtpController {
//
//    private final SmsService smsService;
//
//    private final TwilioConfig twilioConfig;
//
//    public static final String ACCOUNT_SID = "AC7ddb2e2a3f99a55994554a97ea4e7555";
//    public static final String AUTH_TOKEN = "366840a2ff73fd023ecf80fc545ce815";
//
//    @Autowired
//    public OtpController(SmsService smsService, TwilioConfig twilioConfig) {
//        this.smsService = smsService;
//        this.twilioConfig = twilioConfig;
//    }
//
//    // Endpoint to send OTP to the user via Twilio
//    @PostMapping("/send")
//    public ResponseEntity<String> sendOtp(@RequestBody OTPUser user) {
//        Twilio.init(
//                twilioConfig.getAccountSid(),
//                twilioConfig.getAuthToken()
//        );
//        try {
//            // Call service to send OTP
//          OTPUser otpUser = smsService.sendOtp(user);
//
//
//            // Return success message
//            return ResponseEntity.ok("OTP sent successfully to " + user.getPhoneNumber());
//        } catch (Exception e) {
//            // Handle error and return failure response
//            return ResponseEntity.badRequest().body("Error sending OTP: " + e.getMessage());
//        }
//    }
//
//    // Example of an endpoint to verify OTP (this can be expanded further as per your requirements)
////    @PostMapping("/verify")
////    public ResponseEntity<String> verifyOtp(@RequestParam String phoneNumber, @RequestParam String otpCode) {
////        try {
////            // Call service to verify OTP (implement verifyOtp in the service layer if needed)
////            boolean isVerified = smsService.verifyOtpCode(phoneNumber, otpCode);
////
////            // Return appropriate response based on OTP verification result
////            if (isVerified) {
////                return ResponseEntity.ok("OTP verified successfully for " + phoneNumber);
////            } else {
////                return ResponseEntity.badRequest().body("Invalid or expired OTP. Verification failed.");
////            }
////        } catch (Exception e) {
////            return ResponseEntity.badRequest().body("Error verifying OTP: " + e.getMessage());
////        }
////    }
//}

//package com.example.demo.controller;
//
//import org.springframework.http.HttpStatus;
//import org.springframework.http.ResponseEntity;
//import org.springframework.web.bind.annotation.GetMapping;
//import org.springframework.web.bind.annotation.RestController;
//
//import com.twilio.Twilio;
//import com.twilio.rest.api.v2010.account.Message;
//import com.twilio.type.PhoneNumber;
//
//@RestController
//public class OtpController {
//
//        @GetMapping(value = "/sendSMS")
//        public ResponseEntity<String> sendSMS() {
//
//                Twilio.init(System.getenv("AC7ddb2e2a3f99a55994554a97ea4e7555"), System.getenv("366840a2ff73fd023ecf80fc545ce815"));
//
//                Message.creator(new PhoneNumber("+421918960154"),
//                                new PhoneNumber("twiliosender"), "Hello from Twilio 📞").create();
//
//                return new ResponseEntity<String>("Message sent successfully", HttpStatus.OK);
//        }
//}
