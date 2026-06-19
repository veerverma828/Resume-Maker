document.addEventListener('DOMContentLoaded', function () {
    const darkModeToggle = document.getElementById('toggleDarkMode');
    darkModeToggle.addEventListener('click', toggleDarkMode);

    function toggleDarkMode() {
        document.body.classList.toggle('dark-mode');
    }
});






