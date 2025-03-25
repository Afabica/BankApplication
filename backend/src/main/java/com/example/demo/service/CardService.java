package com.example.demo.service;

import com.example.demo.model.Customer;
import com.example.demo.model.BankCardsEnt;
import com.example.demo.model.RegisterUser;
import com.example.demo.repository.CustomerRepo;
import com.example.demo.repository.LoginRepo;
import com.example.demo.repository.CardRepository;
import com.example.demo.repository.TransactionRepo;
import org.springframework.context.annotation.Bean;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.context.annotation.Bean;
import org.springframework.stereotype.Service;
import org.springframework.context.annotation.Lazy;
import org.springframework.beans.factory.annotation.Autowired;
import java.time.LocalDate;
import java.time.LocalDateTime;

import java.util.List;
import java.util.Optional;

@Service
public class CardService {
    
    private final LoginRepo loginRepo;
    private final CustomerRepo customerRepo;
    private final CardRepository cardRepository;
    
    @Autowired
    public CardService(@Lazy LoginRepo loginRepo, @Lazy CustomerRepo customerRepo, @Lazy CardRepository cardRepository) {
        this.loginRepo = loginRepo;
        this.customerRepo = customerRepo;
        this.cardRepository = cardRepository;
    }

    public List<BankCardsEnt> findAllUserCards(Long userId) {
        return cardRepository.findAllByCustomerId(userId);
    }

    public BankCardsEnt addCardToProfile(BankCardsEnt newcard) {
        BankCardsEnt card = new BankCardsEnt();
        card.setCustomerId(card.getCustomerId());
        card.setCardType(card.getCardType());
        card.setExpirationDate(card.getExpirationDate());
        card.setIssueDate(card.getIssueDate());
        card.setStatus(card.getStatus());
        card.setCustomer(card.getCustomer());
        
        return cardRepository.save(card);
    }

    public String deleteCardById(Long id) {
        Optional<BankCardsEnt> card = cardRepository.findById(id);
        if(card.isPresent()) {
            cardRepository.deleteById(id);
            return("Card deleted successfully.");
        } else {
            return "User not found";
        }
    }

}
