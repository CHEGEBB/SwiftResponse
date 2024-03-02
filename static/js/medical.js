
 document.addEventListener("DOMContentLoaded", function() {
    // Hospital list carousel functionality
    const container = document.querySelector(".hospital-list-container");
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

    // Chat functionality
    function sendMessage() {
        var userInput = document.getElementById('user-input').value.trim();
        if (!userInput) return; // Check if input is empty
    
        // Display user message in chat log
        appendMessage('user-message', userInput);
        document.getElementById('user-input').value = ''; // Clear input field after sending message
    
        // Make a request to Llama AI API using fetch
        fetch('https://llamaai.com/api/chat?apikey=LL-mPkriaJz5jFRSimVvBwy3dtMAm72ZuyGRALInv1TMLC9znZ6wdgBbkwDtsdlstR1&message=' + encodeURIComponent(userInput))
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to fetch AI response');
            }
            return response.json();
        })
        .then(data => {
            var aiResponse = data.response;
            // Display AI response in chat log
            appendMessage('ai-message', aiResponse);
        })
        .catch(error => console.error('Error:', error));
    }
    
    function appendMessage(className, message) {
        var chatLog = document.getElementById('chat-log');
        var messageDiv = document.createElement('div');
        messageDiv.classList.add(className);
        messageDiv.textContent = message;
        chatLog.appendChild(messageDiv);
        // Scroll to bottom of chat log
        chatLog.scrollTop = chatLog.scrollHeight;
    }

    // Function to display the selected emergency contact number in textarea
    function showNumber() {
        var select = document.getElementById("emergency-select");
        var selectedValue = select.value;
        var infoTextArea = document.getElementById("contact-info");

        switch (selectedValue) {
            case '0724721258':
                infoTextArea.value = "0724721258"; // Dedan Kimathi Ambulance Services
                break;
            case '999':
                infoTextArea.value = "999"; // Medical Emergency Services
                break;
            case '1199':
                infoTextArea.value = "1199"; // Kenya Red Cross Ambulance Services
                break;
            case '112':
                infoTextArea.value = "112"; // Police Emergency Line
                break;
            case '116':
                infoTextArea.value = "116"; // Childline Kenya
                break;
            case '0703050313':
                infoTextArea.value = "0703050313"; // Flying Doctors Society of Africa
                break;
            case '0700395395':
                infoTextArea.value = "0700395395"; // Nairobi Poison Control Center
                break;
            case '0700474747':
                infoTextArea.value = "0700474747"; // National Spinal Injury Hospital
                break;
            case '0706 799 000':
                infoTextArea.value = "0706 799 000"; // Kenya Medical Training College (KMTC) Ambulance
                break;
            case '0202726848':
                infoTextArea.value = "0202726848"; // Kenya Medical Association (KMA) Ambulance
                break;
            case '0800721055':
                infoTextArea.value = "0800721055"; // Kenya Association of Private Hospitals (KAPH) Ambulance
                break;
            case '0707375375':
                infoTextArea.value = "0707375375"; // Amref Flying Doctors
                break;
            case '0709841000':
                infoTextArea.value = "0709841000"; // Aga Khan University Hospital Ambulance
                break;
            case '0730644000':
                infoTextArea.value = "0730644000"; // Gertrude’s Children’s Hospital Ambulance
                break;
            case '0723963782':
                infoTextArea.value = "0723963782"; // Kenyatta National Hospital Ambulance
                break;
            case '0713127910':
                infoTextArea.value = "0713127910"; // University of Nairobi Emergency Services
                break;
            case '0701668193':
                infoTextArea.value = "0701668193"; // Strathmore University Emergency Line
                break;
            case '0202503838':
                infoTextArea.value = "0202503838"; // Kenyatta University Medical Center
                break;
            case '0713884128':
                infoTextArea.value = "0713884128"; // Jomo Kenyatta University Hospital
                break;
            case '2540512217891':
                infoTextArea.value = "2540512217891"; // Egerton University Health Services
                break;
            case '0202878000':
                infoTextArea.value = "0202878000"; // Mount Kenya University Emergency
                break;
            case '0722203411':
                infoTextArea.value = "0722203411"; // Maseno University Medical Center
                break;
            case '254532033238':
                infoTextArea.value = "254532033238"; // Moi University Health Services
                break;
            case '254746490082':
                infoTextArea.value = "254746490082"; // University of Eldoret Emergency Line
                break;
            case '254748177829':
                infoTextArea.value = "254748177829"; // Kisii University Medical Center
                break;
            case '0705555400':
                infoTextArea.value = "0705555400"; // Pwani University Health Services
                break;
            case '254702597360':
                infoTextArea.value = "254702597360"; // Masinde Muliro University Health Center
                break;
            case '2542219929':
                infoTextArea.value = "2542219929"; // Technical University of Kenya Medical Services
                break;
            case '0772894430':
                infoTextArea.value = "0772894430"; // Chuka University Emergency Line
                break;
            case '0203754386':
                infoTextArea.value = "0203754386"; // St. John Ambulance
                break;
            case '0700999999':
                infoTextArea.value = "0700999999"; // AAR Emergency Services
                break;
            default:
                infoTextArea.value = "";
                break;
        }
    }
    // Interactive Map functionality
    var map = L.map('map').setView([0, 0], 2); // Centered at (0, 0) with zoom level 2
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    // Define hospital locations and names
    var hospitals = [
        { name: 'Kenyatta National Hospital', location: [-1.2966, 36.7984] },
        { name: 'Moi Teaching and Referral Hospital', location: [0.0544, 35.0057] },
        { name: 'Nairobi Hospital', location: [-1.2857, 36.8219] },
        { name: 'Mater Hospital', location: [-1.3023, 36.8155] },
        { name: 'Aga Khan Hospital, Nairobi', location: [-1.2824, 36.7963] },
        { name: 'Kisumu County Hospital', location: [-0.1077, 34.7668] },
        { name: 'Coast General Hospital', location: [-4.0607, 39.6742] },
        { name: 'Eldoret Hospital', location: [0.5167, 35.2698] },
        { name: 'Kericho County Referral Hospital', location: [-0.3634, 35.2831] },
        { name: 'Nyeri County Referral Hospital', location: [-0.4214, 36.9474] },
        { name: 'Karatina Sub-County Hospital', location: [-0.4759, 37.0896] },
        { name: 'Embu Level 5 Hospital', location: [-0.5368, 37.4517] },
        { name: 'Kakamega County General Hospital', location: [0.2814, 34.7529] },
        { name: 'Bungoma County Referral Hospital', location: [0.5653, 34.5689] },
        { name: 'Nakuru Level 5 Hospital', location: [-0.2795, 36.0717] },
        { name: 'Machakos Level 5 Hospital', location: [-1.5231, 37.2592] },
        { name: 'Kajiado County Referral Hospital', location: [-1.7983, 36.7793] },
        { name: 'Garissa County Referral Hospital', location: [-0.4502, 39.6486] },
        { name: 'Mandera County Referral Hospital', location: [3.9385, 41.8622] },
        { name: 'Isiolo County Referral Hospital', location: [0.3517, 37.5828] },
        { name: 'Marsabit County Referral Hospital', location: [2.3372, 37.9894] },
        { name: 'Kitui County Referral Hospital', location: [-1.3685, 38.0151] },
        { name: 'Migori County Referral Hospital', location: [-1.0633, 34.4726] },
        { name: 'Homabay County Referral Hospital', location: [-0.5372, 34.4575] },
        { name: 'Siaya County Referral Hospital', location: [0.0626, 34.2884] },
        { name: 'Vihiga County Referral Hospital', location: [0.0595, 34.7222] },
    ];

    // Add markers for each hospital
    hospitals.forEach(function(hospital) {
        L.marker(hospital.location).addTo(map)
            .bindPopup(hospital.name);
    });
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
function checkSymptoms() {
    var symptoms = document.querySelectorAll('input[name="symptoms"]:checked');
    var selectedSymptoms = [];
    symptoms.forEach(function(symptom) {
        selectedSymptoms.push({"id": symptom.value});
    });

    var requestData = {
        "sex": "male", // Assuming default to male, can be dynamic based on user input
        "age": 30, // Assuming default age, can be dynamic based on user input
        "evidence": selectedSymptoms
    };

    fetch('https://api.infermedica.com/v3/diagnosis', {
        method: 'POST',
        mode: 'cors', // Add this line to enable CORS mode
        headers: {
            'Content-Type': 'application/json',
            'App-Id': 'c5d5fa88',
            'App-Key': 'd1386160b2e2409d464c52ccc2b2307e'
        },
        body: JSON.stringify(requestData)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        var diagnosisText = "Diagnosis Results:\n";
        data.conditions.forEach(function(condition) {
            diagnosisText += "- " + condition.name + "\n";
        });
        document.getElementById("diagnosisResults").value = diagnosisText;
    })
    .catch(error => {
        console.error('Error:', error);
    });
}
// Initialize Google Maps
function initMap() {
    // Map options
    var options = {
        zoom: 10,
        center: { lat: 0, lng: 0 }
    };
    // New map
    var map = new google.maps.Map(document.getElementById('map'), options);

    // Listen for form submission
    document.getElementById('location-button').addEventListener('click', function(event) {
        event.preventDefault();
        // Get user location input
        var location = document.getElementById('location-input').value;
        // Geocode location
        var geocoder = new google.maps.Geocoder();
        geocoder.geocode({ address: location }, function(results, status) {
            if (status == 'OK') {
                // Set map center to user location
                map.setCenter(results[0].geometry.location);
                // Place a marker at user location
                var marker = new google.maps.Marker({
                    map: map,
                    position: results[0].geometry.location
                });
                // Call function to find nearby hospitals
                findNearbyHospitals(results[0].geometry.location);
            } else {
                alert('Geocode was not successful for the following reason: ' + status);
            }
        });
    });
}

// Function to find nearby hospitals
function findNearbyHospitals(location) {
    // Your logic to find nearby hospitals using location
    // This function will be called when user submits their location
}
