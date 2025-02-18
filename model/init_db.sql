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
('10th Planet Korea', '1324 Seongnam-daero Sujeong-gu', 'Seongnam', 'Gyeonggi-do', 'South Korea', 37.4480918, 127.1271269, '10thplanet_korea', NULL, NULL, 'First 10p gym in Korea'), ('10th Planet New Seoul', '133-24 Jegi-dong Dongdaemun-gu', 'Seoul', 'Gyeonggi-do', 'South Korea', 37.5847318, 127.0351956, '10thplanet_newseoul', NULL, NULL, 'Only 10p location in Seoul'), ('10th Planet Suwon', '25-5 Manseok-ro 19beon-gil Jangan-gu', 'Suwon', 'Gyeonggi-do', 'South Korea', 37.296206, 126.9830505, '10thplanet_suwon', NULL, NULL, 'Third 10p location near the Seoul capital'), ('10th Planet Gwangju', '5 Jungang-ro 123beon-gil', 'Gwangju', 'Gyeonggi-do', 'South Korea', 37.4104022, 127.2572926, '10thplanet_gwangju', NULL, NULL, 'Fourth 10p location near the Seoul capital');

INSERT INTO reviews (rating, comment, gym_id) VALUES 
(5, 'Best no gi bjj gym in South Korea', 1), (4, 'Friendly atmosphere and had many fun rolls', 2), (5, 'The instructor is very good', 2);