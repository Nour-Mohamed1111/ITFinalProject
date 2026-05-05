let users = localStorage.getItem("users");
users = JSON.parse(users);

window.addEventListener("load", () => {
    if (users === null) return;

    let currentUser = users.find(user => user.remembered === true);

    if (currentUser.remembered) {
        window.location.href = "pages/home.html";
    }
});

let buttons = document.querySelectorAll(".okay");

for (let i = 0; i < buttons.length; i++) {
  buttons[i].onclick = function () {
    this.closest(".popup").style.display = "none";
  };
}

function login() {
  let email     = document.getElementById("loginid").value.toLowerCase();
  let password = document.getElementById("loginpassid").value.toLowerCase();
  let currentUser = false;
  let remembered = document.getElementById("remember").checked;

  if (email === "" || password === "") {
    document.getElementById("empty").style.display = "flex";
    return;
  }
  
  if (users === null) {
    document.getElementById("noname").style.display = "flex";
    return;
  }



  
  let found = false;

  for (let i = 0; i < users.length; i++) {

    if (users[i].email === email) {

      found = true;

      
      if (users[i].password === password) {

        document.getElementById("hi").style.display = "flex";

        users.forEach(user => {
            if (user.email === email) {
                user.current = true;
                user.remembered = remembered;
            } else {
                user.current = false;
            }
        });
        localStorage.setItem("users", JSON.stringify(users));

        setTimeout(function() {
          window.location.href = "/pages/home.html";
        }, 3000);

      } else {
        document.getElementById("wrongpass").style.display = "flex";
      }

      break;
    }
  }

  if (found === false) {
    document.getElementById("noname").style.display = "flex";
  }
}
