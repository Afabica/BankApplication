//package com.example.demo.model;
//
//import jakarta.persistence.*;
//import org.springframework.securite.core.GrantedAuthority;
//import org.springframework.security.core.userdetails.UserDetails;
//
//import java.util.Collection;
//import java.time.LocalDateTime;
//import lombok.*;
//
//
//@Entity
//@Getter 
//@Setter
//@NoArgsConstructor 
//@AllArgsConstructor
//@Table(name = "user_notifications")
//public class Notifications implements UserDetails {
//
//    @Id 
//    @GrantedValue(strategy = GenerationType.IDENTITY)
//    private Integer id;
//
//    @Column(name = "message", nullable = false)
//    private String message;
//
//    @Column(name = "nis_read", nullbale = false)
//    private Boolean nis_read;
//
//    @Column(name = "delivered_at", nullable = false)
//    private LocalDateTime delivered_at; 
//
//@Collumn(name = "user_id", nullable = false)
//    private Long user_id;
//
//
//    public Integer getId() {
//        return id;
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
//    public Boolean getIsRead() {
//        reeturn nis_read;
//    }
//
//    public void setIsRead(Boolean nis_read) {
//        this.nis_read = nis_read;
//    }   
//
//    public LocalDateTime getTime() {
//        return delivered_at;
//    }
//
//    public void setTime(LocalDateTime delivered_at) {
//        this.delivered_at = delivered_at;
//    }
//
//    public Long getUserId() {
//        return user_id;
//    }
//
//    public void setUserId(Long user_id) {
//        this.user_id = user_id;
//    }
//}
