// const properties = require('./json/properties.json');
// const users = require('./json/users.json');

const { Pool } = require('pg');

const pool = new Pool({
  user: 'vagrant',
  password: '123',
  host: 'localhost',
  database: 'lightbnb'
});

/// Properties
const getAllProperties = function (options, limit = 10) {
 
  const queryParams = [];
  let queryString = `
  SELECT properties.*, avg(property_reviews.rating) as average_rating
  FROM properties
  LEFT JOIN property_reviews ON properties.id = property_id
  `;

  if(options.city) {
    const city = options.city; 
    queryParams.push(`%${city.charAt(0).toUpperCase() + city.slice(1)}%`);
    queryString += `WHERE city LIKE $${queryParams.length}`;
  }

  if(options.owner_id) {
    queryParams.push(`${options.owner_id}`);
    queryString += queryParams.length? `AND` : `WHERE`; 
    queryString += `owner_id = $${queryParams.length}`; 
  }

  if(options.minimum_price_per_night) {
    queryParams.push(`${options.minimum_price_per_night}`);
    queryString += queryParams.length? `AND` : `WHERE`; 
    queryString += `cost_per_night >= $${queryParams.length}`; 
  }

  if(options.maximum_price_per_night) {
    queryParams.push(`${options.maximum_price_per_night}`);
    queryString += queryParams.length? `AND` : `WHERE`; 
    queryString += `cost_per_night <= $${queryParams.length}`; 
  }
   
  if(options.minimum_rating) {
    queryParams.push(`${options.minimum_rating}`);
    queryString += queryParams.length? `AND` : `WHERE`; 
    queryString += `property_reviews.rating >= $${queryParams.length}`; 
  }

  queryParams.push(limit);
  queryString += `
  GROUP BY properties.id
  ORDER BY cost_per_night, average_rating
  LIMIT $${queryParams.length};
  `;

  return pool.query(queryString, queryParams)
  .then(res => res.rows);

};

exports.getAllProperties = getAllProperties;

// Get a single user from the database given their email.

const getUserWithEmail = function(email) {
  return pool.query(
    `SELECT *
     FROM USERS
     WHERE users.email = $1
     `, [email.toLowerCase()])
     .then(res => {
       let user = null; 
       if(res.rows.length) {
         user = res.rows[0];
       } return user; 
     });
};
exports.getUserWithEmail = getUserWithEmail;

const getUserWithId = function(id) {
  return pool.query(
    `SELECT *
     FROM USERS
     WHERE users.id = $1
     `, [id])
     .then(res => res.rows[0]);
};

exports.getUserWithId = getUserWithId;


const getAllReservations = function(guest_id, limit = 10) {
  console.log('getting reservations');
  return pool.query(`
  SELECT properties.*, reservations.*, avg(rating) as average_rating
  FROM reservations
  JOIN properties ON reservations.property_id = properties.id
  JOIN property_reviews ON properties.id = property_reviews.property_id
  WHERE reservations.guest_id = $1
  AND reservations.end_date < now()::date
  GROUP BY properties.id, reservations.id
  ORDER BY reservations.start_date
  LIMIT 10; 
  `, [guest_id])
    .then(res => res.rows);
};
exports.getAllReservations = getAllReservations;

const addUser =  function(user) {
  // const userId = Object.keys(users).length + 1;
  return pool.query(`
    INSERT INTO users (name, email, password)
    VALUES ($1, $2, $3)
    RETURNING *;
  `, [user.name, user.email, user.password])
    .then(res => res.rows[0]); 
}
exports.addUser = addUser;

/**
 * Add a property to the database
 * @param {{}} property An object containing all of the property details.
 * @return {Promise<{}>} A promise to the property.
 */


const addProperty = function(property) {
  return pool.query(`
  INSERT INTO properties (owner_id, title, description, thumbnail_photo_url, cover_photo_url,
    cost_per_night, parking_spaces, number_of_bathrooms, number_of_bedrooms, 
    country, street, city, province, post_code)
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14)
    RETURNING *;
  `, [property.owner_id, 
      property.title, 
      property.description, 
      property.thumbnail_photo_url, 
      property.cover_photo_url,
      property.cost_per_night,
      property.parking_spaces,
      property.number_of_bathrooms,
      property.number_of_bedrooms,
      property.country,
      property.street,
      property.city,
      property.province,
      property.post_code
    ])
    .then(res => res.rows[0])
};
exports.addProperty = addProperty;
