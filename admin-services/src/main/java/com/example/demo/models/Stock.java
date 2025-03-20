package com.example.demo.models;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name="stock")
public class Stock {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int stock_id;
	private int quantity;
	private double min_price;
	private double max_price;
	private double current_price;
	
	public double getCurrent_price() {
		return current_price;
	}
	public void setCurrent_price(double current_price) {
		this.current_price = current_price;
	}
	public int getStock_id() {
		return stock_id;
	}
	public void setStock_id(int stock_id) {
		this.stock_id = stock_id;
	}
	public int getQuantity() {
		return quantity;
	}
	public void setQuantity(int quantity) {
		this.quantity = quantity;
	}
	public double getMin_price() {
		return min_price;
	}
	public void setMin_price(double min_price) {
		this.min_price = min_price;
	}
	public double getMax_price() {
		return max_price;
	}
	public void setMax_price(double max_price) {
		this.max_price = max_price;
	}
	
	@Override
	public String toString() {
		return "Stock [stock_id=" + stock_id + ", quantity=" + quantity + ", min_price=" + min_price + ", max_price="
				+ max_price + "]";
	}
	
	
}
