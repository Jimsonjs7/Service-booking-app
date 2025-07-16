package org.example.model;

import jakarta.persistence.*;

@Entity
@Table(name = "users")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String email;
    private String password;
    private String name;
    private String profilePicUrl;
    private String bio;
    private Double rating;
    private Boolean active;
    private String role;

    @ManyToOne
    @JoinColumn(name = "category_id")
    private Category category;

    // Getters
    public Long getId() { return id; }
    public String getEmail() { return email; }
    public String getPassword() { return password; }
    public String getName() { return name; }
    public String getProfilePicUrl() { return profilePicUrl; }
    public String getBio() { return bio; }
    public Double getRating() { return rating; }
    public Boolean getActive() { return active; }
    public String getRole() { return role; }
    public Category getCategory() { return category; }

    // Setters
    public void setEmail(String email) { this.email = email; }
    public void setPassword(String password) { this.password = password; }
    public void setName(String name) { this.name = name; }
    public void setProfilePicUrl(String profilePicUrl) { this.profilePicUrl = profilePicUrl; }
    public void setBio(String bio) { this.bio = bio; }
    public void setRating(Double rating) { this.rating = rating; }
    public void setActive(Boolean active) { this.active = active; }
    public void setRole(String role) { this.role = role; }
    public void setCategory(Category category) { this.category = category; }
}
