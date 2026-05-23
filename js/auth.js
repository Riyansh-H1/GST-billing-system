$(document).ready(function () {
    // This function gives a smooth modern switch between signup and login cards.
    function switchAuthBox(currentBox, nextBox) {
        $(currentBox).addClass("auth-hiding");

        $(currentBox).fadeOut(220, function () {
            $(currentBox).removeClass("auth-hiding");

            $(nextBox)
                .addClass("auth-hiding")
                .fadeIn(220, function () {
                    $(nextBox).removeClass("auth-hiding").addClass("auth-showing");

                    setTimeout(function () {
                        $(nextBox).removeClass("auth-showing");
                    }, 280);
                });
        });
    }

    $("#showLogin").click(function (event) {
        event.preventDefault();
        switchAuthBox("#signupBox", "#loginBox");
    });

    $("#showSignup").click(function (event) {
        event.preventDefault();
        switchAuthBox("#loginBox", "#signupBox");
    });
});

// Read users from localStorage. If no users exist, return an empty array.
function getUsers() {
    return JSON.parse(localStorage.getItem("users")) || [];
}

// Save the updated users array into localStorage.
function saveUsers(users) {
    localStorage.setItem("users", JSON.stringify(users));
}

// Show success or error message below the form heading.
function showMessage(messageId, text, type) {
    let messageBox = document.getElementById(messageId);
    messageBox.innerText = text;
    messageBox.className = "form-message " + type;
}

// Simple email check for beginner-friendly validation.
function isEmailValid(email) {
    return email.includes("@") && email.includes(".");
}

document.getElementById("signupForm").addEventListener("submit", function (event) {
    event.preventDefault();

    let username = document.getElementById("signupUsername").value.trim();
    let email = document.getElementById("signupEmail").value.trim().toLowerCase();
    let password = document.getElementById("signupPassword").value;
    let confirmPassword = document.getElementById("confirmPassword").value;

    if (username === "" || email === "" || password === "" || confirmPassword === "") {
        showMessage("signupMessage", "Please fill all fields.", "message-error");
        return;
    }

    if (!isEmailValid(email)) {
        showMessage("signupMessage", "Please enter a valid email address.", "message-error");
        return;
    }

    if (password.length < 6) {
        showMessage("signupMessage", "Password must be at least 6 characters.", "message-error");
        return;
    }

    if (password !== confirmPassword) {
        showMessage("signupMessage", "Password and confirm password do not match.", "message-error");
        return;
    }

    let users = getUsers();

    // Check if this email is already saved in localStorage.
    for (let i = 0; i < users.length; i++) {
        if (users[i].email === email) {
            showMessage("signupMessage", "This email is already registered.", "message-error");
            return;
        }
    }

    let newUser = {
        username: username,
        email: email,
        password: password
    };

    users.push(newUser);
    saveUsers(users);

    showMessage("signupMessage", "Signup successful. Please login now.", "message-success");
    document.getElementById("signupForm").reset();

    setTimeout(function () {
        $("#showLogin").trigger("click");
    }, 700);
});

document.getElementById("loginForm").addEventListener("submit", function (event) {
    event.preventDefault();

    let email = document.getElementById("loginEmail").value.trim().toLowerCase();
    let password = document.getElementById("loginPassword").value;

    if (email === "" || password === "") {
        showMessage("loginMessage", "Please enter email and password.", "message-error");
        return;
    }

    let users = getUsers();
    let foundUser = null;

    for (let i = 0; i < users.length; i++) {
        if (users[i].email === email) {
            foundUser = users[i];
            break;
        }
    }

    if (foundUser === null) {
        showMessage("loginMessage", "User does not exist. Please signup first.", "message-error");
        return;
    }

    if (foundUser.password !== password) {
        showMessage("loginMessage", "Incorrect password.", "message-error");
        return;
    }

    let currentUser = {
        username: foundUser.username,
        email: foundUser.email
    };

    localStorage.setItem("currentUser", JSON.stringify(currentUser));
    window.location.href = "dashboard.html";
});
