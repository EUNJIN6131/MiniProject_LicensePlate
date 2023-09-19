CREATE TABLE predict_log (
    id INT AUTO_INCREMENT PRIMARY KEY,
    log_id INT NOT NULL,
    model_type VARCHAR(10) NOT NULL,
    predicted_text VARCHAR(10) NOT NULL,
    accuracy DOUBLE NOT NULL,
    is_present BOOLEAN NOT NULL,
    FOREIGN KEY (log_id) REFERENCES log (log_id) ON DELETE CASCADE
);
