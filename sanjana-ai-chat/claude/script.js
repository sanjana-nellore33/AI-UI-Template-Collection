const HISTORY_KEY = "claudeHistory";

const responses = {
    ai: "Artificial Intelligence, or AI, is technology that allows computers to perform tasks that normally require human intelligence. AI can understand language, recognize patterns, analyze information, generate content, and help solve problems.",
    project: "Here are some simple college project ideas: an AI study assistant, student performance analyzer, expense tracker, online food ordering system, smart attendance management system, or an e-commerce analytics dashboard.",
    email: "A professional email should have a clear subject, polite greeting, short explanation of the purpose, necessary details, and a professional closing. Keep the message clear and concise.",
    python: "Python is a beginner-friendly programming language used for web development, automation, data analysis, artificial intelligence, and machine learning. Its simple syntax makes it easy to learn.",
    study: "A good study plan starts by dividing the subject into smaller topics. Study one topic at a time, practice with examples, revise regularly, and test yourself using questions or previous papers.",
    javascript: "JavaScript is a programming language used to make websites interactive. It can respond to button clicks, change page content, validate forms, store data, and create dynamic web applications."
};

function getResponse(prompt) {

    const text = prompt.toLowerCase();

    if (
        text.includes("artificial intelligence") ||
        text.includes(" ai") ||
        text === "ai"
    ) {
        return responses.ai;
    }

    if (text.includes("project")) {
        return responses.project;
    }

    if (
        text.includes("email") ||
        text.includes("mail")
    ) {
        return responses.email;
    }

    if (
        text.includes("python") ||
        text.includes("programming")
    ) {
        return responses.python;
    }

    if (
        text.includes("study") ||
        text.includes("exam")
    ) {
        return responses.study;
    }

    if (
        text.includes("javascript") ||
        text.includes(" js ")
    ) {
        return responses.javascript;
    }

    return "I can help you learn concepts, write content, brainstorm ideas, understand programming, analyze information, and solve problems. Tell me what you would like help with.";
}


/* HISTORY */

function getHistory() {

    try {
        return JSON.parse(localStorage.getItem(HISTORY_KEY)) || [];
    } catch {
        return [];
    }
}


function saveHistory(history) {

    localStorage.setItem(
        HISTORY_KEY,
        JSON.stringify(history)
    );
}


function addToHistory(prompt, answer) {

    const history = getHistory();

    const chat = {
        id: Date.now().toString(),
        title: prompt.length > 35
            ? prompt.substring(0, 35) + "..."
            : prompt,
        prompt: prompt,
        answer: answer
    };

    history.unshift(chat);

    if (history.length > 15) {
        history.pop();
    }

    saveHistory(history);

    localStorage.setItem(
        "claudeCurrentChat",
        chat.id
    );
}


function renderHistory() {

    const historyList =
        document.getElementById("historyList");

    if (!historyList) return;

    const history = getHistory();

    historyList.innerHTML = "";

    if (history.length === 0) {

        historyList.innerHTML = `
            <div style="
                padding:10px;
                color:#918a84;
                font-size:12px;
            ">
                No recent chats
            </div>
        `;

        return;
    }

    history.forEach(chat => {

        const item = document.createElement("div");

        item.className = "history-item";

        item.innerHTML = `
            <span
                class="history-title"
                onclick="openChat('${chat.id}')"
            >
                ${escapeHTML(chat.title)}
            </span>

            <button
                class="delete-chat"
                onclick="deleteChat(event, '${chat.id}')"
            >
                ×
            </button>
        `;

        historyList.appendChild(item);
    });
}


function openChat(id) {

    localStorage.setItem(
        "claudeCurrentChat",
        id
    );

    window.location.href =
        "answer.html?chat=" + encodeURIComponent(id);
}


function deleteChat(event, id) {

    event.stopPropagation();

    let history = getHistory();

    history = history.filter(
        chat => chat.id !== id
    );

    saveHistory(history);

    const current =
        localStorage.getItem("claudeCurrentChat");

    if (current === id) {
        localStorage.removeItem("claudeCurrentChat");
    }

    renderHistory();
}


/* NEW CHAT */

function createNewChat() {

    localStorage.removeItem("claudeCurrentChat");

    window.location.href = "index.html";
}


/* SEND MESSAGE */

function sendMessage() {

    const input =
        document.getElementById("promptInput");

    if (!input) return;

    const prompt = input.value.trim();

    if (!prompt) return;

    const answer = getResponse(prompt);

    addToHistory(prompt, answer);

    window.location.href = "answer.html";
}


function usePrompt(prompt) {

    const input =
        document.getElementById("promptInput");

    if (!input) return;

    input.value = prompt;

    input.focus();
}


/* LOAD ANSWER */

function loadCurrentChat() {

    const messages =
        document.getElementById("conversationMessages");

    if (!messages) return;

    const params =
        new URLSearchParams(window.location.search);

    const requestedChat =
        params.get("chat");

    const currentId =
        requestedChat ||
        localStorage.getItem("claudeCurrentChat");

    const history = getHistory();

    const chat =
        history.find(item => item.id === currentId);

    if (!chat) {

        messages.innerHTML = `
            <div class="ai-message">
                <div class="message-label">Claude</div>
                <div class="ai-text">
                    <p>Welcome to Claude. Start a new conversation by asking a question.</p>
                </div>
            </div>
        `;

        return;
    }

    messages.innerHTML = `

        <div class="user-message">

            <div class="message-label">
                You
            </div>

            <div class="user-text">
                ${escapeHTML(chat.prompt)}
            </div>

        </div>

        <div class="ai-message">

            <div class="message-label">
                Claude
            </div>

            <div class="ai-text">
                <p>${escapeHTML(chat.answer)}</p>
            </div>

            <div class="answer-actions">

                <button onclick="copyAnswer()">
                    Copy
                </button>

                <button onclick="regenerate()">
                    Regenerate
                </button>

                <button onclick="shareAnswer()">
                    Share
                </button>

            </div>

        </div>
    `;
}


/* FOLLOW UP */

function sendFollowUp() {

    const input =
        document.getElementById("followupInput");

    if (!input) return;

    const prompt =
        input.value.trim();

    if (!prompt) return;

    const answer =
        getResponse(prompt);

    addToHistory(prompt, answer);

    window.location.href = "answer.html";
}


/* ACTIONS */

function copyAnswer() {

    const currentId =
        localStorage.getItem("claudeCurrentChat");

    const history = getHistory();

    const chat =
        history.find(item => item.id === currentId);

    if (!chat) return;

    navigator.clipboard.writeText(chat.answer);

    alert("Answer copied!");
}


function regenerate() {

    const currentId =
        localStorage.getItem("claudeCurrentChat");

    const history = getHistory();

    const index =
        history.findIndex(
            item => item.id === currentId
        );

    if (index === -1) return;

    history[index].answer =
        getResponse(history[index].prompt);

    saveHistory(history);

    loadCurrentChat();
}


function shareAnswer() {

    alert("Share link copied!");
}


/* NAVIGATION */

function openUpgrade() {

    window.location.href =
        "upgrade.html";
}


function goHome() {

    window.location.href =
        "index.html";
}


function upgradeDemo() {

    alert("Upgrade demo completed!");
}


function showMessage(message) {

    alert(message);
}


/* MOBILE SIDEBAR */

function toggleSidebar() {

    const sidebar =
        document.getElementById("sidebar");

    const overlay =
        document.getElementById("overlay");

    if (!sidebar || !overlay) return;

    sidebar.classList.toggle("open");

    overlay.classList.toggle("show");
}


/* ENTER KEY */

document.addEventListener(
    "DOMContentLoaded",
    function () {

        renderHistory();

        loadCurrentChat();

        const promptInput =
            document.getElementById("promptInput");

        if (promptInput) {

            promptInput.addEventListener(
                "keydown",
                function (event) {

                    if (
                        event.key === "Enter" &&
                        !event.shiftKey
                    ) {

                        event.preventDefault();

                        sendMessage();
                    }
                }
            );
        }

        const followupInput =
            document.getElementById("followupInput");

        if (followupInput) {

            followupInput.addEventListener(
                "keydown",
                function (event) {

                    if (event.key === "Enter") {

                        event.preventDefault();

                        sendFollowUp();
                    }
                }
            );
        }
    }
);


/* SECURITY */

function escapeHTML(text) {

    return String(text)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}



