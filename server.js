const express = require('express');
const path = require('path');
const app = express();
const { connectClient, getRestaurantByID, getItems } = require('./public/script/database.js');

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

app.get('/api/items/', (req, res) =>{
    getItems(id, (err, data) => {
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