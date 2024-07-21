const switchModeBtn = document.getElementById('switch-mode-button')
switchModeBtn.addEventListener('click', (e) => {
    toggleDarkMode()
})

function toggleDarkMode() {
    document.documentElement.classList.toggle('dark-mode');
    if (document.documentElement.classList.contains('dark-mode')) localStorage.setItem("dark-mode", true)
    else localStorage.setItem("dark-mode", false)
}

function startPage() {
    const darkMode = localStorage.getItem('dark-mode')
    if (darkMode && darkMode == 'true') toggleDarkMode()
}

setTimeout(function() { startPage() }, 1);