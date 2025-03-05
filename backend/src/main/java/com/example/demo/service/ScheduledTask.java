package com.example.demo.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import com.example.demo.repository.OtpRepository;
import com.example.demo.repository.RegisterRepo;
import com.example.demo.repository.LoginRepo;
import com.example.demo.model.RegisterUser; 
import com.example.demo.model.LoginUser;
import com.example.demo.model.OTPUser;
import java.util.ArrayList;

import java.util.List;
import java.util.Optional;

@Service 
public class ScheduledTask {
    
    private OtpRepository otpRepository;
    private RegisterRepo registerRepo; 
    private LoginRepo loginRepo;

    @Autowired 
    public ScheduledTask(OtpRepository otpRepostiory, LoginRepo loginRepo, RegisterRepo registerRepo) {
        this.otpRepository = otpRepository;
        this.registerRepo = registerRepo; 
        this.loginRepo = loginRepo;
    }

//    public boolean verifyOtp(OTPUser otpuser, String otp) {
//        Optional<RegisterUser> registeredUser = registerRepo.findByPhoneNumber(otpuser.getPhoneNumber());
//        if(registeredUser.isPresent()) {
//            return otpuser.getOtpCode().equals(otp);  
//        } else {
//            return false;
//        }
//    }
      
    @Scheduled(fixedRate = 60000)
    public void deleteUserifOtpValid(String otp) {
       List<OTPUser> otplist =  otpRepository.findAll();
       for(OTPUser user : otplist) {
             deleteOldData(user); 
       }
    }

    private void deleteOldData(OTPUser otpcode) {
        long thresholdTime = System.currentTimeMillis() - 100 * 60 * 60 + 24;
        otpRepository.deleteByCreatedAtBefore(thresholdTime);
        System.out.println("Old data deleted successfully for user: " + otpcode.getPhoneNumber());
    }

}
