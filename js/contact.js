let form = document.querySelector("form");
let submitBtn = document.querySelector(".submitBtn");

form.addEventListener("submit", (e) => {
    e.preventDefault();

    submitBtn.style.background = "green";
    submitBtn.value = "تم ارسال الرساله بنجاح";
});