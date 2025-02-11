package com.github.yukkimoru.modex;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.ConfigurableApplicationContext;
import org.springframework.stereotype.Component;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;

@Component
public class SQL {

    @Value("${spring.datasource.url}")
    private String URL;

    @Value("${spring.datasource.username}")
    private String USER;

    @Value("${spring.datasource.password}")
    private String PASSWORD;

    public List<DataPoint> readTemperatures() {
        String sql = "SELECT timestamp, temperature FROM temperature";
        List<DataPoint> dataPoints = new ArrayList<>();

        try (Connection conn = DriverManager.getConnection(URL, USER, PASSWORD);
             PreparedStatement pstmt = conn.prepareStatement(sql);
             ResultSet rs = pstmt.executeQuery()) {

            while (rs.next()) {
                String timestamp = rs.getString("timestamp");
                double temperature = rs.getDouble("temperature");
                dataPoints.add(new DataPoint(timestamp, temperature));
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return dataPoints;
    }
}