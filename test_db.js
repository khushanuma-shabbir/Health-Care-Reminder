const mysql = require('mysql');

const connection = mysql.createConnection({
    host: 'localhost',   // Your MySQL host
    user: 'root',        // Your MySQL username
    password: '9373048440',  // Your updated MySQL root password
    database: 'medicine_reminder'  // Your database name
});

connection.connect((err) => {
    if (err) {
        console.error('Database connection failed:', err);
        return;
    }
    console.log('Connected to MySQL database!');
});

connection.end();
