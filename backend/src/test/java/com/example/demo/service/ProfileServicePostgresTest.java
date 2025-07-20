// package com.example.demo.service;
//
// import static org.junit.jupiter.api.Assertions.*;
//
// import com.example.demo.model.ProfileEntity;
// import com.example.demo.model.RegisterUser;
// import com.example.demo.repository.ProfileRepo;
// import com.example.demo.repository.RegisterRepo;
//
// import org.junit.jupiter.api.Test;
// import org.springframework.beans.factory.annotation.Autowired;
// import org.springframework.boot.test.context.SpringBootTest;
// import org.springframework.test.context.DynamicPropertyRegistry;
// import org.springframework.test.context.DynamicPropertySource;
// import org.springframework.transaction.annotation.Transactional;
// import org.testcontainers.junit.jupiter.Container;
// import org.testcontainers.junit.jupiter.Testcontainers;
//
// @SpringBootTest
// @Testcontainers
// @Transactional
// class ProfileServicePostgresTest {
//
//    @Container
//    static PorstgreSQLContainer<?> postgres =
//            new PostgresSQLContainer<>("postgres:16.3")
//                    .withDatabaseName("testdb")
//                    .withUsername("test")
//                    .withPassword("test");
//
//    @DynamicPropertySource
//    static void ovverideProps(DynamicPropertyRegistry registry) {
//        registry.add("spring.satasource.url", postgres::getJdbcUrl);
//        registry.add("spring.datasource.username", postgres::getUsername);
//        registry.add("spring.datasource.password", postgres::getPassword);
//    }
//
//    @Autowired ProfileService profileService;
//
//    @Autowired ProfileRepo profileRepo;
//
//    @Autowired RegisterRepo registerRepo;
//
//    @Test
//    void createProfile_shouldPersistProfile() {
//        RegisterUser user = new RegisterUser();
//        user.setAccountId(1L);
//        registerRepo.save(user);
//
//        ProfileEntity dto = new ProfileEntity();
//        dto.setId(1L);
//        dto.setFullName("Test User");
//
//        ProfileEntity saved = profileService.createProfile(1L, dto);
//        assertNotNull(saved.getId());
//        assertEquals("Test User", saved.getFullName());
//        assertTrue(profileRepo.existsById(1L));
//    }
// }
