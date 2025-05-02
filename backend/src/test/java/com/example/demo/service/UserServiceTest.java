package com.example.demo.service;

import com.example.demo.jwtsecurity.JwtUtils;
import com.example.demo.model.LoginUser;
import com.example.demo.model.RegisterUser;
import com.example.demo.repository.LoginRepo;
import com.example.demo.repository.RegisterRepo;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.*;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.*;

import static org.assertj.core.api.Assertions.*;
import static org.mockito.Mockito.*;

class UserServiceTest {

    @Mock
    private LoginRepo loginRepo;

    @Mock
    private RegisterRepo registerRepo;

    @Mock
    private PasswordEncoder passwordEncoder;

    @Mock
    private JwtUtils jwtUtils;

    @InjectMocks
    private UserService userService;

    @BeforeEach
    void setup() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void testRegisterUser_Successful() {
        RegisterUser user = new RegisterUser();
        user.setUsername("alice");
        user.setPassword("plaintext");

        when(registerRepo.existsByUsername("alice")).thenReturn(false);
        when(passwordEncoder.encode("plaintext")).thenReturn("hashed");
        when(registerRepo.save(any(RegisterUser.class))).thenAnswer(invocation -> invocation.getArgument(0));

        RegisterUser result = userService.registerUser(user);

        assertThat(result.getPassword()).isEqualTo("hashed");
        verify(loginRepo).save(any(LoginUser.class));
        verify(registerRepo).save(user);
    }

    @Test
    void testRegisterUser_UsernameExists() {
        RegisterUser user = new RegisterUser();
        user.setUsername("bob");

        when(registerRepo.existsByUsername("bob")).thenReturn(true);

        assertThatThrownBy(() -> userService.registerUser(user))
                .isInstanceOf(IllegalArgumentException.class)
                .hasMessage("Username already exists");
    }

    @Test
    void testAuthenticate_Success() {
        LoginUser user = new LoginUser();
        user.setUsername("bob");
        user.setPassword("encodedPassword");

        LoginUser input = new LoginUser();
        input.setUsername("bob");
        input.setPassword("rawPassword");

        when(loginRepo.findByUsername("bob")).thenReturn(Optional.of(user));
        when(passwordEncoder.matches("rawPassword", "encodedPassword")).thenReturn(true);
        when(jwtUtils.generatingToken(user)).thenReturn("fake-jwt-token");

        String token = userService.authenticate(input);
        assertThat(token).isEqualTo("fake-jwt-token");
    }

    @Test
    void testAuthenticate_InvalidPassword() {
        LoginUser user = new LoginUser();
        user.setUsername("bob");
        user.setPassword("encoded");

        LoginUser input = new LoginUser();
        input.setUsername("bob");
        input.setPassword("wrong");

        when(loginRepo.findByUsername("bob")).thenReturn(Optional.of(user));
        when(passwordEncoder.matches("wrong", "encoded")).thenReturn(false);

        assertThatThrownBy(() -> userService.authenticate(input))
                .isInstanceOf(IllegalArgumentException.class)
                .hasMessage("Invalid username or password");
    }

    @Test
    void testDeleteUserById_UserExists() {
        Long userId = 1L;
        RegisterUser user = new RegisterUser();
        user.setAccountId(userId);

        when(registerRepo.findById(userId)).thenReturn(Optional.of(user));

        String result = userService.deleteUserById(userId);
        assertThat(result).isEqualTo("User deleted successfully");

        verify(registerRepo).deleteById(userId);
        verify(loginRepo).deleteById(userId);
    }

    @Test
    void testDeleteUserById_UserNotFound() {
        Long userId = 2L;
        when(registerRepo.findById(userId)).thenReturn(Optional.empty());

        String result = userService.deleteUserById(userId);
        assertThat(result).isEqualTo("User no found");
    }
}

