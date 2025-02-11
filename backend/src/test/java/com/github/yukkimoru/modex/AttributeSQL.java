package com.github.yukkimoru.modex;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.SQLException;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.logging.Level;
import java.util.logging.Logger;

public class AttributeSQL {

    private static final Logger LOGGER = Logger.getLogger(AttributeSQL.class.getName());

    private static final String INSERT_TEMPERATURE_SQL = "INSERT INTO temperature (timestamp, temperature) VALUES (?, ?)";
    private static final String URL = "jdbc:mysql://localhost:3306/temperature";
    private static final String USER = "root";
    private static final String PASSWORD = "root";

    public void insertTemperature(double temperature, LocalDateTime timestamp) {
        try (Connection conn = DriverManager.getConnection(URL, USER, PASSWORD);
             PreparedStatement pstmt = conn.prepareStatement(INSERT_TEMPERATURE_SQL)) {

            pstmt.setString(1, timestamp.format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss")));
            pstmt.setDouble(2, temperature);

            pstmt.executeUpdate();
        } catch (SQLException e) {
            LOGGER.log(Level.SEVERE, "Error inserting temperature", e);
        }
    }


    public static void main(String[] args) {
        AttributeSQL attributeSQL = new AttributeSQL();
        LocalDateTime timestamp = LocalDateTime.parse("2025-01-01T20:00:00");
        attributeSQL.insertTemperature(20.5, timestamp);
    }
}