SET foreign_key_checks = 0;
DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS gyms;
-- DROP TABLE IF EXISTS reviews;
-- DROP TABLE IF EXISTS photos;
SET foreign_key_checks = 1;

CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    role ENUM('USER', 'GYM_OWNER', 'ADMIN') DEFAULT 'USER',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE gyms (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    address VARCHAR(255) NOT NULL,
    city VARCHAR(100) NOT NULL,
    state VARCHAR(100) NOT NULL,
    country VARCHAR(100) NOT NULL,
    latitude DECIMAL(10,8) NOT NULL,
    longitude DECIMAL(11,8) NOT NULL,
    phone VARCHAR(20),
    website VARCHAR(255),
    drop_in_fee DECIMAL(10,2),
    description TEXT,
    owner_id INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (owner_id) REFERENCES users(id) ON DELETE CASCADE,
    INDEX idx_location (latitude, longitude),
    INDEX idx_city (city)
);

-- CREATE TABLE reviews (
--     id INT AUTO_INCREMENT PRIMARY KEY,
--     rating INT NOT NULL CHECK (rating >= 1 AND rating <= 5),
--     comment TEXT,
--     user_id INT NOT NULL,
--     gym_id INT NOT NULL,
--     created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
--     FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
--     FOREIGN KEY (gym_id) REFERENCES gyms(id) ON DELETE CASCADE,
--     INDEX idx_gym (gym_id)
-- );

-- CREATE TABLE photos (
--     id INT AUTO_INCREMENT PRIMARY KEY,
--     url VARCHAR(255) NOT NULL,
--     gym_id INT NOT NULL,
--     created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
--     FOREIGN KEY (gym_id) REFERENCES gyms(id) ON DELETE CASCADE,
--     INDEX idx_gym (gym_id)
-- );

-- Insert some sample data
INSERT INTO users (name, email, password, role) VALUES 
('John Admin', 'admin@test.com', 'hashedpassword123', 'ADMIN'),
('Jane Owner', 'owner@test.com', 'hashedpassword123', 'GYM_OWNER'),
('Bob User', 'user@test.com', 'hashedpassword123', 'USER');

INSERT INTO gyms (name, address, city, state, country, latitude, longitude, phone, website, drop_in_fee, description, owner_id) VALUES 
('NYC BJJ Academy', '123 Main St', 'New York', 'NY', 'USA', 40.7128, -74.0060, '123-456-7890', 'www.nycbjj.com', 25.00, 'Great BJJ gym in NYC', 2);