package com.github.yukkimoru.modex;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.ConfigurableApplicationContext;
import org.springframework.stereotype.Component;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.SQLException;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

@Component
public class attributeSQL {

    @Value("${spring.datasource.url}")
    private String URL;

    @Value("${spring.datasource.username}")
    private String USER;

    @Value("${spring.datasource.password}")
    private String PASSWORD;

    public void insertTemperature(double temperature) {
        String sql = "INSERT INTO temperature (timestamp, temperature) VALUES (?, ?)";

        try (Connection conn = DriverManager.getConnection(URL, USER, PASSWORD);
             PreparedStatement pstmt = conn.prepareStatement(sql)) {

            LocalDateTime now = LocalDateTime.now();
            pstmt.setString(1, now.format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss")));
            pstmt.setDouble(2, temperature);

            pstmt.executeUpdate();
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }

    @SpringBootApplication
    public static class Application {
        public static void main(String[] args) {
            ConfigurableApplicationContext context = SpringApplication.run(Application.class, args);
            attributeSQL attributeSQL = context.getBean(attributeSQL.class);
            attributeSQL.insertTemperature(25.0);
            SpringApplication.exit(context);
        }
    }
}