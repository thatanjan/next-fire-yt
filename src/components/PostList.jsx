import {
	Card,
	CardBody,
	CardHeader,
	Heading,
	Grid,
	Text,
	CardFooter,
} from '@chakra-ui/react'
import Link from 'next/link'
import React from 'react'

const PostsList = ({ postList }) => {
	return (
		<Grid templateColumns='repeat(auto-fill, minmax(300px, 1fr))' gap={6}>
			{postList.map(({ tags, id, title, content, createdAt }) => (
				<Card key={id} as={Link} href={`/post/${id}`}>
					<CardHeader paddingBottom={0}>
						<Heading noOfLines={2} mb={2} fontSize='lg'>
							{title}
						</Heading>
						<Text fontSize='sm' color='gray.500'>
							{createdAt.toDate().toDateString()}
						</Text>
					</CardHeader>
					<CardBody>
						<Text noOfLines={3}>{content}</Text>
					</CardBody>
					<CardFooter color='blue.600'>
						{tags?.map(tag => `#${tag} `)}
					</CardFooter>
				</Card>
			))}
		</Grid>
	)
}

export default PostsList
