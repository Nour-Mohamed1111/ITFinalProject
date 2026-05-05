const btn = document.querySelector(".nav .left button");
const search = document.querySelector(".search");

btn.addEventListener("click", () => {
    search.classList.toggle("active");
});

search.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
        const value = search.value.trim();
        if (value !== "") {
        window.location.href = `results.html?keywords=${encodeURIComponent(value)}`;
    }
    }
});