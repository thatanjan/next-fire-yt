'use client'

import {
	Button,
	FormControl,
	FormLabel,
	Input,
	Textarea,
	VStack,
} from '@chakra-ui/react'

const AddPostForm = props => {
	return (
		<VStack as='form' mx='auto' maxWidth={400}>
			<FormControl>
				<FormLabel>Title</FormLabel>
				<Input
					defaultValue={props.title || ''}
					type='text'
					placeholder='Title'
					name='title'
				/>
			</FormControl>
			<FormControl>
				<FormLabel>Content</FormLabel>
				<Textarea
					defaultValue={props.content || ''}
					placeholder="What's on your mind?"
					name='content'
					rows={5}
				/>
			</FormControl>
			<FormControl>
				<FormLabel>Tags</FormLabel>
				<Input
					defaultValue={props.tags?.join(', ') || ''}
					type='text'
					placeholder='test, test2'
					name='tags'
				/>
			</FormControl>
			<Button type='submit' w='100%'>
				Submit
			</Button>
			{props.isForUpdate && (
				<Button type='submit' w='100%'>
					Delete Document
				</Button>
			)}

			<Button type='button'>Add multiple documents</Button>
		</VStack>
	)
}

export default AddPostForm
