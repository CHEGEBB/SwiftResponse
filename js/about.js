
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
// Function to toggle the visibility of the navigation menu for mobile devices
function toggleMenu() {
  var navList = document.getElementById("navList");
  if (navList.style.display === "block") {
      navList.style.display = "none";
  } else {
      navList.style.display = "block";
  }
}

// Prevent closing the navigation menu if a dropdown item is clicked
document.querySelectorAll('.dropdown-item').forEach(item => {
  item.addEventListener('click', (event) => {
      // Prevent the default behavior of the anchor tag
      event.preventDefault();
      // Stop event propagation to prevent the window click event from closing the menu
      event.stopPropagation();
      // Optionally, you can add logic here to handle the click event for dropdown items
      // For example, you might want to navigate to a different page or perform an action
  });
});

// Position the dropdown menu relative to its parent item
document.querySelectorAll('.nav-item.dropdown').forEach(item => {
  const dropdownMenu = item.querySelector('.dropdown-menu');
  if (dropdownMenu) {
      item.addEventListener('click', (event) => {
          dropdownMenu.style.display = "block";
          event.stopPropagation();
      });
  }
});