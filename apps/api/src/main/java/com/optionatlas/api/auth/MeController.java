package com.optionatlas.api.auth;

import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.security.core.Authentication;
import java.util.Map;

@RestController
public class MeController {
    @GetMapping("/me")
    public Map<String, Object> me(Authentication auth) {
        return Map.of("subject", auth.getName());
    }
}
