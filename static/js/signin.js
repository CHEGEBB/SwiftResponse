document.addEventListener("DOMContentLoaded", function() {
    // Function to initialize Google Sign-In
    function initGoogleSignIn() {
        gapi.load('auth2', function() {
            const auth2 = gapi.auth2.init({
                client_id: '24798765564-l0cj29gendjs3qjhlig2nkr40lu842s7.apps.googleusercontent.com',
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
    initGoogleSignIn();

    // Other functions for Facebook and Apple sign-in if needed
});
