const HISTORY_KEY = "perplexitySearchHistory";


const responses = {

    ai: {
        answer: `Artificial intelligence is developing rapidly across areas such as generative AI, multimodal systems, AI agents, and automated research.

Modern AI systems can understand text, images, audio and other forms of information. Generative AI is also being used for writing, coding, research and productivity.

AI agents are another important direction because they can perform multi-step tasks instead of only responding to individual prompts.

For students and developers, AI is becoming useful as a research assistant, coding helper and learning companion.`,
        sources: [
            ["IBM Research", "Artificial intelligence research and developments"],
            ["Stanford AI", "Research and trends in artificial intelligence"],
            ["MIT Technology Review", "Technology and AI developments"]
        ],
        related: [
            "What are the latest AI trends?",
            "How do AI agents work?",
            "What is generative AI?"
        ]
    },


    python: {
        answer: `Python is a popular programming language known for its readable syntax and large ecosystem.

It is widely used in web development, data science, machine learning, automation and education.

Python is often recommended for beginners because its syntax is relatively simple and allows students to focus on programming concepts rather than complicated language rules.`,
        sources: [
            ["Python.org", "Official Python documentation and resources"],
            ["Real Python", "Python programming tutorials and guides"],
            ["GeeksforGeeks", "Programming concepts and examples"]
        ],
        related: [
            "Why is Python good for beginners?",
            "What can Python be used for?",
            "Python vs JavaScript"
        ]
    },


    javascript: {
        answer: `JavaScript is a programming language mainly used to make websites interactive.

It runs directly in web browsers and can also be used on servers through environments such as Node.js.

JavaScript is commonly used with HTML and CSS to build modern web applications, dashboards and interactive interfaces.`,
        sources: [
            ["MDN Web Docs", "JavaScript documentation and web development guides"],
            ["JavaScript.info", "JavaScript tutorials and language concepts"],
            ["Node.js", "JavaScript runtime documentation"]
        ],
        related: [
            "What is JavaScript used for?",
            "JavaScript vs Python",
            "How does JavaScript work in browsers?"
        ]
    },


    machine: {
        answer: `Machine learning is a branch of artificial intelligence in which computer systems learn patterns from data.

A typical machine learning workflow includes collecting data, preparing features, training a model, evaluating its performance and using the model to make predictions.

Common approaches include supervised learning, unsupervised learning and reinforcement learning.`,
        sources: [
            ["Google Machine Learning", "Machine learning concepts and guides"],
            ["IBM", "Machine learning explanations and resources"],
            ["Scikit-learn", "Machine learning tools and documentation"]
        ],
        related: [
            "What are the types of machine learning?",
            "How does supervised learning work?",
            "What is deep learning?"
        ]
    },


    study: {
        answer: `Effective studying usually combines active recall, spaced repetition, practice and focused study sessions.

Instead of repeatedly reading the same material, students can test themselves using questions, explain concepts in their own words and revisit difficult topics over several days.

Breaking large subjects into smaller goals can also make revision easier and more manageable.`,
        sources: [
            ["Learning Scientists", "Evidence-based learning strategies"],
            ["Harvard Learning", "Learning and study resources"],
            ["Cornell University", "Study skills and academic resources"]
        ],
        related: [
            "What is active recall?",
            "How does spaced repetition work?",
            "How can I study more effectively?"
        ]
    },


    default: {
        answer: `Here is a research-style overview of your question.

The best way to understand a topic is to compare information from multiple reliable sources and look for evidence that supports the main claims.

For an in-depth research task, consider the topic from different perspectives, check the publication date of important sources and distinguish established facts from opinions or predictions.

This Perplexity interface demonstrates how an AI search system can combine a generated answer with source references and related questions.`,
        sources: [
            ["Wikipedia", "General reference information"],
            ["Britannica", "Educational reference material"],
            ["Google Scholar", "Academic research and publications"]
        ],
        related: [
            "Can you explain this in more detail?",
            "What are the main points to remember?",
            "What are reliable sources for this topic?"
        ]
    }

};


function getHistory() {

    try {
        return JSON.parse(
            localStorage.getItem(HISTORY_KEY) || "[]"
        );
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


function addToHistory(question, result) {

    const history = getHistory();

    const search = {
        id: Date.now(),
        title: question.length > 38
            ? question.substring(0, 38) + "..."
            : question,
        question: question,
        answer: result.answer,
        sources: result.sources,
        related: result.related,
        time: new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit"
        })
    };

    history.unshift(search);

    saveHistory(history);

    renderHistory();

    return search.id;

}


function renderHistory() {

    const historyList =
        document.getElementById("historyList");

    if (!historyList) {
        return;
    }

    const history = getHistory();

    if (history.length === 0) {

        historyList.innerHTML =
            '<div class="empty-history">No recent searches</div>';

        return;
    }

    historyList.innerHTML = history.map(search => `

        <div class="history-item">

            <div
                class="history-title"
                onclick="openSearch(${search.id})"
            >
                ${escapeHTML(search.title)}
            </div>

            <button
                class="delete-search"
                onclick="deleteSearch(event, ${search.id})"
                title="Delete search"
            >
                ×
            </button>

        </div>

    `).join("");

}


function openSearch(id) {

    window.location.href =
        `answer.html?search=${id}`;

}


function deleteSearch(event, id) {

    event.stopPropagation();

    const history =
        getHistory().filter(
            search => search.id !== id
        );

    saveHistory(history);

    renderHistory();

}


function createNewSearch() {

    window.location.href = "index.html";

}


function getResult(question) {

    const lower =
        question.toLowerCase();

    if (
        lower.includes("python")
    ) {
        return responses.python;
    }

    if (
        lower.includes("javascript") ||
        lower.includes(" js ")
    ) {
        return responses.javascript;
    }

    if (
        lower.includes("machine learning") ||
        lower.includes("ml ")
    ) {
        return responses.machine;
    }

    if (
        lower.includes("study") ||
        lower.includes("exam") ||
        lower.includes("learning technique")
    ) {
        return responses.study;
    }

    if (
        lower.includes("artificial intelligence") ||
        lower.includes(" ai ") ||
        lower.includes("ai trends") ||
        lower.includes("generative ai")
    ) {
        return responses.ai;
    }

    return responses.default;

}


function searchQuestion() {

    const input =
        document.getElementById("searchInput");

    if (!input) {
        return;
    }

    const question =
        input.value.trim();

    if (!question) {
        return;
    }

    const result =
        getResult(question);

    const id =
        addToHistory(question, result);

    window.location.href =
        `answer.html?search=${id}`;

}


function usePrompt(prompt) {

    const input =
        document.getElementById("searchInput");

    if (!input) {
        return;
    }

    input.value = prompt;

    input.focus();

}


function handleEnter(event) {

    if (
        event.key === "Enter" &&
        !event.shiftKey
    ) {

        event.preventDefault();

        searchQuestion();

    }

}


function loadCurrentSearch() {

    const container =
        document.getElementById(
            "conversationMessages"
        );

    if (!container) {
        return;
    }

    const params =
        new URLSearchParams(
            window.location.search
        );

    const searchId =
        Number(
            params.get("search")
        );

    const history =
        getHistory();

    let search =
        history.find(
            item => item.id === searchId
        );

    if (!search && history.length > 0) {
        search = history[0];
    }

    if (!search) {

        container.innerHTML = `
            <div class="empty-answer">
                <h2>No search found</h2>
                <p>Start a new research question.</p>
            </div>
        `;

        return;
    }


    container.innerHTML = `

        <div class="search-answer">

            <div class="answer-summary">

                <p>
                    ${formatAnswer(search.answer)}
                </p>

            </div>


            <div class="sources-title">
                Sources
            </div>


            <div class="sources">

                ${search.sources.map(
                    (source, index) => `

                    <button
                        class="source-card"
                        onclick="showMessage('Source ${index + 1} opened')"
                    >

                        <div class="source-number">
                            [${index + 1}]
                        </div>

                        <div class="source-name">
                            ${escapeHTML(source[0])}
                        </div>

                        <div class="source-description">
                            ${escapeHTML(source[1])}
                        </div>

                    </button>

                `).join("")}

            </div>


            <div class="answer-actions">

                <button onclick="copyAnswer()">
                    Copy
                </button>

                <button onclick="regenerateSearch()">
                    Regenerate
                </button>

                <button onclick="shareAnswer()">
                    Share
                </button>

            </div>

        </div>

    `;


    const title =
        document.getElementById("answerTitle");

    if (title) {
        title.textContent =
            search.title;
    }


    renderRelated(search.related);

}


function renderRelated(questions) {

    const container =
        document.getElementById(
            "relatedQuestions"
        );

    if (!container) {
        return;
    }

    container.innerHTML =
        questions.map(
            question => `

            <button
                class="related-question"
                onclick="askRelated('${escapeAttribute(question)}')"
            >
                ${escapeHTML(question)}
            </button>

        `
        ).join("");

}


function askRelated(question) {

    const result =
        getResult(question);

    const id =
        addToHistory(question, result);

    window.location.href =
        `answer.html?search=${id}`;

}


function sendFollowUp() {

    const input =
        document.getElementById(
            "followupInput"
        );

    if (!input) {
        return;
    }

    const question =
        input.value.trim();

    if (!question) {
        return;
    }

    askRelated(question);

}


function handleFollowupEnter(event) {

    if (
        event.key === "Enter" &&
        !event.shiftKey
    ) {

        event.preventDefault();

        sendFollowUp();

    }

}


function copyAnswer() {

    const params =
        new URLSearchParams(
            window.location.search
        );

    const id =
        Number(params.get("search"));

    const search =
        getHistory().find(
            item => item.id === id
        );

    if (!search) {
        return;
    }

    navigator.clipboard.writeText(
        search.answer
    );

    showMessage("Answer copied");

}


function regenerateSearch() {

    const params =
        new URLSearchParams(
            window.location.search
        );

    const id =
        Number(params.get("search"));

    const history =
        getHistory();

    const search =
        history.find(
            item => item.id === id
        );

    if (!search) {
        return;
    }

    const result =
        getResult(search.question);

    search.answer =
        result.answer;

    search.sources =
        result.sources;

    search.related =
        result.related;

    saveHistory(history);

    loadCurrentSearch();

    showMessage("Answer regenerated");

}


function shareAnswer() {

    const params =
        new URLSearchParams(
            window.location.search
        );

    const id =
        Number(params.get("search"));

    const search =
        getHistory().find(
            item => item.id === id
        );

    if (!search) {
        return;
    }

    if (navigator.share) {

        navigator.share({
            title: "Perplexity Research",
            text: search.answer
        });

    } else {

        navigator.clipboard.writeText(
            search.answer
        );

        showMessage(
            "Answer copied for sharing"
        );

    }

}


function openUpgrade() {

    window.location.href =
        "upgrade.html";

}


function goHome() {

    window.location.href =
        "index.html";

}


function upgradeDemo() {

    showMessage(
        "Upgrade selected — demo mode"
    );

}


function showMessage(message) {

    const existing =
        document.querySelector(
            ".toast-message"
        );

    if (existing) {
        existing.remove();
    }

    const toast =
        document.createElement("div");

    toast.className =
        "toast-message";

    toast.textContent =
        message;

    document.body.appendChild(
        toast
    );

    setTimeout(() => {

        toast.remove();

    }, 1800);

}


function toggleSidebar() {

    const sidebar =
        document.getElementById("sidebar");

    const overlay =
        document.getElementById("overlay");

    if (!sidebar || !overlay) {
        return;
    }

    sidebar.classList.toggle("open");

    overlay.classList.toggle("show");

}


function formatAnswer(answer) {

    return escapeHTML(answer)
        .replace(
            /\n\n/g,
            "</p><p>"
        )
        .replace(
            /\n/g,
            "<br>"
        )
        .replace(
            /\[1\]/g,
            '<span class="citation">[1]</span>'
        )
        .replace(
            /\[2\]/g,
            '<span class="citation">[2]</span>'
        )
        .replace(
            /\[3\]/g,
            '<span class="citation">[3]</span>'
        );

}


function escapeHTML(value) {

    return String(value)
        .replace(
            /&/g,
            "&amp;"
        )
        .replace(
            /</g,
            "&lt;"
        )
        .replace(
            />/g,
            "&gt;"
        )
        .replace(
            /"/g,
            "&quot;"
        )
        .replace(
            /'/g,
            "&#039;"
        );

}


function escapeAttribute(value) {

    return String(value)
        .replace(
            /\\/g,
            "\\\\"
        )
        .replace(
            /'/g,
            "\\'"
        );

}


document.addEventListener(
    "DOMContentLoaded",
    () => {

        renderHistory();

        loadCurrentSearch();

    }
);