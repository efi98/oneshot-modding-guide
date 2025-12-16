const SIDEBAR_ELEMENT = 'scrollTarget';

function copyCodeBlock(caller) {
    const content = caller.target.parentNode.querySelector("code").innerText.replace(/\u00a0/g, " ");
    navigator.clipboard.writeText(content).then(() => {
        console.log('Copied!');
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

function handleNavAndScroll(targetSelector, url) {
    localStorage.setItem(SIDEBAR_ELEMENT, targetSelector);
    window.location.href = url;
}

function scrollSidebarTo(element) {
    setTimeout(() => {
        element.scrollIntoView({behavior: 'smooth', block: 'start'});
    }, 300); // Adjust delay to match sidebar animation duration
}

function scrollSidebarElement() {
    const scrollTarget = localStorage.getItem(SIDEBAR_ELEMENT);
    if (scrollTarget) {
        const targetElement = document.querySelector(scrollTarget);
        if (targetElement) {
            scrollSidebarTo(targetElement);
        }
        localStorage.removeItem(SIDEBAR_ELEMENT);
    }
}

document.querySelectorAll('a.navtree').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const selector = `a.navtree[href="${link.getAttribute('href')}"]`;
        handleNavAndScroll(selector, link.href);
    });
});

window.onload = () => {
    hljs.highlightAll();
    const theme = loadTheme();
    toggleTheme(theme || 'dark');
    scrollSidebarElement();
}