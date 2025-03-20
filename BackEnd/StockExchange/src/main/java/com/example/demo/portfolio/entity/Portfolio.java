package com.example.demo.portfolio.entity;

import jakarta.persistence.*;
import java.math.BigDecimal;

@Entity
public class Portfolio {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int portfolio_Id;

    @Column(name="user_id", nullable = false)
    private int userId;

    @Column(name="stock_id",nullable = false)
    private int stockId;

    @Column(nullable = false, precision = 10, scale = 2)
    private BigDecimal amount;

    @Column(nullable = false)
    private int noOfShares;

    public int getPortfolioId() { return portfolio_Id; }
    public void setPortfolioId(int portfolioId) { this.portfolio_Id = portfolioId; }

    public int getUserId() { return userId; }
    public void setUserId(int userId) { this.userId = userId; }

    public int getStockId() { return stockId; }
    public void setStockId(int stockId) { this.stockId = stockId; }

    public BigDecimal getAmount() { return amount; }
    public void setAmount(BigDecimal amount) { this.amount = amount; }

    public int getNoOfShares() { return noOfShares; }
    public void setNoOfShares(int noOfShares) { this.noOfShares = noOfShares; }
}
