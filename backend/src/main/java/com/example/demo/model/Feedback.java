//package com.example.demo.model;
//
//import org.springframework.data.annotation.Id;
//import org.springframework.data.mongodb.core.mapping.Document;
//
//
//@Document(collection = "feedbacks")
//public class Feedback {
//
//    @Id
//    private String id;
//    private String name; 
//    private String email;
//    private String message;
//    private int rating;
//
//    public Feedback(String id, String name, String email, String message, int rating) {
//        this.id = id;
//        this.name = name;
//        this.email = email;
//        this.message = message; 
//        this.rating = rating;
//    }
//
//    public String getId() {
//        return id;
//    }
//
//    public void setId(String id) {
//        this.id = id;
//    }
//
//    public String getName() {
//        return name;
//    }
//
//    public void setName(String name) {
//        this.name = name;
//    }
//
//    public String getEmail() {
//        return email;
//    }
//
//    public void setEmail(String email) {
//        this.email = email;
//    }
//
//    public String getMessage() {
//        return message;
//    }
//
//    public void setMessage(String message) {
//        this.message = message;
//    }
//    
//    public int getRating() {
//        return rating;
//    }
//
//    public void setRating(int rating) {
//        this.rating = rating;
//    }
//}
