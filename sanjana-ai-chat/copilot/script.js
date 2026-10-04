const HISTORY_KEY = "copilotHistory";

const responses = {
    "python": `Here is a clean Python example:

def find_max(numbers):
    return max(numbers)

numbers = [10, 25, 7, 42, 18]
result = find_max(numbers)

print("Maximum:", result)

This function uses Python's built-in max() function and returns the largest value.`,

    "javascript": `Here is a simple JavaScript example:

function greetUser(name) {
    return "Hello, " + name + "!";
}

const message = greetUser("Developer");
console.log(message);

The function accepts a name and returns a greeting.`,

    "debug": `Let's debug the code step by step.

Common things to check:
1. Check the error message.
2. Check variable names and data types.
3. Check loops and conditions.
4. Check function arguments.
5. Add console.log() or print() statements.

Paste the code you want to debug and the exact error message for a more specific fix.`,

    "html": `Here is a basic HTML structure:

<!DOCTYPE html>
<html>
<head>
    <title>My Page</title>
</head>
<body>
    <h1>Hello World</h1>
</body>
</html>

HTML defines the structure and content of a webpage.`,

    "css": `Here is a simple CSS example:

.container {
    max-width: 900px;
    margin: 0 auto;
    padding: 20px;
}

CSS controls the appearance, spacing and layout of the webpage.`,

    "java": `Here is a simple Java example:

public class Main {
    public static void main(String[] args) {
        int a = 10;
        int b = 20;

        System.out.println(a + b);
    }
}

This program creates two integers and prints their sum.`,

    "react": `A basic React component can look like this:

function Welcome() {
    return (
        <h1>Welcome to my application</h1>
    );
}

export default Welcome;

React components let you build reusable user-interface elements.`,

    "git": `Useful Git commands for a development workflow:

git status
git add .
git commit -m "Add changes"
git push

Use git status before committing to check which files have changed.`,

    "github": `A typical GitHub workflow is:

1. Create or clone a repository.
2. Create a feature branch.
3. Make your changes.
4. Commit the changes.
5. Push the branch.
6. Open a Pull Request.
7. Review and merge the changes.`,

    "code": `I can help you with:

• Writing code
• Debugging errors
• Explaining code
• Converting code
• Improving performance
• Git and GitHub workflows
• HTML, CSS and JavaScript
• Python, Java and other programming languages

Paste your code or describe what you want to build.`,

    "default": `I can help with software development tasks such as writing code, debugging, explaining algorithms, improving code, and working with Git and GitHub.

Try asking me something like:

"Write a Python sorting program"
"Debug this JavaScript code"
"Explain recursion"
"How do I create a Git branch?"`
};

function getHistory() {
    return JSON.parse(localStorage.getItem(HISTORY_KEY) || "[]");
}

function saveHistory(history) {
    localStorage.setItem(HISTORY_KEY, JSON.stringify(history));
}

function addToHistory(prompt, answer) {
    const history = getHistory();

    const chat = {
        id: Date.now(),
        title: prompt.length > 32 ? prompt.substring(0, 32) + "..." : prompt,
        prompt: prompt,
        answer: answer,
        time: new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit"
        })
    };

    history.unshift(chat);

    saveHistory(history);
    renderHistory();

    return chat.id;
}

function renderHistory() {
    const historyList = document.getElementById("historyList");

    if (!historyList) {
        return;
    }

    const history = getHistory();

    if (history.length === 0) {
        historyList.innerHTML =
            '<div class="empty-history">No recent chats</div>';
        return;
    }

    historyList.innerHTML = history.map(chat => `
        <div class="history-item">
            <div class="history-title" onclick="openChat(${chat.id})">
                ${escapeHTML(chat.title)}
            </div>

            <button
                class="delete-chat"
                onclick="deleteChat(event, ${chat.id})"
                title="Delete chat"
            >
                ×
            </button>
        </div>
    `).join("");
}

function openChat(id) {
    window.location.href = `answer.html?chat=${id}`;
}

function deleteChat(event, id) {
    event.stopPropagation();

    const history = getHistory().filter(chat => chat.id !== id);

    saveHistory(history);
    renderHistory();
}

function createNewChat() {
    window.location.href = "index.html";
}

function getResponse(text) {
    const lower = text.toLowerCase();

    if (
        lower.includes("debug") ||
        lower.includes("bug") ||
        lower.includes("error") ||
        lower.includes("fix")
    ) {
        return responses.debug;
    }

    if (lower.includes("python")) {
        return responses.python;
    }

    if (
        lower.includes("javascript") ||
        lower.includes("js")
    ) {
        return responses.javascript;
    }

    if (lower.includes("html")) {
        return responses.html;
    }

    if (lower.includes("css")) {
        return responses.css;
    }

    if (lower.includes("java")) {
        return responses.java;
    }

    if (lower.includes("react")) {
        return responses.react;
    }

    if (
        lower.includes("git") ||
        lower.includes("github") ||
        lower.includes("branch") ||
        lower.includes("commit") ||
        lower.includes("pull request")
    ) {
        return responses.git;
    }

    if (
        lower.includes("code") ||
        lower.includes("program") ||
        lower.includes("function") ||
        lower.includes("algorithm")
    ) {
        return responses.code;
    }

    return responses.default;
}

function sendMessage() {
    const input = document.getElementById("promptInput");

    if (!input) {
        return;
    }

    const prompt = input.value.trim();

    if (!prompt) {
        return;
    }

    const answer = getResponse(prompt);

    const id = addToHistory(prompt, answer);

    window.location.href = `answer.html?chat=${id}`;
}

function usePrompt(prompt) {
    const input = document.getElementById("promptInput");

    if (!input) {
        return;
    }

    input.value = prompt;
    input.focus();
}

function handleEnter(event) {
    if (event.key === "Enter" && !event.shiftKey) {
        event.preventDefault();
        sendMessage();
    }
}

function loadCurrentChat() {
    const container = document.getElementById("conversationMessages");

    if (!container) {
        return;
    }

    const params = new URLSearchParams(window.location.search);
    const chatId = Number(params.get("chat"));

    const history = getHistory();

    let chat = history.find(item => item.id === chatId);

    if (!chat && history.length > 0) {
        chat = history[0];
    }

    if (!chat) {
        container.innerHTML = `
            <div class="empty-answer">
                <h2>No conversation found</h2>
                <p>Start a new coding conversation with Copilot.</p>
                <button onclick="goHome()">Start coding</button>
            </div>
        `;
        return;
    }

    container.innerHTML = `
        <div class="user-message">
            <div class="message-label">You</div>
            <div class="message-content">
                ${escapeHTML(chat.prompt)}
            </div>
        </div>

        <div class="ai-message">
            <div class="message-label">
                <span class="copilot-small-icon">✦</span>
                Copilot
            </div>

            <div class="message-content answer-content">
                ${formatAnswer(chat.answer)}
            </div>

            <div class="answer-actions">
                <button onclick="copyAnswer()">Copy</button>
                <button onclick="regenerate()">Regenerate</button>
                <button onclick="shareAnswer()">Share</button>
            </div>
        </div>

        <div class="followup-box">
            <textarea
                id="followupInput"
                placeholder="Ask a follow-up about the code..."
                rows="2"
                onkeydown="handleFollowupEnter(event)"
            ></textarea>

            <button onclick="sendFollowUp()">Send ➤</button>
        </div>
    `;

    const title = document.getElementById("answerTitle");

    if (title) {
        title.textContent = chat.title;
    }
}

function formatAnswer(answer) {
    const escaped = escapeHTML(answer);

    return escaped
        .replace(/\n\n/g, "</p><p>")
        .replace(/\n/g, "<br>");
}

function sendFollowUp() {
    const input = document.getElementById("followupInput");

    if (!input) {
        return;
    }

    const prompt = input.value.trim();

    if (!prompt) {
        return;
    }

    const answer = getResponse(prompt);

    const history = getHistory();

    const params = new URLSearchParams(window.location.search);
    const chatId = Number(params.get("chat"));

    const chat = history.find(item => item.id === chatId);

    if (chat) {
        chat.prompt = prompt;
        chat.answer = answer;
        chat.title = prompt.length > 32
            ? prompt.substring(0, 32) + "..."
            : prompt;

        saveHistory(history);
    }

    loadCurrentChat();
    renderHistory();
}

function handleFollowupEnter(event) {
    if (event.key === "Enter" && !event.shiftKey) {
        event.preventDefault();
        sendFollowUp();
    }
}

function copyAnswer() {
    const params = new URLSearchParams(window.location.search);
    const chatId = Number(params.get("chat"));

    const chat = getHistory().find(item => item.id === chatId);

    if (!chat) {
        return;
    }

    navigator.clipboard.writeText(chat.answer);

    showMessage("Answer copied");
}

function regenerate() {
    const params = new URLSearchParams(window.location.search);
    const chatId = Number(params.get("chat"));

    const history = getHistory();
    const chat = history.find(item => item.id === chatId);

    if (!chat) {
        return;
    }

    chat.answer = getResponse(chat.prompt);

    saveHistory(history);
    loadCurrentChat();

    showMessage("Answer regenerated");
}

function shareAnswer() {
    const params = new URLSearchParams(window.location.search);
    const chatId = Number(params.get("chat"));

    const chat = getHistory().find(item => item.id === chatId);

    if (!chat) {
        return;
    }

    if (navigator.share) {
        navigator.share({
            title: "Copilot Answer",
            text: chat.answer
        });
    } else {
        navigator.clipboard.writeText(chat.answer);
        showMessage("Answer copied for sharing");
    }
}

function openUpgrade() {
    window.location.href = "upgrade.html";
}

function goHome() {
    window.location.href = "index.html";
}

function upgradeDemo() {
    showMessage("Upgrade selected — demo mode");
}

function showMessage(message) {
    const toast = document.createElement("div");

    toast.textContent = message;

    toast.style.position = "fixed";
    toast.style.bottom = "25px";
    toast.style.left = "50%";
    toast.style.transform = "translateX(-50%)";
    toast.style.background = "#24292f";
    toast.style.color = "#ffffff";
    toast.style.padding = "10px 18px";
    toast.style.borderRadius = "7px";
    toast.style.fontSize = "13px";
    toast.style.zIndex = "100";

    document.body.appendChild(toast);

    setTimeout(() => {
        toast.remove();
    }, 1800);
}

function toggleSidebar() {
    const sidebar = document.getElementById("sidebar");
    const overlay = document.getElementById("overlay");

    if (!sidebar || !overlay) {
        return;
    }

    sidebar.classList.toggle("open");
    overlay.classList.toggle("show");
}

function escapeHTML(value) {
    return String(value)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}

document.addEventListener("DOMContentLoaded", () => {
    renderHistory();
    loadCurrentChat();
});