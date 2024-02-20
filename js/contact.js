// Function to submit university emergency report
function submitUniversityReport(event) {
    event.preventDefault();
    // Code to submit the report to the server
    console.log("University emergency report submitted.");
  }
  
  // Function to submit general user emergency report
  function submitGeneralUserReport(event) {
    event.preventDefault();
    // Code to submit the report to the server
    console.log("General user emergency report submitted.");
  }
  
  // Integration with Screen Readers
  function announceMessage(message) {
    // For demonstration, let's alert the message
    alert(message);
  }
  
  // Option for Voice Commands
  function startVoiceRecognition() {
    // Code to start voice recognition
    console.log("Voice recognition started...");
  }
  
  // High-Contrast and Large Font Options
  function toggleHighContrast() {
    // Code to toggle high contrast
    console.log("High contrast toggled.");
  }
  
  function increaseFontSize() {
    // Code to increase font size
    console.log("Font size increased.");
  }
  
  // Support for Alternative Input Devices
  function connectSwitchDevice() {
    // Code to connect switch device
    console.log("Switch device connected.");
  }
  
  function connectSipAndPuffDevice() {
    // Code to connect sip-and-puff device
    console.log("Sip-and-puff device connected.");
  }
  
  // Event listeners for form submissions
  document.getElementById("university-report-form").addEventListener("submit", submitUniversityReport);
  document.getElementById("general-user-report-form").addEventListener("submit", submitGeneralUserReport);
  
  document.addEventListener('DOMContentLoaded', function() {
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
  