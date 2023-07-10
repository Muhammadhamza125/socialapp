var listParent = document.getElementById("listParent");
var loginUser;

window.addEventListener("load", function () {
    var userLogin = localStorage.getItem("loginUser");
    if (!userLogin) {
        window.location.replace("./index.html");
        return;
    }

    var getUser = JSON.parse(localStorage.getItem("loginUser"));
    loginUser = getUser;
    var fullName = document.getElementById("fullName");
    if (fullName) {
        fullName.innerHTML = "WELCOME" + " " + loginUser.fullName;
    }

    if (listParent) {
        var getPosts = JSON.parse(localStorage.getItem("posts")) || [];
        console.log(getPosts, "getPosts");
        for (var value of getPosts) {
            var card = document.createElement('div');
            card.classList.add('card');

            var cardBody = document.createElement('div');
            cardBody.classList.add('card-body');

            var cardTitle = document.createElement('h5');
            cardTitle.classList.add('card-title');
            cardTitle.textContent = value.title;

            var cardDesc = document.createElement('p');
            cardDesc.classList.add('card-text');
            cardDesc.textContent = value.desc;

            var editBtn = document.createElement('button');
            editBtn.classList.add('btn', 'my-personal-btn');
            editBtn.textContent = 'Edit';
            editBtn.addEventListener('click', function () {
                editPost(value.id, this);
            });

            var deleteBtn = document.createElement('button');
            deleteBtn.classList.add('btn', 'my-personal-btn');
            deleteBtn.textContent = 'Delete';
            deleteBtn.addEventListener('click', function () {
                deletePost(value.id, this);
            });

            cardBody.appendChild(cardTitle);
            cardBody.appendChild(cardDesc);
            cardBody.appendChild(editBtn);
            cardBody.appendChild(deleteBtn);

            card.appendChild(cardBody);
            listParent.appendChild(card);
        }
    }
});

function addPost() {
    console.log("addPost");
    var title = document.getElementById("title");
    var desc = document.getElementById("desc");

    if (!title.value || !desc.value) {
        alert("Please enter values");
        return;
    }

    var id;
    var getPosts = JSON.parse(localStorage.getItem("posts")) || [];
    console.log("getPosts", getPosts);

    if (getPosts.length > 0) {
        id = getPosts[0].id + 1;
    } else {
        id = 1;
    }

    var card = document.createElement('div');
    card.classList.add('card');

    var cardBody = document.createElement('div');
    cardBody.classList.add('card-body');

    var cardTitle = document.createElement('h5');
    cardTitle.classList.add('card-title');
    cardTitle.textContent = title.value;

    var cardDesc = document.createElement('p');
    cardDesc.classList.add('card-text');
    cardDesc.textContent = desc.value;

    var editBtn = document.createElement('button');
    editBtn.classList.add('btn', 'my-personal-btn');
    editBtn.textContent = 'Edit';
    editBtn.addEventListener('click', function () {
        editPost(id, this);
    });

    var deleteBtn = document.createElement('button');
    deleteBtn.classList.add('btn', 'my-personal-btn');
    deleteBtn.textContent = 'Delete';
    deleteBtn.addEventListener('click', function () {
        deletePost(id, this);
    });

    cardBody.appendChild(cardTitle);
    cardBody.appendChild(cardDesc);
    cardBody.appendChild(editBtn);
    cardBody.appendChild(deleteBtn);

    card.appendChild(cardBody);
    listParent.appendChild(card);

    var postObj = {
        id: id,
        title: title.value,
        desc: desc.value
    };

    getPosts.unshift(postObj);
    localStorage.setItem("posts", JSON.stringify(getPosts));

    title.value = "";
    desc.value = "";
}

function deletePost(id, e) {
    var getPosts = JSON.parse(localStorage.getItem("posts"));
    var indexNum = getPosts.findIndex(function (value) {
        if (value.id === id) return true;
    });
    getPosts.splice(indexNum, 1);
    localStorage.setItem("posts", JSON.stringify(getPosts));

    // Remove element
    e.parentNode.parentNode.remove();
}

function editPost(id, e) {
    var indexNum;
    var getPosts = JSON.parse(localStorage.getItem("posts"));
    var post = getPosts.find(function (value, index) {
        if (value.id === id) {
            indexNum = index;
            return true;
        }
    });

    var editTitle = prompt("Edit title", post.title);
    var editDesc = prompt("Edit description", post.desc);
    const editObj = {
        id: post.id,
        title: editTitle,
        desc: editDesc
    };

    getPosts.splice(indexNum, 1, editObj);
    localStorage.setItem("posts", JSON.stringify(getPosts));

    var h5Title = e.parentNode.firstElementChild;
    var pDesc = e.parentNode.firstElementChild.nextElementSibling;
    h5Title.innerHTML = editTitle;
    pDesc.innerHTML = editDesc;
}

function logout() {
    localStorage.removeItem("loginUser");
    window.location.replace("./index.html");
}