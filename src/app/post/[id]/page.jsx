import AddPostForm from '@/components/AddPostForm'
import { Heading, Text } from '@chakra-ui/react'
import { doc, getDoc } from 'firebase/firestore'
import { db } from '@/config/firebase'

const Page = async ({ params: { id } }) => {
	let post = null

	const docRef = doc(db, 'posts', id)
	const docSnap = await getDoc(docRef)

	if (docSnap.exists()) {
		post = { id: docSnap.id, ...docSnap.data() }
	}

	if (!post) return <Heading>Post not found</Heading>

	const userRef = post.user
	const userSnap = await getDoc(userRef)

	post.user = userSnap.data()

	return (
		<div>
			<Heading mb={3}>{post.title}</Heading>
			<Text>{post.content}</Text>
			<Text mb={10} color='blue.600'>
				{post?.tags?.map(tag => `#${tag} `)}
			</Text>

			<AddPostForm {...post} isForUpdate />
		</div>
	)
}

export default Page
