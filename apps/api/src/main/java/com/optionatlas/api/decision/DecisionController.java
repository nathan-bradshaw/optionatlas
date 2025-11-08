package com.optionatlas.api.decision;

import org.springframework.web.bind.annotation.*;
import org.springframework.web.bind.annotation.RequestAttribute;
import org.springframework.http.ResponseEntity;
import java.util.*;

@RestController
@RequestMapping("/api/decisions")
public class DecisionController {
    private final DecisionRepo decisions;
    private final FactorRepo factors;

    public DecisionController(DecisionRepo decisions, FactorRepo factors) {
        this.decisions = decisions;
        this.factors = factors;
    }

    @GetMapping
    public List<Decision> list(@RequestAttribute("uid") UUID userId) {
        return decisions.findByUserId(userId);
    }

    @PostMapping
    public Decision create(@RequestAttribute("uid") UUID userId, @RequestBody Map<String, String> body) {
        Decision d = new Decision();
        d.setUserId(userId);
        d.setTitle(body.get("title"));
        d.setDescription(body.get("description"));
        return decisions.save(d);
    }

    @GetMapping("/{id}/factors")
    public List<Factor> listFactors(@PathVariable UUID id) {
        return factors.findByDecisionId(id);
    }

    @PostMapping("/{id}/factors")
    public Factor addFactor(@PathVariable UUID id, @RequestBody Map<String, Object> body) {
        Factor f = new Factor();
        f.setDecisionId(id);
        f.setType((String) body.get("type"));
        f.setText((String) body.get("text"));
        f.setWeight((int) body.getOrDefault("weight", 1));
        return factors.save(f);
    }
}
