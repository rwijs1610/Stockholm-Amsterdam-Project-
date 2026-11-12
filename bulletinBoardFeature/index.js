const openButton = document.getElementById("customer-service");
const closeButton = document.getElementById("close-btn");
const dropdown = document.getElementById("dropdown");
const messages = document.getElementById("messages");
const form = document.getElementById("message-form");
const input = document.getElementById("message-input");

openButton.addEventListener("click", function () {
    dropdown.classList.toggle("hidden");
});

closeButton.addEventListener("click", function () {
    dropdown.classList.add("hidden");
});

function addMessage(text, sender) {
    const message = document.createElement("div");
    message.classList.add("message", sender);
    message.textContent = text;
    messages.appendChild(message);
    messages.scrollTop = messages.scrollHeight;
}

function sendMessage(text) {
    if (text.trim() === "") {
        return;
    }
    addMessage(text, "user");
    input.value = "";

    setTimeout(function () {
        addMessage("Thanks! We'll get back to you as soon as we can.", "bot");
    }, 600);
}

form.addEventListener("submit", function (event) {
    event.preventDefault();
    sendMessage(input.value);
});

document.querySelectorAll(".quick-btn").forEach(function (button) {
    button.addEventListener("click", function () {
        sendMessage(button.dataset.question);
    });
});
