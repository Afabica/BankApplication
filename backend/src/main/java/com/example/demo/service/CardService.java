package com.example.demo.service;

import com.example.demo.model.BankCardsEnt;
import com.example.demo.model.RegisterUser;
import com.example.demo.repository.CardRepository;
import com.example.demo.repository.RegisterRepo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;
import java.util.Optional;
import java.util.Random;

@Service
public class CardService {

    private static final Random random = new Random();
    private final CardRepository cardRepository;
    private final RegisterRepo registerRepo;

    private static final String[] CARD_BRANDS = {
        "Visa", "MasterCard", "American Express", "Discover"
    };
    private static final String[] CARD_TYPES = {"Debit", "Credit", "Prepaid"};

    @Autowired
    public CardService(@Lazy CardRepository cardRepository, @Lazy RegisterRepo registerRepo) {
        this.cardRepository = cardRepository;
        this.registerRepo = registerRepo;
    }

    public List<BankCardsEnt> findAllUserCards(Long userId) {
        List<BankCardsEnt> user_cards = cardRepository.findAllByAccount_AccountId(userId);
        return user_cards;
    }

    public String deleteCardById(Long id) {
        Optional<BankCardsEnt> card = cardRepository.findById(id);
        if (card.isPresent()) {
            cardRepository.deleteById(id);
            return ("Card deleted successfully.");
        } else {
            return "User not found";
        }
    }

    public BankCardsEnt generateNewCard(RegisterUser user) {
        BankCardsEnt card = new BankCardsEnt();

        // Set linked user
        card.setAccount(user);

        // Generate card number (16 digits for simplicity, could be improved with BIN ranges)
        card.setCardNumber(generateCardNumber());

        // Generate expiry date between now and 5 years in the future
        card.setCardExpiry(generateExpiryDate());

        // Generate CVV (3 digits, numeric string)
        //        card.setCardCvv(generateCvv());

        // Randomly pick card type and brand
        card.setCardType(randomFromArray(CARD_TYPES));
        card.setCardBrand(randomFromArray(CARD_BRANDS));

        // Generate a fake IBAN (simplified version for demo)
        card.setIban(generateIban());

        // Initial balance (e.g., 0 for new card)
        card.setBalance(BigDecimal.ZERO);

        // Card is active by default
        card.setIsActive(true);

        return card;
    }

    private String generateCardNumber() {
        StringBuilder sb = new StringBuilder();
        for (int i = 0; i < 16; i++) {
            sb.append(random.nextInt(10));
        }
        return sb.toString();
    }

    private LocalDate generateExpiryDate() {
        // Expiry between 1 and 5 years from now
        int yearsToAdd = random.nextInt(5) + 1;
        return LocalDate.now().plusYears(yearsToAdd);
    }

    private String generateCvv() {
        int cvv = 100 + random.nextInt(900); // 3 digit number from 100 to 999
        return String.valueOf(cvv);
    }

    private String generateIban() {
        // Simplified IBAN generation for demonstration
        // e.g. country code + 2 check digits + 14 random alphanumeric chars
        String countryCode = "DE"; // Germany as example
        int checkDigits = 10 + random.nextInt(89); // 10 to 99
        StringBuilder sb = new StringBuilder();
        sb.append(countryCode);
        sb.append(checkDigits);
        for (int i = 0; i < 14; i++) {
            sb.append(randomAlphanumericChar());
        }
        return sb.toString();
    }

    private char randomAlphanumericChar() {
        String chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
        return chars.charAt(random.nextInt(chars.length()));
    }

    private String randomFromArray(String[] array) {
        return array[random.nextInt(array.length)];
    }
    //    public String addUserCard(BankCardsEnt newCard, Long userId) {
    //        try {
    //            RegisterUser user = registerRepo.findById(userId).orElseThrow();
    //            BankCardsEnt card = new BankCardsEnt();
    //            card.setAccount(user);
    //            card.setCardNumber(newCard.getCardNumber());
    //            card.setCardExpiry(newCard.getCardExpiry());
    //            card.setCardType(newCard.getCardType());
    //            card.setIban(newCard.getIban());
    //
    //            cardRepository.save(card);
    //            return "User card added successfully.";
    //        } catch (Exception e) {
    //            throw new IllegalStateException("Error occured when try to add card.", e);
    //        }
    //    }
}
