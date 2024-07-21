const switchModeBtn = document.getElementById('switch-mode-button')
switchModeBtn.addEventListener('click', (e) => {
    document.documentElement.classList.toggle('dark-mode');
})