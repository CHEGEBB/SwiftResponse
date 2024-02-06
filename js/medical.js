// JavaScript code
document.addEventListener("DOMContentLoaded", function() {
    const container = document.querySelector(".hospital-list-container");
    const cards = document.querySelectorAll(".hospital-card");
    const prevArrow = document.querySelector(".prev-arrow");
    const nextArrow = document.querySelector(".next-arrow");
    let scrollPosition = 0;

    nextArrow.addEventListener("click", function() {
        scrollPosition += 450; // Adjust this value based on the width of your cards
        container.scroll({
            left: scrollPosition,
            behavior: "smooth"
        });
    });

    prevArrow.addEventListener("click", function() {
        scrollPosition -= 450; // Adjust this value based on the width of your cards
        container.scroll({
            left: scrollPosition,
            behavior: "smooth"
        });
    });

    // Detect scroll event
    container.addEventListener("scroll", function() {
        const scrollLeft = container.scrollLeft;
        const maxScroll = container.scrollWidth - container.clientWidth;

        if (scrollLeft === 0) {
            prevArrow.style.visibility = "hidden";
        } else {
            prevArrow.style.visibility = "visible";
        }

        if (scrollLeft === maxScroll) {
            nextArrow.style.visibility = "hidden";
        } else {
            nextArrow.style.visibility = "visible";
        }
    });
});
