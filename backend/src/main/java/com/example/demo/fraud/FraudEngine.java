// package com.example.demo.fraud;
//
// import com.example.demo.model.Transaction;
//
// import jakarta.persistence.*;
//
// import java.util.ArrayList;
// import java.util.List;
//
// public class FraudEngine {
//    public static List<String> detect(Transaction tx, List<Transaction> history) {
//        List<String> alerts = new ArrayList<>();
//
//        if ((tx.getAmount()) > 10000) {
//            alerts.add("Unusually large transaction");
//        }
//
//        long sameDayTx = history.stream().filter(t -> t.getDate().equals(tx.getDate())).count();
//
//        if (sameDayTx > 5) {
//            alerts.add("Multiple transactions in a short time");
//        }
//
//        return alerts;
//    }
// }
