import { ArrowLeftIcon, LoaderIcon, Trash2Icon } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { Link, useNavigate, useParams } from 'react-router'
import axiosInstance from '../lib/axios'

const Detail = () => {
	const [note, setNote] = useState({ title: '', content: '' })
	const [saving, setSaving] = useState(false)
	const [isLoading, setIsLoading] = useState(false)

	const { id } = useParams()
	const navigate = useNavigate()
	useEffect(() => {
		const fetchNote = async () => {
			try {
				const res = await axiosInstance.get(`notes/${id}`)
				setNote(res.data)
			} catch (error) {
				console.log('Error in fetching note', error)
				toast.error('Failed to fetch the note')
			} finally {
				setIsLoading(false)
			}
		}
		fetchNote()
	}, [id])

	const handleDelete = async () => {
		if (!window.confirm('Are you sure you want to delete this note?')) return
		try {
			await axiosInstance.delete(`/notes/${id}`)
			toast.success('Note deleted successfully')
			navigate('/')
		} catch (error) {
			console.log('Error in handleDelete', error)
			toast.error('Failed to delete note')
		}
	}
	const handleSave = async () => {
		if (!note.title.trim() || !note.content.trim()) {
			toast.error('Please add a title and content')
			return
		}

		setSaving(true)

		try {
			await axiosInstance.put(`/notes/${id}`, note)
			toast.success('Note updated successfully')
			navigate('/')
		} catch (error) {
			console.log('Error saving the note:', error)
			toast.error('Failed to update note')
		} finally {
			setSaving(false)
		}
	}

	if (isLoading) {
		return (
			<div className='min-h-screen text-white flex items-center justify-center'>
				<LoaderIcon className='animate-spin size-10' />
			</div>
		)
	}

	return (
		<div className='min-h-screen bg-base-200 text-white'>
			<div className='container mx-auto px-4 py-8'>
				<div className='max-w-2xl mx-auto'>
					<div className='flex items-center justify-between mb-10'>
						<Link
							to='/'
							className='flex items-center text-green-500 gap-1 hover:text-white transition'
						>
							<ArrowLeftIcon className='h-5 w-5' />
							Back to Notes
						</Link>
						<button
							onClick={handleDelete}
							className='flex items-center gap-2 border-red-500 border rounded-3xl p-3 text-red-500 cursor-pointer hover:text-white transition hover:border-white'
						>
							<Trash2Icon className='h-5 w-5' />
							Delete Note
						</button>
					</div>

					<div className='p-7 bg-stone-900 rounded-3xl'>
						<div className=''>
							<div className=' flex flex-col gap-2 mb-4'>
								<label>Title</label>
								<input
									type='text'
									placeholder='Note title'
									className='border-2 border-[#363030] rounded-2xl p-2'
									value={note.title}
									onChange={(e) => setNote({ ...note, title: e.target.value })}
								/>
							</div>

							<div className='flex flex-col gap-2 mb-4'>
								<label>Content</label>
								<textarea
									placeholder='Write your note here...'
									className='h-32 border-2 border-[#363030] rounded-2xl p-2 resize-none'
									value={note.content}
									onChange={(e) =>
										setNote({ ...note, content: e.target.value })
									}
								/>
							</div>

							<div className='flex justify-end'>
								<button
									className='cursor-pointer rounded-3xl bg-green-600 text-black font-semibold p-3 transition hover:text-white hover:bg-green-950'
									disabled={saving}
									onClick={handleSave}
								>
									{saving ? 'Saving...' : 'Save Changes'}
								</button>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

export default Detail
