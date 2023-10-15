const mainBlock = document.querySelector("main.items");

// Показывем корзину при нажатии на кнопку
function showCart() {
    const shopBlock = document.querySelector(".shop-cart-block");
    
    // Если класса нет - добавляется, если есть - удаляется
    // т.о. показываем/скрываем корзину
    shopBlock.classList.toggle("active");
    console.log(shopBlock);
    // shopBlock.animate

    // Если корзина открыта, то
    if (shopBlock.classList.contains("active"))
        mainBlock.style.width = "60%";
    else
        mainBlock.style.width = "90%";
}

items.forEach((item) => {
    mainBlock.innerHTML += `<div class="item">
            <img src="./img/${item.img}" alt="" >
            <h4>${item.name} - $ ${item.price}</h4>
            <p>${item.desc}</p>
            <div class="add-to-cart" onclick="addToCart(${item.id})"><i class="fa-solid fa-cart-plus"></i></div>
        </div>`;
})

// Массив с добаленными товарами
let shopCart = [];
if (localStorage.getItem("shopCart") != undefined) {
    shopCart = JSON.parse(localStorage.getItem("shopCart"));
    showCart();
    updateShopCart();
}

// Добавление товаров из списка в корзину
function addToCart(id) {
    let itemInCart = shopCart.find((item) => item.id == id);
    // Проверяем, есть ли уже такой эл-т в корзине
    if (itemInCart) {
        // если есть, то увеличиваем количество
        changeCountItems('+', id)
    } else {
        // если нет товара, то добавляем
        // Ищем элемент, у которого id совпадает с id, полученным, как аргумент ф.
        let item = items.find((item) => item.id == id);
        shopCart.push({
            ...item,
            count: 1
        });
    }
    console.log(shopCart);
    // Вывод элементов внутри корзины
    updateShopCart();
}


function updateShopCart() {
    const shopCartItems = document.querySelector("#shop-cart");
    shopCartItems.innerHTML = ""; // Очищаем список товаров корзине

    let elementCount = 0, totalPrice = 0; // Счетчик купленных товаров
    shopCart.forEach((element) => {
        shopCartItems.innerHTML += `<div class="shop-item">
                <div class="info">
                    <img src="./img/${element.img}" alt="${element.name}">
                    <span class="title">${element.name}</span>
                </div>
                <div class="price">$ ${element.price}</div>
                <div class="count">
                    <button class="minus" onclick="changeCountItems('-', ${element.id})"> - </button>
                    <span>${element.count}</span>
                    <button class="plus" onclick="changeCountItems('+', ${element.id})"> + </button>
                </div>
            </div>`;
        // Увеличиваем общий счетчик при добавлении любого
        elementCount += element.count;
        totalPrice += element.price * element.count;
    });

    // 2-й способ форматирования числа
    let formatCurr = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD'
    });

    document.querySelector("#count-items").textContent = elementCount;
    // totalPrice.toFixed(2) - округление ( 2 знака после запятой)
    document.querySelector(".go-shop b").textContent = formatCurr.format(totalPrice);

    // Сохраняем в локальное хранилище
    // JSON.stringify(shopCart) - преобразуем обект в строку
    localStorage.setItem("shopCart", JSON.stringify(shopCart));
}

// Обработка счетчика (кнопок + -)
function changeCountItems(action, id) {
    let item = shopCart.find((item) => item.id == id);
    if (action == '-' && item.count > 1) {
        item.count--;
    } else if (action == '+' && item.count < item.leftItems) {
        item.count++;
    } else if (action == '-' && item.count == 1) {
        // если кол-во товаров 0 (1 и нажали '-')
        // удаляем (показываем все без этого эл-та)
        shopCart = shopCart.filter((item) => item.id != id);;
    }
    updateShopCart();
}