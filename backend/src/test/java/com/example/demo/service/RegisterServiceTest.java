// package com.example.demo.service;
//
// import static org.junit.jupiter.api.Assertions.*;
//
// import com.example.demo.model.RegisterUser;
// import com.example.demo.repository.CardRepository;
// import com.example.demo.repository.RegisterRepo;
// import com.example.demo.repository.TransactionRepo;
//
// import org.junit.jupiter.api.BeforeEach;
// import org.junit.jupiter.api.Test;
// import org.junit.jupiter.api.extension.ExtendWith;
// import org.mockito.*;
// import org.mockito.junit.jupiter.MockitoExtension;
// import org.springframework.beans.factory.annotation.Autowired;
// import org.springframework.boot.test.context.SpringBootTest;
// import org.springframework.security.crypto.password.PasswordEncoder;
// import org.springframework.transaction.annotation.Transactional;
//
// @SpringBootTest
// @Transactional
// @ExtendWith(MockitoExtension.class)
// class RegisterServiceTest {
//
//    @Autowired private CardRepository cardRepository;
//
//    @Autowired private TransactionRepo transactionRepo;
//
//    @Autowired private RegisterRepo registerRepo;
//
//    @Autowired private PasswordEncoder passwordEncoder;
//
//    @Autowired private RegisterService registerService;
//
//    @Mock private RegisterUser testUser;
//
//    @BeforeEach
//    void setUp() {
//        testUser = new RegisterUser();
//        testUser.setAccountId(1L);
//        testUser.setUsername("testuser");
//        testUser.setPassword(passwordEncoder.encode("testpass"));
//    }
//
//    @Test
//    void registerUser_createsUserSuccessfully() {
//        RegisterUser user = new RegisterUser();
//        user.setUsername("testuser");
//        user.setPassword("testpass");
//        user.setMobile("1234567890");
//
//        RegisterUser savedUser = registerService.registerUser(user);
//
//        assertNotNull(savedUser.getAccountId());
//        assertEquals("testuser", savedUser.getUsername());
//        assertEquals("1234567890", savedUser.getMobile());
//    }
//
//    @Test
//    void getUserById_returnsUser() {
//        RegisterUser user = new RegisterUser();
//        user.setUsername("anotheruser");
//        user.setPassword("pass");
//        user.setMobile("0987654321");
//        RegisterUser savedUser = registerRepo.save(user);
//        assertNotNull(savedUser);
//        assertEquals("anotheruser", savedUser.getUsername());
//    }
// }
package com.example.demo.service;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

import com.example.demo.model.RegisterUser;
import com.example.demo.repository.CardRepository;
import com.example.demo.repository.RegisterRepo;
import com.example.demo.repository.TransactionRepo;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.*;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.Optional;

class RegisterServiceTest {

    @Mock private RegisterRepo registerRepo;

    @Mock private CardRepository cardRepository;

    @Mock private TransactionRepo transactionRepo;

    @Mock private PasswordEncoder passwordEncoder;

    @InjectMocks private RegisterService registerService;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void registerUser_Success() {
        RegisterUser userDto = new RegisterUser();
        userDto.setUsername("testuser");
        userDto.setPassword("plaintext");

        when(registerRepo.existsByUsername("testuser")).thenReturn(false);
        when(passwordEncoder.encode("plaintext")).thenReturn("encodedPassword");
        when(registerRepo.save(any(RegisterUser.class)))
                .thenAnswer(invocation -> invocation.getArgument(0));

        RegisterUser result = registerService.registerUser(userDto);

        assertEquals("encodedPassword", result.getPassword());
        verify(registerRepo).save(userDto);
    }

    @Test
    void registerUser_UsernameExists_ThrowsException() {
        RegisterUser userDto = new RegisterUser();
        userDto.setUsername("exists");
        userDto.setPassword("password");

        when(registerRepo.existsByUsername("exists")).thenReturn(true);

        IllegalArgumentException exception =
                assertThrows(
                        IllegalArgumentException.class,
                        () -> registerService.registerUser(userDto));
        assertEquals("Username already exists", exception.getMessage());
    }

    @Test
    void getUserInfo_UserExists_ReturnsUser() {
        RegisterUser user = new RegisterUser();
        user.setAccountId(1L);

        when(registerRepo.findById(1L)).thenReturn(Optional.of(user));

        RegisterUser result = registerService.getUserInfo(1L);

        assertSame(user, result);
    }

    @Test
    void getUserInfo_UserNotFound_ThrowsException() {
        when(registerRepo.findById(2L)).thenReturn(Optional.empty());

        IllegalArgumentException exception =
                assertThrows(IllegalArgumentException.class, () -> registerService.getUserInfo(2L));
        assertEquals("Unexisting id has passed", exception.getMessage());
    }

    @Test
    void updateUserPassword_UserExists_UpdatesPassword() {
        RegisterUser user = new RegisterUser();
        user.setAccountId(1L);
        user.setPassword("oldPwd");

        RegisterUser newInfo = new RegisterUser();
        newInfo.setPassword("newPwd");

        when(registerRepo.findById(1L)).thenReturn(Optional.of(user));
        when(passwordEncoder.encode("newPwd")).thenReturn("encodedNewPwd");
        when(registerRepo.save(any(RegisterUser.class)))
                .thenAnswer(invocation -> invocation.getArgument(0));

        RegisterUser result = registerService.updateUserPassword(1L, newInfo);

        assertEquals("encodedNewPwd", result.getPassword());
    }

    @Test
    void updateUserPassword_UserNotFound_ThrowsException() {
        RegisterUser newInfo = new RegisterUser();
        newInfo.setPassword("newPwd");

        when(registerRepo.findById(1L)).thenReturn(Optional.empty());

        IllegalArgumentException exception =
                assertThrows(
                        IllegalArgumentException.class,
                        () -> registerService.updateUserPassword(1L, newInfo));
        assertEquals("Account not fraud", exception.getMessage());
    }

    @Test
    void deleteUserAccount_DeletesRelatedEntitiesAndUser() {
        Long accountId = 111L;
        doNothing().when(cardRepository).deleteByAccountId(accountId);
        doNothing().when(transactionRepo).deleteById(accountId);
        doNothing().when(registerRepo).deleteById(accountId);

        registerService.deleteUserAccount(accountId);

        verify(cardRepository).deleteByAccountId(accountId);
        verify(transactionRepo).deleteById(accountId);
        verify(registerRepo).deleteById(accountId);
    }

    @Test
    void editUserInfo_UserExists_Updates() {
        RegisterUser user = new RegisterUser();
        user.setAccountId(7L);

        when(registerRepo.existsById(7L)).thenReturn(true);
        when(registerRepo.save(user)).thenReturn(user);

        RegisterUser result = registerService.editUserInfo(user);

        assertSame(user, result);
    }

    @Test
    void editUserInfo_UserNotFound_ThrowsException() {
        RegisterUser user = new RegisterUser();
        user.setAccountId(8L);

        when(registerRepo.existsById(8L)).thenReturn(false);

        IllegalArgumentException exception =
                assertThrows(
                        IllegalArgumentException.class, () -> registerService.editUserInfo(user));
        assertEquals("Unexisting id has passed", exception.getMessage());
    }
}
