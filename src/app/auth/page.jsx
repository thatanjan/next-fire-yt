'use client'

import Auth from '@/components/Auth'
import { login } from '@/utils/auth'
import { Button, Container, FormLabel, Heading, Input } from '@chakra-ui/react'
import React, { useState } from 'react'
import { addMultipleDocuments } from '@/utils/firebase'

const Page = () => {
	const [authType, setAuthType] = useState('login')

	return (
		<Container maxWidth={400}>
			<form action={login}>
				<Heading
					sx={{
						paddingY: 10,
						textAlign: 'center',
						textTransform: 'uppercase',
					}}
				>
					{authType}
				</Heading>

				<FormLabel htmlFor='userName'>User Name</FormLabel>
				<Input
					marginBottom='1rem'
					id='userName'
					placeholder='User Name'
					name='userName'
				/>

				<FormLabel htmlFor='password'>Password</FormLabel>
				<Input name='password' placeholder='Password' type='password' />

				<Button block type='submit' w='100%' mt={4}>
					Login
				</Button>
			</form>
		</Container>
	)
}

export default Page
