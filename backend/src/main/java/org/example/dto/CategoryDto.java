package org.example.dto;

import java.math.BigDecimal;

public class CategoryDto {
    private Long id;
    private String name;
    private String iconUrl;
    private String description;
    private BigDecimal minPrice;
    private BigDecimal maxPrice;

    public CategoryDto(Long id, String name, String iconUrl,
                       String description, BigDecimal minPrice, BigDecimal maxPrice) {
        this.id = id;
        this.name = name;
        this.iconUrl = iconUrl;
        this.description = description;
        this.minPrice = minPrice;
        this.maxPrice = maxPrice;
    }

    // Getters
    public Long getId() { return id; }
    public String getName() { return name; }
    public String getIconUrl() { return iconUrl; }
    public String getDescription() { return description; }
    public BigDecimal getMinPrice() { return minPrice; }
    public BigDecimal getMaxPrice() { return maxPrice; }
}
