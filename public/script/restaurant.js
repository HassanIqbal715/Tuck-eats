import * as utils from "./utils.js";

const itemsGrid = document.querySelector("#items-grid");

const restaurantId = window.location.pathname.split('/').pop();
const restaurantDetails = await utils.fetchRestaurantByID(restaurantId);
const itemsDetails = await utils.fetchItems();
if (restaurantDetails) {

}

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
}