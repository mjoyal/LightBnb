SELECT properties.*, reservations.*, avg(rating) as average_rating
FROM reservations
JOIN properties ON reservations.property_id = properties.id
JOIN property_reviews ON properties.id = property_reviews.property_id
WHERE reservations.guest_id =1
AND reservations.end_date < now()::date
GROUP BY properties.id, reservations.id
ORDER BY reservations.start_date
LIMIT 10; 








--        title       |   id    | start_date |  end_date  | property_id | guest_id |   average_rating   
-- -------------------+---------+------------+------------+-------------+----------+--------------------
--  Contain boat      | 1017016 | 2014-05-17 | 2014-05-31 |         931 |        1 | 4.1666666666666667
--  Already coal      | 1010127 | 2014-08-17 | 2014-09-14 |         209 |        1 | 3.7777777777777778
--  Bush central      | 1012625 | 2015-07-30 | 2015-08-15 |         994 |        1 | 4.2727272727272727
--  Middle government | 1013921 | 2016-05-11 | 2016-05-15 |         218 |        1 | 4.2857142857142857
--  Of tail           | 1010623 | 2016-07-08 | 2016-07-31 |         129 |        1 | 4.1666666666666667
--  Across tropical   | 1011691 | 2017-07-01 | 2017-07-23 |         276 |        1 | 3.8333333333333333
--  Aloud they        | 1015180 | 2019-07-23 | 2019-08-21 |         326 |        1 | 4.0000000000000000
--  Wonderful lay     | 1019776 | 2019-12-20 | 2020-01-09 |         443 |        1 | 4.4666666666666667