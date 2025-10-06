    const toggleBtn = document.getElementById('theme-toggle');
    const currentTheme = localStorage.getItem('theme');

    if (currentTheme === 'dark') {
      document.body.classList.add('dark');
      toggleBtn.textContent = '☀️ Light Mode';
    }

    toggleBtn.addEventListener('click', () => {
      document.body.classList.toggle('dark');
      if (document.body.classList.contains('dark')) {
        toggleBtn.textContent = '☀️ Light Mode';
        localStorage.setItem('theme', 'dark');
      } else {
        toggleBtn.textContent = '🌙 Dark Mode';
        localStorage.setItem('theme', 'light');
      }
    });