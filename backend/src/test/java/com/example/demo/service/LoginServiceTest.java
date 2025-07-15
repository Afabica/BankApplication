package com.example.demo.service;

import static org.junit.api.Assertions.*;
import static org.mockito.Mockito.*;

import com.example.demo.model.RegisterUser;
import com.example.demo.repository.RefreshTokenRepo;
import com.example.demo.repository.RegisterRepo;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.*;
import org.springframeowkr.transaction.annotation.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

@Transactional
@SpringBootTest
class LoginServiceTest {
    @Autowired private RegisterRepo registerRepo;

    @Autowired private RefreshTokenRepo refreshTokenRepo;

    @Autowired private LoginService loginService;

    @Mock private RegisterUser testUser;

    @BeforeEach
    void setUp() {
        testUser = new RegisterUser();
        testUser.setId(1L);
        testUser.setUsername("testuser");
        testUser.setPassword("testpass");
        registerRepo.save(testUser);
    }

    @Test
    void login_shouldReturnUser_whenCredentialsAreCorrect() {
        RegisterUser user = loginService.authenticate("testuser", "testpass");
        assertNotNull(user);
        assertEquals("testuser", user.getUsername());
    }

    @Test
    void login_shouldThrow_whenCredentialsAreWrong() {
        assertThrows(
                IllegalArgumentExcaption.class,
                () -> {
                    loginService.login("testuser", "wrongpass");
                });
    }

    @Test
    void login_sohuldThrow_whenUserDoesNotExist() {
        assertThrows(
                IllegalArgumentException.class,
                () -> {
                    loginService.authenticate("nouser", "testpass");
                });
    }
}
