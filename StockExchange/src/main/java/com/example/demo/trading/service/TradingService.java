package com.example.demo.trading.service;

import java.math.BigDecimal;
import java.sql.Date;
import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import com.example.demo.trading.entity.Transaction;
import com.example.demo.trading.repository.TransactionRepository;

@Service
public class TradingService {
    @Autowired
    private TransactionRepository transactionRepository;

    @Autowired
    private RestTemplate restTemplate;

    private final String STOCK_SERVICE_URL = "http://stock-service/stocks";
    private final String USER_SERVICE_URL = "http://user-service/users";
    private final String PORTFOLIO_SERVICE_URL = "http://user-service/users";
    public String buyStock(Long userId, Long stockId, int quantity) {
        Map<String, Object> user = restTemplate.getForObject(USER_SERVICE_URL + "/" + userId, Map.class);
        if (user == null || !user.containsKey("balance")) {
            return "User not found";
        }

        Map<String, Object> stock = restTemplate.getForObject(STOCK_SERVICE_URL + "/" + stockId, Map.class);
        if (stock == null || !stock.containsKey("current_price")) {
            return "Stock not found";
        }

        BigDecimal stockPrice = new BigDecimal(stock.get("current_price").toString());
        BigDecimal totalCost = stockPrice.multiply(BigDecimal.valueOf(quantity));

        BigDecimal userBalance = new BigDecimal(user.get("balance").toString());

        if (userBalance.compareTo(totalCost) < 0) {
            return "Insufficient balance";
        }

        BigDecimal newBalance = userBalance.subtract(totalCost);
        Map<String, Object> updateBalanceRequest = new HashMap<>();
        updateBalanceRequest.put("balance", newBalance);
        restTemplate.put(PORTFOLIO_SERVICE_URL+ "/updateBalance/" + userId, updateBalanceRequest);

        Transaction transaction = new Transaction();
        transaction.setType("BUY");
        transaction.setUserId(userId);
        transaction.setStockId(stockId);
        transaction.setNoOfShares(quantity);
        transaction.setAmount(totalCost);
        transaction.setTimestamp(new Date(System.currentTimeMillis()));
        transactionRepository.save(transaction);

        return "Stock purchased successfully!";
    }

    public String sellStock(Long userId, Long stockId, int quantity) {
        Map<String, Object> user = restTemplate.getForObject(USER_SERVICE_URL + "/" + userId, Map.class);
        if (user == null || !user.containsKey("balance")) {
            return "User not found";
        }
        Map<String, Object> stock = restTemplate.getForObject(STOCK_SERVICE_URL + "/" + stockId, Map.class);
        if (stock == null || !stock.containsKey("current_price")) {
            return "Stock not found";
        }
        BigDecimal stockPrice = new BigDecimal(stock.get("current_price").toString());
        BigDecimal totalRevenue = stockPrice.multiply(BigDecimal.valueOf(quantity));

        BigDecimal userBalance = new BigDecimal(user.get("balance").toString());
        BigDecimal newBalance = userBalance.add(totalRevenue);
        Map<String, Object> updateBalanceRequest = new HashMap<>();
        updateBalanceRequest.put("balance", newBalance);
        restTemplate.put(PORTFOLIO_SERVICE_URL + "/updateBalance/" + userId, updateBalanceRequest);
        Transaction transaction = new Transaction();
        transaction.setType("SELL");
        transaction.setUserId(userId);
        transaction.setStockId(stockId);
        transaction.setNoOfShares(quantity);
        transaction.setAmount(totalRevenue);
        transaction.setTimestamp(new Date(System.currentTimeMillis()));
        transactionRepository.save(transaction);

        return "Stock sold successfully!";
    }
}
