import * as utils from "./utils.js";
import { fetchSearchRestaurantFoodByName } from './utils.js';

const restaurantName = document.querySelector("#restaurant-name");
const restaurantCover = document.querySelector("#restaurant-cover");
const restaurantContact = document.querySelector("#restaurant-phonenumbers");
const restaurantDescription = document.querySelector("#restaurant-description");

const itemsGrid = document.querySelector("#items-grid");
const itemsSearchBar = document.querySelector("#items-search-bar");
const itemsSearchButton = document.querySelector("#items-search-button");

const drinksButton = document.querySelector("#items-header-drinks");
const foodButton = document.querySelector("#items-header-food");

const restaurantId = window.location.pathname.split('/').pop();

const restaurantDetails = await utils.fetchRestaurantByID(restaurantId);
const restaurantPhonenumbers = await utils.fetchRestaurantContactsByID(restaurantId);
const foodDetails = await utils.fetchFoodByRestaurantID(restaurantId);
const drinkDetails = await utils.fetchDrinksByRestaurantID(restaurantId);

// Tells which section is currently displayed on the screen (food or drinks)
let isFoodSection = false;

console.log(foodDetails[0]);
console.log(drinkDetails[0]);

function createItem(id, name, price, imageLink) {
    const itemBox = document.createElement("div");
    const itemImage = document.createElement("img");
    const itemDescription = document.createElement("div");
    const itemName = document.createElement("p");
    const itemPrice = document.createElement("div");
    const itemPriceRS = document.createElement("p");
    const itemPriceContent = document.createElement("p");

    itemBox.id = id;

    itemBox.classList.add("item-box");
    itemImage.classList.add("item-image");
    itemDescription.classList.add("item-descrption");
    itemName.classList.add("item-name");
    itemPrice.classList.add("item-price");
    itemPriceRS.style.color = "#E28400";
    itemPriceContent.style.color = "Black";

    itemImage.src = imageLink;
    itemName.textContent = name;
    itemPriceRS.textContent = "Rs";
    itemPriceContent.textContent = price;

    itemBox.appendChild(itemImage);
    itemDescription.appendChild(itemName);
    itemPrice.appendChild(itemPriceRS);
    itemPrice.appendChild(itemPriceContent);
    itemDescription.appendChild(itemPrice);
    itemBox.appendChild(itemDescription);

    itemsGrid.appendChild(itemBox);
}

function createFoodItems() {
    itemsGrid.innerHTML = '';
    if (foodDetails && !isFoodSection) {
        for (let x of foodDetails) {
            createItem(x.id, x.name, x.price, x.image_Link);
        }
        isFoodSection = true;
    }
}

function createDrinkItems() {
    itemsGrid.innerHTML = '';
    if (drinkDetails && isFoodSection) {
        for (let x of drinkDetails) {
            createItem(x.id, x.name, x.price, x.image_Link);
        }
        isFoodSection = false;
    }
}

async function searchFoodItems() {
    const searchTerm = itemsSearchBar.value.trim();
    console.log(searchTerm);
    if (searchTerm !== '') {
        itemsGrid.innerHTML = '';
        let searchResults = await fetchSearchRestaurantFoodByName (restaurantId, searchTerm);
        if (searchResults) {
            for (let x of searchResults) {
                createItem(x.id, x.name, x.price, x.image_Link);
            }
        }
    }
}

function searchDrinkItems() {

}

foodButton.addEventListener("click", createFoodItems);
drinksButton.addEventListener("click", createDrinkItems);
itemsSearchButton.addEventListener("click", () => {
    if (isFoodSection)
        searchFoodItems();
    else 
        searchDrinkItems();
});

if (restaurantDetails) {
    let phonenumbers = "";
    restaurantName.textContent = restaurantDetails[0].name;
    restaurantCover.src = restaurantDetails[0].image_link;
    restaurantDescription.textContent = restaurantDetails[0].description;

    for (let x of restaurantPhonenumbers) {
        console.log(x.phonenumber);
        phonenumbers += x.phonenumber + "<br>";
    }
    restaurantContact.innerHTML = "<p>" + phonenumbers + "</p>";
}

createFoodItems();