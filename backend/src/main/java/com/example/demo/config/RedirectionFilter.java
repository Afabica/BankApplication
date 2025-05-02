//import org.springframework.context.annotation.Bean;
//import org.springframework.context.annotation.Configuration;
//import org.springframework.boot.web.servlet.FilterRegistrationBean;
//import org.springframework.security.web.server.header.HttpHeaders;
//
//@Configuration
//public class RedirectFilter {
//
//    @Bean
//    public FilterRegistrationBean<org.springframework.web.filter.OncePerRequestFilter> redirectHttpToHttpsFilter() {
//        FilterRegistrationBean<org.springframework.web.filter.OncePerRequestFilter> registrationBean = 
//            new FilterRegistrationBean<>();
//        
//        registrationBean.setFilter(new org.springframework.web.filter.OncePerRequestFilter() {
//            @Override
//            protected void doFilterInternal(jakarta.servlet.http.HttpServletRequest request,
//                                             jakarta.servlet.http.HttpServletResponse response, 
//                                             jakarta.servlet.FilterChain filterChain) throws jakarta.servlet.ServletException, java.io.IOException {
//                if (request.getScheme().equals("http")) {
//                    String httpsUrl = "https://" + request.getServerName() + request.getRequestURI();
//                    response.setStatus(jakarta.servlet.http.HttpServletResponse.SC_MOVED_PERMANENTLY);
//                    response.setHeader("Location", httpsUrl);
//                } else {
//                    filterChain.doFilter(request, response);
//                }
//            }
//        });
//        
//        registrationBean.addUrlPatterns("/*");
//        return registrationBean;
//    }
//}
//
//
//package com.example.demo.config;
//
//import org.springframework.context.annotation.Bean;
//import org.springframework.context.annotation.Configuration;
//import jakarta.servlet.*;
//
//import java.io.IOException;
//
//public class RedirectionFilter implements Filter {
//    
//    @Override
//    public void init(FilterConfig filterConfig) throws ServletException {
//
//    
//
//    @Override
//    public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain) {
//        HttpServletRequest httpRequest = (HttpServletRequest) request;
//        HttpServletREsponse httpResponse = (HttpServletResponse) response;
//
//        String requestURI = httpRequest.getRequestURI();
//            if(requestURI.equals("/old-page")) {
//                httpResponse.sendRedirect("/new-page");
//                return;
//            }
//
//            chain.doFilter(request, response);
//    }
//
//    @Override
//    public void destroy() {
//
//    }
//}
