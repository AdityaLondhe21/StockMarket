package com.example.demo.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.models.Watchlist;
import com.example.demo.repos.WatchlistRepository;

import jakarta.transaction.Transactional;

import java.util.List;

@Service
public class WatchlistService {
    
    @Autowired
    private WatchlistRepository watchlistRepository;

    public List<Watchlist> getUserWatchlist(Long userId) {
        return watchlistRepository.findByUserId(userId);
    }

    public Watchlist addStockToWatchlist(Long userId, Long stockId) {
        Watchlist watchlist = new Watchlist();
        watchlist.setUserId(userId);
        watchlist.setStockId(stockId);
        return watchlistRepository.save(watchlist);
    }

    @Transactional
    public void removeStockFromWatchlist(Long stockId) {
        watchlistRepository.deleteByStockId(stockId);
    }
}
