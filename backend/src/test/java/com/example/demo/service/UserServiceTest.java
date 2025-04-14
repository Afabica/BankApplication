//package com.example.demo.service;
//
//import com.example.demo.model.LoginUser;
//import com.example.demo.model.RegisterUser;
//import com.example.demo.repository.LoginRepo;
//import com.example.demo.repository.RegisterRepo;
//import org.junit.jupiter.api.BeforeEach;
//import org.junit.jupiter.api.Test;
//import org.mockito.InjectMocks;
//import org.mockito.Mock;
//import org.mockito.Mockito;
//import org.mockito.junit.jupiter.MockitoExtension;
//import org.springframework.security.crypto.password.PasswordEncoder;
//import static org.junit.jupiter.api.Assertions.*;
//import org.junit.jupiter.api.extension.ExtendWith;
//import java.time.LocalDate;
//import java.util.Optional;
//
//@ExtendWith(MockitoExtension.class)
//public class UserServiceTest {
//
//    @Mock
//    private LoginRepo loginRepo;
//
//    @Mock
//    private RegisterRepo registerRepo;
//
//    @Mock
//    private PasswordEncoder passwordEncoder;
//
//    @InjectMocks
//    private UserService userService;
//
//    private LoginUser loginUser;
//    private RegisterUser registerUser;
//
//    @BeforeEach
//    public void setUp() {
//        loginUser = new LoginUser();
//        loginUser.setUsername("testuser");
//        loginUser.setPassword("password123");
//
//        registerUser = new RegisterUser();
//        registerUser.setUsername("testuser");
//        registerUser.setPassword("password123");
//        registerUser.setFullName("testuser adolf");
//        registerUser.setDob(LocalDate.now());
//    }
//
//    @Test
//    public void testRegisterUser_Success() {
//        // Mock behavior of the repositories
//        Mockito.when(registerRepo.existsByUsername(registerUser.getUsername())).thenReturn(false);
//        Mockito.when(passwordEncoder.encode(registerUser.getPassword())).thenReturn("$2a$10$ztH5vNu5G4txj6GUni8B7.bl5jy07/Wuhw23x8K0TWNwZQtnSquGG");
//        Mockito.when(loginRepo.save(Mockito.any(LoginUser.class))).thenReturn(loginUser);
//        Mockito.when(registerRepo.save(Mockito.any(RegisterUser.class))).thenReturn(registerUser);
//
//        // Call the method
//        RegisterUser result = userService.registerUser(registerUser);
////        loginRepo.save(loginUser);
//
//        // Verify results
//        assertNotNull(result);
//        assertEquals("testuser", result.getUsername());
//        assertEquals("$2a$10$ztH5vNu5G4txj6GUni8B7.bl5jy07/Wuhw23x8K0TWNwZQtnSquGG", result.getPassword());
//        Mockito.verify(loginRepo).save(Mockito.any(LoginUser.class));  // Ensure LoginRepo save is called
//        Mockito.verify(registerRepo).save(Mockito.any(RegisterUser.class));  // Ensure RegisterRepo save is called
//    }
//
//    @Test
//    public void testRegisterUser_UsernameAlreadyExists() {
//        // Mock behavior for existing username
//        Mockito.when(registerRepo.existsByUsername(registerUser.getUsername())).thenReturn(true);
//
//        // Call the method and expect an exception
//        IllegalArgumentException exception = assertThrows(IllegalArgumentException.class, () -> {
//            userService.registerUser(registerUser);
//        });
//
//        assertEquals("Username already exists", exception.getMessage());
//    }
//
//    @Test
//    public void testAuthenticate_Success() {
//        // Mock behavior for the loginRepo and passwordEncoder
//        Mockito.when(loginRepo.findByUsername(loginUser.getUsername())).thenReturn(Optional.of(loginUser));
//        Mockito.when(passwordEncoder.matches(loginUser.getPassword(), "password123")).thenReturn(true);
//
//        // Call the authenticate method
//        String token = userService.authenticate(loginUser);
//
//        // Verify that the method generates a token
//        assertNotNull(token);
//        assertTrue(token.startsWith("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9"));  // JWT token should start with this part (as example)
//    }
//
//    @Test
//    public void testAuthenticate_InvalidUsernameOrPassword() {
//        // Mock behavior for invalid credentials
//        Mockito.when(loginRepo.findByUsername(loginUser.getUsername())).thenReturn(Optional.of(loginUser));
//        Mockito.when(passwordEncoder.matches(Mockito.anyString(), Mockito.anyString())).thenReturn(false);
//
//        // Call the method and expect an exception
//        IllegalArgumentException exception = assertThrows(IllegalArgumentException.class, () -> {
//            userService.authenticate(loginUser);
//        });
//
//        assertEquals("Invalid username or password", exception.getMessage());
//    }

//    @Test
//    public void testAuthenticateWithoutEncryption_Success() {
//        // Mock behavior for the loginRepo
//        Mockito.when(loginRepo.findByUsername(loginUser.getUsername())).thenReturn(Optional.of(loginUser));
//
//        // Call the authenticateWithoutEncryption method
//        String token = userService.authenticateWithoutEncryption(loginUser);
//
//        // Verify that the method generates a token
//        assertNotNull(token);
//        assertTrue(token.startsWith("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9"));
//    }
//
//    @Test
//    public void testAuthenticateWithoutEncryption_InvalidUsernameOrPassword() {
//        // Mock behavior for invalid credentials
//        Mockito.when(loginRepo.findByUsername(loginUser.getUsername())).thenReturn(Optional.of(loginUser));
//
//        // Call the method and expect an exception
//        loginUser.setPassword("wrongPassword");
//        IllegalArgumentException exception = assertThrows(IllegalArgumentException.class, () -> {
//            userService.authenticateWithoutEncryption(loginUser);
//        });
//
//        assertEquals("//import org.junit.jupiter.api.extension.ExtendWith Invalid username or password", exception.getMessage());
//    }
//}
//

package com.example.demo.service;

import com.example.demo.jwtsecurity.JwtUtils;
import com.example.demo.model.LoginUser;
import com.example.demo.model.RegisterUser;
import com.example.demo.repository.LoginRepo;
import com.example.demo.repository.RegisterRepo;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.crypto.password.PasswordEncoder;

import static org.junit.jupiter.api.Assertions.*;
import org.junit.jupiter.api.extension.ExtendWith;

import java.time.LocalDate;
import java.util.Optional;

@ExtendWith(MockitoExtension.class)
public class UserServiceTest {

    @Mock
    private LoginRepo loginRepo;

    @Mock
    private RegisterRepo registerRepo;

    @Mock
    private PasswordEncoder passwordEncoder;

    @Mock
    private JwtUtils jwtUtils; // Mock JwtUtils

    @InjectMocks
    private UserService userService;

    private LoginUser loginUser;
    private RegisterUser registerUser;

    @BeforeEach
    public void setUp() {
        loginUser = new LoginUser();
        loginUser.setUsername("testuser");
        loginUser.setPassword("password123");

        registerUser = new RegisterUser();
        registerUser.setUsername("testuser");
        registerUser.setPassword("password123");
        registerUser.setFullName("testuser adolf");
        registerUser.setDob(LocalDate.now());
    }

    @Test
    public void testAuthenticate_Success() {
        // Mock behavior for the loginRepo and passwordEncoder
        Mockito.when(loginRepo.findByUsername(loginUser.getUsername())).thenReturn(Optional.of(loginUser));
        Mockito.when(passwordEncoder.matches("password123", loginUser.getPassword())).thenReturn(true);

        // Mock the behavior of JwtUtils
        String expectedToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.exampleTokenSignature";
        Mockito.when(jwtUtils.generatingToken(loginUser)).thenReturn(expectedToken);

        // Call the authenticate method
        String token = userService.authenticate(loginUser);

        // Verify that the method generates a token
        assertNotNull(token);
        assertEquals(expectedToken, token);
    }
}


