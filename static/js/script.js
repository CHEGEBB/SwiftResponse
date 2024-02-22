document.addEventListener('DOMContentLoaded', function() {
    // Smooth scrolling
    var scrollLinks = document.querySelectorAll('.scroll-to-top a[href^="#"]');
    for (var i = 0; i < scrollLinks.length; i++) {
        scrollLinks[i].addEventListener('click', smoothScroll);
    }

    function smoothScroll(e) {
        e.preventDefault();
        var targetId = this.getAttribute('href'),
            targetPosition = document.querySelector(targetId).offsetTop,
            startPosition = window.pageYOffset,
            distance = targetPosition - startPosition,
            startTime = null;

        function animation(currentTime) {
            if (startTime === null) startTime = currentTime;
            var timeElapsed = currentTime - startTime,
                run = ease(timeElapsed, startPosition, distance, 1000);
            window.scrollTo(0, run);
            if (timeElapsed < 1000) requestAnimationFrame(animation);
        }

        function ease(t, b, c, d) {
            t /= d / 2;
            if (t < 1) return (c / 2) * t * t + b;
            t--;
            return (-c / 2) * (t * (t - 2) - 1) + b;
        }

        requestAnimationFrame(animation);
    }

    // Modal functionality
    var modal = document.getElementById("myModal");
    var modalImg = document.getElementById("img01");
    var modalImgs = document.querySelectorAll(".modal-img");
    var span = document.getElementsByClassName("close")[0];

    modalImgs.forEach(function(img) {
        img.onclick = function() {
            modal.style.display = "block";
            modalImg.src = this.src;
        }
    });

    span.onclick = function() {
        modal.style.display = "none";
    }

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
