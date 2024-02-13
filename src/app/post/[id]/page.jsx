import AddPostForm from '@/components/AddPostForm'
import { Heading, Text } from '@chakra-ui/react'

const Page = async ({ params: { id } }) => {
	const post = null

	if (!post) return <Heading>Post not found</Heading>

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
