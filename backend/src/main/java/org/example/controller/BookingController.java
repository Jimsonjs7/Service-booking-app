package org.example.controller;

import org.example.dto.BookingRequest;
import org.example.model.Booking;
import org.example.repository.BookingRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/bookings")
@CrossOrigin
public class BookingController {

    @Autowired
    private BookingRepository bookingRepo;

    @PostMapping
    public ResponseEntity<String> bookTasker(@RequestBody BookingRequest req) {
        Booking booking = new Booking();
        booking.setUserId(req.getUserId());
        booking.setTaskerId(req.getTaskerId()); // references category_taskers.id
        booking.setCategory(req.getCategory());
        booking.setPickupLocation(req.getPickupLocation());
        booking.setDropLocation(req.getDropLocation());
        booking.setInstructions(req.getInstructions());
        booking.setScheduledTime(req.getScheduledTime());

        bookingRepo.save(booking);
        return ResponseEntity.ok("✅ Booking confirmed for tasker ID " + req.getTaskerId());
    }
}
