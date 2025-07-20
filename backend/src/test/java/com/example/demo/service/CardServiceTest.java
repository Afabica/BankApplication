// package com.example.demo.service;
//
// import static org.junit.jupiter.api.Assertions.*;
// import static org.mockito.Mockito.*;
//
// import com.example.demo.model.BankCardsEnt;
// import com.example.demo.model.RegisterUser;
// import com.example.demo.repository.CardRepository;
// import com.example.demo.repository.RegisterRepo;
//
// import org.junit.jupiter.api.BeforeEach;
// import org.junit.jupiter.api.Test;
// import org.junit.jupiter.api.extension.ExtendWith;
// import org.mockito.*;
// import org.mockito.junit.jupiter.MockitoExtension;
// import org.springframework.transaction.annotation.Transactional;
//
// import java.util.List;
//
// @Transactional
// @ExtendWith(MockitoExtension.class)
// class CardServiceTest {
//    @Mock private CardRepository cardRepository;
//
//    @Mock private RegisterRepo registerRepo;
//
//    @InjectMocks private CardService cardService;
//
//    private RegisterUser testUser;
//
//    @BeforeEach
//    void setUp() {
//        testUser = new RegisterUser();
//        testUser.setAccountId(1L);
//        testUser.setMobile("2323920932");
//        registerRepo.save(testUser);
//    }
//
//    @Test
//    void generateNewCard_createValidCard() {
//        BankCardsEnt card = cardService.generateNewCard(testUser);
//
//        assertNotNull(card.getCardNumber());
//        assertNotNull(card.getCardType());
//        assertTrue(card.getBalance().signum() == 0);
//        assertEquals(testUser, card.getAccount());
//        assertTrue(card.getIsActive());
//    }
//
//    @Test
//    void findAllUserCards_returnCards() {
//        BankCardsEnt card = cardService.generateNewCard(testUser);
//        cardRepository.save(card);
//        List<BankCardsEnt> cards = cardService.findAllUserCards(testUser.getAccountId());
//        assertFalse(cards.isEmpty());
//        assertEquals(testUser.getAccountId(), cards.get(0).getAccount().getAccountId());
//    }
//
//    @Test
//    void deleteCardById_deletesExistsCard() {
//        BankCardsEnt card = cardService.generateNewCard(testUser);
//        cardRepository.save(card);
//        String result = cardService.deleteCardById(card.getId());
//        assertEquals("Card deleted successfully.", result);
//        assertFalse(cardRepository.findById(card.getId()).isPresent());
//    }
//
//    @Test
//    void deleteCardById_returnUserNotFoundIfCardMissing() {
//        String result = cardService.deleteCardById(999L);
//        assertEquals("User not found", result);
//    }
// }
package com.example.demo.service;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

import com.example.demo.model.BankCardsEnt;
import com.example.demo.model.RegisterUser;
import com.example.demo.repository.CardRepository;
import com.example.demo.repository.RegisterRepo;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.*;

import java.math.BigDecimal;
import java.util.*;

class CardServiceTest {

    @Mock private CardRepository cardRepository;

    @Mock private RegisterRepo registerRepo;

    @InjectMocks private CardService cardService;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void findAllUserCards_ReturnsUserCards() {
        Long userId = 1L;
        List<BankCardsEnt> cards = Arrays.asList(new BankCardsEnt(), new BankCardsEnt());
        when(cardRepository.findAllByAccount_AccountId(userId)).thenReturn(cards);

        List<BankCardsEnt> result = cardService.findAllUserCards(userId);

        assertEquals(2, result.size());
        verify(cardRepository).findAllByAccount_AccountId(userId);
    }

    @Test
    void deleteCardById_CardExists_ReturnsSuccess() {
        Long cardId = 10L;
        BankCardsEnt card = new BankCardsEnt();
        when(cardRepository.findById(cardId)).thenReturn(Optional.of(card));

        String result = cardService.deleteCardById(cardId);

        verify(cardRepository).deleteById(cardId);
        assertEquals("Card deleted successfully.", result);
    }

    @Test
    void deleteCardById_CardNotFound_ReturnsNotFound() {
        Long cardId = 11L;
        when(cardRepository.findById(cardId)).thenReturn(Optional.empty());

        String result = cardService.deleteCardById(cardId);

        verify(cardRepository, never()).deleteById(anyLong());
        assertEquals("User not found", result);
    }

    @Test
    void generateNewCard_FieldsAreSet() {
        RegisterUser user = new RegisterUser();
        BankCardsEnt card = cardService.generateNewCard(user);

        assertNotNull(card);
        assertEquals(user, card.getAccount());
        assertNotNull(card.getCardNumber());
        assertEquals(16, card.getCardNumber().length());
        assertNotNull(card.getCardExpiry());
        assertNotNull(card.getCardType());
        assertNotNull(card.getCardBrand());
        assertNotNull(card.getIban());
        assertEquals(BigDecimal.ZERO, card.getBalance());
        assertTrue(card.getIsActive());
    }

    // Optionally, you can test the private helpers via reflection or by making them package-private
    // but usually they're covered by the generateNewCard test.

}
