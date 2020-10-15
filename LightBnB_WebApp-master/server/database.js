// const properties = require('./json/properties.json');
// const users = require('./json/users.json');

const { Pool } = require('pg');

const pool = new Pool({
  user: 'vagrant',
  password: '123',
  host: 'localhost',
  database: 'lightbnb'
});

// const propertyHelper = (param_length, option, queryString) {
//    const queryParams = []; 
//    let newString = queryString;
//     if(param_length) {
//       queryParams.push(`${minimum_price_per_night}`);
//       queryString += `AND cost_per_night >= $${queryParams.length}`;
//     } else {
//       queryParams.push(`${minimum_price_per_night}`);
//       queryString += `WHERE cost_per_night >= $${queryParams.length}`;
//     }
//     return queryParams;
// }

/// Properties
const getAllProperties = function (options, limit = 70) {
  console.log(options);
  const queryParams = [];
  let queryString = `
  SELECT properties.*, avg(property_reviews.rating) as average_rating
  FROM properties
  JOIN property_reviews ON properties.id = property_id
  `;

  if(options.city) {
    const city = options.city; 
    queryParams.push(`%${city.charAt(0).toUpperCase() + city.slice(1)}%`);
    queryString += `WHERE city LIKE $${queryParams.length}`;
  }

  if(options.owner_id) {
    const owner = options.owner_id;
    if(queryParams.length) {
      queryParams.push(`${owner}`);
      queryString += ` AND owner_id = $${queryParams.length}`;
    } else {
      queryParams.push(`${owner}`);
      queryString += `WHERE owner_id = $${queryParams.length}`;
    }
  }

  if(options.minimum_price_per_night) {
    const minPrice = options.minimum_price_per_night;
    if(queryParams.length) {
      queryParams.push(`${minPrice}`);
      queryString += ` AND cost_per_night >= $${queryParams.length}`;
    } else {
      queryParams.push(`${minPrice}`);
      queryString += `WHERE cost_per_night >= $${queryParams.length}`;
    }
  }
  if(options.maximum_price_per_night) {
    const maxPrice = options.maximum_price_per_night;
    if(queryParams.length) {
      queryParams.push(`${maxPrice}`);
      queryString += ` AND cost_per_night <= $${queryParams.length}`;
    } else {
      queryParams.push(`${maxPrice}`);
      queryString += `WHERE cost_per_night <= $${queryParams.length}`;
    }
  }

  if(options.minimum_rating) {
    const minRating = options.minimum_rating;
    queryParams.push(`${minRating}`);
    let string = queryParams.length ? `AND` : `WHERE`; 
    string += `property_reviews.rating >= $${queryParams.length}`; 
  }
   
  queryParams.push(limit);
  queryString += `
  GROUP BY properties.id
  ORDER BY cost_per_night
  LIMIT $${queryParams.length};
  `;

  return pool.query(queryString, queryParams)
  .then(res => res.rows);

};

exports.getAllProperties = getAllProperties;

// const getAllProperties = function (options, limit = 10) {
//   return pool.query(`
//   SELECT *
//   FROM properties
//   LIMIT $1
//   `, [limit])
//   .then(res => res.rows);
// };
// exports.getAllProperties = getAllProperties;









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
