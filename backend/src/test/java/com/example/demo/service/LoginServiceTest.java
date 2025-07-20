//package com.example.demo.service;
//
//import static org.junit.jupiter.api.Assertions.*;
//import static org.mockito.Mockito.*;
//
//import com.example.demo.model.RegisterUser;
//import com.example.demo.repository.RefreshTokenRepo;
//import com.example.demo.repository.RegisterRepo;
//
//import org.junit.jupiter.api.BeforeEach;
//import org.junit.jupiter.api.Test;
//import org.junit.jupiter.api.extension.ExtendWith;
//import org.mockito.*;
//import org.mockito.junit.jupiter.MockitoExtension;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.boot.test.context.SpringBootTest;
//import org.springframework.transaction.annotation.Transactional;
//
//@Transactional
//@SpringBootTest
//@ExtendWith(MockitoExtension.class)
//class LoginServiceTest {
//    @Autowired private RegisterRepo registerRepo;
//
//    @Autowired private RefreshTokenRepo refreshTokenRepo;
//
//    @Autowired private LoginService loginService;
//
//    @Mock private RegisterUser testUser;
//
//    @Mock private RegisterUser wrongUser;
//
//    @BeforeEach
//    void setUp() {
//        testUser = new RegisterUser();
//        testUser.setAccountId(1L);
//        testUser.setUsername("testuser");
//        testUser.setPassword("testpass");
//        registerRepo.save(testUser);
//        wrongUser = new RegisterUser();
//        wrongUser.setAccountId(2L);
//        wrongUser.setUsername("testuser");
//        wrongUser.setPassword("wrongpassword");
//    }
//
//    @Test
//    void login_shouldReturnUser_whenCredentialsAreCorrect() {
//        String user = loginService.authenticate(testUser);
//        assertNotNull(user);
//    }
//
//    @Test
//    void login_shouldThrow_whenCredentialsAreWrong() {
//        assertThrows(
//                IllegalArgumentException.class,
//                () -> {
//                    loginService.authenticate(wrongUser);
//                });
//    }
//
//    @Test
//    void login_sohuldThrow_whenUserDoesNotExist() {
//        RegisterUser notExist = new RegisterUser();
//        notExist.setAccountId(3L);
//        notExist.setUsername("notexist");
//        notExist.setPassword("password");
//        assertThrows(
//                IllegalArgumentException.class,
//                () -> {
//                    loginService.authenticate(notExist);
//                });
//    }
//}
package com.example.demo.service;

import com.example.demo.jwtsecurity.JwtUtils;
import com.example.demo.model.RegisterUser;
import com.example.demo.repository.RefreshTokenRepo;
import com.example.demo.repository.RegisterRepo;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.*;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class LoginServiceTest {

    @Mock
    private RegisterRepo registerRepo;

    @Mock
    private PasswordEncoder passwordEncoder;

    @Mock
    private JwtUtils jwtUtils;

    @Mock
    private RefreshTokenRepo refreshTokenRepo;

    @InjectMocks
    private LoginService loginService;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void deleteUserById_UserExists_ReturnsSuccess() {
        Long userId = 1L;
        RegisterUser user = new RegisterUser();
        when(registerRepo.findById(userId)).thenReturn(Optional.of(user));

        String result = loginService.deleteUserById(userId);

        verify(registerRepo).deleteById(userId);
        assertEquals("User deleted successfully", result);
    }

    @Test
    void deleteUserById_UserNotFound_ReturnsNotFound() {
        Long userId = 1L;
        when(registerRepo.findById(userId)).thenReturn(Optional.empty());

        String result = loginService.deleteUserById(userId);

        verify(registerRepo, never()).deleteById(anyLong());
        assertEquals("User not found", result);
    }

    @Test
    void authenticate_ValidCredentials_ReturnsToken() {
        RegisterUser loginDto = new RegisterUser();
        loginDto.setUsername("testuser");
        loginDto.setPassword("testpass");

        RegisterUser foundUser = new RegisterUser();
        foundUser.setUsername("testuser");
        foundUser.setPassword("hashedpass");

        when(registerRepo.findByUsername("testuser")).thenReturn(foundUser);
        when(passwordEncoder.matches("testpass", "hashedpass")).thenReturn(true);
        when(jwtUtils.generateTokenFromUser(foundUser)).thenReturn("jwt-token");

        String token = loginService.authenticate(loginDto);

        assertEquals("jwt-token", token);
    }

    @Test
    void authenticate_UserNotFound_ThrowsException() {
        RegisterUser loginDto = new RegisterUser();
        loginDto.setUsername("nouser");
        loginDto.setPassword("pass");

        when(registerRepo.findByUsername("nouser")).thenReturn(null);

        IllegalArgumentException exception = assertThrows(IllegalArgumentException.class,
                () -> loginService.authenticate(loginDto));
        assertTrue(exception.getMessage().contains("User not found"));
    }

    @Test
    void authenticate_InvalidPassword_ThrowsException() {
        RegisterUser loginDto = new RegisterUser();
        loginDto.setUsername("testuser");
        loginDto.setPassword("wrongpass");

        RegisterUser foundUser = new RegisterUser();
        foundUser.setUsername("testuser");
        foundUser.setPassword("hashedpass");

        when(registerRepo.findByUsername("testuser")).thenReturn(foundUser);
        when(passwordEncoder.matches("wrongpass", "hashedpass")).thenReturn(false);

        IllegalArgumentException exception = assertThrows(IllegalArgumentException.class,
                () -> loginService.authenticate(loginDto));
        assertEquals("Invalid username or password", exception.getMessage());
    }
}
