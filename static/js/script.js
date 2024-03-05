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

function openModal(category) {
    var modal = document.getElementById("myModal");
    var modalHeading = document.getElementById("modal-heading");
    var modalSelect = document.getElementById("number-select");
  
    modal.style.display = "block";
    modalSelect.innerHTML = ""; // Clear previous options
  
    // Set modal heading based on category
    modalHeading.innerText = category.toUpperCase() + " Service";
  
    // Dynamically populate select options based on category
    switch (category) {
      case "alarm":
        addAlarmNumbers(modalSelect);
        break;
      case "ambulance":
        addAmbulanceNumbers(modalSelect);
        break;
      case "fire":
        addFireNumbers(modalSelect);
        break;
      case "location":
        addLocationNumbers(modalSelect);
        break;
      case "police":
        addPoliceNumbers(modalSelect);
        break;
      case "panic":
        addPanicNumbers(modalSelect);
        break;
      case "emergencycontacts":
        addEmergencyContactsNumbers(modalSelect);
        break;
      case "healthprofile":
        addHealthProfileNumbers(modalSelect);
        break;
      case "report":
        addReportNumbers(modalSelect);
        break;
      default:
        modalSelect.innerHTML = "<option>No numbers available</option>";
    }
}

// Functions to add numbers for each category
function addAlarmNumbers(selectElement) {
    var alarmNumbers = [
      { number: "112", location: "Nairobi Alarm Center" },
        { number: "113", location: "Mombasa Alarm Center" },
        { number: "114", location: "Kisumu Alarm Center" },
        { number: "115", location: "Eldoret Alarm Center" },
        { number: "116", location: "Nakuru Alarm Center" },
        { number: "117", location: "Nyeri Alarm Center" },
        { number: "118", location: "Kisii Alarm Center" },
        { number: "119", location: "Kakamega Alarm Center" },
        { number: "120", location: "Meru Alarm Center" },
        { number: "121", location: "Machakos Alarm Center" }
      
    ];
    addOptions(selectElement, alarmNumbers);
}

function addAmbulanceNumbers(selectElement) {
    var ambulanceNumbers = [
      { number: "999", location: "National Ambulance Service" },
      { number: "991", location: "Nairobi Ambulance Services" },
      { number: "992", location: "Mombasa Ambulance Services" },
      { number: "993", location: "Kisumu Ambulance Services" },
      { number: "994", location: "Eldoret Ambulance Services" },
      { number: "995", location: "Nakuru Ambulance Services" },
      { number: "996", location: "Nyeri Ambulance Services" },
      { number: "997", location: "Kisii Ambulance Services" },
      { number: "998", location: "Kakamega Ambulance Services" },
      { number: "9910", location: "Meru Ambulance Services" }
     
    ];
    addOptions(selectElement, ambulanceNumbers);
}

function addFireNumbers(selectElement) {
    var fireNumbers = [
      { number: "119", location: "Nairobi Fire Station" },
      { number: "112", location: "Mombasa Fire Station" },
      { number: "113", location: "Kisumu Fire Station" },
      { number: "114", location: "Eldoret Fire Station" },
      { number: "115", location: "Nakuru Fire Station" },
      { number: "116", location: "Nyeri Fire Station" },
      { number: "117", location: "Kisii Fire Station" },
      { number: "118", location: "Kakamega Fire Station" },
      { number: "119", location: "Meru Fire Station" },
      { number: "120", location: "Machakos Fire Station" }
    ];
    addOptions(selectElement, fireNumbers);
}

function addLocationNumbers(selectElement) {
    var locationNumbers = [
      // Add location numbers and locations here
    ];
    addOptions(selectElement, locationNumbers);
}

function addPoliceNumbers(selectElement) {
    var policeNumbers = [
      { number: "999", location: "National Police Emergency" },
      { number: "112", location: "Nairobi Police Hotline" },
      { number: "113", location: "Mombasa Police Hotline" },
      { number: "114", location: "Kisumu Police Hotline" },
      { number: "115", location: "Eldoret Police Hotline" },
      { number: "116", location: "Nakuru Police Hotline" },
      { number: "117", location: "Nyeri Police Hotline" },
      { number: "118", location: "Kisii Police Hotline" },
      { number: "119", location: "Kakamega Police Hotline" },
      { number: "120", location: "Meru Police Hotline" }
    ];
    addOptions(selectElement, policeNumbers);
}

function addPanicNumbers(selectElement) {
    var panicNumbers = [
      { number: "999", location: "National Police Emergency" },
      { number: "112", location: "Nairobi Police Hotline" },
      { number: "113", location: "Mombasa Police Hotline" },
      { number: "114", location: "Kisumu Police Hotline" },
      { number: "115", location: "Eldoret Police Hotline" },
      { number: "116", location: "Nakuru Police Hotline" },
      { number: "117", location: "Nyeri Police Hotline" },
      { number: "118", location: "Kisii Police Hotline" },
      { number: "119", location: "Kakamega Police Hotline" },
      { number: "120", location: "Meru Police Hotline" }
    ];
    addOptions(selectElement, panicNumbers);
}

function addEmergencyContactsNumbers(selectElement) {
    var emergencyContactsNumbers = [
      { number: "991", location: "National Emergency Contacts" },
        { number: "992", location: "Nairobi Emergency Contacts" },
        { number: "993", location: "Mombasa Emergency Contacts" },
        { number: "994", location: "Kisumu Emergency Contacts" },
        { number: "995", location: "Eldoret Emergency Contacts" },
        { number: "996", location: "Nakuru Emergency Contacts" },
        { number: "997", location: "Nyeri Emergency Contacts" },
        { number: "998", location: "Kisii Emergency Contacts" },
        { number: "999", location: "Kakamega Emergency Contacts" },
        { number: "9100", location: "Meru Emergency Contacts" }
    ];
    addOptions(selectElement, emergencyContactsNumbers);
}

function addHealthProfileNumbers(selectElement) {
    var healthProfileNumbers = [
      // Add health profile numbers and locations here
    ];
    addOptions(selectElement, healthProfileNumbers);
}

function addReportNumbers(selectElement) {
    var reportNumbers = [
   
      { number: "991", location: "National Emergency Contacts" },
      { number: "992", location: "Nairobi Emergency Contacts" },
      { number: "993", location: "Mombasa Emergency Contacts" },
      { number: "994", location: "Kisumu Emergency Contacts" },
      { number: "995", location: "Eldoret Emergency Contacts" },
      { number: "996", location: "Nakuru Emergency Contacts" },
      { number: "997", location: "Nyeri Emergency Contacts" },
      { number: "998", location: "Kisii Emergency Contacts" },
      { number: "999", location: "Kakamega Emergency Contacts" },
      { number: "9100", location: "Meru Emergency Contacts" }
    ];
    addOptions(selectElement, reportNumbers);
}

function addOptions(selectElement, optionsArray) {
    optionsArray.forEach(function(option) {
      var optionElement = document.createElement("option");
      optionElement.value = option.number;
      optionElement.innerText = option.location;
      selectElement.appendChild(optionElement);
    });
}

function displayNumber() {
  var modal = document.getElementById("myModal");
  var selectElement = modal.querySelector(".modal-select");
  var selectedOption = selectElement.options[selectElement.selectedIndex];
  var numberDisplay = modal.querySelector(".modal-textarea");
  
  // Check if an option is selected
  if(selectedOption) {
      // Display the selected number in the textarea
      numberDisplay.value = "Selected Number: " + selectedOption.value;
  } else {
      // If no option is selected, display a message
      numberDisplay.value = "No number selected";
  }
}


  var displayButton = document.getElementById("display-button");
  displayButton.addEventListener('click', displayNumber);

  
  function addOptions(selectElement, optionsArray) {
    optionsArray.forEach(function(option) {
      var optionElement = document.createElement("option");
      optionElement.value = option.number;
      optionElement.innerText = option.location;
      selectElement.appendChild(optionElement);
    });
  }
  // Get the buttons by their IDs
const learnMoreBtn = document.getElementById("learnMoreBtn");
const callNowBtn = document.getElementById("callNowBtn");

// Add event listener to the Learn More button
learnMoreBtn.addEventListener("click", function() {
    // Redirect to the About Us page
    window.location.href = "about.html"; 
});

// Add event listener to the Call Now button
callNowBtn.addEventListener("click", function() {
    // Display the emergency number in a modal
    const modal = document.getElementById("myModal");
    const span = document.getElementsByClassName("close")[0];
    const emergencyNumber = document.getElementById("emergencyNumber");

    // Set the emergency number
    const number = "911"; // Replace "911" with your actual emergency number
    emergencyNumber.textContent = "Emergency Number: " + number;

    // Display the modal
    modal.style.display = "block";

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
});
