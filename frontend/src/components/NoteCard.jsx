import { PenSquareIcon, Trash2Icon } from 'lucide-react'
import toast from 'react-hot-toast'
import { Link } from 'react-router'
import axiosInstance from '../lib/axios'
import { formatDate } from '../lib/utils'

const NoteCard = ({ note, setNotes }) => {
	const handleDelete = async (e, id) => {
		e.preventDefault()
		if (!window.confirm('Are you sure you want to delete this note?')) return
		try {
			await axiosInstance.delete(`/notes/${id}`)
			setNotes((prev) => prev.filter((note) => note._id !== id))
			toast.success('Note deleted successfully')
		} catch (error) {
			console.log('Error in handleDelete', error)
			toast.error('Failed to delete note')
		}
	}

	return (
		<Link
			to={`/detail/${note._id}`}
			className=' hover:shadow-lg transition-all duration-200 
      border-t-4 border-solid border-green-600 rounded-2xl'
		>
			<div className='bg-stone-900 h-64  rounded-2xl py-10 px-6 text-[#857D7F] hover:scale-105 transition flex flex-col justify-between'>
				<div>
					<h3 className='text-2xl text-white mb-5'>
						{note.title.length > 50
							? note.title.slice(0, 50).concat('...')
							: note.title}
					</h3>
					<p>
						{note.content.length > 50
							? note.content.slice(0, 50).concat('...')
							: note.content}
					</p>
				</div>
				<div className='flex justify-between items-center mt-4'>
					<span className='text-sm '>
						{formatDate(new Date(note.createdAt))}
					</span>
					<div className='flex items-center gap-4'>
						<PenSquareIcon className='size-4' />
						<button onClick={(e) => handleDelete(e, note._id)}>
							<Trash2Icon className='size-4 text-red-500 cursor-pointer hover:scale-125 transition' />
						</button>
					</div>
				</div>
			</div>
		</Link>
	)
}
export default NoteCard
