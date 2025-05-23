// Star animation inspired by The Amazing World of Gumball
class StarField {
    constructor() {
        this.container = document.getElementById('starfield');
        this.stars = [];
        this.maxStars = 15;
        this.init();
    }

    init() {
        this.createStars();
        this.animate();
    }

    createStar() {
        const star = document.createElement('div');
        star.className = 'star';
        
        // Random size between 2px and 6px
        const size = Math.random() * 4 + 2;
        star.style.width = size + 'px';
        star.style.height = size + 'px';
        
        // Random vertical position
        star.style.top = Math.random() * window.innerHeight + 'px';
        
        // Start from left side
        star.style.left = '-50px';
        
        // Random animation duration between 2s and 4s
        const duration = Math.random() * 2 + 2;
        star.style.animationDuration = duration + 's';
        
        // Random delay to stagger stars
        const delay = Math.random() * 2;
        star.style.animationDelay = delay + 's';
        
        // Add some sparkle effect
        if (Math.random() > 0.7) {
            star.style.boxShadow = `0 0 ${size * 2}px rgba(255, 255, 255, 0.8)`;
        }
        
        this.container.appendChild(star);
        
        // Remove star after animation completes
        setTimeout(() => {
            if (star.parentNode) {
                star.parentNode.removeChild(star);
            }
        }, (duration + delay) * 1000);
        
        return star;
    }

    createStars() {
        // Create initial batch of stars
        for (let i = 0; i < this.maxStars; i++) {
            setTimeout(() => {
                this.createStar();
            }, i * 200);
        }
    }

    animate() {
        // Continuously create new stars
        setInterval(() => {
            if (document.querySelectorAll('.star').length < this.maxStars * 2) {
                this.createStar();
            }
        }, 300 + Math.random() * 200);
    }

    // Create shooting stars occasionally
    createShootingStar() {
        const star = document.createElement('div');
        star.className = 'star shooting-star';
        
        const size = Math.random() * 3 + 4;
        star.style.width = size + 'px';
        star.style.height = size + 'px';
        star.style.top = Math.random() * (window.innerHeight * 0.6) + 'px';
        star.style.left = '-50px';
        star.style.background = 'linear-gradient(45deg, #fff, #4ecdc4, #ff6b6b)';
        star.style.boxShadow = `0 0 ${size * 3}px rgba(255, 255, 255, 0.9)`;
        star.style.animationDuration = '1.5s';
        
        this.container.appendChild(star);
        
        setTimeout(() => {
            if (star.parentNode) {
                star.parentNode.removeChild(star);
            }
        }, 1500);
    }

    startShootingStars() {
        // Create shooting stars every 8-15 seconds
        setInterval(() => {
            if (Math.random() > 0.3) {
                this.createShootingStar();
            }
        }, 8000 + Math.random() * 7000);
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    const starField = new StarField();
    
    // Start shooting stars after a delay
    setTimeout(() => {
        starField.startShootingStars();
    }, 3000);
    
    // Handle window resize
    window.addEventListener('resize', () => {
        // Clear existing stars and restart
        const stars = document.querySelectorAll('.star');
        stars.forEach(star => star.remove());
        starField.createStars();
    });
});