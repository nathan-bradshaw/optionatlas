package com.optionatlas.api;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

// GET /health and returns "ok" if the service is running
@RestController
public class HealthController {
    @GetMapping("/health")
    public Map<String, String> health() {
        // spring auto converts map to json 
        return Map.of("status", "ok");
    }
}
