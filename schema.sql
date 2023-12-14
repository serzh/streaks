CREATE TABLE IF NOT EXISTS streaks (
    id VARCHAR(36) NOT NULL PRIMARY KEY,
    timestamp TIMESTAMP WITH TIME ZONE NOT NULL,
    step INT NOT NULL,
    score INT NOT NULL
);

CREATE INDEX IF NOT EXISTS streaks_timestamp_idx ON streaks using btree (timestamp);