INSERT INTO users (name, email, password)
VALUES ('Mackenzie', 'mackenzie.joyal@gmail.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.'),
('Kayleigh', 'kayleigh@gmail.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.'),
('JQ', 'jq@gmail.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.');

INSERT INTO properties (owner_id, title, description, thumbnail_photo_url, cover_photo_url,
cost_per_night, parking_spaces, number_of_bathrooms, number_of_bedrooms, 
country, street, city, province, post_code)
VALUES (1, 'downtown apartment', 'description for downtown apartment', 'thumbnail_photo_downtown_apartment','cover_photo_downtown_apartment', 99, 0, 1, 1, 'canada', 'fort', 'victoria', 'BC', 'v8w 1h8'),
(2, 'apartment near uvic', 'description for apartment near uvic', 'thumbnail_photo_uvic_apartment','cover_photo_uvic_apartment', 79, 1, 1, 2, 'canada', 'richmond', 'victoria', 'BC', 'v8w 1j5'),
(3, 'fernwood fairytale', 'description for fernwood fairytale', 'thumbnail_photo_fernwood','cover_photo_fernwood', 89, 1, 2, 3, 'canada', 'fernwood', 'victoria', 'BC', 'v8w 1p9'),
(3, 'brighton apartment', 'description for brighton apartment', 'thumbnail_photo_brighton_apartment','cover_photo_brighton_apartment', 99, 0, 1, 1, 'england', 'waterfront', 'brighton', 'unsure', '5Et78');

INSERT INTO reservations (start_date, end_date, property_id, guest_id)
VALUES ('2021-04-20', '2022-04-20', 4, 1),
('2021-05-04', '2022-05-20', 1, 2),
('2021-05-21', '2022-06-20', 3, 2);

INSERT INTO property_reviews (guest_id, property_id, reservation_id, rating, message) 
VALUES (1, 4, 1, 5, 'message for reservation 1'), 
(2, 1, 2, 3, 'message for reservation 2'), 
(2, 3, 3, 2, 'message for reservation 3');



