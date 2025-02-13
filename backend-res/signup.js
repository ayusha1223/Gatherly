document.getElementById("signupForm").addEventListener("submit", function (event) {
    event.preventDefault();


    const firstName = document.getElementById("first-name").value.trim();
    const lastName = document.getElementById("last-name").value.trim();
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();
    const confirmPassword = document.getElementById("confirmpassword").value.trim();


    const emailError = document.getElementById("emailError");
    const passwordError = document.getElementById("passwordError");
    const confirmPasswordError = document.getElementById("confirmPasswordError");


    emailError.style.display = "none";
    passwordError.style.display = "none";
    confirmPasswordError.style.display = "none";


    let isValid = true;
    if (!firstName || !lastName || !email || !password || !confirmPassword) {
        alert("All fields are required.");
        return;
    }

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        emailError.textContent = "Please enter a valid email address.";
        emailError.style.display = "block";
        isValid = false;
    }


    if (!password || password.length < 8) {
        passwordError.textContent = "Password must be at least 8 characters long.";
        passwordError.style.display = "block";
        isValid = false;
    }


    if (password !== confirmPassword) {
        confirmPasswordError.textContent = "Passwords do not match.";
        confirmPasswordError.style.display = "block";
        isValid = false;
    }


    if (isValid) {
        localStorage.setItem("firstName", firstName);
        localStorage.setItem("lastName", lastName);
        localStorage.setItem("email", email);
        localStorage.setItem("password", password);

        alert("Form submitted successfully!");
        window.location.href = "../frontend-html/loginpage.html";
    }
});
