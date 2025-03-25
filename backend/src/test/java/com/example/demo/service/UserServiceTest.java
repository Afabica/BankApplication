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
