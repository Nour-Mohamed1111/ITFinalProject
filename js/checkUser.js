window.addEventListener("load", () => {
    let users = JSON.parse(localStorage.getItem("users")) || [];
    let currentUser = users.find(user => user.current === true);
    if(!currentUser){
        window.location.href = "../index.html";
    }
});