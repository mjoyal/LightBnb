INSERT INTO users (name, email, password)
VALUES ('Mackenzie', 'mackenzie.joyal@gmail.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.'),
('Kayleigh', 'kayleigh@gmail.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.'),
('JQ', 'jq@gmail.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.');

INSERT INTO properties (user_id, title, description, thumbnail_photo_url, cover_photo_url,
cost_per_night, parking_spaces, number_of_bathrooms, number_of_bedrooms, 
country, province, city, street, postal_code)
VALUES (1, 'downtown apartment', 'description for downtown apartment', 'thumbnail_photo_downtown_apartment','cover_photo_downtown_apartment', 99, 0, 1, 1, 'canada', 'BC', 'victoria', 'fort', 'v8w 1h8'),
(2, 'apartment near uvic', 'description for apartment near uvic', 'thumbnail_photo_uvic_apartment','cover_photo_uvic_apartment', 79, 1, 1, 2, 'canada', 'BC', 'victoria', 'richmond', 'v8w 1j5'),
(3, 'fernwood fairytale', 'description for fernwood fairytale', 'thumbnail_photo_fernwood','cover_photo_fernwood', 89, 1, 2, 3, 'canada', 'BC', 'victoria', 'fernwood', 'v8w 1p9'),
(3, 'brighton apartment', 'description for brighton apartment', 'thumbnail_photo_brighton_apartment','cover_photo_brighton_apartment', 99, 0, 1, 1, 'england', 'unsure', 'brighton', 'waterfront', '5Et78');

INSERT INTO reservations (user_id, property_id, start_date, end_date)
VALUES (1, 4, '2021-04-20', '2022-04-20'),
(2, 1, '2021-05-04', '2022-05-20'),
(2, 3, '2021-05-21', '2022-06-20');

INSERT INTO property_reviews (user_id, reservation_id, rating, message) 
VALUES (1, 1, 5, 'message for reservation 1'), 
(2, 2, 3, 'message for reservation 2'), 
(2, 3, 2, 'message for reservation 3');



