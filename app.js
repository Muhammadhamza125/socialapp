function logIn() {
    var email = document.getElementById("emailLogin").value;
    var password = document.getElementById("passwordLogin").value;

    var getUsers = JSON.parse(localStorage.getItem("ourUsers")) || [];

    var user = getUsers.find(function (value) {
        return value.emailOfUser === email && value.passwordOfUser === password;
    });

    if (user) {
        console.log("Successfully logged in");
        alert("Successfully logged in");
        localStorage.setItem("loginUser", JSON.stringify(user));
        window.location.replace("./dashboard.html");
        history.replaceState(null, "", "./dashboard.html"); // Remove login.html from history
    } else {
        console.log("Email or password is incorrect");
        alert("Email or password is incorrect");
    }
}
