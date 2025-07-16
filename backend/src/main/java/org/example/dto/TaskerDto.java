package org.example.dto;

public class TaskerDto {
    private Long id;
    private String name;
    private String profilePicUrl;
    private Double rating;
    private String categoryName;
    private String bio;

    // Newly added asset-related fields
    private String assetType;
    private String assetModel;
    private String assetColor;
    private String assetIdentifier;
    private String assetSummary;

    // 📦 Full Constructor (with asset fields)
    public TaskerDto(Long id, String name, String profilePicUrl, Double rating,
                     String categoryName, String bio,
                     String assetType, String assetModel, String assetColor,
                     String assetIdentifier, String assetSummary) {
        this.id = id;
        this.name = name;
        this.profilePicUrl = profilePicUrl;
        this.rating = rating;
        this.categoryName = categoryName;
        this.bio = bio;
        this.assetType = assetType;
        this.assetModel = assetModel;
        this.assetColor = assetColor;
        this.assetIdentifier = assetIdentifier;
        this.assetSummary = assetSummary;
    }

    // 🧱 Minimal Constructor (only core fields)
    public TaskerDto(Long id, String name, String profilePicUrl, Double rating,
                     String categoryName, String bio) {
        this.id = id;
        this.name = name;
        this.profilePicUrl = profilePicUrl;
        this.rating = rating;
        this.categoryName = categoryName;
        this.bio = bio;
    }

    // 🔍 Getters
    public Long getId() { return id; }
    public String getName() { return name; }
    public String getProfilePicUrl() { return profilePicUrl; }
    public Double getRating() { return rating; }
    public String getCategoryName() { return categoryName; }
    public String getBio() { return bio; }
    public String getAssetType() { return assetType; }
    public String getAssetModel() { return assetModel; }
    public String getAssetColor() { return assetColor; }
    public String getAssetIdentifier() { return assetIdentifier; }
    public String getAssetSummary() { return assetSummary; }

    // 🛠 Setters
    public void setId(Long id) { this.id = id; }
    public void setName(String name) { this.name = name; }
    public void setProfilePicUrl(String profilePicUrl) { this.profilePicUrl = profilePicUrl; }
    public void setRating(Double rating) { this.rating = rating; }
    public void setCategoryName(String categoryName) { this.categoryName = categoryName; }
    public void setBio(String bio) { this.bio = bio; }
    public void setAssetType(String assetType) { this.assetType = assetType; }
    public void setAssetModel(String assetModel) { this.assetModel = assetModel; }
    public void setAssetColor(String assetColor) { this.assetColor = assetColor; }
    public void setAssetIdentifier(String assetIdentifier) { this.assetIdentifier = assetIdentifier; }
    public void setAssetSummary(String assetSummary) { this.assetSummary = assetSummary; }
}
