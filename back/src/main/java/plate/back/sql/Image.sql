CREATE TABLE image (
    id INT AUTO_INCREMENT PRIMARY KEY,
    log_id INT,
    image_type VARCHAR(10) NOT NULL,
    image_title VARCHAR(255) NOT NULL,
    image_url TEXT NOT NULL,
    FOREIGN KEY (log_id) REFERENCES log (id) ON DELETE CASCADE
);
