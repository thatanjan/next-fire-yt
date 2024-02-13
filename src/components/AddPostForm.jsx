'use client'

import { db } from '@/config/firebase'
import {
	addMultipleDocuments,
	addPost,
	deleteDocument,
	updateDocument,
} from '@/utils/firebase'
import {
	Button,
	FormControl,
	FormLabel,
	Input,
	Textarea,
	VStack,
} from '@chakra-ui/react'
import { doc } from 'firebase/firestore'
// import { cookies } from 'next/headers'

const AddPostForm = props => {
	const userId = 'dfvw'
	const userRef = doc(db, 'users', userId)

	return (
		<VStack
			as='form'
			action={
				props.isForUpdate
					? updateDocument.bind(null, ['posts', props.id])
					: addPost
			}
			mx='auto'
			maxWidth={400}
		>
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
				<Button
					onClick={() => deleteDocument(['posts', props.id])}
					type='submit'
					w='100%'
				>
					Delete Document
				</Button>
			)}

			<Button type='button' onClick={() => addMultipleDocuments()}>
				Add multiple documents
			</Button>
		</VStack>
	)
}

export default AddPostForm
