DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS properties CASCADE;
DROP TABLE IF EXISTS reservations CASCADE;
DROP TABLE IF EXISTS property_reviews CASCADE;

CREATE TABLE users (
  id SERIAL PRIMARY KEY, 
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  password VARCHAR(255) NOT NULL
);

CREATE TABLE properties (
  id SERIAL PRIMARY KEY,
  user_id INT REFERENCES users(id) ON DELETE CASCADE,

  title VARCHAR(255) NOT NULL,
  description TEXT, 
  thumbnail_photo_url VARCHAR(255),
  cover_photo_url VARCHAR(255),
  cost_per_night INT NOT NULL DEFAULT 0, 
  parking_spaces INT NOT NULL DEFAULT 0, 
  number_of_bathrooms INT NOT NULL DEFAULT 0, 
  number_of_bedrooms INT NOT NULL DEFAULT 0,

  country VARCHAR(255) NOT NULL,
  province VARCHAR(255) NOT NULL, 
  city VARCHAR(255) NOT NULL, 
  street VARCHAR(255) NOT NULL,
  postal_code VARCHAR(255) NOT NULL,

  is_active BOOLEAN NOT NULL DEFAULT TRUE
);

CREATE TABLE reservations (
  id SERIAL PRIMARY KEY,
  user_id INT REFERENCES users(id) ON DELETE CASCADE,
  property_id INT REFERENCES properties(id) ON DELETE CASCADE,

  start_date DATE,
  end_date DATE
);

CREATE TABLE property_reviews (
  id SERIAL PRIMARY KEY,
  user_id INT REFERENCES users(id) ON DELETE CASCADE,
  reservation_id INT REFERENCES reservations(id) ON DELETE CASCADE,

  rating SMALLINT NOT NULL DEFAULT 0,
  message TEXT
);