import { menuArray as menu} from "./data.js";

const menuContainer = document.getElementById('menu-container')
const orderContainer = document.getElementById('order-container')
const orderArr = []
const paymentForm = document.getElementById('payment-form')
const payBtn = document.getElementById('pay-btn')

document.addEventListener('click',function(e){
    if(e.target.dataset.add){
        renderFooter(e.target.dataset.add)
    }
    else if(e.target.dataset.remove){
        handleRemove(e.target.dataset.remove)
    }
    else if(e.target.dataset.completeOrder){
        document.getElementById("modal").classList.remove("hidden")
    }
})

paymentForm.addEventListener('input', function(){
    const formData = new FormData(paymentForm)
    
    const name = formData.get('fullName') 
    const card = formData.get('ccNumber') 
    const cvv = formData.get('cvv')      


    if(name && card && cvv){
        payBtn.disabled = false 
        payBtn.classList.remove('disabled-style') 
    } else {
        payBtn.disabled = true 
        payBtn.classList.add('disabled-style')   
    }

})

paymentForm.addEventListener('submit', function(e){
    e.preventDefault()
    const paymentFormData = new FormData(paymentForm)
    const name = paymentFormData.get('fullName')
    orderCompleted(name)
})

function renderFooter(dishId){
    if(dishId){
        const currentDish = menu.filter(function(dish){
            return Number(dishId) === dish.id
        })[0]
    
        if(currentDish){
            orderArr.push(currentDish)
        }
    }   
    // console.log(orderArr)
    let orderHtml = ''
    let totalPrice = 0
    orderHtml += `<div class="your-order">Your order</div>`
    orderArr.forEach(function(order){
        orderHtml += `
        <div class="order-item">
            <div>${order.name}</div>
            <button class="remove-item" data-remove="${order.id}">remove</button>
            <div class="order-price bold">$${order.price}</div>
        </div>`
        totalPrice += order.price
    })
    orderHtml += `
    <div class="price-sum">
        <div>Total Price</div>
        <div class="order-price bold">$${totalPrice}</div>
    </div>
    <button class="complete-order-btn" data-complete-order="btn">Complete order</button>`  
    orderContainer.innerHTML = orderHtml
}

function handleRemove(dishId){
    const targetInd = orderArr.findIndex(function(dish){
        return Number(dishId) === dish.id
    })

    if (targetInd >= 0){
        orderArr.splice(targetInd, 1)
    }

    renderFooter()
}

function orderCompleted(customerName){
    document.getElementById("modal").classList.add("hidden")
    orderContainer.innerHTML= `
    <div class="order-complete">Thanks, ${customerName}! Your order is on its way! </div>`
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

            <button class="add-dish" id="add-dish-btn" data-add="${dish.id}">+</button>
        </div>`
    })
}

renderMenu(menu)