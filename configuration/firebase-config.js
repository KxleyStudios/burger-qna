// Firebase configuration
// Replace these values with your actual Firebase project configuration
const firebaseConfig = {
  apiKey: "AIzaSyApldCw8aX6CjZIrlp73FoXMoiNE5WYu98",
  authDomain: "burgerqna.firebaseapp.com",
  projectId: "burgerqna",
  storageBucket: "burgerqna.firebasestorage.app",
  messagingSenderId: "253455777875",
  appId: "1:253455777875:web:c9773a156820f3254046a6"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Initialize Firestore
const db = firebase.firestore();

// Export for use in other files
window.db = db;