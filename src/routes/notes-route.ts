import { Router } from 'express'
import { createNotes, deleteNotesById, getAllNotes, getNotesById, updateNotesById } from '../controllers/notes-controller'

const notesRouter = Router()

notesRouter

  .post('/', createNotes)
  .get('/', getAllNotes)
  .get('/:id', getNotesById)
  .put('/:id', updateNotesById)
  .delete('/:id', deleteNotesById)

export default notesRouter
