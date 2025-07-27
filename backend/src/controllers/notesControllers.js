import Note from '../models/note.model.js'

export async function getAllNotes(req, res) {
	try {
		const notes = await Note.find().sort({ createdAt: -1 })
		res.status(201).json(notes)
	} catch (error) {
		console.log(`Error in getAllNotes controller ${error}`)
		res.status(500).json({ message: 'Internal server error' })
	}
}

export async function getNoteById(req, res) {
	try {
		const note = await Note.findById(req.params.id)
		if (!note) return res.status(404).json({ message: 'Note not found' })
		res.status(201).json(note)
	} catch (error) {
		console.log(`Error in getNoteById controller ${error}`)
		res.status(500).json({ message: 'Internal server error' })
	}
}

export async function createNote(req, res) {
	try {
		const { title, content } = req.body
		const note = new Note({ title, content })
		await note.save()
		res.status(201).json(note)
	} catch (error) {
		console.log(`Error in createNote controller ${error}`)
		res.status(500).json({ message: 'Internal server error' })
	}
}

export async function updateNote(req, res) {
	try {
		const { title, content } = req.body
		const updateNote = await Note.findByIdAndUpdate(
			req.params.id,
			{
				title,
				content,
			},
			{
				new: true,
			}
		)
		if (!updateNote)
			return res.status(404).json({ message: 'Cannot find the note' })
		res.status(200).json(updateNote)
	} catch (error) {
		console.log(`Error in updateNote controller ${error}`)
		res.status(500).json({ message: 'Internal server error' })
	}
}

export async function deleteNote(req, res) {
	try {
		const deleteNote = await Note.findByIdAndDelete(req.params.id)
		if (!deleteNote)
			return res.status(404).json({ message: 'Cannot find the note' })
		res.status(200).json(deleteNote)
	} catch (error) {
		console.log(`Error in deleteNote controller ${error}`)
		res.status(500).json({ message: 'Internal server error' })
	}
}
