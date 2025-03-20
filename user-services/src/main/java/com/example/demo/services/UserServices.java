package com.example.demo.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.Optional;

import com.example.demo.models.User;
import com.example.demo.repos.UserRepository;

import jakarta.transaction.Transactional;

@Service
public class UserServices {

    @Autowired
    private UserRepository repo;

    public String registerUser(User user) {
        Optional<User> existingUser = repo.findById(user.getUser_id());
        if (existingUser.isPresent()) {
            return "ID already exists";
        } else {
            user.setBalance(0);
            repo.save(user);
            return "User registered successfully";
        }
    }

    public User loginUser(int id, String pass) {
        Optional<User> userOptional = repo.findById(id);
        if (userOptional.isPresent()) {
            User user = userOptional.get();
            if (user.getPassword().equals(pass)) {
                return user;
            }
        }
        return null;
    }

    @Transactional
    public String changePassword(int id, String oldPassword, String newPassword) {
        Optional<User> userOptional = repo.findById(id);
        if (userOptional.isPresent()) {
            User user = userOptional.get();
            if (user.getPassword().equals(oldPassword)) {
                user.setPassword(newPassword);
                repo.save(user);
                return "Password changed successfully";
            } else {
                return "Old password is incorrect";
            }
        }
        return "User not found";
    }

    public String forgotPassword(int id, String dob) {
        Optional<User> userOptional = repo.findById(id);
        if (userOptional.isPresent() && userOptional.get().getDate_of_birth().equals(dob)) {
            return "Your password: " + userOptional.get().getPassword();
        }
        return "Your password: " + userOptional.get().getPassword();
    }
    
    public double getBalance(int id) {
        Optional<User> optionalUser = repo.findById(id);
        return optionalUser.map(User::getBalance).orElse(null);
    }

    public boolean updateBalance(int id, double balance) {
        Optional<User> optionalUser = repo.findById(id);
        if (optionalUser.isPresent()) {
            User user = optionalUser.get();
            user.setBalance(balance);
            repo.save(user);
            return true;
        }
        return false;
    }
}
