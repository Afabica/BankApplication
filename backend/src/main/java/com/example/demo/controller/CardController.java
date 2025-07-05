package com.example.demo.controller;

import com.example.demo.model.BankCardsEnt;
import com.example.demo.model.LoginUser;
import com.example.demo.model.RegisterUser;
import com.example.demo.repository.CardRepository;
import com.example.demo.repository.RegisterRepo;
import com.example.demo.service.CardService;

import jakarta.persistence.*;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@RequestMapping("/profcards")
public class CardController {

    private final CardService cardService;
    private final CardRepository cardRepository;
    private final RegisterRepo registerRepo;

    private LoginUser loginUser;

    @Autowired
    public CardController(
            CardService cardService, CardRepository cardRepository, RegisterRepo registerRepo) {
        this.cardService = cardService;
        this.cardRepository = cardRepository;
        this.registerRepo = registerRepo;
    }

    //    @PostMapping("/newcard")
    //    public ResponseEntity<?> addNewCard(@RequestParam("user_id") Long id, @RequestBody
    // BankCardsEnt card) {
    //        Optional<BankCardsEnt> cardfinder =
    // cardRepository.findByCardNumber(card.getCardNumber());
    //        try {
    //            if (!cardfinder.isPresent()) {
    //                String response = cardService.addUserCard(card, id);
    //                return ResponseEntity.ok(response);
    //            } else {
    //                return ResponseEntity.badRequest().body("User card not added, opereration
    // failed.");
    //            }
    //        } catch (IllegalArgumentException e) {
    //            return ResponseEntity.status(403)
    //                    .body(
    //                            "Error adding new card, it already exist in profile or not valid."
    //                                    + " Error: "
    //                                    + e.getMessage());
    //        }
    //    }
    @PostMapping("/newcard")
    public ResponseEntity<?> addNewCard(@RequestParam("user_id") Long id) {
        RegisterUser user =
                registerRepo
                        .findByAccountId(id)
                        .orElseThrow(() -> new EntityNotFoundException("User not found"));
        if (user != null) {
            BankCardsEnt newCard = cardService.generateNewCard(user);
            return ResponseEntity.ok().body("Card created successfully.");
        } else
            return ResponseEntity.status(HttpStatus.UNPROCESSABLE_ENTITY)
                    .body("Customer information wasn't found.");
    }

    @GetMapping("/getcards")
    public ResponseEntity<?> getUserCards(@RequestParam("user_id") Long id) {
        try {
            List<BankCardsEnt> user_cards = cardService.findAllUserCards(id);
            if (!user_cards.isEmpty()) {
                return ResponseEntity.ok(user_cards);
            } else {
                return ResponseEntity.status(404).body("User cards not found");
            }
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(400).body(Map.of("error", e.getMessage()));
        } catch (Exception e) {
            return ResponseEntity.status(500).body(Map.of("error", "Internal Server Error"));
        }
    }

    //    @GetMapping("/{customerId}/cards")
    //    public ResponseEntity<List<CardResponseDTO> getUserCards(@PathVariable Long customerId) {
    //         List<BankCardsEnt> cards =  cardService.findAllUserCards(customerID);
    //         List<customerResponseDTO> cardResponses = acrds.stream()
    //            .map(CardResponseDTO::fromEntity)
    //            .toList();
    //
    //        return ResponseEntity.ok(cardResponses);
    //    }

    @GetMapping("/cards")
    public List<BankCardsEnt> fetchCards(Long account_id) {
        try {
            return cardRepository.findAllByAccount_AccountId(account_id);
        } catch (Exception e) {
            throw new IllegalStateException("Error fetching user cards");
        }
    }

    //    @PostMapping("/newcard")
    //    public  ResponseEntity<?> add_new_card(BankCardsEnt newBankCard) {
    //        BankCardsEnt card = cardRepository.findByCardId(newBankCard.getCardId());
    //        if((card.getStatus()) != null) {
    //            return ResponseEntity.badRequest().body("Card already exist in user profile.");
    //        } else {
    //                BankCardsEnt newcard = new BankCardsEnt(newBankCard.getCardId(),
    // newBankCard.getCardType(), newBankCard.getExpirationDate(), newBankCard.getIssueDate(),
    // newBankCard.getStatus(), newBankCard.getCustomer());
    //                cardRepository.save(newcard);
    //        }
    //        return ResponseEntity.ok("Card adding operation was successful.");
    //
    //    }

    //    @DeleteMapping("/{id}")
    //    public ResponseEntity<?> deleteCard(BankCardsEnt bankcard) {
    //        BankCardsEnt card = cardRepository.findByCardId(bankcard.getCardId());
    //        if ((card.getCardId()) != null) {
    //            cardRepository.deleteById(bankcard.getCardId());
    //            return ResponseEntity.ok("Card deleted Successfully.");
    //        }
    //        return ResponseEntity.badRequest().body("Error exeute opertaion.");
    //    }
}
