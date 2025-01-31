//package com.example.demo.service;
//
//import com.example.demo.model.Customer;
//import com.example.demo.model.BankCardsEnt;
//import com.example.demo.model.RegisterUser;
//import com.example.demo.repository.CustomerRepo;
//import com.exmaple.demo.repository.LoginRepo;
//import com.exmaple.demo.repository.CardRepository;
//import com.exmaple.demo.repository.TransactionRepo;
//import org.springframework.context.annotation.Bean;
//import org.springframework.security.core.userdetails.UserDetailsService;
//import org.springframework.context.annotation.Bean;
//import org.springframework.stereotype.Service;
//import org.springframework.context.annotation.Lazy;
//import org.springframework.beans.factory.annotation.Autowired;
//import java.math.LocalDate;
//import java.time.LocalDateTime;
//import org.jasypt.util.text.AES256TextEncryptor;
//
//
//@Service
//public class CardService {
//    
//    private final LoginRepo loginRepo;
//    private final CustomerRepo customerRepo;
//    private final CardRepository cardRepository;
//    
//    @Autowired
//    public CardService(@Lazy LoginRepo loginRepo, @Lazy CustomerRepo customerRepo, @Lazy CardREpository cardRepository) {
//        this.loginRepo = loginRepo;
//        this.customerRepo = customerRepo;
//        this.cardRepository = cardRepository;
//    }
//
//    public List<BankCardsEnt> findAllUserCards(Long userId) {
//        return cardRepository.findByUserId(userId);
//    }
//
//    public BankCardsEnt addCardToProfile(BankCardsEnt card) {
//        BankCardsEnt card = new BankCardsEnt();
//        card.setCustomerId(card.getCustomerId());
//        card.setCardType(card.getCardType());
//        card.setExpirationDate(card.getExpirationDate());
//        card.setIssueDate(card.getIssueDate());
//        card.setStatus(card.getStatus());
//        card.setCustomer(card.getCustomer());
//
//        return BankCardsEnt;
//    }
//
//
//    
//    public void softDeleteCustomerCard(Long id) {
//        cardRepo.softDeleteCustomerCard(id);
//    }
//}
