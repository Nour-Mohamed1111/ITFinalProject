const params = new URLSearchParams(window.location.search);
const searchValue = params.get("keywords");

let animals = [];
let users = JSON.parse(localStorage.getItem("users")) || [];
let currentUser = users.find(user => user.current === true);

let favAnimals = currentUser.favAnimals || [];
let currentFilter = null;

fetch("../data.json")
    .then(res => res.json())
    .then(data => {
        animals = data.animals.filter(animal => 
        animal.name.toLowerCase().includes(searchValue.toLowerCase()) ||
        animal.family.toLowerCase().includes(searchValue.toLowerCase()) ||
        animal.type.toLowerCase().includes(searchValue.toLowerCase()) ||
        animal.originCountry.toLowerCase().includes(searchValue.toLowerCase())
        );
        // inject the animal cards
        renderAnimals();
        // inject categories
        renderCategories();
    })

function renderAnimals(filterType = null){
    if (animals.length === 0 || !searchValue) {
    document.querySelector(".cards").innerHTML = `<h2>عذراً, لم نجد اي عنصر مشابهاً</h2>`;
    return;
    }
    currentFilter = filterType;
    const cardsContainer = document.querySelector(".cards");
    cardsContainer.innerHTML = "";

    animals.forEach(animal => {
        // filteration
        if (filterType && animal.type !== filterType && animal.family !== filterType) return;

        const isFav = favAnimals.includes(animal.id);

        const card = `
            <div class="card" data-id="${animal.id}">
                <img src="${animal.image.url}" alt="${animal.image.alt}">
                ${animal.isDangerous ? `
                <div class="danger">
                    <i class="fa-solid fa-triangle-exclamation"></i>
                </div>
                ` : ``}
                <div class="content">
                    <span class="type">${animal.family}</span>
                    <span class="region">البلد الأم : ${animal.originCountry}</span>
                    <h3>${animal.name}</h3>
                    <p>${animal.shortDescription}</p>
                    <div class="btns">
                        <a href="animalDetails.html?id=${animal.id}">المزيد من التفاصيل <i class="fas fa-external-link-alt"></i></a>
                        <button class="favIcon">
                            ${
                                isFav
                                    ? `<i class="fa-solid fa-heart"></i>`
                                    : `<i class="fa-regular fa-heart"></i>`
                            }
                        </button>
                    </div>
                </div>
            </div>
        `;
        cardsContainer.innerHTML += card;
    });

    // btn logic
    const favBtns = document.querySelectorAll(".favIcon");

    favBtns.forEach(btn => {
        btn.addEventListener("click", () => {
            const card = btn.closest(".card");
            const id = Number(card.dataset.id);
            const icon = btn.querySelector("i");
            if (favAnimals.includes(id)) {
                favAnimals = favAnimals.filter(item => item !== id);
                icon.classList.remove("fa-solid");
                icon.classList.add("fa-regular");
            } else {
                favAnimals.push(id);
                icon.classList.remove("fa-regular");
                icon.classList.add("fa-solid");
            }
            currentUser.favAnimals = favAnimals;
            localStorage.setItem("users", JSON.stringify(users));
        });
    });
}

function renderCategories() {
    const catgContainer = document.querySelector(".catg");
    catgContainer.innerHTML = "";

    const typeCount = {};
    let totalCount = 0;
    
    animals.forEach(animal => {
        totalCount++;
        
        if (typeCount[animal.family]) {
            typeCount[animal.family]++;
        } else {
            typeCount[animal.family] = 1;
        }
    });
    
    catgContainer.innerHTML += `
        <div class="catgHeader">
            <i class="fa-solid fa-paw"></i>
            <h3>الفئات</h3>
        </div>
        <div class="types">
            <button onclick='renderAnimals(null)'>عرض الكل</button>
            <span>${totalCount}</span>
        </div>
    `;

    for (let type in typeCount) {
        const catgRow = `
            <div class="types">
                <button class="catgBtn" onclick='renderAnimals("${type}")'>${type}</button>
                <span>${typeCount[type]}</span>
            </div>
        `;
        catgContainer.innerHTML += catgRow;
    }
}

// list btn logic
let gridBtn = document.getElementById("gridBtn");
let listBtn = document.getElementById("listBtn");
let cards = document.querySelector(".cards");

gridBtn.onclick = function () {
    cards.classList.remove("list");
    gridBtn.classList.add("active");
    listBtn.classList.remove("active");
};

listBtn.onclick = function () {
    cards.classList.add("list");
    listBtn.classList.add("active");
    gridBtn.classList.remove("active");
};
