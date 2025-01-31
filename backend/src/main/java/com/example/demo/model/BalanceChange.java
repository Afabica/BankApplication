package com.example.demo.model;

import org.springframework.context.ApplicationEvent;

public class BalanceChange extends ApplicationEvent {

    private final Long accountId;
    private final Double oldBalance;
    private final Double newBalance;
    private final Double transactionAmount;

    public BalanceChange(Object source, Long accountId, Double oldBalance, Double newBalance, Double transactionAmount) {
        super(source);
        this.accountId = accountId;
        this.oldBalance = oldBalance;
        this.newBalance = newBalance;
        this.transactionAmount = transactionAmount;
    }

    public Long getAccountId() {
        return accountId;
    }

    public Double getOldBalance() {
        return oldBalance;
    }

    public Double getNewBalance() {
        return newBalance;
    }

    public Double getTransactionAmount() {
        return transactionAmount;
    }
}

