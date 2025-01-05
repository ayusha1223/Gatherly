document.getElementById("loginForm").addEventListener("submit", function (event) {
    event.preventDefault();

    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();

    const emailError = document.getElementById("emailError");
    const passwordError = document.getElementById("passwordError");

    emailError.style.display = "none";
    passwordError.style.display = "none";

    if (!email) {
        emailError.textContent = "Email is required.";
        emailError.style.display = "block";
        return;
    }
    if (!password) {
        passwordError.textContent = "Password is required.";
        passwordError.style.display = "block";
        return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        emailError.textContent = "Please enter a valid email address.";
        emailError.style.display = "block";
        return;
    }

    const storedEmail = localStorage.getItem("email");
    const storedPassword = localStorage.getItem("password");
    if (email !== storedEmail || password !== storedPassword) {
        passwordError.textContent = "Invalid email or password.";
        passwordError.style.display = "block";
        return;
    }

    // Login success
    alert("Login successful!");
    window.location.href = "../frontend-html/homepage.html";
});