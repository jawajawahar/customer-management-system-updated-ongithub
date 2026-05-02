CREATE TABLE country (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL UNIQUE
);

CREATE TABLE city (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    country_id BIGINT,
    FOREIGN KEY (country_id) REFERENCES country(id)
);

CREATE TABLE customer (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    nic VARCHAR(20) NOT NULL UNIQUE,
    dob DATE NOT NULL
);

CREATE TABLE customer_mobiles (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    customer_id BIGINT NOT NULL,
    mobile_number VARCHAR(20),
    FOREIGN KEY (customer_id) REFERENCES customer(id) ON DELETE CASCADE
);

CREATE TABLE address (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    address_line1 VARCHAR(255) NOT NULL,
    address_line2 VARCHAR(255),
    city_id BIGINT,
    country_id BIGINT,
    customer_id BIGINT,
    FOREIGN KEY (city_id) REFERENCES city(id),
    FOREIGN KEY (country_id) REFERENCES country(id),
    FOREIGN KEY (customer_id) REFERENCES customer(id) ON DELETE CASCADE
);

CREATE TABLE customer_family (
    customer_id BIGINT NOT NULL,
    family_member_id BIGINT NOT NULL,
    PRIMARY KEY (customer_id, family_member_id),
    FOREIGN KEY (customer_id) REFERENCES customer(id) ON DELETE CASCADE,
    FOREIGN KEY (family_member_id) REFERENCES customer(id) ON DELETE CASCADE
);