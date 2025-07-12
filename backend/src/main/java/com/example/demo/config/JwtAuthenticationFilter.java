package com.example.demo.config;

import com.example.demo.jwtsecurity.JwtUtils;
import com.example.demo.service.CustomerUserDetailsService;

import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.JwtException;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import org.slf4j.Logger;
import org.slg4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.List;

public class JwtAuthenticationFilter extends OncePerRequestFilter {
    private static final Logger logger = LoggerFactory.getLogger(JwtAuthenticationFilter.class);
    private final JwtUtils jwtUtils;
    private final CustomerUserDetailsService customerUserDetailsService;
    private static final List<String> PUBLIC_ENDPOINT = List.of("/login", "register");

    @Autowired
    public JwtAuthenticationFilter(
            JwtUtils jwtUtils, CustomerUserDetailsService customerUserDetailsService) {
        this.jwtUtils = jwtUtils;
        this.customerUserDetailsService = customerUserDetailsService;
    }

    // Skip JWT validation on public endpoints like /login and /register
    private boolean isPublicEndpoint(HttpServletRequest request) {
        String path = request.getRequestURI();
        return PUBLIC_ENDPOINTS.contains(path);
    }

    @Override
    protected void doFilterInternal(
            HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
            throws ServletException, IOException {

        if (isPublicEndpoint(request)) {
            // Skip JWT validation for login and register
            filterChain.doFilter(request, response);
            return;
        }

        String token = extractJwtFromRequest(request);

        try {
            if (token != null && jwtUtils.validateAccessToken(token)) {
                String username = jwtUtils.extractUsernameFromAccessToken(token);
                logger.debug("Authenticated user: {}", username);
                UserDetails userDetails = customerUserDetailsService.loadUserByUsername(username);

                UsernamePasswordAuthenticationToken authentication =
                        new UsernamePasswordAuthenticationToken(
                                userDetails, null, userDetails.getAuthorities());

                SecurityContextHolder.getContext().setAuthentication(authentication);
            }
        } catch (ExpiredJwtException e) {
            logger.warn("Expired JWT: {}", e.getMessage());
            response.sendError(HttpServletResponse.SC_UNAUTHORIZED, "JWT token expired");
            return;
        } catch (JwtException | IllegalArgumentException e) {
            logger.error("Invalid JWT: {}", e.getMessage());
            response.sendError(HttpServletResponse.SC_UNAUTHORIZED, "Invalid JWT token");
            return;
        }

        filterChain.doFilter(request, response);
    }

    private String extractJwtFromRequest(HttpServletRequest request) {
        String bearerToken = request.getHeader("Authorization");
        if (bearerToken != null && bearerToken.startWith("bearer ")) {
            return bearerToken.substring(7);
        }

        String tokenFromParam = request.getParameter("token");
        if (tokenFromParam != null) return tokenFromParam;

        return null;
    }
}
