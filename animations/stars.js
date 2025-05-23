// Star animation inspired by The Amazing World of Gumball
class StarField {
    constructor() {
        this.container = document.getElementById('starfield');
        this.stars = [];
        this.maxStars = 20;
        this.init();
    }

    init() {
        // Start creating stars immediately
        this.createInitialStars();
        this.animate();
    }

    createStar() {
        const star = document.createElement('div');
        star.className = 'star';
        
        // Random size between 1px and 5px
        const size = Math.random() * 4 + 1;
        star.style.width = size + 'px';
        star.style.height = size + 'px';
        
        // Random vertical position
        star.style.top = Math.random() * window.innerHeight + 'px';
        
        // Start from left side (off screen)
        star.style.left = '-20px';
        
        // Random animation duration between 2s and 5s
        const duration = Math.random() * 3 + 2;
        star.style.animationDuration = duration + 's';
        
        // Random delay to stagger stars (0 to 1 second)
        const delay = Math.random() * 1;
        star.style.animationDelay = delay + 's';
        
        // Add some sparkle effect randomly
        if (Math.random() > 0.6) {
            star.style.boxShadow = `0 0 ${size * 3}px rgba(255, 255, 255, 0.8)`;
        }
        
        this.container.appendChild(star);
        
        // Remove star after animation completes
        setTimeout(() => {
            if (star.parentNode) {
                star.parentNode.removeChild(star);
            }
        }, (duration + delay) * 1000 + 500);
        
        return star;
    }

    createInitialStars() {
        // Create stars with shorter delays initially
        for (let i = 0; i < this.maxStars; i++) {
            setTimeout(() => {
                this.createStar();
            }, i * 100);
        }
    }

    animate() {
        // Continuously create new stars
        setInterval(() => {
            const currentStars = document.querySelectorAll('.star').length;
            if (currentStars < this.maxStars * 1.5) {
                this.createStar();
            }
        }, 200 + Math.random() * 300);
    }

    // Create shooting stars occasionally
    createShootingStar() {
        const star = document.createElement('div');
        star.className = 'star shooting-star';
        
        const size = Math.random() * 3 + 3;
        star.style.width = size + 'px';
        star.style.height = size + 'px';
        star.style.top = Math.random() * (window.innerHeight * 0.7) + 'px';
        star.style.left = '-30px';
        star.style.background = 'linear-gradient(45deg, #fff, #4ecdc4, #ff6b6b)';
        star.style.boxShadow = `0 0 ${size * 4}px rgba(255, 255, 255, 0.9)`;
        star.style.animationDuration = '1.2s';
        star.style.borderRadius = '50%';
        
        this.container.appendChild(star);
        
        setTimeout(() => {
            if (star.parentNode) {
                star.parentNode.removeChild(star);
            }
        }, 1200);
    }

    startShootingStars() {
        // Create shooting stars every 5-10 seconds
        setInterval(() => {
            if (Math.random() > 0.4) {
                this.createShootingStar();
            }
        }, 5000 + Math.random() * 5000);
    }
}

// Initialize immediately when script loads
const starField = new StarField();

// Start shooting stars after a delay
setTimeout(() => {
    starField.startShootingStars();
}, 2000);

// Handle window resize
window.addEventListener('resize', () => {
    // Clear existing stars and restart
    const stars = document.querySelectorAll('.star');
    stars.forEach(star => star.remove());
    starField.createInitialStars();
});