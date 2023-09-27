CREATE DATABASE fuzzfeedpets;

-- Remember to connect to the database before creating tables
-- \c fuzzfeedpets

CREATE TABLE pets (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL,
    pet_name TEXT,
    pet_breed TEXT,
    image_url TEXT,
    pet_coat TEXT,
    pet_weight TEXT,
    pet_description TEXT,
);

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    email TEXT,
    password_digest TEXT
);

-- Check that tables have been created 
-- \dt - display tables
-- seed some initial records

INSERT INTO fuzzfeedpets (user_id, pet_name, pet_breed, image_url, pet_coat, pet_weight, pet_description)
VALUES ('1', 'Winston', 'Maine Coon Cat', 'https://encrypted-tbn1.gstatic.com/licensed-image?q=tbn:ANd9GcRGpY1lyPCgzIEpOxl20Iz5TodXA8Tuga1v2jWfa77O3kJX6ZtUv1vrTpAxam2il0SwXN2l_Bz0CdXcjDY', 'Marbled tabby', '13.9kg', 'Winston is my baby and I love him!')