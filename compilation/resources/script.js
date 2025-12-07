function copyCodeBlock(caller) {
    const content = caller.target.parentNode.querySelector("code").innerText.replace(/\u00a0/g, " ");
    navigator.clipboard.writeText(content).then(r => {
        console.log('Copied!', r);
    })
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

function showSidebar() {
    const side = document.getElementsByTagName('aside')[0];
    const backdrop = document.getElementById('side-backdrop');
    side.classList.add('active');
    side.style.display = 'block';
    backdrop.style.display = 'block';
}

function hideSidebar() {
    const side = document.getElementsByTagName('aside')[0];
    const backdrop = document.getElementById('side-backdrop');
    side.classList.remove('active');
    side.style.display = '';
    backdrop.style.display = 'none';
}

window.onload = () => {
    hljs.highlightAll();
    const theme = loadTheme();
    toggleTheme(theme || 'dark');
}