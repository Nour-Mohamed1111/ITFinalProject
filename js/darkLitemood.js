const toggle = document.getElementById("themeToggle");

window.addEventListener("DOMContentLoaded", () => {
    let users = JSON.parse(localStorage.getItem("users")) || [];
    let currentUser = users.find(user => user.current === true);

    if (currentUser && currentUser.darkMood) {
        document.body.classList.add("dark");
        toggle.classList.add("active");

        const icon = toggle.querySelector("i");
        icon.classList.remove("fa-moon");
        icon.classList.add("fa-bolt");
    }
});

toggle.addEventListener("click", () => {
    let users = JSON.parse(localStorage.getItem("users")) || [];
    let currentUser = users.find(user => user.current === true);
    
    document.body.classList.toggle("dark");
    toggle.classList.toggle("active");

    const icon = toggle.querySelector("i");

    if (toggle.classList.contains("active")) {
        icon.classList.remove("fa-moon");
        icon.classList.add("fa-bolt"); 
    } else {
        icon.classList.remove("fa-bolt");
        icon.classList.add("fa-moon");
    }

    currentUser.darkMood = !currentUser.darkMood;

    localStorage.setItem("users", JSON.stringify(users));
});

