package com.optionatlas.api.decision;

import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import java.util.UUID;

public interface FactorRepo extends JpaRepository<Factor, UUID> {
    List<Factor> findByDecisionId(UUID decisionId);
}
