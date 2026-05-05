let animals = [];

// 🔹 users logic
let users = JSON.parse(localStorage.getItem("users")) || [];
let currentUser = users.find(user => user.current === true);


if (currentUser && !currentUser.favAnimals) {
    currentUser.favAnimals = [];
}

let favAnimals = currentUser ? currentUser.favAnimals : [];
let currentFilter = null;

fetch("../data.json")
    .then(res => res.json())
    .then(data => {
        animals = data.animals;

        // empty page logic
        if (favAnimals.length === 0) {
            const topContainer = document.querySelector(".top");
            const mainBox = document.querySelector(".mainBox");
            const cards = document.querySelector(".cards");

            topContainer.innerHTML = `
                <h2>لا يوجد حيوان مفضل حتى الأن!</h2>
                <a href="explore.html">تعرف على الحيوانات المتاحه <i class="fas fa-external-link-alt"></i></a>
            `;

            mainBox.style.cssText = `
                display: flex;
                align-items: center;
                justify-content: space-between;
            `;

            if (cards) cards.remove();
            return;
        }

        // inject the animal cards
        renderAnimals();

        // drop down logic
        dropdown();
    });


// 🔥 render function
function renderAnimals(filterType = null) {
    const cardsContainer = document.querySelector(".cards");
    if (!cardsContainer) return;

    cardsContainer.innerHTML = "";

    animals.forEach(animal => {
        currentFilter = filterType;

        // filter
        if (filterType && animal.type !== filterType && animal.family !== filterType) return;

        const isFav = favAnimals.includes(animal.id);

        if (isFav) {
            const card = `
            <div class="card" data-id="${animal.id}">
                <img src="${animal.image.url}" alt="${animal.image.alt}">
                ${animal.isDangerous ? `
                <div class="danger">
                    <i class="fa-solid fa-triangle-exclamation"></i>
                </div>` : ``}
                <div class="content">
                    <span class="type">${animal.family}</span>
                    <span class="region">البلد الأم : ${animal.originCountry}</span>
                    <h3>${animal.name}</h3>
                    <p>${animal.shortDescription}</p>
                    <div class="btns">
                        <a href="animalDetails.html?id=${animal.id}">المزيد من التفاصيل <i class="fas fa-external-link-alt"></i></a>
                        <button class="favIcon">
                            <i class="${isFav ? "fa-solid" : "fa-regular"} fa-heart"></i>
                        </button>
                    </div>
                </div>
            </div>
            `;
            cardsContainer.innerHTML += card;
        }
    });

    // 🔥 fav button logic
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

            // 🔥 تحديث داخل اليوزر
            currentUser.favAnimals = favAnimals;
            localStorage.setItem("users", JSON.stringify(users));
        });
    });
}


// 🔥 dropdown
function dropdown() {
    const select = document.getElementById("animal-select");
    if (!select) return;

    select.innerHTML = `<option value="">اختر النوع </option>`;

    const familyList = [];

    animals.forEach(animal => {
        const isFav = favAnimals.includes(animal.id);

        if (!familyList.includes(animal.family) && isFav) {
            familyList.push(animal.family);
        }
    });

    for (let family of familyList) {
        const familyRow = `<option value="${family}">${family}</option>`;
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


// 🔥 view mode (grid / list)
let gridBtn = document.getElementById("gridBtn");
let listBtn = document.getElementById("listBtn");
let cards = document.querySelector(".cards");

if (gridBtn && listBtn && cards) {
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
}