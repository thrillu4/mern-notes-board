import { ArrowLeftIcon } from 'lucide-react'
import React, { useState } from 'react'
import toast from 'react-hot-toast'
import { Link, useNavigate } from 'react-router'
import axiosInstance from '../lib/axios'

const Create = () => {
	const [title, setTitle] = useState('')
	const [content, setContent] = useState('')
	const [isLoading, setIsLoading] = useState(false)

	const navigate = useNavigate()

	const handleSubmit = async (e) => {
		e.preventDefault()

		if (!title.trim() && !content.trim()) {
			toast.error('All fields are required!')
			return
		}
		setIsLoading(true)
		try {
			await axiosInstance.post('/notes', {
				title,
				content,
			})
			toast.success('Note created successfully!')
			navigate('/')
		} catch (error) {
			console.log('Error creating note', error)
			if (error.response.status === 429) {
				toast.error("Slow down! You're creating notes too fast", {
					duration: 4000,
					icon: '💀',
				})
			} else {
				toast.error('Failed to create note')
			}
		} finally {
			setIsLoading(false)
		}
	}

	return (
		<div className='min-h-screen bg-base-200 text-white'>
			<div className='container mx-auto px-4 py-8'>
				<div className='max-w-2xl mx-auto'>
					<Link
						to={'/'}
						className='flex items-center text-green-500 gap-1 mb-6 hover:text-white transition'
					>
						<ArrowLeftIcon className='size-5' />
						Back to Notes
					</Link>

					<div className='p-7 bg-stone-900 rounded-3xl'>
						<div className=''>
							<h2 className=' text-2xl mb-5'>Create New Note</h2>
							<form onSubmit={handleSubmit}>
								<div className='flex flex-col gap-2 mb-4'>
									<label>Title</label>
									<input
										type='text'
										placeholder='Note Title'
										className='border-2 border-[#363030] rounded-2xl p-2'
										maxLength={100}
										value={title}
										onChange={(e) => setTitle(e.target.value)}
									/>
								</div>

								<div className='flex flex-col gap-2 mb-4'>
									<label>Content</label>
									<textarea
										placeholder='Write your note here...'
										className=' h-32 border-2 border-[#363030] rounded-2xl p-2 resize-none'
										maxLength={500}
										value={content}
										onChange={(e) => setContent(e.target.value)}
									/>
								</div>

								<div className='flex justify-end'>
									<button
										type='submit'
										className='cursor-pointer rounded-3xl bg-green-600 text-black font-semibold p-3 hover:text-white hover:bg-green-950 transition'
										disabled={isLoading}
									>
										{isLoading ? 'Creating...' : 'Create Note'}
									</button>
								</div>
							</form>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

export default Create
