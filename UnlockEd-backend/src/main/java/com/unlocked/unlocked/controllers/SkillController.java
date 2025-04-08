package com.unlocked.unlocked.controllers;

import com.unlocked.unlocked.models.User;
import com.unlocked.unlocked.repositories.UserRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/api/skills")
public class SkillController {

    private final UserRepository userRepository;

    public SkillController(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @PostMapping("/add")
    public ResponseEntity<String> addSkill(@RequestParam String userId, @RequestParam String skill) {
        Optional<User> userOpt = userRepository.findById(userId);

        if (userOpt.isPresent()) {
            User user = userOpt.get();
            user.getSkills().add(skill);
            userRepository.save(user);
            return ResponseEntity.ok("Skill added successfully!");
        }

        return ResponseEntity.badRequest().body("User not found.");
    }
}
