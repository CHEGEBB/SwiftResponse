// Define the emergency contact numbers
var emergencyNumbers = {
    "112": "Police Emergency Line",
    "999": "Medical Emergency Services",
    "1199": "Kenya Red Cross Ambulance Services",
    "0703050313": "Flying Doctors Society of Africa",
    "0707375375": "Amref Flying Doctors",
    "0203754386": "St. John Ambulance",
    "0700395395": "Nairobi Poison Control Center",
    "0700474747": "National Spinal Injury Hospital",
    "0709841000": "Aga Khan University Hospital Ambulance",
    "0730644000": "Gertrude’s Children’s Hospital Ambulance",
    "0700102170": "SOS Children's Villages Kenya",
    "0709121000": "Kijabe Hospital Ambulance",
    "0733632400": "Nairobi West Hospital Ambulance",
    "0706078000": "Avenue Group of Hospitals Ambulance",
    "0722566363": "PCEA Kikuyu Hospital Ambulance",
    "0730631345": "Karen Hospital Ambulance",
    "0790290000": "Mater Hospital Ambulance",
    "0710670000": "Nairobi Women's Hospital Ambulance",
    "0734740000": "M.P. Shah Hospital Ambulance",
    "0703040000": "Aga Khan University Hospital - Kisumu Ambulance",
    "0721268000": "Eldoret Hospital Ambulance",
    "0720993000": "Coast General Hospital Ambulance",
    "0701554114": "Nairobi Hospital Ambulance",
    "0703020000": "Tenwek Hospital Ambulance",
    "0709178000": "Pandya Memorial Hospital Ambulance",
    "0709314000": "Coptic Hospital Ambulance",
    "0702117000": "Nairobi Metropolitan Services Ambulance",
    "0730641111": "The Nairobi Hospital - Outpatient Centre, Kiambu Road Ambulance",
    "0730651000": "MP Shah Outpatient Center, Kilimani Ambulance",
    "0729773306": "Radiant Group of Hospitals Ambulance",
};

// Function to display the selected emergency number
document.getElementById("display-number-btn").addEventListener("click", function() {
    var selectedNumber = document.getElementById("emergency-select").value;
    var selectedNumberName = emergencyNumbers[selectedNumber];
    document.getElementById("displayed-number").value = selectedNumber + " - " + selectedNumberName;
});

// Function to handle calling the selected emergency number (to be implemented later)
document.getElementById("call-number-btn").addEventListener("click", function() {
    var selectedNumber = document.getElementById("emergency-select").value;
    // Implement calling functionality here
});



var map = L.map('map').setView([-1.2921, 36.8219], 6);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

var roadsData = [
    { name: 'Mombasa Road', location: [-1.3167, 36.8219], traffic: 'Heavy', accidentProbability: 0.2 },
    { name: 'Thika Road', location: [-1.2000, 36.9167], traffic: 'Moderate', accidentProbability: 0.1 },
    { name: 'Waiyaki Way', location: [-1.2634, 36.7564], traffic: 'Light', accidentProbability: 0.05 },
    { name: 'Kisumu-Kakamega Road', location: [0.0914, 34.7677], traffic: 'Heavy', accidentProbability: 0.15 },
    { name: 'Eldoret-Nakuru Highway', location: [0.5237, 35.2760], traffic: 'Moderate', accidentProbability: 0.1 },
    { name: 'Nairobi-Nakuru Highway', location: [-0.7874, 36.3544], traffic: 'Light', accidentProbability: 0.05 },
    { name: 'Nairobi-Mombasa Highway', location: [-2.6566, 37.2587], traffic: 'Heavy', accidentProbability: 0.2 },
    { name: 'Nairobi-Nyeri Highway', location: [-0.3742, 36.9647], traffic: 'Moderate', accidentProbability: 0.1 },
    { name: 'Kisumu-Busia Road', location: [0.2331, 34.7229], traffic: 'Light', accidentProbability: 0.05 },
    { name: 'Nairobi-Kisumu Highway', location: [-0.3544, 35.1987], traffic: 'Heavy', accidentProbability: 0.15 },
    { name: 'Nairobi-Thika Highway', location: [-1.0489, 37.0692], traffic: 'Moderate', accidentProbability: 0.1 },
    { name: 'Mombasa-Malindi Highway', location: [-3.4436, 39.4718], traffic: 'Light', accidentProbability: 0.05 },
    { name: 'Machakos-Mombasa Road', location: [-1.4857, 37.2602], traffic: 'Heavy', accidentProbability: 0.2 },
    { name: 'Kiambu-Kikuyu Road', location: [-1.2048, 36.6797], traffic: 'Moderate', accidentProbability: 0.1 },
    { name: 'Nairobi-Garissa Road', location: [-1.2898, 36.8314], traffic: 'Light', accidentProbability: 0.05 },
    { name: 'Nairobi-Machakos Highway', location: [-1.5133, 37.2635], traffic: 'Heavy', accidentProbability: 0.15 },
    { name: 'Mombasa-Lamu Road', location: [-3.4894, 39.8428], traffic: 'Moderate', accidentProbability: 0.1 },
    { name: 'Kisumu-Kericho Road', location: [-0.1216, 35.0674], traffic: 'Light', accidentProbability: 0.05 },
    { name: 'Nairobi-Namanga Road', location: [-1.5291, 36.9141], traffic: 'Heavy', accidentProbability: 0.2 },
    { name: 'Nairobi-Nyahururu Road', location: [-0.3673, 36.4550], traffic: 'Moderate', accidentProbability: 0.1 },
    { name: 'Nairobi-Malindi Highway', location: [-3.2267, 40.1211], traffic: 'Light', accidentProbability: 0.05 },
    { name: 'Thika-Garissa Road', location: [-1.0401, 37.1033], traffic: 'Heavy', accidentProbability: 0.15 },
    { name: 'Nairobi-Embu Highway', location: [-0.5276, 37.4431], traffic: 'Moderate', accidentProbability: 0.1 },
    { name: 'Eldoret-Kapsabet Road', location: [0.5164, 35.2698], traffic: 'Light', accidentProbability: 0.05 },
    { name: 'Nairobi-Ngong Road', location: [-1.3167, 36.6667], traffic: 'Heavy', accidentProbability: 0.2 },
    // Add more road data as needed
];

function getMarkerColor(traffic) {
    switch (traffic) {
        case 'Heavy':
            return 'red';
        case 'Moderate':
            return 'orange';
        case 'Light':
            return 'green';
        default:
            return 'gray';
    }
}

function hasAccident(accidentProbability) {
    return Math.random() < accidentProbability;
}

roadsData.forEach(function(road) {
    var markerColor = getMarkerColor(road.traffic);
    var marker = L.circleMarker(road.location, {
        color: markerColor,
        fillColor: markerColor,
        fillOpacity: 0.5,
        radius: 8
    }).addTo(map);
    
    if (hasAccident(road.accidentProbability)) {
        marker.bindPopup(`<strong>${road.name}</strong><br>Traffic: ${road.traffic}<br>Accident: Yes`);
    } else {
        marker.bindPopup(`<strong>${road.name}</strong><br>Traffic: ${road.traffic}<br>Accident: No`);
    }
});
