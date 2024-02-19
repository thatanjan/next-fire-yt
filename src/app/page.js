// 'use client'
import PostList from '@/components/PostList'
import { db } from '@/config/firebase'
import {
	and,
	or,
	Timestamp,
	collection,
	getDocs,
	limit,
	onSnapshot,
	orderBy,
	query,
	where,
} from 'firebase/firestore'
// import { useEffect, useState } from 'react'

// Avoiding cache
export const dynamic = 'force-dynamic'

// Server component
export default async function Home() {
	const collectionRef = collection(db, 'posts')

	// const q = query(
	// 	collectionRef,
	// 	// orderBy('createdAt', 'asc'),
	// 	orderBy('title'),
	// 	limit(5),
	// )

	const q = query(
		collectionRef,
		// where('title', '==', 'Exploring New Hobbies')
		// where('createdAt', '<=', Timestamp.fromDate(new Date('2024-01-29'))), // before Jan 29, 2024
		// where('createdAt', '>=', Timestamp.fromDate(new Date('2024-01-29'))), // after Jan 29, 2024
		// where('tags', 'array-contains', 'health'), // tags array contains 'health'
		// where('tags', 'array-contains-any', ['health', 'fitness']), // tags includes any of the following
		// where('title', 'in', [
		// 	'The Benefits of Meditation',
		// 	'The Benefits of Yoga',
		// ]), // title is either of the following
		// where('title', 'not-in', [
		// 	'The Benefits of Meditation',
		// 	'The Benefits of Yoga',
		// ]), // title is not either of the following
		and(
			where('createdAt', '<=', Timestamp.fromDate(new Date('2024-01-29'))), // before Jan 29, 2024

			or(
				where('title', '==', 'The Benefits of Meditation'),
				where('title', '==', 'The Importance of Sleep'),
			),
		),
	)

	const postCollectionSnapshot = await getDocs(q)

	const postList = postCollectionSnapshot.docs.map(doc => ({
		...doc.data(),
		id: doc.id,
	}))

	console.log(postList)

	return (
		<>
			<PostList postList={postList} />
		</>
	)
}

// Client component
// export default function Home() {
// 	const [postList, setPostList] = useState([])
//
// 	useEffect(() => {
// 		;(async () => {
// 			const postCollectionRef = collection(db, 'posts')
//
// 			const unsubscribe = onSnapshot(postCollectionRef, snapshot => {
// 				const list = snapshot.docs.map(doc => {
// 					return { id: doc.id, ...doc.data() }
// 				})
//
// 				setPostList(list)
// 			})
//
// 			return () => unsubscribe()
// 		})()
// 	}, [])
//
// 	// useEffect(() => {
// 	// 	;(async () => {
// 	// 		const postCollectionRef = collection(db, 'posts')
// 	//
// 	// 		const postCollectionSnapshot = await getDocs(postCollectionRef)
// 	//
// 	// 		const list = postCollectionSnapshot.docs.map(doc => {
// 	// 			return { id: doc.id, ...doc.data() }
// 	// 		})
// 	//
// 	// 		setPostList(list)
// 	// 	})()
// 	// }, [])
//
// 	return (
// 		<>
// 			<PostList postList={postList} />
// 		</>
// 	)
// }
