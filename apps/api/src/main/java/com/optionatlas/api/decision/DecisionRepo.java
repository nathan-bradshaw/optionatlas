package com.optionatlas.api.decision;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.UUID;
import java.util.List;

public interface DecisionRepo extends JpaRepository<Decision, UUID> {
    List<Decision> findByUserId(UUID userId);
}