CREATE DATABASE IF NOT EXISTS chennai_transport
CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

USE chennai_transport;

CREATE TABLE IF NOT EXISTS transport (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    updated_date DATE,
    size VARCHAR(30),
    color VARCHAR(20) DEFAULT '#003DA5',
    background VARCHAR(30) DEFAULT '#EEF2FF',
    download_url VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS transport_files (
    id INT AUTO_INCREMENT PRIMARY KEY,
    transport_id INT NOT NULL,
    file_name VARCHAR(100) NOT NULL,
    CONSTRAINT fk_transport_files_transport
        FOREIGN KEY (transport_id) REFERENCES transport(id)
        ON DELETE CASCADE
);

-- Seed the three cards shown in the supplied screenshot.
INSERT INTO transport
(name, description, updated_date, size, color, background, download_url)
SELECT * FROM (
    SELECT
      'Chennai Metro (CMRL)',
      'Chennai Metro Rail Limited official schedules, station coordinates, and fare rules for Blue and Green lines.',
      '2026-02-02', '147 KB', '#003DA5', '#EEF2FF', NULL
    UNION ALL
    SELECT
      'Suburban Rail',
      'Southern Railways Suburban network data covering North, South, and West lines in the CMA.',
      '2026-02-02', '257 KB', '#990000', '#FFF0F0', NULL
    UNION ALL
    SELECT
      'MTC Bus',
      'Metropolitan Transport Corporation (Chennai) bus routes, stop locations, and trip frequencies.',
      '2026-02-02', '27.3 MB', '#FF8C00', '#FFF5E8', NULL
) AS seed
WHERE NOT EXISTS (SELECT 1 FROM transport);

-- Insert included file names for the seed records only when the table is empty.
INSERT INTO transport_files (transport_id, file_name)
SELECT t.id, f.file_name
FROM transport t
JOIN (
    SELECT 'Chennai Metro (CMRL)' AS transport_name, 'agency.txt' AS file_name UNION ALL
    SELECT 'Chennai Metro (CMRL)', 'calendar.txt' UNION ALL
    SELECT 'Chennai Metro (CMRL)', 'calendar_dates.txt' UNION ALL
    SELECT 'Chennai Metro (CMRL)', 'fare_attributes.txt' UNION ALL
    SELECT 'Chennai Metro (CMRL)', 'fare_rules.txt' UNION ALL
    SELECT 'Chennai Metro (CMRL)', 'frequencies.txt' UNION ALL
    SELECT 'Chennai Metro (CMRL)', 'routes.txt' UNION ALL
    SELECT 'Chennai Metro (CMRL)', 'shapes.txt' UNION ALL
    SELECT 'Chennai Metro (CMRL)', 'stop_times.txt' UNION ALL
    SELECT 'Chennai Metro (CMRL)', 'stops.txt' UNION ALL
    SELECT 'Chennai Metro (CMRL)', 'transfers.txt' UNION ALL
    SELECT 'Chennai Metro (CMRL)', 'trips.txt' UNION ALL
    SELECT 'Suburban Rail', 'agency.txt' UNION ALL
    SELECT 'Suburban Rail', 'calendar.txt' UNION ALL
    SELECT 'Suburban Rail', 'calendar_dates.txt' UNION ALL
    SELECT 'Suburban Rail', 'feed_info.txt' UNION ALL
    SELECT 'Suburban Rail', 'pathways.txt' UNION ALL
    SELECT 'Suburban Rail', 'routes.txt' UNION ALL
    SELECT 'Suburban Rail', 'stop_times.txt' UNION ALL
    SELECT 'Suburban Rail', 'stops.txt' UNION ALL
    SELECT 'Suburban Rail', 'trips.txt' UNION ALL
    SELECT 'Suburban Rail', 'GeoJSON files' UNION ALL
    SELECT 'MTC Bus', 'agency.txt' UNION ALL
    SELECT 'MTC Bus', 'calendar.txt' UNION ALL
    SELECT 'MTC Bus', 'frequencies.txt' UNION ALL
    SELECT 'MTC Bus', 'routes.txt' UNION ALL
    SELECT 'MTC Bus', 'stop_times.txt' UNION ALL
    SELECT 'MTC Bus', 'stops.txt' UNION ALL
    SELECT 'MTC Bus', 'trips.txt' UNION ALL
    SELECT 'MTC Bus', 'GeoJSON files'
) f ON f.transport_name = t.name
WHERE NOT EXISTS (
    SELECT 1 FROM transport_files tf WHERE tf.transport_id = t.id
);







USE chennai_transport;

CREATE TABLE IF NOT EXISTS stations (
    id INT AUTO_INCREMENT PRIMARY KEY,
    transport_id INT NOT NULL,
    station_name VARCHAR(150) NOT NULL,
    latitude DECIMAL(10,7) NOT NULL,
    longitude DECIMAL(10,7) NOT NULL,

    FOREIGN KEY (transport_id)
    REFERENCES transport(id)
    ON DELETE CASCADE
);


INSERT INTO stations
(transport_id, station_name, latitude, longitude)
VALUES
(1, 'Chennai Central Metro', 13.0827, 80.2756),
(1, 'Egmore Metro', 13.0780, 80.2610),
(1, 'Airport Metro', 12.9800, 80.1642);



CREATE TABLE IF NOT EXISTS routes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    transport_id INT NOT NULL,
    route_name VARCHAR(150) NOT NULL,
    route_color VARCHAR(20),

    FOREIGN KEY (transport_id)
    REFERENCES transport(id)
    ON DELETE CASCADE
);



INSERT INTO routes
(transport_id, route_name, route_color)
VALUES
(1, 'Blue Line', '#003DA5'),
(1, 'Green Line', '#16A34A'),
(2, 'Suburban Rail', '#990000');



CREATE TABLE IF NOT EXISTS route_stations (
    id INT AUTO_INCREMENT PRIMARY KEY,
    route_id INT NOT NULL,
    station_id INT NOT NULL,
    stop_order INT NOT NULL,

    FOREIGN KEY (route_id)
    REFERENCES routes(id)
    ON DELETE CASCADE,

    FOREIGN KEY (station_id)
    REFERENCES stations(id)
    ON DELETE CASCADE,

    UNIQUE (route_id, station_id),
    UNIQUE (route_id, stop_order)
);



