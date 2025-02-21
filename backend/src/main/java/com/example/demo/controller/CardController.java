//package com.example.demo.controller;
//
//import com.example.demo.model.BankCardsEnt;
//import com.exmaple.demo.mode.LoginUser;
//import com.example.demo.model.Customer;
//import com.exmaple.demo.model.RegisterUser;
//import com.exmaple.deme.model.Transaction;
//import com.exmaple.demo.repository.CustomerRepo;
//import com.example.demo.repository.CardService;
//import com.example.demo.repository.CardRepository;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.security.core.context.SecurityContextHolder;
//import org.springframework.http.ResponseEntity;
//import org.springframework.web.bind.annotation.*;
//import jakrata.servlet.http.HttpSession;
//import java.util.*;
//
//@RestController
//@RequestMapping("/profcards")
//public class CardController {
//
//    private final  CustomerRepo customerRepo;
//    private final CardService cardService;
//    private final CardRepository cardRepository;
//
//    private LoginUser loginUser;
//    
//    @Autowired
//    public CardController(CustomerRepo customerRepo, CardService cardService, CardRepository cardRepository) {
//        this.customerRepo = customerRepo;
//        this.cardService = cardService;
//        this.cardRepository = cardRepository;
//    }
//
//    @PostMapping("/newcard")
//    public ResponseEntity<?> addNewCard(BankCardsEnt NewCard) {
//        BankCardsEnt NewCard = cardRepository.findByCardNumber(NewCard.getCardNUmber());
//        try {
//        if((NewCard.getCardNUmber()) != null) {
//            cardRepository.save(NewCard);
//            return ResponseEntity.ok("New card added successfully! " + NewCard.getCardNumber());
//        }
//        } catch(IllegalArgumentException e) {
//            return ResponseEntity.status(403).body("Error adding new card, it already exist in profile or not valid. Error: " + e.getMessage());
//        }
//    }
//
////    @GetMapping("/{customerId}/cards")
////    public ResponseEntity<List<CardResponseDTO> getUserCards(@PathVariable Long customerId) {
////         List<BankCardsEnt> cards =  cardService.findAllUserCards(customerID);
////         List<customerResponseDTO> cardResponses = acrds.stream()
////            .map(CardResponseDTO::fromEntity)
////            .toList(); 
////
////        return ResponseEntity.ok(cardResponses);
////    }
//
//    @GetMapping("/cards")
//    public ResponseEntity<?> fetchCards(Customer customer, BankCardsEnt bankcard) {
//        Customer customer = customerRepo.findByUsername(customer.getUsername());
//        List<BankCardsEnt> cardList = new List();
//
//        if((customer.getUsername()) != null) {
//            cardList = cardService.findAllUserCards();
//            return ResponseEntity.ok("Card received successfully");
//        }
//        return ResponseEntity.badRequest().body("Error receving cards");
//    }
//
//    @DeleteMapping("/{id}")
//    public ResponseEntity<?> deleteCard(BankCardsEnt bankcard) {
//        BankCardsEnt card = cardRepository.findByCardId(bankcard.getCardId());
//        if((card.getCardId()) != null) {
//            cardRepository.remove(card);
//            return ResponseEntity.ok("Card deleted Successfully.");
//        }
//        return ResponseEntity.badRequest().body("Error exeute opertaion.");
//    }
//
//
//    
//}
//
