import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import Navbar from '../components/NavBat'
import NoteCard from '../components/NoteCard'
import NotesNotFound from '../components/NotesNotFound'
import RateLimitedUI from '../components/RateLimitedUI'
import axiosInstance from '../lib/axios'

const Home = () => {
	const [isRateLimited, setIsRateLimited] = useState(false)
	const [notes, setNotes] = useState([])
	const [isLoading, setIsLoading] = useState(true)

	useEffect(() => {
		const fetchNotes = async () => {
			try {
				const res = await axiosInstance('/notes')
				setNotes(res.data)
				console.log(res.data)
			} catch (error) {
				console.log('Error fetching notes', error)
				if (error.response.status === 429) {
					setIsRateLimited(true)
				} else {
					toast.error('Failed to fetch notes')
				}
			} finally {
				setIsLoading(false)
			}
		}
		fetchNotes()
	}, [])

	return (
		<div className='min-h-screen'>
			<Navbar />
			{isRateLimited && <RateLimitedUI />}
			<div className='max-w-7xl mx-auto p-4 mt-6'>
				{isLoading && <div className='text-center py-10'>Loading notes...</div>}

				{notes.length === 0 && !isRateLimited && !isLoading && (
					<NotesNotFound />
				)}

				{notes.length > 0 && !isRateLimited && (
					<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
						{notes.map((note) => (
							<NoteCard key={note._id} note={note} setNotes={setNotes} />
						))}
					</div>
				)}
			</div>
		</div>
	)
}

export default Home
