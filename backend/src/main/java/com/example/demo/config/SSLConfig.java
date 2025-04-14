//package com.example.demo.config;
//
//import javax.annotation.PostConstruct;
//import javax.net.ssl.X509TrustManager;
//import java.security.cert.X509Certificate;
//import javax.net.ssl.SSLContext;
//import javax.net.ssl.HttpsURLConnection;
//import java.security.NoSuchAlgorithmException;
//import java.security.KeyManagementException;
//
////import jakarta.annotation.PostContruct;
////import jakarta.net.ssl.X509TrustManager;
////import jakarta.security.cert.X509Certificate;
////import jakarta.net.ssl.HttpURLConnection;
////import jakarta.net.ssl.NoSuchAlgorihmException;
////import java.security.KeyManagementException;
//
//import org.springframework.boot.web.embedded.tomcat.TomcatServletWebServerFactory;
//import org.springframework.boot.web.servlet.server.ServletWebServerFactory;
//import org.springframework.context.annotation.Bean;
//
//import org.springframework.context.annotation.Configuration;
//
//@Configuration
//public class SSLConfig {
//
//     @Bean
//    public ServletWebServerFactory servletContainer() {
//        TomcatServletWebServerFactory tomcat = new TomcatServletWebServerFactory();
//        tomcat.setPort(8443);
//        tomcat.addConnectorCustomizers(connector -> {
//            connector.setScheme("https");
//            connector.setSecure(true);
//            connector.setPort(8443);
//        });
//        return tomcat;
//    }
//}
