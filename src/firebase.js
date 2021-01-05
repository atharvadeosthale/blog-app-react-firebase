import firebase from "firebase";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDjPEFs16fO5bwZn5fvGaqfkxAm25A_LCQ",
  authDomain: "blog-app-firebase-51f15.firebaseapp.com",
  projectId: "blog-app-firebase-51f15",
  storageBucket: "blog-app-firebase-51f15.appspot.com",
  messagingSenderId: "1060530942430",
  appId: "1:1060530942430:web:a8b2acd24a141d2317ad4f",
  measurementId: "G-YQBJGBDGHK",
};

const app = firebase.initializeApp(firebaseConfig);
export const auth = app.auth();
export const db = app.firestore();
export const storage = app.storage().ref();
