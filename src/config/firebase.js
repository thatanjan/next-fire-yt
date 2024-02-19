// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'

// Your web app's Firebase configuration
const firebaseConfig = {
	apiKey: 'AIzaSyDYdXmF_MfLANTvC4bYBewFq9qh3ZdxiQY',
	authDomain: 'next-fire-yt.firebaseapp.com',
	projectId: 'next-fire-yt',
	storageBucket: 'next-fire-yt.appspot.com',
	messagingSenderId: '1098443682898',
	appId: '1:1098443682898:web:b83b4a1d160d3b17511b8b',
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)

const db = getFirestore(app)

export { db }

export default app
