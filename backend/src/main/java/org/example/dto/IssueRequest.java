package org.example.dto;

public class IssueRequest {
    private Long taskerId;
    private String issueDescription;

    public IssueRequest() {}

    public IssueRequest(Long taskerId, String issueDescription) {
        this.taskerId = taskerId;
        this.issueDescription = issueDescription;
    }

    public Long getTaskerId() {
        return taskerId;
    }

    public void setTaskerId(Long taskerId) {
        this.taskerId = taskerId;
    }

    public String getIssueDescription() {
        return issueDescription;
    }

    public void setIssueDescription(String issueDescription) {
        this.issueDescription = issueDescription;
    }
}
