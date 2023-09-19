CREATE TABLE log (
    log_id INT AUTO_INCREMENT PRIMARY KEY,
    model_type VARCHAR(20) NOT NULL,
    license_plate VARCHAR(10) NOT NULL,
    accuracy DOUBLE NOT NULL,
    state VARCHAR(10) NOT NULL,
    date DATETIME
);