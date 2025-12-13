import { menuArray as menu} from "./data.js";

const menuContainer = document.getElementById('menu-container')



function renderFooter(){
    
}


function renderMenu (menuFull){
    menuFull.forEach(function(dish){
        menuContainer.innerHTML += `
        <div class="menu-item">
            <div class="dish-emoji">${dish.emoji}</div>

            <div class="dish-info">
                <h3 class="dish-name">${dish.name}</h3>
                <div class="dish-ingredients">${dish.ingredients}</div>
                <div class="dish-price bold">$${dish.price}</div>
            </div>

            <button class="add-dish">+</button>
        </div>`
    })
}

renderMenu(menu)