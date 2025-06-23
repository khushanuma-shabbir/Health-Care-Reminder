const mysql = require('mysql2');

// Create a connection to the database
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '9373048440', // Add your password if you have one
    database: 'medicines_reminder'
});

// Connect to MySQL
connection.connect((err) => {
    if (err) {
        console.error('❌ Connection failed:', err);
        return;
    }
    console.log('✅ Connected to MySQL database!');
    
    // Replace 'your_table_name' with the actual name of your table
    const query = 'SELECT * FROM medicines'; // Assuming 'medicines' is your table
    connection.query(query, (err, results) => {
        if (err) {
            console.error('❌ Error executing query:', err);
        } else {
            console.log('✅ Query results:', results);
        }
        connection.end(); // Close the connection after the query
    });
});
