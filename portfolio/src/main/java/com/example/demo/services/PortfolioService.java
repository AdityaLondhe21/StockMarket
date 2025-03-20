package com.example.demo.services;

import java.math.BigDecimal;
import java.util.List;

import com.example.demo.entities.Portfolio;
import com.example.demo.entities.Watchlist;

public interface PortfolioService {
    String addToWatchlist(int userId, int stockId);
    List<Watchlist> getUserWatchlist(int userId);
    String buyStock(int userId, int stockId, int noOfShares);
    List<Portfolio> getUserHoldings(int userId);
    String depositAmount(int userId, BigDecimal amount);
}