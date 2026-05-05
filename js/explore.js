let animals = [];
let users = JSON.parse(localStorage.getItem("users")) || [];
let currentUser = users.find(user => user.current === true);

let favAnimals = currentUser.favAnimals || [];
let currentFilter = null;

fetch("../data.json")
    .then(res => res.json())
    .then(data => {
        animals = data.animals;
        // inject the animal cards
        renderAnimals();
        // inject favbar
        renderFavAnimals();
        // inject categories
        renderCategories();
})

function renderAnimals(filterType = null){

    const cardsContainer = document.querySelector(".cards");
    cardsContainer.innerHTML = "";
    
    animals.forEach(animal => {
        // filteration
        currentFilter = filterType;
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
                    <div class="animalContent">
                        <span class="type">${animal.family}</span>
                        <span class="region">البلد الأم : ${animal.originCountry}</span>
                        <h3>${animal.name}</h3>
                        <p>${animal.shortDescription}</p>
                    </div>
                    
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
            renderFavAnimals(currentFilter);
        });
    });
}
function renderFavAnimals(){
    const favContainer = document.querySelector(".lovedAnimals");
    if (favAnimals.length === 0){
            favContainer.innerHTML= `<h3>لا يوجد حيوان مفضل حتى الأن!</h3>`
    }else{
        favContainer.innerHTML="";
        favContainer.innerHTML +=`
                                <div class="lovedAnimalsHeader">
                                    <i class="fa-solid fa-heart"></i>
                                    <h3>الحيوانات المفضله</h3>
                                </div>
                                `;
        animals.forEach(animal => {
        if(favAnimals.includes(animal.id)){
            const favRow = `
            <div class="row" data-id="${animal.id}">
                <div class="content">
                    <img src="${animal.image.url}" alt="${animal.image.alt}">
                    <p>${animal.name}</p>
                </div>
                <button class="favBarBtn"><i class="fa-solid fa-heart"></i></button>
            </div>
            `;
            favContainer.innerHTML += favRow;
        }
        });
        favContainer.innerHTML +=`<a href="favourite.html">الأنتقال الى المفضله</a>`;
    }
    //Btn logic
    const favBarBtns = document.querySelectorAll(".favBarBtn");
    favBarBtns.forEach(btn => {
        btn.addEventListener("click", () => {
            const row = btn.closest(".row");
            const id = Number(row.dataset.id);

            favAnimals = favAnimals.filter(item => item !== id);

            currentUser.favAnimals = favAnimals;
            localStorage.setItem("users", JSON.stringify(users));

            renderFavAnimals();
            renderAnimals(currentFilter);
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
        
        if (typeCount[animal.type]) {
            typeCount[animal.type]++;
        } else {
            typeCount[animal.type] = 1;
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

    const catgBtns = document.querySelectorAll(".catgBtn");
    catgBtns.forEach(btn => {
        btn.addEventListener("click", () => {
        select.value = "";
    });
    });

    // drop down 
    const select = document.getElementById("animal-select");
    select.innerHTML="";
    select.innerHTML+= `<option value="">اختر النوع </option>`;

    const familyList = [];

    animals.forEach(animal => {
        if (!familyList.includes(animal.family)) {
        familyList.push(animal.family);
    }
    });

    for (let family of familyList) {
        const familyRow =`<option value="${family}">${family}</option>`;
        select.innerHTML += familyRow;
    }
    
    select.addEventListener("change", () => {
        const selectedType = select.value;

        if (selectedType === "") {
            renderAnimals(null); 
        } else {
            renderAnimals(selectedType);
        }
    });
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

