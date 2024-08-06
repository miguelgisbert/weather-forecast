import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyBthUtf28o30R_meq8Mf4PKsN2wfz9HTKg",
  authDomain: "mg-weather-forecast.firebaseapp.com",
  projectId: "mg-weather-forecast",
  storageBucket: "mg-weather-forecast.appspot.com",
  messagingSenderId: "860583811978",
  appId: "1:860583811978:web:7de45f77c73229b7578673"
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)

export const auth = getAuth(app)
export const db = getFirestore(app)