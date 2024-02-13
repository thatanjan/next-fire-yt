import PostList from '@/components/PostList'

// Server component
export default async function Home() {
	return (
		<>
			<PostList postList={[]} />
		</>
	)
}
