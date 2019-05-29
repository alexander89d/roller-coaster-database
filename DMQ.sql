-- Select all roller coasters in the database
SELECT c.id, c.name, p.name AS park, m.name AS manufacturer, c.year_opened, c.height, c.max_speed, c.in_operation
FROM rcdb_coaster c LEFT JOIN rcdb_park p ON c.park = p.id LEFT JOIN rcdb_manufacturer m ON c.manufacturer = m.id ORDER BY c.name ASC

-- Insert a new roller coaster with all fields
INSERT INTO rcdb_coaster (name, park, manufacturer, year_opened, height, max_speed, in_operation)
VALUES (@name, @park, @manufacturer, @year_opened, @height, @max_speed, @in_operation);

-- Insert a new roller coaster with all fields except park
INSERT INTO rcdb_coaster (name, manufacturer, year_opened, height, max_speed, in_operation)
VALUES (@name, @manufacturer, @year_opened, @height, @max_speed, @in_operation);

-- Search by roller coaster name
SELECT c.id, c.name, p.name AS park, m.name AS manufacturer, c.year_opened, c.height, c.max_speed, c.in_operation
FROM rcdb_coaster c LEFT JOIN rcdb_park p ON c.park = p.id LEFT JOIN rcdb_manufacturer m ON c.manufacturer = m.id 
WHERE name = @name
ORDER BY c.name ASC;

-- Search by roller coaster id (used for prefilling edit form data) --
SELECT * FROM rcdb_coaster
WHERE id = @id;

-- Update a roller coaster
UPDATE rcdb_coaster
SET name = @name, park = @park, manufacturer = @manufacturer, year_opened = @year_opened, height = @height, 
max_speed = @max_speed, in_operation = @in_operation
WHERE id = @id;

-- Delete a coaster using its id
DELETE FROM rcdb_coaster
WHERE id = @id


-- Select all features in the database
SELECT * FROM rcdb_features;

-- Insert a new feature
INSERT INTO rcdb_features (name)
VALUES (@name);




-- Select all manufacturers in the database
SELECT * FROM rcdb_manufacturer ORDER BY name ASC;

-- Get the names and id's of all manufacturers in the database
SELECT name, id FROM rcdb_manufacturer;

-- Insert a new manufacturer
INSERT INTO rcdb_manufacturer (name, city, state_province, country)
VALUES (@name, @city, @state_province, @country);





-- Select all parks in the database
SELECT P.id, P.name, P.city, P.state_province, P.country, PO.name AS owner FROM rcdb_park P INNER JOIN rcdb_park_owner PO ON PO.id = P.owner ORDER BY P.name ASC;

-- Get the names and id's of all parks in the database
SELECT name, id from rcdb_park;

-- Delete a park using its id
DELETE FROM rcdb_park
WHERE id = @id;

-- Insert a new park
INSERT INTO rcdb_park (name, city, state_province, country, owner)
VALUES (@name, @city, @state_province, @country, @owner);





-- Select all owners in the database
SELECT * FROM rcdb_park_owner ORDER BY name ASC;

-- Get the names and id's of all of the owners in the database
SELECT name, id FROM rcdb_park_owner ORDER BY name ASC;

-- Insert a new owner
INSERT INTO rcdb_park_owner (name, city, state_province, country)
VALUES (@name, @city, @state_province, @country);





-- View all features for a given roller coaster using the roller coaster id as @id
SELECT F.name, F.id from rcdb_features F
INNER JOIN rcdb_coaster_features CF ON CF.fid = F.id
WHERE CF.cid = @id;

-- View all features that are not on a given roller coaster using 
-- roller coaster id as @id
SELECT F.name, F.id from rcdb_features F
WHERE F.id NOT IN 
(
SELECT F.id from rcdb_features F
INNER JOIN rcdb_coaster_features CF ON CF.fid = F.id
WHERE CF.cid = @id
);

-- Delete a row from rcdb_coaster_features table using coaster id of @cid and
-- feature id of @fid
DELETE FROM rcdb_coaster_features
WHERE 
rcdb_coaster_features.cid = @cid AND rcdb_coaster_features.fid = @fid;

-- Insert a row into rcdb_coaster_features table if it does not already exist.
-- Make sure that the row does not exist before using this statement
INSERT INTO rcdb_coaster_features (cid, fid)
VALUES (@cid, @fid);

-- Get information from the database for a particular roller 
-- coaster, based off the roller coaster's ID
SELECT c.name, p.name AS park, m.name AS manufacturer, c.year_opened, c.height, c.max_speed, c.in_operation FROM rcdb_coaster c LEFT JOIN rcdb_park p ON c.park = p.id LEFT JOIN rcdb_manufacturer m ON c.manufacturer = m.id WHERE c.id = @coaster_id



