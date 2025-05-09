package com.example.demo.trading.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.demo.trading.entity.Transaction;


	@Repository
	public interface TransactionRepository extends JpaRepository<Transaction, Long> {
	    List<Transaction> findByUserUserId(Long userId);
	}
	
