let knowledgeBase = [];

async function loadKnowledge() {

    const response = await fetch("info.json");

    const data = await response.json();

    knowledgeBase = data.questions;
}

function findAnswer(userInput) {

    userInput = userInput.toLowerCase();

    for (const item of knowledgeBase) {

        if (
            userInput.includes(
                item.question.toLowerCase()
            )
        ) {
            return item.answer;
        }
    }

    return "Sorry, I don't know that answer.";
}

const sendBtn = document.getElementById("send-btn");
const input = document.getElementById("user-input");

sendBtn.addEventListener("click", sendMessage);

function sendMessage() {

    const question = input.value.trim();

    if (!question) return;

    addMessage(question, "user");

    const answer = findAnswer(question);

    addMessage(answer, "bot");

    input.value = "";
}

input.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
        sendMessage();
    }
});

function addMessage(text, type) {

    const chatBox =
        document.getElementById("chat-box");

    const div =
        document.createElement("div");

    div.classList.add("message");
    div.classList.add(type);

    div.textContent = text;

    chatBox.appendChild(div);

    chatBox.scrollTop =
        chatBox.scrollHeight;
}

loadKnowledge();