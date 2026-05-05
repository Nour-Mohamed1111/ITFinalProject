const params = new URLSearchParams(window.location.search);
const id = Number(params.get("id"));

let animals = [];
let favAnimals = JSON.parse(localStorage.getItem("favAnimals")) || [];

fetch("../data.json")
    .then(res => res.json())
    .then(data => {
        animals = data.animals;
        const animal = animals.find(a => a.id === id);
        //inject content
        renderContent(animal);
    });

function renderContent(animal){
    document.title = animal.name;

    const container = document.querySelector(".container");
    container.innerHTML = "";
    const isFav = favAnimals.includes(animal.id);
    const content = `
                <div class="top details">
            <div class="imgcontainer">
                <img src="${animal.image.url}"alt="${animal.image.alt}">
            </div>
            <div class="animalDetails">
                <h2>${animal.name}</h2>
                <span class="type">${animal.type}</span>
                <span class="region">البلد الأم : ${animal.originCountry}</span>
                <p>${animal.longDescription}</p>
                <table>
                    <tr>
                        <th>المعلومة</th>
                        <th>القيمة</th>
                    </tr>
                    <tr>
                        <td>الحالة</td>
                        <td> ${animal.state}</td>
                    </tr>
                    <tr>
                        <td>متوسط العمر</td>
                        <td>${animal.lifespan}</td>
                    </tr>
                    <tr>
                        <td>الوزن</td>
                        <td>${animal.weight}</td>
                    </tr>
                    <tr>
                        <td>السرعه</td>
                        <td>${animal.speed}</td>
                    </tr>
                </table>
                <div class="btns">
                    <button class="favbtn">
                            ${
                                isFav
                                    ? ` ازاله من المفضله<i class="fa-regular fa-heart"></i>`
                                    : ` اضافه الى المفضله <i class="fa-regular fa-heart"></i>`
                            }
                    </button>
                    <a href="#">تلاقيه فين ؟ <i class="fas fa-external-link-alt"></i></a>
                </div>
            </div>
        </div>
        <div class="bottom">
            <h2>مقتطفات وثائقية 🎞️</h2>
            <iframe src="${animal.iframeVideoUrl}" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
        </div>
    `;
    container.innerHTML += content;
    
    //fav Button Logic
    const favbtn = document.querySelector(".favbtn");

    favbtn.addEventListener("click", () => {
        if (favAnimals.includes(id)) {
                favAnimals = favAnimals.filter(item => item !== id);
                favbtn.innerHTML = ` اضافه الى المفضله <i class="fa-regular fa-heart"></i>`
            } else {
                favAnimals.push(id);
                favbtn.innerHTML = ` ازاله من المفضله<i class="fa-regular fa-heart"></i>`
            }
            localStorage.setItem("favAnimals", JSON.stringify(favAnimals));
    });
};
