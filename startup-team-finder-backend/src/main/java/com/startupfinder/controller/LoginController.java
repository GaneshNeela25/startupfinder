package com.startupfinder.controller;

import com.startupfinder.model.User;
import com.startupfinder.repository.UserRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/login")
@CrossOrigin("*")
public class LoginController {

    @Autowired
    UserRepository userRepository;

    @PostMapping
    public User login(@RequestBody User user) {

        User existingUser = userRepository.findByEmailAndPassword(
                user.getEmail(),
                user.getPassword()
        );

        return existingUser;
    }
}