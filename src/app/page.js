'use client'
import {
	onSnapshot,
	startAfter,
	collection,
	getDocs,
	query,
	where,
	or,
	and,
	Timestamp,
	orderBy,
	limit,
	startAt,
} from 'firebase/firestore'
import PostList from '@/components/PostList'
import { db } from '@/config/firebase'
import { useEffect, useState } from 'react'

// Avoiding cache
// export const dynamic = 'force-dynamic'

// Server component
// export default async function Home() {
// 	const postCollectionRef = collection(db, 'posts')
//
// 	// Sort by createdAt in descending order and limit to 5
// 	// const q = query(postCollectionRef, orderBy('createdAt', 'desc'), limit(5))
// 	// const q = query(
// 	// 	postCollectionRef,
// 	// where('title', '==', 'The Benefits of Meditation'), // title is 'The Benefits of Meditation'
// 	// where('createdAt', '<=', Timestamp.fromDate(new Date('2024-01-29'))), // before Jan 29, 2024
// 	// where('createdAt', '>=', Timestamp.fromDate(new Date('2024-01-29'))), // after Jan 29, 2024
// 	// where('tags', 'array-contains-any', ['health', 'fitness']), // tags includes any of the following
// 	// where('title', 'in', [
// 	// 	'The Benefits of Meditation',
// 	// 	'The Benefits of Yoga',
// 	// ]), // title is either of the following
// 	// where('title', 'not-in', [
// 	// 	'The Benefits of Meditation',
// 	// 	'The Benefits of Yoga',
// 	// ]), // title is not either of the following
// 	// and(
// 	// 	where('createdAt', '<=', Timestamp.fromDate(new Date('2024-01-29'))), // before Jan 29, 2024
// 	//
// 	// 	or(
// 	// 		where('title', '==', 'The Benefits of Meditation'),
// 	// 		where('title', '==', 'The Importance of Sleep'),
// 	// 	),
// 	// ),
// 	// )
//
// 	const postCollectionSnapshot = await getDocs(q)
//
// 	const postList = postCollectionSnapshot.docs.map(doc => {
// 		return { id: doc.id, ...doc.data() }
// 	})
// 	// console.log(postList , start)
//
// 	return (
// 		<>
// 			<PostList postList={postList} />
// 		</>
// 	)
// }

export default function Home() {
	const [postList, setPostList] = useState([])

	useEffect(() => {
		// ;(async () => {
		// 	const postCollectionRef = collection(db, 'posts')
		//
		// 	const postCollectionSnapshot = await getDocs(postCollectionRef)
		//
		// 	const list = postCollectionSnapshot.docs.map(doc => {
		// 		return { id: doc.id, ...doc.data() }
		// 	})
		//
		// 	setPostList(list)
		// })()
		// Gettting realtime updates
		;(async () => {
			const postCollectionRef = collection(db, 'posts')

			const unsubscribe = onSnapshot(postCollectionRef, snapshot => {
				const list = snapshot.docs.map(doc => {
					return { id: doc.id, ...doc.data() }
				})
				console.log(list)
				setPostList(list)
			})

			return () => unsubscribe()
		})()
	}, [])

	return (
		<>
			<PostList postList={postList} />
		</>
	)
}
