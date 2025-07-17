package org.example.dto;

import java.sql.Timestamp;

public class BookingRequest {

    private Long userId;
    private Long taskerId;
    private String category;
    private String pickupLocation;
    private String dropLocation;
    private String instructions;
    private Timestamp scheduledTime;

    // Getters
    public Long getUserId() {
        return userId;
    }

    public Long getTaskerId() {
        return taskerId;
    }

    public String getCategory() {
        return category;
    }

    public String getPickupLocation() {
        return pickupLocation;
    }

    public String getDropLocation() {
        return dropLocation;
    }

    public String getInstructions() {
        return instructions;
    }

    public Timestamp getScheduledTime() {
        return scheduledTime;
    }

    // Setters
    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public void setTaskerId(Long taskerId) {
        this.taskerId = taskerId;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public void setPickupLocation(String pickupLocation) {
        this.pickupLocation = pickupLocation;
    }

    public void setDropLocation(String dropLocation) {
        this.dropLocation = dropLocation;
    }

    public void setInstructions(String instructions) {
        this.instructions = instructions;
    }

    public void setScheduledTime(Timestamp scheduledTime) {
        this.scheduledTime = scheduledTime;
    }
}
