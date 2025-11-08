package com.optionatlas.api.decision;

import jakarta.persistence.*;
import java.time.Instant;
import java.util.UUID;

@Entity @Table(name="factors")
public class Factor {
    @Id @GeneratedValue private UUID id;
    @Column(nullable=false) private UUID decisionId;
    @Column(nullable=false) private String type;
    @Column(nullable=false) private String text;
    private int weight = 1;
    private Instant createdAt = Instant.now();

    public UUID getId() {
        return id;
    }
    public UUID getDecisionId() {
        return decisionId;
    }
    public void setDecisionId(UUID decisionId) {
        this.decisionId = decisionId;
    }
    public String getType() {
        return type;
    }
    public void setType(String type) {
        this.type = type;
    }
    public String getText() {
        return text;
    }
    public void setText(String text) {
        this.text = text;
    }
    public int getWeight() {
        return weight;
    }
    public void setWeight(int weight) {
        this.weight = weight;
    }
    public Instant getCreatedAt() {
        return createdAt;
    }
}
