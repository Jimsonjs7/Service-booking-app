package org.example.service;

import org.example.model.User;
import org.example.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Optional;
import java.util.UUID;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    private final String uploadDir = "uploads/";

    public Optional<User> getUserById(Long id) {
        return userRepository.findById(id);
    }

    public boolean isUsernameTaken(String name) {
        return userRepository.findByName(name).isPresent();
    }

    public User updateUsername(Long userId, String newName) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));
        user.setName(newName);
        return userRepository.save(user);
    }

    public String uploadProfilePicture(MultipartFile file, Long userId) throws Exception {
        Optional<User> optionalUser = userRepository.findById(userId);
        if (optionalUser.isEmpty()) {
            throw new Exception("User not found");
        }

        User user = optionalUser.get();
        String filename = UUID.randomUUID() + "_" + file.getOriginalFilename();
        Path path = Paths.get(uploadDir + filename);

        Files.createDirectories(path.getParent());
        Files.write(path, file.getBytes());

        String fileUrl = "/images/" + filename;
        user.setProfilePicUrl(fileUrl);
        userRepository.save(user);

        return fileUrl;
    }
}
