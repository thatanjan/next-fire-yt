import AddPostForm from '@/components/AddPostForm'
import { getDocument } from '@/utils/firebase'
import { Heading, Text } from '@chakra-ui/react'
import React from 'react'

const Page = async ({ params: { id } }) => {
	const post = await getDocument(['posts', id])
	// const post = await getDocument('post/' + id)

	if (!post) return <Heading>Post not found</Heading>

	// getting post user
	// const userRef = post.user
	// const user = await getDoc(userRef)
	//
	// post.user = user.data()

	const { user: _, ...postData } = post

	return (
		<div>
			<Heading mb={3}>{post.title}</Heading>
			<Text>{post.content}</Text>
			<Text mb={10} color='blue.600'>
				{post?.tags?.map(tag => `#${tag} `)}
			</Text>

			<AddPostForm isForUpdate={true} {...postData} />
		</div>
	)
}

export default Page
