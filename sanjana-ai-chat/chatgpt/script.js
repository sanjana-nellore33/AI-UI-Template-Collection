/* =====================================================
   DEFAULT CONVERSATIONS
===================================================== */

const defaultConversations = {

    website: {
        title: "Website project ideas",
        messages: [
            {
                type: "user",
                content: "Give me ideas for a website project"
            },
            {
                type: "ai",
                content: `
                Here are some website project ideas:

                <br><br>

                • E-commerce website
                <br>
                • Student management system
                <br>
                • Restaurant ordering system
                <br>
                • Portfolio website
                <br>
                • AI assistant interface
                `
            }
        ]
    },


    study: {
        title: "Study assistant",
        messages: [
            {
                type: "user",
                content: "Create a study plan for my exams"
            },
            {
                type: "ai",
                content: `
                Here's a simple study plan:

                <br><br>

                • Morning — Learn new concepts
                <br>
                • Afternoon — Practice problems
                <br>
                • Evening — Revise notes
                <br>
                • Night — Quick revision
                `
            }
        ]
    },


    travel: {
        title: "Travel planning",
        messages: [
            {
                type: "user",
                content: "Help me plan a trip"
            },
            {
                type: "ai",
                content: `
                I can help you create a travel plan
                including destinations, activities,
                food options and a day-by-day itinerary.
                `
            }
        ]
    },


    python: {
        title: "Python programming",
        messages: [
            {
                type: "user",
                content: "Help me learn Python programming"
            },
            {
                type: "ai",
                content: `
                Start with Python basics such as variables,
                data types, conditions, loops, functions,
                lists and dictionaries.

                <br><br>

                Then move on to object-oriented programming
                and projects.
                `
            }
        ]
    }

};


/* =====================================================
   GET ALL CONVERSATIONS
===================================================== */

function getConversations() {

    const saved =
        localStorage.getItem("allConversations");


    if (saved) {

        return JSON.parse(saved);

    }


    const initial = { ...defaultConversations };


    localStorage.setItem(
        "allConversations",
        JSON.stringify(initial)
    );


    return initial;
}


/* =====================================================
   SAVE ALL CONVERSATIONS
===================================================== */

function saveConversations(conversations) {

    localStorage.setItem(
        "allConversations",
        JSON.stringify(conversations)
    );

}


/* =====================================================
   GET CURRENT CHAT ID
===================================================== */

function getCurrentChatId() {

    const params =
        new URLSearchParams(
            window.location.search
        );


    return params.get("chat");

}


/* =====================================================
   CREATE UNIQUE CHAT ID
===================================================== */

function createChatId() {

    return "chat_" +
        Date.now() +
        "_" +
        Math.random()
            .toString(36)
            .substring(2, 8);

}


/* =====================================================
   CREATE NEW CHAT
===================================================== */

function createNewChat() {

    const conversations =
        getConversations();


    const chatId =
        createChatId();


    conversations[chatId] = {

        title: "New Chat",

        messages: []

    };


    saveConversations(
        conversations
    );


    window.location.href =
        "index.html?chat=" +
        encodeURIComponent(chatId);

}


/* =====================================================
   NEW CHAT BUTTON
===================================================== */

function newChat() {

    createNewChat();

}


/* =====================================================
   ADD MESSAGE TO PAGE
===================================================== */

function addMessage(
    type,
    content
) {

    const messages =
        document.getElementById(
            "messages"
        );


    if (!messages) {
        return;
    }


    if (type === "user") {

        messages.innerHTML += `

            <div class="message user-message">

                ${escapeHTML(content)}

            </div>

        `;

    } else {

        messages.innerHTML += `

            <div class="message ai-message">

                <strong>✦ AI:</strong>

                <br><br>

                ${content}

            </div>

        `;

    }

}


/* =====================================================
   SEND MESSAGE
===================================================== */

function sendMessage() {

    const input =
        document.getElementById(
            "promptInput"
        );


    const text =
        input.value.trim();


    if (text === "") {
        return;
    }


    let chatId =
        getCurrentChatId();


    /*
       If user types a message without
       creating a chat first, create one.
    */

    if (!chatId) {

        chatId =
            createChatId();


        const conversations =
            getConversations();


        conversations[chatId] = {

            title: createChatTitle(text),

            messages: []

        };


        saveConversations(
            conversations
        );


        window.history.replaceState(
            {},
            "",
            "index.html?chat=" +
            encodeURIComponent(chatId)
        );

    }


    const conversations =
        getConversations();


    if (!conversations[chatId]) {

        conversations[chatId] = {

            title: createChatTitle(text),

            messages: []

        };

    }


    /*
       Add user message
    */

    conversations[chatId].messages.push({

        type: "user",

        content: text

    });


    /*
       Generate AI response
    */

    const response =
        getAIResponse(text);


    /*
       Add AI response
    */

    conversations[chatId].messages.push({

        type: "ai",

        content: response

    });


    /*
       Give chat a title using
       the first question
    */

    if (
        conversations[chatId].title ===
        "New Chat"
    ) {

        conversations[chatId].title =
            createChatTitle(text);

    }


    saveConversations(
        conversations
    );


    /*
       Display messages
    */

    displayConversation(
        conversations[chatId]
    );


    input.value = "";


    scrollToBottom();


    /*
       Update sidebar
    */

    renderHistory();

}


/* =====================================================
   CREATE CHAT TITLE
===================================================== */

function createChatTitle(text) {

    let title =
        text.trim();


    if (title.length > 28) {

        title =
            title.substring(
                0,
                28
            ) + "...";

    }


    return title;

}


/* =====================================================
   AI RESPONSE
===================================================== */

function getAIResponse(text) {

    const question =
        text.toLowerCase();


    if (
        question.includes("python") ||
        question.includes("programming")
    ) {

        return `
        Python is a popular programming language used
        for web development, data science, artificial
        intelligence, automation and many other
        applications.

        <br><br>

        You can start learning Python with variables,
        data types, conditions, loops and functions.
        `;

    }


    if (
        question.includes("email") ||
        question.includes("mail")
    ) {

        return `
        <strong>Subject: Request for Information</strong>

        <br><br>

        Dear Sir/Madam,

        <br><br>

        I hope you are doing well. I am writing to request
        some information regarding the project. Please let
        me know the details at your convenience.

        <br><br>

        Thank you.
        <br>
        Best regards
        `;

    }


    if (
        question.includes("project") ||
        question.includes("project idea")
    ) {

        return `
        Here are some college project ideas:

        <br><br>

        1. Student Performance Analyzer
        <br>
        2. AI Chat Assistant
        <br>
        3. Online Food Ordering System
        <br>
        4. E-commerce Dashboard
        <br>
        5. Smart Attendance System
        `;

    }


    if (
        question.includes("study") ||
        question.includes("exam")
    ) {

        return `
        Here is a simple study plan:

        <br><br>

        • 1 hour — Learn concepts
        <br>
        • 30 minutes — Practice questions
        <br>
        • 30 minutes — Revise notes
        <br>
        • 20 minutes — Take a short test

        <br><br>

        Follow this schedule consistently and take
        short breaks between study sessions.
        `;

    }


    if (
        question.includes("ai") ||
        question.includes("artificial intelligence")
    ) {

        return `
        Artificial Intelligence (AI) is technology that
        enables computers to perform tasks that normally
        require human intelligence, such as learning,
        reasoning, understanding language and recognizing
        images.
        `;

    }


    if (
        question.includes("hello") ||
        question.includes("hi") ||
        question.includes("hey")
    ) {

        return `
        Hello! 👋

        <br><br>

        I'm your AI assistant.
        How can I help you today?
        `;

    }


    if (
        question.includes("java")
    ) {

        return `
        Java is a popular object-oriented programming
        language used for web applications, Android
        development, enterprise software and many other
        applications.

        <br><br>

        Java programs are designed to be portable across
        different platforms using the Java Virtual Machine.
        `;

    }


    if (
        question.includes("html")
    ) {

        return `
        HTML stands for HyperText Markup Language.

        <br><br>

        It is used to create the structure of web pages
        using elements such as headings, paragraphs,
        images, links, forms and buttons.
        `;

    }


    if (
        question.includes("css")
    ) {

        return `
        CSS stands for Cascading Style Sheets.

        <br><br>

        CSS is used to design web pages by controlling
        colors, fonts, spacing, layouts, animations and
        responsive behavior.
        `;

    }


    return `
    I understand your question.

    <br><br>

    This AI interface is a frontend demonstration
    designed to simulate an AI assistant and show
    different prompt-and-response interactions.
    `;

}


/* =====================================================
   DISPLAY CONVERSATION
===================================================== */

function displayConversation(
    conversation
) {

    const messages =
        document.getElementById(
            "messages"
        );


    const welcome =
        document.getElementById(
            "welcome"
        );


    if (!messages) {
        return;
    }


    messages.innerHTML = "";


    if (
        !conversation ||
        conversation.messages.length === 0
    ) {

        if (welcome) {

            welcome.style.display =
                "block";

        }

        return;

    }


    if (welcome) {

        welcome.style.display =
            "none";

    }


    conversation.messages.forEach(
        function(message) {

            addMessage(
                message.type,
                message.content
            );

        }
    );


    scrollToBottom();

}


/* =====================================================
   LOAD CURRENT CONVERSATION
===================================================== */

function loadCurrentConversation() {

    const chatId =
        getCurrentChatId();


    if (!chatId) {
        return;
    }


    const conversations =
        getConversations();


    const conversation =
        conversations[chatId];


    if (!conversation) {
        return;
    }


    displayConversation(
        conversation
    );

}


/* =====================================================
   OPEN HISTORY
===================================================== */

function openHistory(chatId) {

    window.location.href =
        "index.html?chat=" +
        encodeURIComponent(chatId);

}


/* =====================================================
   RENDER RECENT CHAT HISTORY
===================================================== */

function renderHistory() {

    const history =
        document.querySelector(
            ".history"
        );


    if (!history) {
        return;
    }


    const conversations =
        getConversations();


    history.innerHTML = `
        <p>Recent Chats</p>
    `;


    const ids =
        Object.keys(
            conversations
        );


    /*
       Show newest chats first
    */

    ids.reverse();


    ids.forEach(
        function(chatId) {

            const conversation =
                conversations[chatId];


            if (!conversation) {
                return;
            }


            const item =
                document.createElement(
                    "div"
                );


            item.textContent =
                conversation.title;


            item.onclick =
                function() {

                    openHistory(
                        chatId
                    );

                };


            history.appendChild(
                item
            );

        }
    );

}


/* =====================================================
   DELETE CHAT
===================================================== */

function deleteChat(chatId) {

    const conversations =
        getConversations();


    delete conversations[
        chatId
    ];


    saveConversations(
        conversations
    );


    renderHistory();


    /*
       If deleting current chat,
       create a new one.
    */

    if (
        getCurrentChatId() ===
        chatId
    ) {

        createNewChat();

    }

}


/* =====================================================
   SUGGESTION BUTTON
===================================================== */

function usePrompt(text) {

    const input =
        document.getElementById(
            "promptInput"
        );


    if (!input) {
        return;
    }


    input.value =
        text;


    sendMessage();

}


/* =====================================================
   ENTER KEY
===================================================== */

function handleEnter(event) {

    if (
        event.key === "Enter"
    ) {

        sendMessage();

    }

}


/* =====================================================
   SIDEBAR
===================================================== */

function toggleSidebar() {

    const sidebar =
        document.getElementById(
            "sidebar"
        );


    const overlay =
        document.getElementById(
            "overlay"
        );


    if (!sidebar) {
        return;
    }


    sidebar.classList.toggle(
        "closed"
    );


    if (
        window.innerWidth <= 700 &&
        overlay
    ) {

        overlay.classList.toggle(
            "active"
        );

    }

}


/* =====================================================
   SCROLL
===================================================== */

function scrollToBottom() {

    const chatContent =
        document.querySelector(
            ".chat-content"
        );


    if (chatContent) {

        chatContent.scrollTop =
            chatContent.scrollHeight;

    }

}


/* =====================================================
   ESCAPE HTML
===================================================== */

function escapeHTML(text) {

    const div =
        document.createElement(
            "div"
        );


    div.textContent =
        text;


    return div.innerHTML;

}


/* =====================================================
   ANSWER PAGE
===================================================== */

function loadAnswerPage() {

    const promptElement =
        document.getElementById(
            "selectedPrompt"
        );


    const answerElement =
        document.getElementById(
            "selectedAnswer"
        );


    if (
        !promptElement ||
        !answerElement
    ) {

        return;

    }


    const params =
        new URLSearchParams(
            window.location.search
        );


    const chatId =
        params.get("chat");


    if (!chatId) {
        return;
    }


    const conversations =
        getConversations();


    const conversation =
        conversations[chatId];


    if (!conversation) {
        return;
    }


    const messages =
        conversation.messages;


    /*
       Show the latest user question
    */

    const userMessages =
        messages.filter(
            function(message) {

                return message.type ===
                    "user";

            }
        );


    /*
       Show the latest AI answer
    */

    const aiMessages =
        messages.filter(
            function(message) {

                return message.type ===
                    "ai";

            }
        );


    if (
        userMessages.length > 0
    ) {

        promptElement.textContent =
            userMessages[
                userMessages.length - 1
            ].content;

    }


    if (
        aiMessages.length > 0
    ) {

        answerElement.innerHTML =
            aiMessages[
                aiMessages.length - 1
            ].content;

    }

}


/* =====================================================
   ANSWER PAGE FOLLOW-UP
===================================================== */

function sendAnswerPrompt() {

    const input =
        document.getElementById(
            "answerInput"
        );


    if (!input) {
        return;
    }


    const text =
        input.value.trim();


    if (text === "") {
        return;
    }


    const chatId =
        getCurrentChatId();


    if (chatId) {

        const conversations =
            getConversations();


        const conversation =
            conversations[chatId];


        if (conversation) {

            conversation.messages.push({

                type: "user",

                content: text

            });


            conversation.messages.push({

                type: "ai",

                content:
                    getAIResponse(text)

            });


            saveConversations(
                conversations
            );

        }

    }


    input.value = "";


    alert(
        "Demo response generated for: " +
        text
    );

}


/* =====================================================
   ANSWER PAGE ENTER
===================================================== */

function handleAnswerEnter(event) {

    if (
        event.key === "Enter"
    ) {

        sendAnswerPrompt();

    }

}


/* =====================================================
   RESPONSE BUTTONS
===================================================== */

function likeResponse() {

    alert(
        "You liked this response 👍"
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


    if (!answer) {
        return;
    }


    navigator.clipboard.writeText(
        answer.innerText
    );


    alert(
        "Response copied!"
    );

}


/* =====================================================
   PAGE LOAD
===================================================== */

document.addEventListener(
    "DOMContentLoaded",
    function() {

        renderHistory();

        loadCurrentConversation();

        loadAnswerPage();

    }
);