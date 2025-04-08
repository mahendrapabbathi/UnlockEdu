package com.unlocked.unlocked.controllers;

import com.unlocked.unlocked.models.User;
import com.unlocked.unlocked.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/users")
public class UserController {

    @Autowired
    private UserRepository userRepository;

    // Add a new user
    @PostMapping("/add")
    public User addUser(@RequestBody User user) {
        return userRepository.save(user);
    }

    // Get user by ID
    @GetMapping("/{id}")
    public Optional<User> getUser(@PathVariable String id) {
        return userRepository.findById(id);
    }

    // Add a skill to an existing user
    @PutMapping("/{id}/add-skill")
    public User addSkillToUser(@PathVariable String id, @RequestBody String skill) {
        Optional<User> optionalUser = userRepository.findById(id);
        if (optionalUser.isPresent()) {
            User user = optionalUser.get();
            List<String> skills = user.getSkills();
            skills.add(skill);
            user.setSkills(skills);
            return userRepository.save(user);
        }
        return null; // Handle user not found properly in a real scenario
    }
}
