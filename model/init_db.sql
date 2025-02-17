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
    latitude DECIMAL(10,8),
    longitude DECIMAL(11,8),
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
('10th Planet Korea', '1324 Seongnam-daero Sujeong-gu', 'Seongnam', 'Gyeonggi-do', 'South Korea', 37.44824100, 127.12717000, '10thplanet_korea', 'NA', 'Inquire by contacting gym owner', 'First 10p gym in Korea'), ('10th Planet New Seoul', '133-24 Jegi-dong Dongdaemun-gu', 'Seoul', 'Gyeonggi-do', 'South Korea', 37.58503400, 127.03519600, '10thplanet_newseoul', 'NA', 'Inquire by contacting gym owner', 'Only 10p location in Seoul'), ('10th Planet Suwon', '25-5 Manseok-ro 19beon-gil Jangan-gu', 'Suwon', 'Gyeonggi-do', 'South Korea', 37.29637200, 126.98300800, '10thplanet_suwon', 'NA', 'Inquire by contacting gym owner', 'Third 10p location near the Seoul capital'), ('10th Planet Gwangju', '5 Jungang-ro 123beon-gil', 'Gwangju', 'Gyeonggi-do', 'South Korea', 37.41054300, 127.25732500, '10thplanet_gwangju', 'NA', 'Inquire by contacting gym owner', 'Fourth 10p location near the Seoul capital');

INSERT INTO reviews (rating, comment, gym_id) VALUES 
(5, 'Best no gi bjj gym in South Korea', 1), (4, 'Friendly atmosphere and had many fun rolls', 2), (5, 'The instructor is very good', 2);