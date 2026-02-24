 // Smooth scrolling for navigation
        document.querySelectorAll('nav a').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            });
        });

        // Add click handlers for game cards to make them playable
        document.querySelectorAll('.game-card').forEach(card => {
            card.addEventListener('click', function() {
                // Replace this with actual game loading logic
                // For example: window.location.href = 'games/game-name.html';
                console.log('Game clicked:', this.querySelector('h3').textContent);
            });
        });