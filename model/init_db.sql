SET foreign_key_checks = 0;
DROP TABLE IF EXISTS gyms;
DROP TABLE IF EXISTS reviews;
SET foreign_key_checks = 1;

CREATE TABLE gyms (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    address VARCHAR(255) NOT NULL,
    city VARCHAR(100) NOT NULL,
    province_state VARCHAR(100),
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
('10th Planet Korea', '1324 Seongnam-daero Sujeong-gu', 'Seongnam', 'Gyeonggi-do', 'South Korea', 37.4480918, 127.1271269, '10thplanet_korea', NULL, NULL, 'First 10p gym in Korea'), ('10th Planet New Seoul', '133-24 Jegi-dong Dongdaemun-gu', 'Seoul', 'Gyeonggi-do', 'South Korea', 37.5847318, 127.0351956, '10thplanet_newseoul', NULL, NULL, 'Only 10p location in Seoul'), ('10th Planet Suwon', '25-5 Manseok-ro 19beon-gil Jangan-gu', 'Suwon', 'Gyeonggi-do', 'South Korea', 37.296206, 126.9830505, '10thplanet_suwon', NULL, NULL, 'Third 10p location near the Seoul capital'), ('10th Planet Gwangju', '5 Jungang-ro 123beon-gil', 'Gwangju', 'Gyeonggi-do', 'South Korea', 37.4104022, 127.2572926, '10thplanet_gwangju', NULL, NULL, 'Fourth 10p location near the Seoul capital'). ('Team Shark Saigon BJJ', '03 Thái Thuận, Thảo Điền, Quận 2', 'Ho Chi Minh City', NULL, 'Vietnam', 10.7981594, 106.7373379, 'bjj_teamsharksaigon', NULL, NULL, 'Korean owned Gi/NoGi gym in Saigon'), ('Over/Under Submission Grappling', '94-96 Nguyễn Văn Thương, Phường 25, Bình Thạnh', 'Ho Chi Minh City', NULL, 'Vietnam', 10.8021215,106.7193631, 'overunderbjj', NULL, NULL, 'High Level NoGi only gym in Saigon'), ('Arkain Grappling', '1177 Huỳnh Tấn Phát, Phú Mỹ, Quận 7, Thành phố Hồ', 'Ho Chi Minh City', NULL, 'Vietnam', 10.7230157, 106.7360169, 'arkaingrappling', NULL, NULL, 'Foreign owned Gi/NoGi gym in Saigon'), ('10th Planet Barcelona', 'Carrer de Sant Pere Màrtir, 37, Gràcia', 'Barcelona', NULL, 'Spain', 41.3997635, ,2.1568332, '10thplanetbarcelona', 'https://10pbcn.com/', NULL, 'Only 10p gym in Spain'), ('NRFight Club Tolbiac', '185 Rue de Tolbiac', 'Paris', NULL, 'France', 48.8257527, 2.3517923, 'nrfightclub', 'https://nrfight.com/', NULL, 'One possible place to train NoGi in Paris'), ('NRFight Club Olympiades', '33 Rue des Terres au Curé', 'Paris', NULL, 'France', 48.8249305, 2.3717464, 'nrfightclub', 'https://nrfight.com/', NULL, 'One possible place to train NoGi in Paris'), ('NRFight Club Dugommier', '20 Rue Dugommier', 'Paris', NULL, 'France', 48.8399301, 2.3917179, 'nrfightclub', 'https://nrfight.com/', NULL, 'One possible place to train NoGi in Paris');

INSERT INTO reviews (rating, comment, gym_id) VALUES 
(5, 'Best no gi bjj gym in South Korea', 1), (4, 'Friendly atmosphere and had many fun rolls', 2), (5, 'The instructor is very good', 2);