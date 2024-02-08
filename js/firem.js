document.addEventListener("DOMContentLoaded", function() {
    const campus = document.querySelector(".campus");
    const cards = document.querySelectorAll(".card");
    let scrollIndex = 0;

    // Function to display the selected number
    function displayNumber() {
        // Get the selected dropdown element
        const dropdown = this.parentNode.querySelector("select");

        // Get the selected option
        const selectedOption = dropdown.options[dropdown.selectedIndex];

        // Get the contact info textarea element
        const contactInfoTextarea = this.parentNode.querySelector("textarea");

        // Display the number in the textarea
        contactInfoTextarea.value = selectedOption.value;
    }

    // Smooth scroll to top functionality
    const scrollToTopBtn = document.querySelector(".scroll-to-top a");
    scrollToTopBtn.addEventListener("click", function(e) {
        e.preventDefault();
        const scrollToTop = () => {
            const c = document.documentElement.scrollTop || document.body.scrollTop;
            if (c > 0) {
                window.requestAnimationFrame(scrollToTop);
                window.scrollTo(0, c - c / 8);
            }
        };
        scrollToTop();
    });

    // Set interval for card scrolling
    const interval = setInterval(() => {
        scrollIndex = (scrollIndex + 1) % (cards.length - 3); // Subtract 3 for the number of visible cards
        const scrollPosition = -scrollIndex * 25; // 25% width per card
        campus.style.transition = "transform 0.5s ease";
        campus.style.transform = `translateX(${scrollPosition}%)`;
    }, 3000); // Change the interval (in milliseconds) as needed

    // Reset scrollIndex and remove transition for infinite loop
    campus.addEventListener("transitionend", function() {
        if (scrollIndex === cards.length - 3) { // Subtract 3 for the number of visible cards
            scrollIndex = 0;
            campus.style.transition = "none";
            campus.style.transform = "translateX(0)";
        }
    });

    // Add click event listeners to all display number buttons
    const displayNumberBtns = document.querySelectorAll("#collaboration-local-authorities #display-number-btn, #control-panel #display-number-btn");
    displayNumberBtns.forEach(btn => {
        btn.addEventListener("click", displayNumber);
    });

    // Clear interval when navigating away from the page to avoid memory leaks
    window.addEventListener("beforeunload", function() {
        clearInterval(interval);
    });
});
