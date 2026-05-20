package com.startupfinder.controller;

import com.startupfinder.model.User;
import com.startupfinder.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/users")
@CrossOrigin("*")
public class UserController {

    @Autowired
    UserRepository userRepository;

    @PostMapping
    public User createUser(@RequestBody User user) {
        return userRepository.save(user);
    }

    @GetMapping
    public List<User> getUsers() {
        return userRepository.findAll();
    }

    @GetMapping("/search")
    public List<User> searchUsers(@RequestParam String skill) {
        return userRepository.findBySkillsContainingIgnoreCase(skill);
    }

    @GetMapping("/match")
    public List<User> matchUsers(
        @RequestParam String skill,
        @RequestParam Long id
    ) {

    return userRepository
            .findBySkillsContainingIgnoreCaseAndIdNot(
                    skill,
                    id
            );

    }
}