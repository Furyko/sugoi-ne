const switchModeBtn = document.getElementById('switch-mode-button')
switchModeBtn.addEventListener('click', (e) => {
    toggleDarkMode()
})

function toggleDarkMode() {
    document.documentElement.classList.toggle('dark-mode');
    if (document.documentElement.classList.contains('dark-mode')) {
        localStorage.setItem("dark-mode", true)
        switchModeBtn.innerHTML = '<i class="fas fa-moon"></i>'
    }
    else {
        localStorage.setItem("dark-mode", false)
        switchModeBtn.innerHTML = '<i class="fas fa-sun"></i>'
    }
}

function validateDarkMode() {
    const darkMode = localStorage.getItem('dark-mode')
    if (darkMode && darkMode == 'true') toggleDarkMode()
}

setTimeout(function() { validateDarkMode() }, 1);