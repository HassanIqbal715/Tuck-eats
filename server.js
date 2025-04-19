const express = require('express');
const path = require('path');
const app = express();
const { connectClient, 
    getRestaurantByID, 
    getFoodByRestaurantID,
    getDrinksByRestaurantID,
    getRestaurantContactsByID,
    searchRestaurantFoodByName
} = require('./public/script/database.js');

app.use(express.static(path.join(__dirname, 'public')));

app.get('/api/restaurant/:id', (req, res) =>{
    const id = req.params.id;
    getRestaurantByID(id, (err, data) => {
        if (err) {
            return res.status(500).json({ message: 'Failed to get restaurant data' });
        }
        res.json({ data });       
    })
});

app.get('/api/restaurant-contacts/:id', (req, res) =>{
    const id = req.params.id;
    getRestaurantContactsByID(id, (err, data) => {
        if (err) {
            return res.status(500).json({ 
                message: 'Failed to get restaurant phonenumbers' 
            });
        }
        res.json({ data });       
    })
});

app.get('/api/items/food/:id', (req, res) =>{
    const id = req.params.id;
    const name = req.query.search;

    if (name) {
        searchRestaurantFoodByName(id, name, (err, data) => {
            if (err) {
                return res.status(500).json({ message: 'Failed to search items' });
            }
            res.json({ data });
        });
    } else {
        getFoodByRestaurantID(id, (err, data) => {
            if (err) {
                return res.status(500).json({ message: 'Failed to get items' });
            }
            res.json({ data });
        });
    }
});

app.get('/api/items/drinks/:id', (req, res) =>{
    const id = req.params.id;
    getDrinksByRestaurantID(id, (err, data) => {
        if (err) {
            return res.status(500).json({ message: 'Failed to get items' });
        }
        res.json({ data });       
    })
});

app.get('/', (req, res) =>{
    res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

app.get('/restaurant/:id', (req, res) => {
    const restaurantId = req.params.id;
    res.sendFile(path.join(__dirname, 'views', 'restaurant.html'));
});

const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
    connectClient();
});