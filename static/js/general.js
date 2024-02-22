function countUp(target, duration, countId) {
  let current = 0;
  const increment = Math.ceil(target / (duration / 60));

  const interval = setInterval(() => {
      current += increment;
      const countElement = document.getElementById(countId);
      countElement.textContent = current + "+";
      if (current >= target) {
          clearInterval(interval);
          countElement.textContent = target + "+";
      }
  }, 7000 / 60);
}

document.addEventListener("DOMContentLoaded", function() {
  const firstRow = document.querySelector(".row:nth-of-type(1)");
  const secondRow = document.querySelector(".row:nth-of-type(2)");
  const cards = document.querySelectorAll(".card");
  const cardWidth = cards[0].offsetWidth;

  let scrollPosition = 0;

  function scrollCards(row, newPosition) {
      row.style.transition = "transform 0.5s ease-in-out";
      row.style.transform = `translateX(-${newPosition}px)`;
  }

  function handleScroll() {
      scrollPosition += cardWidth;
      if (scrollPosition >= cardWidth * 4) {
          scrollPosition = 0;
      }
      scrollCards(firstRow, scrollPosition);
      scrollCards(secondRow, scrollPosition);
  }

  setInterval(handleScroll, 3000); // Change 3000 to adjust scroll speed

  countUp(500, 2000, 'count1');
  countUp(300, 2000, 'count2');
  countUp(9.5, 2000, 'count3');
  countUp(250, 2000, 'count4');
  countUp(450, 2000, 'count5');
  countUp(400, 2000, 'count6');

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

  function toggleNav() {
      console.log("Toggling navigation...");
      var navList = document.getElementById("navList");
      navList.classList.toggle("active");
      clearTimeout(timeout); // Clear the timeout whenever the navigation is toggled
      hideNav(); // Restart the hideNav functionality
  }
});
