package com.example.demo.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.example.demo.models.User;
import com.example.demo.services.UserServices;

@RestController
@CrossOrigin(origins ="*")
@RequestMapping("/user")
public class UserController {

    @Autowired
    private UserServices userService;

    @PostMapping("/register")
    public String registerUser(@RequestBody User user) {
        return userService.registerUser(user);
    }

    @PostMapping("/login")
    public User loginUser(@RequestParam int id, @RequestParam String password) {
    	return userService.loginUser(id, password);
    }

    @PutMapping("/change-password")
    public String changePassword(
            @RequestParam int id,
            @RequestParam String oldPassword,
            @RequestParam String newPassword) {
    	return userService.changePassword(id, oldPassword, newPassword);
    }

    @GetMapping("/forgot-password")
    public String forgotPassword(@RequestParam int id, @RequestParam String dob) {
    	return userService.forgotPassword(id, dob);
    }
}
