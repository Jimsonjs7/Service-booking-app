package org.example.model;

import jakarta.persistence.*;

import java.util.Date;

@Entity
@Table(name = "trip_history")
public class TripHistory {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long tripId;

    @Column(nullable = false)
    private Long driverId;

    @Column(nullable = false)
    @Temporal(TemporalType.DATE)
    private Date tripDate;

    @Column(nullable = false, columnDefinition = "TEXT")
    private String tripDescription;

    public TripHistory() {}

    public TripHistory(Long driverId, Date tripDate, String tripDescription) {
        this.driverId = driverId;
        this.tripDate = tripDate;
        this.tripDescription = tripDescription;
    }

    // Getters
    public Long getTripId() {
        return tripId;
    }

    public Long getDriverId() {
        return driverId;
    }

    public Date getTripDate() {
        return tripDate;
    }

    public String getTripDescription() {
        return tripDescription;
    }

    // Setters
    public void setTripId(Long tripId) {
        this.tripId = tripId;
    }

    public void setDriverId(Long driverId) {
        this.driverId = driverId;
    }

    public void setTripDate(Date tripDate) {
        this.tripDate = tripDate;
    }

    public void setTripDescription(String tripDescription) {
        this.tripDescription = tripDescription;
    }
}
