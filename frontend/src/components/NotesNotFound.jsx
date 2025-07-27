import { NotebookIcon } from 'lucide-react'
import { Link } from 'react-router'

const NotesNotFound = () => {
	return (
		<div className='text-green-600 flex flex-col items-center justify-center py-16 space-y-6 max-w-md mx-auto text-center'>
			<div className='bg-primary/10 rounded-full p-8'>
				<NotebookIcon className='size-10 text-green-700' />
			</div>
			<h3 className='text-2xl font-bold'>No notes yet</h3>
			<p>
				Ready to organize your thoughts? Create your first note to get started
				on your journey.
			</p>
			<Link to='/create' className='border-2 border-green-900 rounded-2xl p-3'>
				Create Your First Note
			</Link>
		</div>
	)
}
export default NotesNotFound
