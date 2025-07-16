package org.example.model;

import jakarta.persistence.*; // or javax.persistence.* depending on your Spring Boot version

@Entity
@Table(name = "category_taskers") // Assuming your table is named 'category_taskers'
public class CategoryTasker {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private Double rating;
    private String profilePicUrl;
    private String role; // From your DB structure
    private String bio;
    private Integer price; // From your DB structure
    private Boolean active; // From your DB structure
    private String assetType;
    private String assetModel;
    private String assetColor;
    private String assetIdentifier;
    private String assetSummary;


    @ManyToOne
    @JoinColumn(name = "category_id") // Make sure this column name matches your DB
    private Category category; // This links to your Category entity

    // Constructors
    public CategoryTasker() {}

    public CategoryTasker(String name, Double rating, String profilePicUrl,
                          String role, String bio, Integer price, Boolean active,
                          Category category) {
        this.name = name;
        this.rating = rating;
        this.profilePicUrl = profilePicUrl;
        this.role = role;
        this.bio = bio;
        this.price = price;
        this.active = active;
        this.category = category;
    }

    // Getters and Setters (ensure these are all present and match your DB columns)
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public Double getRating() { return rating; }
    public void setRating(Double rating) { this.rating = rating; }

    public String getProfilePicUrl() { return profilePicUrl; }
    public void setProfilePicUrl(String profilePicUrl) { this.profilePicUrl = profilePicUrl; }

    public String getRole() { return role; }
    public void setRole(String role) { this.role = role; }

    public String getBio() { return bio; }
    public void setBio(String bio) { this.bio = bio; }

    public Integer getPrice() { return price; }
    public void setPrice(Integer price) { this.price = price; }

    public Boolean getActive() { return active; }
    public void setActive(Boolean active) { this.active = active; }

    public Category getCategory() { return category; }
    public void setCategory(Category category) { this.category = category; }
    public String getAssetType() { return assetType; }
    public String getAssetModel() { return assetModel; }
    public String getAssetColor() { return assetColor; }
    public String getAssetIdentifier() { return assetIdentifier; }
    public String getAssetSummary() { return assetSummary; }

}
