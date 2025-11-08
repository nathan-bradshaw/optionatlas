package com.optionatlas.api.decision;

import jakarta.persistence.*;
import java.time.Instant;
import java.util.UUID;

@Entity @Table(name="decisions")
public class Decision {
    @Id @GeneratedValue private UUID id;
    @Column(nullable=false) private UUID userId;
    @Column(nullable=false) private String title;
    private String description;
    private Instant createdAt = Instant.now();

    public UUID getId() {
        return id;
    }
    public UUID getUserId() {
        return userId;
    }
    public void setUserId(UUID userId) {
        this.userId = userId;
    }
    public String getTitle() {
        return title;
    }
    public void setTitle(String title) {
        this.title = title;
    }
    public String getDescription() {
        return description;
    }
    public void setDescription(String description) {
        this.description = description;
    }
    public Instant getCreatedAt() {
        return createdAt;
    }
}
