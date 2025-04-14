//package com.example.demo.controller;
//
//import com.example.demo.service.FeedbackService;
//import com.example.demo.model.Feedback;
//import org.springframework.web.bind.annotation.*;
//import org.springframework.http.ResponseEntity;
//import com.example.demo.repository.FeedbackRepo;
//
//import java.util.List;
//
//@RestController 
//@RequestMapping("/api")
//public class FeedbackCont {
//
//    private final FeedbackService feedbackService;
//    private final FeedbackRepo feedbackRepo;
//
//    public FeedbackCont(FeedbackService feedbackService, FeedbackRepo feedbackRepo) {
//        this.feedbackService = feedbackService;
//        this.feedbackRepo = feedbackRepo;
//    } 
//
//    @GetMapping 
//    public List<Feedback> getAllFeedbacks() {
//        return feedbackService.findAll();
//    }
//
//    @PostMapping("/feedback")
//    public ResponseEntity<String> submitFeedback(@RequestBody Feedback feedback) {
//        try {
//            feedbackRepo.save(feedback); 
//            return ResponseEntity.ok("Feedback submmitted successfully!");
//        } catch (Exception e) {
//            return ResponseEntity.status(500).body("Error saving feedback: " + e.getMessage());
//        }
//    }
//
//    @PostMapping 
//    public Feedback createUser(@RequestBody Feedback feedback) {
//        return feedbackService.save(feedback);
//    }
//
//}
