import {
	collection,
	doc,
	getDoc,
	getDocs,
	onSnapshot,
} from 'firebase/firestore'

import { db } from '../config/firebase'

export const dynamic = 'force-dynamic'

const UserList = async () => {
	const userCollectionRef = collection(db, 'users')

	const userCollectionSnapshot = await getDocs(userCollectionRef)

	// const userList = userCollectionSnapshot.docs.map(doc => {
	// 	console.log(doc.id, ' => ', doc.data())
	//
	// 	return { id: doc.id, ...doc.data() }
	// })

	let userList = []

	onSnapshot(userCollectionRef, snapshot => {
		userList = snapshot.docs.map(doc => {
			return { id: doc.id, ...doc.data() }
		})
	})

	return (
		<div>
			{userList.map(user => (
				<li key={user.id}>
					<h1>{user.name}</h1>
				</li>
			))}
		</div>
	)
}

export default UserList
