CREATE TABLE history (
    id INT AUTO_INCREMENT PRIMARY KEY,
    log_id INT,
    user_id VARCHAR(20) NOT NULL,
    work_type VARCHAR(10) NOT NULL,
    previous_text VARCHAR(10) NOT NULL,
    current_text VARCHAR(10) NOT NULL,
    date DATETIME
);
