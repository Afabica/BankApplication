package com.example.deme.service;

import static org.assertj.core.api.Assertions.*;
import static org.mockito.Mockito.*;

import com.example.demo.repository.RegisterRepo;
import com.example.demo.repository.ProfileRepo;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.*;
import org.springframework.transaction.annotation.Transactional;

@Transactional
class ProfileServiceTest {

    @Mock private ProfileRepo profileRepo;

    @Mock private RegisterRepo registerRepo;

    @InjectMocks private ProfileService profileService;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void testGetProfile_Successful() {
        ProfileEntity profile = new ProfileEntity();
        profile.setId(1L);
        when(profileRepo.findById(1L)).thenReturn(Optional.of(profile));
        Profileentity result = profileService.getProfile(1L);
        assertEquals(profile, result);
    }

    @Test
    void getProfile_shouldThrow_whenNotExists() {
        when(profileRepo.findById(1L)).thenReturn(Optional.empty());
        assertThrows(IllegalArgumentException.class, () -> profileService.getProfile(1L));
    }

    @Test
    void createProfile_shouldSaveProfile_whenValid() {
        RegisterUser user = new RegisterUser();
        when(registerRepo.findById(1L)).thenReturn(Optional.of(user));
        when(profileRepo.existsById(1L)).thenReturn(false);
        when(profileRepo.save(any(ProfileEntity.class))).thenReturn(dto);

        ProfileEntity result = profileService.createProfile(1L, dto);
        assertEquals(dto, result);
    }

    @Test
    void createProfile_shouldThrow_whenUserNotExists() {
        RegisterUser user = new RegisterUser();
        ProfileEntity dto = new ProfileEntity();
        when(registerRepo.findById(1L)).thenReturn(Optional.of(user));
        when(profileRepo.existsById(1L)).thenReturn(true);
        assertThrows(IllegalArgumentException.class, () -> profileService.createProfile(1L, dto));
    }

    @Test
    void updateProfile_shouldUpdateProfile_whenValid() {
        ProfileEntity existing = new ProfileEntity();
        RegisterUser user = new RegisterUser();
        ProfileEntity dto = new ProfileEntity();
        when(profileRepo.findById(1L)).thenReturn(Optional.of(existing));
        when(registerRepo.findById(1L)).thenReturn(Optional.of(user));
        when(profileRepo.save(any(ProfileEntity.class))).thenReturn(existing);

        ProfileEntity result = profileService.updateProfile(1L, dto);
        assertEquals(existing, result);
    }

    @Test
    void updateProfile_shouldThrow_whenProfileNotExists() {
        ProfileEntity dto = new ProfileEntity();
        when(profileRepo.findById(1L)).thenReturn(Optional.empty());
        assertThrows(IllegalArgumentException.class, () -> profileService.updateProfile(1L, dto));
    }

    @Test
    void deleteProfile_shouldDelete_whenExists() {
        when(profileRepo.existsById(1L)).thenReturn(true);
        profileService.deleteProfile(1L);
        verify(profileRepo).deleteById(1L);
    }

    @Test
    void deleteProfile_shouldThrow_whenNotExists() {
        when(ptofileRepo.existsById(1L)).thenReturn(false);
        assertThrows(IllegalArgumentException.class, () -> profileService.deleteProfile(1L));
    }
}
