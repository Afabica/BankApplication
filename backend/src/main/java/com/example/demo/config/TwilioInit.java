//package com.example.demo.config;
//
//import com.twilio.Twilio;
//import org.slf4j.Logger;
//import org.slf4j.LoggerFactory;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.context.annotation.Configuration;
//import com.example.demo.config.TwilioConfig;
//import jakarta.annotation.PostConstruct;
//
//@Configuration
//public class TwilioInit {
//
//    private final static Logger LOGGER = LoggerFactory.getLogger(TwilioInit.class);
//
//    @Autowired
//    private final TwilioConfig twilioConfig;
//
//    @Autowired
//    public TwilioInit(TwilioConfig twilioConfig) {
//        this.twilioConfig = twilioConfig;
//    }
//
//
//    //@PostConstruct
//    public void init() {
//        Twilio.init(
//                twilioConfig.getAccountSid(),
//                twilioConfig.getAuthToken()
//        );
//        LOGGER.info("Twilio initialized ... with account sid {} ", twilioConfig.getAccountSid());
//    }
//}
