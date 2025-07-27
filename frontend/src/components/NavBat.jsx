import { PlusIcon } from 'lucide-react'
import { Link } from 'react-router'

const Navbar = () => {
	return (
		<header className='bg-stone-950 order-b'>
			<div className='mx-auto max-w-6xl p-4 text-green-500'>
				<div className='flex items-center justify-between'>
					<h1 className='text-3xl font-bold'>ThinkBoard</h1>
					<div className=''>
						<Link
							to={'/create'}
							className='flex items-center gap-1 hover:text-white transition'
						>
							<PlusIcon className='size-5' />
							<span>New Note</span>
						</Link>
					</div>
				</div>
			</div>
		</header>
	)
}
export default Navbar
