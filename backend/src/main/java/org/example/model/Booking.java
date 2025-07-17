package org.example.model;

import jakarta.persistence.*;
import java.sql.Timestamp;

@Entity
@Table(name = "bookings")
public class Booking {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long bookingId;

    @Column(nullable = false)
    private Long userId;

    @Column(nullable = false)
    private Long taskerId;

    private String category;

    @Column(nullable = false)
    private String pickupLocation;

    private String dropLocation;
    private String instructions;

    @Column(nullable = false)
    private Timestamp scheduledTime;

    private Timestamp createdAt;

    @PrePersist
    protected void onCreate() {
        this.createdAt = new Timestamp(System.currentTimeMillis());
    }

    // Getters
    public Long getBookingId() {
        return bookingId;
    }

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

    public Timestamp getCreatedAt() {
        return createdAt;
    }

    // Setters
    public void setBookingId(Long bookingId) {
        this.bookingId = bookingId;
    }

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

    public void setCreatedAt(Timestamp createdAt) {
        this.createdAt = createdAt;
    }
}
