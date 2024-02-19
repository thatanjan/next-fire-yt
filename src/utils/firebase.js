'use server'

import { db } from '@/config/firebase'
import {
	deleteDoc,
	Timestamp,
	addDoc,
	arrayRemove,
	arrayUnion,
	collection,
	deleteField,
	doc,
	serverTimestamp,
	updateDoc,
	writeBatch,
} from 'firebase/firestore'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

import posts from '@/data/posts'
import { revalidatePath } from 'next/cache'

const addPost = async formData => {
	const collectionRef = collection(db, 'posts')
	const userId = cookies().get('userId').value
	// const userRef = doc(db, 'users', userId)
	const userRef = doc(db, `users/${userId}`)

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

const getRandomTimestamp = () => {
	const startTimestamp = new Date('2024-01-01').getTime()
	const endTimestamp = new Date().getTime()
	const randomTimestamp = Math.floor(
		Math.random() * (endTimestamp - startTimestamp + 1) + startTimestamp,
	)
	const randomDate = new Date(randomTimestamp)

	return Timestamp.fromDate(randomDate)
}

const addMultiplePosts = async () => {
	const batch = writeBatch(db)

	const user1Ref = doc(db, 'users', 'BuIYJce615lrfcdfpo9i')
	const user2Ref = doc(db, 'users', '7F9HiUVFDzWXtGC0r1Nd')

	const users = [user1Ref, user2Ref]
	const getRandomUser = () => users[Math.floor(Math.random() * users.length)]

	posts.forEach(post => {
		const postData = {
			...post,
			user: getRandomUser(),
			createdAt: getRandomTimestamp(),
		}

		const docRef = doc(collection(db, 'posts'))
		batch.set(docRef, postData)
	})

	await batch.commit()
}

const updatePost = async (postId, formData) => {
	const docRef = doc(db, 'posts', postId)

	await updateDoc(docRef, {
		title: formData.get('title'),
		content: deleteField(),
		// content: formData.get('content'),
		tags: formData
			.get('tags')
			.split(',')
			.map(tag => tag.trim()),
		// tags: arrayUnion('new-tag'),
		// tags: arrayRemove('new-tag'),
	})

	revalidatePath(`/post/${postId}`)
}

const deletePost = async postId => {
	const docRef = doc(db, 'posts', postId)
	await deleteDoc(docRef)
	redirect('/')
}

export { addPost, addMultiplePosts, updatePost, deletePost }
