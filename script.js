const signupBtn = document.getElementById("signup-form");

signupBtn.addEventListener("submit", (event) => {
    event.preventDefault();
    // Retrieve the values of the input fields
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    // other user details

    // Create a user object with these values
    const user = {
        name,
        email,
        password,
        accessToken: generateAccessToken() // add the access token to the user object
    };

    // Validating the form.
    const msg = document.getElementById('msg');
    if(user.name === "" || user.email === "" || user.password === "") {
        msg.innerHTML = "Error: All the fields are mandatory";
        msg.style.display = "block";
        msg.style.color = "red";
        return;
    } else if(user.password !== confirmPassword) {
        msg.innerHTML = "Password and Confirm password not matched.";
        msg.style.display = "block";
        msg.style.color = "red";
        return;
    } else {
        msg.innerHTML = "Signup successful!";
        msg.style.display = "block";
        msg.style.color = "green";
    }

    // Store the user's state in the local storage
    localStorage.setItem("user", JSON.stringify(user));

    // Show success message and redirect to profile page
    
    setTimeout(() => {
        window.location.href = "./profile/index.html";
    }, 1000); // redirect after 1 second
});

function generateAccessToken() {
    // Generate a random 16-byte string
    const randomBytes = new Uint8Array(16);
    window.crypto.getRandomValues(randomBytes);
    const accessToken = btoa(String.fromCharCode.apply(null, randomBytes));
    return accessToken;
}

// redirection the page according to user in database
const profile = document.getElementById('profile');
profile.addEventListener('click', () => {
    const user = JSON.parse(localStorage.getItem('user')) || false;
    if(user) {
        window.location.href = "./profile/index.html";
    } else {
        window.location.href = "./index.html";
    }
});