package org.example.controller;

import org.example.model.ReportedIssue;
import org.example.repository.ReportedIssueRepository;
import org.example.dto.IssueRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.sql.Timestamp;

@RestController
@RequestMapping("/api/issues")
@CrossOrigin("*")
public class ReportedIssueController {

    @Autowired
    private ReportedIssueRepository reportedIssueRepository;

    @PostMapping("/report")
    public ResponseEntity<String> reportIssue(@RequestBody IssueRequest request) {
        // ✅ Debug log to confirm backend received the data
        System.out.println("Received issue report for Tasker ID: " + request.getTaskerId());

        ReportedIssue issue = new ReportedIssue();
        issue.setTaskerId(request.getTaskerId());
        issue.setIssueDescription(request.getIssueDescription());
        issue.setReportedAt(new Timestamp(System.currentTimeMillis())); // optional if DB auto-generates

        reportedIssueRepository.save(issue);

        // ✅ Return a message that frontend can display
        return ResponseEntity.ok("Issue reported successfully for Tasker ID: " + request.getTaskerId());
    }
}
