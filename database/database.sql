USE stockdam; --use 'stockdam' database

-- 
CREATE TABLE users (
	id INT AUTO_INCREMENT PRIMARY KEY,                 -- unique ID for each user account
    username VARCHAR(50) NOT NULL,                     -- username, required
    email VARCHAR(100) UNIQUE NOT NULL,                -- email, must be required
    password_hash VARCHAR(255) NOT NULL,               -- encrypted password for security
    role ENUM('student', 'admin') DEFAULT 'student',   -- user role: 'student' or 'admin'
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP     -- automatic creation timestamp
);

CREATE TABLE culture_facts (
	id INT AUTO_INCREMENT PRIMARY KEY,                 -- unique ID for each fact
    city VARCHAR(50) NOT NULL,                         -- city name, required
    fact TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);