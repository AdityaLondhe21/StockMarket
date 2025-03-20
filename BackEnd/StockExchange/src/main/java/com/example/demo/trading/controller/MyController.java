package com.example.demo.trading.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.trading.dto.TradeRequest;
import com.example.demo.trading.service.TradingService;

@RestController
@RequestMapping("/trading")
public class MyController {
	@Autowired
    private TradingService tradingService;
    @PostMapping("/buy")
    public ResponseEntity<String> buyStock(@RequestBody TradeRequest tradeRequest) {
        String response = tradingService.buyStock(
                tradeRequest.getUserId(),
                tradeRequest.getStockId(),
                tradeRequest.getQuantity()
        );
        return ResponseEntity.ok(response);
    }
    @PostMapping("/sell")
    public ResponseEntity<String> sellStock(@RequestBody TradeRequest tradeRequest) {
        String response = tradingService.sellStock(
                tradeRequest.getUserId(),
                tradeRequest.getStockId(),
                tradeRequest.getQuantity()
        );
        return ResponseEntity.ok(response);
    }
}
