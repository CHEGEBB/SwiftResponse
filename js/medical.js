
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

    // Event listener for the "Display Number" button
    var displayNumberBtn = document.getElementById("display-number-btn");
    displayNumberBtn.addEventListener("click", showNumber);

    // Interactive Map functionality
    var map = L.map('map').setView([0, 0], 2); // Centered at (0, 0) with zoom level 2
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    // Define hospital locations and names
    var hospitals = [
        { name: 'The Aga Khan Hospital', location: [1.2921, 36.8219] },
        { name: 'Nairobi Hospital', location: [-1.2921, 36.8219] },
        { name: 'Kenyatta National Hospital', location: [-1.2921, 36.8219] },
           { name: 'Mater Hospital', location: [-1.2921, 36.8219] },
           { name: 'Gertrude’s Children’s Hospital', location: [-1.2921, 36.8219] },
           { name: 'Avenue Hospital', location: [-1.2921, 36.8219] },
           { name: 'Karen Hospital', location: [-1.2921, 36.8219] },
           { name: 'Coptic Hospital', location: [-1.2921, 36.8219] },
           { name: 'MP Shah Hospital', location: [-1.2921, 36.8219] },
           { name: 'Nairobi West Hospital', location: [-1.2921, 36.8219] },
           { name: 'Nairobi Women’s Hospital', location: [-1.2921, 36.8219] },
           { name: 'Aga Khan University Hospital', location: [-1.2921, 36.8219] },
           { name: 'Kenyatta University Hospital', location: [-1.2921, 36.8219] },
           { name: 'Moi Teaching and Referral Hospital', location: [-1.2921, 36.8219] },
           { name: 'Eldoret Hospital', location: [-1.2921, 36.8219] },
           { name: 'Kisumu County Hospital', location: [-1.2921, 36.8219] },
           { name: 'Mombasa Hospital', location: [-1.2921, 36.8219] },
           { name: 'Coast General Hospital', location: [-1.2921, 36.8219] },
           { name: 'Pandya Memorial Hospital', location: [-1.2921, 36.8219] },
           { name: 'Aga Khan Hospital, Mombasa', location: [-1.2921, 36.8219] },
           { name: 'Aga Khan Hospital, Kisumu', location: [-1.2921, 36.8219] },
           { name: 'Aga Khan Hospital, Eldoret', location: [-1.2921, 36.8219] },
           { name: 'Aga Khan Hospital, Nanyuki', location: [-1.2921, 36.8219] },
           { name: 'Aga Khan Hospital, Meru', location: [-1.2921, 36.8219] },
           { name: 'Aga Khan Hospital, Nakuru', location: [-1.2921, 36.8219] },
           { name: 'Aga Khan Hospital, Kericho', location: [-1.2921, 36.8219] },
           { name: 'Aga Khan Hospital, Kisii', location: [-1.2921, 36.8219] },
           { name: 'Aga Khan Hospital, Kakamega', location: [-1.2921, 36.8219] },
           { name: 'Aga Khan Hospital, Bungoma', location: [-1.2921, 36.8219] },
           { name: 'Aga Khan Hospital, Kitale', location: [-1.2921, 36.8219] },
           { name: 'Aga Khan Hospital, Busia', location: [-1.2921, 36.8219] },
           { name: 'Aga Khan Hospital, Malindi', location: [-1.2921, 36.8219] },
           { name: 'Aga Khan Hospital, Kilifi', location: [-1.2921, 36.8219] },
           { name: 'Aga Khan Hospital, Lamu', location: [-1.2921, 36.8219] },
           { name: 'Aga Khan Hospital, Taita Taveta', location: [-1.2921, 36.8219] },
           { name: 'Aga Khan Hospital, Kwale', location: [-1.2921, 36.8219] },
           { name: 'Aga Khan Hospital, Tana River', location: [-1.2921, 36.8219] },
           { name: 'Aga Khan Hospital, Garissa', location: [-1.2921, 36.8219] },
           { name: 'Aga Khan Hospital, Wajir', location: [-1.2921, 36.8219] },
           { name: 'Aga Khan Hospital, Mandera', location: [-1.2921, 36.8219] },
    ];

    // Add markers for each hospital
    hospitals.forEach(function(hospital) {
        L.marker(hospital.location).addTo(map)
            .bindPopup(hospital.name);
    });
});
