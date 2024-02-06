document.addEventListener("DOMContentLoaded", function() {
    // Hospital list carousel functionality
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
});
