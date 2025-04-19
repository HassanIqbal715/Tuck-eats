export async function fetchRestaurantByID(id) {
    try {
        const response = await fetch(`/api/restaurant/${id}`);
        const data = await response.json();
        return data.data;
    }
    catch (error) {
        console.error('Error fetching restaurant data:', error);
        return null;
    }
}

export async function fetchRestaurantContactsByID(id) {
    try {
        const response = await fetch(`/api/restaurant-contacts/${id}`);
        const data = await response.json();
        return data.data;
    }
    catch (error) {
        console.error('Error fetching restaurant phonenumbers:', error);
        return null;
    }
}

export async function fetchFoodByRestaurantID(id) {
    try {
        const response = await fetch(`/api/items/food/${id}`);
        const data = await response.json();
        return data.data;
    }
    catch (error) {
        console.error('Error fetching food:', error);
        return null;
    }    
}

export async function fetchDrinksByRestaurantID(id) {
    try {
        const response = await fetch(`/api/items/drinks/${id}`);
        const data = await response.json();
        return data.data;
    }
    catch (error) {
        console.error('Error fetching drinks:', error);
        return null;
    }    
}

export async function fetchSearchRestaurantFoodByName(id, name) {
    try {
        const response = await fetch(`/api/items/food/${id}?search=${encodeURIComponent(name)}`);
        const data = await response.json();
        return data.data;
    }
    catch (error) {
        console.error('Error fetching food:', error);
        return null;
    }    
}