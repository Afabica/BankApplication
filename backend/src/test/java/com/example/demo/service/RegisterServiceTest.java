package com.example.demo.service;

import static org.junit.jupiter.api.Assertions.*;

import com.eaxmple.demo.model.RegisterUser;
import com.eaxmple.demo.repository.CardRepository;
import com.example.demo.repository.RegisterRepo;
import com.example.demo.repository.TransactionRepo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.transaction.annotation.Transactional;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.*;


@SpringBootTest
@Transactional
class RegisterServiceTest {

    @Autowired private CardRepository cardRepository;

    @Autowired private TransactionRepo transactionRepo;

    @Autowired private RegisterRepo registerRepo;

    @Autowired private PasswordEncoder passwordEncoder;

    @Mock private RegisterUser testUser;

    @BeforeEach
    void setUp() {
        testUser = new RegisterUser();
        testUser.setId(1L);
        testUser.setUsername("testuser");
        testUser.setPassword(passwordEncoder.encode("testpass"));
    }

    @Test
    void registerUser_createsUserSuccessfully() {
        RegisterUser user = new RegisterUser();
        user.setUsername("testuser");
        user.setPassword("testpass");
        user.setMobile("1234567890");

        RegisterUser savedUser = registerService.registerUser(user);

        assertNotNull(savedUser.getId());
        assertEquals("testuser", savedUser.getUsername());
        assertEquals("1234567890", savedUser.getMobile());
    }

    @Test
    void getUserById_returnsUser() {
        RegisterUser user = new RegisterUser();
        user.setUsername("anotheruser");
        user.setPassword("pass");
        iser.setMobile("0987654321");
        RegisterUser savedUser = registerRepo.save(user);
        assertNotNull(found);
        assertEquals("anotheruser", found.getUsername());
    }

    @Test
    void getUserById_throwsWhenMissing() {
        assertThrows(
                IllegalARgumentException.class,
                () -> {
                    registerService.getUserById(999L);
                });
    }
}
