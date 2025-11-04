package com.optionatlas.api.config;

import com.optionatlas.api.security.JwtService;
import com.optionatlas.api.user.User;
import com.optionatlas.api.user.UserRepo;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import java.util.Map;

@RestController
@RequestMapping("/auth")
@Validated
public class AuthController {
    private final UserRepo users;
    private final PasswordEncoder encoder;
    private final JwtService jwt;

    public AuthController(UserRepo users, PasswordEncoder encoder, JwtService jwt) {
        this.users = users;
        this.encoder = encoder;
        this.jwt = jwt;
    }

    public static record RegisterReq(@Email String email, @NotBlank String password) {}
    public static record LoginReq(@Email String email, @NotBlank String password) {}
    public static record TokenRes(String accessToken) {}

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody @Validated RegisterReq body) {
        if (users.existsByEmail(body.email())) {
            return ResponseEntity.badRequest().body(Map.of("error", "Email already in use"));    
        }
        User u = new User();
        u.setEmail(body.email());
        u.setPasswordHash(encoder.encode(body.password()));
        users.save(u);
        return ResponseEntity.ok(Map.of("ok", true));
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody @Validated LoginReq body) {
        var user = users.findByEmail(body.email()).orElse(null);
        if (user == null || !encoder.matches(body.password(), user.getPasswordHash())) {
            return ResponseEntity.status(401).body(Map.of("error", "Invalid credentials"));
        }
        String token = jwt.createToken(user.getEmail(), Map.of("uid", user.getId().toString()));
        return ResponseEntity.ok(new TokenRes(token));
    }
}
