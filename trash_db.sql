DROP DATABASE IF EXISTS trash_db;
CREATE DATABASE trash_db OWNER PGAdmin;

DROP TABLE cans IF EXISTS;
CREATE TABLE cans OWNER PGAdmin (
    id SERIAL PRIMARY KEY,
    loc_x INT,
    loc_y INT,
    floor_number INT,
    building VARCHAR(32),
    room_number VARCHAR(32),
    created_at TIMESTAMP DEFAULT NOW()
);

DROP TABLE trash_data IF EXISTS;
CREATE TABLE trash_data OWNER PGAdmin (
    sensor_id INT,
    transaction_id SERIAL,
    PRIMARY KEY (sensor_id, transaction_id),
    
    created_at TIMESTAMP,
    value INT,
    depth INT,
    battery_level INT,
    signal_strength INT,

    FOREIGN KEY (sensor_id) REFERENCES cans(id) ON DELETE CASCADE
    );
