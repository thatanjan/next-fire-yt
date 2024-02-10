import Image from 'next/image'
import styles from './page.module.css'
import UserList from '@/components/UserList'

export default function Home() {
	return (
		<main className={styles.main}>
			<UserList />
		</main>
	)
}
