package com.example.demo.controllers;

import org.springframework.beans.factory.annotation.Autowired
;
import org.springframework.web.bind.annotation.*;

import com.example.demo.models.Watchlist;
import com.example.demo.services.WatchlistService;

import java.util.List;

@RestController
@RequestMapping("/watchlist")
@CrossOrigin(origins = "*")
public class WatchlistController {
    
    @Autowired
    private WatchlistService watchlistService;

    @GetMapping("/{userId}")
    public List<Watchlist> getWatchlist(@PathVariable Long userId) {
        return watchlistService.getUserWatchlist(userId);
    }

    @PostMapping("/")
    public Watchlist addToWatchlist(@RequestParam Long userId, @RequestParam Long stockId) {
        return watchlistService.addStockToWatchlist(userId, stockId);
    }

    @DeleteMapping("/{id}")
    public String removeFromWatchlist(@PathVariable Long id) {
        watchlistService.removeStockFromWatchlist(id);
        return "Stock removed from watchlist";
    }
}
