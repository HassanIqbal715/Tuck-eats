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

// Restaurant functions
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

function getRestaurantContactsByID(id, callback) {
    const query = `SELECT phonenumber FROM Restaurant_phonenumber WHERE ID = $1`;
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

function getFoodByRestaurantID(id, callback) {
    const query = `SELECT Item.ID, name, cuisine_type, item_type, size_type, 
                    price, restaurant_ID, image_link
                FROM Food INNER JOIN Item 
                ON Food.ID = Item.ID 
                WHERE Restaurant_ID = $1;
`
    client.query(query, [id], (err, res) => {
        if (err) {
            callback(err, null);
        } else {
            callback(null, res.rows);
        }
    })    
}

function getDrinksByRestaurantID(id, callback) {
    const query = `SELECT Item.ID, name, item_type, size, price, restaurant_id, 
                    image_link 
                FROM Drink INNER JOIN Item 
                ON Drink.ID = Item.ID 
                WHERE Restaurant_ID = $1;`
    client.query(query, [id], (err, res) => {
        if (err) {
            callback(err, null);
        } else {
            callback(null, res.rows);
        }
    })    
}

function searchRestaurantFoodByName(id, name, callback) {
    const query = `
        SELECT Item.ID, name, cuisine_type, item_type, size_type, 
        price, restaurant_ID, image_link
        FROM Food INNER JOIN Item 
        ON Food.ID = Item.ID 
        WHERE Restaurant_ID = $1 AND name ILIKE $2;
    `;

    const params = [id, `%${name}%`];

    client.query(query, params, (err, res) => {
        if (err) {
            callback(err, null);
        } else {
            callback(null, res.rows);
        }
    });    
}

// Login functions
function getAdminEmailAndPassword(callback) {
    const query = `SELECT pass, email FROM Administrator`;
    client.query(query, (err, res) => {
        if (err) {
            callback(err, null);
        } else {
            callback(null, res.rows);
        }
    })
}

function getUserEmailAndPassword(callback) {
    const query = `SELECT pass, email FROM Customer`;
    client.query(query, (err, res) => {
        if (err) {
            callback(err, null);
        } else {
            callback(null, res.rows);
        }
    })
}

function getUserData(callback) {
    const query = `SELECT * FROM Customer`;
    client.query(query, (err, res) => {
        if (err) {
            callback(err, null);
        } else {
            callback(null, res.rows);
        }
    })
}

function getUserCount(callback) {
    const query = `SELECT count(*) AS total_users FROM Customer`;
    client.query(query, (err, res) => {
        if (err) {
            callback(err, null);
        } else {
            const count = res.rows[0].total_users;
            callback(null, count);
        }
    })
}

async function insertUser(values) {
    const query = `INSERT INTO Customer (ID, username, fname, lname, 
        date_of_birth, email, pass) 
        VALUES ($1, $2, $3, $4, $5, $6, $7);`;
    const valuesArray = [
        values.id,
        values.username,
        values.fname,
        values.lname,
        values.date_of_birth,
        values.email,
        values.password
    ];
    const result = await client.query(query, valuesArray);
    return result;
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
    getRestaurantContactsByID,
    getRestaurant,
    getFoodByRestaurantID,
    getDrinksByRestaurantID,
    searchRestaurantFoodByName,
    getAdminEmailAndPassword,
    getUserEmailAndPassword,
    getUserData,
    getUserCount,
    insertUser
};