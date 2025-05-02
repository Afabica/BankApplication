//package com.example.demo.config;
//
//import org.springframework.stereotype.Component;
//import org.springframework.web.servlet.config.annotation.EnableWebMvc;
//import org.springframework.web.cors.CorsConfiguration;
//import org.springframework.web.cors.CorsConfigurationSource;
//import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
//import org.springframework.context.annotation.Bean;
//
//import jakarta.servlet.http.HttpServletRequest;
//import java.util.List;
//
//@Component
//public class CustomConfiguration implements CorsConfigurationSource {
//
//    @Override
//    public CorsConfiguration getCorsConfiguration(HttpServletRequest request) {
//        CorsConfiguration config = new CorsConfiguration();
//        config.setAllowedOrigins(List.of("http://localhost:8080", "http://127.0.0.1:8080"));
//        config.setAllowedMethods(List.of("GET", "POST", "PUT", "DELETE"));
//        config.setAllowedHeaders(List.of("*"));
//        config.setAllowCredentials(true);
//        return config;
//    }
//
////    @Bean
////    public CorsConfigurationSource corsConfigurationSource() {
////        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
////        CorsConfiguration config = getCorsConfiguration(null); // Use the above configuration
////        source.registerCorsConfiguration("/**", config);
////        return source;
////    }
//}
//
