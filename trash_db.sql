
CREATE TABLE trash.cans(
    id SERIAL PRIMARY KEY,
    loc_x INT,
    loc_y INT,
    floor_number INT,
    building VARCHAR(32),
    room_number VARCHAR(32),
    created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE trash.data(
    sensor_id INT,
    transaction_id SERIAL,
    PRIMARY KEY (sensor_id, transaction_id),
    created_at TIMESTAMP DEFAULT NOW(),
    value INT,
    depth INT,
    percent_full NUMERIC GENERATED ALWAYS AS ((depth - value)::NUMERIC  / (depth+1)) STORED,
    battery_level INT,
    signal_strength INT,
    FOREIGN KEY (sensor_id) REFERENCES trash.cans(id) ON DELETE CASCADE
    );
    
INSERT INTO trash.cans (loc_x, loc_y, floor_number, building, room_number) 
SELECT 
    (random() * 200)::INT AS loc_x, 
    (random() * 200)::INT AS loc_y, 
    (floor(random() * 5) + 1) AS floor_number, 
    (ARRAY['SB', 'HH', 'NH', 'HL', 'SC'])[floor(random() * 5) + 1] AS building, 
    (floor(random() * 300) + 100)::TEXT AS room_number
FROM generate_series(1, 100);

INSERT INTO trash.data (sensor_id, value, depth, battery_level, signal_strength) 
SELECT
	((random() * 99)::INT+1) AS sensor_id,
	(random() * 30)::INT AS value,
	((random() * 70)+30)::INT AS depth,
	(random() * 100)::INT AS battery_level,
	(random() * 100)::INT AS signal_strength
FROM generate_series(1,100);


select * from trash.cans;
select * from trash.data;
