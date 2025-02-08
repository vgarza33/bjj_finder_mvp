SET foreign_key_checks = 0;
DROP TABLE IF EXISTS gyms;
DROP TABLE IF EXISTS reviews;
SET foreign_key_checks = 1;

CREATE TABLE gyms (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    address VARCHAR(255) NOT NULL,
    city VARCHAR(100) NOT NULL,
    province_state VARCHAR(100) NOT NULL,
    country VARCHAR(100) NOT NULL,
    latitude DECIMAL(10,8) NOT NULL,
    longitude DECIMAL(11,8) NOT NULL,
    instagram VARCHAR(100),
    website VARCHAR(255),
    drop_in_fee VARCHAR(100),
    description TEXT
);

CREATE TABLE reviews (
    id INT AUTO_INCREMENT PRIMARY KEY,
    rating INT NOT NULL CHECK (rating >= 1 AND rating <= 5),
    comment TEXT,
    gym_id INT NOT NULL,
    FOREIGN KEY (gym_id) REFERENCES gyms(id) ON DELETE CASCADE
);

INSERT INTO gyms (name, address, city, province_state, country, latitude, longitude, instagram, website, drop_in_fee, description) VALUES 
('10th Planet Korea', '5113-10 Taepyeong-dong Sujeong-gu', 'Seongnam-si', 'Gyeonggi-do', 'South Korea', 37.448251, 127.127126, '10thplanet_korea', 'N/A', 'Inquire by contacting gym owner', 'First 10p gym in Korea');

INSERT INTO reviews (rating, comment, gym_id) VALUES 
(5, 'Great gym!', 1);