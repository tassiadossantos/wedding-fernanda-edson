import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyDbFTkL05pZZSgzc4U76OUq7Amhi0AWICs",
  authDomain: "casamento-naiara-matheus.firebaseapp.com",
  projectId: "casamento-naiara-matheus",
  storageBucket: "casamento-naiara-matheus.firebasestorage.app",
  messagingSenderId: "271586865225",
  appId: "1:271586865225:web:a31b7edfb2c9b153038f98"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
