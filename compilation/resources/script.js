
function copyCodeBlock(caller) {
	const content = caller.target.parentNode.querySelector("code").innerText.replace(/\u00a0/g, " ");
	navigator.clipboard.writeText(content)
}

window.onload = () => {
	hljs.highlightAll()
}