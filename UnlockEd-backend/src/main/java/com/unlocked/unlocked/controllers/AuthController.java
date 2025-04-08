package com.unlocked.unlocked.controllers;

import com.unlocked.unlocked.service.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/auth")
public class AuthController {
    @Autowired
    private AuthService authService;

    @PostMapping("/signup")
    public ResponseEntity<?> signup(@RequestBody Map<String, String> request) {
        System.out.println("Received Request: " + request);  // Debugging log
        if (!request.containsKey("name") || !request.containsKey("email") || !request.containsKey("password")) {
            return ResponseEntity.badRequest().body(Map.of("error", "Missing required fields"));
        }

        String message = authService.registerUser(
                request.get("name"),
                request.get("email"),
                request.get("password"));
        return ResponseEntity.ok(Map.of("message", message));
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Map<String, String> request) {
        String token = authService.loginUser(request.get("email"), request.get("password"));
        return ResponseEntity.ok(Map.of("token", token));
    }


}
