let users = JSON.parse(localStorage.getItem("users")) || [];
let currentUser = users.find(user => user.current === true);

window.addEventListener("DOMContentLoaded", () => {
    document.getElementById("profile-name").value = currentUser.name;
    document.getElementById("profile-email").value = currentUser.email;
    document.getElementById("profile-password").value = currentUser.password;
    document.getElementById("profile-dob").value = currentUser.birthday;
});

const logoutBtn = document.querySelector(".btn-sec");
if(logoutBtn){
    logoutBtn.addEventListener("click", (e) => {
    e.preventDefault();
    if (currentUser) {
        currentUser.current = false;
        currentUser.remembered = false;
    }
    localStorage.setItem("users", JSON.stringify(users));
    window.location.href = "../index.html";
});

}

const saveBtn = document.querySelector(".btn-save");

if (saveBtn) {
    saveBtn.addEventListener("click", (e) => {
        e.preventDefault();

        if (!currentUser) return;

        let name = document.getElementById("profile-name").value.trim();
        let email = document.getElementById("profile-email").value.trim();
        let password = document.getElementById("profile-password").value.trim();
        let birthday = document.getElementById("profile-dob").value.trim();

        currentUser.name = name;
        currentUser.email = email;
        currentUser.password = password;
        currentUser.birthday = birthday;

        localStorage.setItem("users", JSON.stringify(users));

        window.location.href = "profile.html";
    });
}


const cancelBtn = document.querySelector(".btn-cancel");

if (cancelBtn) {
    cancelBtn.addEventListener("click", (e) => {
        e.preventDefault();
        window.location.href = "profile.html";
    });
}
