-- Select all roller coasters in the database
SELECT * from rcdb_coaster;

-- Insert a new roller coaster with all fields
INSERT INTO rcdb_coaster (name, park, manufacturer, year_opened, height, max_speed, in_operation)
VALUES (@name, @park, @manufacturer, @year_opened, @height, @max_speed, @in_operation);

-- Insert a new roller coaster with all fields except park
INSERT INTO rcdb_coaster (name, manufacturer, year_opened, height, max_speed, in_operation)
VALUES (@name, @manufacturer, @year_opened, @height, @max_speed, @in_operation);

-- Search by roller coaster name
SELECT * FROM rcdb_coaster
WHERE name = '@name';

-- Update a roller coaster
UPDATE rcdb_coaster
SET name = @name, park = @park, manufacturer = @manufacturer, year_opened = @year_opened, height = @height, 
max_speed = @max_speed, in_operation = @in_operation
WHERE id = @id;




-- Select all features in the database
SELECT * from rcdb_features;

-- Insert a new feature
INSERT INTO rcdb_features (name)
VALUES (@name);




-- Select all manufacturers in the database
SELECT * from rcdb_manufacturer;

-- Get the names and id's of all manufacturers in the database
SELECT name, id FROM rcdb_manufacturer;

-- Insert a new manufacturer
INSERT INTO rcdb_manufacturer (name, city, state_province, country)
VALUES (@name, @city, @state_province, @country);





-- Select all parks in the database
SELECT * from rcdb_park;

-- Get the names and id's of all parks in the database
SELECT name, id from rcdb_park;

-- Delete a park using its id
DELETE FROM rcdb_park
WHERE id = @id

-- Insert a new park
INSERT INTO rcdb_park (name, city, state_province, country, owner)
VALUES (@name, @city, @state_province, @country, @owner);





-- Select all owners in the database
SELECT * from rcdb_park_owner;

-- Get the names and id's of all of the owners in the database
SELECT name, id from rcdb_park_owner;

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


-- Test to see if a row exists in the rcdb_coaster_features table given
-- a coaster id of @cid, and a feature id of @fid; will return 1 if the row exists in the table
-- and 0 if it does not exist in the table
SELECT COUNT(1)
FROM rcdb_coaster_features
WHERE rcdb_coaster_features.cid = @cid AND rcdb_coaster_features.fid = @fid;


-- Insert a row into rcdb_coaster_features table if it does not already exist.
-- Make sure that the row does not exist before using this statement
INSERT INTO rcdb_coaster_features (cid, fid)
Values (@11, @8);















