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
  return pool.query(`
  SELECT *
  FROM properties
  LIMIT $1
  `, [limit])
  .then(res => res.rows);
};
exports.getAllProperties = getAllProperties;

// Get a single user from the database given their email.

const getUserWithEmail = function(email) {
  return pool.query(
    `SELECT *
     FROM USERS
     WHERE users.email = $1
     `, [email])
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






/// Reservations

// /**
//  * Get all reservations for a single user.
//  * @param {string} guest_id The id of the user.
//  * @return {Promise<[{}]>} A promise to the reservations.
//  */
// const getAllReservations = function(guest_id, limit = 10) {
//   return getAllProperties(null, 2);
// }
// exports.getAllReservations = getAllReservations;


/**
 * Add a property to the database
 * @param {{}} property An object containing all of the property details.
 * @return {Promise<{}>} A promise to the property.
 */
const addProperty = function(property) {
  const propertyId = Object.keys(properties).length + 1;
  property.id = propertyId;
  properties[propertyId] = property;
  return Promise.resolve(property);
}
exports.addProperty = addProperty;
