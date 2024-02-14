// Define emergency numbers for universities
var emergencyNumbers = {
    "dedan-kimathi": "0712 524 222",
    "university-of-nairobi": "0712 345 678",
    "moi-university": "0721 987 654",
    "kenyatta-university": "0733 456 789",
    "strathmore-university": "0701 234 567",
    "egerton-university": "0722 345 678",
    "jkuat": "0711 222 333",
    "maseno-university": "0700 111 222",
    "university-of-eldoret": "0710 555 666",
    "mmust": "0720 444 555",
    "technical-university-of-kenya": "0731 777 888",
    "multi-media-university": "0713 888 999",
    "kisii-university": "0714 111 222",
    "kisumu-university": "0723 333 444",
    "pioneer-international-university": "0732 999 000",
    "kabarak-university": "0702 000 111",
    "africa-nazarene-university": "0724 666 777",
    "laikipia-university": "0715 888 999",
    "daystar-university": "0703 222 333",
    "chuka-university": "0716 555 666"
    // Add more universities and emergency numbers as needed
};

function displayEmergencyNumber() {
    var selectElement = document.getElementById("university-select");
    var selectedUniversity = selectElement.options[selectElement.selectedIndex].text;
    var emergencyNumber = emergencyNumbers[selectElement.value];
    var textareaElement = document.getElementById("emergency-number-textarea");
    textareaElement.value = selectedUniversity + ": " + emergencyNumber;
}