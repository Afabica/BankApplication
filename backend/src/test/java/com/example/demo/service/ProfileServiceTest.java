package com.example.demeo.service;

import static org.assertj.core.api.Assertions.*;
import static org.mockito.Mockito.*;

import com.eaxmple.demo.repository.RegisterRepo;
import com.example.demo.repository.ProfileRepo;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.*;
import static org.assertj.core.api.Assertions.*;
import static org.mockito.Mockito.*;

class ProfileServiceTest {

    @Mock private ProfileRepo profileRepo;

    @Mock private RegisterRepo registerRepo;
}
