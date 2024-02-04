document.addEventListener('DOMContentLoaded', function () {
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

    modalImgs.forEach(function (img) {
        img.onclick = function () {
            modal.style.display = "block";
            modalImg.src = this.src;
        }
    });

    span.onclick = function () {
        modal.style.display = "none";
    }

    window.onclick = function (event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }
});
