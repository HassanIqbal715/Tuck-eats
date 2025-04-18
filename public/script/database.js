const {Client} = require('pg');

let client;

function connectClient() {
    client = new Client({
        host: 'localhost',
        user: 'postgres',
        port: 5432,
        password: 'astolfo123',
        database: 'ERD_1'
    });

    client.connect();
}

function getRestaurantByID(id, callback) {
    const query = `SELECT * FROM Restaurant WHERE ID = $1`;
    client.query(query, [id], (err, res) => {
        if (err) {
            callback(err, null);
        } else {
            callback(null, res.rows);
        }
    })
}

function getRestaurant(callback) {
    client.query('SELECT * FROM Restaurant', (err, res) => {
        if (err) {
            callback(err, null);
        } else {
            callback(null, res.rows);
        }
    })    
}

function getItems(callback) {
    client.query('SELECT * FROM Item', (err, res) => {
        if (err) {
            callback(err, null);
        } else {
            callback(null, res.rows);
        }
    })    
}

process.on('SIGINT', async () => {
    console.log("shutting down...");
    await client.end();
    console.log("Disconnected from database");
    process.exit(0);
});

module.exports = { 
    connectClient, 
    getRestaurantByID,
    getRestaurant,
    getItems
};