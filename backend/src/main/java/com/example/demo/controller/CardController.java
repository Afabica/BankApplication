package com.example.demo.controller;

import com.example.demo.model.BankCardsEnt;
import com.example.demo.model.LoginUser;
import com.example.demo.model.Customer;
import com.example.demo.model.RegisterUser;
import com.example.demo.model.Transaction;
import com.example.demo.repository.CustomerRepo;
import com.example.demo.service.CardService;
import com.example.demo.model.BankCardsEnt;
import com.example.demo.repository.CardRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import jakarta.servlet.http.HttpSession;
import java.util.*;
import java.util.Optional;


@RestController
@RequestMapping("/profcards")
public class CardController {

    private final  CustomerRepo customerRepo;
    private final CardService cardService;
    private final CardRepository cardRepository;

    private LoginUser loginUser;
    
    @Autowired
    public CardController(CustomerRepo customerRepo, CardService cardService, CardRepository cardRepository) {
        this.customerRepo = customerRepo;
        this.cardService = cardService;
        this.cardRepository = cardRepository;
    }

    @PostMapping("/newcard")
    public ResponseEntity<?> addNewCard(BankCardsEnt Card) {
        BankCardsEnt NewCard = cardRepository.findByCardNumber(Card.getCardNumber());
        try {
        if((NewCard.getCardNumber()) != null) {
            cardRepository.save(NewCard);
            return ResponseEntity.ok("New card added successfully! " + NewCard.getCardNumber());
        }
        } catch(IllegalArgumentException e) {
            return ResponseEntity.status(403).body("Error adding new card, it already exist in profile or not valid. Error: " + e.getMessage());
        }
        return ResponseEntity.status(400).body("Operation not successful.");
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
            return cardRepository.findAllByCustomerId(account_id);
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
//                BankCardsEnt newcard = new BankCardsEnt(newBankCard.getCardId(), newBankCard.getCardType(), newBankCard.getExpirationDate(), newBankCard.getIssueDate(), newBankCard.getStatus(), newBankCard.getCustomer());
//                cardRepository.save(newcard);
//        }
//        return ResponseEntity.ok("Card adding operation was successful.");
//        
//    }

    
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteCard(BankCardsEnt bankcard) {
        BankCardsEnt card = cardRepository.findByCardId(bankcard.getCardId());
        if((card.getCardId()) != null) {
            cardRepository.deleteById(bankcard.getCardId());
            return ResponseEntity.ok("Card deleted Successfully.");
        }
        return ResponseEntity.badRequest().body("Error exeute opertaion.");
    }


    
}

