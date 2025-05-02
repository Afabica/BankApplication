package com.example.demo.service;

import com.example.demo.model.LoginUser;
import com.example.demo.repository.LoginRepo;
import com.example.demo.model.RegisterUser;
import com.example.demo.repository.RegisterRepo;
import com.example.demo.jwtsecurity.JwtUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.context.annotation.Bean;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.context.annotation.Lazy;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import javax.crypto.SecretKey;
import jakarta.validation.Valid;

import jakarta.persistence.*;

import java.util.*;

@Service
public class UserService  {

    private final LoginRepo loginRepo;
    private final RegisterRepo registerRepo;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtils jwtUtils;

SecretKey key = Keys.secretKeyFor(SignatureAlgorithm.HS512);

    @Autowired
    public UserService(@Lazy LoginRepo loginRepo, @Lazy PasswordEncoder passwordEncoder, @Lazy RegisterRepo registerRepo, JwtUtils jwtUtils) {
        this.loginRepo = loginRepo;
        this.passwordEncoder = passwordEncoder;
        this.registerRepo = registerRepo;
        this.jwtUtils = jwtUtils;

    }

	public List<LoginUser> findAllUser() {
		return loginRepo.findAll();
	}
    
    public String deleteUserById(Long id) {
        Optional<RegisterUser> user = registerRepo.findById(id);
        if (user.isPresent()) {
            registerRepo.deleteById(id);
            loginRepo.deleteById(id);
            return "User deleted successfully";
        } else {
            return "User no found";
        }
    }

    public RegisterUser registerUser(RegisterUser userDto) {
        if (registerRepo.existsByUsername(userDto.getUsername())) {
                throw new IllegalArgumentException("Username already exists");
            //return false;
        }
        userDto.setPassword(passwordEncoder.encode(userDto.getPassword()));
        LoginUser loginUser = new LoginUser();
        loginUser.setPassword(userDto.getPassword());
        loginUser.setUsername(userDto.getUsername());
        loginRepo.save(loginUser);

        return registerRepo.save(userDto);
    }

     public String authenticate(LoginUser loginDto) {
        LoginUser user = loginRepo.findByUsername(loginDto.getUsername())
                .orElseThrow(() -> new IllegalArgumentException("Invalid username or password"));

        if (!passwordEncoder.matches(loginDto.getPassword(), user.getPassword())) {
            throw new IllegalArgumentException("Invalid username or password");
        }
//        return Jwts.builder()
//                .setSubject(user.getUsername())
//                .setIssuedAt(new Date())
//                .setExpiration(new Date(System.currentTimeMillis() + 86400000)) // Token expires in 1 day
//                .signWith(key)
//                .compact();
        return jwtUtils.generatingToken(user);
    }

     public String authenticateWithoutEncryption(LoginUser loginDto) {
        LoginUser user = loginRepo.findByUsername(loginDto.getUsername())
                .orElseThrow(() -> new IllegalArgumentException("Invalid username or password"));

        if (!loginDto.getPassword().equals(user.getPassword())) {
            throw new IllegalArgumentException("Invalid username or password");
        }

        // Generate a JWT token (for simplicity, using "secret-key")
//        return Jwts.builder()
//                .setSubject(user.getUsername())
//                .setIssuedAt(new Date())
//                .setExpiration(new Date(System.currentTimeMillis() + 86400000)) // Token expires in 1 day
//                .signWith(key)
//                .compact();
       return  jwtUtils.generatingToken(user);
    }

//    public boolean validateToken(String token, String username) {
//        return (username.equals(extractUsername(token)) && !isTokenExpired(token));
//    }
} 
