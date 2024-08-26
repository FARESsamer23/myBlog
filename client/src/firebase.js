// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "my-blog-228f6.firebaseapp.com",
  projectId: "my-blog-228f6",
  storageBucket: "my-blog-228f6.appspot.com",
  messagingSenderId: "96162277854",
  appId: "1:96162277854:web:cb8a7abe50abfd6ee0d54f"
};


// Initialize Firebase
 export const app = initializeApp(firebaseConfig);