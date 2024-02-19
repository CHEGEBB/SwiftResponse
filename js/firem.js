document.addEventListener("DOMContentLoaded", function() {
    const campus = document.querySelector(".campus");
    const cards = document.querySelectorAll(".card");
    let scrollIndex = 0;
    const cardWidth = cards[0].offsetWidth; // Assuming all cards have the same width

    // Set interval for card scrolling
    const interval = setInterval(() => {
        scrollIndex = (scrollIndex + 1) % (cards.length + 1); // Add 1 for the delay before restart
        const scrollPosition = -scrollIndex * cardWidth;
        campus.style.transition = "transform 0.5s ease";
        campus.style.transform = `translateX(${scrollPosition}px)`;
    }, 3000); // Change the interval (in milliseconds) as needed

    // Reset scrollIndex and remove transition for infinite loop
    campus.addEventListener("transitionend", function() {
        if (scrollIndex === cards.length) {
            scrollIndex = 0;
            campus.style.transition = "none";
            campus.style.transform = "translateX(0)";
            setTimeout(() => {
                campus.style.transition = "transform 0.5s ease"; // Reapply transition after delay
            }, 1000); // Delay before restart
        }
    });

    // Clear interval when navigating away from the page to avoid memory leaks
    window.addEventListener("beforeunload", function() {
        clearInterval(interval);
    });

    // Add click event listeners to all display number buttons
    const displayNumberBtns = document.querySelectorAll("#collaboration-local-authorities #display-number-btn, #control-panel #display-number-btn");
    displayNumberBtns.forEach(btn => {
        btn.addEventListener("click", displayNumber);
    });

    function displayNumber() {
        const dropdown = this.parentNode.querySelector("select");
        const selectedOption = dropdown.options[dropdown.selectedIndex];
        const contactInfoTextarea = this.parentNode.querySelector("textarea");
        contactInfoTextarea.value = selectedOption.value;
    }

    // Toggle navigation
    var menuToggle = document.querySelector('.menu-toggle');
    menuToggle.addEventListener('click', toggleNav);

    // Automatically hide navigation after a certain time of inactivity
    var timeout;
    function hideNav() {
        var navList = document.getElementById("navList");
        if (navList.classList.contains('active')) {
            timeout = setTimeout(function() {
                navList.classList.remove('active');
            }, 1000); // Adjust the time (in milliseconds) as needed
        }
    }

    // Reset timeout on user interaction
    document.addEventListener('mousemove', function() {
        clearTimeout(timeout);
        hideNav();
    });

    // Initially hide navigation
    hideNav();

    function toggleNav() {
        var navList = document.getElementById("navList");
        navList.classList.toggle("active");
        clearTimeout(timeout); // Clear the timeout whenever the navigation is toggled
        hideNav(); // Restart the hideNav functionality
    }
});
