# THE BURGER - QNA Website

A Q&A website inspired by The Amazing World of Gumball with animated stars and Firebase backend.

## Features

- 🌟 Animated starfield background (Gumball-style)
- 💬 Real-time question submission and display
- 🔥 Firebase Firestore integration
- 📱 Responsive design
- ✨ Custom fonts (Gumball.ttf and SaldaSoft-Black.otf)

## File Structure

```
burger-qna/
├── index.html          # Main HTML file
├── styles.css          # Styling and animations
├── app.js              # Main application logic
├── stars.js            # Star animation system
├── firebase-config.js  # Firebase configuration
├── fonts/              # Font files
│   ├── Gumball.ttf
│   └── SaldaSoft-Black.otf
└── README.md          # This file
```

## Setup Instructions

### 1. Firebase Setup

1. Go to the [Firebase Console](https://console.firebase.google.com/)
2. Create a new project or use an existing one
3. Enable Firestore Database
4. Set up Firestore security rules (example):

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /questions/{document} {
      allow read: if true;
      allow write: if request.auth == null && 
        request.resource.data.keys().hasAll(['username', 'question', 'timestamp']) &&
        request.resource.data.username is string &&
        request.resource.data.question is string &&
        request.resource.data.username.size() <= 50 &&
        request.resource.data.question.size() <= 500;
    }
  }
}
```

5. Get your Firebase config from Project Settings > General > Your apps
6. Replace the placeholder values in `firebase-config.js` with your actual config

### 2. Font Files

You'll need to obtain and add these font files to the `fonts/` directory:
- `Gumball.ttf` - For the main title
- `SaldaSoft-Black.otf` - For body text

### 3. Deployment

#### GitHub Pages
1. Push all files to your GitHub repository
2. Go to repository Settings > Pages
3. Select source branch (usually `main`)
4. Your site will be available at `https://yourusername.github.io/repository-name`

#### Local Development
1. Use a local server (Firebase CLI, Live Server, or Python's http.server)
2. Navigate to `http://localhost:port`

## Configuration

### Firebase Config
Edit `firebase-config.js` and replace with your Firebase project settings:

```javascript
const firebaseConfig = {
    apiKey: "your-actual-api-key",
    authDomain: "your-project.firebaseapp.com",
    projectId: "your-project-id",
    storageBucket: "your-project.appspot.com",
    messagingSenderId: "123456789",
    appId: "your-app-id"
};
```

### Firestore Collection
The app uses a collection called `questions` with documents containing:
- `username` (string) - User's name or "Anonymous"
- `question` (string) - The question text
- `timestamp` (timestamp) - When the question was submitted
- `answered` (boolean) - Whether it's been answered on stream

## Features Explanation

### Star Animation
- Inspired by The Amazing World of Gumball intro sequences
- Stars spawn from the left and travel across the screen
- Random sizes, speeds, and occasional "shooting stars"
- Continuous animation with cleanup

### Real-time Updates
- Questions appear instantly when submitted
- Uses Firestore real-time listeners
- Automatic refresh when new questions are added

### Responsive Design
- Works on desktop and mobile devices
- Grid layout adapts to screen size
- Glassmorphism UI effects

## Customization

### Colors
Edit the CSS variables in `styles.css` to change the color scheme:
- Background gradients in buttons
- Star colors and effects
- Text shadows and glows

### Animation Speed
Modify timing in `stars.js`:
- `duration` - How long stars take to cross screen
- `setInterval` delays - How often new stars spawn

### Form Limits
Adjust in HTML and JavaScript:
- `maxlength` attributes for input fields
- Validation in `submitQuestion()` method

## Troubleshooting

### Firebase Issues
- Check console for Firebase errors
- Verify Firestore rules allow anonymous writes
- Ensure Firebase config is correct

### Font Issues
- Make sure font files are in the correct `fonts/` directory
- Check that font file names match exactly in CSS
- Use browser dev tools to verify font loading

### Animation Performance
- Reduce `maxStars` in `stars.js` for slower devices
- Adjust animation duration for smoother performance

## License

This project is for educational/personal use. Make sure you have proper licenses for the fonts used.