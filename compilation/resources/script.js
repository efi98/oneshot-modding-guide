function copyCodeBlock(caller) {
    const content = caller.target.parentNode.querySelector("code").innerText.replace(/\u00a0/g, " ");
    navigator.clipboard.writeText(content)
}

function toggleTheme(theme = null) {
    if (theme !== 'dark') {
        document.body.classList.toggle('light');
    }
    const icon = document.getElementById('theme-icon');
    if (document.body.classList.contains('light')) {
        setTheme('light');
        icon.textContent = '☀️';
    } else {
        setTheme('dark');
        icon.textContent = '🌙';
    }
}

function loadTheme() {
    let theme = localStorage.getItem('theme');
    return theme ?? '';
}

function setTheme(theme) {
    localStorage.setItem('theme', theme);
}

window.onload = () => {
    hljs.highlightAll();
    const theme = loadTheme();
    toggleTheme(theme);
}