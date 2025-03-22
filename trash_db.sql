DROP DATABASE IF EXISTS trash_db;
CREATE DATABASE trash_db;

CREATE SCHEMA trash;

DROP TABLE trash.cans IF EXISTS;
CREATE TABLE trash.cans(
    id SERIAL PRIMARY KEY,
    loc_x INT,
    loc_y INT,
    floor_number INT,
    building VARCHAR(32),
    room_number VARCHAR(32),
    created_at TIMESTAMP DEFAULT NOW()
);

DROP TABLE trash.data IF EXISTS;
CREATE TABLE trash.data(
    sensor_id INT,
    transaction_id SERIAL,
    PRIMARY KEY (sensor_id, transaction_id),
    
    created_at TIMESTAMP,
    value INT,
    depth INT,
    battery_level INT,
    signal_strength INT,

    FOREIGN KEY (sensor_id) REFERENCES trash.cans(id) ON DELETE CASCADE
    );
