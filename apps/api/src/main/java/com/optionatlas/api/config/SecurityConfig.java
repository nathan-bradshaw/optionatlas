package com.optionatlas.api.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import com.optionatlas.api.security.JwtAuthFilter;
import org.springframework.security.config.http.SessionCreationPolicy;

@Configuration
public class SecurityConfig {
    private final JwtAuthFilter jwtFilter;

    public SecurityConfig(JwtAuthFilter jwtFilter) {
        this.jwtFilter = jwtFilter;
    }
    
    @Bean
    SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        // disables csrf since this is a stateless API
        http
            .csrf(csrf -> csrf.disable())
            // enable default CORS configuration
            .cors(Customizer.withDefaults())
                  // do not create or use session, make it stateless
            .sessionManagement(session -> session
                .sessionCreationPolicy(SessionCreationPolicy.STATELESS)
            )

            // allow unauthenticated access to these endpoints
            .authorizeHttpRequests(auth -> auth
                .requestMatchers(
                "/health",
                "/auth/**",
                "/v3/api-docs/**",
                "/swagger-ui/**",
                "/swagger-ui.html",
                "/actuator/health"
                ).permitAll()
                // require authentication for any other request
                .anyRequest().authenticated()
            )
            // add JWT filter before username/password authentication filter
            .addFilterBefore(jwtFilter, UsernamePasswordAuthenticationFilter.class)
            // disable basic http authentication
            .httpBasic(b -> b.disable())
            // disable form login
            .formLogin(f -> f.disable());
        return http.build();
    }
}
