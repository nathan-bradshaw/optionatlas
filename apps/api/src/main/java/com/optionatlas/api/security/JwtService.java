package com.optionatlas.api.security;

import com.fasterxml.jackson.databind.ObjectMapper;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import javax.crypto.SecretKey;
import java.nio.charset.StandardCharsets;
import java.time.Instant;
import java.util.Date;
import java.util.Map;

@Service
public class JwtService {
    private final SecretKey key;
    private final String issuer;
    private final long accessTtlSeconds;
    private final ObjectMapper mapper = new ObjectMapper();

    public JwtService(
        @Value("${jwt.secret}") String secret,
        @Value("${jwt.issuer}") String issuer,
        @Value("${jwt.accessTtlSeconds}") long accessTtlSeconds) {
            this.key = Keys.hmacShaKeyFor(secret.getBytes(StandardCharsets.UTF_8));
            this.issuer = issuer;
            this.accessTtlSeconds = accessTtlSeconds;
        }
    
    public String createToken(String subject, Map<String, Object> claims) {
        Instant now = Instant.now();
        return Jwts.builder()
            .setIssuer(issuer)
            .setSubject(subject)
            .addClaims(claims)
            .setIssuedAt(Date.from(now))
            .setExpiration(Date.from(now.plusSeconds(accessTtlSeconds)))
            .signWith(key)
            .compact();
    }

    public String validateAndGetSubject(String jwt) {
        return Jwts.parserBuilder()
            .setSigningKey(key)
            .requireIssuer(issuer)
            .build()
            .parseClaimsJws(jwt)
            .getBody()
            .getSubject();
    }
}
