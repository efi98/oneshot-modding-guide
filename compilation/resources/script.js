
function copyCodeBlock(caller) {
	const content = caller.target.parentNode.querySelector("code").innerText.replace(/\u00a0/g, " ");
	navigator.clipboard.writeText(content)
}

window.onload = () => {
	hljs.highlightAll()
}

function toggleTheme() {
    document.body.classList.toggle('light');
    const icon = document.getElementById('theme-icon');
    if (document.body.classList.contains('light')) {
        icon.textContent = '☀️';
    } else {
        icon.textContent = '🌙';
    }
}