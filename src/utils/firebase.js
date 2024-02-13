'use server'

import { db } from '@/config/firebase'
import {
	Timestamp,
	collection,
	addDoc,
	doc,
	getDoc,
	updateDoc,
	deleteDoc,
	writeBatch,
} from 'firebase/firestore'
import { revalidatePath } from 'next/cache'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

import posts from '@/data/posts.json'

const getDocuments = async collectionName => {
	const collectionRef = collection(db, collectionName)
}

const getDocument = async documentPath => {
	const path = [documentPath].flat()
	const docRef = doc(db, ...path)
	const docSnap = await getDoc(docRef)

	if (docSnap.exists()) {
		return {
			id: docSnap.id,
			...docSnap.data(),
		}
	} else {
		return null
	}
}

const addPost = async formData => {
	const userId = cookies().get('userId').value
	const userRef = doc(db, 'users', userId)

	const collectionRef = collection(db, 'posts')

	const docRef = await addDoc(collectionRef, {
		title: formData.get('title'),
		content: formData.get('content'),
		tags: formData
			.get('tags')
			.split(',')
			.map(tag => tag.trim()),
		user: userRef,
	})

	redirect(`/post/${docRef.id}`)
}

const updateDocument = async (documentPath, formData) => {
	const path = [documentPath].flat()

	const docRef = doc(db, ...path)

	await updateDoc(docRef, {
		title: formData.get('title'),
		content: formData.get('content'),
		tags: formData
			.get('tags')
			.split(',')
			.map(tag => tag.trim()),
		// tags: arrayUnion('new_tag'), // add new tag to array only if it doesn't exist
		// tags: arrayRemove('new_tag'), // remove tag from array with all instances
		// tags: deleteField(), // Remove tags field
	})

	revalidatePath(`/post/${docRef.id}`)
}

const deleteDocument = async documentPath => {
	const path = [documentPath].flat()
	const docRef = doc(db, ...path)

	await deleteDoc(docRef)

	redirect('/')
}

const getRandomTimestamp = () => {
	const startTimestamp = new Date('2024-01-01').getTime()
	const endTimestamp = new Date().getTime()
	const randomTimestamp = Math.floor(
		Math.random() * (endTimestamp - startTimestamp + 1) + startTimestamp,
	)
	const randomDate = new Date(randomTimestamp)

	return Timestamp.fromDate(randomDate)
}

const addMultipleDocuments = async () => {
	const batch = writeBatch(db)

	const user1Ref = doc(db, 'users', '59SAKwAxIajdBwRi9Knv')
	const user2Ref = doc(db, 'users', 'plc6zuaDZsapF208WySK')

	const users = [user1Ref, user2Ref]
	const getRandomUser = () => users[Math.floor(Math.random() * users.length)]

	posts.forEach(post => {
		const postData = {
			...post,
			user: getRandomUser(),
			createdAt: getRandomTimestamp(),
		}

		const newDocRef = doc(collection(db, 'posts'))
		batch.set(newDocRef, postData)
	})

	await batch.commit()
}

export {
	getDocuments,
	addPost,
	getDocument,
	updateDocument,
	deleteDocument,
	addMultipleDocuments,
}
