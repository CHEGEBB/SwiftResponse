// Initialize Google Sign-In
function initGoogleSignIn() {
    gapi.load('auth2', function() {
        const auth2 = gapi.auth2.init({
            client_id: 'YOUR_GOOGLE_CLIENT_ID',
            cookie_policy: 'single_host_origin'
        });
        // Attach click event listener to the Google Sign-In button
        document.getElementById('googleSignInBtn').addEventListener('click', function() {
            auth2.signIn().then(onGoogleSignIn);
        });
    });
}

// Callback function after Google sign-in
function onGoogleSignIn(googleUser) {
    const idToken = googleUser.getAuthResponse().id_token;
    // Send the ID token to your server for authentication
    // Replace this with your backend logic
    console.log('Google ID token:', idToken);
}

// Call the initialization function when the DOM is loaded
document.addEventListener("DOMContentLoaded", function() {
    initGoogleSignIn();
});
document.addEventListener("DOMContentLoaded", function() {
    const username = "chegephil24@gmail.com";
    const password = "password";

    const loginForm = document.getElementById("loginForm");
    const usernameInput = document.getElementById("username");
    const passwordInput = document.getElementById("password");
    const errorText = document.getElementById("errorText");

    loginForm.addEventListener("submit", function(event) {
        event.preventDefault(); // Prevent form submission
        const enteredUsername = usernameInput.value;
        const enteredPassword = passwordInput.value;
        if (enteredUsername === username && enteredPassword === password) {
            window.location.href = "/pages/index.html"; // Redirect to main page
        } else {
            errorText.textContent = "Invalid username or password"; // Display error message
        }
    });

    // Google Sign-In
    const googleSignInButton = document.getElementById("googleSignInButton");
    googleSignInButton.addEventListener("click", function() {
        // Redirect or trigger Google sign-in flow
        // Example: window.location.href = "/auth/google";
    });

    // Facebook Sign-In
    const facebookSignInButton = document.getElementById("facebookSignInButton");
    facebookSignInButton.addEventListener("click", function() {
        // Redirect or trigger Facebook sign-in flow
        // Example: window.location.href = "/auth/facebook";
    });

    // Apple Sign-In
    const appleSignInButton = document.getElementById("appleSignInButton");
    appleSignInButton.addEventListener("click", function() {
        // Redirect or trigger Apple sign-in flow
        // Example: window.location.href = "/auth/apple";
    });
});
