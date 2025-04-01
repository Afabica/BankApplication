package com.example.demo.service;

import com.example.demo.jwtsecurity.JwtUtils;
import com.example.demo.model.LoginUser;
import com.example.demo.repository.LoginRepo;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.crypto.password.PasswordEncoder;

import static org.junit.jupiter.api.Assertions.*;
import org.junit.jupiter.api.extension.ExtendWith;

import java.util.Optional;

@ExtendWith(MockitoExtension.class)
public class UserServiceTest {

    @Mock
    private LoginRepo loginRepo;

    @Mock
    private PasswordEncoder passwordEncoder;

    @Mock
    private JwtUtils jwtUtils;

    @InjectMocks
    private UserService userService;

    private LoginUser loginUser;

    @BeforeEach
    public void setUp() {
        loginUser = new LoginUser();
        loginUser.setUsername("testuser");
        loginUser.setPassword("password123");
    }

    @Test
    public void testAuthenticate_Success() {
        // Arrange
        Mockito.when(loginRepo.findByUsername(loginUser.getUsername())).thenReturn(Optional.of(loginUser));

        // Mock passwordEncoder matches for correct password
        Mockito.when(passwordEncoder.matches("password123", loginUser.getPassword())).thenReturn(true);

        // Mock JwtUtils behavior
        String expectedToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.exampleTokenSignature";
        Mockito.when(jwtUtils.generatingToken(loginUser)).thenReturn(expectedToken);

        // Act
        String token = userService.authenticate(loginUser);

        // Assert
        assertNotNull(token);
        assertEquals(expectedToken, token);
    }


@Test
public void testAuthenticate_Failure_InvalidPassword() {
    // Arrange
    Mockito.when(loginRepo.findByUsername(loginUser.getUsername())).thenReturn(Optional.of(loginUser));  // User is found
    
    // Simulate the wrong password manually without mocking
    String wrongPassword = "wrongPassword";
    
    // Act & Assert
    RuntimeException exception = assertThrows(RuntimeException.class, () -> {
        userService.authenticate(loginUser);  // This should throw an exception for invalid password
    });
    assertEquals("Invalid username or password", exception.getMessage());
}


    @Test
    public void testAuthenticate_Failure_UserNotFound() {
        // Arrange
        Mockito.when(loginRepo.findByUsername(loginUser.getUsername())).thenReturn(Optional.empty());

        // Act & Assert
        RuntimeException exception = assertThrows(RuntimeException.class, () -> {
            userService.authenticate(loginUser);
        });

        // Ensure the exception message is the same for invalid username or password
        assertEquals("Invalid username or password", exception.getMessage());
    }
}



