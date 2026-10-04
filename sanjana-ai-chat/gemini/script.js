let currentChatId = null;

function loadChats() {
    return JSON.parse(
        localStorage.getItem("geminiChats")
    ) || {};
}

function saveChats(chats) {
    localStorage.setItem(
        "geminiChats",
        JSON.stringify(chats)
    );
}

function toggleSidebar() {
    const sidebar =
        document.getElementById("sidebar");

    const overlay =
        document.getElementById("overlay");

    if (!sidebar) return;

    sidebar.classList.toggle("closed");

    if (
        overlay &&
        window.innerWidth <= 700
    ) {
        overlay.classList.toggle("active");
    }
}

function newChat() {
    currentChatId =
        "gemini_" + Date.now();

    const chats = loadChats();

    chats[currentChatId] = [];

    saveChats(chats);

    const messages =
        document.getElementById("messages");

    const welcome =
        document.getElementById("welcome");

    const input =
        document.getElementById("promptInput");

    if (messages) {
        messages.innerHTML = "";
    }

    if (welcome) {
        welcome.style.display = "block";
    }

    if (input) {
        input.value = "";
        input.focus();
    }

    renderHistory();

    if (
        !window.location.pathname.endsWith(
            "index.html"
        ) &&
        !window.location.pathname.endsWith("/")
    ) {
        location.href = "index.html";
    }
}

function sendMessage() {
    const input =
        document.getElementById("promptInput");

    if (!input) return;

    const text =
        input.value.trim();

    if (text === "") {
        return;
    }

    if (!currentChatId) {
        currentChatId =
            "gemini_" + Date.now();

        const chats = loadChats();

        chats[currentChatId] = [];

        saveChats(chats);
    }

    addMessage(text, "user");

    input.value = "";

    const response =
        generateResponse(text);

    setTimeout(function() {
        addMessage(response, "ai");
        saveMessage(text, response);
    }, 500);
}

function handleEnter(event) {
    if (event.key === "Enter") {
        sendMessage();
    }
}

function addMessage(text, type) {
    const welcome =
        document.getElementById("welcome");

    const messages =
        document.getElementById("messages");

    if (!messages) {
        return;
    }

    if (welcome) {
        welcome.style.display = "none";
    }

    const message =
        document.createElement("div");

    message.classList.add("message");

    if (type === "user") {
        message.classList.add(
            "user-message"
        );
    } else {
        message.classList.add(
            "ai-message"
        );
    }

    message.textContent = text;

    messages.appendChild(message);

    messages.scrollIntoView({
        behavior: "smooth",
        block: "end"
    });
}

function saveMessage(userText, aiText) {
    if (!currentChatId) return;

    const chats = loadChats();

    if (!chats[currentChatId]) {
        chats[currentChatId] = [];
    }

    chats[currentChatId].push({
        user: userText,
        ai: aiText
    });

    saveChats(chats);

    renderHistory();
}

function renderHistory() {
    const history =
        document.getElementById("history");

    if (!history) {
        return;
    }

    const chats = loadChats();

    history.innerHTML =
        '<p class="history-title">Recent</p>';

    Object.keys(chats)
        .reverse()
        .forEach(function(chatId) {

            const messages =
                chats[chatId];

            if (
                !messages ||
                messages.length === 0
            ) {
                return;
            }

            const item =
                document.createElement("div");

            item.classList.add(
                "history-item"
            );

            item.textContent =
                messages[0].user;

            item.onclick =
                function() {
                    openChat(chatId);
                };

            history.appendChild(item);
        });
}

function openChat(chatId) {
    const chats = loadChats();

    const messages =
        chats[chatId];

    if (
        !messages ||
        messages.length === 0
    ) {
        return;
    }

    currentChatId = chatId;

    const messageContainer =
        document.getElementById("messages");

    const welcome =
        document.getElementById("welcome");

    if (
        messageContainer &&
        welcome
    ) {
        messageContainer.innerHTML = "";

        welcome.style.display = "none";

        messages.forEach(
            function(message) {
                addMessage(
                    message.user,
                    "user"
                );

                addMessage(
                    message.ai,
                    "ai"
                );
            }
        );

        return;
    }

    location.href =
        "answer.html?chat=" +
        encodeURIComponent(chatId);
}

function usePrompt(text) {
    const input =
        document.getElementById("promptInput");

    if (!input) return;

    input.value = text;

    sendMessage();
}

function generateResponse(input) {
    const question =
        input.toLowerCase();

    if (
        question.includes("ai") ||
        question.includes(
            "artificial intelligence"
        )
    ) {
        return "Artificial Intelligence is technology that enables computers to perform tasks that normally require human intelligence, such as learning, reasoning, understanding language and recognizing patterns.";
    }

    if (
        question.includes("project")
    ) {
        return "Here are some college project ideas:\n\n1. AI Chat Assistant\n2. Student Performance Analyzer\n3. E-commerce Dashboard\n4. Online Food Ordering System\n5. Smart Attendance System.";
    }

    if (
        question.includes("study") ||
        question.includes("exam")
    ) {
        return "A simple study plan:\n\n• Learn concepts\n• Practice questions\n• Revise notes\n• Take a short test\n• Review mistakes\n\nTry to study consistently with short breaks.";
    }

    if (
        question.includes("email") ||
        question.includes("mail")
    ) {
        return "Subject: Request for Information\n\nDear Sir/Madam,\n\nI hope you are doing well. I am writing to request information regarding the project. Please let me know the details at your convenience.\n\nThank you.\nBest regards.";
    }

    if (
        question.includes("python")
    ) {
        return "Python is a beginner-friendly programming language used for web development, data science, automation and artificial intelligence. Start with variables, conditions, loops and functions.";
    }

    if (
        question.includes("programming")
    ) {
        return "Programming is the process of writing instructions that a computer can execute. Popular programming languages include Python, Java, C, C++ and JavaScript.";
    }

    if (
        question.includes("java")
    ) {
        return "Java is a popular object-oriented programming language used for web applications, Android development, enterprise software and many other applications.";
    }

    if (
        question.includes("html")
    ) {
        return "HTML stands for HyperText Markup Language. It is used to create the structure and content of web pages.";
    }

    if (
        question.includes("css")
    ) {
        return "CSS stands for Cascading Style Sheets. It is used to style web pages by controlling colors, layouts, fonts, spacing and responsive designs.";
    }

    if (
        question.includes("hello") ||
        question.includes("hi") ||
        question.includes("hey")
    ) {
        return "Hello! 👋 I am Gemini. How can I help you today?";
    }

    return "I can help you explore ideas, learn concepts, write content and work through questions. This Gemini interface is a frontend demonstration.";
}

function loadLatestGeminiResponse() {
    const chats = loadChats();

    const urlParams =
        new URLSearchParams(
            window.location.search
        );

    const requestedChat =
        urlParams.get("chat");

    let chatId =
        requestedChat;

    if (
        !chatId ||
        !chats[chatId]
    ) {
        const ids =
            Object.keys(chats);

        if (ids.length === 0) {
            return;
        }

        chatId =
            ids[ids.length - 1];
    }

    const messages =
        chats[chatId];

    if (
        !messages ||
        messages.length === 0
    ) {
        return;
    }

    currentChatId = chatId;

    const latest =
        messages[messages.length - 1];

    const prompt =
        document.getElementById(
            "selectedPrompt"
        );

    const answer =
        document.getElementById(
            "selectedAnswer"
        );

    if (prompt) {
        prompt.textContent =
            latest.user;
    }

    if (answer) {
        answer.textContent =
            latest.ai;
    }
}

function handleAnswerEnter(event) {
    if (event.key === "Enter") {
        sendAnswerPrompt();
    }
}

function sendAnswerPrompt() {
    const input =
        document.getElementById(
            "answerInput"
        );

    if (!input) return;

    const text =
        input.value.trim();

    if (text === "") {
        return;
    }

    const response =
        generateResponse(text);

    const prompt =
        document.getElementById(
            "selectedPrompt"
        );

    const answer =
        document.getElementById(
            "selectedAnswer"
        );

    if (prompt) {
        prompt.textContent = text;
    }

    if (answer) {
        answer.textContent =
            response;
    }

    input.value = "";
}

function likeResponse() {
    alert(
        "You liked this Gemini response 👍"
    );
}

function dislikeResponse() {
    alert(
        "Feedback recorded."
    );
}

function shareResponse() {
    alert(
        "Share option selected."
    );
}

function copyResponse() {
    const answer =
        document.getElementById(
            "selectedAnswer"
        );

    if (!answer) return;

    navigator.clipboard.writeText(
        answer.innerText
    );

    alert(
        "Response copied!"
    );
}

window.addEventListener(
    "DOMContentLoaded",
    function() {
        renderHistory();

        if (
            document.getElementById(
                "selectedAnswer"
            )
        ) {
            loadLatestGeminiResponse();
        }
    }
);