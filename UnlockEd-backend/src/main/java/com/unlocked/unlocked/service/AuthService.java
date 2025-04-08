package com.unlocked.unlocked.service;

import com.unlocked.unlocked.models.User;
import com.unlocked.unlocked.repositories.UserRepository;
import com.unlocked.unlocked.security.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import java.util.Optional;

@Service
public class AuthService {
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private JwtUtil jwtUtil;

    private final BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    public String registerUser(String name, String email, String password) {
        if (name == null || email == null || password == null) {
            throw new IllegalArgumentException("Fields cannot be null");
        }
        Optional<User> existingUser = userRepository.findByEmail(email);
        if (existingUser.isPresent()) {
            throw new RuntimeException("Email already exists!");
        }
        User newUser = new User(name, email, passwordEncoder.encode(password));
        userRepository.save(newUser);
        return "User registered successfully!";
    }

    public String loginUser(String email, String password) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found!"));

        if (!passwordEncoder.matches(password, user.getPassword())) {
            throw new RuntimeException("Invalid password!");
        }

        return jwtUtil.generateToken(user.getEmail());
    }
}
