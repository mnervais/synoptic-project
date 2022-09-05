CREATE DATABASE demo;

CREATE EXTENSION postgis;

CREATE TABLE events (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    date DATE NOT NULL,
    time TIME NOT NULL,  
    description VARCHAR(1000) NOT NULL,
    contact VARCHAR(255) NOT NULL,
    geog geography(point) NOT NULL
);


