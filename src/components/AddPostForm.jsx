'use client'
import {
	addMultiplePosts,
	addPost,
	deletePost,
	updatePost,
} from '@/utils/firebase'
import {
	Button,
	FormControl,
	FormLabel,
	Input,
	Textarea,
	VStack,
} from '@chakra-ui/react'

const AddPostForm = ({
	isForUpdate,
	id = '',
	title = '',
	content = '',
	tags = [],
}) => {
	return (
		<VStack
			as='form'
			mx='auto'
			maxWidth={400}
			action={isForUpdate ? updatePost.bind(null, id) : addPost}
		>
			<FormControl>
				<FormLabel>Title</FormLabel>
				<Input
					defaultValue={title}
					type='text'
					placeholder='Title'
					name='title'
				/>
			</FormControl>
			<FormControl>
				<FormLabel>Content</FormLabel>
				<Textarea
					defaultValue={content}
					placeholder="What's on your mind?"
					name='content'
					rows={5}
				/>
			</FormControl>
			<FormControl>
				<FormLabel>Tags</FormLabel>
				<Input
					defaultValue={tags.join(', ')}
					type='text'
					placeholder='test, test2'
					name='tags'
				/>
			</FormControl>
			<Button type='submit' w='100%'>
				Submit
			</Button>
			<Button type='submit' w='100%' onClick={() => deletePost(id)}>
				Delete Document
			</Button>
			<Button onClick={() => addMultiplePosts()} type='button'>
				Add multiple documents
			</Button>
		</VStack>
	)
}

export default AddPostForm
