CREATE TABLE IF NOT EXISTS courses (
    id bigint(5) NOT NULL AUTO_INCREMENT, 
    title varchar(255) NOT NULL,
    tutor varchar(255) NOT NULL,
    PRIMARY KEY (id)
);