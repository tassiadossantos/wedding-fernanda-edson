import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyCuAbU3qshrk8ZYv8g2o5823teYmcsqeA",
  authDomain: "casamento-fernanda-edson0210.firebaseapp.com",
  projectId: "casamento-fernanda-edson0210",
  storageBucket: "casamento-fernanda-edson0210.firebasestorage.app",
  messagingSenderId: "405228262970",
  appId: "1:405228262970:web:08e9f813b8a1cc169f0703"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
