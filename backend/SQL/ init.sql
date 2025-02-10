CREATE TABLE temperature
(
    id          INT AUTO_INCREMENT PRIMARY KEY,
    recorded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    temperature DECIMAL(5, 2)
);