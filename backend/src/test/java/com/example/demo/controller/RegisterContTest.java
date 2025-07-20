package com.example.demo.controller;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import com.example.demo.model.RegisterUser;
import com.example.demo.service.RegisterService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

@WebMvcTest(RegisterCont.class)
class RegisterContTest {

    @Autowired MockMvc mockMvc;
    @Autowired RegisterService registerService;

    void registerUser_shouldReturnCreateUser() throws Exception {
        RegisterUser mockUser = new RegisterUser();
        mockUser.setAccountId(1L);
        mockUser.setUsername("testuser");
        mockUser.setMobile("1234567890");

        when(registerService.registerUser(any(RegisterUser.class))).thenReturn(mockUser);

        String userJson =
                """
                {
                    "username":"testuser",
                    "password":"testpass",
                    "mobile":"1234567890"
                }
                """;

        mockMvc.perform(
                        post("/api/register")
                                .contentType(MediaType.APPLICATION_JSON)
                                .content(userJson))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value(1L))
                .andExpect(jsonPath("$.username").value("testuser"))
                .andExpect(jsonPath("$.mobile").value("1234567890"));
    }
}
