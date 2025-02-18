# NoGi BJJ Gym Finder

A full-stack web application to help practitioners find NoGi Brazilian Jiu-Jitsu gyms around the world. Built with React, Node.js, Express, and MySQL.

## Features

- 🔍 Search gyms by city or province/state
- 📍 Detailed gym information including location, drop-in fees, and social media links
- ⭐ Review system with ratings and comments
- 📱 Responsive design for mobile and desktop
- 🌐 Social media integration (Instagram and website links)

## Tech Stack

### Frontend
- React
- Tailwind CSS for styling
- Lucide React for icons

### Backend
- Node.js
- Express.js
- MySQL database

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- MySQL
- npm or yarn

### Installation

1. Clone the repository
```bash
git clone [your-repo-url]
cd nogi-bjj-gym-finder
```

2. Install dependencies
```bash
# Install backend dependencies
npm install

# Install frontend dependencies
cd client
npm install
```

3. Set up the database
```bash
# Create database and tables
mysql -u [username] -p [database_name] < model/init_db.sql
```

4. Create a .env file in the root directory with your database configuration:
```
DB_HOST=localhost
DB_USER=your_username
DB_PASS=your_password
DB_NAME=your_database_name
```

5. Start the development servers
```bash
# Start backend server (from root directory)
npm start

# Start frontend development server (from client directory)
cd client
npm start
```

The application should now be running on `http://localhost:5173`

## Database Schema

### Gyms Table
```sql
CREATE TABLE gyms (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    address VARCHAR(255) NOT NULL,
    city VARCHAR(100) NOT NULL,
    province_state VARCHAR(100) NOT NULL,
    country VARCHAR(100) NOT NULL,
    latitude DECIMAL(10,8),
    longitude DECIMAL(11,8),
    instagram VARCHAR(100),
    website VARCHAR(255),
    drop_in_fee VARCHAR(100),
    description TEXT
);
```

### Reviews Table
```sql
CREATE TABLE reviews (
    id INT AUTO_INCREMENT PRIMARY KEY,
    rating INT NOT NULL CHECK (rating >= 1 AND rating <= 5),
    comment TEXT,
    gym_id INT NOT NULL,
    FOREIGN KEY (gym_id) REFERENCES gyms(id) ON DELETE CASCADE
);
```

## API Endpoints

### Gyms

|
 Method 
|
 Endpoint 
|
 Description 
|
|
--------
|
----------
|
-------------
|
|
 GET 
|
 /api/gyms 
|
 Get all gyms 
|
|
 GET 
|
 /api/gyms/:id 
|
 Get gym by ID 
|
|
 GET 
|
 /api/gyms/city/:city 
|
 Get gyms by city 
|
|
 GET 
|
 /api/gyms/province_state/:province_state 
|
 Get gyms by province/state 
|
|
 POST 
|
 /api/gyms 
|
 Create new gym 
|
|
 PUT 
|
 /api/gyms/:id 
|
 Update gym 
|
|
 DELETE 
|
 /api/gyms/:id 
|
 Delete gym 
|

### Reviews

|
 Method 
|
 Endpoint 
|
 Description 
|
|
--------
|
----------
|
-------------
|
|
 GET 
|
 /api/reviews/:gym_id 
|
 Get all reviews for a gym 
|
|
 POST 
|
 /api/reviews/gym/:gym_id 
|
 Create new review 
|
|
 PUT 
|
 /api/reviews/:id 
|
 Update review 
|
|
 DELETE 
|
 /api/reviews/:id 
|
 Delete review 
|

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## Acknowledgments

- All the NoGi BJJ gyms that provided their information
- The BJJ community for their support and feedback
- CodeOp