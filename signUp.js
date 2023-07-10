function signIn(event) {
    event.preventDefault();

    var nameOfUser = document.getElementById("name").value;
    var emailOfUser = document.getElementById("email").value;
    var numberOfUser = document.getElementById("number").value;
    var passwordOfUser = document.getElementById("password").value;

    var objOfUser = {
        nameOfUser,
        emailOfUser,
        numberOfUser,
        passwordOfUser,
    }

    var getUsers = JSON.parse(localStorage.getItem("ourUsers")) || [];

    var findUser = getUsers.find(function (user) {
        return user.emailOfUser === emailOfUser;
    });

    if (findUser === undefined) {
        getUsers.push(objOfUser);
        localStorage.setItem("ourUsers", JSON.stringify(getUsers));
        alert("Congratulations, " + objOfUser.nameOfUser + "! Sign up successful.");
        window.location.href = "./index.html";
    } else {
        alert("Email already exists! Please use a different email address.");
    }
}