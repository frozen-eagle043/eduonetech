import firebase from "firebase/app"
import 'firebase/firestore';
import "firebase/auth"

const app = firebase.initializeApp({
  apiKey: "AIzaSyDCHUjljaH9NhTexVTfy_VMEcsOqKyzfyM",
  authDomain: "auth-dev-d6c26.firebaseapp.com",
  projectId: "auth-dev-d6c26",
  storageBucket: "auth-dev-d6c26.appspot.com",
  messagingSenderId: "980670109676",
  appId: "1:980670109676:web:e9e4607e7ef8ad3a2192c9"
})


export const auth = app.auth()
export default app
