package com.example.demo.controllers;

import java.math.BigDecimal;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.entities.Portfolio;
import com.example.demo.entities.Watchlist;
import com.example.demo.services.PortfolioService;

@RestController
@RequestMapping("/portfolio")
public class PortfolioController {

    @Autowired
    private PortfolioService portfolioService;

    // Add to Watchlist
    @PostMapping("/interested")
    public ResponseEntity<String> addToWatchlist(
            @RequestParam int userId,
            @RequestParam int stockId) {
        String result = portfolioService.addToWatchlist(userId, stockId);
        return ResponseEntity.ok(result);
    }

    // View Watchlist
    @GetMapping("/watchlist/{userId}")
    public ResponseEntity<List<Watchlist>> getWatchlist(@PathVariable int userId) {
        List<Watchlist> watchlist = portfolioService.getUserWatchlist(userId);
        return ResponseEntity.ok(watchlist);
    }

    // Buy Stock
    

    // View Holdings
    @GetMapping("/{userId}")
    public ResponseEntity<List<Portfolio>> getHoldings(@PathVariable int userId) {
        List<Portfolio> holdings = portfolioService.getUserHoldings(userId);
        return ResponseEntity.ok(holdings);
    }

    // Deposit Balance
    @PostMapping("/deposit")
    public ResponseEntity<String> depositAmount(
            @RequestParam int userId,
            @RequestParam BigDecimal amount) {
        String result = portfolioService.depositAmount(userId, amount);
        return ResponseEntity.ok(result);
    }
}

