const mysql = require('mysql');

const connection = mysql.createConnection({
    host: "localhost",   // Change if your MySQL is hosted elsewhere
    user: "root",        // Your MySQL username
    password: "9373048440",        // Your MySQL password (leave blank if none)
    database: 'medicine_reminder' //databse name is comment
});

connection.connect((err) => {
    if (err) {
        console.error('Error connecting to MySQL:', err);
        return;
    }
    console.log('Connected to database.');
});
module.exports = connection;
