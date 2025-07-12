package org.example.repository;

import org.example.model.ReportedIssue;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ReportedIssueRepository extends JpaRepository<ReportedIssue, Long> {
    // You can add custom queries here later
}
