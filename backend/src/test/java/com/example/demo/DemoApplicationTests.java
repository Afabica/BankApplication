package com.example.demo;

import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest(
        properties = {
            "spring.datasource.url=jdbc:h2:mem:testdb",
            "spring.datasource.username=",
            "spring.datasource.password=",
            "spring.jpa.hibernate.ddl-auto=none"
        })
// @TestPropertySource("classpath:test.properties")
public class DemoApplicationTests {

    @Test
    public void main() {}
}
