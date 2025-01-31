package com.example.security;

import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.stereotype.Component;

@Component
public class CustomAuthenticationProvider implements AuthenticationProvider {

    @Override
    public Authentication authenticate(final Authentication authentication) throws AuthenticationException {
        final String name = authentication.getName();
        final String password = authentication.getCredentials().toString();

        if (!"admin".equals(name) || !"system".equals(password)) {
            return null;
        }

        return authenticateAgainstThirdPartyAndGetAuthentication(name, password);
    }

    private Authentication authenticateAgainstThirdPartyAndGetAuthentication(String name, String password) {
        // This is a placeholder for real authentication logic against a third-party system.
        return new UsernamePasswordAuthenticationToken(name, password, null); // Use roles if needed in place of `null`.
    }

    @Override
    public boolean supports(Class<?> authentication) {
        return authentication.equals(UsernamePasswordAuthenticationToken.class);
    }
}

