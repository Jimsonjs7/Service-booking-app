package org.example.controller;

import org.example.model.User;
import org.example.repository.UserRepository;
import org.example.service.UserService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/users")
public class UserController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private UserService userService;

    @GetMapping("/me")
    public ResponseEntity<?> getCurrentUser(@RequestHeader("Authorization") String authHeader) {
        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            return ResponseEntity.status(401).body("Unauthorized");
        }
        String token = authHeader.substring(7); // Remove "Bearer "
        if (!token.startsWith("mock-token-")) {
            return ResponseEntity.status(401).body("Unauthorized");
        }
        String idStr = token.replace("mock-token-", "");
        Long userId;
        try {
            userId = Long.parseLong(idStr);
        } catch (NumberFormatException e) {
            return ResponseEntity.status(401).body("Unauthorized");
        }
        Optional<User> userOpt = userRepository.findById(userId);
        if (userOpt.isEmpty()) {
            return ResponseEntity.status(401).body("Unauthorized");
        }
        User user = userOpt.get();
        return ResponseEntity.ok(Map.of(
                "id", user.getId(),
                "email", user.getEmail(),
                "name", user.getName(),
                "profilePicUrl", user.getProfilePicUrl()
        ));
    }

    @PutMapping("/update-username")
    public ResponseEntity<?> updateUsername(
            @RequestHeader("Authorization") String authHeader,
            @RequestBody UsernameRequest request) {

        // (Copy the same token extraction logic as in /me)
        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            return ResponseEntity.status(401).body("Unauthorized");
        }
        String token = authHeader.substring(7);
        if (!token.startsWith("mock-token-")) {
            return ResponseEntity.status(401).body("Unauthorized");
        }
        String idStr = token.replace("mock-token-", "");
        Long userId;
        try {
            userId = Long.parseLong(idStr);
        } catch (NumberFormatException e) {
            return ResponseEntity.status(401).body("Unauthorized");
        }
        Optional<User> userOpt = userRepository.findById(userId);
        if (userOpt.isEmpty()) {
            return ResponseEntity.status(401).body("Unauthorized");
        }
        User user = userOpt.get();

        // Now continue as before
        Optional<User> existing = userRepository.findByName(request.getUsername());
        if (existing.isPresent()) {
            return ResponseEntity.badRequest().body("Username already taken");
        }

        user.setName(request.getUsername());
        userRepository.save(user);
        return ResponseEntity.ok("Username updated successfully");
    }

    @PutMapping("/update-profile")
    public ResponseEntity<?> updateProfile(@AuthenticationPrincipal User user,
                                           @RequestBody ProfileUpdateRequest req) {
        if (user == null) return ResponseEntity.status(401).body("Unauthorized");

        user.setBio(req.getBio());
        user.setProfilePicUrl(req.getProfilePicUrl());
        userRepository.save(user);

        return ResponseEntity.ok("Profile updated");
    }

    @PostMapping("/upload-profile-pic")
    public ResponseEntity<String> uploadProfilePicture(@RequestParam("file") MultipartFile file,
                                                       @RequestParam Long userId) {
        try {
            String imageUrl = userService.uploadProfilePicture(file, userId);
            return ResponseEntity.ok(imageUrl);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Upload failed: " + e.getMessage());
        }
    }

    // DTOs
    public static class UsernameRequest {
        private String username;
        public String getUsername() { return username; }
        public void setUsername(String username) { this.username = username; }
    }

    public static class ProfileUpdateRequest {
        private String bio;
        private String profilePicUrl;
        public String getBio() { return bio; }
        public void setBio(String bio) { this.bio = bio; }
        public String getProfilePicUrl() { return profilePicUrl; }
        public void setProfilePicUrl(String profilePicUrl) { this.profilePicUrl = profilePicUrl; }
    }
}
