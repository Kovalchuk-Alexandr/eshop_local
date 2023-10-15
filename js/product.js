let projectId = localStorage.getItem('projectId');

const item = items[projectId];

// выводим конкретный товар на странице
const mainBlock = document.querySelector("main.items");

mainBlock.innerHTML += `<div class="item">
                <img src="./img/${item.img}" alt="" >
                <h4>${item.name} - $ ${item.price}</h4>
                <p>${item.desc}</p>
                <p>There are ${item.leftItems} items left</p>
            </div>`;
