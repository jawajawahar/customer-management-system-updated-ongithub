 Customer Management System
A full-stack Customer Management System built using Spring Boot (Java 8) and React JS, with MariaDB as the database.
This system allows users to manage customers efficiently, including bulk operations using Excel files.
________________________________________


# Technologies Used
# Backend

 •	Java 8
 •	Spring Boot
 •	Spring Data JPA
 •	Maven
 •	JUnit

# Frontend
•	React JS (Vite)
•	Axios
•	Tailwind CSS

# Database
•	MariaDB

# Libraries (Free & Stable)
•	Lombok
•	FastExcel (for Excel processing)
•	Apache PO

# Third-Party Libraries
# The following third-party libraries are used

Spring Boot Starter Web
Spring Boot Starter Data JPA
Spring Boot Validation
MariaDB Java Client
Lombok (1.18.30)
FastExcel Reader (0.15.7) → Excel processing
Apache POI (5.2.3) → Excel support
Axios → API calls
Lucide React → Icons
React Hot Toast → Notifications

________________________________________

# Java version error
   Ensure Java 17 is installed
# Check:
   java -version

# Prerequisites

# Make sure you have the following installed:

Java 17+
Maven (or use the included Maven Wrapper mvnw)
MySQL / MariaDB
IDE (Recommended: IntelliJ IDEA)

# Clone the Repository

git clone https://github.com/jawajawahar/customer-management-backend.git
cd customer-management-backend

# Build the Project

# Using Maven Wrapper:

./mvnw clean install

# On Windows:

mvnw clean install

# application.properties file data

spring.application.name=customer-management-backend

# ===============================
# DATABASE CONFIGURATION
# ===============================
spring.datasource.url=jdbc:mariadb://localhost:3307/customer_management
spring.datasource.username=root
spring.datasource.password=your DB password
spring.datasource.driver-class-name=org.mariadb.jdbc.Driver

# ===============================
# JPA / HIBERNATE CONFIG
# ===============================
spring.jpa.hibernate.ddl-auto=update
spring.jpa.properties.hibernate.dialect=org.hibernate.dialect.MariaDBDialect
spring.jpa.show-sql=true

# ===============================
# SERVER CONFIG (optional)
# ===============================
server.port=8080
________________________________________


 Features
Customer Management

•	Create customer
•	Update customer
•	View customer
•	Delete customer
•	List customers (table view)
 Search
•	Search by Name
•	Search by NIC
Additional Data
•	Multiple mobile numbers
•	Multiple addresses
Family Members
•	A customer can have multiple family members (linked customers)
Bulk Operations
•	Bulk customer creation via Excel
•	Bulk customer update via Excel
•	Handles large datasets efficiently
Master Data
•	City and Country stored in database
•	Not exposed in UI (as required)

________________________________________

 Frontend Setup
Navigate to frontend folder:
cd frontend
Install dependencies:
npm install
Run frontend:
npm run dev
Frontend will start on:
http://localhost:5173
________________________________________

Bulk Upload Format

Location:
sample-excel/bulk_template.xlsx
Format:
Name	NIC	DOB
John Silva	123456789V	1995-05-10
Rules:
•	NIC must be unique
•	DOB format: YYYY-MM-DD
•	First row must be header
________________________________________

Testing
•	JUnit is used for backend testing
•	APIs tested using frontend and Postman
________________________________________

Performance Consideration
•	Batch processing used for bulk operations
•	Avoids memory overflow
•	Supports large Excel files (up to 1M records)
________________________________________

Notes
•	Only free and stable libraries are used
•	Clean architecture with DTO pattern
•	Minimal database calls implemented
________________________________________

Author
Shaheed Mohammed Jawahar
________________________________________
GitHub Repository:
https://github.com/jawajawahar/customer-management-system.git

