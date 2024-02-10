'use client'

import Auth from '@/components/Auth'
import { login } from '@/utils/auth'
import { Button, FormLabel, Heading, Input } from '@chakra-ui/react'
import React, { useState } from 'react'

const Page = () => {
	const [authType, setAuthType] = useState('login')

	return (
		<div>
			<form action={login}>
				<Heading>{authType}</Heading>

				<FormLabel htmlFor='userName'>User Name</FormLabel>
				<Input id='userName' placeholder='User Name' name='userName' />

				<FormLabel htmlFor='password'>Password</FormLabel>
				<Input name='password' placeholder='Password' type='password' />

				<Button type='submit'>Login</Button>
			</form>
		</div>
	)
}

export default Page
