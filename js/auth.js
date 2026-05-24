

const authContainer =
    document.getElementById("authContainer");

const showLoginBtn =
    document.getElementById("showLogin");

const showSignupBtn =
    document.getElementById("showSignup");

const signupForm =
    document.getElementById("signupForm");

const loginForm =
    document.getElementById("loginForm");

const signupContent =
    document.querySelector(".signup-content");

const loginContent =
    document.querySelector(".login-content");


// ==========================
// TOGGLE PANELS
// ==========================

showLoginBtn.addEventListener("click", function (e) {

    e.preventDefault();

    authContainer.classList.add("login-mode");

    signupForm.classList.remove("active");
    loginForm.classList.add("active");

    signupContent.classList.remove("active");
    loginContent.classList.add("active");
});


showSignupBtn.addEventListener("click", function (e) {

    e.preventDefault();

    authContainer.classList.remove("login-mode");

    loginForm.classList.remove("active");
    signupForm.classList.add("active");

    loginContent.classList.remove("active");
    signupContent.classList.add("active");
});


// ==========================
// LOCAL STORAGE FUNCTIONS
// ==========================

function getUsers() {

    let users = JSON.parse(
        localStorage.getItem("users")
    );

    if (!Array.isArray(users)) {
        return [];
    }

    return users;
}


function saveUsers(users) {

    localStorage.setItem(
        "users",
        JSON.stringify(users)
    );
}


// ==========================
// MESSAGE FUNCTION
// ==========================

function showMessage(id, text, type) {

    const messageBox =
        document.getElementById(id);

    messageBox.innerText = text;

    messageBox.className =
        `form-message ${type}`;
}


// ==========================
// EMAIL VALIDATION
// ==========================
function isEmailValid(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}
function isPasswordValid(password) {
    return password.length >= 6;
}


// ==========================
// SIGNUP
// ==========================

signupForm.addEventListener("submit", function (e) {

    e.preventDefault();

    const username =
        document.getElementById("signupUsername")
            .value
            .trim();

    const email =
        document.getElementById("signupEmail")
            .value
            .trim()
            .toLowerCase();

    const password =
        document.getElementById("signupPassword")
            .value
            .trim();

    const confirmPassword =
        document.getElementById("confirmPassword")
            .value
            .trim();


    // VALIDATION

    if (
        username === "" ||
        email === "" ||
        password === "" ||
        confirmPassword === ""
    ) {

        showMessage(
            "signupMessage",
            "Please fill all fields.",
            "message-error"
        );

        return;
    }
    if (username.length < 3) {
        showMessage(
            "signupMessage",
            "Username must be at least 3 characters",
            "error"
        );
        return;
    }

    if (!isEmailValid(email)) {

        showMessage(
            "signupMessage",
            "Enter valid email.",
            "message-error"
        );

        return;
    }

    if (!isPasswordValid(password)) {
        showMessage(
            "signupMessage",
            "Password must be at least 6 characters",
            "error"
        );
        return;
    }
    if (password.length < 6) {

        showMessage(
            "signupMessage",
            "Password must be at least 6 characters.",
            "message-error"
        );

        return;
    }


    if (password !== confirmPassword) {

        showMessage(
            "signupMessage",
            "Passwords do not match.",
            "message-error"
        );

        return;
    }


    // CHECK EXISTING USER

    const users = getUsers();

    const userExists = users.some(function (user) {

        return user.email === email;
    });


    if (userExists) {

        showMessage(
            "signupMessage",
            "Email already registered.",
            "message-error"
        );

        return;
    }


    // CREATE USER

    const newUser = {
        username,
        email,
        password
    };


    users.push(newUser);

    saveUsers(users);


    // SUCCESS

    showMessage(
        "signupMessage",
        "Signup successful.",
        "message-success"
    );


    signupForm.reset();


    // SWITCH TO LOGIN

    setTimeout(function () {

        authContainer.classList.add("login-mode");

        signupForm.classList.remove("active");
        loginForm.classList.add("active");

        signupContent.classList.remove("active");
        loginContent.classList.add("active");

    }, 800);

});


// ==========================
// LOGIN
// ==========================

loginForm.addEventListener("submit", function (e) {

    e.preventDefault();

    const email =
        document.getElementById("loginEmail")
            .value
            .trim()
            .toLowerCase();

    const password =
        document.getElementById("loginPassword")
            .value
            .trim();


    if (email === "" || password === "") {

        showMessage(
            "loginMessage",
            "Enter email and password.",
            "message-error"
        );

        return;
    }


    const users = getUsers();


    const foundUser = users.find(function (user) {

        return user.email === email;
    });


    if (!foundUser) {

        showMessage(
            "loginMessage",
            "User not found.",
            "message-error"
        );

        return;
    }


    if (foundUser.password !== password) {

        showMessage(
            "loginMessage",
            "Incorrect password.",
            "message-error"
        );

        return;
    }


    // SAVE CURRENT USER

    const currentUser = {
        username: foundUser.username,
        email: foundUser.email
    };


    localStorage.setItem(
        "currentUser",
        JSON.stringify(currentUser)
    );


    // SUCCESS

    showMessage(
        "loginMessage",
        "Login successful.",
        "message-success"
    );


    // REDIRECT

    setTimeout(function () {

        window.location.href = "dashboard.html";

    }, 1000);

});