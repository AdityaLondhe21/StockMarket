package com.example.demo.services;

import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;

import org.jvnet.hk2.annotations.Service;
import org.springframework.beans.factory.annotation.Autowired;

import com.example.demo.entities.Watchlist;
import com.example.demo.repositories.PortfolioRepository;
import com.example.demo.repositories.WatchlistRepository;

import com.example.demo.entities.Portfolio;
import com.example.demo.entities.Watchlist;
@Service
public class PortfolioServiceImpl implements PortfolioService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private StockRepository stockRepository;

    @Autowired
    private PortfolioRepository portfolioRepository;

    @Autowired
    private WatchlistRepository watchlistRepository;

    @Override
    public String addToWatchlist(int userId, int stockId) {
        Optional<Watchlist> existing = watchlistRepository.findByUserIdAndStockId(userId, stockId);
        if (existing.isPresent()) {
            return "Stock already in watchlist.";
        }
        Watchlist watchlist = new Watchlist();
        watchlist.setUserId(userId);
        watchlist.setStockId(stockId);
        watchlistRepository.save(watchlist);
        return "Stock added to watchlist.";
    }

    @Override
    public List<Watchlist> getUserWatchlist(int userId) {
        return watchlistRepository.findByUserId(userId);
    }

    

    @Override
    public List<Portfolio> getUserHoldings(int userId) {
        return portfolioRepository.findByUserId(userId);
    }

    @Override
    public String depositAmount(int userId, BigDecimal amount) {
        Optional<User> userOpt = userRepository.findById(userId);
        if (userOpt.isEmpty()) {
            return "User not found.";
        }
        User user = userOpt.get();
        user.setBalance(user.getBalance().add(amount));
        userRepository.save(user);
        return "Amount deposited. New Balance: " + user.getBalance();
    }
}