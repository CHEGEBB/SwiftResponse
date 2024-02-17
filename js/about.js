
// Get the modal
var modal = document.getElementById("myModal");

// Get the image and insert it inside the modal - use its "alt" text as a caption
var images = document.querySelectorAll(".container1 img");
var modalImg = document.getElementById("modalImg");

images.forEach(function(image) {
  image.onclick = function() {
    modal.style.display = "block";
    modalImg.src = this.src;
  }
});

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}
// Toggle navigation
var menuToggle = document.querySelector('.menu-toggle');
menuToggle.addEventListener('click', toggleNav);

// Automatically hide navigation after a certain time of inactivity
var timeout;
function hideNav() {
    console.log("Hiding navigation...");
    var navList = document.getElementById("navList");
    if (navList.classList.contains('active')) {
        timeout = setTimeout(function() {
            console.log("Removing active class...");
            navList.classList.remove('active');
        }, 1000); // Adjust the time (in milliseconds) as needed
    }
}

// Reset timeout on user interaction
document.addEventListener('mousemove', function() {
    console.log("User interaction detected...");
    clearTimeout(timeout);
    hideNav();
});

// Initially hide navigation
hideNav();
});

function toggleNav() {
console.log("Toggling navigation...");
var navList = document.getElementById("navList");
navList.classList.toggle("active");
clearTimeout(timeout); // Clear the timeout whenever the navigation is toggled
hideNav(); // Restart the hideNav functionality
}
