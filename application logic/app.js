// Main application functionality
class BurgerQNA {
    constructor() {
        this.questionsContainer = document.getElementById('questionsContainer');
        this.questionForm = document.getElementById('questionForm');
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.loadQuestions();
        this.setupRealTimeUpdates();
    }

    setupEventListeners() {
        this.questionForm.addEventListener('submit', (e) => {
            e.preventDefault();
            this.submitQuestion();
        });
    }

    async submitQuestion() {
        const usernameInput = document.getElementById('username');
        const questionInput = document.getElementById('question');
        
        const username = usernameInput.value.trim() || 'Anonymous';
        const questionText = questionInput.value.trim();
        
        if (!questionText) {
            this.showMessage('Please enter a question!', 'error');
            return;
        }

        try {
            // Add question to Firestore
            await window.db.collection('questions').add({
                username: username,
                question: questionText,
                timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                answered: false
            });

            // Clear form
            usernameInput.value = '';
            questionInput.value = '';
            
            this.showMessage('Question submitted successfully!', 'success');
        } catch (error) {
            console.error('Error submitting question:', error);
            this.showMessage('Error submitting question. Please try again.', 'error');
        }
    }

    async loadQuestions() {
        try {
            const snapshot = await window.db.collection('questions')
                .orderBy('timestamp', 'desc')
                .limit(20)
                .get();

            this.displayQuestions(snapshot.docs);
        } catch (error) {
            console.error('Error loading questions:', error);
            this.questionsContainer.innerHTML = '<div class="error">Error loading questions. Please refresh the page.</div>';
        }
    }

    setupRealTimeUpdates() {
        // Listen for new questions in real-time
        window.db.collection('questions')
            .orderBy('timestamp', 'desc')
            .limit(20)
            .onSnapshot((snapshot) => {
                this.displayQuestions(snapshot.docs);
            }, (error) => {
                console.error('Error in real-time updates:', error);
            });
    }

    displayQuestions(docs) {
        if (docs.length === 0) {
            this.questionsContainer.innerHTML = '<div class="loading">No questions yet. Be the first to ask!</div>';
            return;
        }

        const questionsHTML = docs.map(doc => {
            const data = doc.data();
            const timestamp = data.timestamp ? data.timestamp.toDate() : new Date();
            
            return `
                <div class="question-item">
                    <div class="question-author">${this.escapeHtml(data.username)}</div>
                    <div class="question-text">${this.escapeHtml(data.question)}</div>
                    <div class="question-time">${this.formatTime(timestamp)}</div>
                </div>
            `;
        }).join('');

        this.questionsContainer.innerHTML = questionsHTML;
    }

    showMessage(message, type) {
        // Remove existing messages
        const existingMessages = document.querySelectorAll('.success, .error');
        existingMessages.forEach(msg => msg.remove());

        // Create new message
        const messageDiv = document.createElement('div');
        messageDiv.className = type;
        messageDiv.textContent = message;
        
        // Insert after form
        this.questionForm.parentNode.insertBefore(messageDiv, this.questionForm.nextSibling);
        
        // Remove message after 5 seconds
        setTimeout(() => {
            if (messageDiv.parentNode) {
                messageDiv.parentNode.removeChild(messageDiv);
            }
        }, 5000);
    }

    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    formatTime(date) {
        const now = new Date();
        const diffInMinutes = Math.floor((now - date) / (1000 * 60));
        
        if (diffInMinutes < 1) {
            return 'Just now';
        } else if (diffInMinutes < 60) {
            return `${diffInMinutes} minute${diffInMinutes > 1 ? 's' : ''} ago`;
        } else if (diffInMinutes < 1440) {
            const hours = Math.floor(diffInMinutes / 60);
            return `${hours} hour${hours > 1 ? 's' : ''} ago`;
        } else {
            const days = Math.floor(diffInMinutes / 1440);
            return `${days} day${days > 1 ? 's' : ''} ago`;
        }
    }
}

// Initialize the app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Wait a bit for Firebase to initialize
    setTimeout(() => {
        if (window.db) {
            new BurgerQNA();
        } else {
            document.getElementById('questionsContainer').innerHTML = 
                '<div class="error">Firebase not configured. Please check firebase-config.js</div>';
        }
    }, 1000);
});