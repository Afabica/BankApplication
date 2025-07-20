// package com.example.deme.service;
//
// import static org.junit.jupiter.api.Assertions.*;
//// import static org.assertj.core.api.Assertions.*;
// import static org.mockito.Mockito.*;
//
// import com.example.demo.model.ProfileEntity;
// import com.example.demo.model.RegisterUser;
// import com.example.demo.repository.ProfileRepo;
// import com.example.demo.repository.RegisterRepo;
// import com.example.demo.service.ProfileService;
//
// import org.junit.jupiter.api.BeforeEach;
// import org.junit.jupiter.api.Test;
// import org.junit.jupiter.api.extension.ExtendWith;
// import org.mockito.*;
// import org.mockito.junit.jupiter.MockitoExtension;
// import org.springframework.transaction.annotation.Transactional;
//
// import java.util.Optional;
//
// @Transactional
// @ExtendWith(MockitoExtension.class)
// class ProfileServiceTest {
//
//    @Mock private ProfileRepo profileRepo;
//
//    @Mock private RegisterRepo registerRepo;
//
//    @InjectMocks private ProfileService profileService;
//
//    @BeforeEach
//    void setUp() {
//        MockitoAnnotations.openMocks(this);
//    }
//
//    @Test
//    void testGetProfile_Successful() {
//        ProfileEntity profile = new ProfileEntity();
//        profile.setId(1L);
//        when(profileRepo.findById(1L)).thenReturn(Optional.of(profile));
//        ProfileEntity result = profileService.getProfile(1L);
//        assertEquals(profile, result);
//    }
//
//    @Test
//    void getProfile_shouldThrow_whenNotExists() {
//        when(profileRepo.findById(1L)).thenReturn(Optional.empty());
//        assertThrows(IllegalArgumentException.class, () -> profileService.getProfile(1L));
//    }
//
//    //    @Test
//    //    void createProfile_shouldSaveProfile_whenValid() {
//    //        ProfileEntity user = new ProfileEntity();
//    //        user.setId(1L);
//    //
//    // when(registerRepo.findById(user.getId())).thenReturn(registerRepo.findById(user.getId()));
//    //        when(profileRepo.existsById(1L)).thenReturn(profileRepo.findOneById(user.getId()));
//    //        when(profileRepo.save(any(ProfileEntity.class)))
//    //                .thenReturn(profileRepo.findOneById(user.getId()));
//    //
//    //        ProfileEntity result = profileService.createProfile(1L, user);
//    //        assertEquals(user, result);
//    //    }
//    @Test
//    void createProfile_shouldSaveProfile_whenValid() {
//        Long userId = 1L;
//
//        // Mocking existing user and profile
//        RegisterUser mockRegisterUser = new RegisterUser();
//        mockRegisterUser.setAccountId(userId);
//
//        ProfileEntity profileToSave = new ProfileEntity();
//        profileToSave.setId(userId);
//
//        ProfileEntity savedProfile = new ProfileEntity();
//        savedProfile.setId(userId); // Assume saved object returns same ID
//
//        // Mock repository behavior
//        // when(registerRepo.findById(userId)).thenReturn(Optional.of(mockRegisterUser));
//        // assertEquals(.getId(), result.getId());
//
//        when(profileRepo.existsById(userId)).thenReturn(false); // assuming it's a new profile
//        when(profileRepo.save(profileToSave)).thenReturn(savedProfile);
//
//        // Execute service method
//        ProfileEntity result = profileService.createProfile(userId, profileToSave);
//
//        // Verify and assert
//        assertNotNull(result);
//        assertEquals(savedProfile.getId(), result.getId());
//        verify(profileRepo).save(profileToSave);
//    }
//
//    @Test
//    void createProfile_shouldThrow_whenUserNotExists() {
//        RegisterUser user = new RegisterUser();
//        ProfileEntity dto = new ProfileEntity();
//        when(registerRepo.findById(1L)).thenReturn(Optional.of(user));
//        when(profileRepo.existsById(1L)).thenReturn(true);
//        assertThrows(IllegalArgumentException.class, () -> profileService.createProfile(1L, dto));
//    }
//
//    @Test
//    void updateProfile_shouldUpdateProfile_whenValid() {
//        ProfileEntity existing = new ProfileEntity();
//        RegisterUser user = new RegisterUser();
//        ProfileEntity dto = new ProfileEntity();
//        when(profileRepo.findById(1L)).thenReturn(Optional.of(existing));
//        when(registerRepo.findById(1L)).thenReturn(Optional.of(user));
//        when(profileRepo.save(any(ProfileEntity.class))).thenReturn(existing);
//
//        ProfileEntity result = profileService.updateProfile(1L, dto);
//        assertEquals(existing, result);
//    }
//
//    @Test
//    void updateProfile_shouldThrow_whenProfileNotExists() {
//        ProfileEntity dto = new ProfileEntity();
//        when(profileRepo.findById(1L)).thenReturn(Optional.empty());
//        assertThrows(IllegalArgumentException.class, () -> profileService.updateProfile(1L, dto));
//    }
//
//    @Test
//    void deleteProfile_shouldDelete_whenExists() {
//        when(profileRepo.existsById(1L)).thenReturn(true);
//        profileService.deleteProfile(1L);
//        verify(profileRepo).deleteById(1L);
//    }
//
//    @Test
//    void deleteProfile_shouldThrow_whenNotExists() {
//        when(profileRepo.existsById(1L)).thenReturn(false);
//        assertThrows(IllegalArgumentException.class, () -> profileService.deleteProfile(1L));
//    }
// }
package com.example.demo.service;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

import com.example.demo.model.ProfileEntity;
import com.example.demo.model.RegisterUser;
import com.example.demo.repository.ProfileRepo;
import com.example.demo.repository.RegisterRepo;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.*;

import java.util.Optional;

class ProfileServiceTest {

    @Mock private ProfileRepo profileRepo;

    @Mock private RegisterRepo registerRepo;

    @InjectMocks private ProfileService profileService;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void getProfile_ProfileExists_ReturnsProfile() {
        ProfileEntity profile = new ProfileEntity();
        when(profileRepo.findById(1L)).thenReturn(Optional.of(profile));

        ProfileEntity result = profileService.getProfile(1L);

        assertEquals(profile, result);
    }

    @Test
    void getProfile_ProfileNotFound_ThrowsException() {
        when(profileRepo.findById(2L)).thenReturn(Optional.empty());

        IllegalArgumentException ex =
                assertThrows(IllegalArgumentException.class, () -> profileService.getProfile(2L));
        assertTrue(ex.getMessage().contains("Profile not found"));
    }

    @Test
    void createProfile_Success() {
        Long userId = 1L;
        ProfileEntity dto = new ProfileEntity();
        RegisterUser user = new RegisterUser();

        when(registerRepo.findById(userId)).thenReturn(Optional.of(user));
        when(profileRepo.existsById(userId)).thenReturn(false);
        when(profileRepo.save(any(ProfileEntity.class)))
                .thenAnswer(invocation -> invocation.getArgument(0));

        ProfileEntity result = profileService.createProfile(userId, dto);

        assertNotNull(result);
        verify(profileRepo).save(any(ProfileEntity.class));
    }

    @Test
    void createProfile_UserNotFound_ThrowsException() {
        when(registerRepo.findById(1L)).thenReturn(Optional.empty());

        IllegalArgumentException ex =
                assertThrows(
                        IllegalArgumentException.class,
                        () -> profileService.createProfile(1L, new ProfileEntity()));
        assertTrue(ex.getMessage().contains("User not found"));
    }

    @Test
    void createProfile_ProfileExists_ThrowsException() {
        Long userId = 1L;
        RegisterUser user = new RegisterUser();

        when(registerRepo.findById(userId)).thenReturn(Optional.of(user));
        when(profileRepo.existsById(userId)).thenReturn(true);

        IllegalArgumentException ex =
                assertThrows(
                        IllegalArgumentException.class,
                        () -> profileService.createProfile(userId, new ProfileEntity()));
        assertTrue(ex.getMessage().contains("Profile already exists"));
    }

    @Test
    void updateProfile_Success() {
        Long userId = 1L;
        ProfileEntity existingProfile = new ProfileEntity();
        ProfileEntity dto = new ProfileEntity();
        RegisterUser user = new RegisterUser();

        when(profileRepo.findById(userId)).thenReturn(Optional.of(existingProfile));
        when(registerRepo.findById(userId)).thenReturn(Optional.of(user));
        when(profileRepo.save(any(ProfileEntity.class)))
                .thenAnswer(invocation -> invocation.getArgument(0));
        when(registerRepo.save(any(RegisterUser.class)))
                .thenAnswer(invocation -> invocation.getArgument(0));

        ProfileEntity result = profileService.updateProfile(userId, dto);

        assertNotNull(result);
        verify(profileRepo).save(existingProfile);
        verify(registerRepo).save(user);
    }

    @Test
    void updateProfile_ProfileNotFound_ThrowsException() {
        when(profileRepo.findById(1L)).thenReturn(Optional.empty());

        IllegalArgumentException ex =
                assertThrows(
                        IllegalArgumentException.class,
                        () -> profileService.updateProfile(1L, new ProfileEntity()));
        assertTrue(ex.getMessage().contains("Cannot update profile not found"));
    }

    @Test
    void updateProfile_UserNotFound_ThrowsException() {
        Long userId = 1L;
        ProfileEntity existingProfile = new ProfileEntity();

        when(profileRepo.findById(userId)).thenReturn(Optional.of(existingProfile));
        when(registerRepo.findById(userId)).thenReturn(Optional.empty());

        IllegalArgumentException ex =
                assertThrows(
                        IllegalArgumentException.class,
                        () -> profileService.updateProfile(userId, new ProfileEntity()));
        assertTrue(ex.getMessage().contains("Cannot update user register data"));
    }

    @Test
    void deleteProfile_Success() {
        when(profileRepo.existsById(1L)).thenReturn(true);

        profileService.deleteProfile(1L);

        verify(profileRepo).deleteById(1L);
    }

    @Test
    void deleteProfile_NotFound_ThrowsException() {
        when(profileRepo.existsById(2L)).thenReturn(false);

        IllegalArgumentException ex =
                assertThrows(
                        IllegalArgumentException.class, () -> profileService.deleteProfile(2L));
        assertTrue(ex.getMessage().contains("Cannot delete; profile not found"));
    }
}
