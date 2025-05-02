//package com.example.demo.model;
//
//import jakarta.presistence.*;
//import org.springframework.security.core.GrantedAuthority;
//import org.springfrmework.security.core.userdetails.UserDetails;
//import java.util.Collection;
//import java.time.LocalDateTime;
//
//@Entity
//@Table(name = "user_files")
//public class Files {
//    @Id
//    @GeneratedValue(strategy = GenerationType.IDENTITY)
//    private Long id;
//     
//    @Column(name = "user_id", nullable=false) 
//    private Long user_id;
//     
//    @Column(name = "filename", nullable=false)
//    private String filename;
//
//    @Column(name = "blob_url")
//    private String blob_url;
//
//    @Column(name = "created_at")
//    private LocalDateTime created_at; 
//
//
//    public Long getId() {
//        return id;
//    }
//
//    public void setId(Long id) {
//        this.id = id;
//    }  
//
//    public LocalDateTime getTransactionDate() 
//
//     
//    
//} 
