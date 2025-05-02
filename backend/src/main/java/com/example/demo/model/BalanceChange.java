package com.example.demo.model;

import org.springframework.context.ApplicationEvent;
import jakarta.persistence.*;
import org.springframework.security.core.userdetails.UserDetails;


@Entity 
@Table(name = "bal_change")
public class BalanceChange { 
//public class BalanceChange extends ApplicationEvent {



    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private final Long accountSource;
    private final Long accountDestination;
    private final Long oldBalance;
    private final Long newBalance;
    private final Long transactionAmount;
    // Object source
    public BalanceChange(Long accountSource, Long accountDestination, Long oldBalance, Long newBalance, Long transactionAmount) {
//        super(source);
        this.accountSource = accountSource;
        this.accountDestination = accountDestination;
        this.oldBalance = oldBalance;
        this.newBalance = newBalance;
        this.transactionAmount = transactionAmount;
    }

    public Long getAccountSource() {
        return accountSource;
    }

    public Long getAccountDestination() {
        return accountDestination;
    } 

    public Long getOldBalance() {
        return oldBalance;
    }

    public Long getNewBalance() {
        return newBalance;
    }

    public Long getTransactionAmount() {
        return transactionAmount;
    }
}

