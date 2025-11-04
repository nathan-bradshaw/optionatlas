package com.optionatlas.api.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Bean;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

// source of configuration for the application
@Configuration  
public class CorsConfig {
    // bean to customize web MVC configuration
    @Bean  
    public WebMvcConfigurer corsConfigurer() {
        // anonymous class to override CORS settings
        return new WebMvcConfigurer() {  
            @Override
            public void addCorsMappings(CorsRegistry registry) {
                // allow cross-origin requests to all endpoints from specified origin
                registry.addMapping("/**")
                        // only allow this origin
                        .allowedOrigins("http://localhost:5173")  
                        // allowed HTTP methods
                        .allowedMethods("GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS")  
                        // allow cookies and credentials to be sent
                        .allowCredentials(true)  
                        // cache preflight response for 1 hour
                        .maxAge(3600);  
            }
        };
    }
    
}
