CREATE DATABASE game;

CREATE TABLE gameUsers(
    user_id SERIAL PRIMARY KEY,
    user_name VARCHAR(255),
    user_points int
); 