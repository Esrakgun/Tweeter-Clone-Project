
// Import Alanı:
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";


console.log("API KEY:", import.meta.env.VITE_API_KEY);


// Firebase yapılandırmasını .env dosyasından al
const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: import.meta.env.VITE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_APP_ID
};

// Firebase'i başlat
const app = initializeApp(firebaseConfig);

// Google Sağlacısının Kurulumunu Yap:
export const google = new GoogleAuthProvider();

// Auth referansını al
export const auth = getAuth(app);

// Veritbanın referansını al
export const db = getFirestore(app);

// Medya depolama alanının referansını al
export const storage = getStorage(app);