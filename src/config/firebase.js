// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'

// Store these in variables
// Your web app's Firebase configuration
const firebaseConfig = {
	apiKey: 'AIzaSyDcqDPA1ZkrJejqlaw1cKTMndcHknlPZeI',
	authDomain: 'next-fire-c6738.firebaseapp.com',
	projectId: 'next-fire-c6738',
	storageBucket: 'next-fire-c6738.appspot.com',
	messagingSenderId: '827555297877',
	appId: '1:827555297877:web:a67a7af8dcdc73f88172dc',
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)

const db = getFirestore(app)

export { db }

export default app
