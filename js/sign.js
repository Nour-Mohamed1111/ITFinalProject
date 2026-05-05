let buttons = document.querySelectorAll(".okay");

for (let i = 0; i < buttons.length; i++) {
  buttons[i].onclick = function () {
    this.closest(".popup").style.display = "none";
  };
}

function signup() {

  let name     = document.getElementById("signid").value.toLowerCase();
  let password = document.getElementById("signpassid").value.toLowerCase();
  let email    = document.getElementById("signemail").value.toLowerCase();
  let birthday = document.getElementById("signbday").value.toLowerCase();

  if (name === "" || password === "" || email === "" || birthday === "") {
    document.getElementById("cotcom").style.display = "flex";
    return;
  }

  let users = localStorage.getItem("users");

  if (users === null) {
    users = [];
  } else {
    users = JSON.parse(users);
  }

  let nameExists = false;

  for (let i = 0; i < users.length; i++) {
    if (users[i].email === email) {
      nameExists = true;
    }
  }

  if (nameExists) {
    document.getElementById("samename").style.display = "flex";
    return;
  }

  let newUser = {
    name: name,
    password: password,
    email: email,
    birthday: birthday,
    remembered:false,
    current:true,
    darkMood:false,
    posts: {
        liked: [],
        disliked: []
    },
    favAnimals: []
  };

  users.push(newUser);

  localStorage.setItem("users", JSON.stringify(users));

  document.getElementById("done").style.display = "flex";

  setTimeout(function() {
    window.location.href = "home.html";
  }, 3000);
}