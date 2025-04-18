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

export async function fetchItems() {
    try {
        const response = await fetch(`/api/items`);
        const data = await response.json();
        return data.data;
    }
    catch (error) {
        console.error('Error fetching items:', error);
        return null;
    }    
}