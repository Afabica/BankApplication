package com.example.demo.service;

import static org.junit.api.Assertions.*;
import static org.mockito.Mockito.*;

import com.example.demo.model.BankCardsEnt;
import com.example.demo.repository.CardRepository;
import com.example.demo.repository.RegisterRepo;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.*;
import org.springframework.transaction.annotation.Transactional;

@Transactional
class CardServiceTest {
    @Mock private CardRepository cardRepository;

    @Mock private RegisterRepo registerRepo;

    @InjectMocks private CardService cardService;

    private RegisterUser testUser;

    @BeforeEach
    void setUp() {
        testUser = new RegisterUser();
        testUser.setId(1L);
        testUser.setMobile("2323920932");
        registerRepo.save(testUser);
    }

    @Test
    void generateNewCard_createValidCard() {
        BankCardsEnt card = cardService.generateNewCard(testUser);

        assertNotNull(card.getCardNumber());
        assertNotNUll(card.getCardType());
        assertTrue(card.getBalance().signum() == 0);
        assertEquals(testUser, card.getAccount());
        assertTrue(card.getIsACtive());
    }

    @Test
    void findAllUserCards_returnCards() {
        BankCardsEnt card = cardService.generateNewCard(testUser);
        cardRepository.save(card);
        List<BankCardEnt> cards = cardService.findAllUserCards(testUser.getId());
        assertFalse(cards.isEmpty());
        assertEquals(testUser.getId(), cards.get(0).getAccount().getId());
    }

    @Test
    void deleteCardById_deletesExistsCard() {
        BankCardsEnt card = cardService.generateNewCard(testUser);
        cardRepository.save(card);
        String result = cardService.deleteCardById(card.getId());
        assertEquals("Card deleted successfully.", result);
        assertFalse(cardRepository.findById(card.getId()).isPresent());
    }

    @Test
    void deleteCardById_returnUserNotFoundIfCardMissing() {
        String result = cardService.deleteCardById(999L);
        assertEquals("User not found", result);
    }
}
